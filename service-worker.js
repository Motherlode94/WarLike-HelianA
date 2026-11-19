// Cache only public static learning assets. No HTTP API, user content or responses.
const VERSION='heliana-navigation-v13-20261119';
const ASSETS=[
 './','./index.html','./style.css','./app.js','./core.js','./curriculum.js',
 './games.html','./games.js','./games.css','./games-core.js',
 './pathways.html','./pathways.js','./pathways.css','./pathways-core.js',
 './communication.html','./communication.js','./communication.css','./communication-data.js','./pictograms.js',
 './duo-practice.html','./duo-practice.js','./duo-practice.css','./duo-practice-data.js',
 './facilitator.html','./facilitator.js','./facilitator.css',
 './learning-studio.html','./learning-studio.js','./learning-studio.css','./learning-studio-data.js',
 './educator.html','./educator.js','./educator.css','./educator-core.js',
 './warscript-junior.html','./warscript-junior.js','./warscript-junior.css','./warscript-junior-core.js',
 './apprendre/','./apprendre/index.html','./communiquer/','./communiquer/index.html',
 './creer/','./creer/index.html','./accompagner/','./accompagner/index.html',
 './manifest.webmanifest','./heliana-icon.svg','./pwa.js'
];
const WHITELIST=new Set(ASSETS.map(p=>new URL(p,self.registration.scope).pathname));
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('heliana-')&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin||!WHITELIST.has(url.pathname)||url.search||request.headers.has('Authorization'))return;
 event.respondWith(caches.match(request).then(response=>response||fetch(request)));
});
