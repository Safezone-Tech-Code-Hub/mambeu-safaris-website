import fs from 'node:fs';import vm from 'node:vm';import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),dist=path.join(root,'dist');
const tours=JSON.parse(fs.readFileSync(path.join(root,'src/tours.json'),'utf8'));
const script=fs.readFileSync(path.join(root,'src/app.js'),'utf8');
const ctx=vm.createContext({MAMBEU_TOURS:tours,Date,URLSearchParams,console});vm.runInContext(script,ctx);
const routes=['','safaris','about','comfort','destinations','kilimanjaro','zanzibar','experiences','travel-guide','plan',...['serengeti','ngorongoro','tarangire','lake-manyara','ndutu','lake-natron'].map(s=>'destinations/'+s),...tours.map(t=>t.path)];
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shell=(r)=>{const p=ctx.mambeuRender(r);return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(p.title)}</title><meta name="description" content="${escape(p.description)}"><meta name="theme-color" content="#173c32"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/style.css"><script src="/app.js" defer></script></head><body>${p.html}</body></html>`};
for(const route of routes){const dir=path.join(dist,route);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),shell(route))}
fs.writeFileSync(path.join(dist,'404.html'),shell('not-found'));
fs.writeFileSync(path.join(dist,'app.js'),'globalThis.MAMBEU_TOURS='+JSON.stringify(tours)+';\n'+script);
fs.writeFileSync(path.join(dist,'style.css'),fs.readFileSync(path.join(root,'src/fonts.css'),'utf8')+'\n'+fs.readFileSync(path.join(root,'src/style.css'),'utf8'));
fs.writeFileSync(path.join(dist,'tours.json'),JSON.stringify(tours));
const assetRefs=new Set([...fs.readFileSync(path.join(dist,'app.js'),'utf8').matchAll(/\/assets\/([^"'\s]+)/g)].map(x=>x[1]));
for(const file of fs.readdirSync(path.join(dist,'assets'))){if(/\.(jpg|jpeg)$/.test(file)&&fs.existsSync(path.join(dist,'assets',file.replace(/\.(jpg|jpeg)$/,'.webp'))))fs.unlinkSync(path.join(dist,'assets',file))}
console.log(`Built ${routes.length} complete pages and the not-found page.`);
