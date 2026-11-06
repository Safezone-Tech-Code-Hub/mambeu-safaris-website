#!/usr/bin/env node
/** Create or update PocketBase collections only (no content seed). Safe on production. */
import { createAdminClient, ensureCollections } from './pb-admin.mjs';

try {
  const pb = await createAdminClient();
  await ensureCollections(pb);
  console.log('Collections OK.');
} catch (e) {
  console.error(e.message || e);
  process.exit(1);
}
