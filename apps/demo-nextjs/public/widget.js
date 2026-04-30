var Kt=Object.defineProperty;var Yt=(O,R,g)=>R in O?Kt(O,R,{enumerable:!0,configurable:!0,writable:!0,value:g}):O[R]=g;var Le=(O,R,g)=>Yt(O,typeof R!="symbol"?R+"":R,g);(function(O){"use strict";var R,g,Re,D,Fe,Me,Oe,_e,Q,K,Pe,pe,me,he,Z={},ee=[],Tn=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,ne=Array.isArray;function P(e,n){for(var t in n)e[t]=n[t];return e}function ge(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function De(e,n,t){var r,i,o,l={};for(o in n)o=="key"?r=n[o]:o=="ref"?i=n[o]:l[o]=n[o];if(arguments.length>2&&(l.children=arguments.length>3?R.call(arguments,2):t),typeof e=="function"&&e.defaultProps!=null)for(o in e.defaultProps)l[o]===void 0&&(l[o]=e.defaultProps[o]);return te(e,l,r,i,null)}function te(e,n,t,r,i){var o={type:e,props:n,key:t,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++Re,__i:-1,__u:0};return i==null&&g.vnode!=null&&g.vnode(o),o}function z(e){return e.children}function re(e,n){this.props=e,this.context=n}function H(e,n){if(n==null)return e.__?H(e.__,e.__i+1):null;for(var t;n<e.__k.length;n++)if((t=e.__k[n])!=null&&t.__e!=null)return t.__e;return typeof e.type=="function"?H(e):null}function Ln(e){if(e.__P&&e.__d){var n=e.__v,t=n.__e,r=[],i=[],o=P({},n);o.__v=n.__v+1,g.vnode&&g.vnode(o),be(e.__P,o,n,e.__n,e.__P.namespaceURI,32&n.__u?[t]:null,r,t??H(n),!!(32&n.__u),i),o.__v=n.__v,o.__.__k[o.__i]=o,je(r,o,i),n.__e=n.__=null,o.__e!=t&&Ne(o)}}function Ne(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(n){if(n!=null&&n.__e!=null)return e.__e=e.__c.base=n.__e}),Ne(e)}function Ie(e){(!e.__d&&(e.__d=!0)&&D.push(e)&&!oe.__r++||Fe!=g.debounceRendering)&&((Fe=g.debounceRendering)||Me)(oe)}function oe(){try{for(var e,n=1;D.length;)D.length>n&&D.sort(Oe),e=D.shift(),n=D.length,Ln(e)}finally{D.length=oe.__r=0}}function ze(e,n,t,r,i,o,l,s,f,c,m){var a,u,_,v,h,b,y,k=r&&r.__k||ee,C=n.length;for(f=Rn(t,n,k,f,C),a=0;a<C;a++)(_=t.__k[a])!=null&&(u=_.__i!=-1&&k[_.__i]||Z,_.__i=a,b=be(e,_,u,i,o,l,s,f,c,m),v=_.__e,_.ref&&u.ref!=_.ref&&(u.ref&&ve(u.ref,null,_),m.push(_.ref,_.__c||v,_)),h==null&&v!=null&&(h=v),(y=!!(4&_.__u))||u.__k===_.__k?(f=He(_,f,e,y),y&&u.__e&&(u.__e=null)):typeof _.type=="function"&&b!==void 0?f=b:v&&(f=v.nextSibling),_.__u&=-7);return t.__e=h,f}function Rn(e,n,t,r,i){var o,l,s,f,c,m=t.length,a=m,u=0;for(e.__k=new Array(i),o=0;o<i;o++)(l=n[o])!=null&&typeof l!="boolean"&&typeof l!="function"?(typeof l=="string"||typeof l=="number"||typeof l=="bigint"||l.constructor==String?l=e.__k[o]=te(null,l,null,null,null):ne(l)?l=e.__k[o]=te(z,{children:l},null,null,null):l.constructor===void 0&&l.__b>0?l=e.__k[o]=te(l.type,l.props,l.key,l.ref?l.ref:null,l.__v):e.__k[o]=l,f=o+u,l.__=e,l.__b=e.__b+1,s=null,(c=l.__i=Fn(l,t,f,a))!=-1&&(a--,(s=t[c])&&(s.__u|=2)),s==null||s.__v==null?(c==-1&&(i>m?u--:i<m&&u++),typeof l.type!="function"&&(l.__u|=4)):c!=f&&(c==f-1?u--:c==f+1?u++:(c>f?u--:u++,l.__u|=4))):e.__k[o]=null;if(a)for(o=0;o<m;o++)(s=t[o])!=null&&!(2&s.__u)&&(s.__e==r&&(r=H(s)),We(s,s));return r}function He(e,n,t,r){var i,o;if(typeof e.type=="function"){for(i=e.__k,o=0;i&&o<i.length;o++)i[o]&&(i[o].__=e,n=He(i[o],n,t,r));return n}e.__e!=n&&(r&&(n&&e.type&&!n.parentNode&&(n=H(e)),t.insertBefore(e.__e,n||null)),n=e.__e);do n=n&&n.nextSibling;while(n!=null&&n.nodeType==8);return n}function Fn(e,n,t,r){var i,o,l,s=e.key,f=e.type,c=n[t],m=c!=null&&(2&c.__u)==0;if(c===null&&s==null||m&&s==c.key&&f==c.type)return t;if(r>(m?1:0)){for(i=t-1,o=t+1;i>=0||o<n.length;)if((c=n[l=i>=0?i--:o++])!=null&&!(2&c.__u)&&s==c.key&&f==c.type)return l}return-1}function Ue(e,n,t){n[0]=="-"?e.setProperty(n,t??""):e[n]=t==null?"":typeof t!="number"||Tn.test(n)?t:t+"px"}function ie(e,n,t,r,i){var o,l;e:if(n=="style")if(typeof t=="string")e.style.cssText=t;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(n in r)t&&n in t||Ue(e.style,n,"");if(t)for(n in t)r&&t[n]==r[n]||Ue(e.style,n,t[n])}else if(n[0]=="o"&&n[1]=="n")o=n!=(n=n.replace(Pe,"$1")),l=n.toLowerCase(),n=l in e||n=="onFocusOut"||n=="onFocusIn"?l.slice(2):n.slice(2),e.l||(e.l={}),e.l[n+o]=t,t?r?t[K]=r[K]:(t[K]=pe,e.addEventListener(n,o?he:me,o)):e.removeEventListener(n,o?he:me,o);else{if(i=="http://www.w3.org/2000/svg")n=n.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(n!="width"&&n!="height"&&n!="href"&&n!="list"&&n!="form"&&n!="tabIndex"&&n!="download"&&n!="rowSpan"&&n!="colSpan"&&n!="role"&&n!="popover"&&n in e)try{e[n]=t??"";break e}catch{}typeof t=="function"||(t==null||t===!1&&n[4]!="-"?e.removeAttribute(n):e.setAttribute(n,n=="popover"&&t==1?"":t))}}function Be(e){return function(n){if(this.l){var t=this.l[n.type+e];if(n[Q]==null)n[Q]=pe++;else if(n[Q]<t[K])return;return t(g.event?g.event(n):n)}}}function be(e,n,t,r,i,o,l,s,f,c){var m,a,u,_,v,h,b,y,k,C,w,p,S,E,I,T=n.type;if(n.constructor!==void 0)return null;128&t.__u&&(f=!!(32&t.__u),o=[s=n.__e=t.__e]),(m=g.__b)&&m(n);e:if(typeof T=="function")try{if(y=n.props,k=T.prototype&&T.prototype.render,C=(m=T.contextType)&&r[m.__c],w=m?C?C.props.value:m.__:r,t.__c?b=(a=n.__c=t.__c).__=a.__E:(k?n.__c=a=new T(y,w):(n.__c=a=new re(y,w),a.constructor=T,a.render=On),C&&C.sub(a),a.state||(a.state={}),a.__n=r,u=a.__d=!0,a.__h=[],a._sb=[]),k&&a.__s==null&&(a.__s=a.state),k&&T.getDerivedStateFromProps!=null&&(a.__s==a.state&&(a.__s=P({},a.__s)),P(a.__s,T.getDerivedStateFromProps(y,a.__s))),_=a.props,v=a.state,a.__v=n,u)k&&T.getDerivedStateFromProps==null&&a.componentWillMount!=null&&a.componentWillMount(),k&&a.componentDidMount!=null&&a.__h.push(a.componentDidMount);else{if(k&&T.getDerivedStateFromProps==null&&y!==_&&a.componentWillReceiveProps!=null&&a.componentWillReceiveProps(y,w),n.__v==t.__v||!a.__e&&a.shouldComponentUpdate!=null&&a.shouldComponentUpdate(y,a.__s,w)===!1){n.__v!=t.__v&&(a.props=y,a.state=a.__s,a.__d=!1),n.__e=t.__e,n.__k=t.__k,n.__k.some(function(q){q&&(q.__=n)}),ee.push.apply(a.__h,a._sb),a._sb=[],a.__h.length&&l.push(a);break e}a.componentWillUpdate!=null&&a.componentWillUpdate(y,a.__s,w),k&&a.componentDidUpdate!=null&&a.__h.push(function(){a.componentDidUpdate(_,v,h)})}if(a.context=w,a.props=y,a.__P=e,a.__e=!1,p=g.__r,S=0,k)a.state=a.__s,a.__d=!1,p&&p(n),m=a.render(a.props,a.state,a.context),ee.push.apply(a.__h,a._sb),a._sb=[];else do a.__d=!1,p&&p(n),m=a.render(a.props,a.state,a.context),a.state=a.__s;while(a.__d&&++S<25);a.state=a.__s,a.getChildContext!=null&&(r=P(P({},r),a.getChildContext())),k&&!u&&a.getSnapshotBeforeUpdate!=null&&(h=a.getSnapshotBeforeUpdate(_,v)),E=m!=null&&m.type===z&&m.key==null?Ge(m.props.children):m,s=ze(e,ne(E)?E:[E],n,t,r,i,o,l,s,f,c),a.base=n.__e,n.__u&=-161,a.__h.length&&l.push(a),b&&(a.__E=a.__=null)}catch(q){if(n.__v=null,f||o!=null)if(q.then){for(n.__u|=f?160:128;s&&s.nodeType==8&&s.nextSibling;)s=s.nextSibling;o[o.indexOf(s)]=null,n.__e=s}else{for(I=o.length;I--;)ge(o[I]);ye(n)}else n.__e=t.__e,n.__k=t.__k,q.then||ye(n);g.__e(q,n,t)}else o==null&&n.__v==t.__v?(n.__k=t.__k,n.__e=t.__e):s=n.__e=Mn(t.__e,n,t,r,i,o,l,f,c);return(m=g.diffed)&&m(n),128&n.__u?void 0:s}function ye(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(ye))}function je(e,n,t){for(var r=0;r<t.length;r++)ve(t[r],t[++r],t[++r]);g.__c&&g.__c(n,e),e.some(function(i){try{e=i.__h,i.__h=[],e.some(function(o){o.call(i)})}catch(o){g.__e(o,i.__v)}})}function Ge(e){return typeof e!="object"||e==null||e.__b>0?e:ne(e)?e.map(Ge):P({},e)}function Mn(e,n,t,r,i,o,l,s,f){var c,m,a,u,_,v,h,b=t.props||Z,y=n.props,k=n.type;if(k=="svg"?i="http://www.w3.org/2000/svg":k=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),o!=null){for(c=0;c<o.length;c++)if((_=o[c])&&"setAttribute"in _==!!k&&(k?_.localName==k:_.nodeType==3)){e=_,o[c]=null;break}}if(e==null){if(k==null)return document.createTextNode(y);e=document.createElementNS(i,k,y.is&&y),s&&(g.__m&&g.__m(n,o),s=!1),o=null}if(k==null)b===y||s&&e.data==y||(e.data=y);else{if(o=o&&R.call(e.childNodes),!s&&o!=null)for(b={},c=0;c<e.attributes.length;c++)b[(_=e.attributes[c]).name]=_.value;for(c in b)_=b[c],c=="dangerouslySetInnerHTML"?a=_:c=="children"||c in y||c=="value"&&"defaultValue"in y||c=="checked"&&"defaultChecked"in y||ie(e,c,null,_,i);for(c in y)_=y[c],c=="children"?u=_:c=="dangerouslySetInnerHTML"?m=_:c=="value"?v=_:c=="checked"?h=_:s&&typeof _!="function"||b[c]===_||ie(e,c,_,b[c],i);if(m)s||a&&(m.__html==a.__html||m.__html==e.innerHTML)||(e.innerHTML=m.__html),n.__k=[];else if(a&&(e.innerHTML=""),ze(n.type=="template"?e.content:e,ne(u)?u:[u],n,t,r,k=="foreignObject"?"http://www.w3.org/1999/xhtml":i,o,l,o?o[0]:t.__k&&H(t,0),s,f),o!=null)for(c=o.length;c--;)ge(o[c]);s||(c="value",k=="progress"&&v==null?e.removeAttribute("value"):v!=null&&(v!==e[c]||k=="progress"&&!v||k=="option"&&v!=b[c])&&ie(e,c,v,b[c],i),c="checked",h!=null&&h!=e[c]&&ie(e,c,h,b[c],i))}return e}function ve(e,n,t){try{if(typeof e=="function"){var r=typeof e.__u=="function";r&&e.__u(),r&&n==null||(e.__u=e(n))}else e.current=n}catch(i){g.__e(i,t)}}function We(e,n,t){var r,i;if(g.unmount&&g.unmount(e),(r=e.ref)&&(r.current&&r.current!=e.__e||ve(r,null,n)),(r=e.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(o){g.__e(o,n)}r.base=r.__P=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&We(r[i],n,t||typeof e.type!="function");t||ge(e.__e),e.__c=e.__=e.__e=void 0}function On(e,n,t){return this.constructor(e,t)}function qe(e,n,t){var r,i,o,l;n==document&&(n=document.documentElement),g.__&&g.__(e,n),i=(r=!1)?null:n.__k,o=[],l=[],be(n,e=n.__k=De(z,null,[e]),i||Z,Z,n.namespaceURI,i?null:n.firstChild?R.call(n.childNodes):null,o,i?i.__e:n.firstChild,r,l),je(o,e,l)}R=ee.slice,g={__e:function(e,n,t,r){for(var i,o,l;n=n.__;)if((i=n.__c)&&!i.__)try{if((o=i.constructor)&&o.getDerivedStateFromError!=null&&(i.setState(o.getDerivedStateFromError(e)),l=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(e,r||{}),l=i.__d),l)return i.__E=i}catch(s){e=s}throw e}},Re=0,re.prototype.setState=function(e,n){var t;t=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=P({},this.state),typeof e=="function"&&(e=e(P({},t),this.props)),e&&P(t,e),e!=null&&this.__v&&(n&&this._sb.push(n),Ie(this))},re.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),Ie(this))},re.prototype.render=z,D=[],Me=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Oe=function(e,n){return e.__v.__b-n.__v.__b},oe.__r=0,_e=Math.random().toString(8),Q="__d"+_e,K="__a"+_e,Pe=/(PointerCapture)$|Capture$/i,pe=0,me=Be(!1),he=Be(!0);const Ke="blakfy_a11y_prefs",Ye="blakfy_a11y_prefs",U="1.0.0",L={READY:"blakfy:a11y:ready",CHANGE:"blakfy:a11y:change",OPEN:"blakfy:a11y:open",CLOSE:"blakfy:a11y:close"},F={fontScale:100,contrast:"normal",focusRing:!1,linkUnderline:!1,motion:"auto",dyslexiaFont:!1,readingMode:!1},Pn=["tr","en","de","fr","es","it","ar","he","ru"],Dn=["ar","he"],Nn={locale:"en",theme:"auto",position:"bottom-left",font:"",debug:!1};function ke(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function In(e){return e===100||e===110||e===125?e:F.fontScale}function zn(e){return e==="normal"||e==="high"?e:F.contrast}function Y(e,n){return typeof e=="boolean"?e:n}function Hn(e){return e==="auto"||e==="reduce"?e:F.motion}function Un(e){return typeof e=="string"&&Pn.includes(e)?e:"en"}function Bn(e){return e==="light"||e==="dark"||e==="auto"?e:"auto"}function jn(e){return e==="bottom-left"||e==="bottom-right"||e==="top-left"||e==="top-right"?e:"bottom-left"}function ae(e,n){return typeof e=="string"?e:n}function Ve(e){return ke(e)?{fontScale:In(e.fontScale),contrast:zn(e.contrast),focusRing:Y(e.focusRing,F.focusRing),linkUnderline:Y(e.linkUnderline,F.linkUnderline),motion:Hn(e.motion),dyslexiaFont:Y(e.dyslexiaFont,F.dyslexiaFont),readingMode:Y(e.readingMode,F.readingMode)}:{...F}}function Gn(e){if(!ke(e))return null;const n=Ve(e.prefs),t=ae(e.version,U),r=ae(e.timestamp,new Date().toISOString()),i=ae(e.locale,"en");return{prefs:n,version:t,timestamp:r,locale:i}}function Je(e){return ke(e)?{locale:Un(e.locale),theme:Bn(e.theme),position:jn(e.position),font:ae(e.font,""),debug:Y(e.debug,!1)}:{...Nn}}function N(e,n){if(!(typeof window>"u"))try{const t=new CustomEvent(e,{detail:n});window.dispatchEvent(t)}catch{}}function V(e,n){if(typeof window>"u")return()=>{};const t=r=>{n(r.detail)};return window.addEventListener(e,t),()=>{typeof window>"u"||window.removeEventListener(e,t)}}function se(e){if(typeof document>"u")return;const n=document.documentElement;n&&(n.setAttribute("data-a11y-fontscale",String(e.fontScale)),n.setAttribute("data-a11y-contrast",e.contrast),n.setAttribute("data-a11y-focus",e.focusRing?"enhanced":"default"),n.setAttribute("data-a11y-links",e.linkUnderline?"underline":"default"),n.setAttribute("data-a11y-motion",e.motion),n.setAttribute("data-a11y-dyslexia",String(e.dyslexiaFont)),n.setAttribute("data-a11y-reading",String(e.readingMode)))}function we(){if(typeof window>"u"||typeof window.matchMedia!="function")return{reducedMotion:!1,contrast:"normal",colorScheme:"no-preference"};let e=!1,n="normal",t="no-preference";try{e=window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{}try{window.matchMedia("(prefers-contrast: more)").matches?n="more":window.matchMedia("(prefers-contrast: less)").matches&&(n="less")}catch{}try{window.matchMedia("(prefers-color-scheme: dark)").matches?t="dark":window.matchMedia("(prefers-color-scheme: light)").matches&&(t="light")}catch{}return{reducedMotion:e,contrast:n,colorScheme:t}}function Wn(){if(typeof document>"u")return!1;const e=document.styleSheets;if(!e)return!1;for(let n=0;n<e.length;n++){const t=e[n];if(!t)continue;let r=null;try{r=t.cssRules??null}catch{continue}if(r)for(let i=0;i<r.length;i++){const o=r[i];if(!o||o.type!==1)continue;const l=o,s=l.selectorText??"";if(!qn(s))continue;const f=l.style;if(f&&(f.getPropertyPriority("color")==="important"||f.getPropertyPriority("background-color")==="important"||f.getPropertyPriority("background")==="important"))return!0}}return!1}function qn(e){const n=e.toLowerCase();return/(^|[\s,>+~])(body|a)([\s,:.\[#>+~]|$)/.test(n)}function Kn(e){if(typeof window>"u"||typeof window.matchMedia!="function")return()=>{};const n=["(prefers-reduced-motion: reduce)","(prefers-contrast: more)","(prefers-contrast: less)","(prefers-color-scheme: dark)","(prefers-color-scheme: light)"],t=[],r=()=>{e(we())};for(const i of n)try{const o=window.matchMedia(i);typeof o.addEventListener=="function"?o.addEventListener("change",r):typeof o.addListener=="function"&&o.addListener(r),t.push(o)}catch{}return()=>{for(const i of t)try{typeof i.removeEventListener=="function"?i.removeEventListener("change",r):typeof i.removeListener=="function"&&i.removeListener(r)}catch{}}}const Xe="2.0.0-alpha.0",Qe=50,Yn=10,M={issues:[],startTime:typeof performance<"u"?performance.now():Date.now(),devPipeUrl:null,devPipeLastSent:[]};function Ze(){try{if(typeof process<"u"&&typeof process.env<"u"&&process.env.NODE_ENV&&process.env.NODE_ENV!=="production")return"verbose"}catch{}if(typeof window>"u"||typeof document>"u")return"silent";try{if(new URLSearchParams(window.location.search).get("a11y-debug")==="1")return"verbose"}catch{}try{const e=document.currentScript;if(e&&e.dataset&&e.dataset.debug==="true"||document.querySelector('script[data-debug="true"]'))return"verbose"}catch{}try{const e=window;if(e.__BLAKFY_A11Y__&&e.__BLAKFY_A11Y__.debug===!0)return"verbose"}catch{}return"silent"}function Vn(e){return e==="info"?"✓":e==="warn"?"⚠":"✗"}function en(e,n){if(typeof console>"u")return;const t=`[blakfy-a11y v${Xe}] ${Vn(e)} ${n}`;e==="error"&&typeof console.error=="function"?console.error(t):e==="warn"&&typeof console.warn=="function"?console.warn(t):typeof console.info=="function"?console.info(t):typeof console.log=="function"&&console.log(t)}function nn(e,n,t){const r=M.devPipeUrl;if(!r||Ze()!=="verbose"||typeof fetch!="function")return;const i=Date.now();if(M.devPipeLastSent=M.devPipeLastSent.filter(o=>i-o<1e3),!(M.devPipeLastSent.length>=Yn)){M.devPipeLastSent.push(i);try{const o=JSON.stringify({level:e,code:n,msg:t,timestamp:new Date(i).toISOString()});fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:o,keepalive:!0}).catch(()=>{})}catch{}}}function $(e,n,t,r){const i=Ze();if(e==="info"){i==="verbose"&&(en("info",t),nn("info",n,t));return}en(e,t);const o={level:e,code:n,timestamp:new Date().toISOString(),msg:t};M.issues.push(o),M.issues.length>Qe&&M.issues.splice(0,M.issues.length-Qe),nn(e,n,t)}function Jn(e){M.devPipeUrl=e}function Xn(e){const n=we();return{version:Xe,locale:e.config.locale,theme:e.config.theme,storage:{version:e.storage.version,migratedFrom:e.storage.migratedFrom,keysFound:[...e.storage.keysFound]},osPreferences:{reducedMotion:n.reducedMotion,contrast:n.contrast,colorScheme:n.colorScheme},performance:{mountTimeMs:e.performance.mountTimeMs,bundleSizeGz:e.performance.bundleSizeGz,timeToFirstClick:e.performance.timeToFirstClick},issues:M.issues.map(t=>({level:t.level,code:t.code,timestamp:t.timestamp,msg:t.msg})),config:{...e.config},timestamp:new Date().toISOString()}}function xe(){return typeof window<"u"}function tn(){return typeof document<"u"}function Qn(e,n,t){if(!tn())return;const r=new Date;r.setTime(r.getTime()+t*864e5);const i=xe()&&window.location&&window.location.protocol==="https:",o=[`${e}=${encodeURIComponent(n)}`,`expires=${r.toUTCString()}`,"path=/","SameSite=Lax"];i&&o.push("Secure"),document.cookie=o.join(";")}function Zn(e){if(!tn())return null;const n=(document.cookie||"").match(new RegExp(`(^| )${e}=([^;]+)`));if(!n||typeof n[2]!="string")return null;try{return decodeURIComponent(n[2])}catch{return null}}function et(e){if(!xe())return null;try{return window.localStorage.getItem(e)}catch{return null}}function nt(e,n){if(xe())try{window.localStorage.setItem(e,n)}catch{}}function tt(e){if(e==null)return null;try{return JSON.parse(e)}catch{return null}}function rt(e){return e.version===U?{record:e,migrated:!1,migratedFrom:null}:{record:{prefs:{...F,...e.prefs},version:U,timestamp:new Date().toISOString(),locale:e.locale||"en"},migrated:!0,migratedFrom:e.version}}function rn(){const e=[],n=et(Ke);n!=null&&e.push("localStorage");const t=Zn(Ye);t!=null&&e.push("cookie");let r=null,i=null;if(n!=null?(r=n,i="localStorage"):t!=null&&(r=t,i="cookie"),r==null)return{source:null,record:null,migrated:!1,migratedFrom:null,keysFound:e};const o=tt(r);if(o==null)return $("error","STORAGE_PARSE_ERROR",`Failed to parse stored preferences from ${i}`),{source:i,record:null,migrated:!1,migratedFrom:null,keysFound:e};const l=Gn(o);if(!l)return $("error","STORAGE_PARSE_ERROR",`Stored preferences in ${i} did not match schema`),{source:i,record:null,migrated:!1,migratedFrom:null,keysFound:e};const{record:s,migrated:f,migratedFrom:c}=rt(l);return f&&$("info","STORAGE_MIGRATED",`Storage migrated: ${c??"unknown"} → ${U}`),{source:i,record:s,migrated:f,migratedFrom:c,keysFound:e}}function ot(e){const n=JSON.stringify(e);nt(Ke,n),Qn(Ye,n,365)}function J(){const e=rn();return e.record?{...F,...e.record.prefs}:{...F}}function Se(e,n="en"){const t=J(),r=Ve({...t,...e}),i={prefs:r,version:U,timestamp:new Date().toISOString(),locale:n};return ot(i),se(r),N(L.CHANGE,i),i}function on(e="en"){return Se({...F},e)}function it(){const e=rn();return{version:e.record?.version??U,migratedFrom:e.migratedFrom,keysFound:e.keysFound}}const at={label:"Accessibility preferences"},st={title:"Accessibility Preferences",description:"Adjust your viewing preferences.",reset:"Reset",close:"Close",disclaimer:"This panel provides personal preference controls; structural accessibility is built into the site itself.",theme:{label:"Display Theme",auto:"Auto",light:"Light",dark:"Dark"},branding:"Powered by Blakfy Studio",sections:{text:"Text",vision:"Vision",navigation:"Navigation",motion:"Motion & Reading"},preferences:{fontScale:{title:"Font Size",description:"Scales all text proportionally across the page. Ideal for small screens or users with low vision; changes apply instantly everywhere.",values:{100:"Normal",110:"Large",125:"Extra Large"}},contrast:{title:"High Contrast",description:"Applies a black background with high-visibility yellow links meeting the WCAG AAA 7:1 contrast ratio. Designed for users with visual impairments or colour blindness."},focusRing:{title:"Enhanced Focus Ring",description:"Displays a bold 4px blue outline around the focused element during keyboard navigation. Essential for users who cannot use or prefer not to use a mouse."},linkUnderline:{title:"Underline Links",description:"Adds underlines to all hyperlinks on the page. Helps users who cannot distinguish links from regular text by colour alone."},motion:{title:"Reduce Motion",description:"Disables page animations, transitions and scroll effects. Recommended for users with vestibular disorders, epilepsy or motion sensitivity."},dyslexiaFont:{title:"Dyslexia-Friendly Font",description:"Applies the OpenDyslexic typeface, adding extra weight to letter bottoms to reduce confusion between similar characters (b/d, p/q) and improve readability.",note:"Some readers find this helpful; research has not established universal benefit."},readingMode:{title:"Reading Mode",description:"Hides sidebars, banners and distracting side content so you can focus on the main text. Ideal for long articles or visually busy pages."}}},B={fab:at,panel:st},Ae=new Map;Ae.set("en",B);function lt(e){if(!e||typeof e!="object")return!1;const n=e,t=n.fab,r=n.panel;return!(!t||typeof t.label!="string"||!r||typeof r.title!="string")}async function an(e,n){const t=Ae.get(e);if(t)return t;if(typeof fetch!="function")return $("warn","LOCALE_FETCH_FAILED",`fetch unavailable, using en fallback for ${e}`),B;const r=`${(n||"").replace(/\/$/,"")}/locales/${e}.json`;try{const i=await fetch(r);if(!i.ok)return $("warn","LOCALE_FETCH_FAILED",`Locale fetch failed (${i.status}): ${r}`),B;const o=await i.json();return lt(o)?(Ae.set(e,o),o):($("warn","LOCALE_FETCH_FAILED",`Locale ${e} payload missing required fields`),B)}catch(i){const o=i instanceof Error?i.message:String(i);return $("warn","LOCALE_FETCH_FAILED",`Locale fetch threw for ${e}: ${o}`),B}}function sn(){return B}var ct=0;function d(e,n,t,r,i,o){n||(n={});var l,s,f=n;if("ref"in f)for(s in f={},n)s=="ref"?l=n[s]:f[s]=n[s];var c={type:e,props:f,key:t,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--ct,__i:-1,__u:0,__source:i,__self:o};if(typeof e=="function"&&(l=e.defaultProps))for(s in l)f[s]===void 0&&(f[s]=l[s]);return g.vnode&&g.vnode(c),c}var j,x,Ce,ln,le=0,cn=[],A=g,dn=A.__b,fn=A.__r,un=A.diffed,_n=A.__c,pn=A.unmount,mn=A.__;function ce(e,n){A.__h&&A.__h(x,e,le||n),le=0;var t=x.__H||(x.__H={__:[],__h:[]});return e>=t.__.length&&t.__.push({}),t.__[e]}function de(e){return le=1,dt(yn,e)}function dt(e,n,t){var r=ce(j++,2);if(r.t=e,!r.__c&&(r.__=[yn(void 0,n),function(s){var f=r.__N?r.__N[0]:r.__[0],c=r.t(f,s);f!==c&&(r.__N=[c,r.__[1]],r.__c.setState({}))}],r.__c=x,!x.__f)){var i=function(s,f,c){if(!r.__c.__H)return!0;var m=r.__c.__H.__.filter(function(u){return u.__c});if(m.every(function(u){return!u.__N}))return!o||o.call(this,s,f,c);var a=r.__c.props!==s;return m.some(function(u){if(u.__N){var _=u.__[0];u.__=u.__N,u.__N=void 0,_!==u.__[0]&&(a=!0)}}),o&&o.call(this,s,f,c)||a};x.__f=!0;var o=x.shouldComponentUpdate,l=x.componentWillUpdate;x.componentWillUpdate=function(s,f,c){if(this.__e){var m=o;o=void 0,i(s,f,c),o=m}l&&l.call(this,s,f,c)},x.shouldComponentUpdate=i}return r.__N||r.__}function G(e,n){var t=ce(j++,3);!A.__s&&bn(t.__H,n)&&(t.__=e,t.u=n,x.__H.__h.push(t))}function fe(e){return le=5,ft(function(){return{current:e}},[])}function ft(e,n){var t=ce(j++,7);return bn(t.__H,n)&&(t.__=e(),t.__H=n,t.__h=e),t.__}function hn(){var e=ce(j++,11);if(!e.__){for(var n=x.__v;n!==null&&!n.__m&&n.__!==null;)n=n.__;var t=n.__m||(n.__m=[0,0]);e.__="P"+t[0]+"-"+t[1]++}return e.__}function ut(){for(var e;e=cn.shift();){var n=e.__H;if(e.__P&&n)try{n.__h.some(ue),n.__h.some(Ee),n.__h=[]}catch(t){n.__h=[],A.__e(t,e.__v)}}}A.__b=function(e){x=null,dn&&dn(e)},A.__=function(e,n){e&&n.__k&&n.__k.__m&&(e.__m=n.__k.__m),mn&&mn(e,n)},A.__r=function(e){fn&&fn(e),j=0;var n=(x=e.__c).__H;n&&(Ce===x?(n.__h=[],x.__h=[],n.__.some(function(t){t.__N&&(t.__=t.__N),t.u=t.__N=void 0})):(n.__h.some(ue),n.__h.some(Ee),n.__h=[],j=0)),Ce=x},A.diffed=function(e){un&&un(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(cn.push(n)!==1&&ln===A.requestAnimationFrame||((ln=A.requestAnimationFrame)||_t)(ut)),n.__H.__.some(function(t){t.u&&(t.__H=t.u),t.u=void 0})),Ce=x=null},A.__c=function(e,n){n.some(function(t){try{t.__h.some(ue),t.__h=t.__h.filter(function(r){return!r.__||Ee(r)})}catch(r){n.some(function(i){i.__h&&(i.__h=[])}),n=[],A.__e(r,t.__v)}}),_n&&_n(e,n)},A.unmount=function(e){pn&&pn(e);var n,t=e.__c;t&&t.__H&&(t.__H.__.some(function(r){try{ue(r)}catch(i){n=i}}),t.__H=void 0,n&&A.__e(n,t.__v))};var gn=typeof requestAnimationFrame=="function";function _t(e){var n,t=function(){clearTimeout(r),gn&&cancelAnimationFrame(n),setTimeout(e)},r=setTimeout(t,35);gn&&(n=requestAnimationFrame(t))}function ue(e){var n=x,t=e.__c;typeof t=="function"&&(e.__c=void 0,t()),x=n}function Ee(e){var n=x;e.__c=e.__(),x=n}function bn(e,n){return!e||e.length!==n.length||n.some(function(t,r){return t!==e[r]})}function yn(e,n){return typeof n=="function"?n(e):n}function pt(e){return d("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:[d("circle",{cx:"12",cy:"4",r:"2"}),d("path",{d:"M12 6v8"}),d("path",{d:"M5 9h14"}),d("path",{d:"M9 14l-2 7"}),d("path",{d:"M15 14l2 7"})]})}function mt(e){return d("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",...e,children:[d("circle",{cx:"12",cy:"3",r:"2"}),d("path",{d:"M19 8.5c0 .55-.45 1-1 1h-4v3l3 7c.16.4-.04.86-.45 1l-1.42.5c-.4.16-.86-.04-1-.45L11.5 14h-1l-2.65 6.55c-.16.4-.6.6-1 .45l-1.42-.5c-.4-.16-.6-.6-.45-1l3-7v-3H6c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v1z"})]})}function ht(e){return d("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:[d("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),d("circle",{cx:"12",cy:"12",r:"3"})]})}function gt(e){return d("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:d("path",{d:"M5 5l10 10M15 5L5 15"})})}function bt(e){return d("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:[d("path",{d:"M12 2L2 7l10 5 10-5-10-5z"}),d("path",{d:"M2 17l10 5 10-5"}),d("path",{d:"M2 12l10 5 10-5"})]})}function yt({name:e}){return e==="walking"?d(pt,{}):e==="eye"?d(ht,{}):d(mt,{})}function vt({iconStyle:e,ariaLabel:n,isOpen:t,onClick:r}){return d("button",{type:"button",class:"fab","aria-haspopup":"dialog","aria-expanded":t,"aria-label":n,title:n,onClick:r,children:d(yt,{name:e})})}const kt='button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [role="switch"]:not([aria-disabled="true"])';function wt(e=document){let n=e.activeElement;for(;n;){const t=n.shadowRoot;if(!t||!t.activeElement)break;n=t.activeElement}return n}function vn(e){if(!e)return[];const n=e.querySelectorAll(kt);return Array.from(n).filter(t=>{if(t.hasAttribute("disabled"))return!1;const r=t.getAttribute("tabindex");return r&&Number(r)<0?!1:t.offsetParent!==null||t.getClientRects().length>0})}function xt({open:e,onClose:n,titleId:t,descriptionId:r,children:i}){const o=fe(null),l=fe(null),s=fe(n);return s.current=n,G(()=>{if(!e||typeof document>"u")return;const c=document.documentElement,m=c.style.overflow;return c.style.overflow="hidden",()=>{c.style.overflow=m}},[e]),G(()=>{if(!e||typeof document>"u")return;l.current=wt(document);const c=window.setTimeout(()=>{(vn(o.current)[0]??o.current)?.focus()},0),m=a=>{if(a.key==="Escape"){a.preventDefault(),s.current();return}if(a.key!=="Tab")return;const u=vn(o.current);if(u.length===0){a.preventDefault(),o.current?.focus();return}const _=u[0],v=u[u.length-1];if(!_||!v)return;const h=o.current?.getRootNode(),b=h&&"activeElement"in h?h.activeElement:document.activeElement;a.shiftKey?(b===_||!o.current?.contains(b))&&(a.preventDefault(),v.focus()):b===v&&(a.preventDefault(),_.focus())};return document.addEventListener("keydown",m),()=>{window.clearTimeout(c),document.removeEventListener("keydown",m);const a=l.current;a&&a instanceof HTMLElement&&a.focus()}},[e]),e?d("div",{class:"backdrop",onClick:c=>{c.target===c.currentTarget&&n()},children:d("div",{ref:o,class:"dialog",role:"dialog","aria-modal":"true","aria-labelledby":t,"aria-describedby":r,tabIndex:-1,children:i})}):null}function St({checked:e,onChange:n,ariaLabel:t,ariaLabelledBy:r,ariaDescribedBy:i,disabled:o=!1}){return d("button",{type:"button",class:"switch",role:"switch","aria-checked":e,"aria-label":r?void 0:t,"aria-labelledby":r,"aria-describedby":i,"aria-disabled":o||void 0,tabIndex:o?-1:0,onClick:()=>{o||n(!e)},onKeyDown:f=>{o||(f.key===" "||f.key==="Enter"||f.key==="Spacebar")&&(f.preventDefault(),n(!e))},children:d("span",{class:"switch-thumb","aria-hidden":"true"})})}function W({title:e,description:n,note:t,checked:r,onChange:i}){const o=hn(),l=`${o}-title`,s=`${o}-desc`;return d("div",{class:"toggle-row",children:[d("div",{class:"toggle-text",children:[d("p",{class:"toggle-title",id:l,children:e}),d("p",{class:"toggle-desc",id:s,children:n}),t?d("p",{class:"toggle-note",children:t}):null]}),d(St,{checked:r,onChange:i,ariaLabel:e,ariaLabelledBy:l,ariaDescribedBy:s})]})}const At=[100,110,125],Ct=["auto","light","dark"];function Et(){return d("svg",{class:"accordion-chevron","aria-hidden":"true",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:d("path",{d:"M3 4.5l3 3 3-3",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})})}function $t({translation:e,locale:n,currentTheme:t,onClose:r,onThemeChange:i,titleId:o,descriptionId:l}){const s=e.panel,[f,c]=de(()=>J()),[m,a]=de(!1),u=fe(null),[_,v]=de(()=>{const p=J(),S=new Set;return(p.fontScale!==100||p.dyslexiaFont)&&S.add("text"),p.contrast==="high"&&S.add("vision"),(p.focusRing||p.linkUnderline)&&S.add("navigation"),(p.motion==="reduce"||p.readingMode)&&S.add("motion"),S.size===0&&S.add("text"),S}),h=p=>{v(S=>{const E=new Set(S);return E.has(p)?E.delete(p):E.add(p),E})};G(()=>V(L.CHANGE,p=>{c(p.prefs)}),[]),G(()=>()=>{u.current&&clearTimeout(u.current)},[]);const b=(p,S)=>{const E={...f,[p]:S};c(E),Se({[p]:S},n),se(E)},y=()=>{if(!m){a(!0),u.current&&clearTimeout(u.current),u.current=setTimeout(()=>a(!1),3e3);return}u.current&&clearTimeout(u.current),a(!1);const p=on(n);c(p.prefs),se(p.prefs)},k=p=>p==="auto"?s.theme.auto:p==="light"?s.theme.light:s.theme.dark,C={text:(f.fontScale!==100?1:0)+(f.dyslexiaFont?1:0),vision:f.contrast==="high"?1:0,navigation:(f.focusRing?1:0)+(f.linkUnderline?1:0),motion:(f.motion==="reduce"?1:0)+(f.readingMode?1:0)},w=({skey:p,title:S,children:E})=>{const I=_.has(p),T=C[p];return d("div",{class:`acc-section${I?" acc-open":""}`,children:[d("button",{type:"button",class:"acc-header","aria-expanded":I,onClick:()=>h(p),children:[d("span",{class:"acc-title",children:S}),T>0&&d("span",{class:"acc-badge","aria-label":`${T} aktif`,children:T}),d(Et,{})]}),I&&d("div",{class:"acc-body",children:E})]})};return d(z,{children:[d("h2",{class:"panel-title",id:o,children:s.title}),d("button",{type:"button",class:"dialog-close","aria-label":s.close,onClick:r,children:d(gt,{})}),d("div",{class:"acc-list",role:"list",children:[d(w,{skey:"text",title:s.sections.text,children:[d("div",{class:"section",role:"radiogroup","aria-label":s.preferences.fontScale.title,children:[d("p",{class:"toggle-title",children:s.preferences.fontScale.title}),d("p",{class:"toggle-desc",children:s.preferences.fontScale.description}),d("div",{class:"scale-buttons",children:At.map(p=>{const S=String(p);return d("button",{type:"button",class:"scale-btn","aria-pressed":f.fontScale===p,onClick:()=>b("fontScale",p),children:s.preferences.fontScale.values[S]},p)})})]}),d(W,{title:s.preferences.dyslexiaFont.title,description:s.preferences.dyslexiaFont.description,note:s.preferences.dyslexiaFont.note,checked:f.dyslexiaFont,onChange:p=>b("dyslexiaFont",p)})]}),d(w,{skey:"vision",title:s.sections.vision,children:[d(W,{title:s.preferences.contrast.title,description:s.preferences.contrast.description,checked:f.contrast==="high",onChange:p=>b("contrast",p?"high":"normal")}),d("div",{class:"theme-switcher",role:"group","aria-label":s.theme.label,children:[d("p",{class:"theme-switcher-label",children:s.theme.label}),d("div",{class:"theme-buttons",children:Ct.map(p=>d("button",{type:"button",class:"theme-btn","aria-pressed":t===p,onClick:()=>i(p),children:k(p)},p))})]})]}),d(w,{skey:"navigation",title:s.sections.navigation,children:[d(W,{title:s.preferences.focusRing.title,description:s.preferences.focusRing.description,checked:f.focusRing,onChange:p=>b("focusRing",p)}),d(W,{title:s.preferences.linkUnderline.title,description:s.preferences.linkUnderline.description,checked:f.linkUnderline,onChange:p=>b("linkUnderline",p)})]}),d(w,{skey:"motion",title:s.sections.motion,children:[d(W,{title:s.preferences.motion.title,description:s.preferences.motion.description,checked:f.motion==="reduce",onChange:p=>b("motion",p?"reduce":"auto")}),d(W,{title:s.preferences.readingMode.title,description:s.preferences.readingMode.description,checked:f.readingMode,onChange:p=>b("readingMode",p)})]})]}),d("div",{class:"sr-only",role:"status","aria-live":"polite",children:m?`${s.reset}?`:""}),d("div",{class:"footer",children:[d("button",{type:"button",class:"btn btn-secondary",onClick:y,"aria-pressed":m,"data-confirm":m?"true":void 0,children:m?`${s.reset}?`:s.reset}),d("button",{type:"button",class:"btn btn-primary",onClick:r,children:s.close})]}),d("p",{class:"disclaimer",children:s.disclaimer}),d("a",{class:"panel-branding",href:"https://blakfy.com",target:"_blank",rel:"noopener noreferrer","aria-label":"Blakfy Studio — blakfy.com",children:[d("span",{class:"panel-branding-powered",children:"Powered by"}),d("span",{class:"panel-branding-name",children:"Blakfy Studio"}),d("svg",{class:"panel-branding-arrow","aria-hidden":"true",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:d("path",{d:"M2.5 6h7M7 3.5l2.5 2.5L7 8.5",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})})]})]})}const Tt="https://blakfy.com";function Lt(){return d("a",{class:"badge",href:Tt,target:"_blank",rel:"noopener noreferrer","aria-label":"Powered by Blakfy Studio — opens blakfy.com in a new tab",children:[d(bt,{}),d("span",{children:["Powered by ",d("strong",{children:"Blakfy Studio"})]})]})}function Rt({config:e,translation:n,iconStyle:t="access",keyboardShortcut:r=!0,onThemeChange:i}){const[o,l]=de(!1),s=hn(),f=`${s}-title`,c=`${s}-desc`;G(()=>{const u=V(L.OPEN,()=>l(!0)),_=V(L.CLOSE,()=>l(!1));return()=>{u(),_()}},[]),G(()=>{if(!r||typeof window>"u")return;const u=_=>{_.altKey&&_.key==="0"&&(_.preventDefault(),l(v=>v?(N(L.CLOSE,{}),!1):(N(L.OPEN,{}),!0)))};return window.addEventListener("keydown",u),()=>{window.removeEventListener("keydown",u)}},[r]);const m=()=>{l(!0),N(L.OPEN,{})},a=()=>{l(!1),N(L.CLOSE,{})};return d(z,{children:[d(vt,{iconStyle:t,ariaLabel:n.fab.label,isOpen:o,onClick:m}),d(xt,{open:o,onClose:a,titleId:f,descriptionId:c,children:d($t,{translation:n,locale:e.locale,currentTheme:e.theme,onClose:a,onThemeChange:i??(()=>{}),titleId:f,descriptionId:c})}),d(Lt,{})]})}const Ft=`/*
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
 * 8. Switch (ARIA APG) — compact size
 * ========================================================================== */
.switch {
  position: relative;
  flex-shrink: 0;
  inline-size: 36px;
  block-size: 20px;
  border-radius: 9999px;
  background: var(--blakfy-a11y-toggle-off);
  transition: background-color 200ms ease;
}

.switch[aria-checked="true"] {
  background: var(--blakfy-a11y-toggle-on);
}

.switch:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
  outline-offset: 2px;
}

.switch::before {
  content: "";
  position: absolute;
  inset: -8px;
}

.switch-thumb {
  position: absolute;
  inset-block-start: 2px;
  inset-inline-start: 2px;
  inline-size: 16px;
  block-size: 16px;
  border-radius: 9999px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  transition: transform 200ms ease;
}

.switch[aria-checked="true"] .switch-thumb {
  transform: translateX(16px);
}

[dir="rtl"] .switch[aria-checked="true"] .switch-thumb {
  transform: translateX(-16px);
}

/* ==========================================================================
 * 9. Accordion list
 * ========================================================================== */
.acc-list {
  margin-block-start: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.acc-section {
  border: 1px solid var(--__border);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 150ms ease;
}

.acc-section.acc-open {
  border-color: var(--blakfy-a11y-primary);
}

.acc-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--__text);
  text-align: start;
  transition: background 150ms ease;
}

.acc-header:hover {
  background: rgba(0, 0, 0, 0.03);
}

:host([data-theme="dark"]) .acc-header:hover {
  background: rgba(255, 255, 255, 0.05);
}

.acc-header:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
  outline-offset: -2px;
  border-radius: 7px;
}

.acc-title {
  flex: 1;
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.3;
}

.acc-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-inline-size: 16px;
  block-size: 16px;
  padding-inline: 4px;
  border-radius: 9999px;
  background: var(--blakfy-a11y-primary);
  color: #ffffff;
  font-size: 9px;
  font-weight: 700;
  line-height: 1;
}

.accordion-chevron {
  width: 14px;
  height: 14px;
  color: var(--__muted);
  flex-shrink: 0;
  transition: transform 200ms ease;
}

.acc-open .accordion-chevron {
  transform: rotate(180deg);
}

.acc-body {
  padding: 0 0.625rem 0.625rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

/* ==========================================================================
 * 10. Toggle row + section
 * ========================================================================== */
.section {
  border: 1px solid var(--__border);
  border-radius: 6px;
  padding: 0.6rem 0.625rem;
}

.toggle-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.625rem;
  border: 1px solid var(--__border);
  border-radius: 6px;
  padding: 0.6rem 0.625rem;
}

.toggle-text {
  flex: 1;
  min-width: 0;
}

.toggle-title {
  font-size: clamp(11px, 2vw, 13px);
  font-weight: 600;
  line-height: 1.25;
  color: var(--__text);
}

.toggle-desc {
  margin-block-start: 0.2rem;
  font-size: clamp(10px, 1.7vw, 11.5px);
  line-height: 1.5;
  color: var(--__muted);
}

.toggle-note {
  margin-block-start: 0.2rem;
  font-size: clamp(9px, 1.5vw, 10.5px);
  font-style: italic;
  line-height: 1.4;
  color: #b45309;
}

:host([data-theme="dark"]) .toggle-note {
  color: #fbbf24;
}

/* Font scale (radiogroup of buttons) */
.scale-buttons {
  margin-block-start: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
}

.scale-btn {
  min-block-size: 32px;
  padding-inline: 0.75rem;
  font-size: clamp(11px, 2vw, 12.5px);
  font-weight: 500;
  border: 1px solid var(--__border);
  border-radius: 6px;
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

:host([data-theme="dark"]) .panel-branding:hover {
  background: rgba(59, 130, 246, 0.08);
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
  justify-content: center;
  gap: 0.3rem;
  margin-block-start: 0.875rem;
  padding: 0.45rem 0.75rem;
  border-radius: 6px;
  text-decoration: none;
  color: inherit;
  transition: background 150ms ease;
}

.panel-branding:hover {
  background: rgba(37, 99, 235, 0.06);
}

.panel-branding:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
  outline-offset: 2px;
  border-radius: 6px;
}

.panel-branding-powered {
  font-size: 11px;
  font-weight: 400;
  color: var(--__muted);
}

.panel-branding-name {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--blakfy-a11y-primary);
}

.panel-branding-arrow {
  width: 11px;
  height: 11px;
  color: var(--__muted);
  flex-shrink: 0;
  opacity: 0.45;
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
`,Mt="2.0.0-alpha.0";function Ot(e){const n={open:()=>N(L.OPEN,{}),close:()=>N(L.CLOSE,{}),getPreferences:()=>J(),setPreferences:t=>{Se(t,e.config.locale)},reset:()=>{on(e.config.locale)},onChange:t=>V(L.CHANGE,r=>t(r.prefs)),configure:t=>e.configure(t),diagnostics:()=>Xn({config:e.config,performance:{mountTimeMs:e.mountTimeMs,bundleSizeGz:e.bundleSizeGz,timeToFirstClick:null},storage:e.storage}),version:Mt};return typeof window<"u"&&(window.BlakfyA11y&&typeof window.BlakfyA11y=="object"?Object.assign(window.BlakfyA11y,n):window.BlakfyA11y=n),n}const kn="blakfy-a11y-root",$e="2.0.0-alpha.0";function Pt(e){const n=e.toLowerCase().split(/[-_]/)[0]??"",r={tr:"tr",en:"en",de:"de",fr:"fr",es:"es",it:"it",ar:"ar",he:"iw",ru:"ru",iw:"he"}[n];return r==="iw"?"he":r}function Dt(){if(typeof document>"u")return"en";const e=document.documentElement.lang??"";return Pt(e)??"en"}function Nt(){if(typeof document>"u")return{};let e=null;const n=document.currentScript;if(n&&n.dataset)e=n;else{const i=document.querySelectorAll("script[src]");for(let o=0;o<i.length;o++){const l=i[o];if(l&&l.src&&/accessibility[-_]widget|blakfy/i.test(l.src)){e=l;break}}}if(!e)return{};const t=e.dataset,r={};return t.locale?r.locale=t.locale:r.locale=Dt(),t.theme&&(r.theme=t.theme),t.position&&(r.position=t.position),t.font&&(r.font=t.font),t.debug&&(r.debug=t.debug==="true"),t.devPipe&&(r.devPipe=t.devPipe),t.version&&(r.version=t.version),r}function It(){if(typeof document>"u")return!0;const e=document.querySelectorAll("link[href]");for(let n=0;n<e.length;n++){const t=e[n];if(t&&t.href&&/open[-_]?dyslexic/i.test(t.href))return!0}return!1}function zt(e){if(typeof document>"u")return{mismatched:!1,fields:[]};const n=document.documentElement;if(!n)return{mismatched:!1,fields:[]};const t={"data-a11y-fontscale":String(e.fontScale),"data-a11y-contrast":e.contrast,"data-a11y-focus":e.focusRing?"enhanced":"default","data-a11y-links":e.linkUnderline?"underline":"default","data-a11y-motion":e.motion,"data-a11y-dyslexia":String(e.dyslexiaFont),"data-a11y-reading":String(e.readingMode)},r=[];let i=!1;for(const o of Object.keys(t)){if(!n.hasAttribute(o))continue;i=!0,n.getAttribute(o)!==t[o]&&r.push(o)}return{mismatched:i&&r.length>0,fields:r}}function wn(e){try{const n=new URL(e);return n.origin+n.pathname.replace(/\/[^/]*$/,"")}catch{return""}}const xn=typeof document<"u"?wn(document.currentScript?.src??""):"";function Sn(){if(typeof document>"u")return"";if(xn)return xn;const e=document.querySelectorAll("script[src]");for(let n=0;n<e.length;n++){const t=e[n];if(t&&t.src&&/accessibility[-_]widget|blakfy|widget\.js$/i.test(t.src)){const r=wn(t.src);if(r)return r}}return""}function Ht(e){return Dn.includes(e)}function Ut(e){if(e==="dark")return"dark";if(e==="light")return"light";if(typeof document<"u"){const n=document.documentElement,t=n.getAttribute("data-theme");if(t==="dark")return"dark";if(t==="light")return"light";if(n.getAttribute("data-color-mode")==="dark"||n.classList.contains("dark"))return"dark";if(n.classList.contains("light"))return"light"}if(typeof window>"u"||typeof window.matchMedia!="function")return"light";try{return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function Bt(e){if(typeof MutationObserver>"u"||typeof document>"u")return()=>{};const n=new MutationObserver(e);return n.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-mode"]}),()=>n.disconnect()}function X(e,n){e.setAttribute("data-position",n.position),e.setAttribute("data-theme",Ut(n.theme)),e.setAttribute("dir",Ht(n.locale)?"rtl":"ltr"),n.font&&e.style.setProperty("font-family",n.font)}function jt(e){const n=document.createElement("style");n.textContent=Ft,e.appendChild(n)}function Gt(){const e=document.querySelector(kn);if(e&&e instanceof HTMLElement)return e;const n=document.createElement(kn);return document.body.appendChild(n),n}function Te(e={}){const n=typeof performance<"u"?performance.now():Date.now();if(typeof document>"u")return{unmount:()=>{}};const t=Nt(),r=typeof window<"u"?window.__BLAKFY_A11Y__??{}:{};let o=Je({...t,...r,...e});const l=J(),s=zt(l);s.mismatched&&$("error","SSR_HYDRATION_MISMATCH",`SSR-rendered prefs differ from client storage: ${s.fields.join(", ")}`),se(l),t.version&&t.version!==$e&&$("error","CDN_VERSION_MISMATCH",`Expected version ${t.version} but runtime is ${$e} — clear your CDN cache.`),l.dyslexiaFont&&!It()&&$("warn","OPENDYSLEXIC_CDN_MISSING","dyslexiaFont=true but no OpenDyslexic CDN <link> found — system fallback active."),Wn()&&$("warn","HOST_CSS_IMPORTANT_CONFLICT","Host stylesheet uses !important on body/a — visual prefs may not apply.");const f=we();f.reducedMotion&&$("info","OS_PREFERS_REDUCED_MOTION","OS prefers-reduced-motion=reduce detected."),f.contrast==="more"&&$("info","OS_PREFERS_CONTRAST_MORE","OS prefers-contrast=more detected."),f.colorScheme==="dark"&&$("info","OS_PREFERS_COLOR_SCHEME_DARK","OS prefers-color-scheme=dark detected.");const c=Kn(()=>{h.config.theme==="auto"&&(X(h.host,h.config),h.rerender())}),m=Bt(()=>{h.config.theme==="auto"&&(X(h.host,h.config),h.rerender())});t.devPipe&&Jn(t.devPipe);let a=null;if(typeof r.onPreferencesChange=="function"){const C=r.onPreferencesChange;a=V(L.CHANGE,w=>{try{C(w)}catch{}})}const u=Gt(),_=u.shadowRoot??u.attachShadow({mode:"open"});for(;_.firstChild;)_.removeChild(_.firstChild);jt(_),X(u,o);let v=sn();const h={config:o,translation:v,shadowRoot:_,host:u,rerender:()=>{qe(De(Rt,{config:h.config,translation:h.translation,onThemeChange:C=>{h.config={...h.config,theme:C},X(u,h.config),h.rerender()}}),_)}};if(h.rerender(),o.locale!=="en"){const C=Sn();an(o.locale,C).then(w=>{v=w,h.translation=w,h.rerender()})}const b=it(),y=(typeof performance<"u"?performance.now():Date.now())-n;return Ot({config:o,mountTimeMs:y,bundleSizeGz:0,storage:b,configure:C=>{const w=Je({...h.config,...C}),p=w.locale!==h.config.locale;if(h.config=w,X(u,w),p)if(w.locale==="en")h.translation=sn(),h.rerender();else{const S=Sn();an(w.locale,S).then(E=>{h.translation=E,h.rerender()})}else h.rerender()}}),$("info","INITIALIZED",`Widget mounted in ${y.toFixed(1)}ms`),N(L.READY,{version:$e}),{unmount:()=>{c(),m(),a&&a(),qe(null,_),u.parentNode&&u.parentNode.removeChild(u)}}}const An="blakfy-a11y";class Cn extends HTMLElement{constructor(){super(...arguments);Le(this,"_unmount",null)}connectedCallback(){if(this._unmount)return;const t=this._readAttributes(),r=Te(t);this._unmount=r.unmount}disconnectedCallback(){this._unmount&&(this._unmount(),this._unmount=null)}attributeChangedCallback(t,r,i){if(r===i||!this._unmount||typeof window>"u"||!window.BlakfyA11y)return;const o=this._readAttributes();window.BlakfyA11y.configure(o)}_readAttributes(){const t={},r=this.getAttribute("locale");r&&(t.locale=r);const i=this.getAttribute("theme");i&&(t.theme=i);const o=this.getAttribute("position");o&&(t.position=o);const l=this.getAttribute("font");l&&(t.font=l);const s=this.getAttribute("debug");return s!=null&&(t.debug=s==="true"),t}}Le(Cn,"observedAttributes",["locale","theme","position","font","debug"]);function En(){typeof customElements>"u"||customElements.get(An)||customElements.define(An,Cn)}const Wt="blakfy-a11y-root",qt="blakfy-a11y";function $n(){typeof document>"u"||document.querySelector(Wt)||document.querySelector(qt)||Te()}En(),typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",$n,{once:!0}):$n()),O.defineCustomElement=En,O.mount=Te,Object.defineProperty(O,Symbol.toStringTag,{value:"Module"})})(this.BlakfyA11y=this.BlakfyA11y||{});
//# sourceMappingURL=widget.js.map
