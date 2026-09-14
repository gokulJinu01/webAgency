import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, ArrowLeft, Check, Monitor, Smartphone, Code2, PenTool, X, ChevronDown, Menu, Sparkles, Search } from 'lucide-react';
import './style.css';

const sections=['Hello','Work','Services','Process','Contact'];
const serviceNames=['A business website','Website redesign','Booking & integrations','Website care','Something else'];
const steps=[
 ['Let’s talk.','We get to know your business and agree on what your website needs to do. You receive a clear scope before we begin.'],
 ['Make it yours.','We shape the content and design around your business. You review the direction before development begins.'],
 ['Bring it to life.','I build your site for every screen. We refine it together and check the details, from your content to your contact form.'],
 ['Ready for the world.','We launch on your domain and walk through your new website together. Ongoing care is available when you need it.']
];
function Logo(){return <><svg className="logo-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M11 9h11v23h17v10H11V9Z" fill="currentColor"/><path d="M28 9h11v17H28V9Z" fill="var(--accent)"/></svg><span className="wordmark">luko<span>designs</span></span></>}
function App(){
 const [active,setActive]=useState(0),[device,setDevice]=useState('desktop'),[palette,setPalette]=useState(0),[previewMenu,setPreviewMenu]=useState(false),[openStep,setOpenStep]=useState(0),[project,setProject]=useState(null),[mobileNav,setMobileNav]=useState(false),[workIndex,setWorkIndex]=useState(0),[heroView,setHeroView]=useState(false),[formStep,setFormStep]=useState(0);
 const [form,setForm]=useState({name:'',email:'',business:'',service:'A business website',message:'',website:''}),[formState,setFormState]=useState('idle'),[error,setError]=useState('');
 const track=useRef(null),activeRef=useRef(0),wheelLock=useRef(0),wheelDelta=useRef(0),lastWheel=useRef(0),dialogRef=useRef(null),returnFocus=useRef(null),formRef=useRef(null),stepHeading=useRef(null);
 const go=n=>{const next=Math.max(0,Math.min(4,n));track.current?.scrollTo({left:track.current.clientWidth*next,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});setMobileNav(false)};
 useEffect(()=>{
  const el=track.current;
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){const i=Number(e.target.dataset.index);setActive(i);activeRef.current=i}}),{root:el,threshold:.6});
  el.querySelectorAll('.panel').forEach(p=>observer.observe(p));
  const wheel=e=>{if(e.ctrlKey||e.target.closest('dialog,textarea,select,input'))return;if(Math.abs(e.deltaX)>Math.abs(e.deltaY))return;e.preventDefault();const now=Date.now();if(now-wheelLock.current<800){lastWheel.current=now;return}if(now-lastWheel.current>180)wheelDelta.current=0;lastWheel.current=now;wheelDelta.current+=e.deltaY;if(Math.abs(wheelDelta.current)>45){go(activeRef.current+Math.sign(wheelDelta.current));wheelDelta.current=0;wheelLock.current=now}};
  el.addEventListener('wheel',wheel,{passive:false});
  const resize=()=>el.scrollTo({left:el.clientWidth*activeRef.current,behavior:'instant'});window.addEventListener('resize',resize);
  return()=>{observer.disconnect();el.removeEventListener('wheel',wheel);window.removeEventListener('resize',resize)};
 },[]);
 useEffect(()=>{const key=e=>{if(e.target.closest('input,textarea,select,button,dialog'))return;if(e.key==='ArrowRight'){e.preventDefault();go(activeRef.current+1)}if(e.key==='ArrowLeft'){e.preventDefault();go(activeRef.current-1)}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[]);
 useEffect(()=>{if(project){returnFocus.current=document.activeElement;dialogRef.current?.showModal()}else if(dialogRef.current?.open){dialogRef.current.close();returnFocus.current?.focus()}},[project]);
 const choose=name=>{setForm(f=>({...f,service:name}));go(4)};
 const changeStep=n=>{setFormStep(n);requestAnimationFrame(()=>stepHeading.current?.focus())};
 async function submit(e){
  e.preventDefault();if(formStep===0){changeStep(1);return}setError('');
  if(!import.meta.env.VITE_API_URL){setFormState('unavailable');return}
  setFormState('sending');
  try{const res=await fetch(`${import.meta.env.VITE_API_URL.replace(/\/$/,'')}/api/enquiries`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});const data=await res.json();if(!res.ok)throw new Error(data.error||'We couldn’t send your enquiry. Please try again.');setFormState('success')}catch(err){setError(err.message);setFormState('error')}
 }
 const update=(key,value)=>setForm(f=>({...f,[key]:value}));
 return <div className={`app-shell section-${active}`}>
 <a href="#main" className="skip-link">Skip to content</a>
 <header className="site-header">
  <button className="brand" onClick={()=>go(0)} aria-label="Luko Designs home"><Logo/></button>
  <nav className={mobileNav?'top-nav open':'top-nav'} aria-label="Main navigation">{sections.slice(0,4).map((s,i)=><button key={s} onClick={()=>go(i)} className={active===i?'selected':''} aria-current={active===i?'page':undefined}>{s}</button>)}</nav>
  <div className="header-right"><button className="header-cta" onClick={()=>go(4)}>Let’s talk <ArrowUpRight size={18}/></button><button className="mobile-menu icon-button" aria-label="Toggle navigation" aria-expanded={mobileNav} onClick={()=>setMobileNav(!mobileNav)}>{mobileNav?<X size={20}/>:<Menu size={20}/>}</button></div>
 </header>
 <main id="main" tabIndex={-1} ref={track} className="horizontal-track" aria-label="Agency website sections">
  <section className={`panel hello-panel ${heroView?'show-preview':''}`} data-index="0" aria-labelledby="hello-title" inert={active!==0}>
   <div className="hero-copy"><h1 id="hello-title">Small business.<br/>Big first<br/><span>impressions.</span></h1><p>Thoughtful websites for restaurants,<br className="desktop-break"/> cafés, and local businesses.</p><div className="hero-actions"><button className="primary-button" onClick={()=>go(4)}>Let’s build something <ArrowUpRight size={19}/></button><button className="text-button" onClick={()=>go(1)}>Our work <ArrowRight size={18}/></button></div></div>
   <div className="hero-visual"><div className={`design-playground palette-${palette}`}>
    <div className="preview-toolbar"><div className="window-dots"><i/><i/><i/></div><span>earlybird — a concept</span></div>
    <div className={`website-preview ${device==='mobile'?'phone-preview':''}`}>
     <div className="mini-nav"><span className="cafe-logo">earlybird</span><button onClick={()=>setPreviewMenu(!previewMenu)} className="cafe-menu-button">{previewMenu?'Close':'Menu'} {previewMenu?<X size={13}/>:<ArrowUpRight size={13}/>}</button></div>
     {previewMenu?<div className="mini-menu"><h3>Your usual?</h3>{[['Espresso','$3.50'],['Flat white','$4.75'],['Oat latte','$5.25']].map(([n,p])=><div key={n}><span>{n}</span><span>{p}</span></div>)}</div>:<div className="mini-hero"><div className="mini-copy"><h3>Your daily<br/>little ritual.</h3><p>Good coffee.<br/>Familiar faces.</p><button onClick={()=>setPreviewMenu(true)}>Find your favourite <ArrowUpRight size={13}/></button></div><img className="cafe-photo" src="/cafe.jpg" alt="Espresso in morning light on a café counter"/></div>}
    </div>
    <div className="playground-controls"><div className="device-switch" aria-label="Preview device"><button aria-label="Desktop preview" aria-pressed={device==='desktop'} className={device==='desktop'?'pressed':''} onClick={()=>setDevice('desktop')}><Monitor size={18}/></button><button aria-label="Mobile preview" aria-pressed={device==='mobile'} className={device==='mobile'?'pressed':''} onClick={()=>setDevice('mobile')}><Smartphone size={18}/></button></div><div className="palette-switch" aria-label="Preview colour palette">{['Forest','Clay','Ink'].map((c,i)=><button key={c} className={`swatch swatch-${i} ${palette===i?'chosen':''}`} aria-label={`${c} palette`} aria-pressed={palette===i} onClick={()=>setPalette(i)}>{palette===i&&<Check size={13}/>}</button>)}</div></div>
   </div></div>
   <button className="compact-preview-toggle text-button" onClick={()=>setHeroView(!heroView)}>{heroView?'Back to hello':'Try the live preview'} {heroView?<ArrowLeft size={17}/>:<ArrowRight size={17}/>}</button>
  </section>
  <section className="panel work-panel" data-index="1" aria-labelledby="work-title" inert={active!==1}>
   <div className="section-heading"><h2 id="work-title">Ideas brought<br/><span>to life.</span></h2><p>Selected projects from my portfolio.</p></div>
   <div className={`project-grid work-${workIndex}`}>
    <button className="project-card project-0" onClick={()=>setProject('railtech')}><div className="project-art site-display display-railtech"><div className="site-display-browser"><div className="site-display-toolbar"><span className="window-dots" aria-hidden="true"><i/><i/><i/></span><span>railtech.io</span><ArrowUpRight size={13}/></div><img src="/railtech.png" alt="RailTech website screenshot from Gokul’s portfolio"/></div><span className="project-open"><ArrowUpRight size={22}/></span></div><div className="project-caption"><h3>RailTech AgentPod</h3><span>Platform development</span></div></button>
    <button className="project-card project-1" onClick={()=>setProject('mme')}><div className="project-art site-display display-mme"><div className="site-display-browser"><div className="site-display-toolbar"><span className="window-dots" aria-hidden="true"><i/><i/><i/></span><span>mme.railtech.io</span><ArrowUpRight size={13}/></div><img src="/mme.png" alt="MME website screenshot from Gokul’s portfolio"/></div><span className="project-open"><ArrowUpRight size={22}/></span></div><div className="project-caption"><h3>MME · Memory Engine</h3><span>AI platform & APIs</span></div></button>
   </div>
   <div className="work-switch" aria-label="Choose portfolio project">{['RailTech','MME'].map((x,i)=><button key={x} className={workIndex===i?'selected':''} aria-pressed={workIndex===i} onClick={()=>setWorkIndex(i)}>{x}</button>)}</div>
  </section>
  <section className="panel services-panel" data-index="2" aria-labelledby="services-title" inert={active!==2}>
   <div className="services-surface"><div className="services-intro"><h2 id="services-title">Built around<br/><span>your business.</span></h2><p>From your first website to a fresh direction. Design, development, and support—all in one place.</p><button className="primary-button" onClick={()=>choose('A business website')}>Get in touch <ArrowUpRight size={19}/></button></div>
   <div className="service-list">{[
    [PenTool,'Design that feels like you','Custom websites and thoughtful redesigns.'],
    [Code2,'Built for every screen','Responsive development that works beautifully.'],
    [Search,'Easy to find. Easy to use.','Search setup, enquiry forms, and booking links.'],
    [Sparkles,'Care beyond launch','Content updates, maintenance, and ongoing support.']
   ].map(([Icon,title,copy])=><div className="service-item" key={title}><span className="service-icon"><Icon size={23}/></span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div>
   </div>
  </section>
  <section className="panel process-panel" data-index="3" aria-labelledby="process-title" inert={active!==3}>
   <div className="process-intro"><h2 id="process-title">A real person.<br/>A clear process.<br/><span>A better website.</span></h2><div className="founder-row"><p>I’m Gokul—your designer, developer, and point of contact.</p><a className="portfolio-link" href="https://gokuljinu.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="View Gokul’s portfolio (opens in a new tab)">View my portfolio <ArrowUpRight size={17}/></a></div></div>
   <div className="process-surface"><div className="step-tabs" role="tablist" aria-label="Our process">{['Talk','Design','Build','Launch'].map((s,i)=><button key={s} id={`process-tab-${i}`} role="tab" aria-selected={openStep===i} aria-controls="process-detail" tabIndex={openStep===i?0:-1} className={openStep===i?'selected':''} onClick={()=>setOpenStep(i)} onKeyDown={e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?3:(i+(e.key==='ArrowRight'?1:3))%4;setOpenStep(n);document.getElementById(`process-tab-${n}`)?.focus()}}}>{s}</button>)}</div><div id="process-detail" role="tabpanel" aria-labelledby={`process-tab-${openStep}`} className="step-detail"><span className="large-step" aria-hidden="true">0{openStep+1}</span><div key={openStep} className="step-copy"><h3>{steps[openStep][0]}</h3><p>{steps[openStep][1]}</p></div></div><button className="text-button" onClick={()=>openStep<3?setOpenStep(openStep+1):go(4)}>{openStep<3?'Next step':'Let’s get started'}<ArrowRight size={18}/></button></div>
  </section>
  <section className="panel contact-panel" data-index="4" aria-labelledby="contact-title" inert={active!==4}>
   <div className="contact-intro"><h2 id="contact-title">A fresh start.<br/><span>Let’s make it.</span></h2><p>Tell me what you have in mind.<br/>We’ll take it from there.</p></div>
   <div className="contact-form-wrap">
   {['success','unavailable'].includes(formState)?<div className="form-result" role="status"><span className="result-icon">{formState==='success'?<Check size={28}/>:<ArrowUpRight size={28}/>}</span><h3>{formState==='success'?'Thanks for saying hello.':'Enquiries open soon.'}</h3><p>{formState==='success'?`Your enquiry has been received. Gokul will reply to ${form.email}.`:'This preview isn’t receiving enquiries yet. Your message hasn’t been sent.'}</p><button className="secondary-button" onClick={()=>setFormState('idle')}>{formState==='success'?'Send another enquiry':'Back to your message'}<ArrowLeft size={18}/></button></div>:
   <form ref={formRef} onSubmit={submit}>
    <div className="form-heading"><h3 ref={stepHeading} tabIndex={-1}>{formStep===0?'First, a little about you.':'What are we making?'}</h3><span aria-label={`Step ${formStep+1} of 2`}>{formStep+1}/2</span></div>
    {formStep===0?<div className="form-fields" key="details"><div className="form-row"><label>Your name<input autoComplete="name" required maxLength={100} placeholder="Alex Chen" value={form.name} onChange={e=>update('name',e.target.value)}/></label><label>Email<input type="email" autoComplete="email" required maxLength={254} placeholder="alex@business.ca" value={form.email} onChange={e=>update('email',e.target.value)}/></label></div><label>Business name <span>(optional)</span><input autoComplete="organization" maxLength={150} placeholder="Your business" value={form.business} onChange={e=>update('business',e.target.value)}/></label></div>:
    <div className="form-fields" key="project"><label>I’m looking for<div className="select-wrap"><select value={form.service} onChange={e=>update('service',e.target.value)}>{serviceNames.map(x=><option key={x}>{x}</option>)}</select><ChevronDown size={18}/></div></label><label>Your project<textarea required minLength={10} maxLength={3000} rows={2} placeholder="A little about your business and your idea…" value={form.message} onChange={e=>update('message',e.target.value)}/></label></div>}
    <label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={e=>update('website',e.target.value)}/></label>
    {error&&<p className="form-error" role="alert">{error}</p>}
    <div className="form-actions">{formStep===1&&<button type="button" className="icon-button" aria-label="Back to your details" onClick={()=>changeStep(0)}><ArrowLeft size={18}/></button>}<button className="primary-button" disabled={formState==='sending'}>{formStep===0?'Continue':formState==='sending'?'Sending…':'Send enquiry'}<ArrowUpRight size={19}/></button></div>
    <p className="privacy-note">Your details stay between us.</p>
   </form>}
   </div>
  </section>
 </main>
 <footer className="site-footer"><span className="footer-location">Independent by design. Toronto.</span><div className="journey"><span className="journey-count">0{active+1}<span> / 05</span></span><div className="journey-track">{sections.map((s,i)=><button key={s} aria-label={`Go to ${s}`} aria-current={active===i?'step':undefined} className={active===i?'active':''} onClick={()=>go(i)}/>)}</div><span className="sr-only" aria-live="polite">{sections[active]}</span></div><div className="footer-navigation"><button className="icon-button" disabled={active===0} aria-label="Previous section" onClick={()=>go(active-1)}><ArrowLeft size={20}/></button><button className="icon-button next-button" disabled={active===4} aria-label="Next section" onClick={()=>go(active+1)}><ArrowRight size={20}/></button></div></footer>
 <dialog ref={dialogRef} className="project-dialog" onCancel={()=>setProject(null)} onClick={e=>{if(e.target===e.currentTarget)setProject(null)}} aria-labelledby="dialog-title"><button className="icon-button dialog-close" aria-label="Close project" onClick={()=>setProject(null)}><X size={21}/></button><h2 id="dialog-title">{project==='railtech'?'RailTech AgentPod':'MME · Memory Engine'}</h2><p>{project==='railtech'?'An AI-agent execution platform built around containerized task runners, connected services, and a memory layer. A portfolio project showing my experience with backend systems and platform development.':'A memory layer for AI agents that stores and retrieves information within a defined context budget. A portfolio project combining backend services, API integrations, and a developer-facing product.'}</p><img src={project==='railtech'?'/railtech.png':'/mme.png'} alt={project==='railtech'?'RailTech website screenshot':'MME website screenshot'}/><p className="dialog-note">{project==='railtech'?'Go · Java / Spring · Next.js · Docker · MongoDB':'Python / FastAPI · MCP · LangChain · Docker'}<br/>Personal portfolio work · Predates Luko Designs</p><div className="project-links"><a className="portfolio-link" href={project==='railtech'?'https://www.railtech.io/':'https://mme.railtech.io/'} target="_blank" rel="noopener noreferrer">{project==='railtech'?'Visit RailTech':'Visit MME'}<ArrowUpRight size={17}/></a><button className="text-button" onClick={()=>{setProject(null);choose('A business website')}}>Talk about your project <ArrowRight size={17}/></button></div></dialog>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
