import {
  ATTRIBUTION_COOKIE,
  ATTRIBUTION_MAX_AGE_SEC,
  ATTRIBUTION_QUERY_KEYS,
  ATTRIBUTION_VALUE_MAX,
} from '@/lib/attribution';

/**
 * Tiny inline boot for every marketing page: first-touch cookie, CTA query
 * rewrite, and GTM on real gestures (plus a 15s fallback). Kept as a string so
 * the root layout does not hydrate a React island.
 */
export function getMarketingBootScript(gtmId: string): string {
  const config = JSON.stringify({
    keys: ATTRIBUTION_QUERY_KEYS,
    cookie: ATTRIBUTION_COOKIE,
    maxAge: ATTRIBUTION_MAX_AGE_SEC,
    valueMax: ATTRIBUTION_VALUE_MAX,
    gtmId,
  });

  return `(function(C){
var KEYS=C.keys,COOKIE=C.cookie,MAX_AGE=C.maxAge,VALUE_MAX=C.valueMax,GTM_ID=C.gtmId;
function sanitize(raw){
  var t=String(raw==null?"":raw).trim();
  if(!t)return null;
  return t.length>VALUE_MAX?t.slice(0,VALUE_MAX):t;
}
function parseSearch(search){
  var params=new URLSearchParams(search),out={},found=false,i,k,clean;
  for(i=0;i<KEYS.length;i++){
    k=KEYS[i];
    var v=params.get(k);
    if(v==null)continue;
    clean=sanitize(v);
    if(!clean)continue;
    out[k]=clean;
    found=true;
  }
  return found?out:null;
}
function readCookie(){
  var parts=document.cookie.split(";"),i,c;
  for(i=0;i<parts.length;i++){
    c=parts[i].trim();
    if(c.indexOf(COOKIE+"=")==0){
      try{return JSON.parse(decodeURIComponent(c.slice(COOKIE.length+1)));}
      catch(e){return null;}
    }
  }
  return null;
}
function cookieDomain(host){
  host=host.toLowerCase();
  if(host==="peon.sh"||host.slice(-8)===".peon.sh")return ".peon.sh";
  return null;
}
function hasFields(payload){
  if(!payload)return false;
  var i;
  for(i=0;i<KEYS.length;i++){if(payload[KEYS[i]])return true;}
  return false;
}
function capture(){
  if(readCookie())return;
  var fromQuery=parseSearch(location.search);
  if(!fromQuery)return;
  fromQuery.landing_path=sanitize(location.pathname)||"/";
  fromQuery.captured_at=new Date().toISOString();
  var parts=[COOKIE+"="+encodeURIComponent(JSON.stringify(fromQuery)),"Path=/","Max-Age="+MAX_AGE,"SameSite=Lax"];
  if(location.protocol==="https:")parts.push("Secure");
  var domain=cookieDomain(location.hostname);
  if(domain)parts.push("Domain="+domain);
  document.cookie=parts.join("; ");
}
function withAttr(href){
  var source=readCookie()||parseSearch(location.search);
  if(!hasFields(source))return href;
  try{
    var url=new URL(href,location.origin),i,k;
    for(i=0;i<KEYS.length;i++){
      k=KEYS[i];
      if(source[k]&&!url.searchParams.has(k))url.searchParams.set(k,source[k]);
    }
    return /^https?:/i.test(href)?url.toString():url.pathname+url.search+url.hash;
  }catch(e){return href;}
}
function applyCtas(){
  document.querySelectorAll("a[data-peon-cta]").forEach(function(a){
    var next=withAttr(a.href);
    if(next!==a.href)a.href=next;
  });
}
function injectGtm(){
  if(!GTM_ID||document.getElementById("google-tag-manager"))return;
  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push({"gtm.start":Date.now(),event:"gtm.js"});
  var s=document.createElement("script");
  s.id="google-tag-manager";
  s.async=true;
  s.src="https://www.googletagmanager.com/gtm.js?id="+GTM_ID;
  document.head.appendChild(s);
}
capture();
applyCtas();
var gtmLoaded=false;
function loadGtm(){
  if(gtmLoaded)return;
  gtmLoaded=true;
  injectGtm();
}
if(GTM_ID){
  ["pointerdown","keydown","touchstart"].forEach(function(type){
    window.addEventListener(type,loadGtm,{once:true,passive:true});
  });
  setTimeout(loadGtm,15000);
}
})(${config});`;
}
