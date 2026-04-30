var dr=Object.defineProperty;var ur=(M,$,g)=>$ in M?dr(M,$,{enumerable:!0,configurable:!0,writable:!0,value:g}):M[$]=g;var Me=(M,$,g)=>ur(M,typeof $!="symbol"?$+"":$,g);(function(M){"use strict";var $,g,He,I,Ie,Oe,Pe,fe,Y,W,De,pe,he,_e,X={},J=[],Dn=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Z=Array.isArray;function H(e,n){for(var t in n)e[t]=n[t];return e}function me(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function Fe(e,n,t){var i,a,r,o={};for(r in n)r=="key"?i=n[r]:r=="ref"?a=n[r]:o[r]=n[r];if(arguments.length>2&&(o.children=arguments.length>3?$.call(arguments,2):t),typeof e=="function"&&e.defaultProps!=null)for(r in e.defaultProps)o[r]===void 0&&(o[r]=e.defaultProps[r]);return Q(e,o,i,a,null)}function Q(e,n,t,i,a){var r={type:e,props:n,key:t,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:a??++He,__i:-1,__u:0};return a==null&&g.vnode!=null&&g.vnode(r),r}function F(e){return e.children}function ee(e,n){this.props=e,this.context=n}function z(e,n){if(n==null)return e.__?z(e.__,e.__i+1):null;for(var t;n<e.__k.length;n++)if((t=e.__k[n])!=null&&t.__e!=null)return t.__e;return typeof e.type=="function"?z(e):null}function Fn(e){if(e.__P&&e.__d){var n=e.__v,t=n.__e,i=[],a=[],r=H({},n);r.__v=n.__v+1,g.vnode&&g.vnode(r),ge(e.__P,r,n,e.__n,e.__P.namespaceURI,32&n.__u?[t]:null,i,t??z(n),!!(32&n.__u),a),r.__v=n.__v,r.__.__k[r.__i]=r,qe(i,r,a),n.__e=n.__=null,r.__e!=t&&ze(r)}}function ze(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(n){if(n!=null&&n.__e!=null)return e.__e=e.__c.base=n.__e}),ze(e)}function Ne(e){(!e.__d&&(e.__d=!0)&&I.push(e)&&!ne.__r++||Ie!=g.debounceRendering)&&((Ie=g.debounceRendering)||Oe)(ne)}function ne(){try{for(var e,n=1;I.length;)I.length>n&&I.sort(Pe),e=I.shift(),n=I.length,Fn(e)}finally{I.length=ne.__r=0}}function Ue(e,n,t,i,a,r,o,c,p,u,_){var s,h,f,v,m,w,y,d=i&&i.__k||J,b=n.length;for(p=zn(t,n,d,p,b),s=0;s<b;s++)(f=t.__k[s])!=null&&(h=f.__i!=-1&&d[f.__i]||X,f.__i=s,w=ge(e,f,h,a,r,o,c,p,u,_),v=f.__e,f.ref&&h.ref!=f.ref&&(h.ref&&ye(h.ref,null,f),_.push(f.ref,f.__c||v,f)),m==null&&v!=null&&(m=v),(y=!!(4&f.__u))||h.__k===f.__k?(p=Be(f,p,e,y),y&&h.__e&&(h.__e=null)):typeof f.type=="function"&&w!==void 0?p=w:v&&(p=v.nextSibling),f.__u&=-7);return t.__e=m,p}function zn(e,n,t,i,a){var r,o,c,p,u,_=t.length,s=_,h=0;for(e.__k=new Array(a),r=0;r<a;r++)(o=n[r])!=null&&typeof o!="boolean"&&typeof o!="function"?(typeof o=="string"||typeof o=="number"||typeof o=="bigint"||o.constructor==String?o=e.__k[r]=Q(null,o,null,null,null):Z(o)?o=e.__k[r]=Q(F,{children:o},null,null,null):o.constructor===void 0&&o.__b>0?o=e.__k[r]=Q(o.type,o.props,o.key,o.ref?o.ref:null,o.__v):e.__k[r]=o,p=r+h,o.__=e,o.__b=e.__b+1,c=null,(u=o.__i=Nn(o,t,p,s))!=-1&&(s--,(c=t[u])&&(c.__u|=2)),c==null||c.__v==null?(u==-1&&(a>_?h--:a<_&&h++),typeof o.type!="function"&&(o.__u|=4)):u!=p&&(u==p-1?h--:u==p+1?h++:(u>p?h--:h++,o.__u|=4))):e.__k[r]=null;if(s)for(r=0;r<_;r++)(c=t[r])!=null&&!(2&c.__u)&&(c.__e==i&&(i=z(c)),Ke(c,c));return i}function Be(e,n,t,i){var a,r;if(typeof e.type=="function"){for(a=e.__k,r=0;a&&r<a.length;r++)a[r]&&(a[r].__=e,n=Be(a[r],n,t,i));return n}e.__e!=n&&(i&&(n&&e.type&&!n.parentNode&&(n=z(e)),t.insertBefore(e.__e,n||null)),n=e.__e);do n=n&&n.nextSibling;while(n!=null&&n.nodeType==8);return n}function Nn(e,n,t,i){var a,r,o,c=e.key,p=e.type,u=n[t],_=u!=null&&(2&u.__u)==0;if(u===null&&c==null||_&&c==u.key&&p==u.type)return t;if(i>(_?1:0)){for(a=t-1,r=t+1;a>=0||r<n.length;)if((u=n[o=a>=0?a--:r++])!=null&&!(2&u.__u)&&c==u.key&&p==u.type)return o}return-1}function je(e,n,t){n[0]=="-"?e.setProperty(n,t??""):e[n]=t==null?"":typeof t!="number"||Dn.test(n)?t:t+"px"}function te(e,n,t,i,a){var r,o;e:if(n=="style")if(typeof t=="string")e.style.cssText=t;else{if(typeof i=="string"&&(e.style.cssText=i=""),i)for(n in i)t&&n in t||je(e.style,n,"");if(t)for(n in t)i&&t[n]==i[n]||je(e.style,n,t[n])}else if(n[0]=="o"&&n[1]=="n")r=n!=(n=n.replace(De,"$1")),o=n.toLowerCase(),n=o in e||n=="onFocusOut"||n=="onFocusIn"?o.slice(2):n.slice(2),e.l||(e.l={}),e.l[n+r]=t,t?i?t[W]=i[W]:(t[W]=pe,e.addEventListener(n,r?_e:he,r)):e.removeEventListener(n,r?_e:he,r);else{if(a=="http://www.w3.org/2000/svg")n=n.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(n!="width"&&n!="height"&&n!="href"&&n!="list"&&n!="form"&&n!="tabIndex"&&n!="download"&&n!="rowSpan"&&n!="colSpan"&&n!="role"&&n!="popover"&&n in e)try{e[n]=t??"";break e}catch{}typeof t=="function"||(t==null||t===!1&&n[4]!="-"?e.removeAttribute(n):e.setAttribute(n,n=="popover"&&t==1?"":t))}}function Ge(e){return function(n){if(this.l){var t=this.l[n.type+e];if(n[Y]==null)n[Y]=pe++;else if(n[Y]<t[W])return;return t(g.event?g.event(n):n)}}}function ge(e,n,t,i,a,r,o,c,p,u){var _,s,h,f,v,m,w,y,d,b,k,L,ue,G,Re,R=n.type;if(n.constructor!==void 0)return null;128&t.__u&&(p=!!(32&t.__u),r=[c=n.__e=t.__e]),(_=g.__b)&&_(n);e:if(typeof R=="function")try{if(y=n.props,d=R.prototype&&R.prototype.render,b=(_=R.contextType)&&i[_.__c],k=_?b?b.props.value:_.__:i,t.__c?w=(s=n.__c=t.__c).__=s.__E:(d?n.__c=s=new R(y,k):(n.__c=s=new ee(y,k),s.constructor=R,s.render=Bn),b&&b.sub(s),s.state||(s.state={}),s.__n=i,h=s.__d=!0,s.__h=[],s._sb=[]),d&&s.__s==null&&(s.__s=s.state),d&&R.getDerivedStateFromProps!=null&&(s.__s==s.state&&(s.__s=H({},s.__s)),H(s.__s,R.getDerivedStateFromProps(y,s.__s))),f=s.props,v=s.state,s.__v=n,h)d&&R.getDerivedStateFromProps==null&&s.componentWillMount!=null&&s.componentWillMount(),d&&s.componentDidMount!=null&&s.__h.push(s.componentDidMount);else{if(d&&R.getDerivedStateFromProps==null&&y!==f&&s.componentWillReceiveProps!=null&&s.componentWillReceiveProps(y,k),n.__v==t.__v||!s.__e&&s.shouldComponentUpdate!=null&&s.shouldComponentUpdate(y,s.__s,k)===!1){n.__v!=t.__v&&(s.props=y,s.state=s.__s,s.__d=!1),n.__e=t.__e,n.__k=t.__k,n.__k.some(function(q){q&&(q.__=n)}),J.push.apply(s.__h,s._sb),s._sb=[],s.__h.length&&o.push(s);break e}s.componentWillUpdate!=null&&s.componentWillUpdate(y,s.__s,k),d&&s.componentDidUpdate!=null&&s.__h.push(function(){s.componentDidUpdate(f,v,m)})}if(s.context=k,s.props=y,s.__P=e,s.__e=!1,L=g.__r,ue=0,d)s.state=s.__s,s.__d=!1,L&&L(n),_=s.render(s.props,s.state,s.context),J.push.apply(s.__h,s._sb),s._sb=[];else do s.__d=!1,L&&L(n),_=s.render(s.props,s.state,s.context),s.state=s.__s;while(s.__d&&++ue<25);s.state=s.__s,s.getChildContext!=null&&(i=H(H({},i),s.getChildContext())),d&&!h&&s.getSnapshotBeforeUpdate!=null&&(m=s.getSnapshotBeforeUpdate(f,v)),G=_!=null&&_.type===F&&_.key==null?We(_.props.children):_,c=Ue(e,Z(G)?G:[G],n,t,i,a,r,o,c,p,u),s.base=n.__e,n.__u&=-161,s.__h.length&&o.push(s),w&&(s.__E=s.__=null)}catch(q){if(n.__v=null,p||r!=null)if(q.then){for(n.__u|=p?160:128;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;r[r.indexOf(c)]=null,n.__e=c}else{for(Re=r.length;Re--;)me(r[Re]);be(n)}else n.__e=t.__e,n.__k=t.__k,q.then||be(n);g.__e(q,n,t)}else r==null&&n.__v==t.__v?(n.__k=t.__k,n.__e=t.__e):c=n.__e=Un(t.__e,n,t,i,a,r,o,p,u);return(_=g.diffed)&&_(n),128&n.__u?void 0:c}function be(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(be))}function qe(e,n,t){for(var i=0;i<t.length;i++)ye(t[i],t[++i],t[++i]);g.__c&&g.__c(n,e),e.some(function(a){try{e=a.__h,a.__h=[],e.some(function(r){r.call(a)})}catch(r){g.__e(r,a.__v)}})}function We(e){return typeof e!="object"||e==null||e.__b>0?e:Z(e)?e.map(We):H({},e)}function Un(e,n,t,i,a,r,o,c,p){var u,_,s,h,f,v,m,w=t.props||X,y=n.props,d=n.type;if(d=="svg"?a="http://www.w3.org/2000/svg":d=="math"?a="http://www.w3.org/1998/Math/MathML":a||(a="http://www.w3.org/1999/xhtml"),r!=null){for(u=0;u<r.length;u++)if((f=r[u])&&"setAttribute"in f==!!d&&(d?f.localName==d:f.nodeType==3)){e=f,r[u]=null;break}}if(e==null){if(d==null)return document.createTextNode(y);e=document.createElementNS(a,d,y.is&&y),c&&(g.__m&&g.__m(n,r),c=!1),r=null}if(d==null)w===y||c&&e.data==y||(e.data=y);else{if(r=r&&$.call(e.childNodes),!c&&r!=null)for(w={},u=0;u<e.attributes.length;u++)w[(f=e.attributes[u]).name]=f.value;for(u in w)f=w[u],u=="dangerouslySetInnerHTML"?s=f:u=="children"||u in y||u=="value"&&"defaultValue"in y||u=="checked"&&"defaultChecked"in y||te(e,u,null,f,a);for(u in y)f=y[u],u=="children"?h=f:u=="dangerouslySetInnerHTML"?_=f:u=="value"?v=f:u=="checked"?m=f:c&&typeof f!="function"||w[u]===f||te(e,u,f,w[u],a);if(_)c||s&&(_.__html==s.__html||_.__html==e.innerHTML)||(e.innerHTML=_.__html),n.__k=[];else if(s&&(e.innerHTML=""),Ue(n.type=="template"?e.content:e,Z(h)?h:[h],n,t,i,d=="foreignObject"?"http://www.w3.org/1999/xhtml":a,r,o,r?r[0]:t.__k&&z(t,0),c,p),r!=null)for(u=r.length;u--;)me(r[u]);c||(u="value",d=="progress"&&v==null?e.removeAttribute("value"):v!=null&&(v!==e[u]||d=="progress"&&!v||d=="option"&&v!=w[u])&&te(e,u,v,w[u],a),u="checked",m!=null&&m!=e[u]&&te(e,u,m,w[u],a))}return e}function ye(e,n,t){try{if(typeof e=="function"){var i=typeof e.__u=="function";i&&e.__u(),i&&n==null||(e.__u=e(n))}else e.current=n}catch(a){g.__e(a,t)}}function Ke(e,n,t){var i,a;if(g.unmount&&g.unmount(e),(i=e.ref)&&(i.current&&i.current!=e.__e||ye(i,null,n)),(i=e.__c)!=null){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(r){g.__e(r,n)}i.base=i.__P=null}if(i=e.__k)for(a=0;a<i.length;a++)i[a]&&Ke(i[a],n,t||typeof e.type!="function");t||me(e.__e),e.__c=e.__=e.__e=void 0}function Bn(e,n,t){return this.constructor(e,t)}function Ve(e,n,t){var i,a,r,o;n==document&&(n=document.documentElement),g.__&&g.__(e,n),a=(i=!1)?null:n.__k,r=[],o=[],ge(n,e=n.__k=Fe(F,null,[e]),a||X,X,n.namespaceURI,a?null:n.firstChild?$.call(n.childNodes):null,r,a?a.__e:n.firstChild,i,o),qe(r,e,o)}$=J.slice,g={__e:function(e,n,t,i){for(var a,r,o;n=n.__;)if((a=n.__c)&&!a.__)try{if((r=a.constructor)&&r.getDerivedStateFromError!=null&&(a.setState(r.getDerivedStateFromError(e)),o=a.__d),a.componentDidCatch!=null&&(a.componentDidCatch(e,i||{}),o=a.__d),o)return a.__E=a}catch(c){e=c}throw e}},He=0,ee.prototype.setState=function(e,n){var t;t=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=H({},this.state),typeof e=="function"&&(e=e(H({},t),this.props)),e&&H(t,e),e!=null&&this.__v&&(n&&this._sb.push(n),Ne(this))},ee.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),Ne(this))},ee.prototype.render=F,I=[],Oe=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Pe=function(e,n){return e.__v.__b-n.__v.__b},ne.__r=0,fe=Math.random().toString(8),Y="__d"+fe,W="__a"+fe,De=/(PointerCapture)$|Capture$/i,pe=0,he=Ge(!1),_e=Ge(!0);const Ye="blakfy_a11y_prefs",Xe="blakfy_a11y_prefs",N="1.0.0",E={READY:"blakfy:a11y:ready",CHANGE:"blakfy:a11y:change",OPEN:"blakfy:a11y:open",CLOSE:"blakfy:a11y:close"},S={fontScale:100,contrast:"normal",focusRing:!1,linkUnderline:!1,motion:"auto",dyslexiaFont:!1,readingMode:!1,lineHeight:"normal",letterSpacing:"normal",textAlign:"default",highlightHeadings:!1,saturation:"normal",cursorSize:"default",hideImages:!1},jn=["tr","en","de","fr","es","it","ar","he","ru"],Gn=["ar","he"],qn={locale:"en",theme:"auto",position:"bottom-left",font:"",debug:!1};function ve(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Wn(e){return e===100||e===110||e===125?e:S.fontScale}function Kn(e){return e==="normal"||e==="high"?e:S.contrast}function D(e,n){return typeof e=="boolean"?e:n}function Vn(e){return e==="auto"||e==="reduce"?e:S.motion}function Yn(e){return e==="normal"||e==="medium"||e==="large"?e:S.lineHeight}function Xn(e){return e==="normal"||e==="medium"||e==="large"?e:S.letterSpacing}function Jn(e){return e==="default"||e==="left"||e==="center"||e==="right"?e:S.textAlign}function Zn(e){return e==="normal"||e==="high"||e==="low"||e==="none"?e:S.saturation}function Qn(e){return e==="default"||e==="large-dark"||e==="large-light"?e:S.cursorSize}function et(e){return typeof e=="string"&&jn.includes(e)?e:"en"}function nt(e){return e==="light"||e==="dark"||e==="auto"?e:"auto"}function tt(e){return e==="bottom-left"||e==="bottom-right"||e==="top-left"||e==="top-right"?e:"bottom-left"}function re(e,n){return typeof e=="string"?e:n}function Je(e){return ve(e)?{fontScale:Wn(e.fontScale),contrast:Kn(e.contrast),focusRing:D(e.focusRing,S.focusRing),linkUnderline:D(e.linkUnderline,S.linkUnderline),motion:Vn(e.motion),dyslexiaFont:D(e.dyslexiaFont,S.dyslexiaFont),readingMode:D(e.readingMode,S.readingMode),lineHeight:Yn(e.lineHeight),letterSpacing:Xn(e.letterSpacing),textAlign:Jn(e.textAlign),highlightHeadings:D(e.highlightHeadings,S.highlightHeadings),saturation:Zn(e.saturation),cursorSize:Qn(e.cursorSize),hideImages:D(e.hideImages,S.hideImages)}:{...S}}function rt(e){if(!ve(e))return null;const n=Je(e.prefs),t=re(e.version,N),i=re(e.timestamp,new Date().toISOString()),a=re(e.locale,"en");return{prefs:n,version:t,timestamp:i,locale:a}}function Ze(e){return ve(e)?{locale:et(e.locale),theme:nt(e.theme),position:tt(e.position),font:re(e.font,""),debug:D(e.debug,!1)}:{...qn}}function O(e,n){if(!(typeof window>"u"))try{const t=new CustomEvent(e,{detail:n});window.dispatchEvent(t)}catch{}}function K(e,n){if(typeof window>"u")return()=>{};const t=i=>{n(i.detail)};return window.addEventListener(e,t),()=>{typeof window>"u"||window.removeEventListener(e,t)}}const Qe="blakfy-a11y-host";function en(e,n){const t=`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M6 2L6 26L12 20L16 28L19 27L15 19L22 19Z" fill="${e}" stroke="${n}" stroke-width="1.5" stroke-linejoin="round"/></svg>`;return`url("data:image/svg+xml,${encodeURIComponent(t)}") 6 2`}function it(e){const n=[];if(e.fontScale!==100&&n.push(`html { font-size: ${e.fontScale}% !important; }`),e.contrast==="high"&&n.push("html body, html body * { background-color: #000000 !important; color: #ffffff !important; border-color: #333333 !important; }","html body a, html body a * { color: #ffff00 !important; }","html body img { filter: invert(1) hue-rotate(180deg) !important; }"),e.focusRing&&n.push("html *:focus, html *:focus-visible { outline: 4px solid #2563eb !important; outline-offset: 2px !important; }"),e.linkUnderline&&n.push("html a { text-decoration: underline !important; }"),e.motion==="reduce"&&n.push("html *, html *::before, html *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }"),e.dyslexiaFont&&n.push("html * { font-family: 'OpenDyslexic', OpenDyslexic, Arial, sans-serif !important; }"),e.readingMode&&n.push('html aside, html [role="complementary"] { display: none !important; }','html [class*="sidebar"], html [id*="sidebar"] { display: none !important; }','html [class*="banner"]:not(main *) { display: none !important; }'),e.lineHeight==="medium"?n.push("html p, html li, html dd, html dt, html span, html div { line-height: 1.8 !important; }"):e.lineHeight==="large"&&n.push("html p, html li, html dd, html dt, html span, html div { line-height: 2.4 !important; }"),e.letterSpacing==="medium"?n.push("html * { letter-spacing: 0.08em !important; }"):e.letterSpacing==="large"&&n.push("html * { letter-spacing: 0.16em !important; }"),e.textAlign!=="default"&&n.push(`html p, html li, html h1, html h2, html h3, html h4, html h5, html h6 { text-align: ${e.textAlign} !important; }`),e.highlightHeadings&&n.push("html h1, html h2, html h3, html h4, html h5, html h6 { outline: 3px solid #2563eb !important; outline-offset: 3px !important; }"),e.saturation==="none"?(n.push("html { filter: grayscale(100%) !important; }"),n.push("blakfy-a11y-root { filter: none !important; }")):e.saturation==="high"?(n.push("html { filter: saturate(2) !important; }"),n.push("blakfy-a11y-root { filter: none !important; }")):e.saturation==="low"&&(n.push("html { filter: saturate(0.3) !important; }"),n.push("blakfy-a11y-root { filter: none !important; }")),e.cursorSize==="large-dark"){const t=en("black","white");n.push(`html *, html *::before, html *::after { cursor: ${t}, default !important; }`)}else if(e.cursorSize==="large-light"){const t=en("white","black");n.push(`html *, html *::before, html *::after { cursor: ${t}, default !important; }`)}return e.hideImages&&n.push('html img, html picture, html [role="img"]:not(svg):not([aria-label*="accessibility"]) { opacity: 0 !important; }',"html video { visibility: hidden !important; }"),n.join(`
`)}function ot(e){if(typeof document>"u")return;let n=document.getElementById(Qe);n||(n=document.createElement("style"),n.id=Qe,n.setAttribute("data-blakfy",""),(document.head||document.documentElement).appendChild(n)),n.textContent=it(e)}function ie(e){if(typeof document>"u")return;const n=document.documentElement;n&&(n.setAttribute("data-a11y-fontscale",String(e.fontScale)),n.setAttribute("data-a11y-contrast",e.contrast),n.setAttribute("data-a11y-focus",e.focusRing?"enhanced":"default"),n.setAttribute("data-a11y-links",e.linkUnderline?"underline":"default"),n.setAttribute("data-a11y-motion",e.motion),n.setAttribute("data-a11y-dyslexia",String(e.dyslexiaFont)),n.setAttribute("data-a11y-reading",String(e.readingMode)),n.setAttribute("data-a11y-lineheight",e.lineHeight),n.setAttribute("data-a11y-letterspacing",e.letterSpacing),n.setAttribute("data-a11y-textalign",e.textAlign),n.setAttribute("data-a11y-headings",String(e.highlightHeadings)),n.setAttribute("data-a11y-saturation",e.saturation),n.setAttribute("data-a11y-cursor",e.cursorSize),n.setAttribute("data-a11y-hideimages",String(e.hideImages)),ot(e))}function ke(){if(typeof window>"u"||typeof window.matchMedia!="function")return{reducedMotion:!1,contrast:"normal",colorScheme:"no-preference"};let e=!1,n="normal",t="no-preference";try{e=window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{}try{window.matchMedia("(prefers-contrast: more)").matches?n="more":window.matchMedia("(prefers-contrast: less)").matches&&(n="less")}catch{}try{window.matchMedia("(prefers-color-scheme: dark)").matches?t="dark":window.matchMedia("(prefers-color-scheme: light)").matches&&(t="light")}catch{}return{reducedMotion:e,contrast:n,colorScheme:t}}function at(){if(typeof document>"u")return!1;const e=document.styleSheets;if(!e)return!1;for(let n=0;n<e.length;n++){const t=e[n];if(!t)continue;let i=null;try{i=t.cssRules??null}catch{continue}if(i)for(let a=0;a<i.length;a++){const r=i[a];if(!r||r.type!==1)continue;const o=r,c=o.selectorText??"";if(!st(c))continue;const p=o.style;if(p&&(p.getPropertyPriority("color")==="important"||p.getPropertyPriority("background-color")==="important"||p.getPropertyPriority("background")==="important"))return!0}}return!1}function st(e){const n=e.toLowerCase();return/(^|[\s,>+~])(body|a)([\s,:.\[#>+~]|$)/.test(n)}function lt(e){if(typeof window>"u"||typeof window.matchMedia!="function")return()=>{};const n=["(prefers-reduced-motion: reduce)","(prefers-contrast: more)","(prefers-contrast: less)","(prefers-color-scheme: dark)","(prefers-color-scheme: light)"],t=[],i=()=>{e(ke())};for(const a of n)try{const r=window.matchMedia(a);typeof r.addEventListener=="function"?r.addEventListener("change",i):typeof r.addListener=="function"&&r.addListener(i),t.push(r)}catch{}return()=>{for(const a of t)try{typeof a.removeEventListener=="function"?a.removeEventListener("change",i):typeof a.removeListener=="function"&&a.removeListener(i)}catch{}}}const nn="2.0.0-alpha.0",tn=50,ct=10,T={issues:[],startTime:typeof performance<"u"?performance.now():Date.now(),devPipeUrl:null,devPipeLastSent:[]};function rn(){try{if(typeof process<"u"&&typeof process.env<"u"&&process.env.NODE_ENV&&process.env.NODE_ENV!=="production")return"verbose"}catch{}if(typeof window>"u"||typeof document>"u")return"silent";try{if(new URLSearchParams(window.location.search).get("a11y-debug")==="1")return"verbose"}catch{}try{const e=document.currentScript;if(e&&e.dataset&&e.dataset.debug==="true"||document.querySelector('script[data-debug="true"]'))return"verbose"}catch{}try{const e=window;if(e.__BLAKFY_A11Y__&&e.__BLAKFY_A11Y__.debug===!0)return"verbose"}catch{}return"silent"}function dt(e){return e==="info"?"✓":e==="warn"?"⚠":"✗"}function on(e,n){if(typeof console>"u")return;const t=`[blakfy-a11y v${nn}] ${dt(e)} ${n}`;e==="error"&&typeof console.error=="function"?console.error(t):e==="warn"&&typeof console.warn=="function"?console.warn(t):typeof console.info=="function"?console.info(t):typeof console.log=="function"&&console.log(t)}function an(e,n,t){const i=T.devPipeUrl;if(!i||rn()!=="verbose"||typeof fetch!="function")return;const a=Date.now();if(T.devPipeLastSent=T.devPipeLastSent.filter(r=>a-r<1e3),!(T.devPipeLastSent.length>=ct)){T.devPipeLastSent.push(a);try{const r=JSON.stringify({level:e,code:n,msg:t,timestamp:new Date(a).toISOString()});fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:r,keepalive:!0}).catch(()=>{})}catch{}}}function A(e,n,t,i){const a=rn();if(e==="info"){a==="verbose"&&(on("info",t),an("info",n,t));return}on(e,t);const r={level:e,code:n,timestamp:new Date().toISOString(),msg:t};T.issues.push(r),T.issues.length>tn&&T.issues.splice(0,T.issues.length-tn),an(e,n,t)}function ut(e){T.devPipeUrl=e}function ft(e){const n=ke();return{version:nn,locale:e.config.locale,theme:e.config.theme,storage:{version:e.storage.version,migratedFrom:e.storage.migratedFrom,keysFound:[...e.storage.keysFound]},osPreferences:{reducedMotion:n.reducedMotion,contrast:n.contrast,colorScheme:n.colorScheme},performance:{mountTimeMs:e.performance.mountTimeMs,bundleSizeGz:e.performance.bundleSizeGz,timeToFirstClick:e.performance.timeToFirstClick},issues:T.issues.map(t=>({level:t.level,code:t.code,timestamp:t.timestamp,msg:t.msg})),config:{...e.config},timestamp:new Date().toISOString()}}function we(){return typeof window<"u"}function sn(){return typeof document<"u"}function pt(e,n,t){if(!sn())return;const i=new Date;i.setTime(i.getTime()+t*864e5);const a=we()&&window.location&&window.location.protocol==="https:",r=[`${e}=${encodeURIComponent(n)}`,`expires=${i.toUTCString()}`,"path=/","SameSite=Lax"];a&&r.push("Secure"),document.cookie=r.join(";")}function ht(e){if(!sn())return null;const n=(document.cookie||"").match(new RegExp(`(^| )${e}=([^;]+)`));if(!n||typeof n[2]!="string")return null;try{return decodeURIComponent(n[2])}catch{return null}}function _t(e){if(!we())return null;try{return window.localStorage.getItem(e)}catch{return null}}function mt(e,n){if(we())try{window.localStorage.setItem(e,n)}catch{}}function gt(e){if(e==null)return null;try{return JSON.parse(e)}catch{return null}}function bt(e){return e.version===N?{record:e,migrated:!1,migratedFrom:null}:{record:{prefs:{...S,...e.prefs},version:N,timestamp:new Date().toISOString(),locale:e.locale||"en"},migrated:!0,migratedFrom:e.version}}function ln(){const e=[],n=_t(Ye);n!=null&&e.push("localStorage");const t=ht(Xe);t!=null&&e.push("cookie");let i=null,a=null;if(n!=null?(i=n,a="localStorage"):t!=null&&(i=t,a="cookie"),i==null)return{source:null,record:null,migrated:!1,migratedFrom:null,keysFound:e};const r=gt(i);if(r==null)return A("error","STORAGE_PARSE_ERROR",`Failed to parse stored preferences from ${a}`),{source:a,record:null,migrated:!1,migratedFrom:null,keysFound:e};const o=rt(r);if(!o)return A("error","STORAGE_PARSE_ERROR",`Stored preferences in ${a} did not match schema`),{source:a,record:null,migrated:!1,migratedFrom:null,keysFound:e};const{record:c,migrated:p,migratedFrom:u}=bt(o);return p&&A("info","STORAGE_MIGRATED",`Storage migrated: ${u??"unknown"} → ${N}`),{source:a,record:c,migrated:p,migratedFrom:u,keysFound:e}}function yt(e){const n=JSON.stringify(e);mt(Ye,n),pt(Xe,n,365)}function oe(){const e=ln();return e.record?{...S,...e.record.prefs}:{...S}}function xe(e,n="en"){const t=oe(),i=Je({...t,...e}),a={prefs:i,version:N,timestamp:new Date().toISOString(),locale:n};return yt(a),ie(i),O(E.CHANGE,a),a}function cn(e="en"){return xe({...S},e)}function vt(){const e=ln();return{version:e.record?.version??N,migratedFrom:e.migratedFrom,keysFound:e.keysFound}}const kt={label:"Accessibility preferences"},wt={title:"Accessibility Preferences",description:"Adjust your viewing preferences.",reset:"Reset",close:"Close",disclaimer:"This panel provides personal preference controls; structural accessibility is built into the site itself.",theme:{label:"Display Theme",auto:"Auto",light:"Light",dark:"Dark"},branding:"Powered by Blakfy Studio",sections:{profiles:"Accessibility Profiles",text:"Text",vision:"Vision",navigation:"Navigation",motion:"Motion & Reading"},profiles:{epilepsy:{name:"Epilepsy Safe",description:"Reduces animations and desaturates colors"},vision:{name:"Visual Impairment",description:"High contrast and enlarged text"},cognitive:{name:"Cognitive",description:"Reduces distractions, aids readability"},adhd:{name:"ADHD Friendly",description:"Hides images, stops motion"},blindness:{name:"Screen Reader",description:"Optimised for assistive technology"}},preferences:{fontScale:{title:"Font Size",description:"Scales all text proportionally across the page. Ideal for small screens or users with low vision; changes apply instantly everywhere.",values:{100:"Normal",110:"Large",125:"Extra Large"}},lineHeight:{title:"Line Height",description:"Increases vertical spacing between lines of text, improving readability for users with dyslexia or cognitive disabilities.",values:{normal:"Normal",medium:"Medium",large:"Large"}},letterSpacing:{title:"Letter Spacing",description:"Adds extra space between characters to reduce crowding and improve text clarity.",values:{normal:"Normal",medium:"Medium",large:"Large"}},textAlign:{title:"Text Alignment",description:"Changes the alignment of body text and headings across the page.",values:{default:"Default",left:"Left",center:"Center",right:"Right"}},highlightHeadings:{title:"Highlight Headings",description:"Adds a visible blue outline around all headings to make page structure easier to navigate."},contrast:{title:"High Contrast",description:"Applies a black background with high-visibility yellow links meeting the WCAG AAA 7:1 contrast ratio. Designed for users with visual impairments or colour blindness."},saturation:{title:"Color Saturation",description:"Adjusts color intensity. Use Grayscale to remove all color — useful for color blindness or reducing visual distraction.",values:{normal:"Normal",high:"High",low:"Low",none:"Grayscale"}},focusRing:{title:"Enhanced Focus Ring",description:"Displays a bold 4px blue outline around the focused element during keyboard navigation. Essential for users who cannot use or prefer not to use a mouse."},linkUnderline:{title:"Underline Links",description:"Adds underlines to all hyperlinks on the page. Helps users who cannot distinguish links from regular text by colour alone."},cursorSize:{title:"Cursor Size",description:"Enlarges the mouse cursor for better screen visibility. Choose dark or light to suit your background.",values:{default:"Default",largeDark:"Large Dark",largeLight:"Large Light"}},motion:{title:"Reduce Motion",description:"Disables page animations, transitions and scroll effects. Recommended for users with vestibular disorders, epilepsy or motion sensitivity."},dyslexiaFont:{title:"Dyslexia-Friendly Font",description:"Applies the OpenDyslexic typeface, adding extra weight to letter bottoms to reduce confusion between similar characters (b/d, p/q) and improve readability.",note:"Some readers find this helpful; research has not established universal benefit."},readingMode:{title:"Reading Mode",description:"Hides sidebars, banners and distracting side content so you can focus on the main text. Ideal for long articles or visually busy pages."},hideImages:{title:"Hide Images",description:"Hides all images on the page, reducing visual distraction. Useful for users sensitive to visual stimuli or on slow connections."}}},U={fab:kt,panel:wt},Se=new Map;Se.set("en",U);function xt(e){if(!e||typeof e!="object")return!1;const n=e,t=n.fab,i=n.panel;return!(!t||typeof t.label!="string"||!i||typeof i.title!="string")}async function dn(e,n){const t=Se.get(e);if(t)return t;if(typeof fetch!="function")return A("warn","LOCALE_FETCH_FAILED",`fetch unavailable, using en fallback for ${e}`),U;const i=`${(n||"").replace(/\/$/,"")}/locales/${e}.json`;try{const a=await fetch(i);if(!a.ok)return A("warn","LOCALE_FETCH_FAILED",`Locale fetch failed (${a.status}): ${i}`),U;const r=await a.json();return xt(r)?(Se.set(e,r),r):(A("warn","LOCALE_FETCH_FAILED",`Locale ${e} payload missing required fields`),U)}catch(a){const r=a instanceof Error?a.message:String(a);return A("warn","LOCALE_FETCH_FAILED",`Locale fetch threw for ${e}: ${r}`),U}}function un(){return U}var St=0;function l(e,n,t,i,a,r){n||(n={});var o,c,p=n;if("ref"in p)for(c in p={},n)c=="ref"?o=n[c]:p[c]=n[c];var u={type:e,props:p,key:t,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--St,__i:-1,__u:0,__source:a,__self:r};if(typeof e=="function"&&(o=e.defaultProps))for(c in o)p[c]===void 0&&(p[c]=o[c]);return g.vnode&&g.vnode(u),u}var B,x,Ce,fn,ae=0,pn=[],C=g,hn=C.__b,_n=C.__r,mn=C.diffed,gn=C.__c,bn=C.unmount,yn=C.__;function se(e,n){C.__h&&C.__h(x,e,ae||n),ae=0;var t=x.__H||(x.__H={__:[],__h:[]});return e>=t.__.length&&t.__.push({}),t.__[e]}function Ae(e){return ae=1,Ct(xn,e)}function Ct(e,n,t){var i=se(B++,2);if(i.t=e,!i.__c&&(i.__=[xn(void 0,n),function(c){var p=i.__N?i.__N[0]:i.__[0],u=i.t(p,c);p!==u&&(i.__N=[u,i.__[1]],i.__c.setState({}))}],i.__c=x,!x.__f)){var a=function(c,p,u){if(!i.__c.__H)return!0;var _=i.__c.__H.__.filter(function(h){return h.__c});if(_.every(function(h){return!h.__N}))return!r||r.call(this,c,p,u);var s=i.__c.props!==c;return _.some(function(h){if(h.__N){var f=h.__[0];h.__=h.__N,h.__N=void 0,f!==h.__[0]&&(s=!0)}}),r&&r.call(this,c,p,u)||s};x.__f=!0;var r=x.shouldComponentUpdate,o=x.componentWillUpdate;x.componentWillUpdate=function(c,p,u){if(this.__e){var _=r;r=void 0,a(c,p,u),r=_}o&&o.call(this,c,p,u)},x.shouldComponentUpdate=a}return i.__N||i.__}function j(e,n){var t=se(B++,3);!C.__s&&wn(t.__H,n)&&(t.__=e,t.u=n,x.__H.__h.push(t))}function le(e){return ae=5,At(function(){return{current:e}},[])}function At(e,n){var t=se(B++,7);return wn(t.__H,n)&&(t.__=e(),t.__H=n,t.__h=e),t.__}function vn(){var e=se(B++,11);if(!e.__){for(var n=x.__v;n!==null&&!n.__m&&n.__!==null;)n=n.__;var t=n.__m||(n.__m=[0,0]);e.__="P"+t[0]+"-"+t[1]++}return e.__}function Et(){for(var e;e=pn.shift();){var n=e.__H;if(e.__P&&n)try{n.__h.some(ce),n.__h.some(Ee),n.__h=[]}catch(t){n.__h=[],C.__e(t,e.__v)}}}C.__b=function(e){x=null,hn&&hn(e)},C.__=function(e,n){e&&n.__k&&n.__k.__m&&(e.__m=n.__k.__m),yn&&yn(e,n)},C.__r=function(e){_n&&_n(e),B=0;var n=(x=e.__c).__H;n&&(Ce===x?(n.__h=[],x.__h=[],n.__.some(function(t){t.__N&&(t.__=t.__N),t.u=t.__N=void 0})):(n.__h.some(ce),n.__h.some(Ee),n.__h=[],B=0)),Ce=x},C.diffed=function(e){mn&&mn(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(pn.push(n)!==1&&fn===C.requestAnimationFrame||((fn=C.requestAnimationFrame)||$t)(Et)),n.__H.__.some(function(t){t.u&&(t.__H=t.u),t.u=void 0})),Ce=x=null},C.__c=function(e,n){n.some(function(t){try{t.__h.some(ce),t.__h=t.__h.filter(function(i){return!i.__||Ee(i)})}catch(i){n.some(function(a){a.__h&&(a.__h=[])}),n=[],C.__e(i,t.__v)}}),gn&&gn(e,n)},C.unmount=function(e){bn&&bn(e);var n,t=e.__c;t&&t.__H&&(t.__H.__.some(function(i){try{ce(i)}catch(a){n=a}}),t.__H=void 0,n&&C.__e(n,t.__v))};var kn=typeof requestAnimationFrame=="function";function $t(e){var n,t=function(){clearTimeout(i),kn&&cancelAnimationFrame(n),setTimeout(e)},i=setTimeout(t,35);kn&&(n=requestAnimationFrame(t))}function ce(e){var n=x,t=e.__c;typeof t=="function"&&(e.__c=void 0,t()),x=n}function Ee(e){var n=x;e.__c=e.__(),x=n}function wn(e,n){return!e||e.length!==n.length||n.some(function(t,i){return t!==e[i]})}function xn(e,n){return typeof n=="function"?n(e):n}function Lt(e){return l("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:[l("circle",{cx:"12",cy:"4",r:"2"}),l("path",{d:"M12 6v8"}),l("path",{d:"M5 9h14"}),l("path",{d:"M9 14l-2 7"}),l("path",{d:"M15 14l2 7"})]})}function Tt(e){return l("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",...e,children:[l("circle",{cx:"12",cy:"3",r:"2"}),l("path",{d:"M19 8.5c0 .55-.45 1-1 1h-4v3l3 7c.16.4-.04.86-.45 1l-1.42.5c-.4.16-.86-.04-1-.45L11.5 14h-1l-2.65 6.55c-.16.4-.6.6-1 .45l-1.42-.5c-.4-.16-.6-.6-.45-1l3-7v-3H6c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v1z"})]})}function Rt(e){return l("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:[l("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),l("circle",{cx:"12",cy:"12",r:"3"})]})}function Mt(e){return l("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:l("path",{d:"M5 5l10 10M15 5L5 15"})})}function Ht(e){return l("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:[l("path",{d:"M12 2L2 7l10 5 10-5-10-5z"}),l("path",{d:"M2 17l10 5 10-5"}),l("path",{d:"M2 12l10 5 10-5"})]})}function It({name:e}){return e==="walking"?l(Lt,{}):e==="eye"?l(Rt,{}):l(Tt,{})}function Ot({iconStyle:e,ariaLabel:n,isOpen:t,onClick:i}){return l("button",{type:"button",class:"fab","aria-haspopup":"dialog","aria-expanded":t,"aria-label":n,title:n,onClick:i,children:l(It,{name:e})})}const Pt='button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [role="switch"]:not([aria-disabled="true"])';function Dt(e=document){let n=e.activeElement;for(;n;){const t=n.shadowRoot;if(!t||!t.activeElement)break;n=t.activeElement}return n}function Sn(e){if(!e)return[];const n=e.querySelectorAll(Pt);return Array.from(n).filter(t=>{if(t.hasAttribute("disabled"))return!1;const i=t.getAttribute("tabindex");return i&&Number(i)<0?!1:t.offsetParent!==null||t.getClientRects().length>0})}function Ft({open:e,onClose:n,titleId:t,descriptionId:i,children:a}){const r=le(null),o=le(null),c=le(n);return c.current=n,j(()=>{if(!e||typeof document>"u")return;const u=document.documentElement,_=u.style.overflow;return u.style.overflow="hidden",()=>{u.style.overflow=_}},[e]),j(()=>{if(!e||typeof document>"u")return;o.current=Dt(document);const u=window.setTimeout(()=>{(Sn(r.current)[0]??r.current)?.focus()},0),_=s=>{if(s.key==="Escape"){s.preventDefault(),c.current();return}if(s.key!=="Tab")return;const h=Sn(r.current);if(h.length===0){s.preventDefault(),r.current?.focus();return}const f=h[0],v=h[h.length-1];if(!f||!v)return;const m=r.current?.getRootNode(),w=m&&"activeElement"in m?m.activeElement:document.activeElement;s.shiftKey?(w===f||!r.current?.contains(w))&&(s.preventDefault(),v.focus()):w===v&&(s.preventDefault(),f.focus())};return document.addEventListener("keydown",_),()=>{window.clearTimeout(u),document.removeEventListener("keydown",_);const s=o.current;s&&s instanceof HTMLElement&&s.focus()}},[e]),e?l("div",{class:"backdrop",onClick:u=>{u.target===u.currentTarget&&n()},children:l("div",{ref:r,class:"dialog",role:"dialog","aria-modal":"true","aria-labelledby":t,"aria-describedby":i,tabIndex:-1,children:a})}):null}function zt({checked:e,onChange:n,ariaLabel:t,ariaLabelledBy:i,ariaDescribedBy:a,disabled:r=!1}){return l("button",{type:"button",class:"switch",role:"switch","aria-checked":e,"aria-label":i?void 0:t,"aria-labelledby":i,"aria-describedby":a,"aria-disabled":r||void 0,tabIndex:r?-1:0,onClick:()=>{r||n(!e)},onKeyDown:p=>{r||(p.key===" "||p.key==="Enter"||p.key==="Spacebar")&&(p.preventDefault(),n(!e))},children:l("span",{class:"switch-thumb","aria-hidden":"true"})})}function P({title:e,description:n,note:t,checked:i,onChange:a}){const r=vn(),o=`${r}-title`,c=`${r}-desc`;return l("div",{class:"toggle-row",children:[l("div",{class:"toggle-text",children:l("div",{class:"toggle-title-row",children:[l("p",{class:"toggle-title",id:o,children:e}),l("span",{class:"info-wrap",children:[l("button",{type:"button",class:"info-btn",tabIndex:0,"aria-label":e+" hakkında bilgi",children:"i"}),l("span",{class:"info-tooltip",id:c,role:"tooltip",children:[n,t?l("em",{class:"info-tooltip-note",children:t}):null]})]})]})}),l(zt,{checked:i,onChange:a,ariaLabel:e,ariaLabelledBy:o,ariaDescribedBy:c})]})}const Nt=["auto","light","dark"],Cn=["normal","medium","large"],An=["normal","medium","large"],Ut=["default","left","center","right"],Bt=["normal","high","low","none"],jt=["default","large-dark","large-light"],En={epilepsy:{motion:"reduce",saturation:"low"},vision:{fontScale:125,contrast:"high"},cognitive:{readingMode:!0,lineHeight:"medium",motion:"reduce"},adhd:{motion:"reduce",hideImages:!0},blindness:{focusRing:!0,linkUnderline:!0,highlightHeadings:!0}};function Gt({profileKey:e}){return{epilepsy:l("svg",{"aria-hidden":"true",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:l("path",{d:"M11 2L4 11h6l-1 7 7-9h-6l1-7z",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})}),vision:l("svg",{"aria-hidden":"true",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l("path",{d:"M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"}),l("circle",{cx:"10",cy:"10",r:"2.5",stroke:"currentColor","stroke-width":"1.5"})]}),cognitive:l("svg",{"aria-hidden":"true",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l("path",{d:"M10 3C6.13 3 3 6.13 3 10c0 2.38 1.19 4.47 3 5.74V17h8v-1.26C15.81 14.47 17 12.38 17 10c0-3.87-3.13-7-7-7z",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"}),l("path",{d:"M7 10h6M10 7v6",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"})]}),adhd:l("svg",{"aria-hidden":"true",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l("circle",{cx:"10",cy:"10",r:"7",stroke:"currentColor","stroke-width":"1.5"}),l("circle",{cx:"10",cy:"10",r:"3",stroke:"currentColor","stroke-width":"1.5"}),l("circle",{cx:"10",cy:"10",r:"1",fill:"currentColor"})]}),blindness:l("svg",{"aria-hidden":"true",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l("path",{d:"M10 4a6 6 0 100 12A6 6 0 0010 4z",stroke:"currentColor","stroke-width":"1.5"}),l("path",{d:"M10 8v4M8 16l4-4",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"})]})}[e]}const de=({text:e,note:n})=>l("span",{class:"info-wrap",children:[l("button",{type:"button",class:"info-btn",tabIndex:0,"aria-label":"bilgi",children:"i"}),l("span",{class:"info-tooltip",role:"tooltip",children:[e,n?l("em",{class:"info-tooltip-note",children:n}):null]})]}),$e=({title:e,description:n,value:t,options:i,labels:a,onChange:r})=>{const o=i.indexOf(t),c=o>0,p=o<i.length-1;return l("div",{class:"stepper-row",children:[l("div",{class:"stepper-row-header",children:[l("span",{class:"stepper-row-title",children:e}),l(de,{text:n})]}),l("div",{class:"stepper",children:[l("button",{type:"button",class:"stepper-btn",disabled:!c,onClick:()=>c&&r(i[o-1]),"aria-label":"azalt",children:"−"}),l("span",{class:"stepper-value",children:a[o]??t}),l("button",{type:"button",class:"stepper-btn",disabled:!p,onClick:()=>p&&r(i[o+1]),"aria-label":"artır",children:"+"})]})]})};function qt({translation:e,locale:n,currentTheme:t,onClose:i,onThemeChange:a,titleId:r}){const o=e.panel,[c,p]=Ae(()=>oe()),[u,_]=Ae(!1),s=le(null);j(()=>K(E.CHANGE,d=>{p(d.prefs)}),[]),j(()=>()=>{s.current&&clearTimeout(s.current)},[]);const h=d=>{const b={...c,...d};p(b),xe(d,n),ie(b)},f=(d,b)=>{h({[d]:b})},v=d=>{const b=En[d];return Object.entries(b).every(([k,L])=>c[k]===L)},m=d=>{const b=En[d];if(v(d)){const k={};for(const L of Object.keys(b))k[L]=S[L];h(k)}else h(b)},w=()=>{if(!u){_(!0),s.current&&clearTimeout(s.current),s.current=setTimeout(()=>_(!1),3e3);return}s.current&&clearTimeout(s.current),_(!1);const d=cn(n);p(d.prefs),ie(d.prefs)},y=d=>d==="auto"?o.theme.auto:d==="light"?o.theme.light:o.theme.dark;return l(F,{children:[l("div",{class:"panel-header",children:[l("h2",{class:"panel-title",id:r,children:o.title}),l("button",{type:"button",class:"dialog-close","aria-label":o.close,onClick:i,children:l(Mt,{})})]}),l("p",{class:"section-label",children:o.sections.profiles}),l("div",{class:"profile-list",children:["epilepsy","vision","cognitive","adhd","blindness"].map(d=>{const b=v(d),k=o.profiles[d];return l("button",{type:"button",class:`profile-list-item${b?" profile-list-item--active":""}`,"aria-pressed":b,onClick:()=>m(d),children:[l("span",{class:"profile-list-icon",children:l(Gt,{profileKey:d})}),l("span",{class:"profile-list-text",children:[l("span",{class:"profile-list-name",children:k.name}),l("span",{class:"profile-list-desc",children:k.description})]}),l("span",{class:"switch","aria-checked":b,role:"presentation","aria-hidden":"true",children:l("span",{class:"switch-thumb"})})]},d)})}),l("p",{class:"section-label",children:o.sections.text}),l($e,{title:o.preferences.fontScale.title,description:o.preferences.fontScale.description,value:String(c.fontScale),options:["100","110","125"],labels:["100","110","125"].map(d=>o.preferences.fontScale.values[d]),onChange:d=>f("fontScale",Number(d))}),l($e,{title:o.preferences.lineHeight.title,description:o.preferences.lineHeight.description,value:c.lineHeight,options:Cn,labels:Cn.map(d=>o.preferences.lineHeight.values[d]),onChange:d=>f("lineHeight",d)}),l($e,{title:o.preferences.letterSpacing.title,description:o.preferences.letterSpacing.description,value:c.letterSpacing,options:An,labels:An.map(d=>o.preferences.letterSpacing.values[d]),onChange:d=>f("letterSpacing",d)}),l("div",{class:"opt-label-row",children:[l("p",{class:"opt-section-title",children:o.preferences.textAlign.title}),l(de,{text:o.preferences.textAlign.description})]}),l("div",{class:"opt-buttons",children:Ut.map(d=>l("button",{type:"button",class:"opt-btn","aria-pressed":c.textAlign===d,onClick:()=>f("textAlign",d),children:o.preferences.textAlign.values[d]},d))}),l(P,{title:o.preferences.dyslexiaFont.title,description:o.preferences.dyslexiaFont.description,note:o.preferences.dyslexiaFont.note,checked:c.dyslexiaFont,onChange:d=>f("dyslexiaFont",d)}),l(P,{title:o.preferences.highlightHeadings.title,description:o.preferences.highlightHeadings.description,checked:c.highlightHeadings,onChange:d=>f("highlightHeadings",d)}),l("p",{class:"section-label",children:o.sections.vision}),l(P,{title:o.preferences.contrast.title,description:o.preferences.contrast.description,checked:c.contrast==="high",onChange:d=>f("contrast",d?"high":"normal")}),l("div",{class:"opt-label-row",children:[l("p",{class:"opt-section-title",children:o.preferences.saturation.title}),l(de,{text:o.preferences.saturation.description})]}),l("div",{class:"opt-buttons",children:Bt.map(d=>l("button",{type:"button",class:"opt-btn","aria-pressed":c.saturation===d,onClick:()=>f("saturation",d),children:o.preferences.saturation.values[d]},d))}),l("p",{class:"section-label",children:o.sections.navigation}),l(P,{title:o.preferences.focusRing.title,description:o.preferences.focusRing.description,checked:c.focusRing,onChange:d=>f("focusRing",d)}),l(P,{title:o.preferences.linkUnderline.title,description:o.preferences.linkUnderline.description,checked:c.linkUnderline,onChange:d=>f("linkUnderline",d)}),l("div",{class:"opt-label-row",children:[l("p",{class:"opt-section-title",children:o.preferences.cursorSize.title}),l(de,{text:o.preferences.cursorSize.description})]}),l("div",{class:"opt-buttons",children:jt.map((d,b)=>l("button",{type:"button",class:"opt-btn","aria-pressed":c.cursorSize===d,onClick:()=>f("cursorSize",d),children:[o.preferences.cursorSize.values.default,o.preferences.cursorSize.values.largeDark,o.preferences.cursorSize.values.largeLight][b]},d))}),l("p",{class:"section-label",children:o.sections.motion}),l(P,{title:o.preferences.motion.title,description:o.preferences.motion.description,checked:c.motion==="reduce",onChange:d=>f("motion",d?"reduce":"auto")}),l(P,{title:o.preferences.readingMode.title,description:o.preferences.readingMode.description,checked:c.readingMode,onChange:d=>f("readingMode",d)}),l(P,{title:o.preferences.hideImages.title,description:o.preferences.hideImages.description,checked:c.hideImages,onChange:d=>f("hideImages",d)}),l("p",{class:"section-label",children:o.theme.label}),l("div",{class:"opt-buttons",role:"group","aria-label":o.theme.label,children:Nt.map(d=>l("button",{type:"button",class:"opt-btn","aria-pressed":t===d,onClick:()=>a(d),children:y(d)},d))}),l("div",{class:"panel-footer",children:[l("div",{class:"sr-only",role:"status","aria-live":"polite",children:u?`${o.reset}?`:""}),l("button",{type:"button",class:"btn-reset",onClick:w,"aria-pressed":u,"data-confirm":u?"true":void 0,children:u?`${o.reset}?`:o.reset}),l("p",{class:"disclaimer",children:o.disclaimer}),l("a",{class:"panel-branding",href:"https://blakfy.com",target:"_blank",rel:"noopener noreferrer","aria-label":"Blakfy Studio — blakfy.com",children:[l("span",{class:"panel-branding-powered",children:"Powered by"}),l("span",{class:"panel-branding-name",children:"Blakfy Studio"})]})]})]})}const Wt="https://blakfy.com";function Kt(){return l("a",{class:"badge",href:Wt,target:"_blank",rel:"noopener noreferrer","aria-label":"Powered by Blakfy Studio — opens blakfy.com in a new tab",children:[l(Ht,{}),l("span",{children:["Powered by ",l("strong",{children:"Blakfy Studio"})]})]})}function Vt({config:e,translation:n,iconStyle:t="access",keyboardShortcut:i=!0,onThemeChange:a}){const[r,o]=Ae(!1),c=vn(),p=`${c}-title`,u=`${c}-desc`;j(()=>{const h=K(E.OPEN,()=>o(!0)),f=K(E.CLOSE,()=>o(!1));return()=>{h(),f()}},[]),j(()=>{if(!i||typeof window>"u")return;const h=f=>{f.altKey&&f.key==="0"&&(f.preventDefault(),o(v=>v?(O(E.CLOSE,{}),!1):(O(E.OPEN,{}),!0)))};return window.addEventListener("keydown",h),()=>{window.removeEventListener("keydown",h)}},[i]);const _=()=>{o(!0),O(E.OPEN,{})},s=()=>{o(!1),O(E.CLOSE,{})};return l(F,{children:[l(Ot,{iconStyle:t,ariaLabel:n.fab.label,isOpen:r,onClick:_}),l(Ft,{open:r,onClose:s,titleId:p,descriptionId:u,children:l(qt,{translation:n,locale:e.locale,currentTheme:e.theme,onClose:s,onThemeChange:a??(()=>{}),titleId:p,descriptionId:u})}),l(Kt,{})]})}const Yt=`/*
 * @blakfy/accessibility-widget — Shadow DOM stylesheet
 * 15 CSS custom properties from STABLE-API.md §4 are LOCKED — never rename.
 */

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

/* ==========================================================================
 * 1. Light mode defaults
 * ========================================================================== */
:host {
  --blakfy-a11y-primary: #3b82f6;
  --blakfy-a11y-primary-hover: #2563eb;
  --blakfy-a11y-primary-text: #ffffff;
  --blakfy-a11y-panel-bg: #ffffff;
  --blakfy-a11y-panel-text: #1c1c2e;
  --blakfy-a11y-panel-muted: rgba(28,28,46,0.45);
  --blakfy-a11y-panel-border: rgba(0,0,0,0.08);

  --blakfy-a11y-panel-bg-dark: #16191b;
  --blakfy-a11y-panel-text-dark: #deeffd;
  --blakfy-a11y-panel-muted-dark: rgba(222,239,253,0.45);
  --blakfy-a11y-panel-border-dark: rgba(255,255,255,0.06);

  --blakfy-a11y-toggle-on: #3b82f6;
  --blakfy-a11y-toggle-off: #d0d0e0;
  --blakfy-a11y-focus-ring: #3b82f6;
  --blakfy-a11y-fab-size: 48px;

  /* Internal — light */
  --__bg:          #ffffff;
  --__card:        #f3f4f8;
  --__card-hover:  #eaebf2;
  --__card-active: #e0e8fa;
  --__text:        #1c1c2e;
  --__muted:       rgba(28,28,46,0.45);
  --__muted-dim:   rgba(28,28,46,0.3);
  --__divide:      rgba(0,0,0,0.06);
  --__switch-off:  #d0d0e0;
  --__header-bg:   #ffffff;
}

/* ==========================================================================
 * 2. Dark mode — referans palette (#16191b sidebar, #222 cards, #deeffd text)
 * ========================================================================== */
:host([data-theme="dark"]) {
  --blakfy-a11y-panel-bg: #16191b;
  --blakfy-a11y-panel-text: #deeffd;
  --blakfy-a11y-panel-muted: rgba(222,239,253,0.45);
  --blakfy-a11y-panel-border: rgba(255,255,255,0.06);
  --blakfy-a11y-primary-hover: #60a5fa;
  --blakfy-a11y-toggle-off: #3a3d42;

  --__bg:          #16191b;
  --__card:        #222426;
  --__card-hover:  #2a2d30;
  --__card-active: #1d2a3f;
  --__text:        #deeffd;
  --__muted:       rgba(222,239,253,0.45);
  --__muted-dim:   rgba(222,239,253,0.28);
  --__divide:      rgba(255,255,255,0.06);
  --__switch-off:  #3a3d42;
  --__header-bg:   #16191b;
}

/* ==========================================================================
 * 3. Reset
 * ========================================================================== */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ==========================================================================
 * 4. Host
 * ========================================================================== */
:host {
  all: initial;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.55;
  color: var(--__text);
}

button, a {
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
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}

/* ==========================================================================
 * 5. FAB
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
  box-shadow: 0 8px 24px rgba(59,130,246,0.35);
  transition: background 200ms ease, transform 200ms ease;
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

:host([data-position="bottom-right"]) .fab {
  inset-inline-start: auto;
  inset-inline-end: 1rem;
}
:host([data-position="top-left"]) .fab {
  inset-block-end: auto;
  inset-block-start: 1rem;
}
:host([data-position="top-right"]) .fab {
  inset-block-end: auto;
  inset-block-start: 1rem;
  inset-inline-start: auto;
  inset-inline-end: 1rem;
}

.fab svg { width: 24px; height: 24px; }

/* ==========================================================================
 * 6. Badge
 * ========================================================================== */
.badge {
  position: fixed;
  inset-block-end: 0.75rem;
  inset-inline-end: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.5rem;
  font-size: 11px;
  font-weight: 500;
  text-decoration: none;
  color: var(--__muted);
  opacity: 0.8;
  transition: opacity 200ms ease;
  z-index: 9997;
  pointer-events: auto;
}
.badge:hover, .badge:focus-visible { opacity: 1; color: var(--__text); }
.badge:focus-visible { outline: 2px solid var(--blakfy-a11y-focus-ring); outline-offset: 2px; border-radius: 4px; }
.badge strong { font-weight: 700; }
.badge svg { width: 12px; height: 12px; }

/* ==========================================================================
 * 7. Dialog — sağdan kayan sidebar
 * ========================================================================== */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 9999;
  animation: blakfy-fade-in 200ms ease forwards;
}
.backdrop[data-state="closing"] { animation: blakfy-fade-out 180ms ease forwards; }

.dialog {
  position: fixed;
  inset-block-start: 0;
  inset-inline-end: 0;
  inline-size: 400px;
  max-inline-size: 100vw;
  block-size: 100vh;
  overflow-y: auto;
  background: var(--__bg);
  color: var(--__text);
  z-index: 10000;
  box-shadow: -12px 0 40px rgba(0,0,0,0.22);
  scrollbar-width: thin;
  scrollbar-color: var(--__divide) transparent;
  animation: blakfy-slide-in-right 240ms cubic-bezier(0.25,0.46,0.45,0.94) forwards;
}
.dialog[data-state="closing"] { animation: blakfy-slide-out-right 190ms ease forwards; }
.dialog:focus { outline: none; }

/* ==========================================================================
 * 8. Panel header
 * ========================================================================== */
.panel-header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem 1rem;
  background: var(--__header-bg);
  border-block-end: 1px solid var(--__divide);
}

.panel-title {
  font-size: 17px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--__text);
  letter-spacing: -0.01em;
}

.dialog-close {
  width: 36px;
  height: 36px;
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: var(--__muted);
  transition: background 150ms ease, color 150ms ease;
  flex-shrink: 0;
}
.dialog-close:hover { background: var(--__divide); color: var(--__text); }
.dialog-close:focus-visible { outline: 2px solid var(--blakfy-a11y-focus-ring); outline-offset: 2px; }
.dialog-close svg { width: 18px; height: 18px; }

/* ==========================================================================
 * 9. Section labels
 * ========================================================================== */
.section-label {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: none;
  color: var(--__text);
  padding: 1.125rem 1.5rem 0.5rem;
  opacity: 0.9;
}

.opt-section-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--__text);
  opacity: 0.7;
  margin-block-end: 0.375rem;
}

/* ==========================================================================
 * 10. Switch
 * ========================================================================== */
.switch {
  position: relative;
  flex-shrink: 0;
  inline-size: 44px;
  block-size: 26px;
  border-radius: 9999px;
  background: var(--__switch-off);
  transition: background 200ms ease;
}
.switch[aria-checked="true"] { background: var(--blakfy-a11y-primary); }
.switch:focus-visible { outline: 2px solid var(--blakfy-a11y-focus-ring); outline-offset: 2px; }
.switch::before { content: ""; position: absolute; inset: -8px; }

.switch-thumb {
  position: absolute;
  inset-block-start: 3px;
  inset-inline-start: 3px;
  inline-size: 20px;
  block-size: 20px;
  border-radius: 9999px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  transition: transform 200ms ease;
}
.switch[aria-checked="true"] .switch-thumb { transform: translateX(18px); }
[dir="rtl"] .switch[aria-checked="true"] .switch-thumb { transform: translateX(-18px); }

/* ==========================================================================
 * 11. Profile list
 * ========================================================================== */
.profile-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 1.25rem;
}

.profile-list-item {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.75rem 1rem;
  background: var(--__card);
  border-radius: 10px;
  cursor: pointer;
  border: none;
  outline: 2px solid transparent;
  transition: background 150ms ease, outline-color 150ms ease;
  text-align: start;
  width: 100%;
}
.profile-list-item:hover { background: var(--__card-hover); }
.profile-list-item--active {
  background: var(--__card-active);
  outline-color: var(--blakfy-a11y-primary);
}
.profile-list-item:focus-visible { outline-color: var(--blakfy-a11y-focus-ring); }

.profile-list-icon { color: var(--blakfy-a11y-primary); flex-shrink: 0; }
.profile-list-icon svg { width: 18px; height: 18px; }

.profile-list-text { flex: 1; min-width: 0; }

.profile-list-name {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--__text);
  line-height: 1.25;
  display: block;
}

.profile-list-desc {
  font-size: 11.5px;
  font-weight: 400;
  color: var(--__muted);
  line-height: 1.4;
  margin-top: 2px;
  display: block;
}

.profile-list-item .switch { pointer-events: none; }

/* ==========================================================================
 * 12. Stepper row
 * ========================================================================== */
.stepper-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 1rem;
  background: var(--__card);
  border-radius: 10px;
  margin: 0 1.25rem 0.375rem;
}

.stepper-row-header {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.stepper-row-title {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--__text);
}

.stepper {
  display: flex;
  align-items: center;
  background: var(--__bg);
  border-radius: 8px;
  border: 1px solid var(--__divide);
}

.stepper-btn {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--blakfy-a11y-primary);
  font-size: 20px;
  font-weight: 300;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 7px;
  flex-shrink: 0;
  transition: background 120ms ease;
}
.stepper-btn:hover { background: var(--__card); }
.stepper-btn:disabled { color: var(--__muted); cursor: default; }
.stepper-btn:focus-visible { outline: 2px solid var(--blakfy-a11y-focus-ring); }

.stepper-value {
  min-width: 62px;
  text-align: center;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--__text);
  padding: 0 0.25rem;
}

/* ==========================================================================
 * 13. Toggle row
 * ========================================================================== */
.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.875rem;
  background: var(--__card);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  margin: 0 1.25rem 0.25rem;
  transition: background 150ms ease;
}
.toggle-row:hover { background: var(--__card-hover); }

.toggle-text { flex: 1; min-width: 0; }

.toggle-title-row {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.toggle-title {
  font-size: 13.5px;
  font-weight: 500;
  line-height: 1.3;
  color: var(--__text);
}

/* ==========================================================================
 * 14. Info button + tooltip
 * ========================================================================== */
.info-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.info-btn {
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background: var(--__muted);
  color: var(--__bg);
  font-size: 9px;
  font-weight: 700;
  font-style: italic;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  border: none;
  padding: 0;
  line-height: 1;
  flex-shrink: 0;
  opacity: 0.45;
  transition: opacity 150ms ease, background 150ms ease;
}
.info-btn:hover, .info-btn:focus-visible {
  opacity: 1;
  background: var(--blakfy-a11y-primary);
  color: #ffffff;
}
.info-btn:focus-visible { outline: 2px solid var(--blakfy-a11y-focus-ring); outline-offset: 2px; }

.info-tooltip {
  display: none;
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: calc(100% + 6px);
  background: var(--__card);
  border: 1px solid var(--__divide);
  border-radius: 10px;
  padding: 0.625rem 0.75rem;
  font-size: 11.5px;
  font-weight: 400;
  line-height: 1.55;
  color: var(--__text);
  inline-size: 220px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.14);
  z-index: 100;
  pointer-events: none;
}
.info-wrap:hover .info-tooltip,
.info-wrap:focus-within .info-tooltip { display: block; }

.info-tooltip-note {
  display: block;
  margin-block-start: 0.25rem;
  font-size: 10.5px;
  color: #f59e0b;
  font-style: italic;
}

/* ==========================================================================
 * 15. Opt-label row
 * ========================================================================== */
.opt-label-row {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.625rem 1.25rem 0.25rem;
}
.opt-label-row .opt-section-title { margin-block-end: 0; }

/* ==========================================================================
 * 16. Opt buttons
 * ========================================================================== */
.opt-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  padding: 0 1.25rem 0.5rem;
}

.opt-btn {
  min-block-size: 34px;
  padding-inline: 0.75rem;
  font-size: 12.5px;
  font-weight: 500;
  border: 1px solid var(--__divide);
  border-radius: 8px;
  color: var(--__text);
  white-space: nowrap;
  flex: 1;
  min-inline-size: fit-content;
  background: var(--__card);
  transition: background 150ms, border-color 150ms, color 150ms;
  opacity: 0.75;
}
.opt-btn:hover { background: var(--__card-hover); opacity: 1; }
.opt-btn[aria-pressed="true"] {
  background: var(--blakfy-a11y-primary);
  color: #ffffff;
  border-color: var(--blakfy-a11y-primary);
  opacity: 1;
}
.opt-btn:focus-visible { outline: 2px solid var(--blakfy-a11y-focus-ring); outline-offset: 2px; }

/* ==========================================================================
 * 17. Panel footer
 * ========================================================================== */
.panel-footer {
  padding: 1.25rem 1.5rem;
  border-block-start: 1px solid var(--__divide);
  margin-block-start: 0.5rem;
}

/* ==========================================================================
 * 18. Reset butonu
 * ========================================================================== */
.btn-reset {
  width: 100%;
  min-block-size: 42px;
  border: 1px solid var(--__divide);
  border-radius: 10px;
  color: var(--blakfy-a11y-primary);
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: background 150ms, border-color 150ms;
}
.btn-reset:hover {
  background: var(--__card);
  border-color: var(--blakfy-a11y-primary);
}
.btn-reset[data-confirm="true"] {
  background: #dc2626;
  border-color: #dc2626;
  color: #fff;
}
.btn-reset:focus-visible { outline: 2px solid var(--blakfy-a11y-focus-ring); outline-offset: 2px; }

/* ==========================================================================
 * 19. Disclaimer + branding
 * ========================================================================== */
.disclaimer {
  margin-top: 0.875rem;
  font-size: 11px;
  font-weight: 400;
  font-style: italic;
  line-height: 1.5;
  color: var(--__muted-dim);
}

.panel-branding {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  margin-block-start: 1rem;
  padding: 0.45rem 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: background 150ms ease;
}
.panel-branding:hover { background: rgba(59,130,246,0.07); }
.panel-branding:focus-visible { outline: 2px solid var(--blakfy-a11y-focus-ring); outline-offset: 2px; border-radius: 8px; }

.panel-branding-powered {
  font-size: 11px;
  font-weight: 400;
  color: var(--__muted);
}
.panel-branding-name {
  font-size: 12px;
  font-weight: 700;
  color: var(--blakfy-a11y-primary);
}

/* ==========================================================================
 * 20. Animations
 * ========================================================================== */
@keyframes blakfy-fade-in  { from { opacity: 0; } to { opacity: 1; } }
@keyframes blakfy-fade-out { from { opacity: 1; } to { opacity: 0; } }

@keyframes blakfy-slide-in-right {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
@keyframes blakfy-slide-out-right {
  from { transform: translateX(0);    opacity: 1; }
  to   { transform: translateX(100%); opacity: 0; }
}

/* ==========================================================================
 * 21. Reduced motion
 * ========================================================================== */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

/* ==========================================================================
 * 22. Responsive
 * ========================================================================== */
@media (max-width: 480px) {
  .fab { --blakfy-a11y-fab-size: 44px; }
  .dialog { inline-size: 100vw; }
}

/* ==========================================================================
 * 23. Forced colors / Windows High Contrast
 * ========================================================================== */
@media (forced-colors: active) {
  .fab, .btn-reset, .opt-btn, .switch {
    border: 1px solid CanvasText;
    forced-color-adjust: none;
  }
  .switch[aria-checked="true"] { background: Highlight; }
  .switch-thumb { background: HighlightText; }
}
`,Xt="2.0.0-alpha.0";function Jt(e){const n={open:()=>O(E.OPEN,{}),close:()=>O(E.CLOSE,{}),getPreferences:()=>oe(),setPreferences:t=>{xe(t,e.config.locale)},reset:()=>{cn(e.config.locale)},onChange:t=>K(E.CHANGE,i=>t(i.prefs)),configure:t=>e.configure(t),diagnostics:()=>ft({config:e.config,performance:{mountTimeMs:e.mountTimeMs,bundleSizeGz:e.bundleSizeGz,timeToFirstClick:null},storage:e.storage}),version:Xt};return typeof window<"u"&&(window.BlakfyA11y&&typeof window.BlakfyA11y=="object"?Object.assign(window.BlakfyA11y,n):window.BlakfyA11y=n),n}const $n="blakfy-a11y-root",Le="2.0.0-alpha.0";function Zt(e){const n=e.toLowerCase().split(/[-_]/)[0]??"";return{tr:"tr",en:"en",de:"de",fr:"fr",es:"es",it:"it",ar:"ar",he:"he",ru:"ru",iw:"he"}[n]}function Qt(){if(typeof document>"u")return"en";const e=document.documentElement.lang??"";return Zt(e)??"en"}function er(){if(typeof document>"u")return{};let e=Tn??document.currentScript;if(!e){const i=document.querySelectorAll("script[src]");for(let a=0;a<i.length;a++){const r=i[a];if(r&&r.src&&/accessibility[-_]widget|blakfy|widget\.js$/i.test(r.src)){e=r;break}}}if(!e)return{};const n=e.dataset,t={};return n.locale?t.locale=n.locale:t.locale=Qt(),n.theme&&(t.theme=n.theme),n.position&&(t.position=n.position),n.font&&(t.font=n.font),n.debug&&(t.debug=n.debug==="true"),n.devPipe&&(t.devPipe=n.devPipe),n.version&&(t.version=n.version),t}function nr(){if(typeof document>"u")return!0;const e=document.querySelectorAll("link[href]");for(let n=0;n<e.length;n++){const t=e[n];if(t&&t.href&&/open[-_]?dyslexic/i.test(t.href))return!0}return!1}function tr(e){if(typeof document>"u")return{mismatched:!1,fields:[]};const n=document.documentElement;if(!n)return{mismatched:!1,fields:[]};const t={"data-a11y-fontscale":String(e.fontScale),"data-a11y-contrast":e.contrast,"data-a11y-focus":e.focusRing?"enhanced":"default","data-a11y-links":e.linkUnderline?"underline":"default","data-a11y-motion":e.motion,"data-a11y-dyslexia":String(e.dyslexiaFont),"data-a11y-reading":String(e.readingMode)},i=[];let a=!1;for(const r of Object.keys(t)){if(!n.hasAttribute(r))continue;a=!0,n.getAttribute(r)!==t[r]&&i.push(r)}return{mismatched:a&&i.length>0,fields:i}}function Ln(e){try{const n=new URL(e);return n.origin+n.pathname.replace(/\/[^/]*$/,"")}catch{return""}}const Tn=typeof document<"u"?document.currentScript:null,Rn=typeof document<"u"?Ln(Tn?.src??""):"";function Mn(){if(typeof document>"u")return"";if(Rn)return Rn;const e=document.querySelectorAll("script[src]");for(let n=0;n<e.length;n++){const t=e[n];if(t&&t.src&&/accessibility[-_]widget|blakfy|widget\.js$/i.test(t.src)){const i=Ln(t.src);if(i)return i}}return""}function rr(e){return Gn.includes(e)}function ir(e){if(e==="dark")return"dark";if(e==="light")return"light";if(typeof document<"u"){const n=document.documentElement,t=n.getAttribute("data-theme");if(t==="dark")return"dark";if(t==="light")return"light";if(n.getAttribute("data-color-mode")==="dark"||n.classList.contains("dark"))return"dark";if(n.classList.contains("light"))return"light"}if(typeof window>"u"||typeof window.matchMedia!="function")return"light";try{return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function or(e){if(typeof MutationObserver>"u"||typeof document>"u")return()=>{};const n=new MutationObserver(e);return n.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-mode"]}),()=>n.disconnect()}function V(e,n){e.setAttribute("data-position",n.position),e.setAttribute("data-theme",ir(n.theme)),e.setAttribute("dir",rr(n.locale)?"rtl":"ltr"),n.font&&e.style.setProperty("font-family",n.font)}function ar(e){const n=document.createElement("style");n.textContent=Yt,e.appendChild(n)}function sr(){const e=document.querySelector($n);if(e&&e instanceof HTMLElement)return e;const n=document.createElement($n);return document.body.appendChild(n),n}function Te(e={}){const n=typeof performance<"u"?performance.now():Date.now();if(typeof document>"u")return{unmount:()=>{}};const t=er(),i=typeof window<"u"?window.__BLAKFY_A11Y__??{}:{};let r=Ze({...t,...i,...e});const o=oe(),c=tr(o);c.mismatched&&A("error","SSR_HYDRATION_MISMATCH",`SSR-rendered prefs differ from client storage: ${c.fields.join(", ")}`),ie(o),t.version&&t.version!==Le&&A("error","CDN_VERSION_MISMATCH",`Expected version ${t.version} but runtime is ${Le} — clear your CDN cache.`),o.dyslexiaFont&&!nr()&&A("warn","OPENDYSLEXIC_CDN_MISSING","dyslexiaFont=true but no OpenDyslexic CDN <link> found — system fallback active."),at()&&A("warn","HOST_CSS_IMPORTANT_CONFLICT","Host stylesheet uses !important on body/a — visual prefs may not apply.");const p=ke();p.reducedMotion&&A("info","OS_PREFERS_REDUCED_MOTION","OS prefers-reduced-motion=reduce detected."),p.contrast==="more"&&A("info","OS_PREFERS_CONTRAST_MORE","OS prefers-contrast=more detected."),p.colorScheme==="dark"&&A("info","OS_PREFERS_COLOR_SCHEME_DARK","OS prefers-color-scheme=dark detected.");const u=lt(()=>{m.config.theme==="auto"&&(V(m.host,m.config),m.rerender())}),_=or(()=>{m.config.theme==="auto"&&(V(m.host,m.config),m.rerender())});t.devPipe&&ut(t.devPipe);let s=null;if(typeof i.onPreferencesChange=="function"){const b=i.onPreferencesChange;s=K(E.CHANGE,k=>{try{b(k)}catch{}})}const h=sr(),f=h.shadowRoot??h.attachShadow({mode:"open"});for(;f.firstChild;)f.removeChild(f.firstChild);ar(f),V(h,r);let v=un();const m={config:r,translation:v,shadowRoot:f,host:h,rerender:()=>{Ve(Fe(Vt,{config:m.config,translation:m.translation,onThemeChange:b=>{m.config={...m.config,theme:b},V(h,m.config),m.rerender()}}),f)}};if(m.rerender(),r.locale!=="en"){const b=Mn();dn(r.locale,b).then(k=>{v=k,m.translation=k,m.rerender()})}const w=vt(),y=(typeof performance<"u"?performance.now():Date.now())-n;return Jt({config:r,mountTimeMs:y,bundleSizeGz:0,storage:w,configure:b=>{const k=Ze({...m.config,...b}),L=k.locale!==m.config.locale;if(m.config=k,V(h,k),L)if(k.locale==="en")m.translation=un(),m.rerender();else{const ue=Mn();dn(k.locale,ue).then(G=>{m.translation=G,m.rerender()})}else m.rerender()}}),A("info","INITIALIZED",`Widget mounted in ${y.toFixed(1)}ms`),O(E.READY,{version:Le}),{unmount:()=>{u(),_(),s&&s(),Ve(null,f),h.parentNode&&h.parentNode.removeChild(h)}}}const Hn="blakfy-a11y";class In extends HTMLElement{constructor(){super(...arguments);Me(this,"_unmount",null)}connectedCallback(){if(this._unmount)return;const t=this._readAttributes(),i=Te(t);this._unmount=i.unmount}disconnectedCallback(){this._unmount&&(this._unmount(),this._unmount=null)}attributeChangedCallback(t,i,a){if(i===a||!this._unmount||typeof window>"u"||!window.BlakfyA11y)return;const r=this._readAttributes();window.BlakfyA11y.configure(r)}_readAttributes(){const t={},i=this.getAttribute("locale");i&&(t.locale=i);const a=this.getAttribute("theme");a&&(t.theme=a);const r=this.getAttribute("position");r&&(t.position=r);const o=this.getAttribute("font");o&&(t.font=o);const c=this.getAttribute("debug");return c!=null&&(t.debug=c==="true"),t}}Me(In,"observedAttributes",["locale","theme","position","font","debug"]);function On(){typeof customElements>"u"||customElements.get(Hn)||customElements.define(Hn,In)}const lr="blakfy-a11y-root",cr="blakfy-a11y";function Pn(){typeof document>"u"||document.querySelector(lr)||document.querySelector(cr)||Te()}On(),typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Pn,{once:!0}):Pn()),M.defineCustomElement=On,M.mount=Te,Object.defineProperty(M,Symbol.toStringTag,{value:"Module"})})(this.BlakfyA11y=this.BlakfyA11y||{});
//# sourceMappingURL=widget.js.map
