import puppeteer from 'puppeteer-core';
const b=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox','--disable-gpu']});
const p=await b.newPage();await p.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle0'});
console.log(await p.evaluate(async()=>{await document.fonts.ready;return {check:[document.fonts.check('700 32px "Zen Kaku Gothic New"','意図'),document.fonts.check('400 16px "Noto Sans JP"','制作'),document.fonts.check('400 16px "DM Sans"','5000')],fonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>({family:f.family,weight:f.weight}))}}));await b.close();
