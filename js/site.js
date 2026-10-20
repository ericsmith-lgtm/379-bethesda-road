(function(){
  var ART=(location.protocol.indexOf('http')===0)?location.origin+location.pathname:'https://ericsmith-lgtm.github.io/379-bethesda-road/';
  var fbs=document.getElementById('fb-share');if(fbs)fbs.href='https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(ART);
  /* ---------- router ---------- */
  var pages=Array.prototype.slice.call(document.querySelectorAll('.page'));
  var navs=Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  function pauseAll(){Array.prototype.forEach.call(document.querySelectorAll('video,audio'),function(m){try{m.pause()}catch(e){}});}
  function show(id){var el=document.getElementById('page-'+id)||document.getElementById('page-home');
    pages.forEach(function(p){p.hidden=(p!==el)});
    var key=el.id.replace('page-','');
    navs.forEach(function(a){if(a.getAttribute('data-nav')===key)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
    var t=el.getAttribute('data-title');document.title=(t&&key!=='home')?t+' · 379 Bethesda Road':'379 Bethesda Road';
    return el;}
  function route(){
    pauseAll();
    var h=location.hash||'';
    var m=h.match(/^#\/([\w-]*)(?:\/([\w-]+))?/);
    if(m){var id=m[1]||'home';if(id==='p'&&m[2])id='p-'+m[2];show(id);window.scrollTo(0,0);return;}
    if(h.length>1){var target=document.getElementById(decodeURIComponent(h.slice(1)));
      if(target){var pg=target.closest('.page');if(pg)show(pg.id.replace('page-',''));else show('home');
        requestAnimationFrame(function(){target.scrollIntoView()});return;}}
    show('home');
  }
  window.addEventListener('hashchange',route);route();

  /* ---------- lightbox ---------- */
  var lb=document.getElementById('lb'),img=document.getElementById('lb-img'),cap=document.getElementById('lb-cap'),cnt=document.getElementById('lb-count');
  var list=[],idx=0,last=null;
  function lshow(i){idx=(i+list.length)%list.length;var b=list[idx];img.src=b.getAttribute('data-full');img.alt=b.getAttribute('data-cap')||'';
    cap.textContent='';var t=document.createElement('span');t.textContent=b.getAttribute('data-cap')||'';cap.appendChild(t);
    var s=b.getAttribute('data-src');if(s){var sp=document.createElement('span');sp.className='src';sp.textContent=s;cap.appendChild(sp);}
    cnt.textContent=list.length>1?(idx+1)+' of '+list.length:'';
    document.getElementById('lb-prev').hidden=document.getElementById('lb-next').hidden=list.length<2;}
  function open(b){last=b;var g=b.getAttribute('data-group');
    var all=Array.prototype.slice.call(document.querySelectorAll('[data-group="'+g+'"]'));
    list=(g.indexOf('lib-')===0||g.indexOf('mt-')===0)?all.filter(function(x){return x.closest('.page')&&!x.closest('.page').hidden}):all.filter(function(x){return x.offsetParent!==null});
    if(list.indexOf(b)<0)list=[b];
    lshow(list.indexOf(b));lb.hidden=false;document.body.style.overflow='hidden';document.getElementById('lb-close').focus();}
  function close(){lb.hidden=true;document.body.style.overflow='';img.removeAttribute('src');if(last)last.focus();}
  document.addEventListener('click',function(ev){var b=ev.target.closest('[data-full]');if(b){ev.preventDefault();open(b);}});
  document.getElementById('lb-close').addEventListener('click',close);
  document.getElementById('lb-prev').addEventListener('click',function(){lshow(idx-1)});
  document.getElementById('lb-next').addEventListener('click',function(){lshow(idx+1)});
  lb.addEventListener('click',function(ev){if(ev.target===lb||ev.target.classList.contains('lb-stage'))close();});
  document.addEventListener('keydown',function(ev){if(lb.hidden)return;if(ev.key==='Escape')close();if(ev.key==='ArrowLeft')lshow(idx-1);if(ev.key==='ArrowRight')lshow(idx+1);});

  /* ---------- copy helper ---------- */
  function copyText(text,btn){
    var label=btn.getAttribute('data-label')||btn.textContent;
    function done(){btn.textContent='Copied ✓';setTimeout(function(){btn.textContent=label},1800);}
    function fallback(){var ta=document.createElement('textarea');ta.value=text;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.top='0';ta.style.opacity='0';document.body.appendChild(ta);ta.select();
      var ok=false;try{ok=document.execCommand('copy')}catch(e){}document.body.removeChild(ta);
      if(ok)done();else btn.textContent='Select the text and copy it';}
    try{if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(done,fallback);return;}}catch(e){}
    fallback();
  }

  /* ---------- share ---------- */
  var cl=document.getElementById('copy-link');if(cl)cl.addEventListener('click',function(){copyText(ART,cl)});
  var ig=document.getElementById('copy-ig');if(ig)ig.addEventListener('click',function(){copyText(document.getElementById('ig-cap').textContent+'\n'+ART,ig)});
  var ns=document.getElementById('native-share');
  if(ns&&navigator.share){ns.hidden=false;ns.addEventListener('click',function(){navigator.share({title:'379 Bethesda Road',text:'Spartanburg County’s own records on the demolition of 379 Bethesda Road.',url:ART}).catch(function(){})});}

  /* ---------- open-all-pages buttons ---------- */
  document.addEventListener('click',function(ev){var b=ev.target.closest('[data-openfirst]');if(!b)return;ev.preventDefault();
    var g=b.getAttribute('data-openfirst');var first=document.querySelector('[data-group="'+g+'"]');if(!first)return;
    last=b;list=Array.prototype.slice.call(document.querySelectorAll('[data-group="'+g+'"]'));lshow(0);lb.hidden=false;document.body.style.overflow='hidden';document.getElementById('lb-close').focus();});

  /* ---------- document library ---------- */
  var q=document.getElementById('lib-q'),grid=document.getElementById('lib-grid'),fwrap=document.getElementById('lib-f'),cnt2=document.getElementById('lib-count');
  if(q&&grid){var cat='all';
    function apply(){var t=q.value.trim().toLowerCase();var n=0,all=0;
      Array.prototype.forEach.call(grid.querySelectorAll('.doc'),function(d){all++;var ok=(cat==='all'||d.getAttribute('data-cat')===cat)&&(!t||d.getAttribute('data-search').indexOf(t)>-1);d.hidden=!ok;if(ok)n++;});
      cnt2.textContent=n+' of '+all+' records'+(t?' matching “'+t+'”':'');}
    q.addEventListener('input',apply);
    fwrap.addEventListener('click',function(ev){var b=ev.target.closest('.fbtn');if(!b)return;cat=b.getAttribute('data-cat');
      Array.prototype.forEach.call(fwrap.querySelectorAll('.fbtn'),function(x){x.classList.toggle('on',x===b)});apply();});
  }

  /* ---------- story form ---------- */
  var f=document.getElementById('story-form');
  if(f){
    var out=document.getElementById('story-out'),wrap=document.getElementById('story-out-wrap');
    document.getElementById('story-build').addEventListener('click',function(){
      var v=function(n){var el=f.elements[n];return el?String(el.value||'').trim():''};
      var checks=Array.prototype.slice.call(f.querySelectorAll('input[name="w"]:checked')).map(function(c){return '- '+c.value});
      var lines=['IT HAPPENED TO ME TOO','',
        'Name: '+(v('name')||'(not given)'),
        'County and state: '+(v('county')||'(not given)'),
        'Property: '+(v('property')||'(not given)'),
        'When: '+(v('when')||'(not given)'),''];
      if(checks.length){lines.push('What happened:');lines=lines.concat(checks);lines.push('');}
      lines.push('In my own words:');lines.push(v('story')||'(not given)');lines.push('');
      lines.push('How to reach me: '+(v('contact')||'(not given)'));
      lines.push('');lines.push('(Sent after reading '+ART+')');
      out.value=lines.join('\n');wrap.hidden=false;out.focus();out.select();
    });
    document.getElementById('story-copy').addEventListener('click',function(ev){copyText(out.value,ev.currentTarget)});
  }
})();
