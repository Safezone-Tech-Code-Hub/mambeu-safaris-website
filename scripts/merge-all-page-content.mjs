#!/usr/bin/env node
/** Upsert merged defaults into every page_content row. */
import { createAdminClient } from './pb-admin.mjs';
import { pageRegistry } from './default-page-content.mjs';
import { mergePageCatalog } from '../src/content/pageCatalogMerge.js';

const pb = await createAdminClient();

for (const page of pageRegistry) {
  let row;
  try {
    row = await pb.collection('page_content').getFirstListItem(`pageKey="${page.pageKey}"`);
  } catch {
    await pb.collection('page_content').create({
      pageKey: page.pageKey,
      label: page.label,
      status: 'published',
      content: mergePageCatalog({ [page.pageKey]: page.content })[page.pageKey],
    });
    console.log('created', page.pageKey);
    continue;
  }
  const merged = mergePageCatalog({ [page.pageKey]: row.content || {} })[page.pageKey];
  await pb.collection('page_content').update(row.id, { content: merged });
  console.log('merged', page.pageKey);
}
console.log('Done.');
