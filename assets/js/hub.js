(() => {
  const drawer=document.getElementById('mDrawer'), backdrop=document.getElementById('mBackdrop'), trigger=document.getElementById('hamburger');
  const closeButton=document.getElementById('mClose');
  const toggle=(open)=>{
    drawer?.classList.toggle('open',open);backdrop?.classList.toggle('open',open);
    if(drawer)drawer.inert=!open;
    trigger?.setAttribute('aria-expanded',String(open));
    document.body.style.overflow=open?'hidden':'';
    if(open)closeButton?.focus();else trigger?.focus();
  };
  trigger?.addEventListener('click',()=>toggle(true));closeButton?.addEventListener('click',()=>toggle(false));backdrop?.addEventListener('click',()=>toggle(false));
  drawer?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggle(false)));
  document.addEventListener('keydown',e=>{
    if(!drawer?.classList.contains('open'))return;
    if(e.key==='Escape')toggle(false);
    if(e.key==='Tab'){
      const elements=[...drawer.querySelectorAll('a,button')],first=elements[0],last=elements.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    }
  });
  const aliases={'new-symptoms':'section-problem',symptoms:'section-problem',advantages:'evidence','section-trust':'evidence',trust:'evidence','work-style':'process','section-process':'process',principles:'process',services:'section-service','travel-fee':'section-price','new-reviews':'section-review',reviews:'section-review','service-area':'areas','regular-care':'care',pension:'care','membership-plans':'care','visit-info':'section-price','legacy-first-check':'process'};
  function resolveHash(){const id=aliases[location.hash.slice(1)];if(id)document.getElementById(id)?.scrollIntoView()}
  resolveHash();addEventListener('hashchange',resolveHash);
  document.addEventListener('click',e=>{
    const a=e.target.closest('a');if(!a)return;
    const href=a.getAttribute('href')||'';
    if(href.startsWith('tel:')||href.includes('pf.kakao.com'))window.powerpumpAnalytics?.track('contact_click',{channel:href.startsWith('tel:')?'phone':'kakao',section:a.closest('section')?.id||'navigation'});
  });
})();
// Open the containing disclosure when a menu or an external hash targets its content.
(()=>{function reveal(){const target=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(!target)return;let p=target.parentElement;while(p){if(p.tagName==='DETAILS')p.open=true;p=p.parentElement}requestAnimationFrame(()=>target.scrollIntoView({block:'start'}))}addEventListener('hashchange',reveal);if(location.hash)reveal()})();
(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('hub-reveal');observer.unobserve(e.target)}})},{threshold:.08});document.querySelectorAll('main>.hub-section,main>.hub-inline-cta').forEach(el=>observer.observe(el))})();
document.querySelectorAll('.hub-region-buttons details').forEach(item=>item.addEventListener('toggle',()=>{if(item.open)item.parentElement.querySelectorAll('details').forEach(other=>{if(other!==item)other.open=false})}));
