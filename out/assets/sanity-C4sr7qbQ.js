import{c as n,d as c}from"./vendor-sanity-Bmat3I8K.js";const s=n({projectId:"5n8h847y",dataset:"production",useCdn:!0,apiVersion:"2024-05-08"});c(s);function o(t,{w:a=800,h:r,q:i=80}={}){if(!t)return"";if(t.startsWith("https://")){const e=new URL(t);return e.searchParams.set("auto","format"),e.searchParams.set("w",String(a)),r&&e.searchParams.set("h",String(r)),e.searchParams.set("q",String(i)),e.searchParams.set("fit","max"),e.toString()}return t}function p(t,a=[400,600,800,1200]){return t?a.map(r=>`${o(t,{w:r})} ${r}w`).join(", "):""}const d=async()=>await s.fetch(`*[_type == "product" && disabled != true]{
    _id,
    title,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    actualPrice,
    offerPrice,
    downloadLink,
    "previewUrls": previewImages[].asset->url
  }`),l=async()=>await s.fetch(`*[_type == "pricing"] | order(price asc) {
    _id,
    planName,
    price,
    features,
    isPopular,
    buttonText
  }`);export{l as a,s as c,d as f,p as g,o};
