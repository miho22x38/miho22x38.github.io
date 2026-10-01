import { works } from './data/works';
import { Works } from './Works';
import { useEffect, useRef, useState } from 'react';
import { site, services, experience, voices, portrait, navigation } from './data/site';
import type { Service } from './data/types';

function Arrow({external=false}:{external?:boolean}) { return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={external?'M6 18 18 6M6 6h12v12':'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function CTA({className=''}:{className?:string}) {return <div className={`cta-wrap ${className}`}><a className="cta" href={site.contactUrl} target="_blank" rel="noopener noreferrer"><span>{site.cta}</span><Arrow external/><span className="sr-only">（{site.externalNote}）</span></a><p className="cta-note">{site.ctaNote}<span aria-hidden="true"> ↗</span></p></div>}
function SectionTitle({num,title,description}:{num:string;title:string;description?:string}) {return <div className="section-heading"><p className="section-index" aria-hidden="true"><span>{num}</span><i/></p><h2>{title}</h2>{description&&<p className="section-description">{description}</p>}</div>}
function QuietMotion() {
 useEffect(()=>{
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(media.matches||!('IntersectionObserver' in window))return;
  const animations:Animation[]=[];
  const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target as HTMLElement;
    const frames=el.matches('.portrait picture')
     ? [{clipPath:'inset(0 0 7% 0)',opacity:.65},{clipPath:'inset(0 0 0 0)',opacity:1}]
     : [{transform:'scaleX(.08)'},{transform:'scaleX(1)'}];
    animations.push(el.animate(frames,{duration:el.matches('picture')?1300:1100,easing:'cubic-bezier(.22,.61,.36,1)'}));
    observer.unobserve(el);
   });
  },{threshold:.16});
  document.querySelectorAll('.section-index i,.portrait picture').forEach(el=>observer.observe(el));
  const stop=()=>{if(media.matches){observer.disconnect();animations.forEach(a=>a.cancel())}};
  media.addEventListener('change',stop);
  return ()=>{observer.disconnect();animations.forEach(a=>a.cancel());media.removeEventListener('change',stop)};
 },[]);
 return null;
}
function PriceDetail({service}:{service:Service}) {
 const [open,setOpen]=useState(false);
 const [enhanced,setEnhanced]=useState(false);
 useEffect(()=>setEnhanced(true),[]);
 return <div className="price-detail"><button type="button" className="detail-toggle" aria-expanded={enhanced?open:true} aria-controls={`detail-${service.id}`} onClick={()=>setOpen(!open)}>{site.ui.details}<span aria-hidden="true">{open?'−':'＋'}</span><span className="sr-only">：{service.title}</span></button><div id={`detail-${service.id}`} className="detail-content" hidden={enhanced&&!open}><h4>{site.ui.basic}</h4><ul>{service.basic.map(t=><li key={t}>{t}</li>)}</ul><h4>{site.ui.conditions}</h4><ul>{service.conditions.map(t=><li key={t}>{t}</li>)}</ul></div></div>
}
export default function App(){
 const [menu,setMenu]=useState(false);
 const menuButton=useRef<HTMLButtonElement>(null);
 const closeMenu=()=>setMenu(false);
 return <><QuietMotion/><a className="skip-link" href="#main-content">{site.ui.skip}</a><header className="header"><div className="header-inner"><a href="#top" className="brand" aria-label={`${site.name} ${site.ui.top}`}><span>{site.name}</span></a><nav className="desktop-nav" aria-label="メインナビゲーション">{navigation.map(n=><a key={n.id} href={`#${n.id}`}>{n.label}</a>)}</nav><a className="header-contact" href={site.contactUrl} target="_blank" rel="noopener noreferrer">{site.labels.contact}<Arrow external/><span className="sr-only">（{site.ctaNote}・{site.externalNote}）</span></a><button ref={menuButton} className="menu-toggle" aria-expanded={menu} aria-controls="mobile-menu" onClick={()=>setMenu(!menu)}><span>{site.ui.menu}</span><i aria-hidden="true">{menu?'−':'＋'}</i></button></div><nav id="mobile-menu" className="mobile-nav" hidden={!menu} aria-label="モバイルナビゲーション" onKeyDown={e=>{if(e.key==='Escape'){closeMenu();menuButton.current?.focus()}}}>{navigation.map(n=><a key={n.id} href={`#${n.id}`} onClick={closeMenu}>{n.label}<Arrow/></a>)}</nav></header>
 <main id="main-content" tabIndex={-1}>
 <section id="top" className="hero section"><div className="hero-copy"><div className="hero-person"><p>{site.name}</p><span>{site.role}</span></div><h1>{site.headline[0]}<br/>{site.headline[1]}</h1><div className="hero-intro">{site.intro.map(t=><p key={t}>{t}</p>)}</div><CTA/></div><aside className="hero-aside"><span aria-hidden="true"/><p>{site.heroNote}</p></aside><div className="hero-bottom"><span>{site.role}</span><a href="#services">{site.labels.services}<span aria-hidden="true">↓</span></a></div></section>
 <section id="services" className="section services"><div className="section-intro"><SectionTitle num="01" title={site.labels.services}/><p>{site.serviceIntro}</p></div><div className="service-grid">{services.map((s,i)=><article className="service" key={s.id}><div className="service-top"><span className="number">0{i+1}</span></div><h3>{s.title}</h3><p>{s.description}</p>{s.examples&&<p className="examples">{s.examples}</p>}</article>)}</div></section>
 <section id="experience" className="experience-band"><div className="section experience-layout"><SectionTitle num="02" title={site.labels.experience} description={site.experienceIntro}/><div className="experience-content">{experience.map(e=><div className="experience-row" key={e.title}><h3>{e.title}</h3><ul>{e.items.map(t=><li key={t}>{t}</li>)}</ul></div>)}<p className="small-note">{site.experienceNote}</p></div></div></section>
 <Works items={works}/>
 <section id="pricing" className="section pricing"><SectionTitle num={works.length?'04':'03'} title={site.labels.pricing} description={site.priceIntro}/><div className="price-grid">{services.map((s,i)=><article className="price" key={s.id}><p className="price-number">0{i+1}</p><h3>{s.title}</h3><p className="price-value"><strong>{s.price.toLocaleString('ja-JP')}</strong><span>円〜<small>／{s.unit}</small></span></p><PriceDetail service={s}/></article>)}</div><div className="price-foot"><p>{site.priceAfter}</p><details className="common-details"><summary>{site.ui.common}<span aria-hidden="true">＋</span></summary><ul>{site.common.map(t=><li key={t}>{t}</li>)}</ul></details></div><div className="price-contact"><p>{site.priceCta}</p><CTA/></div></section>
 <section id="voices" className="voices-band"><div className="section"><SectionTitle num={works.length?'05':'04'} title={site.labels.voices} description={site.ui.voiceIntro}/><div className="voice-grid">{voices.map(v=><figure className="voice" key={v.theme}><figcaption><i/>{v.theme}</figcaption><blockquote>{v.quote}</blockquote>{'support' in v&&<blockquote className="support-quote">{v.support}</blockquote>}</figure>)}</div></div></section>
 <section id="about" className="section about"><SectionTitle num={works.length?'06':'05'} title={site.labels.about}/><div className="about-grid"><figure className="portrait"><picture><img src={portrait.src} srcSet={portrait.srcSet} sizes="(max-width: 700px) calc(100vw - 48px), (max-width: 1100px) 45vw, 530px" width={portrait.width} height={portrait.height} alt={portrait.alt} loading="lazy" decoding="async"/></picture><figcaption><span>{site.name}</span></figcaption></figure><div className="profile-copy"><p className="profile-name">{site.name}</p><p className="profile-role">{site.role}</p>{site.profile.map((p,i)=><p key={p} className={i===1?'profile-belief':''}>{p}</p>)}</div></div><div className="partner"><div className="partner-heading"><h3>{site.partnerTitle.map(t=><span key={t}>{t}</span>)}</h3></div><div><p>{site.partner[0]}</p><ul className="partner-needs">{site.partnerNeeds.map(t=><li key={t}>「{t}」</li>)}</ul><p>{site.partner[1]}</p><p>{site.partner[2]}</p></div></div><aside className="activity"><div><h3>{site.activityTitle}</h3><p>{site.activity}</p></div><a className="text-link" href={site.shopUrl} target="_blank" rel="noopener noreferrer">{site.shopLabel}<Arrow external/><span className="sr-only">（{site.externalNote}）</span></a></aside></section>
 <section id="contact" className="contact-band"><div className="section contact"><p className="contact-label">{site.labels.contact}</p><h2>{site.contactTitle.map(t=><span key={t}>{t}</span>)}</h2><div className="contact-copy"><p>{site.contactLines.map(t=><span key={t}>{t}<br/></span>)}</p><p>{site.contactBody}</p></div><CTA/></div></section>
 </main><footer className="footer section"><a className="brand" href="#top"><span>{site.name}</span></a><p>© {site.ui.copyright}</p><a className="back-top" href="#top" aria-label={site.ui.top}>↑</a></footer></>
}


