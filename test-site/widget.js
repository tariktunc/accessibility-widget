var mr=Object.defineProperty;var gr=(I,R,y)=>R in I?mr(I,R,{enumerable:!0,configurable:!0,writable:!0,value:y}):I[R]=y;var Fe=(I,R,y)=>gr(I,typeof R!="symbol"?R+"":R,y);(function(I){"use strict";var R,y,Oe,D,Ie,ze,Pe,_e,ne,X,De,be,ye,ve,te={},re=[],Bn=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,oe=Array.isArray;function z(e,n){for(var t in n)e[t]=n[t];return e}function ke(e){e&&e.parentNode&&e.parentNode.removeChild(e)}function Ne(e,n,t){var o,i,r,d={};for(r in n)r=="key"?o=n[r]:r=="ref"?i=n[r]:d[r]=n[r];if(arguments.length>2&&(d.children=arguments.length>3?R.call(arguments,2):t),typeof e=="function"&&e.defaultProps!=null)for(r in e.defaultProps)d[r]===void 0&&(d[r]=e.defaultProps[r]);return ie(e,d,o,i,null)}function ie(e,n,t,o,i){var r={type:e,props:n,key:t,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++Oe,__i:-1,__u:0};return i==null&&y.vnode!=null&&y.vnode(r),r}function j(e){return e.children}function ae(e,n){this.props=e,this.context=n}function G(e,n){if(n==null)return e.__?G(e.__,e.__i+1):null;for(var t;n<e.__k.length;n++)if((t=e.__k[n])!=null&&t.__e!=null)return t.__e;return typeof e.type=="function"?G(e):null}function jn(e){if(e.__P&&e.__d){var n=e.__v,t=n.__e,o=[],i=[],r=z({},n);r.__v=n.__v+1,y.vnode&&y.vnode(r),we(e.__P,r,n,e.__n,e.__P.namespaceURI,32&n.__u?[t]:null,o,t??G(n),!!(32&n.__u),i),r.__v=n.__v,r.__.__k[r.__i]=r,Ke(o,r,i),n.__e=n.__=null,r.__e!=t&&Ue(r)}}function Ue(e){if((e=e.__)!=null&&e.__c!=null)return e.__e=e.__c.base=null,e.__k.some(function(n){if(n!=null&&n.__e!=null)return e.__e=e.__c.base=n.__e}),Ue(e)}function Be(e){(!e.__d&&(e.__d=!0)&&D.push(e)&&!le.__r++||Ie!=y.debounceRendering)&&((Ie=y.debounceRendering)||ze)(le)}function le(){try{for(var e,n=1;D.length;)D.length>n&&D.sort(Pe),e=D.shift(),n=D.length,jn(e)}finally{D.length=le.__r=0}}function je(e,n,t,o,i,r,d,a,u,f,m){var s,p,h,k,_,w,g,v=o&&o.__k||re,E=n.length;for(u=Gn(t,n,v,u,E),s=0;s<E;s++)(h=t.__k[s])!=null&&(p=h.__i!=-1&&v[h.__i]||te,h.__i=s,w=we(e,h,p,i,r,d,a,u,f,m),k=h.__e,h.ref&&p.ref!=h.ref&&(p.ref&&Se(p.ref,null,h),m.push(h.ref,h.__c||k,h)),_==null&&k!=null&&(_=k),(g=!!(4&h.__u))||p.__k===h.__k?(u=Ge(h,u,e,g),g&&p.__e&&(p.__e=null)):typeof h.type=="function"&&w!==void 0?u=w:k&&(u=k.nextSibling),h.__u&=-7);return t.__e=_,u}function Gn(e,n,t,o,i){var r,d,a,u,f,m=t.length,s=m,p=0;for(e.__k=new Array(i),r=0;r<i;r++)(d=n[r])!=null&&typeof d!="boolean"&&typeof d!="function"?(typeof d=="string"||typeof d=="number"||typeof d=="bigint"||d.constructor==String?d=e.__k[r]=ie(null,d,null,null,null):oe(d)?d=e.__k[r]=ie(j,{children:d},null,null,null):d.constructor===void 0&&d.__b>0?d=e.__k[r]=ie(d.type,d.props,d.key,d.ref?d.ref:null,d.__v):e.__k[r]=d,u=r+p,d.__=e,d.__b=e.__b+1,a=null,(f=d.__i=Wn(d,t,u,s))!=-1&&(s--,(a=t[f])&&(a.__u|=2)),a==null||a.__v==null?(f==-1&&(i>m?p--:i<m&&p++),typeof d.type!="function"&&(d.__u|=4)):f!=u&&(f==u-1?p--:f==u+1?p++:(f>u?p--:p++,d.__u|=4))):e.__k[r]=null;if(s)for(r=0;r<m;r++)(a=t[r])!=null&&!(2&a.__u)&&(a.__e==o&&(o=G(a)),Ye(a,a));return o}function Ge(e,n,t,o){var i,r;if(typeof e.type=="function"){for(i=e.__k,r=0;i&&r<i.length;r++)i[r]&&(i[r].__=e,n=Ge(i[r],n,t,o));return n}e.__e!=n&&(o&&(n&&e.type&&!n.parentNode&&(n=G(e)),t.insertBefore(e.__e,n||null)),n=e.__e);do n=n&&n.nextSibling;while(n!=null&&n.nodeType==8);return n}function Wn(e,n,t,o){var i,r,d,a=e.key,u=e.type,f=n[t],m=f!=null&&(2&f.__u)==0;if(f===null&&a==null||m&&a==f.key&&u==f.type)return t;if(o>(m?1:0)){for(i=t-1,r=t+1;i>=0||r<n.length;)if((f=n[d=i>=0?i--:r++])!=null&&!(2&f.__u)&&a==f.key&&u==f.type)return d}return-1}function We(e,n,t){n[0]=="-"?e.setProperty(n,t??""):e[n]=t==null?"":typeof t!="number"||Bn.test(n)?t:t+"px"}function se(e,n,t,o,i){var r,d;e:if(n=="style")if(typeof t=="string")e.style.cssText=t;else{if(typeof o=="string"&&(e.style.cssText=o=""),o)for(n in o)t&&n in t||We(e.style,n,"");if(t)for(n in t)o&&t[n]==o[n]||We(e.style,n,t[n])}else if(n[0]=="o"&&n[1]=="n")r=n!=(n=n.replace(De,"$1")),d=n.toLowerCase(),n=d in e||n=="onFocusOut"||n=="onFocusIn"?d.slice(2):n.slice(2),e.l||(e.l={}),e.l[n+r]=t,t?o?t[X]=o[X]:(t[X]=be,e.addEventListener(n,r?ve:ye,r)):e.removeEventListener(n,r?ve:ye,r);else{if(i=="http://www.w3.org/2000/svg")n=n.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(n!="width"&&n!="height"&&n!="href"&&n!="list"&&n!="form"&&n!="tabIndex"&&n!="download"&&n!="rowSpan"&&n!="colSpan"&&n!="role"&&n!="popover"&&n in e)try{e[n]=t??"";break e}catch{}typeof t=="function"||(t==null||t===!1&&n[4]!="-"?e.removeAttribute(n):e.setAttribute(n,n=="popover"&&t==1?"":t))}}function qe(e){return function(n){if(this.l){var t=this.l[n.type+e];if(n[ne]==null)n[ne]=be++;else if(n[ne]<t[X])return;return t(y.event?y.event(n):n)}}}function we(e,n,t,o,i,r,d,a,u,f){var m,s,p,h,k,_,w,g,v,E,C,P,Y,H,F,c=n.type;if(n.constructor!==void 0)return null;128&t.__u&&(u=!!(32&t.__u),r=[a=n.__e=t.__e]),(m=y.__b)&&m(n);e:if(typeof c=="function")try{if(g=n.props,v=c.prototype&&c.prototype.render,E=(m=c.contextType)&&o[m.__c],C=m?E?E.props.value:m.__:o,t.__c?w=(s=n.__c=t.__c).__=s.__E:(v?n.__c=s=new c(g,C):(n.__c=s=new ae(g,C),s.constructor=c,s.render=Kn),E&&E.sub(s),s.state||(s.state={}),s.__n=o,p=s.__d=!0,s.__h=[],s._sb=[]),v&&s.__s==null&&(s.__s=s.state),v&&c.getDerivedStateFromProps!=null&&(s.__s==s.state&&(s.__s=z({},s.__s)),z(s.__s,c.getDerivedStateFromProps(g,s.__s))),h=s.props,k=s.state,s.__v=n,p)v&&c.getDerivedStateFromProps==null&&s.componentWillMount!=null&&s.componentWillMount(),v&&s.componentDidMount!=null&&s.__h.push(s.componentDidMount);else{if(v&&c.getDerivedStateFromProps==null&&g!==h&&s.componentWillReceiveProps!=null&&s.componentWillReceiveProps(g,C),n.__v==t.__v||!s.__e&&s.shouldComponentUpdate!=null&&s.shouldComponentUpdate(g,s.__s,C)===!1){n.__v!=t.__v&&(s.props=g,s.state=s.__s,s.__d=!1),n.__e=t.__e,n.__k=t.__k,n.__k.some(function(b){b&&(b.__=n)}),re.push.apply(s.__h,s._sb),s._sb=[],s.__h.length&&d.push(s);break e}s.componentWillUpdate!=null&&s.componentWillUpdate(g,s.__s,C),v&&s.componentDidUpdate!=null&&s.__h.push(function(){s.componentDidUpdate(h,k,_)})}if(s.context=C,s.props=g,s.__P=e,s.__e=!1,P=y.__r,Y=0,v)s.state=s.__s,s.__d=!1,P&&P(n),m=s.render(s.props,s.state,s.context),re.push.apply(s.__h,s._sb),s._sb=[];else do s.__d=!1,P&&P(n),m=s.render(s.props,s.state,s.context),s.state=s.__s;while(s.__d&&++Y<25);s.state=s.__s,s.getChildContext!=null&&(o=z(z({},o),s.getChildContext())),v&&!p&&s.getSnapshotBeforeUpdate!=null&&(_=s.getSnapshotBeforeUpdate(h,k)),H=m!=null&&m.type===j&&m.key==null?Ve(m.props.children):m,a=je(e,oe(H)?H:[H],n,t,o,i,r,d,a,u,f),s.base=n.__e,n.__u&=-161,s.__h.length&&d.push(s),w&&(s.__E=s.__=null)}catch(b){if(n.__v=null,u||r!=null)if(b.then){for(n.__u|=u?160:128;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;r[r.indexOf(a)]=null,n.__e=a}else{for(F=r.length;F--;)ke(r[F]);xe(n)}else n.__e=t.__e,n.__k=t.__k,b.then||xe(n);y.__e(b,n,t)}else r==null&&n.__v==t.__v?(n.__k=t.__k,n.__e=t.__e):a=n.__e=qn(t.__e,n,t,o,i,r,d,u,f);return(m=y.diffed)&&m(n),128&n.__u?void 0:a}function xe(e){e&&(e.__c&&(e.__c.__e=!0),e.__k&&e.__k.some(xe))}function Ke(e,n,t){for(var o=0;o<t.length;o++)Se(t[o],t[++o],t[++o]);y.__c&&y.__c(n,e),e.some(function(i){try{e=i.__h,i.__h=[],e.some(function(r){r.call(i)})}catch(r){y.__e(r,i.__v)}})}function Ve(e){return typeof e!="object"||e==null||e.__b>0?e:oe(e)?e.map(Ve):z({},e)}function qn(e,n,t,o,i,r,d,a,u){var f,m,s,p,h,k,_,w=t.props||te,g=n.props,v=n.type;if(v=="svg"?i="http://www.w3.org/2000/svg":v=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),r!=null){for(f=0;f<r.length;f++)if((h=r[f])&&"setAttribute"in h==!!v&&(v?h.localName==v:h.nodeType==3)){e=h,r[f]=null;break}}if(e==null){if(v==null)return document.createTextNode(g);e=document.createElementNS(i,v,g.is&&g),a&&(y.__m&&y.__m(n,r),a=!1),r=null}if(v==null)w===g||a&&e.data==g||(e.data=g);else{if(r=r&&R.call(e.childNodes),!a&&r!=null)for(w={},f=0;f<e.attributes.length;f++)w[(h=e.attributes[f]).name]=h.value;for(f in w)h=w[f],f=="dangerouslySetInnerHTML"?s=h:f=="children"||f in g||f=="value"&&"defaultValue"in g||f=="checked"&&"defaultChecked"in g||se(e,f,null,h,i);for(f in g)h=g[f],f=="children"?p=h:f=="dangerouslySetInnerHTML"?m=h:f=="value"?k=h:f=="checked"?_=h:a&&typeof h!="function"||w[f]===h||se(e,f,h,w[f],i);if(m)a||s&&(m.__html==s.__html||m.__html==e.innerHTML)||(e.innerHTML=m.__html),n.__k=[];else if(s&&(e.innerHTML=""),je(n.type=="template"?e.content:e,oe(p)?p:[p],n,t,o,v=="foreignObject"?"http://www.w3.org/1999/xhtml":i,r,d,r?r[0]:t.__k&&G(t,0),a,u),r!=null)for(f=r.length;f--;)ke(r[f]);a||(f="value",v=="progress"&&k==null?e.removeAttribute("value"):k!=null&&(k!==e[f]||v=="progress"&&!k||v=="option"&&k!=w[f])&&se(e,f,k,w[f],i),f="checked",_!=null&&_!=e[f]&&se(e,f,_,w[f],i))}return e}function Se(e,n,t){try{if(typeof e=="function"){var o=typeof e.__u=="function";o&&e.__u(),o&&n==null||(e.__u=e(n))}else e.current=n}catch(i){y.__e(i,t)}}function Ye(e,n,t){var o,i;if(y.unmount&&y.unmount(e),(o=e.ref)&&(o.current&&o.current!=e.__e||Se(o,null,n)),(o=e.__c)!=null){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(r){y.__e(r,n)}o.base=o.__P=null}if(o=e.__k)for(i=0;i<o.length;i++)o[i]&&Ye(o[i],n,t||typeof e.type!="function");t||ke(e.__e),e.__c=e.__=e.__e=void 0}function Kn(e,n,t){return this.constructor(e,t)}function Xe(e,n,t){var o,i,r,d;n==document&&(n=document.documentElement),y.__&&y.__(e,n),i=(o=!1)?null:n.__k,r=[],d=[],we(n,e=n.__k=Ne(j,null,[e]),i||te,te,n.namespaceURI,i?null:n.firstChild?R.call(n.childNodes):null,r,i?i.__e:n.firstChild,o,d),Ke(r,e,d)}R=re.slice,y={__e:function(e,n,t,o){for(var i,r,d;n=n.__;)if((i=n.__c)&&!i.__)try{if((r=i.constructor)&&r.getDerivedStateFromError!=null&&(i.setState(r.getDerivedStateFromError(e)),d=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(e,o||{}),d=i.__d),d)return i.__E=i}catch(a){e=a}throw e}},Oe=0,ae.prototype.setState=function(e,n){var t;t=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=z({},this.state),typeof e=="function"&&(e=e(z({},t),this.props)),e&&z(t,e),e!=null&&this.__v&&(n&&this._sb.push(n),Be(this))},ae.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),Be(this))},ae.prototype.render=j,D=[],ze=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Pe=function(e,n){return e.__v.__b-n.__v.__b},le.__r=0,_e=Math.random().toString(8),ne="__d"+_e,X="__a"+_e,De=/(PointerCapture)$|Capture$/i,be=0,ye=qe(!1),ve=qe(!0);const Je="blakfy_a11y_prefs",Ze="blakfy_a11y_prefs",W="1.0.0",T={READY:"blakfy:a11y:ready",CHANGE:"blakfy:a11y:change",OPEN:"blakfy:a11y:open",CLOSE:"blakfy:a11y:close"},S={fontScale:100,contrast:"normal",focusRing:!1,linkUnderline:!1,motion:"auto",dyslexiaFont:!1,readingMode:!1,lineHeight:"normal",letterSpacing:"normal",textAlign:"default",highlightHeadings:!1,saturation:"normal",cursorSize:"default",hideImages:!1},Vn=["tr","en","de","fr","es","it","ar","he","ru"],Yn=["ar","he"],Xn={locale:"en",theme:"auto",position:"bottom-left",font:"",debug:!1};function Ae(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Jn(e){return e===100||e===110||e===125?e:S.fontScale}function Zn(e){return e==="normal"||e==="high"?e:S.contrast}function B(e,n){return typeof e=="boolean"?e:n}function Qn(e){return e==="auto"||e==="reduce"?e:S.motion}function et(e){return e==="normal"||e==="medium"||e==="large"?e:S.lineHeight}function nt(e){return e==="normal"||e==="medium"||e==="large"?e:S.letterSpacing}function tt(e){return e==="default"||e==="left"||e==="center"||e==="right"?e:S.textAlign}function rt(e){return e==="normal"||e==="high"||e==="low"||e==="none"?e:S.saturation}function ot(e){return e==="default"||e==="large-dark"||e==="large-light"?e:S.cursorSize}function it(e){return typeof e=="string"&&Vn.includes(e)?e:"en"}function at(e){return e==="light"||e==="dark"||e==="auto"?e:"auto"}function lt(e){return e==="bottom-left"||e==="bottom-right"||e==="top-left"||e==="top-right"?e:"bottom-left"}function ce(e,n){return typeof e=="string"?e:n}function Qe(e){return Ae(e)?{fontScale:Jn(e.fontScale),contrast:Zn(e.contrast),focusRing:B(e.focusRing,S.focusRing),linkUnderline:B(e.linkUnderline,S.linkUnderline),motion:Qn(e.motion),dyslexiaFont:B(e.dyslexiaFont,S.dyslexiaFont),readingMode:B(e.readingMode,S.readingMode),lineHeight:et(e.lineHeight),letterSpacing:nt(e.letterSpacing),textAlign:tt(e.textAlign),highlightHeadings:B(e.highlightHeadings,S.highlightHeadings),saturation:rt(e.saturation),cursorSize:ot(e.cursorSize),hideImages:B(e.hideImages,S.hideImages)}:{...S}}function st(e){if(!Ae(e))return null;const n=Qe(e.prefs),t=ce(e.version,W),o=ce(e.timestamp,new Date().toISOString()),i=ce(e.locale,"en");return{prefs:n,version:t,timestamp:o,locale:i}}function en(e){return Ae(e)?{locale:it(e.locale),theme:at(e.theme),position:lt(e.position),font:ce(e.font,""),debug:B(e.debug,!1)}:{...Xn}}function N(e,n){if(!(typeof window>"u"))try{const t=new CustomEvent(e,{detail:n});window.dispatchEvent(t)}catch{}}function J(e,n){if(typeof window>"u")return()=>{};const t=o=>{n(o.detail)};return window.addEventListener(e,t),()=>{typeof window>"u"||window.removeEventListener(e,t)}}const nn="blakfy-a11y-host";function tn(e,n){const t=`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M6 2L6 26L12 20L16 28L19 27L15 19L22 19Z" fill="${e}" stroke="${n}" stroke-width="1.5" stroke-linejoin="round"/></svg>`;return`url("data:image/svg+xml,${encodeURIComponent(t)}") 6 2`}function ct(e){const n=[];if(e.fontScale!==100&&n.push(`html { font-size: ${e.fontScale}% !important; }`),e.contrast==="high"&&n.push("html body, html body * { background-color: #000000 !important; color: #ffffff !important; border-color: #333333 !important; }","html body a, html body a * { color: #ffff00 !important; }","html body img { filter: invert(1) hue-rotate(180deg) !important; }"),e.focusRing&&n.push("html *:focus, html *:focus-visible { outline: 4px solid #2563eb !important; outline-offset: 2px !important; }"),e.linkUnderline&&n.push("html a { text-decoration: underline !important; }"),e.motion==="reduce"&&n.push("html *, html *::before, html *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }"),e.dyslexiaFont&&n.push("html * { font-family: 'OpenDyslexic', OpenDyslexic, Arial, sans-serif !important; }"),e.readingMode&&n.push('html aside, html [role="complementary"] { display: none !important; }','html [class*="sidebar"], html [id*="sidebar"] { display: none !important; }','html [class*="banner"]:not(main *) { display: none !important; }'),e.lineHeight==="medium"?n.push("html p, html li, html dd, html dt, html span, html div { line-height: 1.8 !important; }"):e.lineHeight==="large"&&n.push("html p, html li, html dd, html dt, html span, html div { line-height: 2.4 !important; }"),e.letterSpacing==="medium"?n.push("html * { letter-spacing: 0.08em !important; }"):e.letterSpacing==="large"&&n.push("html * { letter-spacing: 0.16em !important; }"),e.textAlign!=="default"&&n.push(`html p, html li, html h1, html h2, html h3, html h4, html h5, html h6 { text-align: ${e.textAlign} !important; }`),e.highlightHeadings&&n.push("html h1, html h2, html h3, html h4, html h5, html h6 { outline: 3px solid #2563eb !important; outline-offset: 3px !important; }"),e.saturation==="none"?(n.push("html { filter: grayscale(100%) !important; }"),n.push("blakfy-a11y-root { filter: none !important; }")):e.saturation==="high"?(n.push("html { filter: saturate(2) !important; }"),n.push("blakfy-a11y-root { filter: none !important; }")):e.saturation==="low"&&(n.push("html { filter: saturate(0.3) !important; }"),n.push("blakfy-a11y-root { filter: none !important; }")),e.cursorSize==="large-dark"){const t=tn("black","white");n.push(`html *, html *::before, html *::after { cursor: ${t}, default !important; }`)}else if(e.cursorSize==="large-light"){const t=tn("white","black");n.push(`html *, html *::before, html *::after { cursor: ${t}, default !important; }`)}return e.hideImages&&n.push('html img, html picture, html [role="img"]:not(svg):not([aria-label*="accessibility"]) { opacity: 0 !important; }',"html video { visibility: hidden !important; }"),n.join(`
`)}function dt(e){if(typeof document>"u")return;let n=document.getElementById(nn);n||(n=document.createElement("style"),n.id=nn,n.setAttribute("data-blakfy",""),(document.head||document.documentElement).appendChild(n)),n.textContent=ct(e)}function de(e){if(typeof document>"u")return;const n=document.documentElement;n&&(n.setAttribute("data-a11y-fontscale",String(e.fontScale)),n.setAttribute("data-a11y-contrast",e.contrast),n.setAttribute("data-a11y-focus",e.focusRing?"enhanced":"default"),n.setAttribute("data-a11y-links",e.linkUnderline?"underline":"default"),n.setAttribute("data-a11y-motion",e.motion),n.setAttribute("data-a11y-dyslexia",String(e.dyslexiaFont)),n.setAttribute("data-a11y-reading",String(e.readingMode)),n.setAttribute("data-a11y-lineheight",e.lineHeight),n.setAttribute("data-a11y-letterspacing",e.letterSpacing),n.setAttribute("data-a11y-textalign",e.textAlign),n.setAttribute("data-a11y-headings",String(e.highlightHeadings)),n.setAttribute("data-a11y-saturation",e.saturation),n.setAttribute("data-a11y-cursor",e.cursorSize),n.setAttribute("data-a11y-hideimages",String(e.hideImages)),dt(e))}function Ce(){if(typeof window>"u"||typeof window.matchMedia!="function")return{reducedMotion:!1,contrast:"normal",colorScheme:"no-preference"};let e=!1,n="normal",t="no-preference";try{e=window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{}try{window.matchMedia("(prefers-contrast: more)").matches?n="more":window.matchMedia("(prefers-contrast: less)").matches&&(n="less")}catch{}try{window.matchMedia("(prefers-color-scheme: dark)").matches?t="dark":window.matchMedia("(prefers-color-scheme: light)").matches&&(t="light")}catch{}return{reducedMotion:e,contrast:n,colorScheme:t}}function ut(){if(typeof document>"u")return!1;const e=document.styleSheets;if(!e)return!1;for(let n=0;n<e.length;n++){const t=e[n];if(!t)continue;let o=null;try{o=t.cssRules??null}catch{continue}if(o)for(let i=0;i<o.length;i++){const r=o[i];if(!r||r.type!==1)continue;const d=r,a=d.selectorText??"";if(!ft(a))continue;const u=d.style;if(u&&(u.getPropertyPriority("color")==="important"||u.getPropertyPriority("background-color")==="important"||u.getPropertyPriority("background")==="important"))return!0}}return!1}function ft(e){const n=e.toLowerCase();return/(^|[\s,>+~])(body|a)([\s,:.\[#>+~]|$)/.test(n)}function pt(e){if(typeof window>"u"||typeof window.matchMedia!="function")return()=>{};const n=["(prefers-reduced-motion: reduce)","(prefers-contrast: more)","(prefers-contrast: less)","(prefers-color-scheme: dark)","(prefers-color-scheme: light)"],t=[],o=()=>{e(Ce())};for(const i of n)try{const r=window.matchMedia(i);typeof r.addEventListener=="function"?r.addEventListener("change",o):typeof r.addListener=="function"&&r.addListener(o),t.push(r)}catch{}return()=>{for(const i of t)try{typeof i.removeEventListener=="function"?i.removeEventListener("change",o):typeof i.removeListener=="function"&&i.removeListener(o)}catch{}}}const rn="2.0.0-alpha.0",on=50,ht=10,M={issues:[],startTime:typeof performance<"u"?performance.now():Date.now(),devPipeUrl:null,devPipeLastSent:[]};function an(){try{if(typeof process<"u"&&typeof process.env<"u"&&process.env.NODE_ENV&&process.env.NODE_ENV!=="production")return"verbose"}catch{}if(typeof window>"u"||typeof document>"u")return"silent";try{if(new URLSearchParams(window.location.search).get("a11y-debug")==="1")return"verbose"}catch{}try{const e=document.currentScript;if(e&&e.dataset&&e.dataset.debug==="true"||document.querySelector('script[data-debug="true"]'))return"verbose"}catch{}try{const e=window;if(e.__BLAKFY_A11Y__&&e.__BLAKFY_A11Y__.debug===!0)return"verbose"}catch{}return"silent"}function mt(e){return e==="info"?"✓":e==="warn"?"⚠":"✗"}function ln(e,n){if(typeof console>"u")return;const t=`[blakfy-a11y v${rn}] ${mt(e)} ${n}`;e==="error"&&typeof console.error=="function"?console.error(t):e==="warn"&&typeof console.warn=="function"?console.warn(t):typeof console.info=="function"?console.info(t):typeof console.log=="function"&&console.log(t)}function sn(e,n,t){const o=M.devPipeUrl;if(!o||an()!=="verbose"||typeof fetch!="function")return;const i=Date.now();if(M.devPipeLastSent=M.devPipeLastSent.filter(r=>i-r<1e3),!(M.devPipeLastSent.length>=ht)){M.devPipeLastSent.push(i);try{const r=JSON.stringify({level:e,code:n,msg:t,timestamp:new Date(i).toISOString()});fetch(o,{method:"POST",headers:{"Content-Type":"application/json"},body:r,keepalive:!0}).catch(()=>{})}catch{}}}function $(e,n,t,o){const i=an();if(e==="info"){i==="verbose"&&(ln("info",t),sn("info",n,t));return}ln(e,t);const r={level:e,code:n,timestamp:new Date().toISOString(),msg:t};M.issues.push(r),M.issues.length>on&&M.issues.splice(0,M.issues.length-on),sn(e,n,t)}function gt(e){M.devPipeUrl=e}function _t(e){const n=Ce();return{version:rn,locale:e.config.locale,theme:e.config.theme,storage:{version:e.storage.version,migratedFrom:e.storage.migratedFrom,keysFound:[...e.storage.keysFound]},osPreferences:{reducedMotion:n.reducedMotion,contrast:n.contrast,colorScheme:n.colorScheme},performance:{mountTimeMs:e.performance.mountTimeMs,bundleSizeGz:e.performance.bundleSizeGz,timeToFirstClick:e.performance.timeToFirstClick},issues:M.issues.map(t=>({level:t.level,code:t.code,timestamp:t.timestamp,msg:t.msg})),config:{...e.config},timestamp:new Date().toISOString()}}function Ee(){return typeof window<"u"}function cn(){return typeof document<"u"}function bt(e,n,t){if(!cn())return;const o=new Date;o.setTime(o.getTime()+t*864e5);const i=Ee()&&window.location&&window.location.protocol==="https:",r=[`${e}=${encodeURIComponent(n)}`,`expires=${o.toUTCString()}`,"path=/","SameSite=Lax"];i&&r.push("Secure"),document.cookie=r.join(";")}function yt(e){if(!cn())return null;const n=(document.cookie||"").match(new RegExp(`(^| )${e}=([^;]+)`));if(!n||typeof n[2]!="string")return null;try{return decodeURIComponent(n[2])}catch{return null}}function vt(e){if(!Ee())return null;try{return window.localStorage.getItem(e)}catch{return null}}function kt(e,n){if(Ee())try{window.localStorage.setItem(e,n)}catch{}}function wt(e){if(e==null)return null;try{return JSON.parse(e)}catch{return null}}function xt(e){return e.version===W?{record:e,migrated:!1,migratedFrom:null}:{record:{prefs:{...S,...e.prefs},version:W,timestamp:new Date().toISOString(),locale:e.locale||"en"},migrated:!0,migratedFrom:e.version}}function dn(){const e=[],n=vt(Je);n!=null&&e.push("localStorage");const t=yt(Ze);t!=null&&e.push("cookie");let o=null,i=null;if(n!=null?(o=n,i="localStorage"):t!=null&&(o=t,i="cookie"),o==null)return{source:null,record:null,migrated:!1,migratedFrom:null,keysFound:e};const r=wt(o);if(r==null)return $("error","STORAGE_PARSE_ERROR",`Failed to parse stored preferences from ${i}`),{source:i,record:null,migrated:!1,migratedFrom:null,keysFound:e};const d=st(r);if(!d)return $("error","STORAGE_PARSE_ERROR",`Stored preferences in ${i} did not match schema`),{source:i,record:null,migrated:!1,migratedFrom:null,keysFound:e};const{record:a,migrated:u,migratedFrom:f}=xt(d);return u&&$("info","STORAGE_MIGRATED",`Storage migrated: ${f??"unknown"} → ${W}`),{source:i,record:a,migrated:u,migratedFrom:f,keysFound:e}}function St(e){const n=JSON.stringify(e);kt(Je,n),bt(Ze,n,365)}function Z(){const e=dn();return e.record?{...S,...e.record.prefs}:{...S}}function Le(e,n="en"){const t=Z(),o=Qe({...t,...e}),i={prefs:o,version:W,timestamp:new Date().toISOString(),locale:n};return St(i),de(o),N(T.CHANGE,i),i}function un(e="en"){return Le({...S},e)}function At(){const e=dn();return{version:e.record?.version??W,migratedFrom:e.migratedFrom,keysFound:e.keysFound}}const Ct={label:"Accessibility preferences"},Et={title:"Accessibility Preferences",description:"Adjust your viewing preferences.",reset:"Reset",close:"Close",disclaimer:"This panel provides personal preference controls; structural accessibility is built into the site itself.",theme:{label:"Display Theme",auto:"Auto",light:"Light",dark:"Dark"},branding:"Powered by Blakfy Studio",sections:{profiles:"Accessibility Profiles",text:"Text",vision:"Vision",navigation:"Navigation",motion:"Motion & Reading"},profiles:{epilepsy:{name:"Epilepsy Safe",description:"Reduces animations and desaturates colors"},vision:{name:"Visual Impairment",description:"High contrast and enlarged text"},cognitive:{name:"Cognitive",description:"Reduces distractions, aids readability"},adhd:{name:"ADHD Friendly",description:"Hides images, stops motion"},blindness:{name:"Screen Reader",description:"Optimised for assistive technology"}},preferences:{fontScale:{title:"Font Size",description:"Scales all text proportionally across the page. Ideal for small screens or users with low vision; changes apply instantly everywhere.",values:{100:"Normal",110:"Large",125:"Extra Large"}},lineHeight:{title:"Line Height",description:"Increases vertical spacing between lines of text, improving readability for users with dyslexia or cognitive disabilities.",values:{normal:"Normal",medium:"Medium",large:"Large"}},letterSpacing:{title:"Letter Spacing",description:"Adds extra space between characters to reduce crowding and improve text clarity.",values:{normal:"Normal",medium:"Medium",large:"Large"}},textAlign:{title:"Text Alignment",description:"Changes the alignment of body text and headings across the page.",values:{default:"Default",left:"Left",center:"Center",right:"Right"}},highlightHeadings:{title:"Highlight Headings",description:"Adds a visible blue outline around all headings to make page structure easier to navigate."},contrast:{title:"High Contrast",description:"Applies a black background with high-visibility yellow links meeting the WCAG AAA 7:1 contrast ratio. Designed for users with visual impairments or colour blindness."},saturation:{title:"Color Saturation",description:"Adjusts color intensity. Use Grayscale to remove all color — useful for color blindness or reducing visual distraction.",values:{normal:"Normal",high:"High",low:"Low",none:"Grayscale"}},focusRing:{title:"Enhanced Focus Ring",description:"Displays a bold 4px blue outline around the focused element during keyboard navigation. Essential for users who cannot use or prefer not to use a mouse."},linkUnderline:{title:"Underline Links",description:"Adds underlines to all hyperlinks on the page. Helps users who cannot distinguish links from regular text by colour alone."},cursorSize:{title:"Cursor Size",description:"Enlarges the mouse cursor for better screen visibility. Choose dark or light to suit your background.",values:{default:"Default",largeDark:"Large Dark",largeLight:"Large Light"}},motion:{title:"Reduce Motion",description:"Disables page animations, transitions and scroll effects. Recommended for users with vestibular disorders, epilepsy or motion sensitivity."},dyslexiaFont:{title:"Dyslexia-Friendly Font",description:"Applies the OpenDyslexic typeface, adding extra weight to letter bottoms to reduce confusion between similar characters (b/d, p/q) and improve readability.",note:"Some readers find this helpful; research has not established universal benefit."},readingMode:{title:"Reading Mode",description:"Hides sidebars, banners and distracting side content so you can focus on the main text. Ideal for long articles or visually busy pages."},hideImages:{title:"Hide Images",description:"Hides all images on the page, reducing visual distraction. Useful for users sensitive to visual stimuli or on slow connections."}}},q={fab:Ct,panel:Et},$e=new Map;$e.set("en",q);function Lt(e){if(!e||typeof e!="object")return!1;const n=e,t=n.fab,o=n.panel;return!(!t||typeof t.label!="string"||!o||typeof o.title!="string")}async function fn(e,n){const t=$e.get(e);if(t)return t;if(typeof fetch!="function")return $("warn","LOCALE_FETCH_FAILED",`fetch unavailable, using en fallback for ${e}`),q;const o=`${(n||"").replace(/\/$/,"")}/locales/${e}.json`;try{const i=await fetch(o);if(!i.ok)return $("warn","LOCALE_FETCH_FAILED",`Locale fetch failed (${i.status}): ${o}`),q;const r=await i.json();return Lt(r)?($e.set(e,r),r):($("warn","LOCALE_FETCH_FAILED",`Locale ${e} payload missing required fields`),q)}catch(i){const r=i instanceof Error?i.message:String(i);return $("warn","LOCALE_FETCH_FAILED",`Locale fetch threw for ${e}: ${r}`),q}}function pn(){return q}var $t=0;function l(e,n,t,o,i,r){n||(n={});var d,a,u=n;if("ref"in u)for(a in u={},n)a=="ref"?d=n[a]:u[a]=n[a];var f={type:e,props:u,key:t,ref:d,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--$t,__i:-1,__u:0,__source:i,__self:r};if(typeof e=="function"&&(d=e.defaultProps))for(a in d)u[a]===void 0&&(u[a]=d[a]);return y.vnode&&y.vnode(f),f}var K,x,Te,hn,ue=0,mn=[],A=y,gn=A.__b,_n=A.__r,bn=A.diffed,yn=A.__c,vn=A.unmount,kn=A.__;function fe(e,n){A.__h&&A.__h(x,e,ue||n),ue=0;var t=x.__H||(x.__H={__:[],__h:[]});return e>=t.__.length&&t.__.push({}),t.__[e]}function pe(e){return ue=1,Tt(An,e)}function Tt(e,n,t){var o=fe(K++,2);if(o.t=e,!o.__c&&(o.__=[An(void 0,n),function(a){var u=o.__N?o.__N[0]:o.__[0],f=o.t(u,a);u!==f&&(o.__N=[f,o.__[1]],o.__c.setState({}))}],o.__c=x,!x.__f)){var i=function(a,u,f){if(!o.__c.__H)return!0;var m=o.__c.__H.__.filter(function(p){return p.__c});if(m.every(function(p){return!p.__N}))return!r||r.call(this,a,u,f);var s=o.__c.props!==a;return m.some(function(p){if(p.__N){var h=p.__[0];p.__=p.__N,p.__N=void 0,h!==p.__[0]&&(s=!0)}}),r&&r.call(this,a,u,f)||s};x.__f=!0;var r=x.shouldComponentUpdate,d=x.componentWillUpdate;x.componentWillUpdate=function(a,u,f){if(this.__e){var m=r;r=void 0,i(a,u,f),r=m}d&&d.call(this,a,u,f)},x.shouldComponentUpdate=i}return o.__N||o.__}function V(e,n){var t=fe(K++,3);!A.__s&&Sn(t.__H,n)&&(t.__=e,t.u=n,x.__H.__h.push(t))}function he(e){return ue=5,Rt(function(){return{current:e}},[])}function Rt(e,n){var t=fe(K++,7);return Sn(t.__H,n)&&(t.__=e(),t.__H=n,t.__h=e),t.__}function wn(){var e=fe(K++,11);if(!e.__){for(var n=x.__v;n!==null&&!n.__m&&n.__!==null;)n=n.__;var t=n.__m||(n.__m=[0,0]);e.__="P"+t[0]+"-"+t[1]++}return e.__}function Mt(){for(var e;e=mn.shift();){var n=e.__H;if(e.__P&&n)try{n.__h.some(me),n.__h.some(Re),n.__h=[]}catch(t){n.__h=[],A.__e(t,e.__v)}}}A.__b=function(e){x=null,gn&&gn(e)},A.__=function(e,n){e&&n.__k&&n.__k.__m&&(e.__m=n.__k.__m),kn&&kn(e,n)},A.__r=function(e){_n&&_n(e),K=0;var n=(x=e.__c).__H;n&&(Te===x?(n.__h=[],x.__h=[],n.__.some(function(t){t.__N&&(t.__=t.__N),t.u=t.__N=void 0})):(n.__h.some(me),n.__h.some(Re),n.__h=[],K=0)),Te=x},A.diffed=function(e){bn&&bn(e);var n=e.__c;n&&n.__H&&(n.__H.__h.length&&(mn.push(n)!==1&&hn===A.requestAnimationFrame||((hn=A.requestAnimationFrame)||Ht)(Mt)),n.__H.__.some(function(t){t.u&&(t.__H=t.u),t.u=void 0})),Te=x=null},A.__c=function(e,n){n.some(function(t){try{t.__h.some(me),t.__h=t.__h.filter(function(o){return!o.__||Re(o)})}catch(o){n.some(function(i){i.__h&&(i.__h=[])}),n=[],A.__e(o,t.__v)}}),yn&&yn(e,n)},A.unmount=function(e){vn&&vn(e);var n,t=e.__c;t&&t.__H&&(t.__H.__.some(function(o){try{me(o)}catch(i){n=i}}),t.__H=void 0,n&&A.__e(n,t.__v))};var xn=typeof requestAnimationFrame=="function";function Ht(e){var n,t=function(){clearTimeout(o),xn&&cancelAnimationFrame(n),setTimeout(e)},o=setTimeout(t,35);xn&&(n=requestAnimationFrame(t))}function me(e){var n=x,t=e.__c;typeof t=="function"&&(e.__c=void 0,t()),x=n}function Re(e){var n=x;e.__c=e.__(),x=n}function Sn(e,n){return!e||e.length!==n.length||n.some(function(t,o){return t!==e[o]})}function An(e,n){return typeof n=="function"?n(e):n}function Ft(e){return l("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:[l("circle",{cx:"12",cy:"4",r:"2"}),l("path",{d:"M12 6v8"}),l("path",{d:"M5 9h14"}),l("path",{d:"M9 14l-2 7"}),l("path",{d:"M15 14l2 7"})]})}function Ot(e){return l("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",...e,children:[l("circle",{cx:"12",cy:"3",r:"2"}),l("path",{d:"M19 8.5c0 .55-.45 1-1 1h-4v3l3 7c.16.4-.04.86-.45 1l-1.42.5c-.4.16-.86-.04-1-.45L11.5 14h-1l-2.65 6.55c-.16.4-.6.6-1 .45l-1.42-.5c-.4-.16-.6-.6-.45-1l3-7v-3H6c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v1z"})]})}function It(e){return l("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:[l("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),l("circle",{cx:"12",cy:"12",r:"3"})]})}function zt(e){return l("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:l("path",{d:"M5 5l10 10M15 5L5 15"})})}function Pt(e){return l("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true",...e,children:[l("path",{d:"M12 2L2 7l10 5 10-5-10-5z"}),l("path",{d:"M2 17l10 5 10-5"}),l("path",{d:"M2 12l10 5 10-5"})]})}function Dt({name:e}){return e==="walking"?l(Ft,{}):e==="eye"?l(It,{}):l(Ot,{})}function Nt({iconStyle:e,ariaLabel:n,isOpen:t,onClick:o}){return l("button",{type:"button",class:"fab","aria-haspopup":"dialog","aria-expanded":t,"aria-label":n,title:n,onClick:o,children:l(Dt,{name:e})})}const Ut='button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [role="switch"]:not([aria-disabled="true"])';function Bt(e=document){let n=e.activeElement;for(;n;){const t=n.shadowRoot;if(!t||!t.activeElement)break;n=t.activeElement}return n}function Cn(e){if(!e)return[];const n=e.querySelectorAll(Ut);return Array.from(n).filter(t=>{if(t.hasAttribute("disabled"))return!1;const o=t.getAttribute("tabindex");return o&&Number(o)<0?!1:t.offsetParent!==null||t.getClientRects().length>0})}function jt({open:e,onClose:n,titleId:t,descriptionId:o,children:i}){const r=he(null),d=he(null),a=he(n);return a.current=n,V(()=>{if(!e||typeof document>"u")return;const f=document.documentElement,m=f.style.overflow;return f.style.overflow="hidden",()=>{f.style.overflow=m}},[e]),V(()=>{if(!e||typeof document>"u")return;d.current=Bt(document);const f=window.setTimeout(()=>{(Cn(r.current)[0]??r.current)?.focus()},0),m=s=>{if(s.key==="Escape"){s.preventDefault(),a.current();return}if(s.key!=="Tab")return;const p=Cn(r.current);if(p.length===0){s.preventDefault(),r.current?.focus();return}const h=p[0],k=p[p.length-1];if(!h||!k)return;const _=r.current?.getRootNode(),w=_&&"activeElement"in _?_.activeElement:document.activeElement;s.shiftKey?(w===h||!r.current?.contains(w))&&(s.preventDefault(),k.focus()):w===k&&(s.preventDefault(),h.focus())};return document.addEventListener("keydown",m),()=>{window.clearTimeout(f),document.removeEventListener("keydown",m);const s=d.current;s&&s instanceof HTMLElement&&s.focus()}},[e]),e?l("div",{class:"backdrop",onClick:f=>{f.target===f.currentTarget&&n()},children:l("div",{ref:r,class:"dialog",role:"dialog","aria-modal":"true","aria-labelledby":t,"aria-describedby":o,tabIndex:-1,children:i})}):null}function Gt({checked:e,onChange:n,ariaLabel:t,ariaLabelledBy:o,ariaDescribedBy:i,disabled:r=!1}){return l("button",{type:"button",class:"switch",role:"switch","aria-checked":e,"aria-label":o?void 0:t,"aria-labelledby":o,"aria-describedby":i,"aria-disabled":r||void 0,tabIndex:r?-1:0,onClick:()=>{r||n(!e)},onKeyDown:u=>{r||(u.key===" "||u.key==="Enter"||u.key==="Spacebar")&&(u.preventDefault(),n(!e))},children:l("span",{class:"switch-thumb","aria-hidden":"true"})})}function U({title:e,description:n,note:t,checked:o,onChange:i}){const r=wn(),d=`${r}-title`,a=`${r}-desc`;return l("div",{class:"toggle-row",children:[l("div",{class:"toggle-text",children:[l("p",{class:"toggle-title",id:d,children:e}),l("p",{class:"toggle-desc",id:a,children:n}),t?l("p",{class:"toggle-note",children:t}):null]}),l(Gt,{checked:o,onChange:i,ariaLabel:e,ariaLabelledBy:d,ariaDescribedBy:a})]})}const En=[100,110,125],Wt=["auto","light","dark"],Ln=["normal","medium","large"],$n=["normal","medium","large"],Tn=["default","left","center","right"],Rn=["normal","high","low","none"],qt=["default","large-dark","large-light"],Mn={epilepsy:{motion:"reduce",saturation:"low"},vision:{fontScale:125,contrast:"high"},cognitive:{readingMode:!0,lineHeight:"medium",motion:"reduce"},adhd:{motion:"reduce",hideImages:!0},blindness:{focusRing:!0,linkUnderline:!0,highlightHeadings:!0}};function Kt(){return l("svg",{class:"accordion-chevron","aria-hidden":"true",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:l("path",{d:"M3 4.5l3 3 3-3",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})})}function Vt({profileKey:e}){return{epilepsy:l("svg",{"aria-hidden":"true",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:l("path",{d:"M11 2L4 11h6l-1 7 7-9h-6l1-7z",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})}),vision:l("svg",{"aria-hidden":"true",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l("path",{d:"M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"}),l("circle",{cx:"10",cy:"10",r:"2.5",stroke:"currentColor","stroke-width":"1.5"})]}),cognitive:l("svg",{"aria-hidden":"true",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l("path",{d:"M10 3C6.13 3 3 6.13 3 10c0 2.38 1.19 4.47 3 5.74V17h8v-1.26C15.81 14.47 17 12.38 17 10c0-3.87-3.13-7-7-7z",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"}),l("path",{d:"M7 10h6M10 7v6",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"})]}),adhd:l("svg",{"aria-hidden":"true",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l("circle",{cx:"10",cy:"10",r:"7",stroke:"currentColor","stroke-width":"1.5"}),l("circle",{cx:"10",cy:"10",r:"3",stroke:"currentColor","stroke-width":"1.5"}),l("circle",{cx:"10",cy:"10",r:"1",fill:"currentColor"})]}),blindness:l("svg",{"aria-hidden":"true",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l("path",{d:"M10 4a6 6 0 100 12A6 6 0 0010 4z",stroke:"currentColor","stroke-width":"1.5"}),l("path",{d:"M10 8v4M8 16l4-4",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round"})]})}[e]}function Yt({translation:e,locale:n,currentTheme:t,onClose:o,onThemeChange:i,titleId:r,descriptionId:d}){const a=e.panel,[u,f]=pe(()=>Z()),[m,s]=pe(!1),p=he(null),[h,k]=pe(()=>{const c=Z(),b=new Set;return(c.fontScale!==100||c.dyslexiaFont||c.lineHeight!=="normal"||c.letterSpacing!=="normal"||c.textAlign!=="default"||c.highlightHeadings)&&b.add("text"),(c.contrast==="high"||c.saturation!=="normal")&&b.add("vision"),(c.focusRing||c.linkUnderline||c.cursorSize!=="default")&&b.add("navigation"),(c.motion==="reduce"||c.readingMode||c.hideImages)&&b.add("motion"),b.size===0&&b.add("text"),b}),_=c=>{k(b=>{const L=new Set(b);return L.has(c)?L.delete(c):L.add(c),L})};V(()=>J(T.CHANGE,c=>{f(c.prefs)}),[]),V(()=>()=>{p.current&&clearTimeout(p.current)},[]);const w=c=>{const b={...u,...c};f(b),Le(c,n),de(b)},g=(c,b)=>{w({[c]:b})},v=c=>{const b=Mn[c];return Object.entries(b).every(([L,O])=>u[L]===O)},E=c=>{const b=Mn[c];if(v(c)){const L={};for(const O of Object.keys(b))L[O]=S[O];w(L)}else w(b)},C=()=>{if(!m){s(!0),p.current&&clearTimeout(p.current),p.current=setTimeout(()=>s(!1),3e3);return}p.current&&clearTimeout(p.current),s(!1);const c=un(n);f(c.prefs),de(c.prefs)},P=c=>c==="auto"?a.theme.auto:c==="light"?a.theme.light:a.theme.dark,Y={text:(u.fontScale!==100?1:0)+(u.dyslexiaFont?1:0)+(u.lineHeight!=="normal"?1:0)+(u.letterSpacing!=="normal"?1:0)+(u.textAlign!=="default"?1:0)+(u.highlightHeadings?1:0),vision:(u.contrast==="high"?1:0)+(u.saturation!=="normal"?1:0),navigation:(u.focusRing?1:0)+(u.linkUnderline?1:0)+(u.cursorSize!=="default"?1:0),motion:(u.motion==="reduce"?1:0)+(u.readingMode?1:0)+(u.hideImages?1:0)},H=({skey:c,title:b,children:L})=>{const O=h.has(c),ee=Y[c];return l("div",{class:`acc-section${O?" acc-open":""}`,children:[l("button",{type:"button",class:"acc-header","aria-expanded":O,onClick:()=>_(c),children:[l("span",{class:"acc-title",children:b}),ee>0&&l("span",{class:"acc-badge","aria-label":`${ee} aktif`,children:ee}),l(Kt,{})]}),O&&l("div",{class:"acc-body",children:L})]})},F=({value:c,options:b,labels:L,onChange:O,ariaLabel:ee})=>l("div",{class:"opt-buttons",role:"group","aria-label":ee,children:b.map((ge,hr)=>l("button",{type:"button",class:"opt-btn","aria-pressed":c===ge,onClick:()=>O(ge),children:L[hr]??ge},ge))});return l(j,{children:[l("h2",{class:"panel-title",id:r,children:a.title}),l("button",{type:"button",class:"dialog-close","aria-label":a.close,onClick:o,children:l(zt,{})}),l("div",{class:"profiles-section",children:[l("p",{class:"profiles-label",children:a.sections.profiles}),l("div",{class:"profile-grid",children:["epilepsy","vision","cognitive","adhd","blindness"].map(c=>{const b=v(c),L=c==="vision"?a.profiles.vision:a.profiles[c];return l("button",{type:"button",class:`profile-btn${b?" profile-btn--active":""}`,"aria-pressed":b,onClick:()=>E(c),children:[l("span",{class:"profile-icon",children:l(Vt,{profileKey:c})}),l("span",{class:"profile-name",children:L.name}),l("span",{class:"profile-desc",children:L.description})]},c)})})]}),l("div",{class:"acc-list",role:"list",children:[l(H,{skey:"text",title:a.sections.text,children:[l("div",{class:"section",children:[l("p",{class:"toggle-title",children:a.preferences.fontScale.title}),l("p",{class:"toggle-desc",children:a.preferences.fontScale.description}),l(F,{value:String(u.fontScale),options:En.map(String),labels:En.map(c=>a.preferences.fontScale.values[String(c)]),onChange:c=>g("fontScale",Number(c)),ariaLabel:a.preferences.fontScale.title})]}),l("div",{class:"section",children:[l("p",{class:"toggle-title",children:a.preferences.lineHeight.title}),l("p",{class:"toggle-desc",children:a.preferences.lineHeight.description}),l(F,{value:u.lineHeight,options:Ln,labels:Ln.map(c=>a.preferences.lineHeight.values[c]),onChange:c=>g("lineHeight",c),ariaLabel:a.preferences.lineHeight.title})]}),l("div",{class:"section",children:[l("p",{class:"toggle-title",children:a.preferences.letterSpacing.title}),l("p",{class:"toggle-desc",children:a.preferences.letterSpacing.description}),l(F,{value:u.letterSpacing,options:$n,labels:$n.map(c=>a.preferences.letterSpacing.values[c]),onChange:c=>g("letterSpacing",c),ariaLabel:a.preferences.letterSpacing.title})]}),l("div",{class:"section",children:[l("p",{class:"toggle-title",children:a.preferences.textAlign.title}),l("p",{class:"toggle-desc",children:a.preferences.textAlign.description}),l(F,{value:u.textAlign,options:Tn,labels:Tn.map(c=>a.preferences.textAlign.values[c]),onChange:c=>g("textAlign",c),ariaLabel:a.preferences.textAlign.title})]}),l(U,{title:a.preferences.dyslexiaFont.title,description:a.preferences.dyslexiaFont.description,note:a.preferences.dyslexiaFont.note,checked:u.dyslexiaFont,onChange:c=>g("dyslexiaFont",c)}),l(U,{title:a.preferences.highlightHeadings.title,description:a.preferences.highlightHeadings.description,checked:u.highlightHeadings,onChange:c=>g("highlightHeadings",c)})]}),l(H,{skey:"vision",title:a.sections.vision,children:[l(U,{title:a.preferences.contrast.title,description:a.preferences.contrast.description,checked:u.contrast==="high",onChange:c=>g("contrast",c?"high":"normal")}),l("div",{class:"section",children:[l("p",{class:"toggle-title",children:a.preferences.saturation.title}),l("p",{class:"toggle-desc",children:a.preferences.saturation.description}),l(F,{value:u.saturation,options:Rn,labels:Rn.map(c=>a.preferences.saturation.values[c]),onChange:c=>g("saturation",c),ariaLabel:a.preferences.saturation.title})]}),l("div",{class:"theme-switcher",role:"group","aria-label":a.theme.label,children:[l("p",{class:"theme-switcher-label",children:a.theme.label}),l("div",{class:"theme-buttons",children:Wt.map(c=>l("button",{type:"button",class:"theme-btn","aria-pressed":t===c,onClick:()=>i(c),children:P(c)},c))})]})]}),l(H,{skey:"navigation",title:a.sections.navigation,children:[l(U,{title:a.preferences.focusRing.title,description:a.preferences.focusRing.description,checked:u.focusRing,onChange:c=>g("focusRing",c)}),l(U,{title:a.preferences.linkUnderline.title,description:a.preferences.linkUnderline.description,checked:u.linkUnderline,onChange:c=>g("linkUnderline",c)}),l("div",{class:"section",children:[l("p",{class:"toggle-title",children:a.preferences.cursorSize.title}),l("p",{class:"toggle-desc",children:a.preferences.cursorSize.description}),l(F,{value:u.cursorSize,options:qt,labels:[a.preferences.cursorSize.values.default,a.preferences.cursorSize.values.largeDark,a.preferences.cursorSize.values.largeLight],onChange:c=>g("cursorSize",c),ariaLabel:a.preferences.cursorSize.title})]})]}),l(H,{skey:"motion",title:a.sections.motion,children:[l(U,{title:a.preferences.motion.title,description:a.preferences.motion.description,checked:u.motion==="reduce",onChange:c=>g("motion",c?"reduce":"auto")}),l(U,{title:a.preferences.readingMode.title,description:a.preferences.readingMode.description,checked:u.readingMode,onChange:c=>g("readingMode",c)}),l(U,{title:a.preferences.hideImages.title,description:a.preferences.hideImages.description,checked:u.hideImages,onChange:c=>g("hideImages",c)})]})]}),l("div",{class:"sr-only",role:"status","aria-live":"polite",children:m?`${a.reset}?`:""}),l("div",{class:"footer",children:[l("button",{type:"button",class:"btn btn-secondary",onClick:C,"aria-pressed":m,"data-confirm":m?"true":void 0,children:m?`${a.reset}?`:a.reset}),l("button",{type:"button",class:"btn btn-primary",onClick:o,children:a.close})]}),l("p",{class:"disclaimer",children:a.disclaimer}),l("a",{class:"panel-branding",href:"https://blakfy.com",target:"_blank",rel:"noopener noreferrer","aria-label":"Blakfy Studio — blakfy.com",children:[l("span",{class:"panel-branding-powered",children:"Powered by"}),l("span",{class:"panel-branding-name",children:"Blakfy Studio"}),l("svg",{class:"panel-branding-arrow","aria-hidden":"true",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:l("path",{d:"M2.5 6h7M7 3.5l2.5 2.5L7 8.5",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"})})]})]})}const Xt="https://blakfy.com";function Jt(){return l("a",{class:"badge",href:Xt,target:"_blank",rel:"noopener noreferrer","aria-label":"Powered by Blakfy Studio — opens blakfy.com in a new tab",children:[l(Pt,{}),l("span",{children:["Powered by ",l("strong",{children:"Blakfy Studio"})]})]})}function Zt({config:e,translation:n,iconStyle:t="access",keyboardShortcut:o=!0,onThemeChange:i}){const[r,d]=pe(!1),a=wn(),u=`${a}-title`,f=`${a}-desc`;V(()=>{const p=J(T.OPEN,()=>d(!0)),h=J(T.CLOSE,()=>d(!1));return()=>{p(),h()}},[]),V(()=>{if(!o||typeof window>"u")return;const p=h=>{h.altKey&&h.key==="0"&&(h.preventDefault(),d(k=>k?(N(T.CLOSE,{}),!1):(N(T.OPEN,{}),!0)))};return window.addEventListener("keydown",p),()=>{window.removeEventListener("keydown",p)}},[o]);const m=()=>{d(!0),N(T.OPEN,{})},s=()=>{d(!1),N(T.CLOSE,{})};return l(j,{children:[l(Nt,{iconStyle:t,ariaLabel:n.fab.label,isOpen:r,onClick:m}),l(jt,{open:r,onClose:s,titleId:u,descriptionId:f,children:l(Yt,{translation:n,locale:e.locale,currentTheme:e.theme,onClose:s,onThemeChange:i??(()=>{}),titleId:u,descriptionId:f})}),l(Jt,{})]})}const Qt=`/*
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
 * 9. Profiles section
 * ========================================================================== */
.profiles-section {
  margin-block-start: 0.875rem;
}

.profiles-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--__muted);
  margin-block-end: 0.5rem;
}

.profile-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.375rem;
}

.profile-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
  padding: 0.55rem 0.625rem;
  border: 1.5px solid var(--__border);
  border-radius: 8px;
  color: var(--__text);
  text-align: start;
  transition: border-color 150ms ease, background 150ms ease;
  min-block-size: 44px;
}

.profile-btn:hover {
  border-color: var(--blakfy-a11y-primary);
  background: rgba(37, 99, 235, 0.04);
}

:host([data-theme="dark"]) .profile-btn:hover {
  background: rgba(96, 165, 250, 0.08);
}

.profile-btn--active {
  border-color: var(--blakfy-a11y-primary);
  background: rgba(37, 99, 235, 0.07);
}

:host([data-theme="dark"]) .profile-btn--active {
  background: rgba(96, 165, 250, 0.12);
}

.profile-btn:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
  outline-offset: 2px;
}

.profile-icon {
  display: flex;
  color: var(--blakfy-a11y-primary);
}

.profile-icon svg {
  width: 16px;
  height: 16px;
}

.profile-name {
  font-size: 11.5px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--__text);
}

.profile-desc {
  font-size: 10px;
  line-height: 1.3;
  color: var(--__muted);
}

/* ==========================================================================
 * 9b. Option buttons (shared for fontScale, lineHeight, textAlign, etc.)
 * ========================================================================== */
.opt-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-block-start: 0.5rem;
}

.opt-btn {
  min-block-size: 30px;
  padding-inline: 0.625rem;
  font-size: clamp(10px, 1.8vw, 12px);
  font-weight: 500;
  border: 1px solid var(--__border);
  border-radius: 6px;
  color: var(--__text);
  white-space: nowrap;
  flex: 1;
  min-inline-size: fit-content;
  transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease;
}

.opt-btn:hover {
  background: var(--__border);
}

.opt-btn[aria-pressed="true"] {
  background: var(--blakfy-a11y-toggle-on);
  color: var(--blakfy-a11y-panel-bg);
  border-color: var(--blakfy-a11y-toggle-on);
}

:host([data-theme="dark"]) .opt-btn[aria-pressed="true"] {
  background: var(--blakfy-a11y-toggle-on);
  color: #ffffff;
  border-color: var(--blakfy-a11y-toggle-on);
}

.opt-btn:focus-visible {
  outline: 2px solid var(--blakfy-a11y-focus-ring);
  outline-offset: 2px;
}

/* ==========================================================================
 * 9c. Accordion list
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

/* Font scale (legacy alias — kept for backwards compat) */
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
`,er="2.0.0-alpha.0";function nr(e){const n={open:()=>N(T.OPEN,{}),close:()=>N(T.CLOSE,{}),getPreferences:()=>Z(),setPreferences:t=>{Le(t,e.config.locale)},reset:()=>{un(e.config.locale)},onChange:t=>J(T.CHANGE,o=>t(o.prefs)),configure:t=>e.configure(t),diagnostics:()=>_t({config:e.config,performance:{mountTimeMs:e.mountTimeMs,bundleSizeGz:e.bundleSizeGz,timeToFirstClick:null},storage:e.storage}),version:er};return typeof window<"u"&&(window.BlakfyA11y&&typeof window.BlakfyA11y=="object"?Object.assign(window.BlakfyA11y,n):window.BlakfyA11y=n),n}const Hn="blakfy-a11y-root",Me="2.0.0-alpha.0";function tr(e){const n=e.toLowerCase().split(/[-_]/)[0]??"";return{tr:"tr",en:"en",de:"de",fr:"fr",es:"es",it:"it",ar:"ar",he:"he",ru:"ru",iw:"he"}[n]}function rr(){if(typeof document>"u")return"en";const e=document.documentElement.lang??"";return tr(e)??"en"}function or(){if(typeof document>"u")return{};let e=On??document.currentScript;if(!e){const o=document.querySelectorAll("script[src]");for(let i=0;i<o.length;i++){const r=o[i];if(r&&r.src&&/accessibility[-_]widget|blakfy|widget\.js$/i.test(r.src)){e=r;break}}}if(!e)return{};const n=e.dataset,t={};return n.locale?t.locale=n.locale:t.locale=rr(),n.theme&&(t.theme=n.theme),n.position&&(t.position=n.position),n.font&&(t.font=n.font),n.debug&&(t.debug=n.debug==="true"),n.devPipe&&(t.devPipe=n.devPipe),n.version&&(t.version=n.version),t}function ir(){if(typeof document>"u")return!0;const e=document.querySelectorAll("link[href]");for(let n=0;n<e.length;n++){const t=e[n];if(t&&t.href&&/open[-_]?dyslexic/i.test(t.href))return!0}return!1}function ar(e){if(typeof document>"u")return{mismatched:!1,fields:[]};const n=document.documentElement;if(!n)return{mismatched:!1,fields:[]};const t={"data-a11y-fontscale":String(e.fontScale),"data-a11y-contrast":e.contrast,"data-a11y-focus":e.focusRing?"enhanced":"default","data-a11y-links":e.linkUnderline?"underline":"default","data-a11y-motion":e.motion,"data-a11y-dyslexia":String(e.dyslexiaFont),"data-a11y-reading":String(e.readingMode)},o=[];let i=!1;for(const r of Object.keys(t)){if(!n.hasAttribute(r))continue;i=!0,n.getAttribute(r)!==t[r]&&o.push(r)}return{mismatched:i&&o.length>0,fields:o}}function Fn(e){try{const n=new URL(e);return n.origin+n.pathname.replace(/\/[^/]*$/,"")}catch{return""}}const On=typeof document<"u"?document.currentScript:null,In=typeof document<"u"?Fn(On?.src??""):"";function zn(){if(typeof document>"u")return"";if(In)return In;const e=document.querySelectorAll("script[src]");for(let n=0;n<e.length;n++){const t=e[n];if(t&&t.src&&/accessibility[-_]widget|blakfy|widget\.js$/i.test(t.src)){const o=Fn(t.src);if(o)return o}}return""}function lr(e){return Yn.includes(e)}function sr(e){if(e==="dark")return"dark";if(e==="light")return"light";if(typeof document<"u"){const n=document.documentElement,t=n.getAttribute("data-theme");if(t==="dark")return"dark";if(t==="light")return"light";if(n.getAttribute("data-color-mode")==="dark"||n.classList.contains("dark"))return"dark";if(n.classList.contains("light"))return"light"}if(typeof window>"u"||typeof window.matchMedia!="function")return"light";try{return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"light"}}function cr(e){if(typeof MutationObserver>"u"||typeof document>"u")return()=>{};const n=new MutationObserver(e);return n.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","data-color-mode"]}),()=>n.disconnect()}function Q(e,n){e.setAttribute("data-position",n.position),e.setAttribute("data-theme",sr(n.theme)),e.setAttribute("dir",lr(n.locale)?"rtl":"ltr"),n.font&&e.style.setProperty("font-family",n.font)}function dr(e){const n=document.createElement("style");n.textContent=Qt,e.appendChild(n)}function ur(){const e=document.querySelector(Hn);if(e&&e instanceof HTMLElement)return e;const n=document.createElement(Hn);return document.body.appendChild(n),n}function He(e={}){const n=typeof performance<"u"?performance.now():Date.now();if(typeof document>"u")return{unmount:()=>{}};const t=or(),o=typeof window<"u"?window.__BLAKFY_A11Y__??{}:{};let r=en({...t,...o,...e});const d=Z(),a=ar(d);a.mismatched&&$("error","SSR_HYDRATION_MISMATCH",`SSR-rendered prefs differ from client storage: ${a.fields.join(", ")}`),de(d),t.version&&t.version!==Me&&$("error","CDN_VERSION_MISMATCH",`Expected version ${t.version} but runtime is ${Me} — clear your CDN cache.`),d.dyslexiaFont&&!ir()&&$("warn","OPENDYSLEXIC_CDN_MISSING","dyslexiaFont=true but no OpenDyslexic CDN <link> found — system fallback active."),ut()&&$("warn","HOST_CSS_IMPORTANT_CONFLICT","Host stylesheet uses !important on body/a — visual prefs may not apply.");const u=Ce();u.reducedMotion&&$("info","OS_PREFERS_REDUCED_MOTION","OS prefers-reduced-motion=reduce detected."),u.contrast==="more"&&$("info","OS_PREFERS_CONTRAST_MORE","OS prefers-contrast=more detected."),u.colorScheme==="dark"&&$("info","OS_PREFERS_COLOR_SCHEME_DARK","OS prefers-color-scheme=dark detected.");const f=pt(()=>{_.config.theme==="auto"&&(Q(_.host,_.config),_.rerender())}),m=cr(()=>{_.config.theme==="auto"&&(Q(_.host,_.config),_.rerender())});t.devPipe&&gt(t.devPipe);let s=null;if(typeof o.onPreferencesChange=="function"){const E=o.onPreferencesChange;s=J(T.CHANGE,C=>{try{E(C)}catch{}})}const p=ur(),h=p.shadowRoot??p.attachShadow({mode:"open"});for(;h.firstChild;)h.removeChild(h.firstChild);dr(h),Q(p,r);let k=pn();const _={config:r,translation:k,shadowRoot:h,host:p,rerender:()=>{Xe(Ne(Zt,{config:_.config,translation:_.translation,onThemeChange:E=>{_.config={..._.config,theme:E},Q(p,_.config),_.rerender()}}),h)}};if(_.rerender(),r.locale!=="en"){const E=zn();fn(r.locale,E).then(C=>{k=C,_.translation=C,_.rerender()})}const w=At(),g=(typeof performance<"u"?performance.now():Date.now())-n;return nr({config:r,mountTimeMs:g,bundleSizeGz:0,storage:w,configure:E=>{const C=en({..._.config,...E}),P=C.locale!==_.config.locale;if(_.config=C,Q(p,C),P)if(C.locale==="en")_.translation=pn(),_.rerender();else{const Y=zn();fn(C.locale,Y).then(H=>{_.translation=H,_.rerender()})}else _.rerender()}}),$("info","INITIALIZED",`Widget mounted in ${g.toFixed(1)}ms`),N(T.READY,{version:Me}),{unmount:()=>{f(),m(),s&&s(),Xe(null,h),p.parentNode&&p.parentNode.removeChild(p)}}}const Pn="blakfy-a11y";class Dn extends HTMLElement{constructor(){super(...arguments);Fe(this,"_unmount",null)}connectedCallback(){if(this._unmount)return;const t=this._readAttributes(),o=He(t);this._unmount=o.unmount}disconnectedCallback(){this._unmount&&(this._unmount(),this._unmount=null)}attributeChangedCallback(t,o,i){if(o===i||!this._unmount||typeof window>"u"||!window.BlakfyA11y)return;const r=this._readAttributes();window.BlakfyA11y.configure(r)}_readAttributes(){const t={},o=this.getAttribute("locale");o&&(t.locale=o);const i=this.getAttribute("theme");i&&(t.theme=i);const r=this.getAttribute("position");r&&(t.position=r);const d=this.getAttribute("font");d&&(t.font=d);const a=this.getAttribute("debug");return a!=null&&(t.debug=a==="true"),t}}Fe(Dn,"observedAttributes",["locale","theme","position","font","debug"]);function Nn(){typeof customElements>"u"||customElements.get(Pn)||customElements.define(Pn,Dn)}const fr="blakfy-a11y-root",pr="blakfy-a11y";function Un(){typeof document>"u"||document.querySelector(fr)||document.querySelector(pr)||He()}Nn(),typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Un,{once:!0}):Un()),I.defineCustomElement=Nn,I.mount=He,Object.defineProperty(I,Symbol.toStringTag,{value:"Module"})})(this.BlakfyA11y=this.BlakfyA11y||{});
//# sourceMappingURL=widget.js.map
