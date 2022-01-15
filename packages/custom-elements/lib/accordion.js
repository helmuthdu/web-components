import{d as p,c as d,r as c,m}from"./custom-element.js";const o=e=>d("block text-content py-2 px-4",e.append);p("ui-accordion",{data:{append:void 0,header:""},onAttributeChanged(e,i,t,{dataset:r,update:l,root:n,shadowRoot:a}){switch(e){case"append":n.className=o(r);break;case"header":const s=a==null?void 0:a.getElementById("header");s&&(s.innerText=t);break}},template:({dataset:e})=>{const{link:i,style:t,details:r,summary:l,div:n,span:a,slot:s}=m;return[i({rel:"stylesheet",href:"/tailwind.css"}),t(`
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
      `),r({id:"root",className:o(e)},l({className:"block py-1 cursor-pointer"},c(`
            <svg class="w-4 h-4 float-left mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          `),a({id:"header"},e.header)),n({},s()))]}});