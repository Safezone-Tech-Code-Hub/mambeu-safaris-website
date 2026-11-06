#!/usr/bin/env node
/** Fill PocketBase about page JSON with merged defaults + existing values. */
import { mergeAboutContent } from '../src/content/aboutDefaults.js';
import { createAdminClient } from './pb-admin.mjs';

const pb = await createAdminClient();
const row = await pb.collection('page_content').getFirstListItem('pageKey="about"');
const merged = mergeAboutContent(row.content || {});
await pb.collection('page_content').update(row.id, { content: merged });
console.log('About page content merged and saved.');
