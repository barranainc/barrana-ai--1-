// Meta Pixel base code. fbq() is defined at once so calls queue up (App.tsx sends PageView per route),
// but Facebook's fbevents.js (about 0.5 s of main-thread work on a mid-range phone) is only fetched
// a few seconds after the page has loaded, so it no longer delays the first render (R5).
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];
var load=function(){t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)};
var later=function(){setTimeout(function(){
f.requestIdleCallback?f.requestIdleCallback(load,{timeout:2000}):load()},2500)};
b.readyState==='complete'?later():f.addEventListener('load',later)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1757222568845282');
