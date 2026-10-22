#!/usr/bin/env node
/**
 * Minimal publish webhook for VPS: POST with Authorization: Bearer <secret>
 * Rebuilds mambeu-web from repo root (expects docker on PATH).
 */
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PUBLISH_HOOK_PORT || 8098);
const secret = process.env.PUBLISH_HOOK_SECRET || '';

const server = createServer((req, res) => {
  if (req.method !== 'POST' || req.url !== '/rebuild') {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  const auth = req.headers.authorization || '';
  if (secret && auth !== `Bearer ${secret}`) {
    res.writeHead(401);
    res.end('Unauthorized');
    return;
  }
  res.writeHead(202, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: true, message: 'Rebuild started' }));

  const env = { ...process.env, POCKETBASE_URL: process.env.POCKETBASE_URL || 'http://127.0.0.1:9112' };
  const child = spawn('docker', ['compose', 'up', '-d', '--build'], { cwd: root, env, stdio: 'inherit' });
  child.on('exit', (code) => console.log('publish rebuild exit', code));
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Publish hook listening on http://127.0.0.1:${port}/rebuild`);
});
