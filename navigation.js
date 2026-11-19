// HelianA navigation: one category at a time, with native details/summary keyboard support.
const siteNav=document.querySelector('.heliana-site-nav');
if(siteNav){
 const groups=[...siteNav.querySelectorAll('.heliana-nav-group')];
 for(const group of groups){
  group.addEventListener('toggle',()=>{
   if(!group.open)return;
   for(const other of groups)if(other!==group)other.open=false;
  });
 }
 document.addEventListener('pointerdown',event=>{
  if(!siteNav.contains(event.target))for(const group of groups)group.open=false;
 });
 document.addEventListener('keydown',event=>{
  if(event.key==='Escape'){
   const open=groups.find(group=>group.open);
   if(open){open.open=false;open.querySelector('summary')?.focus()}
  }
 });
 // Category links are real destinations, and native details remain keyboard operable.
}
