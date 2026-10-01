// Windows restricted runtime cannot start Chrome's GPU sandbox. The auditor and all checks remain unchanged.
import puppeteer from 'puppeteer-core';
const launch=puppeteer.launch.bind(puppeteer);
puppeteer.launch=(options)=>launch({...options,args:[...(options.args||[]),'--no-sandbox','--disable-gpu']});
await import('../shots/verify.mjs');
