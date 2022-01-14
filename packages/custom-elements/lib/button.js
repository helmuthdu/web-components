import{d as p,c as l,r as u,m as g}from"./custom-element.js";const x=r=>`
  <svg
    class="${l("absolute animate-spin",{"h-3 w-3":r.size==="xs","h-4 w-4":r.size==="sm","h-5 w-5":r.size==="md"||!r.size,"h-6 w-6":r.size==="lg","h-7 w-7":r.size==="xl"},r.outline?{"text-primary":r.variant==="primary","text-error":r.variant==="error","text-success":r.variant==="success"}:{"text-primary-contrast":r.variant==="primary","text-error-contrast":r.variant==="error","text-success-contrast":r.variant==="success"})}"
    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
`,o=r=>l("inline-flex flex-wrap items-center justify-center text-center font-semibold border-transparent gap-2",!r.group&&"shadow-sm",r.group&&!r.circle?{"-mx-px":r.outline,"rounded-l-lg":r.group==="first","rounded-r-lg":r.group==="last"}:r.rounded?"rounded-full":"rounded-lg",r.block&&"w-full",r.circle?{"rounded-full p-0":!0,"h-8 w-8":r.size==="xs","h-10 w-10":r.size==="sm","h-12 w-12":r.size==="md","h-14 w-14":r.size==="lg","h-16 w-16":r.size==="xl"}:r.outline&&!r.disabled?{"text-xs px-4 py-0.5 mt-0.5":r.size==="xs","text-sm px-4 py-1.5":r.size==="sm","text-base px-5 py-2.5":r.size==="md","text-lg px-5 py-3.5":r.size==="lg","text-xl px-6 py-3.5":r.size==="xl"}:{"text-xs px-4 py-1":r.size==="xs","text-sm px-4 py-2":r.size==="sm","text-base px-5 py-3":r.size==="md","text-lg px-5 py-4":r.size==="lg","text-xl px-6 py-4":r.size==="xl"},r.disabled?`bg-neutral-500 border-opacity-0 bg-opacity-20 ${r.loading?"text-transparent":"text-neutral-600/25"}`:r.outline?{"bg-transparent border-2":!0,"border-primary hover:ring-4 focus:ring-4 ring-primary-focus":r.variant==="primary","border-error hover:ring-4 focus:ring-4 ring-error-focus":r.variant==="error","border-success hover:ring-4 focus:ring-4 ring-success-focus":r.variant==="success","text-transparent":r.loading,[`text-${r.variant}`]:!r.loading}:{"border-none":!0,"bg-primary hover:ring-4 focus:ring-4 ring-primary-focus":r.variant==="primary","bg-error hover:ring-4 focus:ring-4 ring-error-focus":r.variant==="error","bg-success hover:ring-4 focus:ring-4 ring-success-focus":r.variant==="success","text-transparent":r.loading,[`text-${r.variant}-contrast`]:!r.loading},r.append);p("ui-button",{data:{append:void 0,block:void 0,circle:void 0,disabled:void 0,group:void 0,loading:void 0,outline:void 0,rounded:void 0,size:"md",type:"button",variant:"primary"},onAttributeChanged:(r,e,n,{classList:s,root:c,update:t,dataset:i})=>{switch(r){case"append":case"circle":case"disabled":case"group":case"outline":case"rounded":case"size":case"variant":c.className=o(i);break;case"block":s[i.block?"add":"remove"]("w-full"),c.className=o(i);break;default:t()}},onConnected({classList:r,dataset:e}){r[e.block?"add":"remove"]("w-full")},template:({dataset:r})=>{const{link:e,button:n,slot:s}=g;return[e({rel:"stylesheet",href:"/tailwind.css"}),n({id:"root",type:r.type,disabled:r.disabled,className:o(r)},r.loading&&u(x(r)),s())]}});
