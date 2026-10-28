// OpenAI Ads Measurement Pixel. Loaded once on all pages through this shared script.
(function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=true;j.src=u;var first=d.getElementsByTagName(s)[0];first.parentNode.insertBefore(j,first)})(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");
oaiq("init",{pixelId:"5qvtYsEgdr3eWvX4dKNnhG"});

document.addEventListener("DOMContentLoaded",()=>{
 const menu=document.querySelector(".menu"),links=document.querySelector(".navlinks");
 if(menu&&links) menu.addEventListener("click",()=>{links.classList.toggle("open");menu.setAttribute("aria-expanded",links.classList.contains("open"));});
 document.querySelectorAll("[data-year]").forEach(e=>e.textContent=new Date().getFullYear());

 // Track contact actions in the existing Google Analytics 4 property.
 // Never send names, phone numbers, messages, or other form fields to analytics.
 const track=(eventName,params={})=>{
   if(typeof window.gtag==="function") window.gtag("event",eventName,{...params,transport_type:"beacon"});
 };
 document.addEventListener("click",(event)=>{
   const link=event.target.closest("a[href]");
   if(!link) return;
   const href=link.getAttribute("href")||"";
   if(/^tel:/i.test(href)){
     track("phone_click",{contact_method:"phone",link_location:link.closest("header")?"header":link.closest("footer")?"footer":link.closest(".contact-card")?"contact_card":"website"});
   }else if(/wa\.me|api\.whatsapp\.com/i.test(href)){
     track("whatsapp_click",{contact_method:"whatsapp",link_location:link.classList.contains("whatsapp-float")?"floating_button":link.closest("header")?"header":link.closest("footer")?"footer":"website"});
   }
 });

 const form=document.querySelector("#enquiry-form");
 if(form){
   form.addEventListener("submit",()=>{
     // Allow a new genuine submission to be counted after a prior confirmation page.
     try{sessionStorage.removeItem("oai_lead_created_once");}catch(e){}
     // This is an attempt only; a successful lead is recorded on the FormSubmit return URL.
     track("lead_form_submit_attempt",{form_name:"website_enquiry"});
     const btn=form.querySelector("button[type=submit]");
     if(btn){btn.disabled=true;btn.textContent="Sending enquiry…";}
   });
 }
 // FormSubmit returns here only after its configured submission flow; do not include form data.
 if(new URLSearchParams(location.search).get("submitted")==="1"){
   track("generate_lead",{lead_method:"website_form",form_name:"website_enquiry"});
   // Fire the Ads Manager Lead event only on the configured post-submission return URL.
   let sendOpenAiLead=true;
   try{if(sessionStorage.getItem("oai_lead_created_once")==="1")sendOpenAiLead=false;else sessionStorage.setItem("oai_lead_created_once","1");}catch(e){}
   if(sendOpenAiLead&&typeof window.oaiq==="function") oaiq("measure","lead_created",{type:"customer_action"});
   const el=document.getElementById("form-success"); if(el) el.hidden=false;
 }
});