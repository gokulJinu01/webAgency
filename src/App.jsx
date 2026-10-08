import React, { useState, useRef, useEffect } from 'react';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/800.css';
import { ArrowUpRight, ArrowRight, ArrowLeft, Check, Code2, PenTool, X, ChevronDown, Menu, Sparkles, CalendarCheck, Boxes, Mail, Phone, Search, CalendarDays, Wheat } from 'lucide-react';
import './style.css';


// Site settings. The keys come from .env locally and from Vercel's Environment Variables in production (see .env.example).
const CONTACT_EMAIL='gokuljinu12@gmail.com';
const CONTACT_PHONE='+14379897933';
const CONTACT_PHONE_LABEL='+1 437 989 7933';
const WHATSAPP_URL='https://wa.me/14379897933';
const WEB3FORMS_KEY=import.meta.env.VITE_WEB3FORMS_KEY;
const BOOKING_URL=import.meta.env.VITE_BOOKING_URL;
const mailto=`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Website enquiry')}`;

const sections=['Hello','Work','Services','Process','Contact'];
const slugs=sections.map(s=>s.toLowerCase());
const serviceNames=['A business website','Website redesign','Booking & integrations','A custom tool or app','Website care','Something else'];
const emptyForm={name:'',email:'',business:'',service:'A business website',message:'',website:''};
const steps=[
 ['Let’s talk.','We get to know your business and agree on what you actually need. You receive a clear scope before we begin.'],
 ['Make it yours.','We shape the content and design around your business. You review the direction before development begins.'],
 ['Bring it to life.','We build it for every screen, wire up the pieces that need to work together, and refine the details with you.'],
 ['Ready for the world.','We launch on your domain and walk through everything together. Ongoing care is available when you need it.']
];
// Draft answers: confirm they match how you actually work before launch.
const faqs=[
 ['Do I own my website?','Yes. Your domain, your content, and your site are yours. If you ever decide to move on, we’ll hand everything over.'],
 ['How long does it take?','Most small-business sites take a few weeks from our first chat to launch. The biggest factor is how quickly content and feedback come together.'],
 ['Can you build more than a website?','Yes. Booking systems, dashboards, internal tools, APIs and mobile apps—see the work for things built end to end.'],
 ['What about my domain and hosting?','We can set both up for you, or work with what you already have. Either way, the accounts stay in your name.'],
 ['Can I make changes myself?','We can set things up so everyday updates, like hours or menu items, are easy to change. Or leave it to us with ongoing care.']
];

function WhatsAppIcon(){return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35M12.04 21.5h-.01a9.5 9.5 0 0 1-4.83-1.32l-.35-.21-3.59.94.96-3.5-.23-.36a9.47 9.47 0 0 1-1.45-5.06c0-5.24 4.27-9.5 9.52-9.5 2.54 0 4.93.99 6.72 2.79a9.43 9.43 0 0 1 2.78 6.72c0 5.24-4.27 9.5-9.52 9.5m8.1-17.6A11.4 11.4 0 0 0 12.04 .5C5.75.5.64 5.6.64 11.88c0 2.01.53 3.97 1.53 5.7L.5 23.5l6.07-1.59a11.4 11.4 0 0 0 5.47 1.39h.01c6.28 0 11.39-5.1 11.39-11.38 0-3.04-1.19-5.9-3.34-8.05"/></svg>}
function EarlybirdSite(){return <div className="concept-site concept-earlybird">
 <div className="concept-nav"><span className="concept-logo">earlybird</span><span className="concept-links">Menu · Visit · Order ahead</span></div>
 <div className="concept-hero"><div className="concept-copy"><span className="concept-kicker">Neighbourhood café</span><span className="concept-title">Your daily<br/>little ritual.</span><span className="concept-tag">Open daily · 7am–4pm</span></div><img src="/cafe.webp" width="1200" height="800" loading="lazy" decoding="async" alt=""/></div>
</div>}
function BakerySite(){return <div className="concept-site concept-bakery">
 <div className="concept-nav"><span className="concept-logo">rise &amp; rye</span><span className="concept-links">Today · Pre-order · Visit</span></div>
 <div className="concept-hero"><div className="concept-copy"><span className="concept-kicker">Neighbourhood bakery</span><span className="concept-title">Baked before<br/>sunrise.</span><span className="concept-bakes"><span><span>Country sourdough</span><span>from 8am</span></span><span><span>Cardamom buns</span><span>Sat &amp; Sun</span></span></span></div>
  {/* FILL IN WITH PROPER IMAGE: bakery hero photo (warm light, crusty loaves or buns on a counter), about 1200×800.
      Save it as public/bakery.webp, then replace the placeholder div below with:
      <img src="/bakery.webp" width="1200" height="800" loading="lazy" decoding="async" alt=""/> */}
  <div className="image-slot" aria-hidden="true"><Wheat size={26}/></div>
 </div>
</div>}
// FILL IN WITH PROPER IMAGE: a screenshot of https://gokuljinu.vercel.app (the 3D hero, about 1280×800).
// Save it as public/portfolio.webp and swap this mock for an <img>, the way RailTech's card works.
function PortfolioSite(){return <div className="concept-site concept-portfolio">
 <div className="concept-nav"><span className="concept-logo">gokul jinu</span><span className="concept-links">Work · Skills · Contact</span></div>
 <div className="portfolio-stage"><span className="portfolio-orb" aria-hidden="true"/><span className="concept-title">Built in 3D,<br/>in the browser.</span></div>
</div>}
function WallListShot(){return <div className="walllist-art">
 <img className="walllist-phone" src="/walllist.webp" width="420" height="913" loading="lazy" decoding="async" alt="WallList wallpaper screen showing a four-item checklist"/>
 <img className="walllist-widget" src="/walllist-widget.webp" width="560" height="399" loading="lazy" decoding="async" alt="WallList Home Screen widget with items to check off"/>
</div>}

const projects=[
 {key:'railtech',tab:'RailTech',title:'RailTech Inc.',kind:'Built end to end · Company site & platform',
  blurb:'Our own infrastructure company: the site, the brand, and the platform behind it—containerized task runners, connected services, and a memory layer.',
  features:['Designed, built and deployed solo','Go · Java / Spring · Next.js · Docker · MongoDB'],
  image:'/railtech.webp',w:1280,h:642,alt:'The RailTech Inc. website homepage',
  link:'https://www.railtech.io/',linkLabel:'Visit railtech.io',cta:'A custom tool or app'},
 {key:'portfolio',tab:'3D portfolio',title:'Interactive 3D portfolio',kind:'Built end to end · Interactive site',
  blurb:'Our own site, with a real-time 3D scene running in the browser. Proof that a small site can still feel like something rather than a template.',
  features:['React with three.js, smooth on phones','Custom model, lighting and motion'],
  Art:PortfolioSite,link:'https://gokuljinu.vercel.app/',linkLabel:'Visit the portfolio',cta:'A business website'},
 {key:'walllist',tab:'WallList',title:'WallList for iOS',kind:'Built end to end · Native iOS app',
  blurb:'A native iPhone app that turns the few things that matter today into your wallpaper, with a Home Screen widget to check them off.',
  features:['Native iOS app and interactive widget','Designed, built and tested on device'],
  Art:WallListShot,cta:'A custom tool or app'},
 {key:'earlybird',tab:'earlybird',title:'earlybird café',kind:'Concept · Café website',
  blurb:'A neighbourhood café site built around the morning rush: opening hours up front, a menu that’s easy to keep current, and a quick path to directions or ordering ahead.',
  features:['Hours and location first on mobile','Order-ahead and map links'],
  Art:EarlybirdSite,cta:'A business website'},
 {key:'bakery',tab:'rise & rye',title:'rise & rye bakery',kind:'Concept · Bakery website',
  blurb:'A bakery site made for early risers: today’s bakes at a glance, pre-orders for weekends and celebrations, and clear pickup details.',
  features:['A daily bakes list that’s quick to change','Pre-order enquiries for cakes and events'],
  Art:BakerySite,cta:'A business website'}
];

function Logo(){return <><svg className="logo-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M11 9h11v23h17v10H11V9Z" fill="currentColor"/><path d="M28 9h11v17H28V9Z" fill="var(--accent)"/></svg><span className="wordmark">luko<span>designs</span></span></>}
function App(){
 const [active,setActive]=useState(0),[stacked,setStacked]=useState(false),[openStep,setOpenStep]=useState(0),[slide,setSlide]=useState(projects.length),[autoplay,setAutoplay]=useState(true),[mobileNav,setMobileNav]=useState(false),[formStep,setFormStep]=useState(0);
 const [form,setForm]=useState(emptyForm),[formState,setFormState]=useState('idle'),[error,setError]=useState(''),[sentTo,setSentTo]=useState('');
 const track=useRef(null),activeRef=useRef(0),stackedRef=useRef(false),started=useRef(false),wheelLock=useRef(0),wheelDelta=useRef(0),lastWheel=useRef(0),stepHeading=useRef(null),focusOnArrive=useRef(false),menuButton=useRef(null),hovering=useRef(false),rail=useRef(null),fromSwipe=useRef(false),jumping=useRef(false),firstCentre=useRef(true);
 // Three copies of the list, so there is always a card either side and the rail can keep moving right.
 const rails=[...projects,...projects,...projects];
 const pick=((slide%projects.length)+projects.length)%projects.length;
 const project=projects[pick];
 const go=n=>{
  const next=Math.max(0,Math.min(4,n));
  if(next!==activeRef.current)focusOnArrive.current=true;
  const el=track.current;if(!el)return;
  const behavior=window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth';
  const stackedNow=stackedRef.current,card=el.children[next];
  // Phones scroll the page; wider screens slide the panels sideways.
  const jump=how=>{if(stackedNow)card?.scrollIntoView({behavior:how,block:'start'});else el.scrollTo({left:el.clientWidth*next,behavior:how})};
  const x=el.scrollLeft,y=el.scrollTop,pageY=window.scrollY;
  jump(behavior);
  // Deliberate navigation decides the current section itself; the observer below only has to follow
  // scrolling and swiping, which it can be slow or wrong about on tall stacked sections.
  activeRef.current=next;setActive(next);
  // Some browsers ignore smooth scrolling altogether, which would leave every nav button dead. If nothing has
  // started moving, go there instantly instead.
  if(behavior==='smooth')setTimeout(()=>{if(el.scrollLeft===x&&el.scrollTop===y&&window.scrollY===pageY)jump('instant')},180);
  setMobileNav(false);
 };
 useEffect(()=>{
  const m=window.matchMedia('(max-width: 760px)');
  const apply=()=>{stackedRef.current=m.matches;setStacked(m.matches)};
  apply();m.addEventListener('change',apply);
  return()=>m.removeEventListener('change',apply);
 },[]);
 useEffect(()=>{
  const el=track.current;
  const start=slugs.indexOf(location.hash.slice(1));
  if(start>0&&!started.current){
   if(stacked)el.children[start]?.scrollIntoView({behavior:'instant',block:'start'});
   else el.scrollTo({left:el.clientWidth*start,behavior:'instant'});
   setActive(start);activeRef.current=start;
  }
  started.current=true;
  // Stacked sections are often taller than the viewport, so a ratio threshold can never be met. Watch a thin
  // band across the middle of the screen instead: whichever section crosses it is the one being read.
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){const i=Number(e.target.dataset.index);setActive(i);activeRef.current=i}}),{root:stacked?null:el,threshold:stacked?0:.6,rootMargin:stacked?'-45% 0px -45% 0px':'0px'});
  el.querySelectorAll('.panel').forEach(p=>observer.observe(p));
  const wheel=e=>{
   if(e.ctrlKey||e.target.closest('textarea,select,input'))return;if(Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
   // Let a section that doesn't fit the screen scroll vertically first; only switch sections once it reaches its edge.
   const panel=e.target.closest('.panel');
   if(panel&&panel.scrollHeight>panel.clientHeight+1){const atTop=panel.scrollTop<=0,atEnd=panel.scrollTop+panel.clientHeight>=panel.scrollHeight-1;if(e.deltaY<0?!atTop:!atEnd){wheelLock.current=Date.now();return}}
   e.preventDefault();const now=Date.now();if(now-wheelLock.current<800){lastWheel.current=now;return}if(now-lastWheel.current>180)wheelDelta.current=0;lastWheel.current=now;wheelDelta.current+=e.deltaY;if(Math.abs(wheelDelta.current)>45){go(activeRef.current+Math.sign(wheelDelta.current));wheelDelta.current=0;wheelLock.current=now}
  };
  if(!stacked)el.addEventListener('wheel',wheel,{passive:false});
  // Only re-align on width changes: mobile browser bars change the height mid-scroll and would snap back a section.
  let lastWidth=el.clientWidth;
  const resize=()=>{if(stacked||el.clientWidth===lastWidth)return;lastWidth=el.clientWidth;el.scrollTo({left:el.clientWidth*activeRef.current,behavior:'instant'})};window.addEventListener('resize',resize);
  const hash=()=>{const i=slugs.indexOf(location.hash.slice(1));if(i>=0&&i!==activeRef.current)go(i)};window.addEventListener('hashchange',hash);
  return()=>{observer.disconnect();el.removeEventListener('wheel',wheel);window.removeEventListener('resize',resize);window.removeEventListener('hashchange',hash)};
 },[stacked]);
 useEffect(()=>{
  history.replaceState(null,'',active?`#${slugs[active]}`:location.pathname+location.search);
  // Sections that scroll out of view become inert, so move keyboard and screen-reader focus to the new section's heading.
  if(focusOnArrive.current){focusOnArrive.current=false;track.current?.querySelector(`.panel[data-index="${active}"] :is(h1,h2)`)?.focus({preventScroll:true})}
 },[active]);
 // The work showcase advances on its own: it pauses on hover or focus, and stops once someone picks a project.
 useEffect(()=>{
  if(!autoplay||active!==1||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const id=setInterval(()=>{if(!hovering.current&&!document.hidden)setSlide(s=>s+1)},6000);
  return()=>clearInterval(id);
 },[autoplay,active]);
 useEffect(()=>{
  const centre=behavior=>{const r=rail.current,card=r&&r.children[slide];if(!r||!card)return;const c=card.getBoundingClientRect(),b=r.getBoundingClientRect();r.scrollTo({left:r.scrollLeft+(c.left-b.left)-(b.width-c.width)/2,behavior})};
  const n=projects.length,reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(fromSwipe.current)fromSwipe.current=false;
  else centre(jumping.current||firstCentre.current||reduce?'instant':'smooth');
  jumping.current=false;firstCentre.current=false;
  // At the seam, hop back one copy without animating: the card there is the same project, so nothing visibly moves.
  if(slide>=n*2||slide<n){const id=setTimeout(()=>{jumping.current=true;setSlide(s=>slide>=n*2?s-n:s+n)},reduce?0:700);return()=>clearTimeout(id)}
  const onResize=()=>centre('instant');window.addEventListener('resize',onResize);
  return()=>window.removeEventListener('resize',onResize);
 },[slide]);
 useEffect(()=>{
  // Whenever the rail settles, the tabs and the text follow whichever card ended up centred.
  const r=rail.current;if(!r)return;
  let timer;
  const onScroll=()=>{
   clearTimeout(timer);
   timer=setTimeout(()=>{
    const b=r.getBoundingClientRect(),mid=b.left+b.width/2;
    let best=0,dist=Infinity;
    [...r.children].forEach((card,i)=>{const c=card.getBoundingClientRect();const d=Math.abs(c.left+c.width/2-mid);if(d<dist){dist=d;best=i}});
    setSlide(prev=>{if(prev===best)return prev;fromSwipe.current=true;return best});
   },120);
  };
  r.addEventListener('scroll',onScroll,{passive:true});
  return()=>{clearTimeout(timer);r.removeEventListener('scroll',onScroll)};
 },[]);
 useEffect(()=>{
  // Keep the selected tab in view without scrolling the horizontal section track.
  const tabs=document.querySelector('.showcase-tabs'),tab=document.getElementById(`work-tab-${pick}`);
  if(tabs&&tab){const t=tab.getBoundingClientRect(),c=tabs.getBoundingClientRect();tabs.scrollTo({left:tabs.scrollLeft+(t.left-c.left)-(c.width-t.width)/2,behavior:'smooth'})}
 },[pick]);
 useEffect(()=>{['/railtech.webp','/walllist.webp','/walllist-widget.webp','/cafe.webp'].forEach(src=>{const i=new Image();i.src=src})},[]);
 useEffect(()=>{const key=e=>{if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.target.closest('input,textarea,select,[role=tab]'))return;if(e.key==='ArrowRight'){e.preventDefault();go(activeRef.current+1)}if(e.key==='ArrowLeft'){e.preventDefault();go(activeRef.current-1)}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[]);
 useEffect(()=>{
  if(!mobileNav)return;
  const key=e=>{if(e.key==='Escape'){setMobileNav(false);menuButton.current?.focus()}};
  const outside=e=>{if(!e.target.closest('.site-header'))setMobileNav(false)};
  window.addEventListener('keydown',key);window.addEventListener('pointerdown',outside);
  return()=>{window.removeEventListener('keydown',key);window.removeEventListener('pointerdown',outside)};
 },[mobileNav]);
 const choose=name=>{setForm(f=>({...f,service:name}));go(4)};
 const choosePick=i=>{const n=projects.length;const target=[i,i+n,i+n*2].reduce((a,b)=>Math.abs(b-slide)<Math.abs(a-slide)?b:a);setAutoplay(false);setSlide(target)};
 const changeStep=n=>{setError('');setFormStep(n);requestAnimationFrame(()=>stepHeading.current?.focus())};
 const tabKeys=(e,i,count,set,idPrefix)=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?count-1:(i+(e.key==='ArrowRight'?1:count-1))%count;set(n);document.getElementById(`${idPrefix}-${n}`)?.focus()}};
 async function submit(e){
  e.preventDefault();if(formStep===0){changeStep(1);return}setError('');
  if(form.message.trim().length<10){setError('Tell us a little more about your project (at least 10 characters).');return}
  if(form.website){setSentTo(form.email);setForm(emptyForm);setFormStep(0);setFormState('success');return}
  if(!WEB3FORMS_KEY){setFormState('unavailable');return}
  setFormState('sending');
  try{
   const res=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({access_key:WEB3FORMS_KEY,subject:`New enquiry: ${form.service} (${form.business.trim()||form.name.trim()})`,from_name:'Luko Designs website',name:form.name.trim(),email:form.email.trim(),business:form.business.trim()||'Not given',service:form.service,message:form.message.trim()})});
   const data=await res.json().catch(()=>({}));
   if(!res.ok||!data.success)throw new Error('Enquiry not accepted');
   setSentTo(form.email.trim());setForm(emptyForm);setFormStep(0);setFormState('success');
  }catch{setError('We couldn’t send your enquiry. Please try again, or email us at');setFormState('error')}
 }
 const update=(key,value)=>setForm(f=>({...f,[key]:value}));
 return <div className={`app-shell section-${active}`}>
 <a href="#main" className="skip-link">Skip to content</a>
 <header className="site-header">
  <button className="brand" onClick={()=>go(0)} aria-label="Luko Designs home"><Logo/></button>
  <nav className={mobileNav?'top-nav open':'top-nav'} aria-label="Main navigation">{sections.slice(0,4).map((s,i)=><button key={s} onClick={()=>go(i)} className={active===i?'selected':''} aria-current={active===i?'page':undefined}>{s}</button>)}</nav>
  <div className="header-right"><button className="header-cta" onClick={()=>go(4)}>Let’s talk <ArrowUpRight size={18}/></button><button ref={menuButton} className="mobile-menu icon-button" aria-label="Toggle navigation" aria-expanded={mobileNav} onClick={()=>setMobileNav(!mobileNav)}>{mobileNav?<X size={20}/>:<Menu size={20}/>}</button></div>
 </header>
 <main id="main" tabIndex={-1} ref={track} className="horizontal-track" aria-label="Agency website sections">
  <section className="panel hello-panel" data-index="0" aria-labelledby="hello-title" inert={!stacked&&active!==0}>
   <div className="hero-copy">
    <span className="hero-eyebrow">Web design &amp; development · Toronto</span>
    <h1 id="hello-title" tabIndex={-1}>Small business.<br/>Big first<br/><span>impressions.</span></h1>
    <span className="ink-mini" aria-hidden="true"><span className="ink-blob m1"/><span className="ink-blob m2"/><span className="ink-blob m3"/></span>
    <p>We design and build the websites, booking systems and tools your business actually needs — end to end, by one person.</p>
    <div className="hero-actions"><button className="primary-button" onClick={()=>go(4)}>Let’s build something <ArrowUpRight size={19}/></button><button className="text-button" onClick={()=>go(1)}>Our work <ArrowRight size={18}/></button></div>
    <ul className="hero-notes"><li>Built end to end</li><li>No templates</li><li>You own everything</li></ul>
   </div>
   <div className="hero-visual" aria-hidden="true">
    <div className="ink">
     <span className="ink-blob b1"/><span className="ink-blob b2"/><span className="ink-blob b3"/>
     <span className="ink-blob b4"/><span className="ink-blob b5"/><span className="ink-blob b6"/>
     <span className="ink-blob b7"/><span className="ink-blob b8"/><span className="ink-blob b9"/>
     <span className="ink-blob b10"/><span className="ink-blob b11"/><span className="ink-blob b12"/>
     <span className="ink-veil"/>
    </div>
   </div>
  </section>
  <section className="panel work-panel" data-index="1" aria-labelledby="work-title" inert={!stacked&&active!==1}>
   <div className="section-heading"><h2 id="work-title" tabIndex={-1}>Ideas brought<br/><span>to life.</span></h2><p>Things built end to end, plus concepts for local businesses.</p></div>
   <div className="showcase" onPointerEnter={()=>hovering.current=true} onPointerLeave={()=>hovering.current=false} onFocusCapture={()=>hovering.current=true} onBlurCapture={()=>hovering.current=false}>
    <div className="showcase-rail" ref={rail} aria-hidden="true" onPointerDown={()=>setAutoplay(false)}>
     {rails.map((p,i)=><div key={p.key+'-'+i} className={`showcase-card art-${p.key} ${i===slide?'current':''}`} onClick={()=>{setAutoplay(false);setSlide(i)}}>
      {p.Art?<p.Art/>:<img className="showcase-shot" src={p.image} width={p.w} height={p.h} loading="lazy" decoding="async" alt=""/>}
     </div>)}
    </div>
    <div className="showcase-controls">
     <div className="showcase-tabs" role="tablist" aria-label="Projects">{projects.map((x,i)=><button key={x.key} id={`work-tab-${i}`} role="tab" aria-selected={pick===i} aria-controls="work-detail" tabIndex={pick===i?0:-1} className={pick===i?'selected':''} onClick={()=>choosePick(i)} onKeyDown={e=>tabKeys(e,i,projects.length,choosePick,'work-tab')}>{x.tab}</button>)}</div>
    </div>
    <div key={"copy-"+project.key} className="showcase-copy" id="work-detail" role="tabpanel" aria-labelledby={`work-tab-${pick}`}>
     <span className="showcase-kind">{project.kind}</span>
     <h3>{project.title}</h3>
     <p>{project.blurb}</p>
     <ul className="showcase-features">{project.features.map(f=><li key={f}><Check size={15} aria-hidden="true"/>{f}</li>)}</ul>
     <div className="showcase-links">{project.link&&<a className="portfolio-link" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel}<ArrowUpRight size={17}/></a>}<button className="text-button" onClick={()=>choose(project.cta)}>Talk about your project <ArrowRight size={17}/></button></div>
    </div>
   </div>
  </section>
  <section className="panel services-panel" data-index="2" aria-labelledby="services-title" inert={!stacked&&active!==2}>
   <div className="services-surface"><div className="services-intro"><h2 id="services-title" tabIndex={-1}>Built around<br/><span>your business.</span></h2><p>From a first website to the tools behind it. Design, development, and support—all from one person.</p><button className="primary-button" onClick={()=>choose('A business website')}>Get in touch <ArrowUpRight size={19}/></button></div>
   <div className="service-list">{[
    [PenTool,'Design that feels like you','Custom websites and thoughtful redesigns—never a template.'],
    [Code2,'Built for every screen','Fast, responsive builds that work on the phone in your customer’s hand.'],
    [CalendarCheck,'Booking, forms and follow-up','Online booking, enquiry forms, and the tools you already use, wired together.'],
    [Boxes,'Custom tools and apps','Dashboards, internal tools, APIs and mobile apps when a website isn’t enough.'],
    [Sparkles,'Care beyond launch','Content updates, maintenance, and someone to call when something breaks.']
   ].map(([Icon,title,copy])=><div className="service-item" key={title}><span className="service-icon"><Icon size={23}/></span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div>
   </div>
  </section>
  <section className="panel process-panel" data-index="3" aria-labelledby="process-title" inert={!stacked&&active!==3}>
   <div className="process-intro"><h2 id="process-title" tabIndex={-1}>Start simple.<br/>Stay in the loop.<br/><span>Launch with confidence.</span></h2><div className="founder-row"><p>We keep it small on purpose: the person you talk to is the person who designs and builds your site.</p><a className="portfolio-link" href="https://gokuljinu.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="View our portfolio (opens in a new tab)">View our portfolio <ArrowUpRight size={17}/></a></div></div>
   <div className="process-surface"><div className="step-tabs" role="tablist" aria-label="Our process">{['Talk','Design','Build','Launch'].map((s,i)=><button key={s} id={`process-tab-${i}`} role="tab" aria-selected={openStep===i} aria-controls="process-detail" tabIndex={openStep===i?0:-1} className={openStep===i?'selected':''} onClick={()=>setOpenStep(i)} onKeyDown={e=>tabKeys(e,i,4,setOpenStep,'process-tab')}>{s}</button>)}</div><div id="process-detail" role="tabpanel" aria-labelledby={`process-tab-${openStep}`} className="step-detail"><span className="large-step" aria-hidden="true">0{openStep+1}</span><div key={openStep} className="step-copy"><h3>{steps[openStep][0]}</h3><p>{steps[openStep][1]}</p></div></div><button className="text-button" onClick={()=>openStep<3?setOpenStep(openStep+1):go(4)}>{openStep<3?'Next step':'Let’s get started'}<ArrowRight size={18}/></button></div>
   <div className="faq"><h3 className="faq-title">Common questions</h3>{faqs.map(([q,a])=><details key={q} name="faq"><summary>{q}<ChevronDown size={17} aria-hidden="true"/></summary><p>{a}</p></details>)}</div>
  </section>
  <section className="panel contact-panel" data-index="4" aria-labelledby="contact-title" inert={!stacked&&active!==4}>
   <div className="contact-intro"><h2 id="contact-title" tabIndex={-1}>A free quote.<br/><span>A straight answer.</span></h2><p>Tell us what you need and we’ll come back with the scope, the timeline and the price. No jargon, no pressure.</p>
    <div className="contact-direct">
     <a className="portfolio-link whatsapp-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="Message us on WhatsApp (opens in a new tab)"><WhatsAppIcon/>WhatsApp</a>
     <a className="portfolio-link" href={`tel:${CONTACT_PHONE}`}><Phone size={17} aria-hidden="true"/>{CONTACT_PHONE_LABEL}</a>
     <a className="portfolio-link" href={mailto}><Mail size={17} aria-hidden="true"/>{CONTACT_EMAIL}</a>
     {BOOKING_URL&&<a className="portfolio-link" href={BOOKING_URL} target="_blank" rel="noopener noreferrer" aria-label="Book a call (opens in a new tab)"><CalendarDays size={17} aria-hidden="true"/>Book a call</a>}
    </div>
   </div>
   <div className="contact-form-wrap">
   {formState==='success'?<div className="form-result" role="status"><span className="result-icon"><Check size={28}/></span><h3>Thanks for saying hello.</h3><p>Your enquiry is on its way. We’ll reply to {sentTo} soon.</p><button className="secondary-button" onClick={()=>setFormState('idle')}>Send another enquiry<ArrowLeft size={18}/></button></div>
   :formState==='unavailable'?<div className="form-result" role="status"><span className="result-icon"><Mail size={26}/></span><h3>Email us for now.</h3><p>Online enquiries aren’t switched on yet, so your message hasn’t been sent. Email us at <a href={mailto}>{CONTACT_EMAIL}</a> and we’ll take it from there.</p><button className="secondary-button" onClick={()=>setFormState('idle')}>Back to your message<ArrowLeft size={18}/></button></div>
   :<form onSubmit={submit}>
    <div className="form-heading"><h3 ref={stepHeading} tabIndex={-1}>{formStep===0?'First, a little about you.':'What are we making?'}</h3><span aria-label={`Step ${formStep+1} of 2`}>{formStep+1}/2</span></div>
    {formStep===0?<div className="form-fields" key="details"><div className="form-row"><label>Your name<input autoComplete="name" required maxLength={100} placeholder="Alex Chen" value={form.name} onChange={e=>update('name',e.target.value)}/></label><label>Email<input type="email" autoComplete="email" required maxLength={254} placeholder="alex@business.ca" value={form.email} onChange={e=>update('email',e.target.value)}/></label></div><label>Business name <span>(optional)</span><input autoComplete="organization" maxLength={150} placeholder="Your business" value={form.business} onChange={e=>update('business',e.target.value)}/></label></div>:
    <div className="form-fields" key="project"><label>I’m looking for<div className="select-wrap"><select value={form.service} onChange={e=>update('service',e.target.value)}>{serviceNames.map(x=><option key={x}>{x}</option>)}</select><ChevronDown size={18}/></div></label><label>Your project<textarea required minLength={10} maxLength={3000} rows={2} placeholder="A little about your business and your idea…" value={form.message} onChange={e=>update('message',e.target.value)}/></label></div>}
    <label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={e=>update('website',e.target.value)}/></label>
    {error&&<p className="form-error" role="alert">{error}{formState==='error'&&<> <a href={mailto}>{CONTACT_EMAIL}</a>.</>}</p>}
    <div className="form-actions">{formStep===1&&<button type="button" className="icon-button" aria-label="Back to your details" onClick={()=>changeStep(0)}><ArrowLeft size={18}/></button>}<button className="primary-button" disabled={formState==='sending'}>{formStep===0?'Continue':formState==='sending'?'Sending…':'Send enquiry'}<ArrowUpRight size={19}/></button></div>
    <p className="privacy-note">Rather text? <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>. We only use your details to reply to you — <a href="/privacy.html">privacy policy</a>.</p>
   </form>}
   </div>
  </section>
 </main>
 <footer className="site-footer"><span className="footer-location">Independent by design. Toronto. · <a href="/privacy.html">Privacy</a></span><div className="journey"><span className="journey-count">0{active+1}<span> / 05</span></span><div className="journey-track">{sections.map((s,i)=><button key={s} aria-label={`Go to ${s}`} aria-current={active===i?'step':undefined} className={active===i?'active':''} onClick={()=>go(i)}/>)}</div><span className="sr-only" aria-live="polite">{sections[active]}</span></div><div className="footer-navigation"><button className="icon-button" disabled={active===0} aria-label="Previous section" onClick={()=>go(active-1)}><ArrowLeft size={20}/></button><button className="icon-button next-button" disabled={active===4} aria-label="Next section" onClick={()=>go(active+1)}><ArrowRight size={20}/></button></div></footer>
 </div>
}

export default App;
