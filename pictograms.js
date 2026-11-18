// Original HelianA outline symbols. Provisional visual aids, NOT validated AAC pictograms.
// Each card carries visible French text; these graphics alone should never convey meaning.
const PATHS=Object.freeze({
 water:'M12 2C9.2 6.5 5 11 5 15a7 7 0 0 0 14 0c0-4-4.2-8.5-7-13z M9 17c.5 1.5 1.5 2 3 2',
 pause:'M5 4h5v16H5z M14 4h5v16h-5z',
 help:'M4 12h3l3-3 3 3 3-3 4 3 M3 16l6 5 4-1 8-7 M4 8c2-4 6-5 8-2',
 toilet:'M4 5h16v4a8 8 0 0 1-16 0z M7 13v3a5 5 0 0 0 10 0v-3 M12 2v3',
 comfortable:'M5 2v13h14V9a3 3 0 0 0-3-3H8 M3 20h18 M7 15v5 M17 15v5',
 yes:'M4 12l5 5L20 6',
 no:'M5 5l14 14 M19 5 5 19',
 stop:'M4 12h16 M12 4l-8 8 8 8',
 another:'M7 7H3V3 M3 7a9 9 0 0 1 15-2 M17 17h4v4 M21 17a9 9 0 0 1-15 2',
 again:'M3 11a9 9 0 0 1 16-5l2 3 M21 3v6h-6 M21 13a9 9 0 0 1-16 5l-2-3 M3 21v-6h6',
 hello:'M12 21V10 M12 11l-3-7a2 2 0 0 0-3 1l1 8-3-3c-2-1-3 1-2 3l5 7a6 6 0 0 0 10-2l2-8c0-2-3-2-4 0l-1 3',
 thanks:'M12 21s-9-6-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 12-9 12z',
 understand:'M9 9a3 3 0 1 1 5 2l-2 2v2 M12 19h.01 M4 4h16v16H4z',
 repeat:'M3 9V5h13a4 4 0 0 1 4 4v2 M7 15l-4 4 4 4 M3 19h13a4 4 0 0 0 4-4v-2',
 goodbye:'M4 19l8-8 8 8 M12 11V2 M4 19h16'
});
const NS='http://www.w3.org/2000/svg';
export const SYMBOL_IDS=Object.freeze(Object.keys(PATHS));
export function symbolIcon(id){
 const svg=document.createElementNS(NS,'svg');
 svg.setAttribute('viewBox','0 0 24 24');
 svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');
 svg.setAttribute('stroke-width','2');svg.setAttribute('stroke-linecap','round');
 svg.setAttribute('stroke-linejoin','round');svg.setAttribute('aria-hidden','true');
 svg.setAttribute('focusable','false');svg.classList.add('heliana-pictogram');
 const path=document.createElementNS(NS,'path');
 path.setAttribute('d',Object.hasOwn(PATHS,id)?PATHS[id]:PATHS.understand);
 svg.append(path);
 return svg;
}
