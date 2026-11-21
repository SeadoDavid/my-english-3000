const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
const context = vm.createContext({window:{}});
const run = file => vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
run('data/manifest.js');
const manifest = context.window.ENGLISH_MANIFEST;
assert(Array.isArray(manifest) && manifest.length);
const dates = new Set(), ids = new Set(), terms = new Set();
const normalize = term => term.normalize('NFKC').trim().toLowerCase().replace(/\s+/g,' ');
manifest.forEach((entry,i) => {
 assert.equal(entry.day,i+1,'Days must be contiguous and ordered');
 assert.equal(entry.file,`data/day-${String(entry.day).padStart(2,'0')}.js`);
 assert.equal(entry.date,new Date(Date.UTC(2026,10,18+i)).toISOString().slice(0,10));
 assert(!dates.has(entry.date),'Duplicate publication date'); dates.add(entry.date);
 run(entry.file);
 const cards=context.window.ENGLISH_LESSONS[entry.day];
 assert.equal(cards.length,30);
 assert.equal(cards.filter(c=>c.kind==='phrasal').length,10);
 assert.equal(cards.filter(c=>c.kind==='vocab').length,20);
 cards.forEach((card,j)=>{
  assert.equal(card.day,entry.day);
  assert.equal(card.id,`d${String(entry.day).padStart(2,'0')}-${String(j+1).padStart(2,'0')}`);
  assert(!ids.has(card.id));ids.add(card.id);
  for(const field of ['term','ipa','pos','meaning','pattern','nuance','contrast','tip']) assert(typeof card[field]==='string' && card[field].trim(),`${card.id}: missing ${field}`);
  assert.equal(card.examples.length,3);
  card.examples.forEach(e=>assert(e.en?.trim() && e.ko?.trim()));
  const term=normalize(card.term);
  if(entry.day>3) assert(!terms.has(term),`Repeated term: ${term}`);
  terms.add(term);
 });
});
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const [,script] of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(script);
console.log(`Validated ${manifest.length} days / ${ids.size} cards; new terms have no duplicates.`);
new vm.Script(fs.readFileSync(path.join(root,'learning.js'),'utf8'));
run('learning.js');
for(const entry of manifest){
 const cards=context.window.ENGLISH_LESSONS[entry.day];
 const visualCount=cards.filter(c=>c.visual||context.window.ENGLISH_GUIDE.visuals[c.id]).length;
 assert(visualCount>=5&&visualCount<=10,`Day ${entry.day}: need 5–10 concepts`);
 if(entry.day>=4)for(const c of cards){
  assert(c.grammar?.trim(),`${c.id}: missing grammar`);
  assert(c.pronunciation?.stress?.trim()&&c.pronunciation?.practice?.trim(),`${c.id}: missing pronunciation`);
  assert(['verified','unverified'].includes(c.etymology?.status),`${c.id}: missing etymology status`);
  assert(c.etymology.text?.trim());
  if(c.etymology.status==='verified')assert(/^https:\/\//.test(c.etymology.source)&&/^\d{4}-\d{2}-\d{2}$/.test(c.etymology.checked));
  if(c.visual){assert(c.visual.length===5&&c.visual.every(v=>typeof v==='string'&&v.trim()));assert(c.visual.slice(1,4).every(v=>Array.from(v).length<=20),'Diagram labels too long');}
 }
}
assert(html.includes('value="0.65"')&&html.includes('u.rate=Number'));
console.log('Validated grammar, source status, pronunciation, and 5–10 SVG concepts per day.');
