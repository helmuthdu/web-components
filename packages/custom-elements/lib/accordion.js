import{d as o,c as p,m as e,r as d}from"./custom-element.js";const r=a=>p("block text-content py-2 px-4",a.append);o("ui-accordion",{data:{append:void 0,header:""},onAttributeChanged(a,m,n,{dataset:i,update:c,root:l,shadowRoot:s}){switch(a){case"append":l.className=r(i);break;case"header":{const t=s==null?void 0:s.getElementById("header");t&&(t.innerText=n);break}}},template:({dataset:a})=>[e("link",{rel:"stylesheet",href:"/tailwind.css"}),e("style",{},`
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
      `),e("details",{id:"root",className:r(a)},e("summary",{className:"block py-1 cursor-pointer"},d(`
            <svg class="w-4 h-4 float-left mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          `),e("span",{id:"header"},a.header)),e("div",{},e("slot")))]});
