import{d,c as o,a as e,r as p}from"./custom-element.js";const r=({dataset:a})=>o("block text-content py-2 px-4",a.append);d("ui-accordion",{props:{dataset:{append:void 0,header:""}},onAttributeChanged(a,c,n,{dataset:i,update:m,root:l,shadowRoot:s}){switch(a){case"data-append":l.className=r({dataset:i});break;case"data-header":{const t=s==null?void 0:s.getElementById("header");t&&(t.innerText=n);break}}},template:({dataset:a})=>[e("link",{rel:"stylesheet",href:"/tailwind.css"}),e("style",{},"details svg { transition: transform 0.3s ease-in-out; } details[open] svg { transform: rotate(90deg); } details summary::-webkit-details-marker { display: none; }"),e("details",{id:"root",className:r({dataset:a})},e("summary",{className:"flex items-center gap-2 py-1 cursor-pointer"},p('<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>'),e("span",{id:"header"},a.header)),e("div",{},e("slot")))]});
