import React, { useState, useRef, useEffect } from 'react';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/800.css';
import { ArrowUpRight, ArrowRight, ArrowLeft, Check, Monitor, Smartphone, Code2, PenTool, X, ChevronDown, Menu, Sparkles, CalendarCheck, Boxes, Mail, CalendarDays, Wheat } from 'lucide-react';
import './style.css';


// Site settings. The keys come from .env locally and from Vercel's Environment Variables in production (see .env.example).
const CONTACT_EMAIL='gokuljinu12@gmail.com';
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
  blurb:'My own infrastructure company: the site, the brand, and the platform behind it—containerized task runners, connected services, and a memory layer.',
  features:['Designed, built and deployed solo','Go · Java / Spring · Next.js · Docker · MongoDB'],
  image:'/railtech.webp',w:1280,h:642,alt:'The RailTech Inc. website homepage',
  link:'https://www.railtech.io/',linkLabel:'Visit railtech.io',cta:'A custom tool or app'},
 {key:'portfolio',tab:'3D portfolio',title:'Interactive 3D portfolio',kind:'Built end to end · Interactive site',
  blurb:'A personal site with a real-time 3D scene running in the browser. Proof that a small site can still feel like something rather than a template.',
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
 const [active,setActive]=useState(0),[device,setDevice]=useState('desktop'),[palette,setPalette]=useState(0),[previewMenu,setPreviewMenu]=useState(false),[openStep,setOpenStep]=useState(0),[slide,setSlide]=useState(projects.length),[autoplay,setAutoplay]=useState(true),[mobileNav,setMobileNav]=useState(false),[heroView,setHeroView]=useState(false),[formStep,setFormStep]=useState(0);
 const [form,setForm]=useState(emptyForm),[formState,setFormState]=useState('idle'),[error,setError]=useState(''),[sentTo,setSentTo]=useState('');
 const track=useRef(null),activeRef=useRef(0),wheelLock=useRef(0),wheelDelta=useRef(0),lastWheel=useRef(0),stepHeading=useRef(null),focusOnArrive=useRef(false),menuButton=useRef(null),hovering=useRef(false),rail=useRef(null),userScroll=useRef(false),jumping=useRef(false),firstCentre=useRef(true);
 // Three copies of the list, so there is always a card either side and the rail can keep moving right.
 const rails=[...projects,...projects,...projects];
 const pick=((slide%projects.length)+projects.length)%projects.length;
 const project=projects[pick];
 const go=n=>{const next=Math.max(0,Math.min(4,n));if(next!==activeRef.current)focusOnArrive.current=true;track.current?.scrollTo({left:track.current.clientWidth*next,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});setMobileNav(false)};
 useEffect(()=>{
  const el=track.current;
  const start=slugs.indexOf(location.hash.slice(1));
  if(start>0){el.scrollTo({left:el.clientWidth*start,behavior:'instant'});setActive(start);activeRef.current=start}
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){const i=Number(e.target.dataset.index);setActive(i);activeRef.current=i}}),{root:el,threshold:.6});
  el.querySelectorAll('.panel').forEach(p=>observer.observe(p));
  const wheel=e=>{
   if(e.ctrlKey||e.target.closest('textarea,select,input'))return;if(Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
   // Let a section that doesn't fit the screen scroll vertically first; only switch sections once it reaches its edge.
   const panel=e.target.closest('.panel');
   if(panel&&panel.scrollHeight>panel.clientHeight+1){const atTop=panel.scrollTop<=0,atEnd=panel.scrollTop+panel.clientHeight>=panel.scrollHeight-1;if(e.deltaY<0?!atTop:!atEnd){wheelLock.current=Date.now();return}}
   e.preventDefault();const now=Date.now();if(now-wheelLock.current<800){lastWheel.current=now;return}if(now-lastWheel.current>180)wheelDelta.current=0;lastWheel.current=now;wheelDelta.current+=e.deltaY;if(Math.abs(wheelDelta.current)>45){go(activeRef.current+Math.sign(wheelDelta.current));wheelDelta.current=0;wheelLock.current=now}
  };
  el.addEventListener('wheel',wheel,{passive:false});
  // Only re-align on width changes: mobile browser bars change the height mid-scroll and would snap back a section.
  let lastWidth=el.clientWidth;
  const resize=()=>{if(el.clientWidth===lastWidth)return;lastWidth=el.clientWidth;el.scrollTo({left:el.clientWidth*activeRef.current,behavior:'instant'})};window.addEventListener('resize',resize);
  const hash=()=>{const i=slugs.indexOf(location.hash.slice(1));if(i>=0&&i!==activeRef.current)go(i)};window.addEventListener('hashchange',hash);
  return()=>{observer.disconnect();el.removeEventListener('wheel',wheel);window.removeEventListener('resize',resize);window.removeEventListener('hashchange',hash)};
 },[]);
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
  centre(jumping.current||firstCentre.current||reduce?'instant':'smooth');
  jumping.current=false;firstCentre.current=false;
  // At the seam, hop back one copy without animating: the card there is the same project, so nothing visibly moves.
  if(slide>=n*2||slide<n){const id=setTimeout(()=>{jumping.current=true;setSlide(s=>slide>=n*2?s-n:s+n)},reduce?0:700);return()=>clearTimeout(id)}
  const onResize=()=>centre('instant');window.addEventListener('resize',onResize);
  return()=>window.removeEventListener('resize',onResize);
 },[slide]);
 useEffect(()=>{
  // A swipe or drag on the rail picks the nearest card and stops the slideshow.
  const r=rail.current;if(!r)return;
  let timer;
  const onScroll=()=>{
   if(!userScroll.current)return;
   clearTimeout(timer);
   timer=setTimeout(()=>{
    const b=r.getBoundingClientRect(),mid=b.left+b.width/2;
    let best=0,dist=Infinity;
    [...r.children].forEach((card,i)=>{const c=card.getBoundingClientRect();const d=Math.abs(c.left+c.width/2-mid);if(d<dist){dist=d;best=i}});
    userScroll.current=false;setSlide(best);
   },140);
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
  <section className={`panel hello-panel ${heroView?'show-preview':''}`} data-index="0" aria-labelledby="hello-title" inert={active!==0}>
   <div className="hero-copy"><h1 id="hello-title" tabIndex={-1}>Small business.<br/>Big first<br/><span>impressions.</span></h1><p>Websites, booking, and custom tools<br className="desktop-break"/> for local businesses in Toronto.</p><div className="hero-actions"><button className="primary-button" onClick={()=>go(4)}>Let’s build something <ArrowUpRight size={19}/></button><button className="text-button" onClick={()=>go(1)}>Our work <ArrowRight size={18}/></button></div></div>
   <div className="hero-visual"><div className={`design-playground palette-${palette}`}>
    <div className="preview-toolbar"><div className="window-dots"><i/><i/><i/></div><span>earlybird — a concept</span></div>
    <div className={`website-preview ${device==='mobile'?'phone-preview':''}`} aria-hidden="true">
     <div className="mini-nav"><span className="cafe-logo">earlybird</span><button onClick={()=>setPreviewMenu(!previewMenu)} className="cafe-menu-button" tabIndex={-1}>{previewMenu?'Close':'Menu'} {previewMenu?<X size={13}/>:<ArrowUpRight size={13}/>}</button></div>
     {previewMenu?<div className="mini-menu"><h3>Your usual?</h3>{[['Espresso','$3.50'],['Flat white','$4.75'],['Oat latte','$5.25']].map(([n,p])=><div key={n}><span>{n}</span><span>{p}</span></div>)}</div>:<div className="mini-hero"><div className="mini-copy"><h3>Your daily<br/>little ritual.</h3><p>Good coffee.<br/>Familiar faces.</p><button onClick={()=>setPreviewMenu(true)} tabIndex={-1}>Find your favourite <ArrowUpRight size={13}/></button></div><img className="cafe-photo" src="/cafe.webp" width="1200" height="800" alt=""/></div>}
    </div>
    <div className="playground-controls"><div className="device-switch" aria-label="Preview device"><button aria-label="Desktop preview" aria-pressed={device==='desktop'} className={device==='desktop'?'pressed':''} onClick={()=>setDevice('desktop')}><Monitor size={18}/></button><button aria-label="Mobile preview" aria-pressed={device==='mobile'} className={device==='mobile'?'pressed':''} onClick={()=>setDevice('mobile')}><Smartphone size={18}/></button></div><div className="palette-switch" aria-label="Preview colour palette">{['Forest','Clay','Ink'].map((c,i)=><button key={c} className={`swatch swatch-${i} ${palette===i?'chosen':''}`} aria-label={`${c} palette`} aria-pressed={palette===i} onClick={()=>setPalette(i)}>{palette===i&&<Check size={13}/>}</button>)}</div></div>
   </div></div>
   <button className="compact-preview-toggle text-button" onClick={()=>setHeroView(!heroView)}>{heroView?'Back to hello':'Try the live preview'} {heroView?<ArrowLeft size={17}/>:<ArrowRight size={17}/>}</button>
  </section>
  <section className="panel work-panel" data-index="1" aria-labelledby="work-title" inert={active!==1}>
   <div className="section-heading"><h2 id="work-title" tabIndex={-1}>Ideas brought<br/><span>to life.</span></h2><p>Things built end to end, plus concepts for local businesses.</p></div>
   <div className="showcase" id="work-detail" role="tabpanel" aria-labelledby={`work-tab-${pick}`} onPointerEnter={()=>hovering.current=true} onPointerLeave={()=>hovering.current=false} onFocusCapture={()=>hovering.current=true} onBlurCapture={()=>hovering.current=false}>
    <div className="showcase-rail" ref={rail} aria-hidden="true" onPointerDown={()=>{userScroll.current=true;setAutoplay(false)}}>
     {rails.map((p,i)=><div key={p.key+'-'+i} className={`showcase-card art-${p.key} ${i===slide?'current':''}`} onClick={()=>{setAutoplay(false);setSlide(i)}}>
      {p.Art?<p.Art/>:<img className="showcase-shot" src={p.image} width={p.w} height={p.h} loading="lazy" decoding="async" alt=""/>}
     </div>)}
    </div>
    <div key={"copy-"+project.key} className="showcase-copy">
     <span className="showcase-kind">{project.kind}</span>
     <h3>{project.title}</h3>
     <p>{project.blurb}</p>
     <ul className="showcase-features">{project.features.map(f=><li key={f}><Check size={15} aria-hidden="true"/>{f}</li>)}</ul>
     <div className="showcase-links">{project.link&&<a className="portfolio-link" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel}<ArrowUpRight size={17}/></a>}<button className="text-button" onClick={()=>choose(project.cta)}>Talk about your project <ArrowRight size={17}/></button></div>
    </div>
   </div>
   <div className="showcase-controls" onPointerEnter={()=>hovering.current=true} onPointerLeave={()=>hovering.current=false} onFocusCapture={()=>hovering.current=true} onBlurCapture={()=>hovering.current=false}>
    <div className="showcase-tabs" role="tablist" aria-label="Projects">{projects.map((x,i)=><button key={x.key} id={`work-tab-${i}`} role="tab" aria-selected={pick===i} aria-controls="work-detail" tabIndex={pick===i?0:-1} className={pick===i?'selected':''} onClick={()=>choosePick(i)} onKeyDown={e=>tabKeys(e,i,projects.length,choosePick,'work-tab')}>{x.tab}</button>)}</div>
   </div>
  </section>
  <section className="panel services-panel" data-index="2" aria-labelledby="services-title" inert={active!==2}>
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
  <section className="panel process-panel" data-index="3" aria-labelledby="process-title" inert={active!==3}>
   <div className="process-intro"><h2 id="process-title" tabIndex={-1}>A real person.<br/>A clear process.<br/><span>A better website.</span></h2><div className="founder-row"><p>Behind Luko Designs is Gokul—your designer, developer, and point of contact.</p><a className="portfolio-link" href="https://gokuljinu.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="View Gokul’s portfolio (opens in a new tab)">View Gokul’s portfolio <ArrowUpRight size={17}/></a></div></div>
   <div className="process-surface"><div className="step-tabs" role="tablist" aria-label="Our process">{['Talk','Design','Build','Launch'].map((s,i)=><button key={s} id={`process-tab-${i}`} role="tab" aria-selected={openStep===i} aria-controls="process-detail" tabIndex={openStep===i?0:-1} className={openStep===i?'selected':''} onClick={()=>setOpenStep(i)} onKeyDown={e=>tabKeys(e,i,4,setOpenStep,'process-tab')}>{s}</button>)}</div><div id="process-detail" role="tabpanel" aria-labelledby={`process-tab-${openStep}`} className="step-detail"><span className="large-step" aria-hidden="true">0{openStep+1}</span><div key={openStep} className="step-copy"><h3>{steps[openStep][0]}</h3><p>{steps[openStep][1]}</p></div></div><button className="text-button" onClick={()=>openStep<3?setOpenStep(openStep+1):go(4)}>{openStep<3?'Next step':'Let’s get started'}<ArrowRight size={18}/></button></div>
   <div className="faq"><h3 className="faq-title">Common questions</h3>{faqs.map(([q,a])=><details key={q} name="faq"><summary>{q}<ChevronDown size={17} aria-hidden="true"/></summary><p>{a}</p></details>)}</div>
  </section>
  <section className="panel contact-panel" data-index="4" aria-labelledby="contact-title" inert={active!==4}>
   <div className="contact-intro"><h2 id="contact-title" tabIndex={-1}>A fresh start.<br/><span>Let’s make it.</span></h2><p>Tell us what you have in mind.<br/>We’ll take it from there.</p>
    <div className="contact-direct"><a className="portfolio-link" href={mailto}><Mail size={17} aria-hidden="true"/>{CONTACT_EMAIL}</a>{BOOKING_URL&&<a className="portfolio-link" href={BOOKING_URL} target="_blank" rel="noopener noreferrer" aria-label="Book a call (opens in a new tab)"><CalendarDays size={17} aria-hidden="true"/>Book a call</a>}</div>
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
    <p className="privacy-note">We only use your details to reply to you. <a href="/privacy.html">Privacy policy</a></p>
   </form>}
   </div>
  </section>
 </main>
 <footer className="site-footer"><span className="footer-location">Independent by design. Toronto. · <a href="/privacy.html">Privacy</a></span><div className="journey"><span className="journey-count">0{active+1}<span> / 05</span></span><div className="journey-track">{sections.map((s,i)=><button key={s} aria-label={`Go to ${s}`} aria-current={active===i?'step':undefined} className={active===i?'active':''} onClick={()=>go(i)}/>)}</div><span className="sr-only" aria-live="polite">{sections[active]}</span></div><div className="footer-navigation"><button className="icon-button" disabled={active===0} aria-label="Previous section" onClick={()=>go(active-1)}><ArrowLeft size={20}/></button><button className="icon-button next-button" disabled={active===4} aria-label="Next section" onClick={()=>go(active+1)}><ArrowRight size={20}/></button></div></footer>
 </div>
}

export default App;
