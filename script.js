/* ---------- AUDIO ---------- */
const Audio8 = (function(){
  let on=false, ctx=null;
  return {
    toggle(){ on=!on; if(on && !ctx) ctx=new (window.AudioContext||window.webkitAudioContext)(); return on; },
    isOn(){ return on; },
    beep(freq=880,dur=.03,type='square',vol=.05){
      if(!on||!ctx) return;
      const o=ctx.createOscillator(), g=ctx.createGain();
      o.type=type; o.frequency.value=freq; g.gain.value=vol;
      o.connect(g); g.connect(ctx.destination);
      o.start(); g.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime+dur);
      o.stop(ctx.currentTime+dur);
    }
  };
})();

function playFinale(){
  if(!Audio8.isOn()) return;
  const notes = [
    [659,0],[659,100],[0,100],[659,200],
    [0,200],[523,300],[659,400],[784,500],
    [0,600],[392,700]
  ];
  notes.forEach(([freq,delay])=>{
    setTimeout(()=>{ if(freq>0) Audio8.beep(freq,.12,'square',.07); }, delay);
  });
}

/* ---------- DATA ---------- */
const GH = 'https://github.com/Nicolas-Mesquiatti/';

const STACK = [
  {n:'JavaScript', c:'var(--green)'},
  {n:'TypeScript', c:'var(--cyan)'},
  {n:'React',      c:'var(--cyan)'},
  {n:'Python',     c:'var(--purple)'},
  {n:'SQL',        c:'var(--purple)'},
  {n:'n8n',        c:'var(--magenta)'},
  {n:'Gemini API', c:'var(--magenta)'},
  {n:'R',          c:'var(--purple)'},
];

const PROJECTS = [
  { cat:'auto', title:'AUTOMATION & AI', items:[
    { repo:'postia',  name:'postia',  desc:'AI-powered publication management panel.',    tech:'HTML/JS', b:'js', url:'https://nicolas-mesquiatti.github.io/postia/', year:'2026' },
    { repo:'Futbol',  name:'Futbol',  desc:'Football analysis & prediction with Python.', tech:'Python',  b:'py', wip:true, year:'2026' },
  ]},
  { cat:'web', title:'WEB DEVELOPMENT', items:[
    { repo:'EvoGym',     name:'EvoGym',     desc:'Gym landing / web app.',                    tech:'HTML', b:'html', year:'2026' },
    { repo:'sipctm-web', name:'sipctm-web', desc:'Mechanical workshop management — landing.', tech:'JS',   b:'js', wip:true, year:'2026' },
  ]},
  { cat:'data', title:'DATA SCIENCE', items:[
    { repo:'Dashboard-Futbol-Argentino', name:'Dashboard-Futbol-Argentino', desc:'Argentine football data 2008–2022, fully visualized.', tech:'Python', b:'py', url:'https://dashboard-futbol-argentino.streamlit.app/', year:'2025' },
    { repo:'Dashboard-Anime',            name:'Dashboard-Anime',            desc:'R/Shiny dashboard — Naruto, Dragon Ball & more.',      tech:'R',      b:'r', url:'https://nicolas-mesquiatti.shinyapps.io/Dashboard-Anime/', year:'2025' },
  ]},
];
const INVENTORY = [
  { h:'LANGUAGES',  items:['Python','JavaScript','TypeScript','HTML/CSS','R'] },
  { h:'FRAMEWORKS', items:['React','Node.js','Express'] },
  { h:'DATA & ML',  items:['Pandas','Scikit-learn','Jupyter','Streamlit'] },
  { h:'AUTOMATION', items:['n8n','Gemini API','Google Sheets API'] },
  { h:'TOOLS',      items:['Git','Docker'] },
];
/* ---------- BUILD: STACK ORBIT ---------- */
(function(){
  const orbit=document.getElementById('orbit');
  const zone=document.getElementById('scanzone');
  const hint=document.getElementById('scanHint');
  const frame=document.getElementById('avatarFrame');
  const R = 145;
  STACK.forEach((s,i)=>{
    const ang = (i/STACK.length)*Math.PI*2 - Math.PI/2;
    const dx = Math.cos(ang)*R, dy = Math.sin(ang)*R;
    const c=document.createElement('div');
    c.className='chip';
    c.style.setProperty('--dx', dx.toFixed(1)+'px');
    c.style.setProperty('--dy', dy.toFixed(1)+'px');
    c.style.borderColor = s.c;
    c.style.transitionDelay = (i*45)+'ms';
    c.innerHTML = '<span class="cdot" style="background:'+s.c+'"></span>'+s.n;
    orbit.appendChild(c);
  });
  zone.addEventListener('click',()=>{
    const on = zone.classList.toggle('scanned');
    frame.classList.toggle('idle', !on);
    hint.classList.toggle('on', on);
    hint.textContent = on ? '\u2713 STACK LOADED \u2014 CLICK TO RESET' : '\u25B6 INSPECT';
    if(on){ Audio8.beep(523,.05); setTimeout(()=>Audio8.beep(784,.06),90); }
    else  { Audio8.beep(330,.05); }
  });
})();

/* ---------- BUILD: PROJECTS ---------- */
(function(){
  var host=document.getElementById('projWrap');
  PROJECTS.forEach(function(cat){
    var cards='';
    cat.items.forEach(function(p){
      var link = p.url || (GH + p.repo);
      cards += '<a class="card '+cat.cat+'" href="'+link+'" target="_blank" rel="noopener" data-beep>'
        +'<span class="corner">\u25B8</span>'
        +'<div class="nm">'+p.name+'</div>'
        +'<div class="desc">'+p.desc+'</div>'
        +'<div class="foot"><span class="badge '+p.b+'">'+p.tech+'</span><span class="year">'+p.year+'</span>'
        +'<span class="go '+(p.wip?'wip':'')+'">'+(p.wip?'\u2699 WORKING':'OPEN \u25BA')+'</span></div></a>';
    });
    var col = cat.cat==='web'?'var(--cyan)':cat.cat==='data'?'var(--purple)':'var(--green)';
    host.insertAdjacentHTML('beforeend',
      '<div class="cat '+cat.cat+'">'
      +'<div class="cat-head"><span class="chip2" style="background:'+col+'"></span>'+cat.title+' <span style="color:var(--dim);font-size:10px">['+cat.items.length+']</span></div>'
      +'<div class="grid-cards">'+cards+'</div></div>');
  });
})();
/* ---------- BUILD: INVENTORY ---------- */
(function(){
  const host=document.getElementById('inv');
  INVENTORY.forEach(g=>{
    const tags=g.items.map(t=>'<span class="tag">'+t+'</span>').join('');
    host.insertAdjacentHTML('beforeend', '<div class="slot"><h3>'+g.h+'</h3><div class="tags">'+tags+'</div></div>');
  });
})();


/* ---------- TYPING (hero subtitle) ---------- */
(function(){
  const txt = 'Data Science // Web Developer // Automation & AI \u2014 Buenos Aires, AR';
  const el=document.getElementById('type'); let i=0;
  (function tick(){ if(i<=txt.length){ el.textContent=txt.slice(0,i++); setTimeout(tick,40); } })();
})();

/* ---------- SCROLL REVEAL ---------- */
(function(){
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target); } });
  },{ threshold:.12 });
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();

/* ---------- HERO NAME — arcade letra a letra ---------- */
(function(){
  var el = document.querySelector('.hero-name');
  if(!el) return;
  var delay = 200;
  var nodes = Array.from(el.childNodes);

  nodes.forEach(function(node){
    if(node.nodeType === 3){
      var frag = document.createDocumentFragment();
      node.textContent.split('').forEach(function(ch){
        if(ch === ' ' || ch === '\n'){
          frag.appendChild(document.createTextNode(ch));
          return;
        }
        var s = document.createElement('span');
        s.className = 'char';
        s.textContent = ch;
        s.style.animationDelay = delay + 'ms';
        delay += 80;
        frag.appendChild(s);
      });
      node.replaceWith(frag);
    } else if(node.nodeType === 1){
      if(node.tagName === 'BR') return;
      // es el <span>MESQUIATTI</span>
      var children = Array.from(node.childNodes);
      children.forEach(function(child){
        if(child.nodeType !== 3) return;
        var frag = document.createDocumentFragment();
        child.textContent.split('').forEach(function(ch){
          if(ch === ' '){
            frag.appendChild(document.createTextNode(' '));
            return;
          }
          var s = document.createElement('span');
          s.className = 'char-purple';
          s.textContent = ch;
          s.style.animationDelay = delay + 'ms';
          delay += 80;
          frag.appendChild(s);
        });
        child.replaceWith(frag);
      });
    }
  });
})();

/* ---------- NAV INVADER — dispara hacia arriba al hover ---------- */
(function(){
  var invader = document.getElementById('nav-invader');
  var bullet  = document.getElementById('nav-bullet');
  var links   = document.querySelectorAll('.nav-links a');
  if(!invader || !bullet) return;

  links.forEach(function(link){
    link.addEventListener('mouseenter', function(){
      var lr = link.getBoundingClientRect();
      // mover invader al centro del link
      var targetLeft = lr.left + lr.width/2 - 11;
      invader.style.left = targetLeft + 'px';
      // disparar
      bullet.classList.remove('firing');
      void bullet.offsetWidth;
      bullet.classList.add('firing');
      Audio8.beep(1200, .03, 'square', .04);
      setTimeout(function(){ bullet.classList.remove('firing'); }, 220);
    });
  });
})();

/* ---------- BIO LINES REVEAL ---------- */
(function(){
  var lines = document.querySelectorAll('.bio-line');
  var io = new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting){
      lines.forEach(function(line, i){
        setTimeout(function(){ line.classList.add('bio-visible'); }, i*120);
      });
      io.disconnect();
    }
  },{ threshold:.2 });
  var about = document.getElementById('about');
  if(about) io.observe(about);
})();

/* ---------- CARD + SLOT REVEAL ---------- */
(function(){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e,i){
      if(e.isIntersecting){
        setTimeout(function(){
          e.target.classList.add('visible');
          Audio8.beep(440+i*30, .04, 'square', .03);
        }, i*80);
        io.unobserve(e.target);
      }
    });
  },{ threshold:.1 });
  document.querySelectorAll('.card, .slot').forEach(function(el){ io.observe(el); });
})();

/* ---------- SOUND TOGGLE + HOVER BEEP ---------- */
(function(){
  var btn=document.getElementById('sndBtn');
  btn.addEventListener('click',function(){
    var on=Audio8.toggle();
    btn.dataset.on=on;
    btn.textContent='SND:'+(on?'ON':'OFF');
    if(on) Audio8.beep(660,.04);
  });
  document.addEventListener('mouseover',function(e){
    if(e.target.closest('[data-beep], .card, .tag, .nav-links a, .scanzone'))
      Audio8.beep(880,.03,'square',.04);
  });
})();

/* ---------- STARS ---------- */
(function(){
  var c=document.getElementById('stars');
  var cx=c.getContext('2d');
  var W,H;
  function resize(){ W=c.width=window.innerWidth; H=c.height=window.innerHeight; }
  resize();
  window.addEventListener('resize',resize);
  var stars=[];
  for(var i=0;i<120;i++){
    stars.push({ x:Math.random()*1920, y:Math.random()*1080, s:Math.random()<0.7?2:4, t:Math.random()*60 });
  }
  function draw(){
    cx.clearRect(0,0,W,H);
    var now=Date.now()/1000;
    stars.forEach(function(s){
      var alpha=0.3+0.5*Math.abs(Math.sin((now+s.t)*0.8));
      cx.fillStyle='rgba(155,89,182,'+alpha+')';
      cx.fillRect(Math.round(s.x/1920*W), Math.round(s.y/1080*H), s.s, s.s);
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ============================================================
   SNAKE
   ============================================================ */
(function(){
  var canvas=document.getElementById('snake');
  var ctx=canvas.getContext('2d');
  var contact=document.getElementById('contact');
  var scoreEl=document.getElementById('score');
  var bubble=document.getElementById('snakeBubble');
  var W,H,DPR;

  function resize(){
    DPR=Math.min(window.devicePixelRatio||1,2);
    W=window.innerWidth; H=window.innerHeight;
    canvas.width=W*DPR; canvas.height=H*DPR;
    canvas.style.width=W+'px'; canvas.style.height=H+'px';
    ctx.setTransform(DPR,0,0,DPR,0,0); ctx.imageSmoothingEnabled=false;
  }
  resize();

  var SEG=15, SPACING=12;
  var len=14;
  var segs=[];
  for(var i=0;i<len;i++) segs.push({x:W*0.5, y:H*0.42+i*SPACING});

  var apples=[], score=0, framedOnce=false, framePhase=0;
  function buildApples(){
    apples=[];
    var startY=H*0.70;
    var endY=Math.max(contact.offsetTop-120, startY+200);
    var cx2=W*0.5, amp=Math.min(W*0.30,340), step=130;
    var i=0;
    for(var y=startY; y<endY; y+=step){
      apples.push({ x:cx2+Math.sin(i*0.62)*amp, y:y, eaten:false });
      i++;
    }
  }
  window.addEventListener('resize',function(){ resize(); buildApples(); });
  window.addEventListener('load',function(){ resize(); buildApples(); });

  var parts=[];
  function burst(x,y){
    for(var i=0;i<10;i++){
      var a=Math.random()*6.28, sp=1+Math.random()*3;
      parts.push({x:x,y:y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:1});
    }
  }

  function nearestOnScreen(){
    var best=null,bd=1e9;
    for(var j=0;j<apples.length;j++){
      var a=apples[j]; if(a.eaten) continue;
      var sy=a.y-window.scrollY;
      if(sy<46 || sy>H-30) continue;
      var d=(a.x-segs[0].x)*(a.x-segs[0].x)+(sy-segs[0].y)*(sy-segs[0].y);
      if(d<bd){ bd=d; best={x:a.x,y:sy}; }
    }
    return best;
  }

  var boost=0;
  document.addEventListener('click',function(e){
    if(Math.hypot(e.clientX-segs[0].x, e.clientY-segs[0].y) < 48){
      boost=24; bubble.textContent='WEEE!';
      Audio8.beep(620,.05);
      setTimeout(function(){Audio8.beep(880,.05);},70);
      setTimeout(function(){Audio8.beep(1180,.06);},140);
      setTimeout(function(){ bubble.textContent='CLICK ME!'; }, 900);
      for(var k=0;k<8;k++) burst(segs[0].x, segs[0].y);
    }
  });

  function update(){
    var cr=contact.getBoundingClientRect();
    var inContact = cr.top < H*0.55 && cr.bottom > H*0.3;
    var tx,ty;

    if(inContact){
      if(!framedOnce){ len=Math.max(len,52); framedOnce=true; playFinale(); }
      var pad=24;
      var x0=cr.left+pad, x1=cr.right-pad;
      var y0=Math.max(cr.top+pad,70), y1=Math.min(cr.bottom-pad,H-16);
      var w=Math.max(x1-x0,40), h=Math.max(y1-y0,40), peri=2*(w+h);
      framePhase=(framePhase+1.5)%peri;
      var d=framePhase;
      if(d<w){ tx=x0+d; ty=y0; }
      else if(d<w+h){ tx=x1; ty=y0+(d-w); }
      else if(d<2*w+h){ tx=x1-(d-w-h); ty=y1; }
      else { tx=x0; ty=y1-(d-2*w-h); }
    } else {
      framedOnce=false;
      var a=nearestOnScreen();
      if(a){ tx=a.x; ty=a.y; }
      else {
        var t = Date.now()/1000;
        tx = W*0.5 + Math.cos(t*0.6)*W*0.28;
        ty = H*0.5 + Math.sin(t*0.9)*H*0.22;
      }
    }

    var hx=tx-segs[0].x, hy=ty-segs[0].y, hd=Math.hypot(hx,hy)||1;
    var speed = inContact ? 3.2 : 2.3;
    if(boost>0){ speed += 6; boost--; }
    speed = Math.min(hd, speed);
    segs[0].x+=hx/hd*speed; segs[0].y+=hy/hd*speed;

    while(segs.length<len) segs.push({x:segs[segs.length-1].x, y:segs[segs.length-1].y});

    for(var i=1;i<segs.length;i++){
      var dx=segs[i-1].x-segs[i].x, dy=segs[i-1].y-segs[i].y, dd=Math.hypot(dx,dy)||1;
      if(dd>SPACING){ var f=(dd-SPACING)/dd; segs[i].x+=dx*f; segs[i].y+=dy*f; }
    }

    if(!inContact){
      for(var j=0;j<apples.length;j++){
        var ap=apples[j]; if(ap.eaten) continue;
        var sy=ap.y-window.scrollY;
        if(Math.hypot(ap.x-segs[0].x, sy-segs[0].y)<18){
          ap.eaten=true; score++; len=Math.min(len+2,72);
          scoreEl.textContent=String(score).padStart(2,'0');
          Audio8.beep(440+score*8,.05,'square',.05); burst(ap.x,sy);
        }
      }
    }

    bubble.style.display='block';
    bubble.style.left=segs[0].x+'px';
    bubble.style.top=(segs[0].y-30)+'px';
  }

  function drawApple(x,y){
    var p=3; x=Math.round(x); y=Math.round(y);
    ctx.fillStyle='#ff2e2e';
    ctx.fillRect(x-2*p,y-1*p,4*p,3*p);
    ctx.fillRect(x-1*p,y-2*p,3*p,1*p);
    ctx.fillRect(x-2*p,y+2*p,4*p,1*p);
    ctx.fillStyle='#ff9a9a'; ctx.fillRect(x-1*p,y-1*p,1*p,1*p);
    ctx.fillStyle='#39ff14';
    ctx.fillRect(x,y-3*p,1*p,1*p); ctx.fillRect(x+1*p,y-4*p,1*p,1*p);
  }

  function drawSeg(x,y,isHead,checker){
    var s=SEG, h2=s/2; x=Math.round(x-h2); y=Math.round(y-h2);
    ctx.fillStyle = isHead ? '#8bff5a' : (checker ? '#39ff14' : '#21c008');
    ctx.fillRect(x,y,s,s);
    ctx.fillStyle='rgba(0,40,0,.45)';
    ctx.fillRect(x,y+s-3,s,3); ctx.fillRect(x+s-3,y,3,s);
    if(isHead){ ctx.fillStyle='#04140a'; ctx.fillRect(x+3,y+3,3,3); ctx.fillRect(x+s-6,y+3,3,3); }
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    for(var j=0;j<apples.length;j++){
      var a=apples[j]; if(a.eaten) continue;
      var sy=a.y-window.scrollY; if(sy<-30||sy>H+30) continue; drawApple(a.x,sy);
    }
    for(var i=parts.length-1;i>=0;i--){ var p=parts[i];
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.08; p.life-=0.04;
      if(p.life<=0){ parts.splice(i,1); continue; }
      ctx.fillStyle='rgba(255,70,70,'+p.life+')'; ctx.fillRect(Math.round(p.x),Math.round(p.y),3,3);
    }
    ctx.globalAlpha=0.92;
    for(var i2=segs.length-1;i2>=0;i2--){ drawSeg(segs[i2].x,segs[i2].y,i2===0,i2%2===0); }
    ctx.globalAlpha=1;
  }

  function loop(){ update(); draw(); requestAnimationFrame(loop); }
  buildApples(); loop();
})();