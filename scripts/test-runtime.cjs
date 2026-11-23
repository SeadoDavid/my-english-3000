// Exercise app initialization, card rendering and speech requests without an OS voice.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..');
class Element{
 constructor(tag='div'){this.tag=tag;this.children=[];this.value='';this.textContent='';this.classList={toggle(){}};this.style={};}
 append(...nodes){this.children.push(...nodes)} replaceChildren(...nodes){this.children=nodes} setAttribute(k,v){this[k]=v} after(){}
}
async function check({speech=true,blockedStorage=false}={}){
 const nodes=new Map();const node=id=>{if(!nodes.has(id))nodes.set(id,new Element());return nodes.get(id)};
 const stored=new Map([['english3000-voice','test-us'],['english3000-speed','0.65']]);const spoken=[];let context;
 const document={getElementById:node,createElement:t=>new Element(t),createElementNS:(_,t)=>new Element(t),createTextNode:t=>({textContent:t}),querySelector:()=>new Element(),head:{append(script){vm.runInContext(fs.readFileSync(path.join(root,script.src),'utf8'),context);script.onload();}}};
 const synth={getVoices:()=>[{voiceURI:'test-us',name:'Test US',lang:'en-US'}],cancel(){},speak:u=>spoken.push(u),addEventListener(){}};
 const window={};if(speech)window.speechSynthesis=synth;
 context=vm.createContext({window,document,speechSynthesis:synth,SpeechSynthesisUtterance:class{constructor(t){this.text=t}},localStorage:{getItem(k){if(blockedStorage)throw Error('disabled');return stored.get(k)||null},setItem(k,v){if(blockedStorage)throw Error('disabled');stored.set(k,v)}},alert(){}});
 for(const file of ['data/manifest.js','learning.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');const code=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1];await vm.runInContext(code,context);
 assert.equal(node('items').children.length,30);assert.equal(node('day').value,window.ENGLISH_MANIFEST.at(-1).day);
 node('day').value='4';node('day').onchange();
 node('items').children[10].onclick();node('toggle').onclick();assert.equal(node('term').textContent,'tentative');assert.equal(node('examples').children.length,3);
 if(speech){
  node('speed').value='0.65';node('sayTerm').onclick();assert.equal(spoken.at(-1).rate,0.65);
  if(!blockedStorage)assert.equal(spoken.at(-1).voice.voiceURI,'test-us');
  node('speed').value='0.95';node('speed').onchange();node('examples').children[0].children[0].children[0].onclick();assert.equal(spoken.at(-1).rate,0.95);assert.match(spoken.at(-1).text,/tentative date/);
 }else assert.equal(node('speed').disabled,true);
 for(let d=1;d<=4;d++){
  node('day').value=String(d);node('day').onchange();
  let verified=0,unverified=0;
  for(const button of [...node('items').children]){
   button.onclick();node('toggle').onclick();assert.equal(node('examples').children.length,3);
   const notes=node('notes').children;
   const hasSource=notes.some(note=>note.tag==='a'&&note.href?.startsWith('https://www.etymonline.com/word/'));
   const hasFallback=notes.some(note=>note.textContent==='어원 확인 안 됨');
   assert.notEqual(hasSource,hasFallback,'Every card needs a sourced origin or the exact fallback');
   verified+=Number(hasSource);unverified+=Number(hasFallback);
  }
  assert.deepEqual([verified,unverified],d===4?[20,10]:[0,30]);
 }
}
(async()=>{await check();await check({blockedStorage:true});await check({speech:false});console.log('Passed: 120 cards, translation toggle, both TTS rates, selected voice, blocked storage, unsupported TTS.');})().catch(e=>{console.error(e);process.exitCode=1});
