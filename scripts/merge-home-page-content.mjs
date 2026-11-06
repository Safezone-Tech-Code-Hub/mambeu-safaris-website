#!/usr/bin/env node
/** One-time (or safe repeat): fill PocketBase homepage JSON with merged defaults + existing values. */
import { mergeHomeContent } from '../src/content/homeDefaults.js';
import { createAdminClient } from './pb-admin.mjs';

const pb = await createAdminClient();
const row = await pb.collection('page_content').getFirstListItem('pageKey="home"');
const merged = mergeHomeContent(row.content || {});
await pb.collection('page_content').update(row.id, { content: merged });
console.log('Homepage content merged and saved. Open Manage → Homepage to review, then Save if needed.');
