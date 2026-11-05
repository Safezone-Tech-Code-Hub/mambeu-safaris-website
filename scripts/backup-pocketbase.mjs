#!/usr/bin/env node
/**
 * Create a PocketBase backup (DB + uploaded files) via superuser API.
 * Backups are stored in pocketbase/pb_data/backups/ on the server.
 *
 * Env (pocketbase/.env):
 *   POCKETBASE_URL, POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD
 * Optional:
 *   BACKUP_KEEP=14          — keep this many newest backups (default 14)
 *   BACKUP_COPY_DIR=        — if set, copy each new .zip here (e.g. /home/humphrey/backups/mambeu)
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createAdminClient, loadPbEnv } from './pb-admin.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
loadPbEnv();

const keep = Math.max(1, Number(process.env.BACKUP_KEEP || 14));
const copyDir = process.env.BACKUP_COPY_DIR?.trim();

function stamp() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
}

function localBackupFiles() {
  const dir = join(root, 'pocketbase', 'pb_data', 'backups');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.zip'))
    .map((name) => {
      const path = join(dir, name);
      return { name, path, mtime: statSync(path).mtimeMs };
    })
    .sort((a, b) => b.mtime - a.mtime);
}

function pruneLocalBackups() {
  const files = localBackupFiles();
  for (const file of files.slice(keep)) {
    try {
      unlinkSync(file.path);
      console.log('removed old backup', file.name);
    } catch (e) {
      console.warn('could not remove', file.name, e.message);
    }
  }
}

async function pruneApiBackups(pb) {
  const list = await pb.backups.getFullList();
  const sorted = [...list].sort((a, b) => {
    const ta = Date.parse(a.modified || a.created || '') || 0;
    const tb = Date.parse(b.modified || b.created || '') || 0;
    return tb - ta;
  });
  for (const row of sorted.slice(keep)) {
    const key = row.key || row.name;
    if (!key) continue;
    await pb.backups.delete(key);
    console.log('removed old backup (api)', key);
  }
}

const pb = await createAdminClient();
const name = `mambeu-${stamp()}.zip`;

await pb.backups.create(name);
console.log('created backup', name);

if (copyDir) {
  mkdirSync(copyDir, { recursive: true });
  const src = join(root, 'pocketbase', 'pb_data', 'backups', name);
  if (existsSync(src)) {
    const dest = join(copyDir, name);
    copyFileSync(src, dest);
    console.log('copied to', dest);
  } else {
    console.warn('backup file not found at', src, '(check BACKUP_COPY_DIR timing)');
  }
}

try {
  await pruneApiBackups(pb);
} catch (e) {
  console.warn('API prune skipped:', e.message);
}
pruneLocalBackups();

console.log(`Done. Keeping newest ${keep} backup(s) in pb_data/backups/`);
