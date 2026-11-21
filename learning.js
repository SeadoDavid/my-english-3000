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
 function el(tag,text){const n=document.createElement(tag); if(text)n.textContent=text;return n;}
 function render(card,root){
  const add=(title,text)=>{if(!text)return;const d=el('div');d.className='note';d.append(el('b',title+' · '),document.createTextNode(text));root.append(d);};
  add('문법 자세히',card.grammar);
  const origin = card.etymology;
  if (origin?.status === 'verified' && origin.text?.trim() && /^https:\/\//.test(origin.source)) {
   add('출처 확인 어원', origin.text);
   const source = el('a', '어원 출처 · Etymonline (' + origin.checked + ')');
   source.href = origin.source;
   source.target = '_blank';
   source.rel = 'noopener noreferrer';
   root.append(source);
  } else {
   const note = el('div', '어원 확인 안 됨');
   note.className = 'note';
   root.append(note);
  }
  if(card.pronunciation){add('강세·연습',card.pronunciation.stress+' '+card.pronunciation.practice);}
  const relevant=sounds.filter(([s])=>card.ipa.includes(s)).slice(0,3);
  relevant.forEach(([sound,note])=>add('/'+sound+'/ 입술·혀·한국어식 실수',note));
 }
 function intro(){const d=el('details');d.className='ipa-guide';d.append(el('summary','IPA 읽는 법 · 입술과 혀 연습'));
  [
   'IPA는 철자가 아니라 소리를 적는 기호입니다. / / 안을 읽습니다. 이 사이트는 미국 영어 중심이며 방언과 사전에 따라 표기가 다를 수 있습니다.',
   'ˈ는 바로 다음 음절의 주강세, ˌ는 부강세입니다. 예: /əˈkaʊnt/에서는 kaʊnt가 강합니다. 강세는 세기뿐 아니라 길이와 음높이 차이로 드러납니다. ː는 길이 표시입니다.',
   'ə는 힘을 뺀 약한 모음입니다. 모든 철자를 한국어 한 음절씩 읽지 마세요. 영어 자음 뒤에 으를 붙이면 단어 리듬이 달라집니다.',
   '구동사의 문장 강세는 문맥에 따라 변합니다. 단어의 강세 설명을 문장 전체에 기계적으로 적용하지 말고 예문을 함께 들어 보세요.',
   '느리게 재생은 브라우저 TTS 속도 요청입니다. 실제 속도와 억양은 선택한 음성 엔진에 따라 다릅니다. 자연스러운 강세를 익힐 때는 일반 속도와 번갈아 듣습니다.'
  ].forEach(t=>d.append(el('p',t)));const a=el('a','국제음성학회 공식 IPA 안내');a.href='https://www.internationalphoneticassociation.org/content/ipa-chart';a.target='_blank';a.rel='noopener noreferrer';d.append(a);return d;}
 return {render,intro};
})();
