export const ACTIVITY_KINDS=Object.freeze(['choices','sequence','discussion']);
export const MAX_OPTIONS=6;
export function buildSheet(input){
 const kind=ACTIVITY_KINDS.includes(input?.kind)?input.kind:'choices';
 const title=String(input?.title||'Mon activité').trim().slice(0,90);
 const instruction=String(input?.instruction||'').trim().slice(0,240);
 const options=String(input?.options||'').split(/\r?\n/).map(s=>s.trim()).filter(Boolean).slice(0,MAX_OPTIONS).map(s=>s.slice(0,80));
 if(!title||!instruction||options.length<2)throw new Error('Renseigne un titre, une consigne et au moins deux propositions.');
 return {kind,title,instruction,options};
}
