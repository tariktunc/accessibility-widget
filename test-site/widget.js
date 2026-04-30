var cr=Object.defineProperty;var dr=(M,$,g)=>$ in M?cr(M,$,{enumerable:!0,configurable:!0,writable:!0,value:g}):M[$]=g;var Re=(M,$,g)=>dr(M,typeof $!="symbol"?$+"":$,g);(function(M){"use strict";var $,g,Me,P,He,Pe,Ie,ue,Y,W,Oe,fe,pe,he,X={},J=[],On=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Z=Array.isArray;function H(e,n){for(var t in n)e[t]=n[t];return e}function me(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function De(e,n,t){var o,i,r,a={};for(r in n)r=="key"?o=n[r]:r=="ref"?i=n[r]:a[r]=n[r];if(arguments.length>2&&(a.children=arguments.length>3?$.call(arguments,2):t),typeof e=="function"&&e.defaultProps!=null)for(r in e.defaultProps)a[r]===void 0&&(a[r]=e.defaultProps[r]);return Q(e,a,o,i,null)}function Q(e,n,t,o,i){var r={type:e,props:n,key:t,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++Me,__i:-1,__u:0};return i==null&&g.vnode!=null&&g.vnode(r),r}function F(e){return e.children}function ee(e,n){this.props=e,this.context=n}function z(e,n){if(n==null)return e.__?z(e.__,e.__i+1):null;for(var t;n<e.__k.length;n++)if((t=e.__k[n])!=null&&t.__e!=null)return t.__e;return typeof e.type=="function"?z(e):null}function Dn(e){if(e.__P&&e.__d){var n=e.__v,t=n.__e,o=[],i=[],r=H({},n);r.__v=n.__v+1,g.vnode&&g.vnode(r),_e(e.__P,r,n,e.__n,e.__P.namespaceURI,32&n.__u?[t]:null,o,t??z(n),!!(32&n.__u),i),r.__v=n.__v,r.__.__k[r.__i]=r,Ge(o,r,i),n.__e=n.__=null,r.__e!=t&&Fe(r)}}function Fe(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(n){if(n!=null&&n.__e!=null)return e.__e=e.__c.base=n.__e}),Fe(e)}function ze(e){(!e.__d&&(e.__d=!0)&&P.push(e)&&!ne.__r++||He!=g.debounceRendering)&&((He=g.debounceRendering)||Pe)(ne)}function ne(){try{for(var e,n=1;P.length;)P.length>n&&P.sort(Ie),e=P.shift(),n=P.length,Dn(e)}finally{P.length=ne.__r=0}}function Ne(e,n,t,o,i,r,a,c,p,u,m){var s,h,f,v,_,w,y,d=o&&o.__k||J,b=n.length;for(p=Fn(t,n,d,p,b),s=0;s<b;s++)(f=t.__k[s])!=null&&(h=f.__i!=-1&&d[f.__i]||X,f.__i=s,w=_e(e,f,h,i,r,a,c,p,u,m),v=f.__e,f.ref&&h.ref!=f.ref&&(h.ref&&be(h.ref,null,f),m.push(f.ref,f.__c||v,f)),_==null&&v!=null&&(_=v),(y=!!(4&f.__u))||h.__k===f.__k?(p=Ue(f,p,e,y),y&&h.__e&&(h.__e=null)):typeof f.type=="function"&&w!==void 0?p=w:v&&(p=v.nextSibling),f.__u&=-7);return t.__e=_,p}function Fn(e,n,t,o,i){var r,a,c,p,u,m=t.length,s=m,h=0;for(e.__k=new Array(i),r=0;r<i;r++)(a=n[r])!=null&&typeof a!="boolean"&&typeof a!="function"?(typeof a=="string"||typeof a=="number"||typeof a=="bigint"||a.constructor==String?a=e.__k[r]=Q(null,a,null,null,null):Z(a)?a=e.__k[r]=Q(F,{children:a},null,null,null):a.constructor===void 0&&a.__b>0?a=e.__k[r]=Q(a.type,a.props,a.key,a.ref?a.ref:null,a.__v):e.__k[r]=a,p=r+h,a.__=e,a.__b=e.__b+1,c=null,(u=a.__i=zn(a,t,p,s))!=-1&&(s--,(c=t[u])&&(c.__u|=2)),c==null||c.__v==null?(u==-1&&(i>m?h--:i<m&&h++),typeof a.type!="function"&&(a.__u|=4)):u!=p&&(u==p-1?h--:u==p+1?h++:(u>p?h--:h++,a.__u|=4))):e.__k[r]=null;if(s)for(r=0;r<m;r++)(c=t[r])!=null&&!(2&c.__u)&&(c.__e==o&&(o=z(c)),We(c,c));return o}function Ue(e,n,t,o){var i,r;if(typeof e.type=="function"){for(i=e.__k,r=0;i&&r<i.length;r++)i[r]&&(i[r].__=e,n=Ue(i[r],n,t,o));return n}e.__e!=n&&(o&&(n&&e.type&&!n.parentNode&&(n=z(e)),t.insertBefore(e.__e,n||null)),n=e.__e);do n=n&&n.nextSibling;while(n!=null&&n.nodeType==8);return n}function zn(e,n,t,o){var i,r,a,c=e.key,p=e.type,u=n[t],m=u!=null&&(2&u.__u)==0;if(u===null&&c==null||m&&c==u.key&&p==u.type)return t;if(o>(m?1:0)){for(i=t-1,r=t+1;i>=0||r<n.length;)if((u=n[a=i>=0?i--:r++])!=null&&!(2&u.__u)&&c==u.key&&p==u.type)return a}return-1}function Be(e,n,t){n[0]=="-"?e.setProperty(n,t??""):e[n]=t==null?"":typeof t!="number"||On.test(n)?t:t+"px"}function te(e,n,t,o,i){var r,a;e:if(n=="style")if(typeof t=="string")e.style.cssText=t;else{if(typeof o=="string"&&(e.style.cssText=o=""),o)for(n in o)t&&n in t||Be(e.style,n,"");if(t)for(n in t)o&&t[n]==o[n]||Be(e.style,n,t[n])}else if(n[0]=="o"&&n[1]=="n")r=n!=(n=n.replace(Oe,"$1")),a=n.toLowerCase(),n=a in e||n=="onFocusOut"||n=="onFocusIn"?a.slice(2):n.slice(2),e.l||(e.l={}),e.l[n+r]=t,t?o?t[W]=o[W]:(t[W]=fe,e.addEventListener(n,r?he:pe,r)):e.removeEventListener(n,r?he:pe,r);else{if(i=="http://www.w3.org/2000/svg")n=n.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(n!="width"&&n!="height"&&n!="href"&&n!="list"&&n!="form"&&n!="tabIndex"&&n!="download"&&n!="rowSpan"&&n!="colSpan"&&n!="role"&&n!="popover"&&n in e)try{e[n]=t??"";break e}catch{}typeof t=="function"||(t==null||t===!1&&n[4]!="-"?e.removeAttribute(n):e.setAttribute(n,n=="popover"&&t==1?"":t))}}function je(e){return function(n){if(this.l){var t=this.l[n.type+e];if(n[Y]==null)n[Y]=fe++;else if(n[Y]<t[W])return;return t(g.event?g.event(n):n)}}}function _e(e,n,t,o,i,r,a,c,p,u){var m,s,h,f,v,_,w,y,d,b,k,L,de,G,Te,R=n.type;if(n.constructor!==void 0)return null;128&t.__u&&(p=!!(32&t.__u),r=[c=n.__e=t.__e]),(m=g.__b)&&m(n);e:if(typeof R=="function")try{if(y=n.props,d=R.prototype&&R.prototype.render,b=(m=R.contextType)&&o[m.__c],k=m?b?b.props.value:m.__:o,t.__c?w=(s=n.__c=t.__c).__=s.__E:(d?n.__c=s=new R(y,k):(n.__c=s=new ee(y,k),s.constructor=R,s.render=Un),b&&b.sub(s),s.state||(s.state={}),s.__n=o,h=s.__d=!0,s.__h=[],s._sb=[]),d&&s.__s==null&&(s.__s=s.state),d&&R.getDerivedStateFromProps!=null&&(s.__s==s.state&&(s.__s=H({},s.__s)),H(s.__s,R.getDerivedStateFromProps(y,s.__s))),f=s.props,v=s.state,s.__v=n,h)d&&R.getDerivedStateFromProps==null&&s.componentWillMount!=null&&s.componentWillMount(),d&&s.componentDidMount!=null&&s.__h.push(s.componentDidMount);else{if(d&&R.getDerivedStateFromProps==null&&y!==f&&s.componentWillReceiveProps!=null&&s.componentWillReceiveProps(y,k),n.__v==t.__v||!s.__e&&s.shouldComponentUpdate!=null&&s.shouldComponentUpdate(y,s.__s,k)===!1){n.__v!=t.__v&&(s.props=y,s.state=s.__s,s.__d=!1),n.__e=t.__e,n.__k=t.__k,n.__k.some(function(q){q&&(q.__=n)}),J.push.apply(s.__h,s._sb),s._sb=[],s.__h.length&&a.push(s);break e}s.componentWillUpdate!=null&&s.componentWillUpdate(y,s.__s,k),d&&s.componentDidUpdate!=null&&s.__h.push(function(){s.componentDidUpdate(f,v,_)})}if(s.context=k,s.props=y,s.__P=e,s.__e=!1,L=g.__r,de=0,d)s.state=s.__s,s.__d=!1,L&&L(n),m=s.render(s.props,s.state,s.context),J.push.apply(s.__h,s._sb),s._sb=[];else do s.__d=!1,L&&L(n),m=s.render(s.props,s.state,s.context),s.state=s.__s;while(s.__d&&++de<25);s.state=s.__s,s.getChildContext!=null&&(o=H(H({},o),s.getChildContext())),d&&!h&&s.getSnapshotBeforeUpdate!=null&&(_=s.getSnapshotBeforeUpdate(f,v)),G=m!=null&&m.type===F&&m.key==null?qe(m.props.children):m,c=Ne(e,Z(G)?G:[G],n,t,o,i,r,a,c,p,u),s.base=n.__e,n.__u&=-161,s.__h.length&&a.push(s),w&&(s.__E=s.__=null)}catch(q){if(n.__v=null,p||r!=null)if(q.then){for(n.__u|=p?160:128;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;r[r.indexOf(c)]=null,n.__e=c}else{for(Te=r.length;Te--;)me(r[Te]);ge(n)}else n.__e=t.__e,n.__k=t.__k,q.then||ge(n);g.__e(q,n,t)}else r==null&&n.__v==t.__v?(n.__k=t.__k,n.__e=t.__e):c=n.__e=Nn(t.__e,n,t,o,i,r,a,p,u);return(m=g.diffed)&&m(n),128&n.__u?void 0:c}function ge(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(ge))}function Ge(e,n,t){for(var o=0;o<t.length;o++)be(t[o],t[++o],t[++o]);g.__c&&g.__c(n,e),e.some(function(i){try{e=i.__h,i.__h=[],e.some(function(r){r.call(i)})}catch(r){g.__e(r,i.__v)}})}function qe(e){return typeof e!="object"||e==null||e.__b>0?e:Z(e)?e.map(qe):H({},e)}function Nn(e,n,t,o,i,r,a,c,p){var u,m,s,h,f,v,_,w=t.props||X,y=n.props,d=n.type;if(d=="svg"?i="http://www.w3.org/2000/svg":d=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),r!=null){for(u=0;u<r.length;u++)if((f=r[u])&&"setAttribute"in f==!!d&&(d?f.localName==d:f.nodeType==3)){e=f,r[u]=null;break}}if(e==null){if(d==null)return document.createTextNode(y);e=document.createElementNS(i,d,y.is&&y),c&&(g.__m&&g.__m(n,r),c=!1),r=null}if(d==null)w===y||c&&e.data==y||(e.data=y);else{if(r=r&&$.call(e.childNodes),!c&&r!=null)for(w={},u=0;u<e.attributes.length;u++)w[(f=e.attributes[u]).name]=f.value;for(u in w)f=w[u],u=="dangerouslySetInnerHTML"?s=f:u=="children"||u in y||u=="value"&&"defaultValue"in y||u=="checked"&&"defaultChecked"in y||te(e,u,null,f,i);for(u in y)f=y[u],u=="children"?h=f:u=="dangerouslySetInnerHTML"?m=f:u=="value"?v=f:u=="checked"?_=f:c&&typeof f!="function"||w[u]===f||te(e,u,f,w[u],i);if(m)c||s&&(m.__html==s.__html||m.__html==e.innerHTML)||(e.innerHTML=m.__html),n.__k=[];else if(s&&(e.innerHTML=""),Ne(n.type=="template"?e.content:e,Z(h)?h:[h],n,t,o,d=="foreignObject"?"http://www.w3.org/1999/xhtml":i,r,a,r?r[0]:t.__k&&z(t,0),c,p),r!=null)for(u=r.length;u--;)me(r[u]);c||(u="value",d=="progress"&&v==null?e.removeAttribute("value"):v!=null&&(v!==e[u]||d=="progress"&&!v||d=="option"&&v!=w[u])&&te(e,u,v,w[u],i),u="checked",_!=null&&_!=e[u]&&te(e,u,_,w[u],i))}return e}function be(e,n,t){try{if(typeof e=="function"){var o=typeof e.__u=="function";o&&e.__u(),o&&n==null||(e.__u=e(n))}else e.current=n}catch(i){g.__e(i,t)}}function We(e,n,t){var o,i;if(g.unmount&&g.unmount(e),(o=e.ref)&&(o.current&&o.current!=e.__e||be(o,null,n)),(o=e.__c)!=null){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(r){g.__e(r,n)}o.base=o.__P=null}if(o=e.__k)for(i=0;i<o.length;i++)o[i]&&We(o[i],n,t||typeof e.type!="function");t||me(e.__e),e.__c=e.__=e.__e=void 0}function Un(e,n,t){return this.constructor(e,t)}function Ke(e,n,t){var o,i,r,a;n==document&&(n=document.documentElement),g.__&&g.__(e,n),i=(o=!1)?null:n.__k,r=[],a=[],_e(n,e=n.__k=De(F,null,[e]),i||X,X,n.namespaceURI,i?null:n.firstChild?$.call(n.childNodes):null,r,i?i.__e:n.firstChild,o,a),Ge(r,e,a)}$=J.slice,g={__e:function(e,n,t,o){for(var i,r,a;n=n.__;)if((i=n.__c)&&!i.__)try{if((r=i.constructor)&&r.getDerivedStateFromError!=null&&(i.setState(r.getDerivedStateFromError(e)),a=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(e,o||{}),a=i.__d),a)return i.__E=i}catch(c){e=c}throw e}},Me=0,ee.prototype.setState=function(e,n){var t;t=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=H({},this.state),typeof e=="function"&&(e=e(H({},t),this.props)),e&&H(t,e),e!=null&&this.__v&&(n&&this._sb.push(n),ze(this))},ee.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),ze(this))},ee.prototype.render=F,P=[],Pe=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Ie=function(e,n){return e.__v.__b-n.__v.__b},ne.__r=0,ue=Math.random().toString(8),Y="__d"+ue,W="__a"+ue,Oe=/(PointerCapture)$|Capture$/i,fe=0,pe=je(!1),he=je(!0);const Ve="blakfy_a11y_prefs",Ye="blakfy_a11y_prefs",N="1.0.0",E={READY:"blakfy:a11y:ready",CHANGE:"blakfy:a11y:change",OPEN:"blakfy:a11y:open",CLOSE:"blakfy:a11y:close"},S={fontScale:100,contrast:"normal",focusRing:!1,linkUnderline:!1,motion:"auto",dyslexiaFont:!1,readingMode:!1,lineHeight:"normal",letterSpacing:"normal",textAlign:"default",highlightHeadings:!1,saturation:"normal",cursorSize:"default",hideImages:!1},Bn=["tr","en","de","fr","es","it","ar","he","ru"],jn=["ar","he"],Gn={locale:"en",theme:"auto",position:"bottom-left",font:"",debug:!1};function ye(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function qn(e){return e===100||e===110||e===125?e:S.fontScale}function Wn(e){return e==="normal"||e==="high"?e:S.contrast}function D(e,n){return typeof e=="boolean"?e:n}function Kn(e){return e==="auto"||e==="reduce"?e:S.motion}function Vn(e){return e==="normal"||e==="medium"||e==="large"?e:S.lineHeight}function Yn(e){return e==="normal"||e==="medium"||e==="large"?e:S.letterSpacing}function Xn(e){return e==="default"||e==="left"||e==="center"||e==="right"?e:S.textAlign}function Jn(e){return e==="normal"||e==="high"||e==="low"||e==="none"?e:S.saturation}function Zn(e){return e==="default"||e==="large-dark"||e==="large-light"?e:S.cursorSize}function Qn(e){return typeof e=="string"&&Bn.includes(e)?e:"en"}function et(e){return e==="light"||e==="dark"||e==="auto"?e:"auto"}function nt(e){return e==="bottom-left"||e==="bottom-right"||e==="top-left"||e==="top-right"?e:"bottom-left"}function re(e,n){return typeof e=="string"?e:n}function Xe(e){return ye(e)?{fontScale:qn(e.fontScale),contrast:Wn(e.contrast),focusRing:D(e.focusRing,S.focusRing),linkUnderline:D(e.linkUnderline,S.linkUnderline),motion:Kn(e.motion),dyslexiaFont:D(e.dyslexiaFont,S.dyslexiaFont),readingMode:D(e.readingMode,S.readingMode),lineHeight:Vn(e.lineHeight),letterSpacing:Yn(e.letterSpacing),textAlign:Xn(e.textAlign),highlightHeadings:D(e.highlightHeadings,S.highlightHeadings),saturation:Jn(e.saturation),cursorSize:Zn(e.cursorSize),hideImages:D(e.hideImages,S.hideImages)}:{...S}}function tt(e){if(!ye(e))return null;const n=Xe(e.prefs),t=re(e.version,N),o=re(e.timestamp,new Date().toISOString()),i=re(e.locale,"en");return{prefs:n,version:t,timestamp:o,locale:i}}function Je(e){return ye(e)?{locale:Qn(e.locale),theme:et(e.theme),position:nt(e.position),font:re(e.font,""),debug:D(e.debug,!1)}:{...Gn}}function I(e,n){if(!(typeof window>"u"))try{const t=new CustomEvent(e,{detail:n});window.dispatchEvent(t)}catch{}}function K(e,n){if(typeof window>"u")return()=>{};const t=o=>{n(o.detail)};return window.addEventListener(e,t),()=>{typeof window>"u"||window.removeEventListener(e,t)}}const Ze="blakfy-a11y-host";function Qe(e,n){const t=`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M6 2L6 26L12 20L16 28L19 27L15 19L22 19Z" fill="${e}" stroke="${n}" stroke-width="1.5" stroke-linejoin="round"/></svg>`;return`url("data:image/svg+xml,${encodeURIComponent(t)}") 6 2`}function rt(e){const n=[];if(e.fontScale!==100&&n.push(`html { font-size: ${e.fontScale}% !important; }`),e.contrast==="high"&&n.push("html body, html body * { background-color: #000000 !important; color: #ffffff !important; border-color: #333333 !important; }","html body a, html body a * { color: #ffff00 !important; }","html body img { filter: invert(1) hue-rotate(180deg) !important; }"),e.focusRing&&n.push("html *:focus, html *:focus-visible { outline: 4px solid #2563eb !important; outline-offset: 2px !important; }"),e.linkUnderline&&n.push("html a { text-decoration: underline !important; }"),e.motion==="reduce"&&n.push("html *, html *::before, html *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }"),e.dyslexiaFont&&n.push("html * { font-family: 'OpenDyslexic', OpenDyslexic, Arial, sans-serif !important; }"),e.readingMode&&n.push('html aside, html [role="complementary"] { display: none !important; }','html [class*="sidebar"], html [id*="sidebar"] { display: none !important; }','html [class*="banner"]:not(main *) { display: none !important; }'),e.lineHeight==="medium"?n.push("html p, html li, html dd, html dt, html span, html div { line-height: 1.8 !important; }"):e.lineHeight==="large"&&n.push("html p, html li, html dd, html dt, html span, html div { line-height: 2.4 !important; }"),e.letterSpacing==="medium"?n.push("html * { letter-spacing: 0.08em !important; }"):e.letterSpacing==="large"&&n.push("html * { letter-spacing: 0.16em !important; }"),e.textAlign!=="default"&&n.push(`html p, html li, html h1, html h2, html h3, html h4, html h5, html h6 { text-align: ${e.textAlign} !important; }`),e.highlightHeadings&&n.push("html h1, html h2, html h3, html h4, html h5, html h6 { outline: 3px solid #2563eb !important; outline-offset: 3px !important; }"),e.saturation==="none"?(n.push("html { filter: grayscale(100%) !important; }"),n.push("blakfy-a11y-root { filter: none !important; }")):e.saturation==="high"?(n.push("html { filter: saturate(2) !important; }"),n.push("blakfy-a11y-root { filter: none !important; }")):e.saturation==="low"&&(n.push("html { filter: saturate(0.3) !important; }"),n.push("blakfy-a11y-root { filter: none !important; }")),e.cursorSize==="large-dark"){const t=Qe("black","white");n.push(`html *, html *::before, html *::after { cursor: ${t}, default !important; }`)}else if(e.cursorSize==="large-light"){const t=Qe("white","black");n.push(`html *, html *::before, html *::after { cursor: ${t}, default !important; }`)}return e.hideImages&&n.push('html img, html picture, html [role="img"]:not(svg):not([aria-label*="accessibility"]) { opacity: 0 !important; }',"html video { visibility: hidden !important; }"),n.join(`
`)}function ot(e){if(typeof document>"u")return;let n=document.getElementById(Ze);n||(n=document.createElement("style"),n.id=Ze,n.setAttribute("data-blakfy",""),(document.head||document.documentElement).appendChild(n)),n.textContent=rt(e)}function oe(e){if(typeof document>"u")return;const n=document.documentElement;n&&(n.setAttribute("data-a11y-fontscale",String(e.fontScale)),n.setAttribute("data-a11y-contrast",e.contrast),n.setAttribute("data-a11y-focus",e.focusRing?"enhanced":"default"),n.setAttribute("data-a11y-links",e.linkUnderline?"underline":"default"),n.setAttribute("data-a11y-motion",e.motion),n.setAttribute("data-a11y-dyslexia",String(e.dyslexiaFont)),n.setAttribute("data-a11y-reading",String(e.readingMode)),n.setAttribute("data-a11y-lineheight",e.lineHeight),n.setAttribute("data-a11y-letterspacing",e.letterSpacing),n.setAttribute("data-a11y-textalign",e.textAlign),n.setAttribute("data-a11y-headings",String(e.highlightHeadings)),n.setAttribute("data-a11y-saturation",e.saturation),n.setAttribute("data-a11y-cursor",e.cursorSize),n.setAttribute("data-a11y-hideimages",String(e.hideImages)),ot(e))}function ve(){if(typeof window>"u"||typeof window.matchMedia!="function")return{reducedMotion:!1,contrast:"normal",colorScheme:"no-preference"};let e=!1,n="normal",t="no-preference";try{e=window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{}try{window.matchMedia("(prefers-contrast: more)").matches?n="more":window.matchMedia("(prefers-contrast: less)").matches&&(n="less")}catch{}try{window.matchMedia("(prefers-color-scheme: dark)").matches?t="dark":window.matchMedia("(prefers-color-scheme: light)").matches&&(t="light")}catch{}return{reducedMotion:e,contrast:n,colorScheme:t}}function it(){if(typeof document>"u")return!1;const e=document.styleSheets;if(!e)return!1;for(let n=0;n<e.length;n++){const t=e[n];if(!t)continue;let o=null;try{o=t.cssRules??null}catch{continue}if(o)for(let i=0;i<o.length;i++){const r=o[i];if(!r||r.type!==1)continue;const a=r,c=a.selectorText??"";if(!at(c))continue;const p=a.style;if(p&&(p.getPropertyPriority("color")==="important"||p.getPropertyPriority("background-color")==="important"||p.getPropertyPriority("background")==="important"))return!0}}return!1}function at(e){const n=e.toLowerCase();return/(^|[\s,>+~])(body|a)([\s,:.\[#>+~]|$)/.test(n)}function st(e){if(typeof window>"u"||typeof window.matchMedia!="function")return()=>{};const n=["(prefers-reduced-motion: reduce)","(prefers-contrast: more)","(prefers-contrast: less)","(prefers-color-scheme: dark)","(prefers-color-scheme: light)"],t=[],o=()=>{e(ve())};for(const i of n)try{const r=window.matchMedia(i);typeof r.addEventListener=="function"?r.addEventListener("change",o):typeof r.addListener=="function"&&r.addListener(o),t.push(r)}catch{}return()=>{for(const i of t)try{typeof i.removeEventListener=="function"?i.removeEventListener("change",o):typeof i.removeListener=="function"&&i.removeListener(o)}catch{}}}const en="2.0.0-alpha.0",nn=50,lt=10,T={issues:[],startTime:typeof performance<"u"?performance.now():Date.now(),devPipeUrl:null,devPipeLastSent:[]};function tn(){try{if(typeof process<"u"&&typeof process.env<"u"&&process.env.NODE_ENV&&process.env.NODE_ENV!=="production")return"verbose"}catch{}if(typeof window>"u"||typeof document>"u")return"silent";try{if(new URLSearchParams(window.location.search).get("a11y-debug")==="1")return"verbose"}catch{}try{const e=document.currentScript;if(e&&e.dataset&&e.dataset.debug==="true"||document.querySelector('script[data-debug="true"]'))return"verbose"}catch{}try{const e=window;if(e.__BLAKFY_A11Y__&&e.__BLAKFY_A11Y__.debug===!0)return"verbose"}catch{}return"silent"}function ct(e){return e==="info"?"✓":e==="warn"?"⚠":"✗"}function rn(e,n){if(typeof console>"u")return;const t=`[blakfy-a11y v${en}] ${ct(e)} ${n}`;e==="error"&&typeof console.error=="function"?console.error(t):e==="warn"&&typeof console.warn=="function"?console.warn(t):typeof console.info=="function"?console.info(t):typeof console.log=="function"&&console.log(t)}function on(e,n,t){const o=T.devPipeUrl;if(!o||tn()!=="verbose"||typeof fetch!="function")return;const i=Date.now();if(T.devPipeLastSent=T.devPipeLastSent.filter(r=>i-r<1e3),!(T.devPipeLastSent.length>=lt)){T.devPipeLastSent.push(i);try{const r=JSON.stringify({level:e,code:n,msg:t,timestamp:new Date(i).toISOString()});fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:r,keepalive:!0}).catch(()=>{})}catch{}}}function A(e,n,t,o){const i=tn();if(e==="info"){i==="verbose"&&(rn("info",t),on("info",n,t));return}rn(e,t);const r={level:e,code:n,timestamp:new Date().toISOString(),msg:t};T.issues.push(r),T.issues.length>nn&&T.issues.splice(0,T.issues.length-nn),on(e,n,t)}function dt(e){T.devPipeUrl=e}function ut(e){const n=ve();return{version:en,locale:e.config.locale,theme:e.config.theme,storage:{version:e.storage.version,migratedFrom:e.storage.migratedFrom,keysFound:[...e.storage.keysFound]},osPreferences:{reducedMotion:n.reducedMotion,contrast:n.contrast,colorScheme:n.colorScheme},performance:{mountTimeMs:e.performance.mountTimeMs,bundleSizeGz:e.performance.bundleSizeGz,timeToFirstClick:e.performance.timeToFirstClick},issues:T.issues.map(t=>({level:t.level,code:t.code,timestamp:t.timestamp,msg:t.msg})),config:{...e.config},timestamp:new Date().toISOString()}}function ke(){return typeof window<"u"}function an(){return typeof document<"u"}function ft(e,n,t){if(!an())return;const o=new Date;o.setTime(o.getTime()+t*864e5);const i=ke()&&window.location&&window.location.protocol==="https:",r=[`${e}=${encodeURIComponent(n)}`,`expires=${o.toUTCString()}`,"path=/","SameSite=Lax"];i&&r.push("Secure"),document.cookie=r.join(";")}function pt(e){if(!an())return null;const n=(document.cookie||"").match(new RegExp(`(^| )${e}=([^;]+)`));if(!n||typeof n[2]!="string")return null;try{return decodeURIComponent(n[2])}catch{return null}}function ht(e){if(!ke())return null;try{return window.localStorage.getItem(e)}catch{return null}}function mt(e,n){if(ke())try{window.localStorage.setItem(e,n)}catch{}}function _t(e){if(e==null)return null;try{return JSON.parse(e)}catch{return null}}function gt(e){return e.version===N?{record:e,migrated:!1,migratedFrom:null}:{record:{prefs:{...S,...e.prefs},version:N,timestamp:new Date().toISOString(),locale:e.locale||"en"},migrated:!0,migratedFrom:e.version}}function sn(){const e=[],n=ht(Ve);n!=null&&e.push("localStorage");const t=pt(Ye);t!=null&&e.push("cookie");let o=null,i=null;if(n!=null?(o=n,i="localStorage"):t!=null&&(o=t,i="cookie"),o==null)return{source:null,record:null,migrated:!1,migratedFrom:null,keysFound:e};const r=_t(o);if(r==null)return A("error","STORAGE_PARSE_ERROR",`Failed to parse stored preferences from ${i}`),{source:i,record:null,migrated:!1,migratedFrom:null,keysFound:e};const a=tt(r);if(!a)return A("error","STORAGE_PARSE_ERROR",`Stored preferences in ${i} did not match schema`),{source:i,record:null,migrated:!1,migratedFrom:null,keysFound:e};const{record:c,migrated:p,migratedFrom:u}=gt(a);return p&&A("info","STORAGE_MIGRATED",`Storage migrated: ${u??"unknown"} → ${N}`),{source:i,record:c,migrated:p,migratedFrom:u,keysFound:e}}function bt(e){const n=JSON.stringify(e);mt(Ve,n),ft(Ye,n,365)}function ie(){const e=sn();return e.record?{...S,...e.record.prefs}:{...S}}function we(e,n="en"){const t=ie(),o=Xe({...t,...e}),i={prefs:o,version:N,timestamp:new Date().toISOString(),locale:n};return bt(i),oe(o),I(E.CHANGE,i),i}function ln(e="en"){return we({...S},e)}function yt(){const e=sn();return{version:e.record?.version??N,migratedFrom:e.migratedFrom,keysFound:e.keysFound}}const vt={label:"Accessibility preferences"},kt={title:"Accessibility Preferences",description:"Adjust your viewing preferences.",reset:"Reset",close:"Close",disclaimer:"This panel provides personal preference controls; structural accessibility is built into the site itself.",theme:{label:"Display Theme",auto:"Auto",light:"Light",dark:"Dark"},branding:"Powered by Blakfy Studio",sections:{profiles:"Accessibility Profiles",text:"Text",vision:"Vision",navigation:"Navigation",motion:"Motion & Reading"},profiles:{epilepsy:{name:"Epilepsy Safe",description:"Reduces animations and desaturates colors"},vision:{name:"Visual Impairment",description:"High contrast and enlarged text"},cognitive:{name:"Cognitive",description:"Reduces distractions, aids readability"},adhd:{name:"ADHD Friendly",description:"Hides images, stops motion"},blindness:{name:"Screen Reader",description:"Optimised for assistive technology"}},preferences:{fontScale:{title:"Font Size",description:"Scales all text proportionally across the page. Ideal for small screens or users with low vision; changes apply instantly everywhere.",values:{100:"Normal",110:"Large",125:"Extra Large"}},lineHeight:{title:"Line Height",description:"Increases vertical spacing between lines of text, improving readability for users with dyslexia or cognitive disabilities.",values:{normal:"Normal",medium:"Medium",large:"Large"}},letterSpacing:{title:"Letter Spacing",description:"Adds extra space between characters to reduce crowding and improve text clarity.",values:{normal:"Normal",medium:"Medium",large:"Large"}},textAlign:{title:"Text Alignment",description:"Changes the alignment of body text and headings across the page.",values:{default:"Default",left:"Left",center:"Center",right:"Right"}},highlightHeadings:{title:"Highlight Headings",description:"Adds a visible blue outline around all headings to make page structure easier to navigate."},contrast:{title:"High Contrast",description:"Applies a black background with high-visibility yellow links meeting the WCAG AAA 7:1 contrast ratio. Designed for users with visual impairments or colour blindness."},saturation:{title:"Color Saturation",description:"Adjusts color intensity. Use Grayscale to remove all color — useful for color blindness or reducing visual distraction.",values:{normal:"Normal",high:"High",low:"Low",none:"Grayscale"}},focusRing:{title:"Enhanced Focus Ring",description:"Displays a bold 4px blue outline around the focused element during keyboard navigation. Essential for users who cannot use or prefer not to use a mouse."},linkUnderline:{title:"Underline Links",description:"Adds underlines to all hyperlinks on the page. Helps users who cannot distinguish links from regular text by colour alone."},cursorSize:{title:"Cursor Size",description:"Enlarges the mouse cursor for better screen visibility. Choose dark or light to suit your background.",values:{default:"Default",largeDark:"Large Dark",largeLight:"Large Light"}},motion:{title:"Reduce Motion",description:"Disables page animations, transitions and scroll effects. Recommended for users with vestibular disorders, epilepsy or motion sensitivity."},dyslexiaFont:{title:"Dyslexia-Friendly Font",description:"Applies the OpenDyslexic typeface, adding extra weight to letter bottoms to reduce confusion between similar characters (b/d, p/q) and improve readability.",note:"Some readers find this helpful; research has not established universal benefit."},readingMode:{title:"Reading Mode",description:"Hides sidebars, banners and distracting side content so you can focus on the main text. Ideal for long articles or visually busy pages."},hideImages:{title:"Hide Images",description:"Hides all images on the page, reducing visual distraction. Useful for users sensitive to visual stimuli or on slow connections."}}},U={fab:vt,panel:kt},xe=new Map;xe.set("en",U);function wt(e){if(!e||typeof e!="object")return!1;const n=e,t=n.fab,o=n.panel;return!(!t||typeof t.label!="string"||!o||typeof o.title!="string")}async function cn(e,n){const t=xe.get(e);if(t)return t;if(typeof fetch!="function")return A("warn","LOCALE_FETCH_FAILED",`fetch unavailable, using en fallback for ${e}`),U;const o=`${(n||"").replace(/\/$/,"")}/locales/${e}.json`;try{const i=await fetch(o);if(!i.ok)return A("warn","LOCALE_FETCH_FAILED",`Locale fetch failed (${i.status}): ${o}`),U;const r=await i.json();return wt(r)?(xe.set(e,r),r):(A("warn","LOCALE_FETCH_FAILED",`Locale ${e} payload missing required fields`),U)}catch(i){const r=i instanceof Error?i.message:String(i);return A("warn","LOCALE_FETCH_FAILED",`Locale fetch threw for ${e}: ${r}`),U}}function dn(){return U}var xt=0;function l(e,n,t,o,i,r){n||(n={});var a,c,p=n;if("ref"in p)for(c in p={},n)c=="ref"?a=n[c]:p[c]=n[c];var u={type:e,props:p,key:t,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--xt,__i:-1,__u:0,__source:i,__self:r};if(typeof e=="function"&&(a=e.defaultProps))for(c in a)p[c]===void 0&&(p[c]=a[c]);return g.vnode&&g.vnode(u),u}var B,x,Se,un,ae=0,fn=[],C=g,pn=C.__b,hn=C.__r,mn=C.diffed,_n=C.__c,gn=C.unmount,bn=C.__;function se(e,n){C.__h&&C.__h(x,e,ae||n),ae=0;var t=x.__H||(x.__H={__:[],__h:[]});return e>=t.__.length&&t.__.push({}),t.__[e]}function Ce(e){return ae=1,St(wn,e)}function St(e,n,t){var o=se(B++,2);if(o.t=e,!o.__c&&(o.__=[wn(void 0,n),function(c){var p=o.__N?o.__N[0]:o.__[0],u=o.t(p,c);p!==u&&(o.__N=[u,o.__[1]],o.__c.setState({}))}],o.__c=x,!x.__f)){var i=function(c,p,u){if(!o.__c.__H)return!0;var m=o.__c.__H.__.filter(function(h){return h.__c});if(m.every(function(h){return!h.__N}))return!r||r.call(this,c,p,u);var s=o.__c.props!==c;return m.some(function(h){if(h.__N){var f=h.__[0];h.__=h.__N,h.__N=void 0,f!==h.__[0]&&(s=!0)}}),r&&r.call(this,c,p,u)||s};x.__f=!0;var r=x.shouldComponentUpdate,a=x.componentWillUpdate;x.componentWillUpdate=function(c,p,u){if(this.__e){var m=r;r=void 0,i(c,p,u),r=m}a&&a.call(this,c,p,u)},x.shouldComponentUpdate=i}return o.__N||o.__}function j(e,n){var t=se(B++,3);!C.__s&&kn(t.__H,n)&&(t.__=e,t.u=n,x.__H.__h.push(t))}function le(e){return ae=5,Ct(function(){return{current:e}},[])}function Ct(e,n){var t=se(B++,7);return kn(t.__H,n)&&(t.__=e(),t.__H=n,t.__h=e),t.__}function yn(){var e=se(B++,11);if(!e.__){for(var n=x.__v;n!==null&&!n.__m&&n.__!==null;)n=n.__;var t=n.__m||(n.__m=[0,0]);e.__="P"+t[0]+"-"+t[1]++}return e.__}function At(){for(var e;e=fn.shift();){var n=e.__H;if(e.__P&&n)try{n.__h.some(ce),n.__h.some(Ae),n.__h=[]}catch(t){n.__h=[],C.__e(t,e.__v)}}}C.__b=function(e){x=null,pn&&pn(e)},C.__=function(e,n){e&&n.__k&&n.__k.__m&&(e.__m=n.__k.__m),bn&&bn(e,n)},C.__r=function(e){hn&&hn(e),B=0;var n=(x=e.__c).__H;n&&(Se===x?(n.__h=[],x.__h=[],n.__.some(function(t){t.__N&&(t.__=t.__N),t.u=t.__N=void 0})):(n.__h.some(ce),n.__h.some(Ae),n.__h=[],B=0)),Se=x},C.diffed=function(e){mn&&mn(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(fn.push(n)!==1&&un===C.requestAnimationFrame||((un=C.requestAnimationFrame)||Et)(At)),n.__H.__.some(function(t){t.u&&(t.__H=t.u),t.u=void 0})),Se=x=null},C.__c=function(e,n){n.some(function(t){try{t.__h.some(ce),t.__h=t.__h.filter(function(o){return!o.__||Ae(o)})}catch(o){n.some(function(i){i.__h&&(i.__h=[])}),n=[],C.__e(o,t.__v)}}),_n&&_n(e,n)},C.unmount=function(e){gn&&gn(e);var n,t=e.__c;t&&t.__H&&(t.__H.__.some(function(o){try{ce(o)}catch(i){n=i}}),t.__H=void 0,n&&C.__e(n,t.__v))};var vn=typeof requestAnimationFrame=="function";function Et(e){var n,t=function(){clearTimeout(o),vn&&cancelAnimationFrame(n),setTimeout(e)},o=setTimeout(t,35);vn&&(n=requestAnimationFrame(t))}function ce(e){var n=x,t=e.__c;typeof t=="function"&&(e.__c=void 0,t()),x=n}function Ae(e){var n=x;e.__c=e.__(),x=n}function kn(e,n){return!e||e.length!==n.length||n.some(function(t,o){return t!==e[o]})}function wn(e,n){return typeof n=="function"?n(e):n}function $t(e){return l("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:[l("circle",{cx:"12",cy:"4",r:"2"}),l("path",{d:"M12 6v8"}),l("path",{d:"M5 9h14"}),l("path",{d:"M9 14l-2 7"}),l("path",{d:"M15 14l2 7"})]})}function Lt(e){return l("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",...e,children:[l("circle",{cx:"12",cy:"3",r:"2"}),l("path",{d:"M19 8.5c0 .55-.45 1-1 1h-4v3l3 7c.16.4-.04.86-.45 1l-1.42.5c-.4.16-.86-.04-1-.45L11.5 14h-1l-2.65 6.55c-.16.4-.6.6-1 .45l-1.42-.5c-.4-.16-.6-.6-.45-1l3-7v-3H6c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v1z"})]})}function Tt(e){return l("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:[l("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),l("circle",{cx:"12",cy:"12",r:"3"})]})}function Rt(e){return l("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:l("path",{d:"M5 5l10 10M15 5L5 15"})})}function Mt(e){return l("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:[l("path",{d:"M12 2L2 7l10 5 10-5-10-5z"}),l("path",{d:"M2 17l10 5 10-5"}),l("path",{d:"M2 12l10 5 10-5"})]})}function Ht({name:e}){return e==="walking"?l($t,{}):e==="eye"?l(Tt,{}):l(Lt,{})}function Pt({iconStyle:e,ariaLabel:n,isOpen:t,onClick:o}){return l("button",{type:"button",class:"fab","aria-haspopup":"dialog","aria-expanded":t,"aria-label":n,title:n,onClick:o,children:l(Ht,{name:e})})}const It='button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [role="switch"]:not([aria-disabled="true"])';function Ot(e=document){let n=e.activeElement;for(;n;){const t=n.shadowRoot;if(!t||!t.activeElement)break;n=t.activeElement}return n}function xn(e){if(!e)return[];const n=e.querySelectorAll(It);return Array.from(n).filter(t=>{if(t.hasAttribute("disabled"))return!1;const o=t.getAttribute("tabindex");return o&&Number(o)<0?!1:t.offsetParent!==null||t.getClientRects().length>0})}function Dt({open:e,onClose:n,titleId:t,descriptionId:o,children:i}){const r=le(null),a=le(null),c=le(n);return c.current=n,j(()=>{if(!e||typeof document>"u")return;const u=document.documentElement,m=u.style.overflow;return u.style.overflow="hidden",()=>{u.style.overflow=m}},[e]),j(()=>{if(!e||typeof document>"u")return;a.current=Ot(document);const u=window.setTimeout(()=>{(xn(r.current)[0]??r.current)?.focus()},0),m=s=>{if(s.key==="Escape"){s.preventDefault(),c.current();return}if(s.key!=="Tab")return;const h=xn(r.current);if(h.length===0){s.preventDefault(),r.current?.focus();return}const f=h[0],v=h[h.length-1];if(!f||!v)return;const _=r.current?.getRootNode(),w=_&&"activeElement"in _?_.activeElement:document.activeElement;s.shiftKey?(w===f||!r.current?.contains(w))&&(s.preventDefault(),v.focus()):w===v&&(s.preventDefault(),f.focus())};return document.addEventListener("keydown",m),()=>{window.clearTimeout(u),document.removeEventListener("keydown",m);const s=a.current;s&&s instanceof HTMLElement&&s.focus()}},[e]),e?l("div",{class:"backdrop",onClick:u=>{u.target===u.currentTarget&&n()},children:l("div",{ref:r,class:"dialog",role:"dialog","aria-modal":"true","aria-labelledby":t,"aria-describedby":o,tabIndex:-1,children:i})}):null}function Ft({checked:e,onChange:n,ariaLabel:t,ariaLabelledBy:o,ariaDescribedBy:i,disabled:r=!1}){return l("button",{type:"button",class:"switch",role:"switch","aria-checked":e,"aria-label":o?void 0:t,"aria-labelledby":o,"aria-describedby":i,"aria-disabled":r||void 0,tabIndex:r?-1:0,onClick:()=>{r||n(!e)},onKeyDown:p=>{r||(p.key===" "||p.key==="Enter"||p.key==="Spacebar")&&(p.preventDefault(),n(!e))},children:l("span",{class:"switch-thumb","aria-hidden":"true"})})}function O({title:e,description:n,note:t,checked:o,onChange:i}){const r=yn(),a=`${r}-title`,c=`${r}-desc`;return l("div",{class:"toggle-row",children:[l("div",{class:"toggle-text",children:[l("p",{class:"toggle-title",id:a,children:e}),l("p",{class:"toggle-desc",id:c,children:n}),t?l("p",{class:"toggle-note",children:t}):null]}),l(Ft,{checked:o,onChange:i,ariaLabel:e,ariaLabelledBy:a,ariaDescribedBy:c})]})}const zt=["auto","light","dark"],Sn=["normal","medium","large"],Cn=["normal","medium","large"],Nt=["default","left","center","right"],Ut=["normal","high","low","none"],Bt=["default","large-dark","large-light"],An={epilepsy:{motion:"reduce",saturation:"low"},vision:{fontScale:125,contrast:"high"},cognitive:{readingMode:!0,lineHeight:"medium",motion:"reduce"},adhd:{motion:"reduce",hideImages:!0},blindness:{focusRing:!0,linkUnderline:!0,highlightHeadings:!0}};function jt({profileKey:e}){return{epilepsy:l("svg",{"aria-hidden":"true",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:l("path",{d:"M11 2L4 11h6l-1 7 7-9h-6l1-7z",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})}),vision:l("svg",{"aria-hidden":"true",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l("path",{d:"M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"}),l("circle",{cx:"10",cy:"10",r:"2.5",stroke:"currentColor","stroke-width":"1.5"})]}),cognitive:l("svg",{"aria-hidden":"true",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l("path",{d:"M10 3C6.13 3 3 6.13 3 10c0 2.38 1.19 4.47 3 5.74V17h8v-1.26C15.81 14.47 17 12.38 17 10c0-3.87-3.13-7-7-7z",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"}),l("path",{d:"M7 10h6M10 7v6",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"})]}),adhd:l("svg",{"aria-hidden":"true",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l("circle",{cx:"10",cy:"10",r:"7",stroke:"currentColor","stroke-width":"1.5"}),l("circle",{cx:"10",cy:"10",r:"3",stroke:"currentColor","stroke-width":"1.5"}),l("circle",{cx:"10",cy:"10",r:"1",fill:"currentColor"})]}),blindness:l("svg",{"aria-hidden":"true",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l("path",{d:"M10 4a6 6 0 100 12A6 6 0 0010 4z",stroke:"currentColor","stroke-width":"1.5"}),l("path",{d:"M10 8v4M8 16l4-4",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"})]})}[e]}const Ee=({title:e,value:n,options:t,labels:o,onChange:i})=>{const r=t.indexOf(n),a=r>0,c=r<t.length-1;return l("div",{class:"stepper-row",children:[l("span",{class:"stepper-row-title",children:e}),l("div",{class:"stepper",children:[l("button",{type:"button",class:"stepper-btn",disabled:!a,onClick:()=>a&&i(t[r-1]),"aria-label":"azalt",children:"−"}),l("span",{class:"stepper-value",children:o[r]??n}),l("button",{type:"button",class:"stepper-btn",disabled:!c,onClick:()=>c&&i(t[r+1]),"aria-label":"artır",children:"+"})]})]})};function Gt({translation:e,locale:n,currentTheme:t,onClose:o,onThemeChange:i,titleId:r}){const a=e.panel,[c,p]=Ce(()=>ie()),[u,m]=Ce(!1),s=le(null);j(()=>K(E.CHANGE,d=>{p(d.prefs)}),[]),j(()=>()=>{s.current&&clearTimeout(s.current)},[]);const h=d=>{const b={...c,...d};p(b),we(d,n),oe(b)},f=(d,b)=>{h({[d]:b})},v=d=>{const b=An[d];return Object.entries(b).every(([k,L])=>c[k]===L)},_=d=>{const b=An[d];if(v(d)){const k={};for(const L of Object.keys(b))k[L]=S[L];h(k)}else h(b)},w=()=>{if(!u){m(!0),s.current&&clearTimeout(s.current),s.current=setTimeout(()=>m(!1),3e3);return}s.current&&clearTimeout(s.current),m(!1);const d=ln(n);p(d.prefs),oe(d.prefs)},y=d=>d==="auto"?a.theme.auto:d==="light"?a.theme.light:a.theme.dark;return l(F,{children:[l("div",{class:"panel-header",children:[l("h2",{class:"panel-title",id:r,children:a.title}),l("button",{type:"button",class:"dialog-close","aria-label":a.close,onClick:o,children:l(Rt,{})})]}),l("p",{class:"section-label",children:a.sections.profiles}),l("div",{class:"profile-list",children:["epilepsy","vision","cognitive","adhd","blindness"].map(d=>{const b=v(d),k=a.profiles[d];return l("button",{type:"button",class:`profile-list-item${b?" profile-list-item--active":""}`,"aria-pressed":b,onClick:()=>_(d),children:[l("span",{class:"profile-list-icon",children:l(jt,{profileKey:d})}),l("span",{class:"profile-list-text",children:[l("span",{class:"profile-list-name",children:k.name}),l("span",{class:"profile-list-desc",children:k.description})]}),l("span",{class:"switch","aria-checked":b,role:"presentation","aria-hidden":"true",children:l("span",{class:"switch-thumb"})})]},d)})}),l("p",{class:"section-label",children:a.sections.text}),l(Ee,{title:a.preferences.fontScale.title,value:String(c.fontScale),options:["100","110","125"],labels:["100","110","125"].map(d=>a.preferences.fontScale.values[d]),onChange:d=>f("fontScale",Number(d))}),l(Ee,{title:a.preferences.lineHeight.title,value:c.lineHeight,options:Sn,labels:Sn.map(d=>a.preferences.lineHeight.values[d]),onChange:d=>f("lineHeight",d)}),l(Ee,{title:a.preferences.letterSpacing.title,value:c.letterSpacing,options:Cn,labels:Cn.map(d=>a.preferences.letterSpacing.values[d]),onChange:d=>f("letterSpacing",d)}),l("div",{style:"padding: 0 1rem 0.25rem",children:l("p",{class:"opt-section-title",children:a.preferences.textAlign.title})}),l("div",{class:"opt-buttons",children:Nt.map(d=>l("button",{type:"button",class:"opt-btn","aria-pressed":c.textAlign===d,onClick:()=>f("textAlign",d),children:a.preferences.textAlign.values[d]},d))}),l(O,{title:a.preferences.dyslexiaFont.title,description:a.preferences.dyslexiaFont.description,note:a.preferences.dyslexiaFont.note,checked:c.dyslexiaFont,onChange:d=>f("dyslexiaFont",d)}),l(O,{title:a.preferences.highlightHeadings.title,description:a.preferences.highlightHeadings.description,checked:c.highlightHeadings,onChange:d=>f("highlightHeadings",d)}),l("p",{class:"section-label",children:a.sections.vision}),l(O,{title:a.preferences.contrast.title,description:a.preferences.contrast.description,checked:c.contrast==="high",onChange:d=>f("contrast",d?"high":"normal")}),l("div",{style:"padding: 0 1rem 0.25rem",children:l("p",{class:"opt-section-title",children:a.preferences.saturation.title})}),l("div",{class:"opt-buttons",children:Ut.map(d=>l("button",{type:"button",class:"opt-btn","aria-pressed":c.saturation===d,onClick:()=>f("saturation",d),children:a.preferences.saturation.values[d]},d))}),l("p",{class:"section-label",children:a.sections.navigation}),l(O,{title:a.preferences.focusRing.title,description:a.preferences.focusRing.description,checked:c.focusRing,onChange:d=>f("focusRing",d)}),l(O,{title:a.preferences.linkUnderline.title,description:a.preferences.linkUnderline.description,checked:c.linkUnderline,onChange:d=>f("linkUnderline",d)}),l("div",{style:"padding: 0 1rem 0.25rem",children:l("p",{class:"opt-section-title",children:a.preferences.cursorSize.title})}),l("div",{class:"opt-buttons",children:Bt.map((d,b)=>l("button",{type:"button",class:"opt-btn","aria-pressed":c.cursorSize===d,onClick:()=>f("cursorSize",d),children:[a.preferences.cursorSize.values.default,a.preferences.cursorSize.values.largeDark,a.preferences.cursorSize.values.largeLight][b]},d))}),l("p",{class:"section-label",children:a.sections.motion}),l(O,{title:a.preferences.motion.title,description:a.preferences.motion.description,checked:c.motion==="reduce",onChange:d=>f("motion",d?"reduce":"auto")}),l(O,{title:a.preferences.readingMode.title,description:a.preferences.readingMode.description,checked:c.readingMode,onChange:d=>f("readingMode",d)}),l(O,{title:a.preferences.hideImages.title,description:a.preferences.hideImages.description,checked:c.hideImages,onChange:d=>f("hideImages",d)}),l("p",{class:"section-label",children:a.theme.label}),l("div",{class:"opt-buttons",role:"group","aria-label":a.theme.label,children:zt.map(d=>l("button",{type:"button",class:"opt-btn","aria-pressed":t===d,onClick:()=>i(d),children:y(d)},d))}),l("div",{class:"panel-footer",children:[l("div",{class:"sr-only",role:"status","aria-live":"polite",children:u?`${a.reset}?`:""}),l("button",{type:"button",class:"btn-reset",onClick:w,"aria-pressed":u,"data-confirm":u?"true":void 0,children:u?`${a.reset}?`:a.reset}),l("p",{class:"disclaimer",style:"margin-top:0.75rem; font-size:10px; color:rgba(241,245,249,0.35); font-style:italic; line-height:1.5",children:a.disclaimer}),l("a",{class:"panel-branding",href:"https://blakfy.com",target:"_blank",rel:"noopener noreferrer","aria-label":"Blakfy Studio — blakfy.com",children:[l("span",{class:"panel-branding-powered",children:"Powered by"}),l("span",{class:"panel-branding-name",children:"Blakfy Studio"})]})]})]})}const qt="https://blakfy.com";function Wt(){return l("a",{class:"badge",href:qt,target:"_blank",rel:"noopener noreferrer","aria-label":"Powered by Blakfy Studio — opens blakfy.com in a new tab",children:[l(Mt,{}),l("span",{children:["Powered by ",l("strong",{children:"Blakfy Studio"})]})]})}function Kt({config:e,translation:n,iconStyle:t="access",keyboardShortcut:o=!0,onThemeChange:i}){const[r,a]=Ce(!1),c=yn(),p=`${c}-title`,u=`${c}-desc`;j(()=>{const h=K(E.OPEN,()=>a(!0)),f=K(E.CLOSE,()=>a(!1));return()=>{h(),f()}},[]),j(()=>{if(!o||typeof window>"u")return;const h=f=>{f.altKey&&f.key==="0"&&(f.preventDefault(),a(v=>v?(I(E.CLOSE,{}),!1):(I(E.OPEN,{}),!0)))};return window.addEventListener("keydown",h),()=>{window.removeEventListener("keydown",h)}},[o]);const m=()=>{a(!0),I(E.OPEN,{})},s=()=>{a(!1),I(E.CLOSE,{})};return l(F,{children:[l(Pt,{iconStyle:t,ariaLabel:n.fab.label,isOpen:r,onClick:m}),l(Dt,{open:r,onClose:s,titleId:p,descriptionId:u,children:l(Gt,{translation:n,locale:e.locale,currentTheme:e.theme,onClose:s,onThemeChange:i??(()=>{}),titleId:p,descriptionId:u})}),l(Wt,{})]})}const Vt=`/*
 * @blakfy/accessibility-widget — Shadow DOM stylesheet
 * Inlined into the Shadow root via <style>. See ADR-003.
 *
 * 15 CSS custom properties from STABLE-API.md §4 are LOCKED — never rename.
 * No \`left:\` / \`right:\` — use \`inset-inline-*\` for RTL safety.
 * No \`!important\` outside of the prefers-reduced-motion override.
 */

/* ==========================================================================
 * 1. Custom property defaults — always dark theme
 * ========================================================================== */
:host {
  /* Locked public API variables */
  --blakfy-a11y-primary: #3b82f6;
  --blakfy-a11y-primary-hover: #60a5fa;
  --blakfy-a11y-primary-text: #ffffff;
  --blakfy-a11y-panel-bg: #13131f;
  --blakfy-a11y-panel-text: #f1f5f9;
  --blakfy-a11y-panel-muted: rgba(241,245,249,0.5);
  --blakfy-a11y-panel-border: rgba(255,255,255,0.08);

  --blakfy-a11y-panel-bg-dark: #13131f;
  --blakfy-a11y-panel-text-dark: #f1f5f9;
  --blakfy-a11y-panel-muted-dark: rgba(241,245,249,0.5);
  --blakfy-a11y-panel-border-dark: rgba(255,255,255,0.08);

  /* Switch */
  --blakfy-a11y-toggle-on: #3b82f6;
  --blakfy-a11y-toggle-off: #3a3a5c;

  /* Focus */
  --blakfy-a11y-focus-ring: #3b82f6;

  /* Sizes */
  --blakfy-a11y-fab-size: 48px;

  /* Internal aliases — always dark */
  --__bg: #13131f;
  --__text: #f1f5f9;
  --__muted: rgba(241,245,249,0.5);
  --__border: rgba(255,255,255,0.08);
}

/* ==========================================================================
 * 2. Theme switch — dark mode (same values, kept for compat)
 * ========================================================================== */
:host([data-theme="dark"]) {
  --__bg: #13131f;
  --__text: #f1f5f9;
  --__muted: rgba(241,245,249,0.5);
  --__border: rgba(255,255,255,0.08);
  --blakfy-a11y-primary: #3b82f6;
  --blakfy-a11y-primary-hover: #60a5fa;
  --blakfy-a11y-focus-ring: #3b82f6;
  --blakfy-a11y-toggle-on: #3b82f6;
  --blakfy-a11y-toggle-off: #3a3a5c;
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
 * 6. Floating badge
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
 * 7. Dialog — sağdan kayan tam yükseklik sidebar
 * ========================================================================== */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 9999;
  animation: blakfy-fade-in 200ms ease forwards;
}

.backdrop[data-state="closing"] {
  animation: blakfy-fade-out 180ms ease forwards;
}

.dialog {
  position: fixed;
  inset-block-start: 0;
  inset-inline-end: 0;
  inline-size: 340px;
  max-inline-size: 100vw;
  block-size: 100vh;
  max-block-size: 100vh;
  overflow-y: auto;
  background: #13131f;
  color: #f1f5f9;
  border-radius: 0;
  padding: 0;
  z-index: 10000;
  box-shadow: -8px 0 32px rgba(0,0,0,0.5);
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.15) transparent;
  animation: blakfy-slide-in-right 220ms ease forwards;
}

.dialog[data-state="closing"] {
  animation: blakfy-slide-out-right 180ms ease forwards;
}

.dialog:focus {
  outline: none;
}

/* ==========================================================================
 * 8. Panel header — sticky
 * ========================================================================== */
.panel-header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem 0.875rem;
  background: #13131f;
  border-block-end: 1px solid rgba(255,255,255,0.08);
}

.panel-title {
  font-size: clamp(14px, 3vw, 16px);
  font-weight: 600;
  line-height: 1.2;
  color: #f1f5f9;
}

.panel-desc {
  margin-block-start: 0.5rem;
  font-size: clamp(11px, 2vw, 13px);
  line-height: 1.5;
  color: rgba(241,245,249,0.5);
}

.dialog-close {
  width: 32px;
  height: 32px;
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: rgba(241,245,249,0.6);
  transition: background-color 150ms ease, color 150ms ease;
  flex-shrink: 0;
}

.dialog-close:hover {
  background: rgba(255,255,255,0.08);
  color: #f1f5f9;
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
 * 9. Section labels
 * ========================================================================== */
.section-label {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(241,245,249,0.45);
  padding: 0.875rem 1rem 0.375rem;
}

.opt-section-title {
  font-size: 11.5px;
  font-weight: 600;
  color: rgba(241,245,249,0.7);
  margin-block-end: 0.375rem;
}

/* ==========================================================================
 * 10. Switch — daha büyük ve belirgin
 * ========================================================================== */
.switch {
  position: relative;
  flex-shrink: 0;
  inline-size: 42px;
  block-size: 24px;
  border-radius: 9999px;
  background: #3a3a5c;
  transition: background-color 200ms ease;
}

.switch[aria-checked="true"] {
  background: #3b82f6;
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
  inline-size: 20px;
  block-size: 20px;
  border-radius: 9999px;
  background: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  transition: transform 200ms ease;
}

.switch[aria-checked="true"] .switch-thumb {
  transform: translateX(18px);
}

[dir="rtl"] .switch[aria-checked="true"] .switch-thumb {
  transform: translateX(-18px);
}

/* ==========================================================================
 * 11. Profile list (dikey liste)
 * ========================================================================== */
.profile-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0 1rem;
}

.profile-list-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.875rem;
  background: #1e1e30;
  border-radius: 8px;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: border-color 150ms ease, background 150ms ease;
  text-align: start;
  width: 100%;
}

.profile-list-item:hover {
  background: #252544;
}

.profile-list-item--active {
  border-color: #3b82f6;
  background: #1a2040;
}

.profile-list-item:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
  outline-offset: 2px;
}

.profile-list-icon {
  color: #3b82f6;
  flex-shrink: 0;
}

.profile-list-icon svg {
  width: 16px;
  height: 16px;
}

.profile-list-text {
  flex: 1;
  min-width: 0;
}

.profile-list-name {
  font-size: 12.5px;
  font-weight: 600;
  color: #f1f5f9;
  line-height: 1.2;
  display: block;
}

.profile-list-desc {
  font-size: 10.5px;
  color: rgba(241,245,249,0.5);
  line-height: 1.3;
  margin-top: 2px;
  display: block;
}

/* Profile list içindeki switch pointer-events: none (tıklama butona ait) */
.profile-list-item .switch {
  pointer-events: none;
}

/* ==========================================================================
 * 12. Stepper row
 * ========================================================================== */
.stepper-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 1rem;
  background: #1e1e30;
  border-radius: 8px;
  margin: 0 1rem 0.375rem;
}

.stepper-row-title {
  font-size: 12.5px;
  font-weight: 600;
  color: #f1f5f9;
}

.stepper {
  display: flex;
  align-items: center;
  gap: 0;
  background: #13131f;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.12);
}

.stepper-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  font-size: 18px;
  font-weight: 300;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 6px;
  flex-shrink: 0;
}

.stepper-btn:disabled {
  color: rgba(255,255,255,0.2);
  cursor: default;
}

.stepper-btn:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
}

.stepper-value {
  min-width: 60px;
  text-align: center;
  font-size: 11.5px;
  font-weight: 500;
  color: #f1f5f9;
  padding: 0 0.25rem;
}

/* ==========================================================================
 * 13. Toggle row (koyu kart)
 * ========================================================================== */
.toggle-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  background: #1e1e30;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px;
  padding: 0.75rem 0.875rem;
  margin: 0 1rem 0.25rem;
}

.toggle-text {
  flex: 1;
  min-width: 0;
}

.toggle-title {
  font-size: clamp(11px, 2vw, 13px);
  font-weight: 600;
  line-height: 1.25;
  color: #f1f5f9;
}

.toggle-desc {
  margin-block-start: 0.2rem;
  font-size: clamp(10px, 1.7vw, 11.5px);
  line-height: 1.5;
  color: rgba(241,245,249,0.5);
}

.toggle-note {
  margin-block-start: 0.2rem;
  font-size: clamp(9px, 1.5vw, 10.5px);
  font-style: italic;
  line-height: 1.4;
  color: #fbbf24;
}

/* ==========================================================================
 * 14. Opt buttons (karanlık tema)
 * ========================================================================== */
.opt-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  padding: 0 1rem 0.375rem;
}

.opt-btn {
  min-block-size: 32px;
  padding-inline: 0.625rem;
  font-size: 11.5px;
  font-weight: 500;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 6px;
  color: rgba(241,245,249,0.8);
  white-space: nowrap;
  flex: 1;
  min-inline-size: fit-content;
  background: transparent;
  transition: background 150ms, border-color 150ms, color 150ms;
}

.opt-btn:hover {
  background: rgba(255,255,255,0.07);
  border-color: rgba(255,255,255,0.25);
}

.opt-btn[aria-pressed="true"] {
  background: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
}

.opt-btn:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
  outline-offset: 2px;
}

/* ==========================================================================
 * 15. Panel footer
 * ========================================================================== */
.panel-footer {
  padding: 1rem;
  border-block-start: 1px solid rgba(255,255,255,0.08);
  margin-block-start: 0.5rem;
}

/* ==========================================================================
 * 16. Reset butonu
 * ========================================================================== */
.btn-reset {
  width: 100%;
  min-block-size: 40px;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 8px;
  color: rgba(241,245,249,0.8);
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 150ms, border-color 150ms;
}

.btn-reset:hover {
  background: rgba(255,255,255,0.07);
  border-color: rgba(255,255,255,0.3);
}

.btn-reset[data-confirm="true"] {
  background: #dc2626;
  border-color: #dc2626;
  color: #fff;
}

.btn-reset:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
  outline-offset: 2px;
}

/* ==========================================================================
 * 17. Disclaimer + branding
 * ========================================================================== */
.disclaimer {
  font-size: clamp(9px, 1.5vw, 11px);
  font-style: italic;
  line-height: 1.45;
  color: rgba(241,245,249,0.35);
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
  background: rgba(59, 130, 246, 0.08);
}

.panel-branding:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
  outline-offset: 2px;
  border-radius: 6px;
}

.panel-branding-powered {
  font-size: 11px;
  font-weight: 400;
  color: rgba(241,245,249,0.5);
}

.panel-branding-name {
  font-size: 11.5px;
  font-weight: 700;
  color: #3b82f6;
}

/* ==========================================================================
 * 18. Animations — slide in/out (sidebar)
 * ========================================================================== */
@keyframes blakfy-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes blakfy-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes blakfy-slide-in-right {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes blakfy-slide-out-right {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
}

/* ==========================================================================
 * 19. Reduced motion
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
 * 20. Responsive (≤480px) — sidebar daha dar
 * ========================================================================== */
@media (max-width: 480px) {
  .fab {
    --blakfy-a11y-fab-size: 44px;
  }

  .dialog {
    inline-size: 100vw;
  }
}

/* ==========================================================================
 * 21. Forced colors / Windows High Contrast
 * ========================================================================== */
@media (forced-colors: active) {
  .fab,
  .btn-reset,
  .opt-btn,
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
`,Yt="2.0.0-alpha.0";function Xt(e){const n={open:()=>I(E.OPEN,{}),close:()=>I(E.CLOSE,{}),getPreferences:()=>ie(),setPreferences:t=>{we(t,e.config.locale)},reset:()=>{ln(e.config.locale)},onChange:t=>K(E.CHANGE,o=>t(o.prefs)),configure:t=>e.configure(t),diagnostics:()=>ut({config:e.config,performance:{mountTimeMs:e.mountTimeMs,bundleSizeGz:e.bundleSizeGz,timeToFirstClick:null},storage:e.storage}),version:Yt};return typeof window<"u"&&(window.BlakfyA11y&&typeof window.BlakfyA11y=="object"?Object.assign(window.BlakfyA11y,n):window.BlakfyA11y=n),n}const En="blakfy-a11y-root",$e="2.0.0-alpha.0";function Jt(e){const n=e.toLowerCase().split(/[-_]/)[0]??"";return{tr:"tr",en:"en",de:"de",fr:"fr",es:"es",it:"it",ar:"ar",he:"he",ru:"ru",iw:"he"}[n]}function Zt(){if(typeof document>"u")return"en";const e=document.documentElement.lang??"";return Jt(e)??"en"}function Qt(){if(typeof document>"u")return{};let e=Ln??document.currentScript;if(!e){const o=document.querySelectorAll("script[src]");for(let i=0;i<o.length;i++){const r=o[i];if(r&&r.src&&/accessibility[-_]widget|blakfy|widget\.js$/i.test(r.src)){e=r;break}}}if(!e)return{};const n=e.dataset,t={};return n.locale?t.locale=n.locale:t.locale=Zt(),n.theme&&(t.theme=n.theme),n.position&&(t.position=n.position),n.font&&(t.font=n.font),n.debug&&(t.debug=n.debug==="true"),n.devPipe&&(t.devPipe=n.devPipe),n.version&&(t.version=n.version),t}function er(){if(typeof document>"u")return!0;const e=document.querySelectorAll("link[href]");for(let n=0;n<e.length;n++){const t=e[n];if(t&&t.href&&/open[-_]?dyslexic/i.test(t.href))return!0}return!1}function nr(e){if(typeof document>"u")return{mismatched:!1,fields:[]};const n=document.documentElement;if(!n)return{mismatched:!1,fields:[]};const t={"data-a11y-fontscale":String(e.fontScale),"data-a11y-contrast":e.contrast,"data-a11y-focus":e.focusRing?"enhanced":"default","data-a11y-links":e.linkUnderline?"underline":"default","data-a11y-motion":e.motion,"data-a11y-dyslexia":String(e.dyslexiaFont),"data-a11y-reading":String(e.readingMode)},o=[];let i=!1;for(const r of Object.keys(t)){if(!n.hasAttribute(r))continue;i=!0,n.getAttribute(r)!==t[r]&&o.push(r)}return{mismatched:i&&o.length>0,fields:o}}function $n(e){try{const n=new URL(e);return n.origin+n.pathname.replace(/\/[^/]*$/,"")}catch{return""}}const Ln=typeof document<"u"?document.currentScript:null,Tn=typeof document<"u"?$n(Ln?.src??""):"";function Rn(){if(typeof document>"u")return"";if(Tn)return Tn;const e=document.querySelectorAll("script[src]");for(let n=0;n<e.length;n++){const t=e[n];if(t&&t.src&&/accessibility[-_]widget|blakfy|widget\.js$/i.test(t.src)){const o=$n(t.src);if(o)return o}}return""}function tr(e){return jn.includes(e)}function rr(e){if(e==="dark")return"dark";if(e==="light")return"light";if(typeof document<"u"){const n=document.documentElement,t=n.getAttribute("data-theme");if(t==="dark")return"dark";if(t==="light")return"light";if(n.getAttribute("data-color-mode")==="dark"||n.classList.contains("dark"))return"dark";if(n.classList.contains("light"))return"light"}if(typeof window>"u"||typeof window.matchMedia!="function")return"light";try{return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function or(e){if(typeof MutationObserver>"u"||typeof document>"u")return()=>{};const n=new MutationObserver(e);return n.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-mode"]}),()=>n.disconnect()}function V(e,n){e.setAttribute("data-position",n.position),e.setAttribute("data-theme",rr(n.theme)),e.setAttribute("dir",tr(n.locale)?"rtl":"ltr"),n.font&&e.style.setProperty("font-family",n.font)}function ir(e){const n=document.createElement("style");n.textContent=Vt,e.appendChild(n)}function ar(){const e=document.querySelector(En);if(e&&e instanceof HTMLElement)return e;const n=document.createElement(En);return document.body.appendChild(n),n}function Le(e={}){const n=typeof performance<"u"?performance.now():Date.now();if(typeof document>"u")return{unmount:()=>{}};const t=Qt(),o=typeof window<"u"?window.__BLAKFY_A11Y__??{}:{};let r=Je({...t,...o,...e});const a=ie(),c=nr(a);c.mismatched&&A("error","SSR_HYDRATION_MISMATCH",`SSR-rendered prefs differ from client storage: ${c.fields.join(", ")}`),oe(a),t.version&&t.version!==$e&&A("error","CDN_VERSION_MISMATCH",`Expected version ${t.version} but runtime is ${$e} — clear your CDN cache.`),a.dyslexiaFont&&!er()&&A("warn","OPENDYSLEXIC_CDN_MISSING","dyslexiaFont=true but no OpenDyslexic CDN <link> found — system fallback active."),it()&&A("warn","HOST_CSS_IMPORTANT_CONFLICT","Host stylesheet uses !important on body/a — visual prefs may not apply.");const p=ve();p.reducedMotion&&A("info","OS_PREFERS_REDUCED_MOTION","OS prefers-reduced-motion=reduce detected."),p.contrast==="more"&&A("info","OS_PREFERS_CONTRAST_MORE","OS prefers-contrast=more detected."),p.colorScheme==="dark"&&A("info","OS_PREFERS_COLOR_SCHEME_DARK","OS prefers-color-scheme=dark detected.");const u=st(()=>{_.config.theme==="auto"&&(V(_.host,_.config),_.rerender())}),m=or(()=>{_.config.theme==="auto"&&(V(_.host,_.config),_.rerender())});t.devPipe&&dt(t.devPipe);let s=null;if(typeof o.onPreferencesChange=="function"){const b=o.onPreferencesChange;s=K(E.CHANGE,k=>{try{b(k)}catch{}})}const h=ar(),f=h.shadowRoot??h.attachShadow({mode:"open"});for(;f.firstChild;)f.removeChild(f.firstChild);ir(f),V(h,r);let v=dn();const _={config:r,translation:v,shadowRoot:f,host:h,rerender:()=>{Ke(De(Kt,{config:_.config,translation:_.translation,onThemeChange:b=>{_.config={..._.config,theme:b},V(h,_.config),_.rerender()}}),f)}};if(_.rerender(),r.locale!=="en"){const b=Rn();cn(r.locale,b).then(k=>{v=k,_.translation=k,_.rerender()})}const w=yt(),y=(typeof performance<"u"?performance.now():Date.now())-n;return Xt({config:r,mountTimeMs:y,bundleSizeGz:0,storage:w,configure:b=>{const k=Je({..._.config,...b}),L=k.locale!==_.config.locale;if(_.config=k,V(h,k),L)if(k.locale==="en")_.translation=dn(),_.rerender();else{const de=Rn();cn(k.locale,de).then(G=>{_.translation=G,_.rerender()})}else _.rerender()}}),A("info","INITIALIZED",`Widget mounted in ${y.toFixed(1)}ms`),I(E.READY,{version:$e}),{unmount:()=>{u(),m(),s&&s(),Ke(null,f),h.parentNode&&h.parentNode.removeChild(h)}}}const Mn="blakfy-a11y";class Hn extends HTMLElement{constructor(){super(...arguments);Re(this,"_unmount",null)}connectedCallback(){if(this._unmount)return;const t=this._readAttributes(),o=Le(t);this._unmount=o.unmount}disconnectedCallback(){this._unmount&&(this._unmount(),this._unmount=null)}attributeChangedCallback(t,o,i){if(o===i||!this._unmount||typeof window>"u"||!window.BlakfyA11y)return;const r=this._readAttributes();window.BlakfyA11y.configure(r)}_readAttributes(){const t={},o=this.getAttribute("locale");o&&(t.locale=o);const i=this.getAttribute("theme");i&&(t.theme=i);const r=this.getAttribute("position");r&&(t.position=r);const a=this.getAttribute("font");a&&(t.font=a);const c=this.getAttribute("debug");return c!=null&&(t.debug=c==="true"),t}}Re(Hn,"observedAttributes",["locale","theme","position","font","debug"]);function Pn(){typeof customElements>"u"||customElements.get(Mn)||customElements.define(Mn,Hn)}const sr="blakfy-a11y-root",lr="blakfy-a11y";function In(){typeof document>"u"||document.querySelector(sr)||document.querySelector(lr)||Le()}Pn(),typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",In,{once:!0}):In()),M.defineCustomElement=Pn,M.mount=Le,Object.defineProperty(M,Symbol.toStringTag,{value:"Module"})})(this.BlakfyA11y=this.BlakfyA11y||{});
//# sourceMappingURL=widget.js.map
