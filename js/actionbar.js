/* Elite Electrical — the sticky bottom action bar, and the one-shape
   services menu. Kept in its own file because index.html loads js/index.js
   instead of js/site.js, so both entry points pull this one in. Loading it
   twice is harmless - the guard below makes it run once. */
if (!window.__eliteBar) { window.__eliteBar = 1;

(function(){
  if(document.getElementById('actionbar')) return;

  var BOOK  = 'https://book.housecallpro.com/book/Bay-Rise-Electric-LLC/57393ec46f57423a9667ff74d251c8f2?v2=true';
  var TEL   = '+12395611314';
  var MAIL  = 'service@elite1314.com';

  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase().replace(/\.html?$/,'');
  /* the two trade pages: no Housecall Pro booking, call or email instead */
  var TRADE = {'new-construction':1, 'services-commercial':1, 'commercial':1};
  var trade = !!TRADE[page];

  var SVG_PHONE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1z" fill="currentColor"/></svg>';
  var SVG_MAIL  = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.5h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-11zm0 0l9 6 9-6" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var SVG_CAL   = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2v3M16 2v3M4 8.5h16M5 4.5h14a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var bar = document.createElement('div');
  bar.className = 'actionbar' + (trade ? ' is-trade' : '');
  bar.id = 'actionbar';

  if(trade){
    bar.innerHTML =
      '<div class="ab-in">' +
        '<a class="ab-main ab-call" href="tel:' + TEL + '">' + SVG_PHONE + '<span>Call 239.561.1314</span></a>' +
        '<a class="ab-side" href="mailto:' + MAIL + '">' + SVG_MAIL + '<span>Email us</span></a>' +
      '</div>';
  } else {
    bar.innerHTML =
      '<div class="ab-in">' +
        '<a class="ab-main" href="' + BOOK + '" target="_blank" rel="noopener">' + SVG_CAL + '<span>Book Online</span></a>' +
        '<a class="ab-side ab-icon" href="tel:' + TEL + '" aria-label="Call Elite Electrical at 239.561.1314">' + SVG_PHONE + '<span class="ab-num">239.561.1314</span></a>' +
      '</div>';
  }

  document.body.appendChild(bar);
  document.body.classList.add('has-actionbar');

  /* ON A PHONE the bar is always there, from the moment the page loads.
     ON A LARGER SCREEN it waits until you have scrolled past the hero so it
     does not sit on top of the homepage's own Book Online button. */
  var small = window.matchMedia('(max-width: 860px)');
  var hero  = document.querySelector('.hero, .page-banner');

  function trigger(){
    if(hero) return Math.max(220, hero.offsetTop + hero.offsetHeight - 140);
    return 320;
  }
  var shown = null;
  function update(){
    var want = small.matches ? true : (window.scrollY > trigger());
    if(want === shown) return;
    shown = want;
    bar.classList.toggle('in', want);
  }
  update();
  window.addEventListener('scroll', update, {passive:true});
  window.addEventListener('resize', update, {passive:true});
  if(small.addEventListener) small.addEventListener('change', update);
  else if(small.addListener) small.addListener(update);

  /* The header's Book Now button went to the contact page, which made the
     label a promise the click did not keep. It is Book Online everywhere
     now and it opens the real booking link - except on the two trade pages,
     where there is nothing to book and it becomes Contact us. */
  var navCta = document.querySelector('.menu .nav-cta');
  if(navCta){
    if(trade){
      navCta.setAttribute('href','contact.html');
      navCta.removeAttribute('target'); navCta.removeAttribute('rel');
      setLabel(navCta,'Contact us');
    } else {
      navCta.setAttribute('href', BOOK);
      navCta.setAttribute('target','_blank');
      navCta.setAttribute('rel','noopener');
      setLabel(navCta,'Book Online');
    }
  }

  /* Any Book Now left anywhere in a page's body is brought into line here. */
  document.querySelectorAll('main a, footer a').forEach(function(a){
    if(a.textContent.trim().toLowerCase().indexOf('book now') !== 0) return;
    if(trade){
      a.setAttribute('href','contact.html');
      setLabel(a,'Talk to us');
    } else {
      a.setAttribute('href', BOOK);
      a.setAttribute('target','_blank');
      a.setAttribute('rel','noopener');
      setLabel(a,'Book Online');
    }
  });

  /* replace the words without disturbing the icon or arrow beside them */
  function setLabel(a, text){
    var done = false;
    [].slice.call(a.childNodes).forEach(function(n){
      if(n.nodeType === 3 && n.nodeValue.trim()){
        n.nodeValue = done ? '' : text; done = true;
      }
    });
    if(!done) a.appendChild(document.createTextNode(text));
  }
})();

/* SERVICES MENU — one shape on every page.
   Residential and Repairs & Service are one entry now; Generators is gone.
   This normalises the dropdown at load on any page still carrying the old
   markup, and is a harmless no-op on pages already updated. */
(function(){
  var dd=document.querySelector('.nav-dd .dd');
  if(!dd) return;
  dd.querySelectorAll('a').forEach(function(a){
    var href=(a.getAttribute('href')||'').toLowerCase();
    if(href.indexOf('services-generators')>-1 || href.indexOf('services-repairs')>-1){
      a.remove(); return;
    }
    if(href.indexOf('services-residential')>-1 && a.textContent.trim()==='Residential'){
      a.textContent='Residential, Repairs & Service';
    }
  });
})();

}
