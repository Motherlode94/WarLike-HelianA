const $=id=>document.getElementById(id);
const boxes=[...document.querySelectorAll('.guide-card input[type="checkbox"]')];
function updateStatus(){
 const count=boxes.filter(box=>box.checked).length;
 $('guideStatus').textContent=count===0?'Aucune case cochée. Les cases sont facultatives et ne sont pas enregistrées.':count+' repère'+(count>1?'s':'')+' coché'+(count>1?'s':'')+' sur '+boxes.length+'. Aucune réponse enregistrée.';
}
for(const input of boxes)input.addEventListener('change',updateStatus);
$('clearChecklist').addEventListener('click',()=>{for(const input of boxes)input.checked=false;updateStatus()});
$('printGuide').addEventListener('click',()=>window.print());
updateStatus();
