// Explicit activity placement. Never mount a global speech toolbar above the page.
export const layouts=Object.freeze({
 'index.html':{host:'[data-space="workshop"] .lesson',question:'#instruction',read:'repeat',stop:'stopVoice'},
 'games.html':{host:'#gameArea',question:'#gameInstruction',read:'hearInstruction',stop:'stopGameVoice'},
 'pathways.html':{host:'#learningArea',question:'#activityInstruction',read:'repeatActivity',stop:'stopActivityVoice'},
 'coding.html':{host:'#challenge',question:'#instruction',read:'hear',stop:'stopVoice'},
 'learning-studio.html':{host:'#activity',question:'#prompt',read:'listen',stop:'silence'},
 'maths.html':{host:'.lesson',question:'#prompt',read:'listen',stop:'stop'},
 'stories.html':{host:'.lesson',question:'#question',read:'listen',stop:'stop'},
 'reading.html':{host:'.lesson',question:'.lesson > p:first-of-type',stop:'stop'},
 'writing.html':{host:'.lesson',question:'.lesson > p:first-of-type',stop:'stop'},
 'communication.html':{host:'.lesson',question:'.lesson > p:first-of-type',stop:'stop'},
 'creativity.html':{host:'.lesson',question:'#instruction',read:'listen',stop:'stop'},
 'educator.html':{host:'.lesson',question:'#instruction',read:'listen',stop:'stop'},
 'resources.html':{host:'.lesson',question:'#prompt',read:'listen',stop:'stop'}
});
export function layoutFor(path){return layouts[String(path||'/').split('/').pop()||'index.html']||null;}
