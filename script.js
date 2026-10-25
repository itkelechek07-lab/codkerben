/* ===== Код Кербени — HTML/CSS/JS (серверсиз, localStorage) ===== */
const PASS = "admin123";               // админ паролу
const KEY = "kod_kerbeni_v1", MEKEY = "kod_kerbeni_me";
const PER_DEFAULT = 10;                // оюнда бир аймакка чыгуучу суроо саны (админдан өзгөртүлөт)
const PASS_RATE = 0.6;                 // кийинки аймакка өтүү үчүн туура жооптун үлүшү

const REG = [
 {n:"Акыл өрөөнү",s:"Логика жана алгоритмдер",e:"🧠",c:"#1faa6b",x:90,y:320},
 {n:"Код капчыгайы",s:"Код жазуу, каталарды табуу",e:"💻",c:"#2f7bf0",x:250,y:240},
 {n:"Сырдуу үңкүр",s:"Табышмактар, суроолор",e:"🕳️",c:"#6a4fd8",x:410,y:330},
 {n:"Санарип көпүрө",s:"Татаал тапшырмалар",e:"🌉",c:"#f59f0a",x:570,y:230},
 {n:"Билим чокусу",s:"Финалдык сынак",e:"🏔️",c:"#e5383b",x:710,y:95}];
const PAL = [["#1f6fd1","#d6ecff","👁"],["#5b3fd0","#e3d9ff","</>"],["#e67a0a","#ffe6c2","⚡"],["#0e9a74","#c8f1e0","⚙"],["#e03a3a","#ffc9c9","🛡"],["#6a4fd8","#e1dcff","🍃"]];
const mk = (id,name,title,ability,img,emoji,i)=>({id,name,title,ability,img,emoji,photo:"",color:PAL[i][0],bg:PAL[i][1],icon:PAL[i][2]});
const CH0 = [
 mk("c1","Бүркүт","Билим издөөчү","Жөндөмү: алысты көрөт, татаал маселелерди байкайт. Окуучу логикалык суроолорду чечип, жаңы билимдерди ачат.","images/burkut.png","🦅",0),
 mk("c2","Илбирс","Код чебери","Жөндөмү: каталарды тез табат. Программалык коддогу каталарды таап, туура чечим кабыл алат.","images/ilbirs.png","🐆",1),
 mk("c3","Тулпар","Ылдам программист","Жөндөмү: тапшырмаларды тез аткарат. Алгоритмдерди түзүп, убакытка байланышкан тапшырмаларды аткарат.","images/tulpar.png","🐎",2),
 mk("c4","Шумкар","Алгоритм түзүүчү","Жөндөмү: так алгоритмдерди түзөт. Татаал маселени кадамдарга бөлүп чечет.","images/shumkar.png","🦅",3),
 mk("c5","Түлкү","Айлакер хакер","Жөндөмү: айла-амалды тез байкайт. Коопсуздуктагы алсыз жерлерди табып, оңдойт.","images/tulku.png","🦊",4),
 mk("c6","Коён","Изилдөөчү","Жөндөмү: кунт коюп изилдейт. Жаңы маалыматты издеп таап, билимин тереңдетет.","images/koen.png","🐰",5)];

const Q0 = [
 [0,"Алгоритм деген эмне?",["Маселени чечүүнүн так кадамдарынын ырааттуулугу","Программалоо тилинин аты","Компьютердин бөлүгү","Интернеттеги сайт"],0],
 [0,"A = 5 жана B = 3 болсо, «A > B» туурабы?",["Туура эмес","Туура","Белгисиз","Экөө тең барабар"],1],
 [0,"Сандарды өсүү тартибинде иретке келтирүүчү алгоритм кандай аталат?",["Издөө","Шифрлөө","Сорттоо","Архивдөө"],2],
 [1,"Python'до print(2 + 3 * 2) эмнени чыгарат?",["8","10","12","7"],0],
 [1,"Программадагы каталарды табып оңдоо процесси кандай аталат?",["Компиляция","Отладка (debugging)","Дизайн","Архивдөө"],1],
 [1,"for i in range(3): print(i) — print канча жолу аткарылат?",["2","4","3","0"],2],
 [2,"Табышмак: «Мен маанини сактайм, бирок аны өзгөртсө болот». Мен эмнемин?",["Өзгөрмө","Цикл","Функция","Шарт"],0],
 [2,"Python'до комментарий кайсы белги менен башталат?",["//","#","<!--","**"],1],
 [2,"Төмөнкүлөрдүн кайсынысы маалымат түрү эмес?",["int","string","bool","loop"],3],
 [3,"x = [1, 2, 3]; x.append(4) аткарылгандан кийин len(x) канчага барабар?",["3","5","4","1"],2],
 [3,"Адамдын жашы 18 же андан чоң экенин кайсы шарт текшерет?",["age < 18","age >= 18","age = 18","age != 18"],1],
 [3,"def add(a, b): return a + b — add(2, 3) эмнени кайтарат?",["23","6","5","None"],2],
 [4,"Рекурсия деген эмне?",["Цикл түрү","Функциянын өзүн өзү чакыруусу","Маалымат базасы","Ката түрү"],1],
 [4,"Массивдеги эң чоң санды табуу кандай убакыт татаалдыгына ээ?",["O(1)","O(n²)","O(log n)","O(n)"],3],
 [4,"Git'те өзгөртүүлөрдү версия катары сактоочу команда кайсы?",["git commit","git clone","git status","git push"],0]];

const seed = () => ({chars:CH0, set:{per:PER_DEFAULT,gen:true}, players:[],
  questions:Q0.map((q,i)=>({id:"q"+(i+1),country:REG[q[0]].n,text:q[1],options:q[2],correct:q[3]}))});
function load(){try{const d=JSON.parse(localStorage.getItem(KEY));if(d&&d.questions&&d.chars&&d.players){d.set=d.set||{per:PER_DEFAULT};return d}}catch(e){}return seed()}
function save(){try{localStorage.setItem(KEY,JSON.stringify(D))}catch(e){alert("Сактоо мүмкүн эмес: эстутум толгон. Сүрөттөрдү азайтыңыз.")}}

let D=load(), meId=localStorage.getItem(MEKEY)||"", tab="home", g=null, pick="", nameDraft="", msg="", shown=null, isAdmin=false;
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const rid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const me=()=>D.players.find(p=>p.id===meId)||null;
const stg=()=>Math.min((me()&&me().stage)||0,5);
const chOf=id=>D.chars.find(c=>c.id===id);
const per=()=>Math.max(1,parseInt(D.set.per)||PER_DEFAULT);
const pool=st=>D.questions.filter(q=>q.country===REG[st].n);

function av(id,fb,sz){const c=chOf(id),src=c&&(c.photo||c.img);
  return src?`<img class="av" src="${src}" alt="" style="width:${sz}px;height:${sz}px">`:`<span style="font-size:${sz*.8}px">${esc((c&&c.emoji)||fb||"🧑")}</span>`}

/* ---------- чийүү ---------- */
function setTab(k){
  if(k==="admin"&&!isAdmin){const p=prompt("Админ паролу:");if(p!==PASS){if(p!==null)alert("Пароль туура эмес");return}isAdmin=true}
  tab=k;render();window.scrollTo(0,0);
}
function render(){
  const m=me(); if(m&&shown===null)shown=stg();
  $("#user").innerHTML=m?`<span class="chip">${av(m.charId,m.char,30)} ${esc(m.name)} · ${m.score||0}</span><button class="x" onclick="logout()">↩ Башка</button>`:`<span class="chip"><span style="padding-left:8px">👤 Окуучу</span></span>`;
  $("#nav").innerHTML=[["home","🏠","Башкы бет"],["game","🎮","Оюн"],["rules","📖","Эрежелер"],["board","🏆","Жыйынтыктар"],["admin","⚙️","Админ"]]
    .map(([k,i,t])=>`<button class="${tab===k?"on":""}" onclick="setTab('${k}')">${i} ${t}</button>`).join("");
  $("#app").innerHTML=({home,rules,board,admin}[tab]||gamePage)();
  setTimeout(()=>{const a=$("#avs");if(a&&me()&&shown!==stg()){const p=POS[Math.min(stg(),4)];a.style.left=p[0]+"%";a.style.top=p[1]+"%";shown=stg()}},120);
}
function logout(){meId="";localStorage.removeItem(MEKEY);g=null;shown=null;pick="";nameDraft="";tab="home";render()}
function startBtn(){if(me()){tab="game";render();return}
  const p=$("#pick");if(p){p.scrollIntoView({behavior:"smooth",block:"center"});setTimeout(()=>$("#nm")&&$("#nm").focus(),500)}else{tab="game";render()}}

/* ---------- башкы бет ---------- */
const MOUNT=`<svg class="bg" viewBox="0 0 1200 240" preserveAspectRatio="none" aria-hidden="true"><polygon points="0,240 120,70 230,170 360,40 520,200 640,90 780,210 930,50 1080,190 1200,100 1200,240" fill="#8fb0d6"/><polygon points="360,40 320,100 360,88 400,110" fill="#fff"/><polygon points="930,50 890,110 930,98 970,120" fill="#fff"/><polygon points="120,70 90,120 120,110 150,125" fill="#fff"/><path d="M0,240 Q200,170 420,215 T800,205 T1200,210 V240Z" fill="#3f8a4d"/></svg>`;
function home(){
  const top=[...D.players].sort((a,b)=>(b.score||0)-(a.score||0)).slice(0,5);
  return `<section class="hero">${MOUNT}<img class="yurt" src="images/hero-yurt.png" alt=""><img class="eagle" src="images/hero-eagle.png" alt="">
    <div class="in"><h1>Код Кербени</h1><h2>Программалоону үйрөн — жаңы дүйнөнү ач!</h2>
    <p>Бул оюнда сен кыргыз жери менен саякаттап, программалоо боюнча суроолорго жооп берип, баатырларың менен чокуга жетесиң!</p>
    <button class="cta" onclick="startBtn()">▶ ${me()?"Сапарды улантуу":"Оюнду баштоо"}</button></div>
    <div class="quote">“Чыныгы күч — билимде!”</div></section>
  <div class="page"><div class="cols"><div>${me()?meCard():picker()}<div class="card"><h2>🗺️ Саякаттын картасы</h2><p class="sub">Ар бир аймак — жаңы билим, жаңы чакырык!</p>${mapSvg(me()?stg():-1)}</div></div>
  <div><div class="card"><h3>🎮 Оюн жөнүндө</h3><p class="mu">Код Кербени — бул программалоону үйрөнүүгө жардам берген кызыктуу оюн. Суроолорго жооп бегин, тоскоолдуктарды жеңип, ар бир аймактан өтөсүң. Максат — Билим чокусуна жетүү!</p>
  <ul class="list">${REG.map(r=>`<li><span class="dot" style="background:${r.c}">${r.e}</span>${r.s}</li>`).join("")}</ul></div>
  <div class="card top5"><button class="link" onclick="setTab('board')">Толук тизме →</button><h3>🏆 Топ 5 окуучу</h3>${top.length?top.map((p,i)=>`<div class="r"><span class="n">${i+1}</span>${av(p.charId,p.char,32)}<b>${esc(p.name)}</b><span class="p">${p.score||0} упай</span></div>`).join(""):'<p class="mu">Азырынча катышуучулар жок — биринчи болуп башта!</p>'}</div></div></div></div>`;
}
function cards(){return `<div class="cg">${D.chars.map(c=>`<button class="cc ${c.id===pick?"sel":""}" style="--c:${c.color||"#1f6fd1"};--bgc:${c.bg||"#d6ecff"}" onclick="choose('${c.id}')"><div class="im">${c.photo||c.img?`<img src="${c.photo||c.img}" alt="">`:esc(c.emoji||"🧑")}</div><b>${esc(c.name)}</b><small>${esc(c.title||"")}</small><span class="ico">${esc(c.icon||"⭐")}</span></button>`).join("")}</div>`}
function picker(){
  if(!D.chars.length)return `<div class="card">Азырынча каармандар жок. «Админ» бөлүмүндө кошуңуз.</div>`;
  if(pick&&!chOf(pick))pick="";const c=chOf(pick);
  return `<div class="card" id="pick"><h2>👥 Каарманды танда</h2><p class="sub">Ар бир каарман өзгөчө жөндөмгө ээ. Өзүңө ылайыктуу каарманды тандап, сапарыңды баштa!</p>
  <label for="nm">Студенттин аты-жөнү</label><input id="nm" maxlength="30" placeholder="Мисалы: Айбек" value="${esc(nameDraft)}" oninput="nameDraft=this.value">
  ${cards()}${c?`<div class="note"><b>${esc(c.name)} — ${esc(c.title||"")}.</b> ${esc(c.ability||"")}</div>`:""}
  <p class="mu" style="font-size:.85rem">Ушул ат менен мурун ойногон болсоң, жолуң сакталат.</p>
  <button class="cta" style="font-size:1.05rem;padding:11px 30px" onclick="begin()">${pick?"▶ Сапарга чыгуу":"Алгач каарманды танда"}</button></div>`;
}
function meCard(){const m=me(),c=chOf(m.charId);
  return `<div class="card"><h2>${av(m.charId,m.char,44)} ${esc(m.name)}</h2><p class="mu">${c?esc(c.name)+" — "+esc(c.title||""):""}</p><p>Аймак: <b>${stg()>=5?"Билим чокусу 🏔️":(stg()+1)+"/5 — "+REG[stg()].n}</b> · Упай: <b>${m.score||0}</b></p><button class="btn pri" onclick="tab='game';render()">Сапарды улантуу →</button></div>`}
function choose(id){pick=id;render()}
function begin(){
  const name=nameDraft.trim();
  if(!pick){alert("Алгач каарманды танда");return}
  if(!name){alert("Атыңызды жазыңыз");$("#nm")&&$("#nm").focus();return}
  const id=name.toLowerCase().replace(/\s+/g," ");let p=D.players.find(x=>x.id===id);
  if(!p){const c=chOf(pick);p={id,name,charId:pick,char:(c&&c.emoji)||"🧑",score:0,stage:0};D.players.push(p);save()}
  meId=id;localStorage.setItem(MEKEY,id);shown=stg();tab="game";render();
}


/* ---------- автоматтык (кокус сандуу) суроолор: админ суроосу жетпесе толтурат ---------- */
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
function O(c,ds){const C=String(c),arr=[C];for(const d of ds){const s=String(d);if(!arr.includes(s))arr.push(s)}
  let k=1;while(arr.length<4){const s=typeof c==="number"?String(c+k):C+k;if(!arr.includes(s))arr.push(s);k++}
  const o=shuffle(arr.slice(0,4));return{options:o,correct:o.indexOf(C)}}
const GEN=[
 [()=>{let a=R(2,20),b=R(2,20);while(a===b)b=R(2,20);return{text:`A = ${a} жана B = ${b} болсо, «A > B» туурабы?`,options:["Туура","Туура эмес","Белгисиз","Экөө тең барабар"],correct:a>b?0:1}},
  ()=>{const n=R(10,99);return{text:`${n} саны жуп сандабы? (n % 2 == 0 шарты менен текшер)`,options:["Ооба, жуп","Жок, так","Белгисиз","Нөл"],correct:n%2===0?0:1}},
  ()=>{const a=R(1,9),d=R(2,6);return{text:`Сандар катары: ${a}, ${a+d}, ${a+2*d}, ${a+3*d}, ... Кийинки сан кайсы?`,...O(a+4*d,[a+4*d+1,a+4*d-1,a+5*d])}},
  ()=>{const a=R(1,9),b=R(10,19),c=R(20,29);return{text:`${shuffle([a,b,c]).join(", ")} сандарын өсүү тартибинде иретке келтирсең, ортодогу сан кайсы?`,...O(b,[a,c,b+1])}}],
 [()=>{const a=R(1,9),b=R(2,9),c=R(2,5);return{text:`Python'до print(${a} + ${b} * ${c}) эмнени чыгарат?`,...O(a+b*c,[(a+b)*c,a+b+c,a*b*c])}},
  ()=>{const n=R(2,9);return{text:`for i in range(${n}): print(i) — print канча жолу аткарылат?`,...O(n,[n-1,n+1,0])}},
  ()=>{const a=R(1,20),b=R(1,20);return{text:`x = ${a}; x = x + ${b}; print(x) эмнени чыгарат?`,...O(a+b,[a,b,a*b])}},
  ()=>{const w=["программа","алгоритм","код","python","клавиатура","компьютер"][R(0,5)];return{text:`Python'до len("${w}") канчага барабар?`,...O(w.length,[w.length+1,w.length-1,w.length+2])}}],
 [()=>{const a=R(2,9),b=R(3,12);return{text:`Табышмак: x = ${a}; y = x * ${b}; y канчага барабар?`,...O(a*b,[a+b,a*b+1,a*b-1])}},
  ()=>{const a=R(1,5),b=a+R(3,8);return{text:`range(${a}, ${b}) канча сан чыгарат?`,...O(b-a,[b-a+1,b-a-1,b])}},
  ()=>{const b=R(2,9),a=b*R(2,6)+R(1,b-1);return{text:`${a} % ${b} (бөлүүдөн калган калдык) эмнеге барабар?`,...O(a%b,[a%b+1,Math.floor(a/b),b])}},
  ()=>{const s=["аб","ко","ку"][R(0,2)],n=R(2,4);return{text:`Python'до "${s}" * ${n} эмнени чыгарат?`,...O(s.repeat(n),[s.repeat(n+1),s+n,s.repeat(n-1)])}}],
 [()=>{const a=R(2,9),b=R(2,9);return{text:`def f(a, b): return a * b — f(${a}, ${b}) эмнени кайтарат?`,...O(a*b,[a+b,a*b+a,a*b-1])}},
  ()=>{const l=[R(1,9),R(10,50),R(51,99),R(1,50)];return{text:`m = [${l.join(", ")}]; max(m) эмнени кайтарат?`,...O(Math.max(...l),[Math.min(...l),l[0],l.reduce((x,y)=>x+y)])}},
  ()=>{const a=R(1,5),b=a+R(3,8);return{text:`i = ${a}; while i < ${b}: i += 1 — цикл бүткөндө i канчага барабар?`,...O(b,[b-1,b+1,a])}},
  ()=>{const n=R(3,8);return{text:`x = []; for i in range(${n}): x.append(i) — len(x) канча?`,...O(n,[n-1,n+1,0])}}],
 [()=>{const n=R(3,6);let f=1;for(let i=2;i<=n;i++)f*=i;return{text:`${n}! (факториал) канчага барабар?`,...O(f,[f+n,f*2,f-1])}},
  ()=>{const n=R(3,10);return{text:`Python'до 2 ** ${n} эмнеге барабар?`,...O(2**n,[2*n,n**2,2**n+n])}},
  ()=>{const n=R(5,12),f=[0,1];for(let i=2;i<=n+1;i++)f.push(f[i-1]+f[i-2]);return{text:`Фибоначчи катары (F(0)=0, F(1)=1, F(2)=1, F(3)=2, ...): F(${n}) канчага барабар?`,...O(f[n],[f[n]+1,f[n-1],f[n+1]])}},
  ()=>{const n=R(4,20)*10;return{text:`${n} элементтен турган массивде сызыктуу издөө эң жаманында канча салыштыруу жасайт?`,...O(n,[n/2,n+1,Math.ceil(Math.log2(n))])}}]];
function genQ(st,k){const out=[];let t=shuffle(GEN[st]);while(out.length<k){if(!t.length)t=shuffle(GEN[st]);out.push({id:"g"+rid()+out.length,country:REG[st].n,gen:true,...t.pop()()})}return out}
const useGen=()=>D.set.gen!==false;
const cnt=st=>useGen()?per():cnt(st);
const qOf=id=>D.questions.find(x=>x.id===id)||((me()&&me().sess&&me().sess.extra)||[]).find(x=>x.id===id);

/* ---------- карта (сүрөт + түйүндөр) ---------- */
const POS=[[10.9,58.8],[31.2,43.6],[50.3,62.8],[71.3,47],[88.8,17]];   // түйүндөрдүн % координаттары
function mapSvg(st){
  const m=me(),c=m&&chOf(m.charId),src=c&&(c.photo||c.img),sh=shown===null?Math.max(st,0):shown,p=POS[Math.min(sh,4)];
  const nodes=REG.map((r,i)=>{const done=i<st,lock=st>=0&&i>st,cur=i===st;
    return `<div class="nd ${done?"done":lock?"lock":cur?"cur":"all"}" style="left:${POS[i][0]}%;top:${POS[i][1]}%;--c:${r.c}" title="${r.n}">${done?"✓":lock?"🔒":i+1}</div>`}).join("");
  const avt=st>=0&&m?`<div id="avs" class="mav" style="left:${p[0]}%;top:${p[1]}%">${src?`<img src="${src}" alt="">`:`<span>${esc((c&&c.emoji)||m.char||"🧑")}</span>`}</div>`:"";
  return `<div class="mapw"><div class="mapi"><img src="images/map.jpg" alt="Саякаттын картасы">${nodes}${avt}</div></div>`;
}

/* ---------- оюн ---------- */
function gamePage(){
  const m=me(); if(!m)return `<div class="page">${picker()}</div>`;
  if(g&&g.res)return `<div class="page">${resultView()}</div>`;
  if(g&&g.list)return `<div class="page">${questView()}</div>`;
  const st=stg(),r=REG[st];
  return `<div class="page"><div class="card">${mapSvg(st)}</div>`+(st>=5
   ?`<div class="card"><h2>🎉 Куттуктайбыз, ${esc(m.name)}!</h2><p>Сен Билим чокусуна чыктың жана бардык аймактардан өттүң. Жалпы упайың: <b>${m.score||0}</b>.</p><button class="btn pri" onclick="setTab('board')">Жыйынтыктарды көрүү 🏆</button></div>`
   :`<div class="card"><p class="mu">Азыркы аймак (${st+1}/5)</p><h2>${r.e} ${r.n}</h2><p>${r.s}. Бул аймакта <b>${cnt(st)}</b> суроо чыгат. Аймактан өтүү үчүн кеминде <b>${need(cnt(st))}</b> туура жооп бер. Ар бир туура жооп = <b>${10*(st+1)}</b> упай.</p><button class="cta" style="font-size:1.05rem;padding:11px 30px" onclick="startRegion()">▶ ${m.sess&&m.sess.st===st?"Улантуу":"Тапшырманы баштоо"}</button></div>`)+`</div>`;
}
const need=n=>Math.max(1,Math.ceil(n*PASS_RATE));
function startRegion(){
  const m=me(),st=stg(),P=pool(st),n=cnt(st);
  if(!n){alert("Бул аймакка суроолор азырынча жок. Окутуучуга айтыңыз.");return}
  const s=m.sess,ok=s&&s.st===st&&s.ids.length&&s.ids.every(id=>P.some(q=>q.id===id)||(s.extra||[]).some(q=>q.id===id));
  if(!ok){
    const seen=(m.seen&&m.seen[st])||[];
    const fresh=shuffle(P.filter(q=>!seen.includes(q.id))),old=shuffle(P.filter(q=>seen.includes(q.id)));
    const stat=fresh.concat(old).slice(0,n);                                   // админ суроолорунан кокус тандоо
    const extra=useGen()&&stat.length<n?genQ(st,n-stat.length):[];            // жетпесе — автоматтык суроо
    const ids=shuffle(stat.map(q=>q.id).concat(extra.map(q=>q.id)));          // суроолордун тартиби да аралашат
    m.sess={st,ids,i:0,c:0,extra};m.seen=m.seen||{};m.seen[st]=[...new Set([...seen,...stat.map(q=>q.id)])];save();
  }
  g={list:m.sess.ids,i:m.sess.i,ans:null,opts:null};newOpts();render();
}
function newOpts(){const q=qOf(g.list[g.i]);g.opts=q?shuffle(q.options.map((_,k)=>k)):[]}
function questView(){
  const st=stg(),r=REG[st],q=qOf(g.list[g.i]),n=g.list.length,m=me();
  const last=g.i>=n-1;
  return `<div class="card"><span class="rb" style="background:${r.c}">${r.e} ${r.n}</span> <span class="mu">· Суроо ${g.i+1} / ${n} · туура: ${m.sess.c}</span><div class="pb"><i style="width:${(g.i+(g.ans!==null?1:0))/n*100}%"></i></div>
  <h2 style="margin-top:6px">${esc(q.text)}</h2>`+g.opts.map((o,k)=>`<button class="opt ${g.ans!==null?(o===q.correct?"ok":k===g.ans?"bad":""):""}" ${g.ans!==null?"disabled":""} onclick="answer(${k})">${esc(q.options[o])}</button>`).join("")
  +(g.ans===null?"":`<div class="toast">${g.opts[g.ans]===q.correct?"✅ Туура!":"❌ Туура эмес. Туура жооп: <b>"+esc(q.options[q.correct])+"</b>"}</div><button class="btn pri" onclick="${last?"finish()":"next()"}">${last?"Жыйынтыкты көрүү 🏁":"Кийинки суроо →"}</button>`)+`</div>`;
}
function answer(k){const m=me(),q=qOf(g.list[g.i]);g.ans=k;
  if(g.opts[k]===q.correct)m.sess.c++;m.sess.i=g.i+1;save();render()}
function next(){g.i++;g.ans=null;newOpts();render()}
function finish(){
  const m=me(),st=stg(),s=m.sess,n=s.ids.length,pass=s.c>=need(n),pts=s.c*10*(st+1);
  if(pass){m.stage=st+1;m.score=(m.score||0)+pts;m.pts=m.pts||{};m.pts[st]=(m.pts[st]||0)+pts}
  g={res:{pass,c:s.c,n,pts,need:need(n),st}};delete m.sess;save();render();
}
function resultView(){const r=g.res,reg=REG[r.st];
  return `<div class="card"><h2>${r.pass?"🎉 Аймак өттүң!":"😕 Бул жолу болбоду"}</h2><p><span class="rb" style="background:${reg.c}">${reg.e} ${reg.n}</span></p>
  <p>Туура жооп: <b>${r.c} / ${r.n}</b> (өтүү үчүн кеминде ${r.need} керек)${r.pass?`<br>Упай: <b>+${r.pts}</b>`:""}</p>
  ${r.pass?`<button class="btn pri" onclick="g=null;render()">Картага өтүү 🗺️</button>`:`<button class="btn pri" onclick="startRegion()">Кайра аракет кылуу (жаңы суроолор) →</button>`}</div>`}

/* ---------- эрежелер / жыйынтыктар ---------- */
function rules(){return `<div class="page"><div class="card"><h2>📖 Оюн эрежелери</h2>
  <ol><li><b>Каарманыңды танда</b> жана атыңды жаз — оюн ушундан башталат.</li>
  <li>Картада <b>5 аймак</b> бар: ${REG.map(r=>r.n).join(" → ")}.</li>
  <li>Ар бир аймакта суроолордун топтомунан сага <b>${per()} кокус суроо</b> чыгат. Ар бир студентке ар башка суроолор түшүшү мүмкүн.</li>
  <li>Аймактан өтүү үчүн суроолордун кеминде <b>${Math.round(PASS_RATE*100)}%</b>ына туура жооп бер. Өтсөң, каарман кийинки аймакка жүрөт.</li>
  <li>Өтпөсөң, аймакта калып, жаңы суроолор менен кайра аракет кыласың.</li>
  <li>Ар бир туура жооп үчүн упай аласың. Аймак алыстаган сайын упай көбөйөт (10, 20, 30, 40, 50).</li>
  <li>Билим чокусуна жеткен жана эң көп упай топтогон студент жеңет! 🏆</li></ol></div></div>`}
const ranked=()=>[...D.players].sort((a,b)=>(b.score||0)-(a.score||0)||(b.stage||0)-(a.stage||0));
const ptsOf=(p,i)=>i<(p.stage||0)&&p.pts&&p.pts[i]!==undefined?p.pts[i]:null;
function board(){
  const list=ranked(),m=["🥇","🥈","🥉"],w=list[0];
  const champ=w&&(w.score||0)>0?`<div class="champ"><span style="font-size:2.2rem">🏆</span>${av(w.charId,w.char,52)}<div><small>Мыкты окуучу</small><b>${esc(w.name)}</b></div><span class="tot">${w.score} упай</span></div>`:"";
  const head=`<tr><th>#</th><th>Окуучу</th>${REG.map((r,i)=>`<th style="text-align:center"><span class="dot" style="background:${r.c};margin-bottom:2px">${r.e}</span><br>${r.n}</th>`).join("")}<th style="text-align:center">Жалпы упай</th></tr>`;
  const rows=list.map((p,i)=>`<tr class="${i===0&&(p.score||0)>0?"top1":""}"><td>${m[i]||i+1}</td><td style="white-space:nowrap">${av(p.charId,p.char,30)} ${esc(p.name)}${p.id===meId?" <small class=\"mu\">(сен)</small>":""}</td>${REG.map((r,k)=>{const v=ptsOf(p,k);return `<td style="text-align:center">${v===null?'<span class="mu">—</span>':"<b>"+v+"</b>"}</td>`}).join("")}<td style="text-align:center"><b style="font-size:1.1rem">${p.score||0}</b></td></tr>`).join("");
  return `<div class="page">${champ}<div class="card"><button class="btn pri" style="float:right" onclick="exportCSV()">⬇️ Excel (CSV)</button><h2>🏆 Жыйынтыктар</h2><p class="sub">Ар бир окуучунун ар бир аймактан алган упайы жана жалпы упайы</p>${list.length?`<div style="overflow-x:auto"><table>${head}${rows}</table></div>`:'<p class="mu">Азырынча катышуучулар жок.</p>'}</div></div>`;
}
function exportCSV(){
  const rows=[["№","Окуучу",...REG.map(r=>r.n),"Жалпы упай"],...ranked().map((p,i)=>[i+1,p.name,...REG.map((r,k)=>{const v=ptsOf(p,k);return v===null?"":v}),p.score||0])];
  const csv="\ufeff"+rows.map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(";")).join("\r\n");
  const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));a.download="jyjyntyktar.csv";a.click();
}

/* ---------- админ ---------- */
function admin(){
  return `<div class="page">${msg?`<div class="toast">${msg}</div>`:""}
  <div class="card"><h2>🎲 Оюндагы суроо саны</h2><p class="mu">Ар бир аймакта канча суроо түзсөңүз да (мис. 20), студентке ушул сандагы <b>кокус</b> суроо гана чыгат. Калган суроолор башка студенттерге түшөт.</p>
  <div class="row"><input id="per" type="number" min="1" max="100" value="${per()}"><button class="btn pri" style="flex:0 0 auto" onclick="savePer()">Сактоо</button></div>
  <label style="display:flex;gap:8px;align-items:center;margin-top:8px"><input type="checkbox" id="gen" style="width:auto;margin:0" ${useGen()?"checked":""}> Суроо жетпесе, кокус сандуу автоматтык суроолор менен толтуруу</label></div>
  <div class="card"><h2>📚 Суроолор (${D.questions.length})</h2>${REG.map((r,i)=>{const n=pool(i).length;return `<div class="reg"><span class="dot" style="background:${r.c}">${r.e}</span><div style="flex:1"><b>${r.n}</b><br><span class="mu">${n} суроо · оюнда ${cnt(i)} чыгат${n<per()?(useGen()?" · калганы автоматтык суроо":" ⚠️ суроо аз"):""}</span></div><button class="btn" onclick="toggleList(${i})">Көрүү</button></div><div id="ql${i}" style="display:none">${qTable(i)}</div>`}).join("")}</div>
  <div class="card"><h2>📥 Суроолорду бир жолу кошуу</h2><p class="mu">Ар суроону бош сап менен бөлүңүз. 1-сап — суроо, андан кийин жооптор. Туура жоопту <b>*</b> менен белгилеңиз.</p>
  <pre class="note" style="white-space:pre-wrap">Компьютер деген эмне?
*Маалыматты иштетүүчү машина
Музыкалык аспап
Телефондун түрү

Python'до комментарий кайсы белги?
//
*#
&lt;!--</pre>
  <label for="bc">Аймак</label><select id="bc">${REG.map(r=>`<option>${r.n}</option>`).join("")}</select><textarea id="bt" rows="10" placeholder="Суроолорду ушул жерге чаптаңыз"></textarea><button class="btn pri" onclick="bulk()">Суроолорду кошуу</button></div>
  <div class="card"><h2>➕ Бир суроо кошуу</h2><label for="qc">Аймак</label><select id="qc">${REG.map(r=>`<option>${r.n}</option>`).join("")}</select>
  <label for="qt">Суроо</label><textarea id="qt" rows="2"></textarea><label>Жооп варианттары (туурасын белгиле)</label>
  ${[0,1,2,3].map(i=>`<div class="row"><input type="radio" name="cr" value="${i}" ${i===0?"checked":""} style="flex:0 0 24px;width:24px" aria-label="Туура жооп"><input id="o${i}" placeholder="Вариант ${i+1}"></div>`).join("")}<button class="btn pri" onclick="addQ()">Суроону сактоо</button></div>
  <div class="card"><h2>🦸 Жаңы каарман кошуу</h2><label for="cn">Аты</label><input id="cn" placeholder="Мисалы: Бүркүт"><label for="ct">Наамы</label><input id="ct" placeholder="Билим издөөчү"><label for="ca">Жөндөмү</label><textarea id="ca" rows="3" placeholder="Жөндөмү: ..."></textarea><label for="cf">Сүрөтү</label><input id="cf" type="file" accept="image/*"><button class="btn pri" onclick="addC()">Каарманды сактоо</button></div>
  <div class="card"><h2>Каармандар (${D.chars.length})</h2><div class="cg">${D.chars.map(c=>`<div class="cc" style="--c:${c.color||"#1f6fd1"};--bgc:${c.bg||"#d6ecff"}"><div class="im">${c.photo||c.img?`<img src="${c.photo||c.img}" alt="">`:esc(c.emoji||"🧑")}</div><b>${esc(c.name)}</b><small>${esc(c.title||"")}</small><label class="btn" style="display:block;margin:6px;font-size:.8rem">📷 Сүрөт<input type="file" accept="image/*" hidden onchange="setPhoto('${c.id}',this.files[0])"></label><button class="btn" style="margin:0 6px 8px;font-size:.8rem" onclick="delC('${c.id}')">🗑 Өчүрүү</button></div>`).join("")}</div></div>
  <div class="card"><h2>💾 Берилиштер</h2><p class="mu">Бир нече компьютер болсо: «Экспорттоо» → файлды бир компьютерге «Импорттоо» кылсаңыз, упайлар бириктирилет.</p>
  <button class="btn" onclick="exportData()">⬇️ Экспорттоо</button> <label class="btn" style="display:inline-block">⬆️ Импорттоо<input type="file" accept=".json,application/json" hidden onchange="importData(this.files[0])"></label>
  <p><button class="btn" onclick="resetScores()">Упайларды нөлгө келтирүү</button> <button class="btn" onclick="resetPlayers()">Бардык студенттерди өчүрүү</button></p></div></div>`;
}
const qTable=i=>{const l=pool(i);return l.length?`<table>${l.map(q=>`<tr><td>${esc(q.text)}<br><small class="mu">✓ ${esc(q.options[q.correct])}</small></td><td style="width:50px"><button class="btn" onclick="delQ('${q.id}')" aria-label="Өчүрүү">🗑</button></td></tr>`).join("")}</table>`:'<p class="mu">Суроо жок</p>'};
function toggleList(i){const e=$("#ql"+i);e.style.display=e.style.display==="none"?"block":"none"}
function savePer(){D.set.per=Math.max(1,parseInt($("#per").value)||PER_DEFAULT);D.set.gen=$("#gen").checked;save();msg="✅ Сакталды: оюнда "+per()+" суроо чыгат";render()}
function bulk(){
  const region=$("#bc").value,blocks=$("#bt").value.split(/\n\s*\n/).map(b=>b.split("\n").map(s=>s.trim()).filter(Boolean)).filter(b=>b.length>=3);let n=0;
  blocks.forEach(b=>{const rest=b.slice(1),ci=rest.findIndex(s=>s.startsWith("*"));if(ci<0||ci>5)return;
    D.questions.push({id:"q"+rid(),country:region,text:b[0],options:rest.slice(0,6).map(s=>s.replace(/^\*\s*/,"")),correct:ci});n++});
  save();msg=n?`✅ ${n} суроо «${region}» аймагына кошулду`:"Суроо табылган жок. Форматты текшериңиз (туура жооп * менен).";render();
}
function addQ(){
  const country=$("#qc").value,text=$("#qt").value.trim(),options=[0,1,2,3].map(i=>$("#o"+i).value.trim()).filter(Boolean);
  const co=$("#o"+document.querySelector('input[name=cr]:checked').value).value.trim();
  if(!text||options.length<2||!co){msg="Суроону жана жок дегенде 2 вариантты (туурасын да) толтуруңуз.";render();return}
  D.questions.push({id:"q"+rid(),country,text,options,correct:options.indexOf(co)});save();msg="✅ Суроо кошулду!";render();
}
function delQ(id){if(confirm("Суроону өчүрүү?")){D.questions=D.questions.filter(q=>q.id!==id);save();render()}}
function readPhoto(f){return new Promise(res=>{if(!f)return res("");const fr=new FileReader();
  fr.onload=()=>{const im=new Image();im.onload=()=>{const s=240,c=document.createElement("canvas");c.width=c.height=s;const m=Math.min(im.width,im.height);c.getContext("2d").drawImage(im,(im.width-m)/2,(im.height-m)/2,m,m,0,0,s,s);res(c.toDataURL("image/jpeg",.8))};im.onerror=()=>res("");im.src=fr.result};fr.onerror=()=>res("");fr.readAsDataURL(f)})}
async function addC(){
  const name=$("#cn").value.trim(),title=$("#ct").value.trim(),ability=$("#ca").value.trim();
  if(!name){msg="Каармандын атын жазыңыз.";render();return}
  const photo=await readPhoto($("#cf").files[0]),p=PAL[D.chars.length%PAL.length];
  D.chars.push({id:"c"+rid(),name,title,ability,photo,img:"",emoji:"🧑",color:p[0],bg:p[1],icon:p[2]});save();msg="✅ Каарман кошулду!";render();
}
async function setPhoto(id,f){const photo=await readPhoto(f),c=chOf(id);if(c&&photo){c.photo=photo;save();msg="✅ Сүрөт алмашты"}render()}
function delC(id){if(confirm("Каарманды өчүрүү?")){D.chars=D.chars.filter(c=>c.id!==id);save();render()}}
function resetScores(){if(!confirm("Бардык упайларды нөлгө келтирүү?"))return;D.players.forEach(p=>{p.score=0;p.stage=0;delete p.sess;delete p.seen;delete p.pts});g=null;shown=0;save();render()}
function resetPlayers(){if(!confirm("Бардык студенттерди өчүрүү?"))return;D.players=[];meId="";localStorage.removeItem(MEKEY);shown=null;g=null;save();render()}
function exportData(){const b=new Blob([JSON.stringify(D)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="kod-kerbeni-data.json";a.click()}
function importData(f){if(!f)return;const fr=new FileReader();
  fr.onload=()=>{try{const d=JSON.parse(fr.result);
    if(Array.isArray(d.questions))D.questions=d.questions;if(Array.isArray(d.chars))D.chars=d.chars;if(d.set)D.set=d.set;
    (d.players||[]).forEach(p=>{const o=D.players.find(x=>x.id===p.id);if(!o)D.players.push(p);else if((p.score||0)>(o.score||0))Object.assign(o,p)});
    save();msg="✅ Импорт аткарылды"}catch(e){msg="Файл туура эмес"}render()};fr.readAsText(f)}

render();
