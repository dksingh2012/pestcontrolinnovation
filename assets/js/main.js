
document.addEventListener("DOMContentLoaded",()=>{
 const menu=document.querySelector(".menu"),links=document.querySelector(".navlinks");
 if(menu&&links) menu.addEventListener("click",()=>{links.classList.toggle("open");menu.setAttribute("aria-expanded",links.classList.contains("open"));});
 document.querySelectorAll("[data-year]").forEach(e=>e.textContent=new Date().getFullYear());
 const form=document.querySelector("#enquiry-form");
 if(form){
   form.addEventListener("submit",()=>{
     const btn=form.querySelector("button[type=submit]");
     if(btn){btn.disabled=true;btn.textContent="Sending enquiry…";}
   });
 }
});
