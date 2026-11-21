/* Supplemental teaching aids; original Days 01–03 remain byte-for-byte intact. */
window.ENGLISH_GUIDE = (() => {
 const sounds = [
 ['θ','혀끝을 윗니 끝에 가볍게 대거나 살짝 내밀고 공기를 흘린다. 입술은 편안하게, 성대는 울리지 않는다. /s/나 /t/로 바꾸지 않는다.'],
 ['ð','/θ/와 같은 혀 위치에서 성대를 울린다. 한국어 ㄷ처럼 공기를 완전히 막지 않는다.'],
 ['æ','입술을 펴고 턱을 충분히 내리며 혀 앞부분을 낮춘다. 한국어 에 하나로 대체하지 않는다.'],
 ['ʊ','입술을 약하게 둥글리고 혀 뒤쪽을 높이되 /uː/보다 힘을 뺀다. 우를 길게 읽지 않는다.'],
 ['ɪ','입술을 과하게 당기지 말고 혀 앞쪽을 /iː/보다 조금 낮게 둔다. 한국어 이와 완전히 같지 않다.'],
 ['ə','입술과 턱에 힘을 빼고 혀를 입 중앙에 둔다. 약한 음절의 짧은 중성 모음이며 또렷한 아로 읽지 않는다.'],
 ['ɝ','혀끝을 뒤로 살짝 굽히거나 혀몸을 모으되 입천장에 닿지 않는다. 입술은 약간 둥글게. 한국어 어+르 두 음절로 나누지 않는다.'],
 ['r','미국식 /r/은 보통 [ɹ]. 혀끝을 윗잇몸에 붙이지 말고 혀를 뒤로 모은다. 입술은 약간 둥글게; ㄹ처럼 튕기지 않는다.'],
 ['l','혀끝을 윗니 뒤 잇몸에 대고 양옆으로 공기를 보낸다. 끝의 /l/은 혀 뒤쪽도 올라가며 뒤에 으를 붙이지 않는다.'],
 ['f','윗니를 아랫입술에 가볍게 대고 바람을 낸다. 두 입술을 붙여 ㅍ처럼 터뜨리지 않는다.'],
 ['v','윗니와 아랫입술 사이로 바람을 보내며 성대를 울린다. /b/처럼 두 입술을 닫지 않는다.'],
 ['z','혀를 윗잇몸 가까이에 두어 좁은 틈으로 공기를 보내고 성대를 울린다. /s/처럼 무성음으로만 읽거나 즈로 음절을 추가하지 않는다.'],
 ['ʃ','혀 앞쪽을 잇몸 뒤로 접근시키고 입술을 조금 둥글린다. 쉬 뒤에 별도 이 모음을 붙이지 않는다.'],
 ['dʒ','혀 앞쪽으로 잇몸 뒤 공기를 잠깐 막았다가 마찰시키며 푼다. 성대를 울리고 끝에 이·으 모음을 덧붙이지 않는다.'],
 ['aʊ','입을 열고 시작해 입술을 둥글리며 혀를 뒤·위로 이동한다. 아와 우를 두 음절로 끊지 않는다.'],
 ['eɪ','입술은 크게 둥글리지 않고 혀 앞부분을 조금 올리며 한 음절 안에서 움직인다. 에를 고정해서 끝내지 않는다.']
 ];
 const visuals = {
 'd01-01':['wind down','빠른 활동','서서히 줄이기','휴식·종료','turn off는 즉시 끄기; wind down은 점진적 전환'],
 'd01-02':['catch up on','밀린 이메일','시간을 내서 처리','밀린 것 감소','사람을 만날 때는 catch up with'],
 'd01-03':['cut back on','커피 4잔','양을 줄임','커피 2잔','give up: 0잔으로 끊기 / cut back: 적게 하기'],
 'd01-04':['figure out','어떻게 하지?','생각·추론','방법을 알아냄','figure it out: 대명사는 가운데'],
 'd01-05':['back out of','이미 한 약속','참여를 철회','약속에서 빠짐','처음부터 거절하는 것과 구별'],
 'd01-06':['go over','문서·계획','다시 살펴봄','오류·내용 확인','go through는 순서대로 살피는 느낌이 더 강함'],
 'd02-01':['bring up','아직 안 한 이야기','화제를 꺼냄','논의 시작','mention: 언급 / bring up: 화제 제기'],
 'd02-02':['look into','문제 발생','원인 조사','사실 확인','look at: 보기 / look into: 조사'],
 'd02-03':['run into','계획 없는 이동','뜻밖의 만남','친구·문제 발견','meet은 계획된 만남도 포함'],
 'd02-04':['put off','오늘 할 일','나중으로 이동','미래에 실행','cancel은 취소; put off는 연기'],
 'd02-05':['come across','찾으려던 게 아님','우연히 발견','책·정보·사람','come across as는 인상을 주다'],
 'd02-06':['get around to','계속 미룬 일','드디어 시간 남','마침내 착수','to + 명사/-ing: get around to calling'],
 'd03-01':['sort out','뒤섞인 문제','분류·정돈·해결','정리된 상태','sort it out: 대명사는 가운데'],
 'd03-02':['hold off on','하려던 결정','이유가 있어 대기','판단을 보류','on + 명사/-ing; 기다리는 이유에 초점'],
 'd03-03':['take over','기존 담당자 A','업무 인계','새 담당자 B','take on: 새 책임 / take over: 인계'],
 'd03-04':['come up with','해결할 문제','생각을 만들어 냄','새 제안·계획','아이디어가 실제로 나왔다는 결과에 초점'],
 'd03-05':['deal with','문제·상황','대응·처리','상황 관리','항상 완전 해결을 뜻하는 것은 아님'],
 'd03-06':['narrow down','후보 10개','조건으로 압축','후보 3개','choose는 최종 선택; narrow down은 후보 축소']
 };
 function el(tag,text){const n=document.createElement(tag); if(text)n.textContent=text;return n;}
 function diagram(data){
  const f=el('figure');f.className='concept';const ns='http://www.w3.org/2000/svg';
  const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 560 220');svg.setAttribute('role','img');svg.setAttribute('aria-label',data.join('. '));
  function shape(tag,attrs,text){const n=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,v));if(text)n.textContent=text;svg.append(n);}
  shape('title',{},data[0]+' 의미 흐름');
  shape('text',{x:24,y:32,fill:'#183b56','font-size':21,'font-weight':700},data[0]);
  [data[1],data[2],data[3]].forEach((label,i)=>{
   const x=20+i*180;shape('rect',{x,y:65,width:160,height:80,rx:12,fill:i===1?'#e4eef9':'#f0f4f7',stroke:'#b7c8d8'});
   // Small fixed labels avoid clipping on narrow screens; full meaning remains in caption.
   const chunks=Array.from(label); for(let j=0;j<chunks.length;j+=10)shape('text',{x:x+80,y:96+Math.floor(j/10)*22,'text-anchor':'middle','font-size':17,fill:'#183b56'},chunks.slice(j,j+10).join(''));
   if(i<2)shape('path',{d:`M ${x+164} 105 h 12 m -5 -5 l 5 5 -5 5`,stroke:'#315e80',fill:'none','stroke-width':2});
  });
  ['상황','핵심 작용','결과'].forEach((label,i)=>shape('text',{x:100+i*180,y:184,'text-anchor':'middle','font-size':16,fill:'#4d6070'},label));
  f.append(svg,el('figcaption',data[4]));return f;
 }
 function render(card,root){
  const add=(title,text)=>{if(!text)return;const d=el('div');d.className='note';d.append(el('b',title+' · '),document.createTextNode(text));root.append(d);};
  add('문법 자세히',card.grammar);
  if(card.etymology){const e=card.etymology;add(e.status==='verified'?'출처 확인 어원':'어원 확인 상태',e.text);if(e.source){const a=el('a','어원 출처 · Etymonline ('+e.checked+')');a.href=e.source;a.target='_blank';a.rel='noopener noreferrer';root.append(a);}}
  if(card.pronunciation){add('강세·연습',card.pronunciation.stress+' '+card.pronunciation.practice);}
  const relevant=sounds.filter(([s])=>card.ipa.includes(s)).slice(0,3);
  relevant.forEach(([sound,note])=>add('/'+sound+'/ 입술·혀·한국어식 실수',note));
  const v=card.visual || visuals[card.id];if(v)root.append(diagram(v));
 }
 function intro(){const d=el('details');d.className='ipa-guide';d.append(el('summary','IPA 읽는 법 · 입술과 혀 연습'));
  [
   'IPA는 철자가 아니라 소리를 적는 기호입니다. / / 안을 읽습니다. 이 사이트는 미국 영어 중심이며 방언과 사전에 따라 표기가 다를 수 있습니다.',
   'ˈ는 바로 다음 음절의 주강세, ˌ는 부강세입니다. 예: /əˈkaʊnt/에서는 kaʊnt가 강합니다. 강세는 세기뿐 아니라 길이와 음높이 차이로 드러납니다. ː는 길이 표시입니다.',
   'ə는 힘을 뺀 약한 모음입니다. 모든 철자를 한국어 한 음절씩 읽지 마세요. 영어 자음 뒤에 으를 붙이면 단어 리듬이 달라집니다.',
   '구동사의 문장 강세는 문맥에 따라 변합니다. 단어의 강세 설명을 문장 전체에 기계적으로 적용하지 말고 예문을 함께 들어 보세요.',
   '느리게 재생은 브라우저 TTS 속도 요청입니다. 실제 속도와 억양은 선택한 음성 엔진에 따라 다릅니다. 자연스러운 강세를 익힐 때는 일반 속도와 번갈아 듣습니다.'
  ].forEach(t=>d.append(el('p',t)));const a=el('a','국제음성학회 공식 IPA 안내');a.href='https://www.internationalphoneticassociation.org/content/ipa-chart';a.target='_blank';a.rel='noopener noreferrer';d.append(a);return d;}
 return {render,intro,visuals};
})();
