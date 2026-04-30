var Gt=Object.defineProperty;var Wt=(R,C,b)=>C in R?Gt(R,C,{enumerable:!0,configurable:!0,writable:!0,value:b}):R[C]=b;var Le=(R,C,b)=>Wt(R,typeof C!="symbol"?C+"":C,b);(function(R){"use strict";var C,b,Re,M,Fe,Me,Oe,fe,V,W,Pe,ue,_e,pe,J={},X=[],Tn=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Q=Array.isArray;function F(e,n){for(var t in n)e[t]=n[t];return e}function me(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function De(e,n,t){var r,i,o,l={};for(o in n)o=="key"?r=n[o]:o=="ref"?i=n[o]:l[o]=n[o];if(arguments.length>2&&(l.children=arguments.length>3?C.call(arguments,2):t),typeof e=="function"&&e.defaultProps!=null)for(o in e.defaultProps)l[o]===void 0&&(l[o]=e.defaultProps[o]);return Z(e,l,r,i,null)}function Z(e,n,t,r,i){var o={type:e,props:n,key:t,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++Re,__i:-1,__u:0};return i==null&&b.vnode!=null&&b.vnode(o),o}function D(e){return e.children}function ee(e,n){this.props=e,this.context=n}function N(e,n){if(n==null)return e.__?N(e.__,e.__i+1):null;for(var t;n<e.__k.length;n++)if((t=e.__k[n])!=null&&t.__e!=null)return t.__e;return typeof e.type=="function"?N(e):null}function Ln(e){if(e.__P&&e.__d){var n=e.__v,t=n.__e,r=[],i=[],o=F({},n);o.__v=n.__v+1,b.vnode&&b.vnode(o),he(e.__P,o,n,e.__n,e.__P.namespaceURI,32&n.__u?[t]:null,r,t??N(n),!!(32&n.__u),i),o.__v=n.__v,o.__.__k[o.__i]=o,je(r,o,i),n.__e=n.__=null,o.__e!=t&&Ne(o)}}function Ne(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(n){if(n!=null&&n.__e!=null)return e.__e=e.__c.base=n.__e}),Ne(e)}function Ie(e){(!e.__d&&(e.__d=!0)&&M.push(e)&&!ne.__r++||Fe!=b.debounceRendering)&&((Fe=b.debounceRendering)||Me)(ne)}function ne(){try{for(var e,n=1;M.length;)M.length>n&&M.sort(Oe),e=M.shift(),n=M.length,Ln(e)}finally{M.length=ne.__r=0}}function He(e,n,t,r,i,o,l,s,f,c,m){var a,_,u,v,h,p,g,y=r&&r.__k||X,S=n.length;for(f=Rn(t,n,y,f,S),a=0;a<S;a++)(u=t.__k[a])!=null&&(_=u.__i!=-1&&y[u.__i]||J,u.__i=a,p=he(e,u,_,i,o,l,s,f,c,m),v=u.__e,u.ref&&_.ref!=u.ref&&(_.ref&&be(_.ref,null,u),m.push(u.ref,u.__c||v,u)),h==null&&v!=null&&(h=v),(g=!!(4&u.__u))||_.__k===u.__k?(f=ze(u,f,e,g),g&&_.__e&&(_.__e=null)):typeof u.type=="function"&&p!==void 0?f=p:v&&(f=v.nextSibling),u.__u&=-7);return t.__e=h,f}function Rn(e,n,t,r,i){var o,l,s,f,c,m=t.length,a=m,_=0;for(e.__k=new Array(i),o=0;o<i;o++)(l=n[o])!=null&&typeof l!="boolean"&&typeof l!="function"?(typeof l=="string"||typeof l=="number"||typeof l=="bigint"||l.constructor==String?l=e.__k[o]=Z(null,l,null,null,null):Q(l)?l=e.__k[o]=Z(D,{children:l},null,null,null):l.constructor===void 0&&l.__b>0?l=e.__k[o]=Z(l.type,l.props,l.key,l.ref?l.ref:null,l.__v):e.__k[o]=l,f=o+_,l.__=e,l.__b=e.__b+1,s=null,(c=l.__i=Fn(l,t,f,a))!=-1&&(a--,(s=t[c])&&(s.__u|=2)),s==null||s.__v==null?(c==-1&&(i>m?_--:i<m&&_++),typeof l.type!="function"&&(l.__u|=4)):c!=f&&(c==f-1?_--:c==f+1?_++:(c>f?_--:_++,l.__u|=4))):e.__k[o]=null;if(a)for(o=0;o<m;o++)(s=t[o])!=null&&!(2&s.__u)&&(s.__e==r&&(r=N(s)),We(s,s));return r}function ze(e,n,t,r){var i,o;if(typeof e.type=="function"){for(i=e.__k,o=0;i&&o<i.length;o++)i[o]&&(i[o].__=e,n=ze(i[o],n,t,r));return n}e.__e!=n&&(r&&(n&&e.type&&!n.parentNode&&(n=N(e)),t.insertBefore(e.__e,n||null)),n=e.__e);do n=n&&n.nextSibling;while(n!=null&&n.nodeType==8);return n}function Fn(e,n,t,r){var i,o,l,s=e.key,f=e.type,c=n[t],m=c!=null&&(2&c.__u)==0;if(c===null&&s==null||m&&s==c.key&&f==c.type)return t;if(r>(m?1:0)){for(i=t-1,o=t+1;i>=0||o<n.length;)if((c=n[l=i>=0?i--:o++])!=null&&!(2&c.__u)&&s==c.key&&f==c.type)return l}return-1}function Ue(e,n,t){n[0]=="-"?e.setProperty(n,t??""):e[n]=t==null?"":typeof t!="number"||Tn.test(n)?t:t+"px"}function te(e,n,t,r,i){var o,l;e:if(n=="style")if(typeof t=="string")e.style.cssText=t;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(n in r)t&&n in t||Ue(e.style,n,"");if(t)for(n in t)r&&t[n]==r[n]||Ue(e.style,n,t[n])}else if(n[0]=="o"&&n[1]=="n")o=n!=(n=n.replace(Pe,"$1")),l=n.toLowerCase(),n=l in e||n=="onFocusOut"||n=="onFocusIn"?l.slice(2):n.slice(2),e.l||(e.l={}),e.l[n+o]=t,t?r?t[W]=r[W]:(t[W]=ue,e.addEventListener(n,o?pe:_e,o)):e.removeEventListener(n,o?pe:_e,o);else{if(i=="http://www.w3.org/2000/svg")n=n.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(n!="width"&&n!="height"&&n!="href"&&n!="list"&&n!="form"&&n!="tabIndex"&&n!="download"&&n!="rowSpan"&&n!="colSpan"&&n!="role"&&n!="popover"&&n in e)try{e[n]=t??"";break e}catch{}typeof t=="function"||(t==null||t===!1&&n[4]!="-"?e.removeAttribute(n):e.setAttribute(n,n=="popover"&&t==1?"":t))}}function Be(e){return function(n){if(this.l){var t=this.l[n.type+e];if(n[V]==null)n[V]=ue++;else if(n[V]<t[W])return;return t(b.event?b.event(n):n)}}}function he(e,n,t,r,i,o,l,s,f,c){var m,a,_,u,v,h,p,g,y,S,x,P,de,j,Te,L=n.type;if(n.constructor!==void 0)return null;128&t.__u&&(f=!!(32&t.__u),o=[s=n.__e=t.__e]),(m=b.__b)&&m(n);e:if(typeof L=="function")try{if(g=n.props,y=L.prototype&&L.prototype.render,S=(m=L.contextType)&&r[m.__c],x=m?S?S.props.value:m.__:r,t.__c?p=(a=n.__c=t.__c).__=a.__E:(y?n.__c=a=new L(g,x):(n.__c=a=new ee(g,x),a.constructor=L,a.render=On),S&&S.sub(a),a.state||(a.state={}),a.__n=r,_=a.__d=!0,a.__h=[],a._sb=[]),y&&a.__s==null&&(a.__s=a.state),y&&L.getDerivedStateFromProps!=null&&(a.__s==a.state&&(a.__s=F({},a.__s)),F(a.__s,L.getDerivedStateFromProps(g,a.__s))),u=a.props,v=a.state,a.__v=n,_)y&&L.getDerivedStateFromProps==null&&a.componentWillMount!=null&&a.componentWillMount(),y&&a.componentDidMount!=null&&a.__h.push(a.componentDidMount);else{if(y&&L.getDerivedStateFromProps==null&&g!==u&&a.componentWillReceiveProps!=null&&a.componentWillReceiveProps(g,x),n.__v==t.__v||!a.__e&&a.shouldComponentUpdate!=null&&a.shouldComponentUpdate(g,a.__s,x)===!1){n.__v!=t.__v&&(a.props=g,a.state=a.__s,a.__d=!1),n.__e=t.__e,n.__k=t.__k,n.__k.some(function(G){G&&(G.__=n)}),X.push.apply(a.__h,a._sb),a._sb=[],a.__h.length&&l.push(a);break e}a.componentWillUpdate!=null&&a.componentWillUpdate(g,a.__s,x),y&&a.componentDidUpdate!=null&&a.__h.push(function(){a.componentDidUpdate(u,v,h)})}if(a.context=x,a.props=g,a.__P=e,a.__e=!1,P=b.__r,de=0,y)a.state=a.__s,a.__d=!1,P&&P(n),m=a.render(a.props,a.state,a.context),X.push.apply(a.__h,a._sb),a._sb=[];else do a.__d=!1,P&&P(n),m=a.render(a.props,a.state,a.context),a.state=a.__s;while(a.__d&&++de<25);a.state=a.__s,a.getChildContext!=null&&(r=F(F({},r),a.getChildContext())),y&&!_&&a.getSnapshotBeforeUpdate!=null&&(h=a.getSnapshotBeforeUpdate(u,v)),j=m!=null&&m.type===D&&m.key==null?Ge(m.props.children):m,s=He(e,Q(j)?j:[j],n,t,r,i,o,l,s,f,c),a.base=n.__e,n.__u&=-161,a.__h.length&&l.push(a),p&&(a.__E=a.__=null)}catch(G){if(n.__v=null,f||o!=null)if(G.then){for(n.__u|=f?160:128;s&&s.nodeType==8&&s.nextSibling;)s=s.nextSibling;o[o.indexOf(s)]=null,n.__e=s}else{for(Te=o.length;Te--;)me(o[Te]);ge(n)}else n.__e=t.__e,n.__k=t.__k,G.then||ge(n);b.__e(G,n,t)}else o==null&&n.__v==t.__v?(n.__k=t.__k,n.__e=t.__e):s=n.__e=Mn(t.__e,n,t,r,i,o,l,f,c);return(m=b.diffed)&&m(n),128&n.__u?void 0:s}function ge(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(ge))}function je(e,n,t){for(var r=0;r<t.length;r++)be(t[r],t[++r],t[++r]);b.__c&&b.__c(n,e),e.some(function(i){try{e=i.__h,i.__h=[],e.some(function(o){o.call(i)})}catch(o){b.__e(o,i.__v)}})}function Ge(e){return typeof e!="object"||e==null||e.__b>0?e:Q(e)?e.map(Ge):F({},e)}function Mn(e,n,t,r,i,o,l,s,f){var c,m,a,_,u,v,h,p=t.props||J,g=n.props,y=n.type;if(y=="svg"?i="http://www.w3.org/2000/svg":y=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),o!=null){for(c=0;c<o.length;c++)if((u=o[c])&&"setAttribute"in u==!!y&&(y?u.localName==y:u.nodeType==3)){e=u,o[c]=null;break}}if(e==null){if(y==null)return document.createTextNode(g);e=document.createElementNS(i,y,g.is&&g),s&&(b.__m&&b.__m(n,o),s=!1),o=null}if(y==null)p===g||s&&e.data==g||(e.data=g);else{if(o=o&&C.call(e.childNodes),!s&&o!=null)for(p={},c=0;c<e.attributes.length;c++)p[(u=e.attributes[c]).name]=u.value;for(c in p)u=p[c],c=="dangerouslySetInnerHTML"?a=u:c=="children"||c in g||c=="value"&&"defaultValue"in g||c=="checked"&&"defaultChecked"in g||te(e,c,null,u,i);for(c in g)u=g[c],c=="children"?_=u:c=="dangerouslySetInnerHTML"?m=u:c=="value"?v=u:c=="checked"?h=u:s&&typeof u!="function"||p[c]===u||te(e,c,u,p[c],i);if(m)s||a&&(m.__html==a.__html||m.__html==e.innerHTML)||(e.innerHTML=m.__html),n.__k=[];else if(a&&(e.innerHTML=""),He(n.type=="template"?e.content:e,Q(_)?_:[_],n,t,r,y=="foreignObject"?"http://www.w3.org/1999/xhtml":i,o,l,o?o[0]:t.__k&&N(t,0),s,f),o!=null)for(c=o.length;c--;)me(o[c]);s||(c="value",y=="progress"&&v==null?e.removeAttribute("value"):v!=null&&(v!==e[c]||y=="progress"&&!v||y=="option"&&v!=p[c])&&te(e,c,v,p[c],i),c="checked",h!=null&&h!=e[c]&&te(e,c,h,p[c],i))}return e}function be(e,n,t){try{if(typeof e=="function"){var r=typeof e.__u=="function";r&&e.__u(),r&&n==null||(e.__u=e(n))}else e.current=n}catch(i){b.__e(i,t)}}function We(e,n,t){var r,i;if(b.unmount&&b.unmount(e),(r=e.ref)&&(r.current&&r.current!=e.__e||be(r,null,n)),(r=e.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(o){b.__e(o,n)}r.base=r.__P=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&We(r[i],n,t||typeof e.type!="function");t||me(e.__e),e.__c=e.__=e.__e=void 0}function On(e,n,t){return this.constructor(e,t)}function qe(e,n,t){var r,i,o,l;n==document&&(n=document.documentElement),b.__&&b.__(e,n),i=(r=!1)?null:n.__k,o=[],l=[],he(n,e=n.__k=De(D,null,[e]),i||J,J,n.namespaceURI,i?null:n.firstChild?C.call(n.childNodes):null,o,i?i.__e:n.firstChild,r,l),je(o,e,l)}C=X.slice,b={__e:function(e,n,t,r){for(var i,o,l;n=n.__;)if((i=n.__c)&&!i.__)try{if((o=i.constructor)&&o.getDerivedStateFromError!=null&&(i.setState(o.getDerivedStateFromError(e)),l=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(e,r||{}),l=i.__d),l)return i.__E=i}catch(s){e=s}throw e}},Re=0,ee.prototype.setState=function(e,n){var t;t=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=F({},this.state),typeof e=="function"&&(e=e(F({},t),this.props)),e&&F(t,e),e!=null&&this.__v&&(n&&this._sb.push(n),Ie(this))},ee.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),Ie(this))},ee.prototype.render=D,M=[],Me=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Oe=function(e,n){return e.__v.__b-n.__v.__b},ne.__r=0,fe=Math.random().toString(8),V="__d"+fe,W="__a"+fe,Pe=/(PointerCapture)$|Capture$/i,ue=0,_e=Be(!1),pe=Be(!0);const Ke="blakfy_a11y_prefs",Ye="blakfy_a11y_prefs",I="1.0.0",A={READY:"blakfy:a11y:ready",CHANGE:"blakfy:a11y:change",OPEN:"blakfy:a11y:open",CLOSE:"blakfy:a11y:close"},$={fontScale:100,contrast:"normal",focusRing:!1,linkUnderline:!1,motion:"auto",dyslexiaFont:!1,readingMode:!1},Pn=["tr","en","de","fr","es","it","ar","he","ru"],Dn=["ar","he"],Nn={locale:"en",theme:"auto",position:"bottom-left",font:"",debug:!1};function ye(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function In(e){return e===100||e===110||e===125?e:$.fontScale}function Hn(e){return e==="normal"||e==="high"?e:$.contrast}function q(e,n){return typeof e=="boolean"?e:n}function zn(e){return e==="auto"||e==="reduce"?e:$.motion}function Un(e){return typeof e=="string"&&Pn.includes(e)?e:"en"}function Bn(e){return e==="light"||e==="dark"||e==="auto"?e:"auto"}function jn(e){return e==="bottom-left"||e==="bottom-right"||e==="top-left"||e==="top-right"?e:"bottom-left"}function re(e,n){return typeof e=="string"?e:n}function Ve(e){return ye(e)?{fontScale:In(e.fontScale),contrast:Hn(e.contrast),focusRing:q(e.focusRing,$.focusRing),linkUnderline:q(e.linkUnderline,$.linkUnderline),motion:zn(e.motion),dyslexiaFont:q(e.dyslexiaFont,$.dyslexiaFont),readingMode:q(e.readingMode,$.readingMode)}:{...$}}function Gn(e){if(!ye(e))return null;const n=Ve(e.prefs),t=re(e.version,I),r=re(e.timestamp,new Date().toISOString()),i=re(e.locale,"en");return{prefs:n,version:t,timestamp:r,locale:i}}function Je(e){return ye(e)?{locale:Un(e.locale),theme:Bn(e.theme),position:jn(e.position),font:re(e.font,""),debug:q(e.debug,!1)}:{...Nn}}function O(e,n){if(!(typeof window>"u"))try{const t=new CustomEvent(e,{detail:n});window.dispatchEvent(t)}catch{}}function K(e,n){if(typeof window>"u")return()=>{};const t=r=>{n(r.detail)};return window.addEventListener(e,t),()=>{typeof window>"u"||window.removeEventListener(e,t)}}function oe(e){if(typeof document>"u")return;const n=document.documentElement;n&&(n.setAttribute("data-a11y-fontscale",String(e.fontScale)),n.setAttribute("data-a11y-contrast",e.contrast),n.setAttribute("data-a11y-focus",e.focusRing?"enhanced":"default"),n.setAttribute("data-a11y-links",e.linkUnderline?"underline":"default"),n.setAttribute("data-a11y-motion",e.motion),n.setAttribute("data-a11y-dyslexia",String(e.dyslexiaFont)),n.setAttribute("data-a11y-reading",String(e.readingMode)))}function ve(){if(typeof window>"u"||typeof window.matchMedia!="function")return{reducedMotion:!1,contrast:"normal",colorScheme:"no-preference"};let e=!1,n="normal",t="no-preference";try{e=window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{}try{window.matchMedia("(prefers-contrast: more)").matches?n="more":window.matchMedia("(prefers-contrast: less)").matches&&(n="less")}catch{}try{window.matchMedia("(prefers-color-scheme: dark)").matches?t="dark":window.matchMedia("(prefers-color-scheme: light)").matches&&(t="light")}catch{}return{reducedMotion:e,contrast:n,colorScheme:t}}function Wn(){if(typeof document>"u")return!1;const e=document.styleSheets;if(!e)return!1;for(let n=0;n<e.length;n++){const t=e[n];if(!t)continue;let r=null;try{r=t.cssRules??null}catch{continue}if(r)for(let i=0;i<r.length;i++){const o=r[i];if(!o||o.type!==1)continue;const l=o,s=l.selectorText??"";if(!qn(s))continue;const f=l.style;if(f&&(f.getPropertyPriority("color")==="important"||f.getPropertyPriority("background-color")==="important"||f.getPropertyPriority("background")==="important"))return!0}}return!1}function qn(e){const n=e.toLowerCase();return/(^|[\s,>+~])(body|a)([\s,:.\[#>+~]|$)/.test(n)}function Kn(e){if(typeof window>"u"||typeof window.matchMedia!="function")return()=>{};const n=["(prefers-reduced-motion: reduce)","(prefers-contrast: more)","(prefers-contrast: less)","(prefers-color-scheme: dark)","(prefers-color-scheme: light)"],t=[],r=()=>{e(ve())};for(const i of n)try{const o=window.matchMedia(i);typeof o.addEventListener=="function"?o.addEventListener("change",r):typeof o.addListener=="function"&&o.addListener(r),t.push(o)}catch{}return()=>{for(const i of t)try{typeof i.removeEventListener=="function"?i.removeEventListener("change",r):typeof i.removeListener=="function"&&i.removeListener(r)}catch{}}}const Xe="2.0.0-alpha.0",Qe=50,Yn=10,T={issues:[],startTime:typeof performance<"u"?performance.now():Date.now(),devPipeUrl:null,devPipeLastSent:[]};function Ze(){try{if(typeof process<"u"&&typeof process.env<"u"&&process.env.NODE_ENV&&process.env.NODE_ENV!=="production")return"verbose"}catch{}if(typeof window>"u"||typeof document>"u")return"silent";try{if(new URLSearchParams(window.location.search).get("a11y-debug")==="1")return"verbose"}catch{}try{const e=document.currentScript;if(e&&e.dataset&&e.dataset.debug==="true"||document.querySelector('script[data-debug="true"]'))return"verbose"}catch{}try{const e=window;if(e.__BLAKFY_A11Y__&&e.__BLAKFY_A11Y__.debug===!0)return"verbose"}catch{}return"silent"}function Vn(e){return e==="info"?"✓":e==="warn"?"⚠":"✗"}function en(e,n){if(typeof console>"u")return;const t=`[blakfy-a11y v${Xe}] ${Vn(e)} ${n}`;e==="error"&&typeof console.error=="function"?console.error(t):e==="warn"&&typeof console.warn=="function"?console.warn(t):typeof console.info=="function"?console.info(t):typeof console.log=="function"&&console.log(t)}function nn(e,n,t){const r=T.devPipeUrl;if(!r||Ze()!=="verbose"||typeof fetch!="function")return;const i=Date.now();if(T.devPipeLastSent=T.devPipeLastSent.filter(o=>i-o<1e3),!(T.devPipeLastSent.length>=Yn)){T.devPipeLastSent.push(i);try{const o=JSON.stringify({level:e,code:n,msg:t,timestamp:new Date(i).toISOString()});fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:o,keepalive:!0}).catch(()=>{})}catch{}}}function E(e,n,t,r){const i=Ze();if(e==="info"){i==="verbose"&&(en("info",t),nn("info",n,t));return}en(e,t);const o={level:e,code:n,timestamp:new Date().toISOString(),msg:t};T.issues.push(o),T.issues.length>Qe&&T.issues.splice(0,T.issues.length-Qe),nn(e,n,t)}function Jn(e){T.devPipeUrl=e}function Xn(e){const n=ve();return{version:Xe,locale:e.config.locale,theme:e.config.theme,storage:{version:e.storage.version,migratedFrom:e.storage.migratedFrom,keysFound:[...e.storage.keysFound]},osPreferences:{reducedMotion:n.reducedMotion,contrast:n.contrast,colorScheme:n.colorScheme},performance:{mountTimeMs:e.performance.mountTimeMs,bundleSizeGz:e.performance.bundleSizeGz,timeToFirstClick:e.performance.timeToFirstClick},issues:T.issues.map(t=>({level:t.level,code:t.code,timestamp:t.timestamp,msg:t.msg})),config:{...e.config},timestamp:new Date().toISOString()}}function ke(){return typeof window<"u"}function tn(){return typeof document<"u"}function Qn(e,n,t){if(!tn())return;const r=new Date;r.setTime(r.getTime()+t*864e5);const i=ke()&&window.location&&window.location.protocol==="https:",o=[`${e}=${encodeURIComponent(n)}`,`expires=${r.toUTCString()}`,"path=/","SameSite=Lax"];i&&o.push("Secure"),document.cookie=o.join(";")}function Zn(e){if(!tn())return null;const n=(document.cookie||"").match(new RegExp(`(^| )${e}=([^;]+)`));if(!n||typeof n[2]!="string")return null;try{return decodeURIComponent(n[2])}catch{return null}}function et(e){if(!ke())return null;try{return window.localStorage.getItem(e)}catch{return null}}function nt(e,n){if(ke())try{window.localStorage.setItem(e,n)}catch{}}function tt(e){if(e==null)return null;try{return JSON.parse(e)}catch{return null}}function rt(e){return e.version===I?{record:e,migrated:!1,migratedFrom:null}:{record:{prefs:{...$,...e.prefs},version:I,timestamp:new Date().toISOString(),locale:e.locale||"en"},migrated:!0,migratedFrom:e.version}}function rn(){const e=[],n=et(Ke);n!=null&&e.push("localStorage");const t=Zn(Ye);t!=null&&e.push("cookie");let r=null,i=null;if(n!=null?(r=n,i="localStorage"):t!=null&&(r=t,i="cookie"),r==null)return{source:null,record:null,migrated:!1,migratedFrom:null,keysFound:e};const o=tt(r);if(o==null)return E("error","STORAGE_PARSE_ERROR",`Failed to parse stored preferences from ${i}`),{source:i,record:null,migrated:!1,migratedFrom:null,keysFound:e};const l=Gn(o);if(!l)return E("error","STORAGE_PARSE_ERROR",`Stored preferences in ${i} did not match schema`),{source:i,record:null,migrated:!1,migratedFrom:null,keysFound:e};const{record:s,migrated:f,migratedFrom:c}=rt(l);return f&&E("info","STORAGE_MIGRATED",`Storage migrated: ${c??"unknown"} → ${I}`),{source:i,record:s,migrated:f,migratedFrom:c,keysFound:e}}function ot(e){const n=JSON.stringify(e);nt(Ke,n),Qn(Ye,n,365)}function ie(){const e=rn();return e.record?{...$,...e.record.prefs}:{...$}}function we(e,n="en"){const t=ie(),r=Ve({...t,...e}),i={prefs:r,version:I,timestamp:new Date().toISOString(),locale:n};return ot(i),oe(r),O(A.CHANGE,i),i}function on(e="en"){return we({...$},e)}function it(){const e=rn();return{version:e.record?.version??I,migratedFrom:e.migratedFrom,keysFound:e.keysFound}}const at={label:"Accessibility preferences"},st={title:"Accessibility Preferences",description:"Adjust your viewing preferences. This panel offers personal preference controls in addition to the site's structural accessibility.",reset:"Reset",close:"Close",disclaimer:"This panel provides user preference controls; structural accessibility is built into the site itself.",theme:{label:"Display Theme",auto:"Auto",light:"Light",dark:"Dark"},branding:"Powered by Blakfy Studio",preferences:{fontScale:{title:"Font Size",description:"Increase or decrease text size.",values:{100:"Normal",110:"Large",125:"Extra Large"}},contrast:{title:"High Contrast",description:"Black background + yellow links (AAA 7:1)."},focusRing:{title:"Enhanced Focus Ring",description:"Show keyboard focus with a prominent 4px blue ring."},linkUnderline:{title:"Underline Links",description:"Add underline to all links."},motion:{title:"Reduce Motion",description:"Disable animations and transitions."},dyslexiaFont:{title:"Dyslexia-Friendly Font",description:"Use the OpenDyslexic font family.",note:"Some readers prefer this; research has not shown universal benefit."},readingMode:{title:"Reading Mode",description:"Hide sidebars and distracting areas."}}},H={fab:at,panel:st},xe=new Map;xe.set("en",H);function lt(e){if(!e||typeof e!="object")return!1;const n=e,t=n.fab,r=n.panel;return!(!t||typeof t.label!="string"||!r||typeof r.title!="string")}async function an(e,n){const t=xe.get(e);if(t)return t;if(typeof fetch!="function")return E("warn","LOCALE_FETCH_FAILED",`fetch unavailable, using en fallback for ${e}`),H;const r=`${(n||"").replace(/\/$/,"")}/locales/${e}.json`;try{const i=await fetch(r);if(!i.ok)return E("warn","LOCALE_FETCH_FAILED",`Locale fetch failed (${i.status}): ${r}`),H;const o=await i.json();return lt(o)?(xe.set(e,o),o):(E("warn","LOCALE_FETCH_FAILED",`Locale ${e} payload missing required fields`),H)}catch(i){const o=i instanceof Error?i.message:String(i);return E("warn","LOCALE_FETCH_FAILED",`Locale fetch threw for ${e}: ${o}`),H}}function sn(){return H}var ct=0;function d(e,n,t,r,i,o){n||(n={});var l,s,f=n;if("ref"in f)for(s in f={},n)s=="ref"?l=n[s]:f[s]=n[s];var c={type:e,props:f,key:t,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--ct,__i:-1,__u:0,__source:i,__self:o};if(typeof e=="function"&&(l=e.defaultProps))for(s in l)f[s]===void 0&&(f[s]=l[s]);return b.vnode&&b.vnode(c),c}var z,k,Se,ln,ae=0,cn=[],w=b,dn=w.__b,fn=w.__r,un=w.diffed,_n=w.__c,pn=w.unmount,mn=w.__;function se(e,n){w.__h&&w.__h(k,e,ae||n),ae=0;var t=k.__H||(k.__H={__:[],__h:[]});return e>=t.__.length&&t.__.push({}),t.__[e]}function Ee(e){return ae=1,dt(yn,e)}function dt(e,n,t){var r=se(z++,2);if(r.t=e,!r.__c&&(r.__=[yn(void 0,n),function(s){var f=r.__N?r.__N[0]:r.__[0],c=r.t(f,s);f!==c&&(r.__N=[c,r.__[1]],r.__c.setState({}))}],r.__c=k,!k.__f)){var i=function(s,f,c){if(!r.__c.__H)return!0;var m=r.__c.__H.__.filter(function(_){return _.__c});if(m.every(function(_){return!_.__N}))return!o||o.call(this,s,f,c);var a=r.__c.props!==s;return m.some(function(_){if(_.__N){var u=_.__[0];_.__=_.__N,_.__N=void 0,u!==_.__[0]&&(a=!0)}}),o&&o.call(this,s,f,c)||a};k.__f=!0;var o=k.shouldComponentUpdate,l=k.componentWillUpdate;k.componentWillUpdate=function(s,f,c){if(this.__e){var m=o;o=void 0,i(s,f,c),o=m}l&&l.call(this,s,f,c)},k.shouldComponentUpdate=i}return r.__N||r.__}function U(e,n){var t=se(z++,3);!w.__s&&bn(t.__H,n)&&(t.__=e,t.u=n,k.__H.__h.push(t))}function le(e){return ae=5,ft(function(){return{current:e}},[])}function ft(e,n){var t=se(z++,7);return bn(t.__H,n)&&(t.__=e(),t.__H=n,t.__h=e),t.__}function hn(){var e=se(z++,11);if(!e.__){for(var n=k.__v;n!==null&&!n.__m&&n.__!==null;)n=n.__;var t=n.__m||(n.__m=[0,0]);e.__="P"+t[0]+"-"+t[1]++}return e.__}function ut(){for(var e;e=cn.shift();){var n=e.__H;if(e.__P&&n)try{n.__h.some(ce),n.__h.some(Ae),n.__h=[]}catch(t){n.__h=[],w.__e(t,e.__v)}}}w.__b=function(e){k=null,dn&&dn(e)},w.__=function(e,n){e&&n.__k&&n.__k.__m&&(e.__m=n.__k.__m),mn&&mn(e,n)},w.__r=function(e){fn&&fn(e),z=0;var n=(k=e.__c).__H;n&&(Se===k?(n.__h=[],k.__h=[],n.__.some(function(t){t.__N&&(t.__=t.__N),t.u=t.__N=void 0})):(n.__h.some(ce),n.__h.some(Ae),n.__h=[],z=0)),Se=k},w.diffed=function(e){un&&un(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(cn.push(n)!==1&&ln===w.requestAnimationFrame||((ln=w.requestAnimationFrame)||_t)(ut)),n.__H.__.some(function(t){t.u&&(t.__H=t.u),t.u=void 0})),Se=k=null},w.__c=function(e,n){n.some(function(t){try{t.__h.some(ce),t.__h=t.__h.filter(function(r){return!r.__||Ae(r)})}catch(r){n.some(function(i){i.__h&&(i.__h=[])}),n=[],w.__e(r,t.__v)}}),_n&&_n(e,n)},w.unmount=function(e){pn&&pn(e);var n,t=e.__c;t&&t.__H&&(t.__H.__.some(function(r){try{ce(r)}catch(i){n=i}}),t.__H=void 0,n&&w.__e(n,t.__v))};var gn=typeof requestAnimationFrame=="function";function _t(e){var n,t=function(){clearTimeout(r),gn&&cancelAnimationFrame(n),setTimeout(e)},r=setTimeout(t,35);gn&&(n=requestAnimationFrame(t))}function ce(e){var n=k,t=e.__c;typeof t=="function"&&(e.__c=void 0,t()),k=n}function Ae(e){var n=k;e.__c=e.__(),k=n}function bn(e,n){return!e||e.length!==n.length||n.some(function(t,r){return t!==e[r]})}function yn(e,n){return typeof n=="function"?n(e):n}function pt(e){return d("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:[d("circle",{cx:"12",cy:"4",r:"2"}),d("path",{d:"M12 6v8"}),d("path",{d:"M5 9h14"}),d("path",{d:"M9 14l-2 7"}),d("path",{d:"M15 14l2 7"})]})}function mt(e){return d("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",...e,children:[d("circle",{cx:"12",cy:"3",r:"2"}),d("path",{d:"M19 8.5c0 .55-.45 1-1 1h-4v3l3 7c.16.4-.04.86-.45 1l-1.42.5c-.4.16-.86-.04-1-.45L11.5 14h-1l-2.65 6.55c-.16.4-.6.6-1 .45l-1.42-.5c-.4-.16-.6-.6-.45-1l3-7v-3H6c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v1z"})]})}function ht(e){return d("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:[d("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),d("circle",{cx:"12",cy:"12",r:"3"})]})}function gt(e){return d("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:d("path",{d:"M5 5l10 10M15 5L5 15"})})}function bt(e){return d("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:[d("path",{d:"M12 2L2 7l10 5 10-5-10-5z"}),d("path",{d:"M2 17l10 5 10-5"}),d("path",{d:"M2 12l10 5 10-5"})]})}function yt({name:e}){return e==="walking"?d(pt,{}):e==="eye"?d(ht,{}):d(mt,{})}function vt({iconStyle:e,ariaLabel:n,isOpen:t,onClick:r}){return d("button",{type:"button",class:"fab","aria-haspopup":"dialog","aria-expanded":t,"aria-label":n,title:n,onClick:r,children:d(yt,{name:e})})}const kt='button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [role="switch"]:not([aria-disabled="true"])';function wt(e=document){let n=e.activeElement;for(;n;){const t=n.shadowRoot;if(!t||!t.activeElement)break;n=t.activeElement}return n}function vn(e){if(!e)return[];const n=e.querySelectorAll(kt);return Array.from(n).filter(t=>{if(t.hasAttribute("disabled"))return!1;const r=t.getAttribute("tabindex");return r&&Number(r)<0?!1:t.offsetParent!==null||t.getClientRects().length>0})}function xt({open:e,onClose:n,titleId:t,descriptionId:r,children:i}){const o=le(null),l=le(null),s=le(n);return s.current=n,U(()=>{if(!e||typeof document>"u")return;const c=document.documentElement,m=c.style.overflow;return c.style.overflow="hidden",()=>{c.style.overflow=m}},[e]),U(()=>{if(!e||typeof document>"u")return;l.current=wt(document);const c=window.setTimeout(()=>{(vn(o.current)[0]??o.current)?.focus()},0),m=a=>{if(a.key==="Escape"){a.preventDefault(),s.current();return}if(a.key!=="Tab")return;const _=vn(o.current);if(_.length===0){a.preventDefault(),o.current?.focus();return}const u=_[0],v=_[_.length-1];if(!u||!v)return;const h=o.current?.getRootNode(),p=h&&"activeElement"in h?h.activeElement:document.activeElement;a.shiftKey?(p===u||!o.current?.contains(p))&&(a.preventDefault(),v.focus()):p===v&&(a.preventDefault(),u.focus())};return document.addEventListener("keydown",m),()=>{window.clearTimeout(c),document.removeEventListener("keydown",m);const a=l.current;a&&a instanceof HTMLElement&&a.focus()}},[e]),e?d("div",{class:"backdrop",onClick:c=>{c.target===c.currentTarget&&n()},children:d("div",{ref:o,class:"dialog",role:"dialog","aria-modal":"true","aria-labelledby":t,"aria-describedby":r,tabIndex:-1,children:i})}):null}function St({checked:e,onChange:n,ariaLabel:t,ariaLabelledBy:r,ariaDescribedBy:i,disabled:o=!1}){return d("button",{type:"button",class:"switch",role:"switch","aria-checked":e,"aria-label":r?void 0:t,"aria-labelledby":r,"aria-describedby":i,"aria-disabled":o||void 0,tabIndex:o?-1:0,onClick:()=>{o||n(!e)},onKeyDown:f=>{o||(f.key===" "||f.key==="Enter"||f.key==="Spacebar")&&(f.preventDefault(),n(!e))},children:d("span",{class:"switch-thumb","aria-hidden":"true"})})}function B({title:e,description:n,note:t,checked:r,onChange:i}){const o=hn(),l=`${o}-title`,s=`${o}-desc`;return d("div",{class:"toggle-row",children:[d("div",{class:"toggle-text",children:[d("p",{class:"toggle-title",id:l,children:e}),d("p",{class:"toggle-desc",id:s,children:n}),t?d("p",{class:"toggle-note",children:t}):null]}),d(St,{checked:r,onChange:i,ariaLabel:e,ariaLabelledBy:l,ariaDescribedBy:s})]})}const Et=[100,110,125],At=["auto","light","dark"];function Ct({translation:e,locale:n,currentTheme:t,onClose:r,onThemeChange:i,titleId:o,descriptionId:l}){const s=e.panel,[f,c]=Ee(()=>ie()),[m,a]=Ee(!1),_=le(null);U(()=>K(A.CHANGE,p=>{c(p.prefs)}),[]),U(()=>()=>{_.current&&clearTimeout(_.current)},[]);const u=(p,g)=>{const y={...f,[p]:g};c(y),we({[p]:g},n),oe(y)},v=()=>{if(!m){a(!0),_.current&&clearTimeout(_.current),_.current=setTimeout(()=>a(!1),3e3);return}_.current&&clearTimeout(_.current),a(!1);const p=on(n);c(p.prefs),oe(p.prefs)},h=p=>p==="auto"?s.theme.auto:p==="light"?s.theme.light:s.theme.dark;return d(D,{children:[d("h2",{class:"panel-title",id:o,children:s.title}),d("p",{class:"panel-desc",id:l,children:s.description}),d("button",{type:"button",class:"dialog-close","aria-label":s.close,onClick:r,children:d(gt,{})}),d("fieldset",{class:"prefs",children:[d("legend",{class:"sr-only",children:s.title}),d("div",{class:"section",role:"radiogroup","aria-label":s.preferences.fontScale.title,children:[d("p",{class:"toggle-title",children:s.preferences.fontScale.title}),d("p",{class:"toggle-desc",children:s.preferences.fontScale.description}),d("div",{class:"scale-buttons",children:Et.map(p=>{const g=String(p);return d("button",{type:"button",class:"scale-btn","aria-pressed":f.fontScale===p,onClick:()=>u("fontScale",p),children:s.preferences.fontScale.values[g]},p)})})]}),d(B,{title:s.preferences.contrast.title,description:s.preferences.contrast.description,checked:f.contrast==="high",onChange:p=>u("contrast",p?"high":"normal")}),d(B,{title:s.preferences.focusRing.title,description:s.preferences.focusRing.description,checked:f.focusRing,onChange:p=>u("focusRing",p)}),d(B,{title:s.preferences.linkUnderline.title,description:s.preferences.linkUnderline.description,checked:f.linkUnderline,onChange:p=>u("linkUnderline",p)}),d(B,{title:s.preferences.motion.title,description:s.preferences.motion.description,checked:f.motion==="reduce",onChange:p=>u("motion",p?"reduce":"auto")}),d(B,{title:s.preferences.dyslexiaFont.title,description:s.preferences.dyslexiaFont.description,note:s.preferences.dyslexiaFont.note,checked:f.dyslexiaFont,onChange:p=>u("dyslexiaFont",p)}),d(B,{title:s.preferences.readingMode.title,description:s.preferences.readingMode.description,checked:f.readingMode,onChange:p=>u("readingMode",p)})]}),d("div",{class:"theme-switcher",role:"group","aria-label":s.theme.label,children:[d("p",{class:"theme-switcher-label",children:s.theme.label}),d("div",{class:"theme-buttons",children:At.map(p=>d("button",{type:"button",class:"theme-btn","aria-pressed":t===p,onClick:()=>i(p),children:h(p)},p))})]}),d("div",{class:"sr-only",role:"status","aria-live":"polite",children:m?`${s.reset}?`:""}),d("div",{class:"footer",children:[d("button",{type:"button",class:"btn btn-secondary",onClick:v,"aria-pressed":m,"data-confirm":m?"true":void 0,children:m?`${s.reset}?`:s.reset}),d("button",{type:"button",class:"btn btn-primary",onClick:r,children:s.close})]}),d("p",{class:"disclaimer",children:s.disclaimer}),d("a",{class:"panel-branding",href:"https://blakfy.com",target:"_blank",rel:"noopener noreferrer","aria-label":"Blakfy Studio — blakfy.com",children:[d("span",{class:"panel-branding-badge","aria-hidden":"true",children:"B"}),d("span",{class:"panel-branding-text",children:[d("span",{class:"panel-branding-powered",children:"Powered by"}),d("span",{class:"panel-branding-name",children:"Blakfy Studio"})]}),d("svg",{class:"panel-branding-arrow","aria-hidden":"true",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:d("path",{d:"M2.5 6h7M7 3.5l2.5 2.5L7 8.5",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})})]})]})}const $t="https://blakfy.com";function Tt(){return d("a",{class:"badge",href:$t,target:"_blank",rel:"noopener noreferrer","aria-label":"Powered by Blakfy Studio — opens blakfy.com in a new tab",children:[d(bt,{}),d("span",{children:["Powered by ",d("strong",{children:"Blakfy Studio"})]})]})}function Lt({config:e,translation:n,iconStyle:t="access",keyboardShortcut:r=!0,onThemeChange:i}){const[o,l]=Ee(!1),s=hn(),f=`${s}-title`,c=`${s}-desc`;U(()=>{const _=K(A.OPEN,()=>l(!0)),u=K(A.CLOSE,()=>l(!1));return()=>{_(),u()}},[]),U(()=>{if(!r||typeof window>"u")return;const _=u=>{u.altKey&&u.key==="0"&&(u.preventDefault(),l(v=>v?(O(A.CLOSE,{}),!1):(O(A.OPEN,{}),!0)))};return window.addEventListener("keydown",_),()=>{window.removeEventListener("keydown",_)}},[r]);const m=()=>{l(!0),O(A.OPEN,{})},a=()=>{l(!1),O(A.CLOSE,{})};return d(D,{children:[d(vt,{iconStyle:t,ariaLabel:n.fab.label,isOpen:o,onClick:m}),d(xt,{open:o,onClose:a,titleId:f,descriptionId:c,children:d(Ct,{translation:n,locale:e.locale,currentTheme:e.theme,onClose:a,onThemeChange:i??(()=>{}),titleId:f,descriptionId:c})}),d(Tt,{})]})}const Rt=`/*
 * @blakfy/accessibility-widget — Shadow DOM stylesheet
 * Inlined into the Shadow root via <style>. See ADR-003.
 *
 * 15 CSS custom properties from STABLE-API.md §4 are LOCKED — never rename.
 * No \`left:\` / \`right:\` — use \`inset-inline-*\` for RTL safety.
 * No \`!important\` outside of the prefers-reduced-motion override.
 */

/* ==========================================================================
 * 1. Custom property defaults (15 locked variables)
 * ========================================================================== */
:host {
  /* Color — light theme defaults */
  --blakfy-a11y-primary: #2563eb;
  --blakfy-a11y-primary-hover: #1d4ed8;
  --blakfy-a11y-primary-text: #ffffff;
  --blakfy-a11y-panel-bg: #ffffff;
  --blakfy-a11y-panel-text: #171717;
  --blakfy-a11y-panel-muted: #525252;
  --blakfy-a11y-panel-border: #e5e5e5;

  /* Color — dark theme overrides (resolved via :host([data-theme="dark"])) */
  --blakfy-a11y-panel-bg-dark: #0a0a0a;
  --blakfy-a11y-panel-text-dark: #fafafa;
  --blakfy-a11y-panel-muted-dark: #a3a3a3;
  --blakfy-a11y-panel-border-dark: #262626;

  /* Switch */
  --blakfy-a11y-toggle-on: #171717;
  --blakfy-a11y-toggle-off: #d4d4d4;

  /* Focus */
  --blakfy-a11y-focus-ring: #2563eb;

  /* Sizes */
  --blakfy-a11y-fab-size: 48px;

  /* Internal aliases — point to active mode (NOT locked, prefixed with __) */
  --__bg: var(--blakfy-a11y-panel-bg);
  --__text: var(--blakfy-a11y-panel-text);
  --__muted: var(--blakfy-a11y-panel-muted);
  --__border: var(--blakfy-a11y-panel-border);
}

/* ==========================================================================
 * 2. Theme switch — dark mode overrides
 * ========================================================================== */
:host([data-theme="dark"]) {
  --__bg: var(--blakfy-a11y-panel-bg-dark);
  --__text: var(--blakfy-a11y-panel-text-dark);
  --__muted: var(--blakfy-a11y-panel-muted-dark);
  --__border: var(--blakfy-a11y-panel-border-dark);

  /* Brighter blue so FAB + focus rings are visible on dark surfaces */
  --blakfy-a11y-primary: #60a5fa;
  --blakfy-a11y-primary-hover: #93c5fd;
  --blakfy-a11y-focus-ring: #60a5fa;

  /* Toggle: use blue-500 for ON (clearly visible on near-black bg),
     medium gray for OFF — color-blind-safe: luminance contrast, not hue alone */
  --blakfy-a11y-toggle-on: #3b82f6;
  --blakfy-a11y-toggle-off: #4b5563;
}

/* ==========================================================================
 * 3. Reset (Shadow-local — does NOT leak to host)
 * ========================================================================== */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ==========================================================================
 * 4. Host container
 * ========================================================================== */
:host {
  all: initial;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  line-height: 1.4;
  color: var(--__text);
}

button,
a {
  font-family: inherit;
  color: inherit;
}

button {
  background: transparent;
  border: 0;
  cursor: pointer;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ==========================================================================
 * 5. FAB button
 * ========================================================================== */
.fab {
  position: fixed;
  inset-block-end: 1rem;
  inset-inline-start: 1rem;
  width: var(--blakfy-a11y-fab-size);
  height: var(--blakfy-a11y-fab-size);
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: var(--blakfy-a11y-primary);
  color: var(--blakfy-a11y-primary-text);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.15);
  transition: background-color 200ms ease, transform 200ms ease;
  z-index: 9998;
}

.fab:hover {
  background: var(--blakfy-a11y-primary-hover);
  transform: scale(1.06);
}

.fab:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
  outline-offset: 3px;
}

/* Position variants */
:host([data-position="bottom-right"]) .fab {
  inset-block-end: 1rem;
  inset-inline-start: auto;
  inset-inline-end: 1rem;
}

:host([data-position="top-left"]) .fab {
  inset-block-end: auto;
  inset-block-start: 1rem;
  inset-inline-start: 1rem;
}

:host([data-position="top-right"]) .fab {
  inset-block-end: auto;
  inset-block-start: 1rem;
  inset-inline-start: auto;
  inset-inline-end: 1rem;
}

.fab svg {
  width: 24px;
  height: 24px;
}

/* ==========================================================================
 * 6. Floating badge (locked per STABLE-API.md §9)
 *
 * Contrast budget (WCAG 2.2 AA — must pass 4.5:1 for normal text):
 *   light: #525252 (panel-muted) on #ffffff = 7.46:1 raw
 *   dark : #a3a3a3 (panel-muted-dark) on #0a0a0a = 8.18:1 raw
 *   At opacity 0.85 the perceived luminance still clears 4.5:1 in both
 *   themes (light ≈ 5.94:1, dark ≈ 6.32:1). Hover lifts to opacity 1.0.
 *   The previous opacity 0.7 default produced ~3.64:1 (AA fail). Per
 *   STABLE-API §9 only impl details are tunable — URL/text/position
 *   stay locked.
 * ========================================================================== */
.badge {
  position: fixed;
  inset-block-end: 0.75rem;
  inset-inline-end: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.5rem;
  font-size: clamp(9px, 1.5vw, 11px);
  font-weight: 500;
  text-decoration: none;
  color: var(--__muted);
  opacity: 0.85;
  transition: opacity 200ms ease, color 200ms ease;
  z-index: 9997;
  pointer-events: auto;
}

.badge:hover,
.badge:focus-visible {
  opacity: 1;
  color: var(--__text);
}

.badge:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
  outline-offset: 2px;
  border-radius: 4px;
}

.badge strong {
  font-weight: 700;
}

.badge svg {
  width: 12px;
  height: 12px;
}

/* ==========================================================================
 * 7. Dialog modal
 * ========================================================================== */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 9999;
  animation: blakfy-fade-in 200ms ease forwards;
}

.backdrop[data-state="closing"] {
  animation: blakfy-fade-out 180ms ease forwards;
}

.dialog {
  position: fixed;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  transform: translate(-50%, -50%);
  width: min(560px, calc(100% - 1rem));
  max-width: min(560px, calc(100% - 1rem));
  max-height: 90vh;
  overflow-y: auto;
  background: var(--__bg);
  color: var(--__text);
  border-radius: 0.5rem;
  padding: 1rem;
  z-index: 10000;
  scrollbar-gutter: stable;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  animation: blakfy-zoom-in 200ms ease forwards;
}

.dialog[data-state="closing"] {
  animation: blakfy-zoom-out 180ms ease forwards;
}

.dialog:focus {
  outline: none;
}

.panel-title {
  font-size: clamp(14px, 3vw, 18px);
  font-weight: 600;
  line-height: 1.2;
  color: var(--__text);
  padding-inline-end: 2rem;
}

.panel-desc {
  margin-block-start: 0.5rem;
  font-size: clamp(11px, 2vw, 14px);
  line-height: 1.5;
  color: var(--__muted);
}

.dialog-close {
  position: absolute;
  inset-block-start: 0.75rem;
  inset-inline-end: 0.75rem;
  width: 32px;
  height: 32px;
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: var(--__muted);
  transition: background-color 150ms ease, color 150ms ease;
}

.dialog-close:hover {
  background: var(--__border);
  color: var(--__text);
}

.dialog-close:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
  outline-offset: 2px;
}

.dialog-close svg {
  width: 18px;
  height: 18px;
}

/* ==========================================================================
 * 8. Switch (ARIA APG)
 * ========================================================================== */
.switch {
  position: relative;
  flex-shrink: 0;
  inline-size: 44px;
  block-size: 24px;
  border-radius: 9999px;
  background: var(--blakfy-a11y-toggle-off);
  transition: background-color 200ms ease;
  /* Hit area extension: parent row gives 44×44 via padding */
}

.switch[aria-checked="true"] {
  background: var(--blakfy-a11y-toggle-on);
}

.switch:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
  outline-offset: 2px;
}

.switch::before {
  /* visual extension to satisfy 44×44 hit target without affecting layout */
  content: "";
  position: absolute;
  inset: -10px;
}

.switch-thumb {
  position: absolute;
  inset-block-start: 2px;
  inset-inline-start: 2px;
  inline-size: 20px;
  block-size: 20px;
  border-radius: 9999px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  transition: transform 200ms ease;
}

.switch[aria-checked="true"] .switch-thumb {
  transform: translateX(20px);
}

[dir="rtl"] .switch[aria-checked="true"] .switch-thumb {
  transform: translateX(-20px);
}

/* ==========================================================================
 * 9. Toggle row + fieldset
 * ========================================================================== */
.prefs {
  border: 0;
  padding: 0;
  margin-block-start: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.section {
  border: 1px solid var(--__border);
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.toggle-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  border: 1px solid var(--__border);
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.toggle-text {
  flex: 1;
  min-width: 0;
}

.toggle-title {
  font-size: clamp(11px, 2.2vw, 14px);
  font-weight: 600;
  line-height: 1.25;
  color: var(--__text);
}

.toggle-desc {
  margin-block-start: 0.25rem;
  font-size: clamp(10px, 1.8vw, 12px);
  line-height: 1.45;
  color: var(--__muted);
}

.toggle-note {
  margin-block-start: 0.25rem;
  font-size: clamp(9px, 1.5vw, 11px);
  font-style: italic;
  line-height: 1.4;
  color: #b45309;
}

:host([data-theme="dark"]) .toggle-note {
  color: #fbbf24;
}

/* Font scale (radiogroup of buttons) */
.scale-buttons {
  margin-block-start: 0.625rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.scale-btn {
  min-block-size: 44px;
  padding-inline: 0.875rem;
  font-size: clamp(11px, 2.2vw, 14px);
  font-weight: 500;
  border: 1px solid var(--__border);
  border-radius: 0.5rem;
  color: var(--__text);
  white-space: nowrap;
  transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease;
}

.scale-btn:hover {
  background: var(--__border);
}

.scale-btn[aria-pressed="true"] {
  background: var(--blakfy-a11y-toggle-on);
  color: var(--blakfy-a11y-panel-bg);
  border-color: var(--blakfy-a11y-toggle-on);
}

:host([data-theme="dark"]) .scale-btn[aria-pressed="true"] {
  background: var(--blakfy-a11y-toggle-on);
  color: #ffffff;
  border-color: var(--blakfy-a11y-toggle-on);
}

.scale-btn:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
  outline-offset: 2px;
}

/* ==========================================================================
 * 10. Footer buttons (Reset, Close)
 * ========================================================================== */
.footer {
  margin-block-start: 1.25rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 0.5rem;
}

.btn {
  min-block-size: 44px;
  padding-inline: 1rem;
  font-size: clamp(11px, 2.2vw, 14px);
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  white-space: nowrap;
  transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
}

.btn:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
  outline-offset: 2px;
}

.btn-secondary {
  border-color: var(--__border);
  color: var(--__text);
}

.btn-secondary:hover {
  background: var(--__border);
}

.btn-primary {
  background: var(--blakfy-a11y-toggle-on);
  color: var(--blakfy-a11y-panel-bg);
  font-weight: 600;
}

.btn-primary:hover {
  opacity: 0.9;
}

:host([data-theme="dark"]) .btn-primary {
  background: var(--blakfy-a11y-toggle-on);
  color: #ffffff;
}

/* ==========================================================================
 * 11. Reset confirm state
 * ========================================================================== */
.btn-secondary[data-confirm="true"] {
  background: #dc2626;
  border-color: #dc2626;
  color: #ffffff;
}

.btn-secondary[data-confirm="true"]:hover {
  background: #b91c1c;
}

/* ==========================================================================
 * 12. Theme switcher
 * ========================================================================== */
.theme-switcher {
  margin-block-start: 1rem;
  padding-block-start: 0.75rem;
  border-block-start: 1px solid var(--__border);
}

.theme-switcher-label {
  font-size: clamp(11px, 2.2vw, 14px);
  font-weight: 600;
  color: var(--__text);
  margin-block-end: 0.5rem;
}

.theme-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.theme-btn {
  min-block-size: 36px;
  padding-inline: 0.875rem;
  font-size: clamp(10px, 1.8vw, 13px);
  font-weight: 500;
  border: 1px solid var(--__border);
  border-radius: 0.5rem;
  color: var(--__text);
  transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease;
}

.theme-btn:hover {
  background: var(--__border);
}

.theme-btn[aria-pressed="true"] {
  background: var(--blakfy-a11y-toggle-on);
  color: var(--blakfy-a11y-panel-bg);
  border-color: var(--blakfy-a11y-toggle-on);
}

:host([data-theme="dark"]) .theme-btn[aria-pressed="true"] {
  background: var(--blakfy-a11y-toggle-on);
  color: #ffffff;
  border-color: var(--blakfy-a11y-toggle-on);
}

:host([data-theme="dark"]) .panel-branding {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(139, 92, 246, 0.12));
  border-color: rgba(59, 130, 246, 0.3);
}

:host([data-theme="dark"]) .panel-branding:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.22), rgba(139, 92, 246, 0.22));
  border-color: rgba(59, 130, 246, 0.55);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.22);
}

.theme-btn:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
  outline-offset: 2px;
}

/* ==========================================================================
 * 13. Disclaimer + badge area
 * ========================================================================== */
.disclaimer {
  margin-block-start: 1rem;
  padding-block-start: 0.75rem;
  border-block-start: 1px solid var(--__border);
  font-size: clamp(9px, 1.5vw, 11px);
  font-style: italic;
  line-height: 1.45;
  color: var(--__muted);
}

.panel-branding {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin-block-start: 0.875rem;
  padding: 0.625rem 0.875rem;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(124, 58, 237, 0.08));
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  transition: background 150ms ease, border-color 150ms ease, transform 120ms ease, box-shadow 150ms ease;
}

.panel-branding:hover {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(124, 58, 237, 0.15));
  border-color: rgba(37, 99, 235, 0.45);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.18);
}

.panel-branding:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
  outline-offset: 2px;
  border-radius: 10px;
}

.panel-branding-badge {
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 800;
  font-size: 15px;
  flex-shrink: 0;
  letter-spacing: -0.5px;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.35);
}

.panel-branding-text {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1px;
}

.panel-branding-powered {
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--__muted);
  line-height: 1.2;
}

.panel-branding-name {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--__text);
  line-height: 1.3;
}

.panel-branding-arrow {
  width: 14px;
  height: 14px;
  color: var(--__muted);
  flex-shrink: 0;
  opacity: 0.55;
  transition: opacity 150ms ease, color 150ms ease, transform 150ms ease;
}

.panel-branding:hover .panel-branding-arrow {
  opacity: 1;
  color: var(--blakfy-a11y-primary);
  transform: translateX(2px);
}

/* ==========================================================================
 * 14. Animations
 * ========================================================================== */
@keyframes blakfy-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes blakfy-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes blakfy-zoom-in {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.96); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

@keyframes blakfy-zoom-out {
  from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  to { opacity: 0; transform: translate(-50%, -50%) scale(0.96); }
}

/* ==========================================================================
 * 15. Reduced motion (override is the only allowed !important per docs)
 * ========================================================================== */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

/* ==========================================================================
 * 16. Responsive (≤480px)
 * ========================================================================== */
@media (max-width: 480px) {
  .fab {
    --blakfy-a11y-fab-size: 44px;
  }

  .footer {
    flex-direction: column;
  }

  .footer .btn {
    inline-size: 100%;
  }

  .scale-buttons {
    flex-direction: column;
  }

  .scale-btn {
    inline-size: 100%;
  }
}

/* ==========================================================================
 * 17. Forced colors / Windows High Contrast
 * ========================================================================== */
@media (forced-colors: active) {
  .fab,
  .btn,
  .scale-btn,
  .switch {
    border: 1px solid CanvasText;
    forced-color-adjust: none;
  }

  .switch[aria-checked="true"] {
    background: Highlight;
  }

  .switch-thumb {
    background: HighlightText;
  }
}
`,Ft="2.0.0-alpha.0";function Mt(e){const n={open:()=>O(A.OPEN,{}),close:()=>O(A.CLOSE,{}),getPreferences:()=>ie(),setPreferences:t=>{we(t,e.config.locale)},reset:()=>{on(e.config.locale)},onChange:t=>K(A.CHANGE,r=>t(r.prefs)),configure:t=>e.configure(t),diagnostics:()=>Xn({config:e.config,performance:{mountTimeMs:e.mountTimeMs,bundleSizeGz:e.bundleSizeGz,timeToFirstClick:null},storage:e.storage}),version:Ft};return typeof window<"u"&&(window.BlakfyA11y&&typeof window.BlakfyA11y=="object"?Object.assign(window.BlakfyA11y,n):window.BlakfyA11y=n),n}const kn="blakfy-a11y-root",Ce="2.0.0-alpha.0";function Ot(){if(typeof document>"u")return{};let e=null;const n=document.currentScript;if(n&&n.dataset)e=n;else{const i=document.querySelectorAll("script[src]");for(let o=0;o<i.length;o++){const l=i[o];if(l&&l.src&&/accessibility[-_]widget|blakfy/i.test(l.src)){e=l;break}}}if(!e)return{};const t=e.dataset,r={};return t.locale&&(r.locale=t.locale),t.theme&&(r.theme=t.theme),t.position&&(r.position=t.position),t.font&&(r.font=t.font),t.debug&&(r.debug=t.debug==="true"),t.devPipe&&(r.devPipe=t.devPipe),t.version&&(r.version=t.version),r}function Pt(){if(typeof document>"u")return!0;const e=document.querySelectorAll("link[href]");for(let n=0;n<e.length;n++){const t=e[n];if(t&&t.href&&/open[-_]?dyslexic/i.test(t.href))return!0}return!1}function Dt(e){if(typeof document>"u")return{mismatched:!1,fields:[]};const n=document.documentElement;if(!n)return{mismatched:!1,fields:[]};const t={"data-a11y-fontscale":String(e.fontScale),"data-a11y-contrast":e.contrast,"data-a11y-focus":e.focusRing?"enhanced":"default","data-a11y-links":e.linkUnderline?"underline":"default","data-a11y-motion":e.motion,"data-a11y-dyslexia":String(e.dyslexiaFont),"data-a11y-reading":String(e.readingMode)},r=[];let i=!1;for(const o of Object.keys(t)){if(!n.hasAttribute(o))continue;i=!0,n.getAttribute(o)!==t[o]&&r.push(o)}return{mismatched:i&&r.length>0,fields:r}}function wn(e){try{const n=new URL(e);return n.origin+n.pathname.replace(/\/[^/]*$/,"")}catch{return""}}const xn=typeof document<"u"?wn(document.currentScript?.src??""):"";function Sn(){if(typeof document>"u")return"";if(xn)return xn;const e=document.querySelectorAll("script[src]");for(let n=0;n<e.length;n++){const t=e[n];if(t&&t.src&&/accessibility[-_]widget|blakfy|widget\.js$/i.test(t.src)){const r=wn(t.src);if(r)return r}}return""}function Nt(e){return Dn.includes(e)}function It(e){if(e==="dark")return"dark";if(e==="light")return"light";if(typeof document<"u"){const n=document.documentElement,t=n.getAttribute("data-theme");if(t==="dark")return"dark";if(t==="light")return"light";if(n.getAttribute("data-color-mode")==="dark"||n.classList.contains("dark"))return"dark";if(n.classList.contains("light"))return"light"}if(typeof window>"u"||typeof window.matchMedia!="function")return"light";try{return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function Ht(e){if(typeof MutationObserver>"u"||typeof document>"u")return()=>{};const n=new MutationObserver(e);return n.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-mode"]}),()=>n.disconnect()}function Y(e,n){e.setAttribute("data-position",n.position),e.setAttribute("data-theme",It(n.theme)),e.setAttribute("dir",Nt(n.locale)?"rtl":"ltr"),n.font&&e.style.setProperty("font-family",n.font)}function zt(e){const n=document.createElement("style");n.textContent=Rt,e.appendChild(n)}function Ut(){const e=document.querySelector(kn);if(e&&e instanceof HTMLElement)return e;const n=document.createElement(kn);return document.body.appendChild(n),n}function $e(e={}){const n=typeof performance<"u"?performance.now():Date.now();if(typeof document>"u")return{unmount:()=>{}};const t=Ot(),r=typeof window<"u"?window.__BLAKFY_A11Y__??{}:{};let o=Je({...t,...r,...e});const l=ie(),s=Dt(l);s.mismatched&&E("error","SSR_HYDRATION_MISMATCH",`SSR-rendered prefs differ from client storage: ${s.fields.join(", ")}`),oe(l),t.version&&t.version!==Ce&&E("error","CDN_VERSION_MISMATCH",`Expected version ${t.version} but runtime is ${Ce} — clear your CDN cache.`),l.dyslexiaFont&&!Pt()&&E("warn","OPENDYSLEXIC_CDN_MISSING","dyslexiaFont=true but no OpenDyslexic CDN <link> found — system fallback active."),Wn()&&E("warn","HOST_CSS_IMPORTANT_CONFLICT","Host stylesheet uses !important on body/a — visual prefs may not apply.");const f=ve();f.reducedMotion&&E("info","OS_PREFERS_REDUCED_MOTION","OS prefers-reduced-motion=reduce detected."),f.contrast==="more"&&E("info","OS_PREFERS_CONTRAST_MORE","OS prefers-contrast=more detected."),f.colorScheme==="dark"&&E("info","OS_PREFERS_COLOR_SCHEME_DARK","OS prefers-color-scheme=dark detected.");const c=Kn(()=>{h.config.theme==="auto"&&(Y(h.host,h.config),h.rerender())}),m=Ht(()=>{h.config.theme==="auto"&&(Y(h.host,h.config),h.rerender())});t.devPipe&&Jn(t.devPipe);let a=null;if(typeof r.onPreferencesChange=="function"){const S=r.onPreferencesChange;a=K(A.CHANGE,x=>{try{S(x)}catch{}})}const _=Ut(),u=_.shadowRoot??_.attachShadow({mode:"open"});for(;u.firstChild;)u.removeChild(u.firstChild);zt(u),Y(_,o);let v=sn();const h={config:o,translation:v,shadowRoot:u,host:_,rerender:()=>{qe(De(Lt,{config:h.config,translation:h.translation,onThemeChange:S=>{h.config={...h.config,theme:S},Y(_,h.config),h.rerender()}}),u)}};if(h.rerender(),o.locale!=="en"){const S=Sn();an(o.locale,S).then(x=>{v=x,h.translation=x,h.rerender()})}const p=it(),g=(typeof performance<"u"?performance.now():Date.now())-n;return Mt({config:o,mountTimeMs:g,bundleSizeGz:0,storage:p,configure:S=>{const x=Je({...h.config,...S}),P=x.locale!==h.config.locale;if(h.config=x,Y(_,x),P)if(x.locale==="en")h.translation=sn(),h.rerender();else{const de=Sn();an(x.locale,de).then(j=>{h.translation=j,h.rerender()})}else h.rerender()}}),E("info","INITIALIZED",`Widget mounted in ${g.toFixed(1)}ms`),O(A.READY,{version:Ce}),{unmount:()=>{c(),m(),a&&a(),qe(null,u),_.parentNode&&_.parentNode.removeChild(_)}}}const En="blakfy-a11y";class An extends HTMLElement{constructor(){super(...arguments);Le(this,"_unmount",null)}connectedCallback(){if(this._unmount)return;const t=this._readAttributes(),r=$e(t);this._unmount=r.unmount}disconnectedCallback(){this._unmount&&(this._unmount(),this._unmount=null)}attributeChangedCallback(t,r,i){if(r===i||!this._unmount||typeof window>"u"||!window.BlakfyA11y)return;const o=this._readAttributes();window.BlakfyA11y.configure(o)}_readAttributes(){const t={},r=this.getAttribute("locale");r&&(t.locale=r);const i=this.getAttribute("theme");i&&(t.theme=i);const o=this.getAttribute("position");o&&(t.position=o);const l=this.getAttribute("font");l&&(t.font=l);const s=this.getAttribute("debug");return s!=null&&(t.debug=s==="true"),t}}Le(An,"observedAttributes",["locale","theme","position","font","debug"]);function Cn(){typeof customElements>"u"||customElements.get(En)||customElements.define(En,An)}const Bt="blakfy-a11y-root",jt="blakfy-a11y";function $n(){typeof document>"u"||document.querySelector(Bt)||document.querySelector(jt)||$e()}Cn(),typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",$n,{once:!0}):$n()),R.defineCustomElement=Cn,R.mount=$e,Object.defineProperty(R,Symbol.toStringTag,{value:"Module"})})(this.BlakfyA11y=this.BlakfyA11y||{});
//# sourceMappingURL=widget.js.map
