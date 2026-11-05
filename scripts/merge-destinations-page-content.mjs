#!/usr/bin/env node
import { mergeDestinationsContent } from '../src/content/destinationsDefaults.js';
import { createAdminClient } from './pb-admin.mjs';

const pb = await createAdminClient();
const row = await pb.collection('page_content').getFirstListItem('pageKey="destinations"');
const merged = mergeDestinationsContent(row.content || {});
await pb.collection('page_content').update(row.id, { content: merged });
console.log('Destinations hub content merged and saved.');
