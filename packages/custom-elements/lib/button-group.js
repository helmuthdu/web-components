import{d as m,c as d,m as s}from"./custom-element.js";const l={append:void 0},a=t=>d("inline-flex rounded-md shadow-sm",t.append);m("ui-button-group",{data:l,onAttributeChanged(t,e,p,{dataset:o,root:n}){n.className=a(o)},onConnected({children:t}){for(let e=0;e<(t!=null?t:[]).length;e++)t[e].setAttribute("data-group",e===0?"first":e===t.length-1?"last":"")},template:({dataset:t})=>[s("link",{rel:"stylesheet",href:"/tailwind.css"},s("div",{id:"root",className:a(t)},s("slot")))]});
