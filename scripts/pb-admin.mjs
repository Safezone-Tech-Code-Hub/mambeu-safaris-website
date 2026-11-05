#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import PocketBase from 'pocketbase';
import { collectionDefs } from './pb-schema.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

export function loadPbEnv() {
  for (const file of ['.env', 'pocketbase/.env']) {
    const path = join(root, file);
    if (!existsSync(path)) continue;
    for (const raw of readFileSync(path, 'utf8').split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const eq = line.indexOf('=');
      if (eq <= 0) continue;
      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = value;
    }
  }
}

export function getPbAdminConfig() {
  loadPbEnv();
  const url = (process.env.POCKETBASE_URL || 'http://127.0.0.1:9112').replace(/\/$/, '');
  const adminEmail = process.env.POCKETBASE_ADMIN_EMAIL || process.env.PB_ADMIN_EMAIL;
  const adminPassword = process.env.POCKETBASE_ADMIN_PASSWORD || process.env.PB_ADMIN_PASSWORD;
  return { url, adminEmail, adminPassword };
}

export async function createAdminClient() {
  const { url, adminEmail, adminPassword } = getPbAdminConfig();
  if (!adminEmail || !adminPassword) {
    throw new Error('Set POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD in pocketbase/.env');
  }
  const pb = new PocketBase(url);
  pb.autoCancellation(false);
  await pb.admins.authWithPassword(adminEmail, adminPassword);
  return pb;
}

export async function ensureCollections(pb) {
  for (const def of collectionDefs) {
    try {
      const existing = await pb.collections.getFirstListItem(`name="${def.name}"`);
      await pb.collections.update(existing.id, def);
      console.log('updated collection', def.name);
    } catch {
      await pb.collections.create(def);
      console.log('created collection', def.name);
    }
  }
}
