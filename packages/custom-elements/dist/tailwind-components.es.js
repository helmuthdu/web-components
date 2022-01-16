var B=Object.defineProperty,R=Object.defineProperties;var P=Object.getOwnPropertyDescriptors;var N=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var S=(t,e,a)=>e in t?B(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,C=(t,e)=>{for(var a in e||(e={}))A.call(e,a)&&S(t,a,e[a]);if(N)for(var a of N(e))L.call(e,a)&&S(t,a,e[a]);return t},$=(t,e)=>R(t,P(e));var M=(t,e)=>{var a={};for(var r in t)A.call(t,r)&&e.indexOf(r)<0&&(a[r]=t[r]);if(t!=null&&N)for(var r of N(t))e.indexOf(r)<0&&L.call(t,r)&&(a[r]=t[r]);return a};var O=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)};var w=(t,e,a)=>(O(t,e,"read from private field"),a?a.call(t):e.get(t)),j=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},H=(t,e,a,r)=>(O(t,e,"write to private field"),r?r.call(t,a):e.set(t,a),a);const isString=t=>typeof t=="string",isObject=t=>typeof t=="object"&&t!==null,isFunction=t=>typeof t=="function",isArray=Array.isArray,getAttrName=t=>t.replace(/([A-Z])/g,"-$1").toLowerCase(),u=Object.freeze({$for:(t=void 0)=>isArray(t)?t.map((e,a)=>({element:e,index:a})):[{element:void 0,index:0}],$if:(t,e)=>t===void 0?!0:typeof t=="function"?t(e):!!t}),g=(t,e,a)=>{t==="style"||t==="dataset"?Object.entries(e).forEach(([r,i])=>a[t][r]=i):t==="className"||[isObject,isFunction,isArray].some(r=>r(e))?a[t]=e:a instanceof HTMLElement&&(t==="innerHTML"?isString(e)&&(a.innerHTML=e):a.setAttribute(t,e))},l$1=(t,e,a)=>{t!==void 0&&(isArray(t)?t.forEach(r=>l$1(r,e,a)):t instanceof HTMLElement||t instanceof SVGSVGElement?e.append(t):isFunction(t)?l$1(a.element?t(a.element,a.index):t(),e,a):e.append(document.createTextNode(t.toString())))},y=(t,e="html")=>{const a=e==="fragment"?new DocumentFragment:document.createElement(t.tag);return Object.entries(t.attributes).forEach(([r,i])=>g(r,i,a)),t.children.forEach(r=>l$1(r,a,t)),a},T=(...t)=>{let e={},a=[];if((t==null?void 0:t.length)>0){const[r,...i]=t.filter(m=>m!==void 0);isObject(r)?(e=r,a=i.flat()):a=[r]}return{attributes:e,children:a}},c$2=(t="",e="html")=>(...a)=>{const E=T(...a),{attributes:d}=E,b=d,{$for:r,$if:i}=b,m=M(b,["$for","$if"]),{children:p}=E,h=u.$for(r).filter(f=>u.$if(i,f.element)).map(f=>y($(C({},f),{attributes:m,tag:t,children:p}),e));return h.length===1?h[0]:h},raw=t=>[...new DOMParser().parseFromString(t,"text/html").body.children],markup=(()=>["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hr","html","i","iframe","img","input","ins","kbd","label","legend","li","link","main","map","mark","menu","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","rp","rt","ruby","s","samp","script","section","select","slot","small","source","span","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr"].reduce((t,e)=>$(C({},t),{[e]:c$2(e)}),{}))(),classMap=(...t)=>t.reduce((e,a)=>(isString(a)?e+=`${a} `:isObject(a)&&Object.entries(a).filter(([r,i])=>i).forEach(([r])=>{e+=`${r} `}),e),"").trim(),injectStyles=(t,e=[])=>{(e!=null?e:[]).length>0&&Promise.all(e.map(a=>{if(isString(a))return new CSSStyleSheet().replace(a);if(a instanceof CSSStyleSheet)return Promise.resolve(a);throw new Error("invalid css in styles")})).then(a=>{t.adoptedStyleSheets=a})},component=({onAttributeChanged:t,onConnected:e,onDisconnected:a,data:r,styles:i=[],template:m})=>{var p,h,E;return E=class extends HTMLElement{constructor(){super();j(this,p,!1);j(this,h,new Proxy(this,{get(d,b){const f=Reflect.get(d,b);return isFunction(f)?f.bind(d):b==="dataset"?Object.entries(f).reduce((v,[z,k])=>$(C({},v),{[z]:k===""?!0:k}),{}):f}}));injectStyles(this.attachShadow({mode:"open"}),i),Object.entries(r).filter(([d,b])=>b).forEach(([d,b])=>{var f,v;(v=(f=this.dataset)[d])!=null||(f[d]=b)}),this.update()}static get observedAttributes(){return[...Object.keys(r).map(d=>`data-${getAttrName(d)}`)]}connectedCallback(){H(this,p,!0),e&&e(w(this,h))}disconnectedCallback(){a&&a(w(this,h))}attributeChangedCallback(d,b,f){w(this,p)&&b!==f&&t&&t(d.replace("data-",""),b,f,w(this,h))}update(){const d=m(w(this,h)),b=this.shadowRoot;isString(d)?b.innerHTML=d:b.replaceChildren(...isArray(d)?d.flat():[d])}fire(d,b){this.dispatchEvent(new CustomEvent(d,b))}event(d,b,f,v){var k;const z=isString(d)?(k=this.shadowRoot)==null?void 0:k.getElementById(`${d}`):d;if(!z)throw new Error(`element with id="${d}" not found`);z.addEventListener(b,f,v)}get root(){var d;return(d=this.shadowRoot)==null?void 0:d.getElementById("root")}},p=new WeakMap,h=new WeakMap,E},define=(t,e)=>{customElements.define(t,component(e))},l=t=>classMap("block text-content py-2 px-4",t.append);define("ui-accordion",{data:{append:void 0,header:""},onAttributeChanged(t,e,a,{dataset:r,update:i,root:m,shadowRoot:p}){switch(t){case"append":m.className=l(r);break;case"header":{const h=p==null?void 0:p.getElementById("header");h&&(h.innerText=a);break}}},template:({dataset:t})=>{const{link:e,style:a,details:r,summary:i,div:m,span:p,slot:h}=markup;return[e({rel:"stylesheet",href:"/tailwind.css"}),a(`
        details[open] summary ~ * {
          animation: open 0.5s ease-in-out;
        }
        details svg {
          transition: transform 0.3s ease-in-out;
        }
        details[open] svg {
          transform: rotate(90deg);
        }
        details summary::-webkit-details-marker {
          display: none;
        }
        @keyframes open {
          0% { opacity: 0; display: none; }
          1% { opacity: 0; display: block; }
          100% { opacity: 1; display: block; }
        }
      `),r({id:"root",className:l(t)},i({className:"block py-1 cursor-pointer"},raw(`
            <svg class="w-4 h-4 float-left mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          `),p({id:"header"},t.header)),m({},h()))]}});const s$2=t=>classMap("block rounded-lg px-2 py-1",{"bg-canvas border border-contrast-200":t.variant==="primary","bg-transparent":t.variant==="secondary"||t.variant==="tertiary"},t.append),c$1=(t,e)=>{const a=["block","border-b","border-contrast-200"],r=["block","mb-2","rounded-lg","bg-canvas","border","border-contrast-200"],i=["block","border-b","border-contrast-800"];[...t].forEach((m,p)=>{m.classList.remove(...a,...r,...i),e.variant==="secondary"?m.classList.add(...r):p<t.length-1&&m.classList.add(...e.variant==="tertiary"?i:a)})};define("ui-accordion-group",{data:{append:void 0,variant:"primary"},onAttributeChanged(t,e,a,{children:r,dataset:i,root:m}){switch(t){case"append":m.className=s$2(i);break;case"variant":m.className=s$2(i),c$1(r,i);break}},onConnected:({dataset:t,children:e})=>{c$1(e,t)},template:({dataset:t})=>{const{link:e,div:a,slot:r}=markup;return[e({rel:"stylesheet",href:"/tailwind.css"}),a({id:"root",className:s$2(t)},r())]}});const o=t=>classMap("flex justify-between items-center py-2 px-4 text-sm border rounded-xl shadow-sm",t.variant?{"text-primary-content bg-primary-backdrop border-primary-focus":t.variant==="info","text-error-content bg-error-backdrop border-error-focus":t.variant==="error","text-success-content bg-success-backdrop border-success-focus":t.variant==="success","text-contrast-50 bg-contrast-800 border-contrast-700":t.variant==="contrast"}:"text-content bg-contrast-50 border-contrast-200",t.append);define("ui-alert",{data:{append:void 0,variant:void 0},onAttributeChanged(t,e,a,{dataset:r,root:i}){i.className=o(r)},template:({dataset:t,fire:e,remove:a})=>{const{link:r,button:i,div:m,span:p,slot:h}=markup;return[r({rel:"stylesheet",href:"/tailwind.css"}),m({id:"root",className:o(t)},p({className:"text-sm"},h()),i({id:"button",type:"button",dataset:{collapseToggle:"alert"},className:"inline-flex items-center justify-center ml-2 -mr-2 p-0.5 h-8 w-8 text-current",ariaLabel:"close",onclick:()=>{e("close"),a()}},raw(`
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>`),p({className:"sr-only"},"close")))]}});const s$1=t=>classMap("overflow-hidden border border-white/30",{"rounded-full":t.style==="circle","rounded-lg":t.style==="rounded"},t.append);define("ui-avatar",{data:{append:void 0,style:"circle"},onAttributeChanged(t,e,a,{dataset:r,root:i}){i.className=s$1(r)},template:({dataset:t})=>{const{link:e,style:a,div:r,slot:i}=markup;return[e({rel:"stylesheet",href:"/tailwind.css"}),a(`
        ::slotted(:first-child) {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `),r({id:"root",className:s$1(t)},i())]}});const n$3=t=>classMap("inline-flex items-center flex-wrap",t.append);define("ui-avatar-group",{data:{append:void 0},onAttributeChanged(t,e,a,{dataset:r,root:i}){i.className=n$3(r)},template:({dataset:t})=>{const{link:e,div:a,slot:r}=markup;return[e({rel:"stylesheet",href:"/tailwind.css"}),a({id:"root",className:n$3(t)},r())]}});const n$2=t=>classMap("inline-flex flex-wrap items-center justify-center text-center whitespace-nowrap align-middle font-semibold py-0.5 px-2",t.pill?"rounded-full":"rounded-lg",{"text-xs":t.size==="xs","text-sm":t.size==="sm","text-base":t.size==="md","text-lg":t.size==="lg","text-xl":t.size==="xl"},t.variant?{"text-primary-contrast bg-primary border-primary-focus":t.variant==="info","text-error-contrast bg-error border-error-focus":t.variant==="error","text-success-contrast bg-success border-success-focus":t.variant==="success","text-contrast-50 bg-contrast-800 border-contrast-700":t.variant==="contrast"}:"text-content bg-contrast-50 border-contrast-200",t.append);define("ui-badge",{data:{append:void 0,pill:void 0,size:"md",variant:void 0},onAttributeChanged:(t,e,a,{dataset:r,root:i})=>{switch(t){case"append":case"pill":case"size":case"variant":i.className=n$2(r);break}},template:({dataset:t})=>{const{link:e,span:a,slot:r}=markup;return[e({rel:"stylesheet",href:"/tailwind.css"}),a({id:"root",className:n$2(t)},r())]}}),define("ui-card",{data:{append:void 0,horizontal:void 0},template:({dataset:t})=>{const{link:e,div:a,slot:r}=markup;return[e({rel:"stylesheet",href:"/tailwind.css"}),a({className:classMap("flex justify-center rounded-lg shadow-lg bg-white dark:bg-canvas border border-contrast-200 max-w-sm overflow-hidden",t.horizontal?"flex-row":"flex-col",t.append)},r())]}}),define("ui-card-body",{data:{append:void 0},template:({dataset:t})=>{const{link:e,section:a,slot:r}=markup;return[e({rel:"stylesheet",href:"/tailwind.css"}),a({className:classMap("flex flex-col gap-2 text-base text-content p-4",t.append)},r())]}}),define("ui-card-footer",{data:{append:void 0},template:({dataset:t})=>{const{link:e,footer:a,slot:r}=markup;return[e({rel:"stylesheet",href:"/tailwind.css"}),a({className:classMap("inline-flex gap-2 w-full",t.append)},r())]}}),define("ui-card-header",{data:{append:void 0},template:({dataset:t,classList:e})=>{const{link:a,header:r,slot:i}=markup;return[a({rel:"stylesheet",href:"/tailwind.css"}),r({className:"align-middle text-content text-xl font-medium"},i())]}}),define("ui-card-image",{data:{append:void 0,url:void 0},template:({dataset:t})=>{const{link:e,img:a,slot:r}=markup;return[e({rel:"stylesheet",href:"/tailwind.css"}),a({className:classMap("w-auto h-full object-cover",t.append),src:t.url,alt:""},r())]}}),define("ui-card-meta",{data:{append:void 0},template:({dataset:t})=>{const{link:e,span:a,slot:r}=markup;return[e({rel:"stylesheet",href:"/tailwind.css"}),a({className:classMap("block text-sm text-content-tertiary",t.append)},r())]}});const c=t=>classMap("inline-flex flex-wrap items-center justify-center text-center whitespace-nowrap align-middle font-semibold py-0.5 px-2",t.pill?"rounded-full":"rounded-lg",{"text-xs":t.size==="xs","text-sm":t.size==="sm","text-base":t.size==="md","text-lg":t.size==="lg","text-xl":t.size==="xl"},t.variant?{"text-primary-contrast bg-primary border-primary-focus":t.variant==="info","text-error-contrast bg-error border-error-focus":t.variant==="error","text-success-contrast bg-success border-success-focus":t.variant==="success","text-contrast-50 bg-contrast-800 border-contrast-700":t.variant==="contrast"}:"text-content bg-contrast-50 border-contrast-200",t.append);define("ui-carousel",{data:{append:void 0},template:({dataset:t})=>{const{link:e,span:a,slot:r}=markup;return[e({rel:"stylesheet",href:"/tailwind.css"}),a({id:"root",className:c(t)},r())]}});const data$1={append:void 0},n$1=t=>classMap("block text-content bg-canvas border border-contrast-200 rounded-lg p-5",t.append);define("ui-box",{data:data$1,onAttributeChanged(t,e,a,{dataset:r,root:i}){i.className=n$1(r)},template:({dataset:t})=>{const{link:e,div:a,slot:r}=markup;return[e({rel:"stylesheet",href:"/tailwind.css"}),a({id:"root",className:n$1(t)},r())]}});const x=t=>`
  <svg
    class="${classMap("absolute animate-spin",{"h-3 w-3":t.size==="xs","h-4 w-4":t.size==="sm","h-5 w-5":t.size==="md"||!t.size,"h-6 w-6":t.size==="lg","h-7 w-7":t.size==="xl"},t.outline?{"text-primary":t.variant==="primary","text-error":t.variant==="error","text-success":t.variant==="success"}:{"text-primary-contrast":t.variant==="primary","text-error-contrast":t.variant==="error","text-success-contrast":t.variant==="success"})}"
    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
`,n=t=>classMap("inline-flex flex-wrap items-center justify-center text-center font-semibold border-transparent gap-2",!t.group&&"shadow-sm",t.group&&!t.circle?{"-mx-px":t.outline,"rounded-l-lg":t.group==="first","rounded-r-lg":t.group==="last"}:t.rounded?"rounded-full":"rounded-lg",t.block&&"w-full",t.circle?{"rounded-full p-0":!0,"h-8 w-8":t.size==="xs","h-10 w-10":t.size==="sm","h-12 w-12":t.size==="md","h-14 w-14":t.size==="lg","h-16 w-16":t.size==="xl"}:t.outline&&!t.disabled?{"text-xs px-4 py-0.5 mt-0.5":t.size==="xs","text-sm px-4 py-1.5":t.size==="sm","text-base px-5 py-2.5":t.size==="md","text-lg px-5 py-3.5":t.size==="lg","text-xl px-6 py-3.5":t.size==="xl"}:{"text-xs px-4 py-1":t.size==="xs","text-sm px-4 py-2":t.size==="sm","text-base px-5 py-3":t.size==="md","text-lg px-5 py-4":t.size==="lg","text-xl px-6 py-4":t.size==="xl"},t.disabled?`bg-neutral-500 border-opacity-0 bg-opacity-20 ${t.loading?"text-transparent":"text-neutral-600/25"}`:t.outline?{"bg-transparent border-2":!0,"border-primary hover:ring-4 focus:ring-4 ring-primary-focus":t.variant==="primary","border-error hover:ring-4 focus:ring-4 ring-error-focus":t.variant==="error","border-success hover:ring-4 focus:ring-4 ring-success-focus":t.variant==="success","text-transparent":t.loading,[`text-${t.variant}`]:!t.loading}:{"border-none":!0,"bg-primary hover:ring-4 focus:ring-4 ring-primary-focus":t.variant==="primary","bg-error hover:ring-4 focus:ring-4 ring-error-focus":t.variant==="error","bg-success hover:ring-4 focus:ring-4 ring-success-focus":t.variant==="success","text-transparent":t.loading,[`text-${t.variant}-contrast`]:!t.loading},t.append);define("ui-button",{data:{append:void 0,block:void 0,circle:void 0,disabled:void 0,group:void 0,loading:void 0,outline:void 0,rounded:void 0,size:"md",type:"button",variant:"primary"},onAttributeChanged:(t,e,a,{classList:r,root:i,update:m,dataset:p})=>{switch(t){case"append":case"circle":case"disabled":case"group":case"outline":case"rounded":case"size":case"variant":i.className=n(p);break;case"block":r[p.block?"add":"remove"]("w-full"),i.className=n(p);break;default:m()}},onConnected({classList:t,dataset:e}){t[e.block?"add":"remove"]("w-full")},template:({dataset:t})=>{const{link:e,button:a,slot:r}=markup;return[e({rel:"stylesheet",href:"/tailwind.css"}),a({id:"root",type:t.type,disabled:t.disabled,className:n(t)},t.loading&&raw(x(t)),r())]}});const data={append:void 0},s=t=>classMap("inline-flex rounded-md shadow-sm",t.append);define("ui-button-group",{data,onAttributeChanged(t,e,a,{dataset:r,root:i}){i.className=s(r)},onConnected({children:t}){for(let e=0;e<(t!=null?t:[]).length;e++)t[e].setAttribute("data-group",e===0?"first":e===t.length-1?"last":"")},template:({dataset:t})=>{const{link:e,div:a,slot:r}=markup;return[e({rel:"stylesheet",href:"/tailwind.css"}),a({id:"root",className:s(t)},r())]}});
