#!/usr/bin/env node
import { mergeExperiencesContent } from '../src/content/experiencesDefaults.js';
import { createAdminClient } from './pb-admin.mjs';

const pb = await createAdminClient();
const row = await pb.collection('page_content').getFirstListItem('pageKey="experiences"');
const merged = mergeExperiencesContent(row.content || {});
await pb.collection('page_content').update(row.id, { content: merged });
console.log('Experiences page content merged and saved.');
