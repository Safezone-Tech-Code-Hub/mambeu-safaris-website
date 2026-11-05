#!/usr/bin/env node
import { mergeComfortContent } from '../src/content/comfortDefaults.js';
import { createAdminClient } from './pb-admin.mjs';

const pb = await createAdminClient();
const row = await pb.collection('page_content').getFirstListItem('pageKey="comfort"');
const merged = mergeComfortContent(row.content || {});
await pb.collection('page_content').update(row.id, { content: merged });
console.log('Comfort page content merged and saved.');
