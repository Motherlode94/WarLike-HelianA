// Accessible navigation across HelianA: native details/summary with one open group.
const siteNav=document.querySelector('.heliana-site-nav');
if(siteNav){
 const groups=[...siteNav.querySelectorAll('.heliana-nav-group')];
 const closeAll=()=>{for(const group of groups)group.open=false;};
 for(const group of groups){
  group.addEventListener('toggle',()=>{
   if(!group.open)return;
   for(const other of groups)if(other!==group)other.open=false;
  });
 }
 document.addEventListener('pointerdown',event=>{
  if(!siteNav.contains(event.target))closeAll();
 });
 document.addEventListener('focusin',event=>{
  if(!siteNav.contains(event.target))closeAll();
 });
 document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  const open=groups.find(group=>group.open);
  if(!open)return;
  open.open=false;
  open.querySelector('summary')?.focus();
  event.preventDefault();
 });
}
