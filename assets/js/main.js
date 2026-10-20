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
     // This is an attempt only; a successful lead is recorded on the FormSubmit return URL.
     track("lead_form_submit_attempt",{form_name:"website_enquiry"});
     const btn=form.querySelector("button[type=submit]");
     if(btn){btn.disabled=true;btn.textContent="Sending enquiry…";}
   });
 }
 // FormSubmit returns here only after its configured submission flow; do not include form data.
 if(new URLSearchParams(location.search).get("submitted")==="1"){
   track("generate_lead",{lead_method:"website_form",form_name:"website_enquiry"});
   const el=document.getElementById("form-success"); if(el) el.hidden=false;
 }
});