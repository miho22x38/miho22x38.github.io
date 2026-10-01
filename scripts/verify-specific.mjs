import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import puppeteer from 'puppeteer-core';
const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox','--disable-gpu']});
const page=await browser.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const base='http://127.0.0.1:5173/';
const checks=[];
const pass=s=>{checks.push(s);console.log('PASS:',s)};
try {
 for(const width of [375,768,1024,1440]){
  await page.setViewport({width,height:1000});await page.goto(base,{waitUntil:'networkidle0'});await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  for(const id of ['services','experience','pricing','voices','about','contact']) assert.equal(await page.$$eval('#'+id,es=>es.length),1);
  await page.evaluate(async()=>{document.documentElement.style.scrollBehavior='auto';for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,30))}scrollTo(0,0)});
  await page.screenshot({path:`shots/page-${width}.png`,fullPage:true});
  pass(`${width}px: 全セクション・横スクロールなし`);
 }
 assert.equal(await page.$$eval('#works,a[href="#works"]',es=>es.length),0);pass('制作事例0件: セクションとナビの両方が非表示');
 assert.equal(await page.$$eval('.service',es=>es.length),4);
 assert.deepEqual(await page.$$eval('.price-value strong',es=>es.map(e=>e.textContent)),['5,000','2,500','15,000','1,500']);
 for(const button of await page.$$('.detail-toggle')){await button.focus();await page.keyboard.press('Enter');assert.equal(await button.evaluate(e=>e.getAttribute('aria-expanded')),'true');assert.equal(await button.evaluate(e=>document.getElementById(e.getAttribute('aria-controls')).hidden),false);await page.keyboard.press('Space');assert.equal(await button.evaluate(e=>e.getAttribute('aria-expanded')),'false')}
 pass('料金4項目・詳細パネルのEnter/Space操作・ARIA同期');
 const text=await page.$eval('body',e=>e.textContent);assert.ok(text.includes('両面制作は25,000円〜'));assert.ok(text.includes('基本修正2回まで'));
 assert.equal(await page.$$eval('.cta',es=>es.length),3);
 const hrefs=await page.$$eval('.cta',es=>es.map(e=>({href:e.href,target:e.target,rel:e.rel})));
 for(const a of hrefs){assert.equal(a.href,'https://docs.google.com/forms/d/e/1FAIpQLSewI9v_IHTlZCuCURC8Vurjn4m7P2HcvPZDtC-u3iYuRQkpQw/viewform?usp=dialog');assert.equal(a.target,'_blank');assert.ok(a.rel.includes('noopener'))}
 assert.equal(await page.$eval('.activity a',e=>e.href),'https://vkdhoj9tkzgf7dopngum.stores.jp/');pass('指定料金条件・CTA3か所・提供された外部URLとrel一致');
 await page.setViewport({width:375,height:812});await page.$eval('.menu-toggle',e=>e.focus());await page.keyboard.press('Enter');assert.equal(await page.$eval('.menu-toggle',e=>e.getAttribute('aria-expanded')),'true');await page.focus('#mobile-menu a');await page.keyboard.press('Escape');assert.equal(await page.$eval('.menu-toggle',e=>e.getAttribute('aria-expanded')),'false');
 const outline=await page.$eval('.menu-toggle',e=>getComputedStyle(e).outlineStyle);assert.notEqual(outline,'none');pass('スマホメニュー・Escapeで閉じる・フォーカス表示');
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 assert.equal(await page.$eval('.hero-copy',e=>getComputedStyle(e).animationName),'none');pass('動きを減らす設定では演出停止');
 await page.$eval('.portrait',e=>{document.documentElement.style.scrollBehavior='auto';e.scrollIntoView({block:'center'})});await new Promise(r=>setTimeout(r,400));await page.screenshot({path:'shots/portrait-mobile.png'});
 const fonts=await page.evaluate(()=>({heading:document.fonts.check('400 32px "Zen Kaku Gothic New"','意図'),body:document.fonts.check('400 16px "Noto Sans JP"','制作'),number:document.fonts.check('400 16px "DM Sans"','5000')}));assert.ok(Object.values(fonts).every(Boolean));pass('見出し・本文・数字のWebフォント読込');
 await page.setJavaScriptEnabled(false);await page.goto(base,{waitUntil:'networkidle0'});
 assert.ok((await page.$eval('h1',e=>e.textContent)).includes('意図を汲み取り、伝わる表現へ。'));
 assert.equal(await page.$$eval('.price-value',es=>es.length),4);assert.equal(await page.$$eval('.cta',es=>es.length),3);
 assert.equal(await page.$$eval('.detail-content[hidden]',es=>es.length),0);pass('JavaScript無効でも本文・料金・料金条件・問い合わせ先が残る');
 const css=readFileSync('src/index.css','utf8')+readFileSync('tailwind.config.js','utf8');
 assert.equal(/#0A0712|#140D24|#1D1433|#F6EFE3|#E5C374|#FF5C8A|#9D6BFF|#3ED6C0|Playfair Display|Shippori Mincho|liquid-glass|section-num|text-grad/i.test(css),false);pass('指定外の既定配色・フォントの混入なし');
 assert.deepEqual(errors,[]);pass('JavaScriptエラーなし');
 writeFileSync('shots/specific-report.json',JSON.stringify({checkedAt:new Date().toISOString(),checks,externalSubmission:'問い合わせフォームは送信していません'},null,2));
}finally{await browser.close()}

