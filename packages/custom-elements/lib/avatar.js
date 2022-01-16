import{d as a,c as d,m as t}from"./custom-element.js";const s=e=>d("overflow-hidden border border-white/30",{"rounded-full":e.style==="circle","rounded-lg":e.style==="rounded"},e.append);a("ui-avatar",{data:{append:void 0,style:"circle"},onAttributeChanged(e,i,n,{dataset:l,root:r}){r.className=s(l)},template:({dataset:e})=>[t("link",{rel:"stylesheet",href:"/tailwind.css"}),t("style",{},`
          ::slotted(:first-child) {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `),t("div",{id:"root",className:s(e)},t("slot"))]});
