import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import {copyFileSync,readFileSync,writeFileSync} from 'node:fs';
await sharp('public/favicon.svg').resize(180,180).png().toFile('public/apple-touch-icon.png');
copyFileSync('public/apple-touch-icon.png','dist/apple-touch-icon.png');
const b=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox','--disable-gpu']});
try{
const p=await b.newPage();
for(const w of [1440,375]){
 await p.setViewport({width:w,height:w===1440?1000:812});await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle0'});await p.evaluate(()=>document.fonts.ready);await new Promise(r=>setTimeout(r,1500));
 await p.screenshot({path:`shots/refined-hero-${w}.png`});
 await p.evaluate(async()=>{document.documentElement.style.scrollBehavior='auto';for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,100))}await new Promise(r=>setTimeout(r,1400));scrollTo(0,0)});
 await p.screenshot({path:`shots/refined-full-${w}.png`,fullPage:true});
 for(const id of ['pricing','voices','about']){await p.$eval('#'+id,e=>e.scrollIntoView({block:'start'}));await new Promise(r=>setTimeout(r,1400));await p.screenshot({path:`shots/refined-${id}-${w}.png`})}
}
await p.setViewport({width:1200,height:630});
const photo='data:image/webp;base64,'+readFileSync('public/images/miho-v2-960.webp').toString('base64');
await p.setContent(`<html lang="ja"><head><meta charset="utf-8"><style>body{margin:0;background:#f7f2ee;color:#332c29;font-family:'Yu Gothic',sans-serif;display:flex;align-items:center;height:630px}article{padding:64px;width:740px;box-sizing:border-box}p{font-size:19px;line-height:2;letter-spacing:2px}h1{font-size:49px;font-weight:400;line-height:1.7;letter-spacing:4px;margin-block:45px}img{width:460px;height:630px;object-fit:cover;object-position:center}small{font-size:14px;color:#71635c}.line{height:1px;width:70px;background:#8e746a;margin-bottom:25px}</style></head><body><article><div class="line"></div><p>添田 美帆<br><small>動画編集｜デザイン・資料作成</small></p><h1>意図を汲み取り、<br>伝わる表現へ。</h1><small>チラシ、資料、ショート動画。</small></article><img src="${photo}"></body></html>`,{waitUntil:'load'});
await p.screenshot({path:'public/og.jpg',type:'jpeg',quality:88});copyFileSync('public/og.jpg','dist/og.jpg');
}finally{await b.close()}
