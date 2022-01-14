import{d,c as n,m as i}from"./custom-element.js";const a=e=>n("overflow-hidden border border-white/30",{"rounded-full":e.style==="circle","rounded-lg":e.style==="rounded"},e.append);d("ui-avatar",{data:{append:void 0,style:"circle"},onAttributeChanged(e,l,r,{dataset:t,root:s}){s.className=a(t)},template:({dataset:e})=>{const{link:l,style:r,div:t,slot:s}=i;return[l({rel:"stylesheet",href:"/tailwind.css"}),r(`
        ::slotted(:first-child) {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `),t({id:"root",className:a(e)},s())]}});
