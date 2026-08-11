(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const re="wywlx_save_v1",He="wywlx_meta_v1";function Ie(){return{flags:{},currentNode:"p1s1",chapter:0,readCount:0,time:23*60+50,notes:["n_onboarding","n_lin_remind","n_lin_draft","n_zhou","n_secret"],photos:["p_home","p_lin_cake","p_lin_window","p_nightout","p_room","p_hallway_orig"],contacts:["c_unknown","c_lin","c_zhou","c_mom","c_doctor"],calls:["c_lin_last"],draftsUnlocked:!1,roomViewed:0}}let m=Ie(),U=kt();function y(){return m}function de(){return U}function Y(e,t){m.flags[e]=t}function ge(e,t=1){m.flags[e]=(Number(m.flags[e])||0)+t}function pt(e){return m.flags[e]}function gt(e){m.notes.includes(e)||m.notes.push(e)}function bt(e){m.photos.includes(e)||m.photos.push(e)}function ht(e){m.contacts.includes(e)||m.contacts.push(e)}function vt(e){m.calls.includes(e)||m.calls.push(e)}function yt(e){m.chapter=e}function Ct(e){m.currentNode=e}function _t(e){m.time=Math.max(0,m.time+e)}function Et(){m.readCount+=1}function $e(){try{localStorage.setItem(re,JSON.stringify(m))}catch{}}function Be(){try{return!!localStorage.getItem(re)}catch{return!1}}function St(){try{const e=localStorage.getItem(re);return e?(m=JSON.parse(e),!0):!1}catch{return!1}}function Ee(){m=Ie();try{localStorage.removeItem(re)}catch{}}function kt(){try{const e=localStorage.getItem(He);if(e){const t=JSON.parse(e);return{endings:t.endings??[],newGamePlus:t.newGamePlus??!1}}}catch{}return{endings:[],newGamePlus:!1}}function wt(e){U.endings.includes(e)||U.endings.push(e),U.newGamePlus=!0;try{localStorage.setItem(He,JSON.stringify(U))}catch{}}function Tt(){const e=t=>Number(m.flags[t])||0;return{truth:e("trait_truth"),help:e("trait_help"),avoid:e("trait_avoid"),care:e("trait_care"),silent:e("trait_silent")}}function Nt(){return["confess","therapy","loop","merge","silence"].every(e=>U.endings.includes(e))}function Lt(e){if(!e)return!0;const t=e.match(/^!?flag:([A-Za-z0-9_.]+)$/);if(t){const a=!!m.flags[t[1]];return e.startsWith("!")?!a:a}const n=e.match(/^count:([A-Za-z0-9_.]+)\s*(>=|<=|==|>|<)\s*(-?\d+)$/);if(n){const o=Number(m.flags[n[1]])||0,a=Number(n[3]);switch(n[2]){case">=":return o>=a;case"<=":return o<=a;case"==":return o===a;case">":return o>a;case"<":return o<a}}return e==="drafts:unlocked"?m.draftsUnlocked:e==="chapter:>1"?m.chapter>1:e==="chapter:>2"?m.chapter>2:e==="chapter:>3"?m.chapter>3:e==="chapter:>=3"?m.chapter>=3:e==="chapter:>=4"?m.chapter>=4:e==="chapter:>=5"?m.chapter>=5:!1}function De(e){return e.replace(/\{([A-Za-z0-9_]+)\}/g,(t,n)=>{const o=m.flags[n];return o===void 0?"":String(o)})}const Oe={master:.9,ambience:.7,sfx:1};let d=null,B=null,C=null,Z=null,z=!1,w=null,oe=null,D=null,be=1,L={...Oe};try{const e=localStorage.getItem("wywlx_audio");e&&(L={...Oe,...JSON.parse(e)})}catch{}function Rt(){return{...L}}function At(e){L={...L,...e};try{localStorage.setItem("wywlx_audio",JSON.stringify(L))}catch{}d&&Mt()}function ne(e){be=e,z&&Fe()}function ze(){if(d){d.state==="suspended"&&d.resume();return}const e=window.AudioContext||window.webkitAudioContext;d=new e,B=d.createGain(),B.gain.value=L.master,B.connect(d.destination),C=d.createGain(),C.gain.value=L.sfx,C.connect(B),Z=d.createGain(),Z.gain.value=L.ambience,Z.connect(B)}function Mt(){B&&B.gain.setTargetAtTime(L.master,d.currentTime,.02),C&&C.gain.setTargetAtTime(L.sfx,d.currentTime,.02),Z&&Z.gain.setTargetAtTime(L.ambience,d.currentTime,.02)}function We(e=2){const t=d.createBuffer(1,d.sampleRate*e,d.sampleRate),n=t.getChannelData(0);let o=0;for(let a=0;a<n.length;a++){const s=Math.random()*2-1;o=(o+.02*s)/1.02,n[a]=o*3.5}return t}function Gt(e,t,n,o=0){const a=d.createBufferSource();a.buffer=We(e),a.loop=!0;const s=d.createBiquadFilter();s.type="lowpass",s.frequency.value=t,s.Q.value=.6;const i=d.createGain();i.gain.value=0,i.gain.setTargetAtTime(n,d.currentTime,.4);const l=d.createStereoPanner();l.pan.value=o,a.connect(s).connect(i).connect(l).connect(C),a.start(),a.stop(d.currentTime+e+.6)}function Se(){!d||z||(z=!0,Fe())}function Pt(){if(w){try{w.lfo.stop(),w.drone.stop(),w.gain.disconnect()}catch{}w=null,z=!1}}function Fe(){if(!d||!z)return;if(w)try{w.lfo.stop(),w.drone.stop()}catch{}const e=d.createGain();e.gain.value=0;const t=d.createBufferSource();t.buffer=We(4),t.loop=!0;const n=d.createBiquadFilter();n.type="lowpass",n.frequency.value=180;const o=d.createGain();o.gain.value=.5,t.connect(n).connect(o).connect(e);const a=d.createOscillator();a.type="sine",a.frequency.value=47;const s=d.createGain();s.gain.value=.12;const i=d.createOscillator();i.type="sine",i.frequency.value=.07;const l=d.createGain();l.gain.value=.06,i.connect(l).connect(s.gain),a.connect(s).connect(e);const r=d.createOscillator();r.type="triangle",r.frequency.value=88+be*3;const c=d.createGain();c.gain.value=.018*be,r.connect(c).connect(e),t.start(),a.start(),i.start(),r.start(),e.connect(Z),e.gain.setTargetAtTime(.5,d.currentTime,2.5),w={lfo:i,drone:a,gain:e}}function se(e){if(!d)return;const t=d.currentTime,n=d.createOscillator(),o=d.createGain();n.connect(o).connect(C),o.gain.setValueAtTime(0,t);const a=e==="number"?620:e==="lin"?820:720;n.type=e==="number"?"square":"sine",n.frequency.setValueAtTime(a,t),n.frequency.setValueAtTime(a*.92,t+.09),o.gain.setValueAtTime(1e-4,t),o.gain.exponentialRampToValueAtTime(.22,t+.012),o.gain.exponentialRampToValueAtTime(1e-4,t+.22),n.start(t),n.stop(t+.25),qe(e==="number"?[18,40,12]:[10])}function I(){if(!d)return;const e=d.currentTime,t=d.createOscillator();t.type="sine",t.frequency.setValueAtTime(560,e),t.frequency.exponentialRampToValueAtTime(760,e+.07);const n=d.createGain();n.gain.setValueAtTime(1e-4,e),n.gain.exponentialRampToValueAtTime(.14,e+.01),n.gain.exponentialRampToValueAtTime(1e-4,e+.14),t.connect(n).connect(C),t.start(e),t.stop(e+.16)}function ke(){if(!d)return;const e=d.currentTime,t=d.createOscillator();t.type="sine",t.frequency.value=900+Math.random()*500;const n=d.createGain();n.gain.setValueAtTime(.035,e),n.gain.exponentialRampToValueAtTime(1e-4,e+.03),t.connect(n).connect(C),t.start(e),t.stop(e+.035)}function je(){if(!d)return;const e=[[880,0,.25],[880,.38,.25],[880,.76,.25],[1108,1.14,.35]];for(const[t,n,o]of e){const a=d.currentTime+n,s=d.createOscillator();s.type="sine",s.frequency.value=t;const i=d.createGain();i.gain.setValueAtTime(1e-4,a),i.gain.exponentialRampToValueAtTime(.2,a+.02),i.gain.exponentialRampToValueAtTime(1e-4,a+o),s.connect(i).connect(C),s.start(a),s.stop(a+o+.02)}}function X(){if(!d)return;const e=d.currentTime,t=d.createOscillator();t.type="sine",t.frequency.setValueAtTime(90,e),t.frequency.exponentialRampToValueAtTime(28,e+1.2);const n=d.createGain();n.gain.setValueAtTime(1e-4,e),n.gain.exponentialRampToValueAtTime(.6,e+.03),n.gain.exponentialRampToValueAtTime(1e-4,e+1.4),t.connect(n).connect(C),t.start(e),t.stop(e+1.5);for(const[o,a]of[[440,1],[467,1.007],[493.8,1.02],[554.4,1.04]]){const s=d.createOscillator();s.type="sawtooth",s.frequency.value=o*(a*.35+.65);const i=d.createGain();i.gain.setValueAtTime(1e-4,e),i.gain.exponentialRampToValueAtTime(.045,e+.08),i.gain.exponentialRampToValueAtTime(1e-4,e+1.8);const l=d.createBiquadFilter();l.type="lowpass",l.frequency.value=1200,s.connect(l).connect(i).connect(C),s.start(e+.01),s.stop(e+2)}Gt(2.2,800,.08,.2)}function qt(){if(!d)return;we(),D=d.createGain(),D.gain.value=0,D.connect(C);const e=n=>{const o=d.createOscillator();o.type="sine",o.frequency.setValueAtTime(65,n),o.frequency.exponentialRampToValueAtTime(38,n+.16);const a=d.createGain();a.gain.setValueAtTime(1e-4,n),a.gain.exponentialRampToValueAtTime(.5,n+.02),a.gain.exponentialRampToValueAtTime(1e-4,n+.2),o.connect(a).connect(D),o.start(n),o.stop(n+.25)},t=()=>{const n=d.currentTime;e(n),e(n+.28),oe=window.setTimeout(t,820)};t()}function we(){if(oe!==null&&(clearTimeout(oe),oe=null),D){try{D.disconnect()}catch{}D=null}}function qe(e){if(!d||!navigator.vibrate)return;const t=d.currentTime;for(let n=0;n<e.length;n++){if(n%2===0)continue;const o=t+e.slice(0,n).reduce((i,l)=>i+l,0)/1e3,a=d.createOscillator();a.type="sine",a.frequency.value=46;const s=d.createGain();s.gain.setValueAtTime(1e-4,o),s.gain.exponentialRampToValueAtTime(.3,o+.015),s.gain.exponentialRampToValueAtTime(1e-4,o+e[n]/1e3),a.connect(s).connect(C),a.start(o),a.stop(o+e[n]/1e3+.02)}if(navigator.vibrate)try{navigator.vibrate(e)}catch{}}function Vt(){if(!d)return;const e=d;if(z&&w){const t=w.gain;t.gain.setTargetAtTime(0,e.currentTime,.05),setTimeout(()=>{z&&w&&t.gain.setTargetAtTime(.5,e.currentTime,.8)},1800)}Ht()}function Ht(){if(!d)return;const e=d,t=e.currentTime+1.9;for(const[n]of[[0],[.28]]){const o=e.createOscillator();o.type="sine",o.frequency.setValueAtTime(68,t+n),o.frequency.exponentialRampToValueAtTime(40,t+n+.16);const a=e.createGain();a.gain.setValueAtTime(1e-4,t+n),a.gain.exponentialRampToValueAtTime(.4,t+n+.02),a.gain.exponentialRampToValueAtTime(1e-4,t+n+.2),o.connect(a).connect(C),o.start(t+n),o.stop(t+n+.25)}}function Te(){if(!d)return;const e=d.currentTime,t=d.createOscillator();t.type="sine",t.frequency.value=210;const n=d.createBiquadFilter();n.type="lowpass",n.frequency.value=320;const o=d.createGain();o.gain.setValueAtTime(1e-4,e),o.gain.exponentialRampToValueAtTime(.05,e+.4),o.gain.exponentialRampToValueAtTime(1e-4,e+2.2),t.connect(n).connect(o).connect(C),t.start(e),t.stop(e+2.4)}let x=!1;function ie(e,t={}){if(!("speechSynthesis"in window)){t.onEnd?.();return}x&&speechSynthesis.cancel(),x=!0;const n=new SpeechSynthesisUtterance(e);n.lang="zh-CN",n.rate=t.voice==="distorted"?.8:1,n.pitch=t.voice==="distorted"?.3:t.voice==="mom"?1.15:1,n.volume=.9;const a=speechSynthesis.getVoices().find(s=>s.lang.toLowerCase().startsWith("zh"));if(a&&(n.voice=a),n.onend=()=>{x=!1,t.onEnd?.()},n.onerror=()=>{x=!1,t.onEnd?.()},t.voice==="distorted"&&d){const s=d.createGain(),i=d.createBiquadFilter();i.type="lowpass",i.frequency.value=900,i.Q.value=1.4,s.gain.value=.6;const l=d.createMediaStreamDestination();i.connect(s).connect(l),s.connect(l),s.disconnect()}speechSynthesis.speak(n)}function Ne(){"speechSynthesis"in window&&speechSynthesis.cancel(),x=!1}const he=new Map;function j(e){for(const t of e.nodes)he.has(t.id)&&console.warn(`[narrative] 重复节点 id: ${t.id}`),he.set(t.id,t)}function ve(e){return he.get(e)}async function Ue(e,t){if(!e)return!1;let n=null;for(const o of e){let a,s;if(o.startsWith("photo:open:"))a="photo:open",s=o.slice(11);else{const i=o.indexOf(":");a=i<0?o:o.slice(0,i),s=i<0?"":o.slice(i+1)}switch(a){case"call":n={op:"call",arg:s};break;case"screen":n={op:"screen",arg:s};break;case"card":await t.card(Number(s));break;case"typing":await t.typing();break;case"sfx":t.sfx(s);break;case"sting":t.sting();break;case"stinglong":t.stinglong();break;case"glitch":t.glitch(s?Number(s):void 0);break;case"noise":t.noise(s==="on"||s==="1");break;case"shake":t.shake(s?Number(s):void 0);break;case"time":t.time(s?Number(s):1);break;case"chapter":t.chapter(Number(s));break;case"photo":t.photo(s);break;case"photo:open":t.photoOpen(s);break;case"note":t.note(s);break;case"contact":t.contact(s);break;case"calllog":t.calllog(s);break;case"banner":t.banner(s);break;case"flag":t.flag(s);break;case"count":t.count(s);break;case"heart":t.heart(s==="on");break;case"ambient":t.ambient(s==="on"||s==="1");break;case"noteopen":t.noteopen(s);break;case"drafts":t.drafts();break;case"flicker":t.flicker(s?Number(s):void 0);break;case"msgrevoke":t.revoke();break;case"wallchange":t.wallChange(s!=="off");break;case"silence":t.silenceDrop();break;case"presence":t.presence();break;case"voice":t.voice(s);break}}return n?(n.op==="call"?t.call(n.arg):t.screen(n.arg),!0):!1}const Ye={confess:{id:"confess",title:"自首",kind:"true",unlocksNext:!0,text:`凌晨三点，你坐在派出所门口的长椅上，手机亮着。

那一串号码安静了很久。你看着它，第一次觉得它像一面镜子。

你把它翻了个面，走进大厅。


几个月后，你收到一条短信，来自你换掉的那个旧号码。

只有两个字——

「晚安。」

你盯着看了很久。你知道那条短信不是你发的。

你点了已读，然后没有回。`},therapy:{id:"therapy",title:"面对",kind:"good",unlocksNext:!0,text:`你删掉了那个号码，把所有记录清空，然后拨通了陈医生的电话。

那是你一年来第一次完整地讲出那晚的事。

窗外的雨下了一夜。医生听完，沉默了很久，只说了一句：

「你没有删掉他。你只是愿意开始照顾他了。」

从那天起，手机里的未读，终于一条一条变少了。

你偶尔还是会想起那串号码。但你不再怕它了。`},loop:{id:"loop",title:"循环",kind:"bad",unlocksNext:!0,text:`你拉黑了那个号码，删除了所有记录，把手机恢复出厂设置。

干净了。

一切都像什么都没发生过。

你在新手机里重新下载了备忘录，第一条写着：

「别想太多。」

第二天夜里，00:00，屏幕亮起。

一条新短信，来自一个陌生的号码：

「还没睡？」

你的手指悬在屏幕上方，很久。

（游戏并未结束。你可以再玩一次。）`},merge:{id:"merge",title:"我们",kind:"hidden",unlocksNext:!0,text:`你没有删掉他。

你坐在地板上，一条一条地读着过去一年的定时短信，像读一本你写过却忘掉的书。

读到最后一条草稿，你忽然懂了：他不是要伤害你。

他只是那晚被你锁在手机里、替你记得一切的另一个你。

你打出最后一句话，按下了发送。

「我原谅你了。」

这一次，草稿箱空了。

房间的灯亮了。有人在看窗外，终于不再是一个人。`},silence:{id:"silence",title:"沉默",kind:"silence",unlocksNext:!0,text:`你没有回任何一条消息。

一开始，号码还等。后来，它开始发得越来越少。

第七天，它只发来四个字：

「你不在了。」

之后，它再也没有出现过。

你赢了。你让那个半夜想跟你说话的东西，死在了没有人回应的沉默里。

你保存了所有记录，时常翻看，像翻看一封永远没有寄出的信。

有一天你会后悔的。但不是今天。`},awakening:{id:"awakening",title:"晨光",kind:"hidden",unlocksNext:!0,text:`这一次，你走完了所有的路。

你拉黑过他，你也原谅过他。你把他交给过医生，也把他带去过派出所。

午夜来讯的每一个结局，你都亲手写过。

号码在最后一晚问你：「这一次，你想怎么对我？」

你说：「我想记得你。也想记得那场雨。」

屏幕暗下去，没有再亮。

清晨六点，你睡醒。手机安安静静躺在枕边。

未读消息：0。

你没有再收到任何短信。

因为那个每天 00:00 提醒你的人，终于放心地离开了。

——END——

（谢谢你，王斌。）`}};function Ze(e){return Ye[e]}function le(){return Object.values(Ye)}function It(e,t){if(t.newGamePlus&&t.allBaseUnlocked&&e.truth>=3&&e.care>=3)return"awakening";if(e.silent>=4)return"silence";if(e.avoid>=4&&e.truth<=2)return"loop";if(e.care>=5&&e.truth>=4)return"merge";if(e.help>=4&&e.truth>=2)return"therapy";if(e.truth>=4)return"confess";switch(["truth","help","care","avoid","silent"].reduce((a,s)=>e[s]>e[a]?s:a,"truth")){case"help":return"therapy";case"care":return e.care>=3?"merge":"confess";case"avoid":return"loop";case"silent":return"silence";default:return"confess"}}function $t(){return document.getElementById("app")}const S={redFlash(e=500){const t=document.createElement("div");t.className="fx-flash",t.style.animationDuration=`${e}ms`,$t().appendChild(t),t.addEventListener("animationend",()=>t.remove())},glitch(e=400){const t=document.querySelector(".phone-screen");t&&(t.classList.add("fx-glitch"),window.setTimeout(()=>t.classList.remove("fx-glitch"),e))},shake(e=300){const t=document.querySelector(".phone");t&&(t.classList.add("fx-shake"),window.setTimeout(()=>t.classList.remove("fx-shake"),e))},setNoise(e){const t=document.querySelector(".fx-noise");t&&(t.style.opacity=e?"1":"0")},setRedTint(e){const t=document.querySelector(".fx-tint");t&&(t.style.opacity=e?"1":"0")}};class ye{constructor(t,n,o={}){this.idx=0,this.timer=null,this.done=!1,this.el=t,this.text=n,this.opts=o,this.el.textContent="",this.clickHandler=()=>this.skip(),this.el.addEventListener("click",this.clickHandler),this.type()}type(){if(this.idx>=this.text.length){this.finish();return}const t=this.text[this.idx];this.el.textContent+=t,this.idx++,this.opts.audio&&!this.isPunct(t)&&ke();let n=this.opts.speed??34;this.isLongPunct(t)?n=520:this.isPunct(t)&&(n=260),this.timer=window.setTimeout(()=>this.type(),n)}isPunct(t){return/[，。！？、；：……"”】—…\s]/.test(t)}isLongPunct(t){return/[。！？……—]/.test(t)}skip(){this.timer&&clearTimeout(this.timer),this.done||(this.el.textContent=this.text,this.idx=this.text.length,this.finish())}finish(){this.done||(this.done=!0,this.timer&&clearTimeout(this.timer),this.el.removeEventListener("click",this.clickHandler),this.opts.onDone?.())}isDone(){return this.done}destroy(){this.timer&&clearTimeout(this.timer),this.el.removeEventListener("click",this.clickHandler)}}const Bt={p_home:"city",p_lin_cake:"cake",p_lin_window:"window",p_hallway:"hallway",p_hallway_orig:"hallway_orig",p_crash:"accident",p_room:"room",p_nightout:"city",p_wall:"wallpaper",p_333:"anomaly"};function Dt(e){return Bt[e]??"city"}function A(e,t,n,o){const a=e.createLinearGradient(0,0,0,n);for(const[s,i]of o)a.addColorStop(s,i);e.fillStyle=a,e.fillRect(0,0,t,n)}function h(e,t,n,o,a,s=1){const i=e.createRadialGradient(t,n,0,t,n,o);i.addColorStop(0,a),i.addColorStop(1,a.replace(/[\d.]+\)$/,"0)")),e.globalAlpha=s,e.fillStyle=i,e.beginPath(),e.arc(t,n,o,0,Math.PI*2),e.fill(),e.globalAlpha=1}function Ot(e,t,n,o,a,s,i){for(let l=0;l<o;l++){const r=Math.random()*t,c=Math.random()*n,u=s+Math.random()*(i-s);h(e,r,c,u,a,.25+Math.random()*.3)}}function zt(e,t,n,o=.32){for(let a=0;a<t*n*.03;a++)e.fillStyle=`rgba(255,255,255,${Math.random()*o*.06})`,e.fillRect(Math.random()*t,Math.random()*n,1.1,1.1),e.fillStyle=`rgba(0,0,0,${Math.random()*o*.06})`,e.fillRect(Math.random()*t,Math.random()*n,1.1,1.1)}function Wt(e,t,n,o=.5){const a=e.createRadialGradient(t/2,n/2,n*.3,t/2,n/2,n*.95);a.addColorStop(0,"rgba(0,0,0,0)"),a.addColorStop(1,`rgba(0,0,0,${o})`),e.fillStyle=a,e.fillRect(0,0,t,n)}function W(e,t,n,o,a){e.fillStyle=o,e.globalAlpha=a,e.fillRect(0,0,t,n),e.globalAlpha=1}function Le(e,t,n,o,a,s,i){e.globalAlpha=.14,e.fillStyle=i,e.beginPath(),e.ellipse(o,a,s,4,.25,0,Math.PI*2),e.fill(),e.globalAlpha=1}function Ft(e,t,n){A(e,t,n,[[0,"#241a20"],[.6,"#19131a"],[1,"#0d0a10"]]);const o=t*.62,a=n*.12,s=t*.3,i=n*.4;A(e,0,0,[[0,"#0a0e1a"],[1,"#0a0e1a"]]),e.fillStyle="#0b1020",e.fillRect(o-10,a-10,s+20,i+20);const l=e.createRadialGradient(o+s*.4,a+i*.35,2,o+s*.4,a+i*.35,30);l.addColorStop(0,"rgba(200,215,240,0.9)"),l.addColorStop(1,"rgba(160,175,210,0)"),e.fillStyle=l,e.fillRect(o-20,a-20,s+40,i+40),e.strokeStyle="#0b1020",e.lineWidth=6,e.strokeRect(o,a,s,i),e.beginPath(),e.moveTo(o+s/2,a),e.lineTo(o+s/2,a+i),e.stroke();const r=t*.34,c=n*.6;h(e,r,c-30,130,"rgba(255,190,120,0.5)",.8),h(e,r,c-30,60,"rgba(255,220,160,0.5)",.9);for(let v=-2;v<=2;v++){const M=r+v*11;e.fillStyle="rgba(255,244,225,0.95)",e.fillRect(M-1.2,c-52,2.4,9),h(e,M,c-58,16,"rgba(255,210,130,0.85)")}const u=e.createLinearGradient(0,c-44,0,c+8);u.addColorStop(0,"#b07058"),u.addColorStop(1,"#7c4638"),e.fillStyle=u,e.beginPath(),e.moveTo(r-40,c-44),e.lineTo(r+40,c-44),e.lineTo(r+40,c),e.lineTo(r-40,c),e.closePath(),e.fill(),e.fillStyle="rgba(255,255,255,0.85)",e.fillRect(r-40,c-4,80,5);const f=e.createLinearGradient(0,c,0,n);f.addColorStop(0,"#1c1418"),f.addColorStop(1,"#0e0a0d"),e.fillStyle=f,e.fillRect(0,c,t,n-c),e.fillStyle="rgba(20,14,16,0.9)",e.fillRect(t*.78,c+6,54,5),e.fillRect(t*.13,c+12,40,4),Ot(e,t,n,26,"rgba(255,180,110,0.5)",3,14),W(e,t,n,"rgba(255,150,90,0.06)",1),Le(e,t,n,r,c-40,90,"rgba(255,200,140,0.5)")}function jt(e,t,n){A(e,t,n,[[0,"#0d1526"],[.55,"#16233a"],[1,"#0c1120"]]);const o=t*.1,a=n*.08,s=t*.8,i=n*.62,l=e.createLinearGradient(0,a,0,a+i);l.addColorStop(0,"rgba(235,238,246,0.95)"),l.addColorStop(.5,"rgba(205,214,232,0.85)"),l.addColorStop(1,"rgba(150,166,196,0.6)"),e.fillStyle=l,e.fillRect(o,a,s,i),e.globalAlpha=.5,e.fillStyle="rgba(255,255,255,0.5)";for(let c=0;c<12;c++){const u=o+Math.random()*s,f=a+Math.random()*i*.8;e.beginPath(),e.ellipse(u,f,60+Math.random()*90,16+Math.random()*12,0,0,Math.PI*2),e.fill()}e.globalAlpha=1,e.fillStyle="#0a0e1a",e.fillRect(o-14,a-14,s+28,i+28),e.fillStyle="#0c1120",e.fillRect(o,a,s,i);const r=e.createLinearGradient(0,a,0,a+i);r.addColorStop(0,"rgba(235,238,246,0.95)"),r.addColorStop(1,"rgba(160,176,206,0.7)"),e.fillStyle=r,e.fillRect(o,a,s,i),e.strokeStyle="#0c1120",e.lineWidth=10,e.strokeRect(o,a,s,i),e.beginPath(),e.moveTo(t/2,a),e.lineTo(t/2,a+i),e.moveTo(o,a+i/2),e.lineTo(o+s,a+i/2),e.stroke(),h(e,t*.5,a+i*.5,120,"rgba(230,235,245,0.5)",.6),e.fillStyle="#0a0d18",e.beginPath(),e.arc(t*.5,a+i-2,30,0,Math.PI*2),e.fill(),e.beginPath(),e.moveTo(t*.5-44,a+i+6),e.quadraticCurveTo(t*.5,a+i-40,t*.5+44,a+i+6),e.closePath(),e.fill(),e.fillStyle="#0a0d18",e.fillRect(0,a+i,t,n-(a+i)),e.fillStyle="#131a2c",e.fillRect(o-20,a+i,s+40,10)}function Ve(e,t,n){A(e,t,n,[[0,"#0a1220"],[.6,"#101a2e"],[1,"#0d1526"]]),h(e,t*.74,n*.2,40,"rgba(220,230,250,0.7)"),h(e,t*.74,n*.2,14,"rgba(240,245,255,0.95)"),e.fillStyle="#0b1322";let o=-10;for(;o<t;){const s=26+Math.random()*46,i=n*(.12+Math.random()*.2);e.fillRect(o,n*.68-i,s,i+n*.32),o+=s+1}e.fillStyle="#0e1728";let a=n*.6;for(;o>-t;){const s=18+Math.random()*30;e.fillRect(o-s,a,s,n-a),o-=s+1}e.fillStyle="rgba(255,214,150,0.55)";for(let s=0;s<80;s++){const i=Math.random()*t,l=n*.3+Math.random()*n*.36;e.fillRect(i,l,2,3)}e.fillStyle="rgba(160,180,215,0.4)";for(let s=0;s<40;s++)e.fillRect(Math.random()*t,Math.random()*n*.3,2,3);for(let s=0;s<14;s++)h(e,Math.random()*t,n*.3+Math.random()*n*.4,3+Math.random()*5,"rgba(255,200,120,0.4)");e.strokeStyle="rgba(180,200,230,0.12)",e.lineWidth=1;for(let s=0;s<40;s++){const i=Math.random()*t,l=Math.random()*n;e.beginPath(),e.moveTo(i,l),e.lineTo(i-3,l+12),e.stroke()}W(e,t,n,"rgba(120,160,230,0.05)",1),Le(e,t,n,t*.74,n*.2,120,"rgba(210,225,250,0.4)")}function Ut(e,t,n){A(e,t,n,[[0,"#0a0e18"],[1,"#080b12"]]);const o=t*.5,a=n*.34,s=e.createLinearGradient(0,0,0,a);s.addColorStop(0,"#0b0f1a"),s.addColorStop(1,"#0a0d16"),e.fillStyle=s,e.fillRect(0,0,t,a);const i=e.createLinearGradient(0,a,0,n);i.addColorStop(0,"#101524"),i.addColorStop(.6,"#0d111c"),i.addColorStop(1,"#0a0d14"),e.fillStyle=i,e.fillRect(0,a,t,n-a),e.strokeStyle="rgba(150,165,200,0.08)",e.lineWidth=1;for(let c=0;c<10;c++)e.beginPath(),e.moveTo(c*(t/10),n),e.lineTo(o,a),e.stroke();e.strokeStyle="rgba(150,165,200,0.05)",e.beginPath(),e.moveTo(0,a),e.lineTo(t,a),e.stroke(),h(e,o,a+14,56,"rgba(200,210,235,0.4)"),h(e,o,a,26,"rgba(220,228,248,0.55)"),e.fillStyle="rgba(215,223,245,0.6)",e.fillRect(o-1.5,a-52,3,72),e.fillStyle="rgba(150,160,190,0.1)",e.fillRect(o-22,a-42,44,64),e.fillStyle="rgba(215,223,245,0.35)",e.fillRect(o-5,a-42,7,64),e.strokeStyle="rgba(170,180,205,0.2)",e.lineWidth=2,e.strokeRect(o-22,a-42,44,64),e.fillStyle="rgba(190,200,225,0.3)",e.fillRect(o+10,a-8,3,9),e.fillStyle="rgba(5,6,10,0.85)",e.beginPath(),e.arc(o+2,a+18,7,0,Math.PI*2),e.fill(),e.fillRect(o-4,a+20,13,34);const l=e.createLinearGradient(0,0,t*.18,0);l.addColorStop(0,"rgba(0,0,0,0.45)"),l.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=l,e.fillRect(0,0,t*.18,n);const r=e.createLinearGradient(t,0,t*.82,0);r.addColorStop(0,"rgba(0,0,0,0.45)"),r.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=r,e.fillRect(t*.82,0,t*.18,n),e.fillStyle="rgba(10,12,18,0.7)",e.fillRect(0,a*.92,t*.13,n),e.fillRect(t*.87,a*.92,t*.13,n),e.fillStyle="rgba(0,0,0,0.5)",e.beginPath(),e.moveTo(0,a),e.lineTo(t*.1,a*.75),e.lineTo(t*.16,a),e.closePath(),e.fill();for(let c=1;c<6;c++){const u=o+(o-t*.2)*c*.09,f=a-(a-0)*c*.09;h(e,u,f,5,"rgba(160,170,200,0.2)")}W(e,t,n,"rgba(60,90,160,0.04)",1)}function Yt(e,t,n){A(e,t,n,[[0,"#05070d"],[1,"#0a0e18"]]),e.fillStyle="#0a0d15",e.fillRect(0,n*.58,t,n*.42);const o=e.createLinearGradient(0,n*.6,0,n);o.addColorStop(0,"rgba(20,26,40,0.9)"),o.addColorStop(1,"rgba(8,10,16,0.9)"),e.fillStyle=o,e.fillRect(0,n*.6,t,n*.4),h(e,t*.2,n*.52,5,"rgba(255,210,150,0.5)"),h(e,t*.3,n*.5,4,"rgba(255,210,150,0.4)"),h(e,t*.82,n*.53,6,"rgba(255,190,120,0.5)"),e.fillStyle="#0c111c",e.save(),e.translate(t*.62,n*.6),e.rotate(.16),e.fillRect(-70,-30,150,46),e.fillRect(-30,-30,40,-24),e.restore(),h(e,t*.55,n*.55,26,"rgba(255,120,90,0.5)"),h(e,t*.55,n*.55,8,"rgba(255,160,120,0.7)");const a=e.createLinearGradient(0,n*.6,0,n*.8);a.addColorStop(0,"rgba(200,60,50,0.25)"),a.addColorStop(1,"rgba(200,60,50,0)"),e.fillStyle=a,e.fillRect(t*.3,n*.6,t*.4,n*.2),h(e,t*.88,n*.5,18,"rgba(255,120,110,0.4)"),h(e,t*.88,n*.5,8,"rgba(140,160,255,0.4)"),e.strokeStyle="rgba(190,210,235,0.15)",e.lineWidth=1;for(let s=0;s<70;s++){const i=Math.random()*t,l=Math.random()*n;e.beginPath(),e.moveTo(i,l),e.lineTo(i-4,l+16),e.stroke()}W(e,t,n,"rgba(120,60,70,0.06)",1)}function Zt(e,t,n){A(e,t,n,[[0,"#0b0f18"],[1,"#0d111a"]]),e.fillStyle="#0b0f18",e.fillRect(0,0,t,n*.72);const o=e.createLinearGradient(0,n*.72,0,n);o.addColorStop(0,"#10141e"),o.addColorStop(1,"#0a0d14"),e.fillStyle=o,e.fillRect(0,n*.72,t,n*.28),e.strokeStyle="rgba(150,165,195,0.06)";for(let u=0;u<6;u++)e.beginPath(),e.moveTo(0,n*.72+u*n*.28/6),e.lineTo(t,n*.72+u*n*.28/6),e.stroke();const a=t*.32,s=n*.16,i=t*.36,l=n*.4;h(e,a+i/2,s+l/2,i,"rgba(180,195,230,0.5)");const r=e.createLinearGradient(0,s,0,s+l);r.addColorStop(0,"rgba(200,212,238,0.85)"),r.addColorStop(1,"rgba(150,168,205,0.7)"),e.fillStyle=r,e.fillRect(a,s,i,l),e.strokeStyle="#0b0f18",e.lineWidth=5,e.strokeRect(a,s,i,l),e.beginPath(),e.moveTo(a+i/2,s),e.lineTo(a+i/2,s+l),e.moveTo(a,s+l/2),e.lineTo(a+i,s+l/2),e.stroke();const c=e.createLinearGradient(a,s,a+80,n);c.addColorStop(0,"rgba(200,212,238,0.16)"),c.addColorStop(1,"rgba(200,212,238,0.02)"),e.fillStyle=c,e.beginPath(),e.moveTo(a,s+l),e.lineTo(a+i,s+l),e.lineTo(a+i+90,n),e.lineTo(a-40,n),e.closePath(),e.fill(),e.fillStyle="rgba(0,0,0,0.5)",e.beginPath(),e.ellipse(t*.58,n*.86,34,9,0,0,Math.PI*2),e.fill(),e.fillStyle="rgba(16,20,28,0.9)",e.fillRect(t*.14,n*.6,4,n*.16),e.fillRect(t*.14+16,n*.6,4,n*.16),e.fillRect(t*.1,n*.6,24,4),e.fillRect(t*.12,n*.47,3,n*.13),W(e,t,n,"rgba(120,150,210,0.04)",1)}function Xt(e,t,n){A(e,t,n,[[0,"#0e1320"],[1,"#0b0f18"]]);const o=t*.5,a=n*.36,s=e.createLinearGradient(0,0,0,a);s.addColorStop(0,"#101525"),s.addColorStop(1,"#0d121e"),e.fillStyle=s,e.fillRect(0,0,t,a);const i=e.createLinearGradient(0,a,0,n);i.addColorStop(0,"#121828"),i.addColorStop(1,"#0c101a"),e.fillStyle=i,e.fillRect(0,a,t,n-a),e.strokeStyle="rgba(160,175,210,0.09)",e.lineWidth=1;for(let l=0;l<10;l++)e.beginPath(),e.moveTo(l*(t/10),n),e.lineTo(o,a),e.stroke();h(e,o,a+10,22,"rgba(160,172,200,0.12)"),e.fillStyle="rgba(150,162,190,0.14)",e.fillRect(o-22,a-42,44,64),e.strokeStyle="rgba(170,182,210,0.22)",e.lineWidth=2,e.strokeRect(o-22,a-42,44,64),e.fillStyle="rgba(180,192,220,0.3)",e.fillRect(o+10,a-8,3,9),e.fillStyle="rgba(12,15,24,0.7)",e.fillRect(0,a*.92,t*.13,n),e.fillRect(t*.87,a*.92,t*.13,n),W(e,t,n,"rgba(80,110,180,0.03)",1)}function Jt(e,t,n){A(e,t,n,[[0,"#080a10"],[1,"#0a0d14"]]),e.fillStyle="#090b12",e.fillRect(0,0,t,n*.7);const o=e.createLinearGradient(0,n*.7,0,n);o.addColorStop(0,"#0e121c"),o.addColorStop(1,"#080a10"),e.fillStyle=o,e.fillRect(0,n*.7,t,n*.3);const a=t*.3,s=n*.14,i=t*.4,l=n*.36;h(e,a+i/2,s+l/2,i*.8,"rgba(160,175,210,0.5)");const r=e.createLinearGradient(0,s,0,s+l);r.addColorStop(0,"rgba(150,165,200,0.5)"),r.addColorStop(1,"rgba(110,130,175,0.35)"),e.fillStyle=r,e.fillRect(a,s,i,l),e.strokeStyle="#090b12",e.lineWidth=5,e.strokeRect(a,s,i,l),e.beginPath(),e.moveTo(a+i/2,s),e.lineTo(a+i/2,s+l),e.stroke(),e.fillStyle="rgba(5,6,9,0.95)",e.beginPath(),e.arc(a+i/2,s+l-4,13,0,Math.PI*2),e.fill(),e.beginPath(),e.moveTo(a+i/2-20,s+l+2),e.quadraticCurveTo(a+i/2,s+l-22,a+i/2+20,s+l+2),e.closePath(),e.fill(),e.fillStyle="rgba(170,185,215,0.25)",e.fillRect(t*.24,n*.5,14,20),e.fillRect(t*.235,n*.47,17,4),e.fillStyle="rgba(0,0,0,0.5)",e.beginPath(),e.moveTo(a+i/2,s+l),e.lineTo(a+i/2+80,n),e.lineTo(a+i/2-10,n),e.closePath(),e.fill(),W(e,t,n,"rgba(90,110,170,0.06)",1)}function Kt(e,t,n){A(e,t,n,[[0,"#05070d"],[1,"#0a0f1a"]]);for(let a=0;a<220;a++)e.fillStyle=`rgba(190,205,235,${.02+Math.random()*.05})`,e.fillRect(Math.random()*t,Math.random()*n,1.3,1.3);const o=e.createRadialGradient(t/2,n/2,10,t/2,n/2,n*.6);o.addColorStop(0,"rgba(110,168,255,0.06)"),o.addColorStop(1,"rgba(110,168,255,0)"),e.fillStyle=o,e.fillRect(0,0,t,n),Le(e,t,n,t*.5,n*.4,200,"rgba(150,180,230,0.12)")}function Qt(e,t,n,o){switch(e){case"cake":Ft(t,n,o);break;case"window":jt(t,n,o);break;case"city":Ve(t,n,o);break;case"hallway":Ut(t,n,o);break;case"hallway_orig":Xt(t,n,o);break;case"anomaly":Jt(t,n,o);break;case"accident":Yt(t,n,o);break;case"room":Zt(t,n,o);break;case"wallpaper":Kt(t,n,o);break;default:Ve(t,n,o)}}function ce(e,t){const n=document.createElement("div");if(n.className="art-photo",t){const o=new Image;o.src=t,o.alt="",o.className="art-photo-img",o.onload=()=>{n.classList.add("art-loaded")},o.onerror=()=>{n.replaceChildren(ue(e))},n.appendChild(o);const a=ue(e);return n.appendChild(a),o.onload=()=>{n.querySelector(".art-proc")?.remove()},n}return n.appendChild(ue(e)),n}function ue(e){const t=document.createElement("canvas");t.className="art-proc";const n=800,o=600;t.width=n,t.height=o;const a=t.getContext("2d");return Qt(Dt(e),a,n,o),zt(a,n,o,.3),Wt(a,n,o,.45),t}const xt=[{id:"p_home",title:"壁纸",date:"2026-08-01",caption:"随手拍的夜晚",real:"assets/photos/p_home.jpg"},{id:"p_lin_cake",title:"她的生日",date:"2025-04-18",caption:"四月。那天她吹蜡烛前说，下辈子还要一起过生日。",real:"assets/photos/p_lin_cake.jpg"},{id:"p_lin_window",title:"窗边",date:"2025-06-02",caption:"她说看云能减压，我不信，跟着她看了一下午。",real:"assets/photos/p_lin_window.jpg"},{id:"p_nightout",title:"那晚",date:"2025-11-06",caption:"聚餐。她说雨大，让我别开车……",real:"assets/photos/p_nightout.jpg"},{id:"p_hallway",title:"它发来的照片",date:"现在",caption:"……门缝里，好像有人。",real:"assets/photos/p_hallway.jpg",pair:"p_hallway_orig",diffZone:[.44,.28,.6,.42]},{id:"p_hallway_orig",title:"走廊",date:"去年 11 月 5 日",caption:"这张才是你自己拍的。那天走廊很干净。",real:"assets/photos/p_hallway_orig.jpg"},{id:"p_crash",title:"现场",date:"2025-11-06 23:41",caption:"新闻截图。雨夜，一辆车冲下护栏。",real:"assets/photos/p_crash.jpg"},{id:"p_room",title:"空房间",date:"2025-11-07",caption:"收拾东西那天拍的。她不在，房间就空了。",real:"assets/photos/p_room.jpg",shifting:!0},{id:"p_333",title:"？",date:"？？？？",caption:"这张照片，你从来没有拍过。",real:"assets/photos/p_333.jpg"}],en=[{id:"n_onboarding",title:"待办",date:"2026-08-10",body:`· 给妈妈回电话
· 交水电费
· 买洗衣液
· 明天上午开会
· 别想太多`},{id:"n_lin_remind",title:"备忘",date:"2025-11-06",body:`· 晚上给她回电话
· 她说要给我看个东西
· 别忘了，她容易生气
· 九点前到家`},{id:"n_lin_draft",title:"未发送的草稿",date:"2025-11-07 00:12",body:`我错了。

对不起。

如果那天我没碰手机……`},{id:"n_dinner",title:"—",date:"2025-06-02",body:"她说想吃那家川菜。6 月 7 号去。"},{id:"n_secret",title:"—",date:"2025-04-18",body:`4.18

是我们的日子。
她让我别忘。
我不会忘。`,secret:"……她说：如果你有一天不在了，也要替她，好好活下去。"},{id:"n_zhou",title:"—",date:"2026-08-10",body:"周凯：周六出来喝酒，哥几个都到。别一个人闷着。"},{id:"n_wrong",title:"？？",date:"????",body:`别信手机。

它不是你。
它在骗你。
别信手机。别信手机。别信手机。`,glitched:!0},{id:"n_right",title:"？",date:"????",body:`别信自己。

你忘了很多事。
记得开车那晚吗。
你手机里，真的有那么多未读吗。`,glitched:!0}],tn=[{id:"c_zhou_1",who:"周凯",when:"2026-08-10 21:03",dir:"in",dur:"12:47"},{id:"c_mom_1",who:"妈妈",when:"2026-08-09 19:52",dir:"missed",dur:"—"},{id:"c_self",who:"未知号码",when:"2026-08-11 00:04",dir:"out",dur:"00:03"},{id:"c_lin_1",who:"林晚",when:"2025-11-06 23:38",dir:"in",dur:"00:31"},{id:"c_lin_last",who:"林晚",when:"2025-11-06 23:41",dir:"missed",dur:"—"}];function Re(e){return xt.find(t=>t.id===e)}function Xe(e){return en.find(t=>t.id===e)}const nn={1:{no:"壹",title:"第一夜"},2:{no:"贰",title:"第二夜"},3:{no:"叁",title:"第三夜"},4:{no:"肆",title:"真相"},5:{no:"伍",title:"最后一夜"}};let P=null,R=null,H=null,V=null,te=[],q=!1;function Je(){te=[]}function an(e){e.innerHTML="",P=document.createElement("div"),P.className="scroll-area";const t=document.createElement("div");t.className="chat-top",t.innerHTML='<span class="chat-top-label">以下与「未知号码」的对话 · 仅你可见</span>',P.appendChild(t),R=document.createElement("div"),R.className="msg-list",P.appendChild(R),H=document.createElement("div"),H.className="typing-indicator",H.innerHTML='<span></span><span></span><span></span><span class="typing-txt">对方正在输入…</span>',H.style.display="none",P.appendChild(H),e.appendChild(P),V=document.createElement("div"),V.className="choices-area",e.appendChild(V)}function on(){if(!R)return;R.innerHTML="";for(const t of te){const n=ve(t.nodeId);n&&t.asBubble&&ln(t.nodeId,n.speaker??"narration",t.label??n.text)}ae();const e=ve(y().currentNode);e?.choices?.length&&!q&&Qe(e.choices)}function ae(){P&&(P.scrollTop=P.scrollHeight)}async function K(e){if(q)return;const t=ve(e);if(!t){console.error(`[ui] 节点不存在: ${e}`);return}if(q=!0,xe(),Ct(e),$e(),t.chapterCard&&await nt(t.chapterCard.no),await Ue(t.effects,lt)){q=!1;return}if(t.speaker&&t.text&&await sn(t),t.end){q=!1,hn(t.end);return}if(t.next){const o=t.next;q=!1,window.setTimeout(()=>void K(o),420);return}t.choices?.length&&Qe(t.choices),q=!1}async function sn(e){const t=e.speaker??"narration",n=De(e.text);t==="number"&&Et(),await cn(e.id,t,n),k.updateStatus()}function ln(e,t,n){const o=Ae(t,n);R.appendChild(o)}function cn(e,t,n){return new Promise(o=>{t==="wang"&&I();const a=Ae(t,n);R.appendChild(a),te.push({nodeId:e,asBubble:!0});const s=a.querySelector(".bubble-text");t==="narration"?new ye(s,n,{speed:20,audio:!1,onDone:()=>setTimeout(o,120)}):t==="system"?(s.textContent=n,setTimeout(o,200)):new ye(s,n,{speed:30,audio:t!=="wang",onDone:()=>setTimeout(o,160)}),dn()})}function Ae(e,t){const n=document.createElement("div");if(n.className="msg-row "+Ke(e),e==="narration"||e==="system"){const i=document.createElement("div");i.className=e==="narration"?"narration":"system-note";const l=document.createElement("div");return l.className="bubble-text",l.textContent=t,i.appendChild(l),n.appendChild(i),n}const o=document.createElement("div");o.className="bubble bubble-"+e,e==="number"&&o.classList.add("bubble-mono");const a=document.createElement("div");a.className="bubble-text",a.textContent=t,o.appendChild(a);const s=document.createElement("div");return s.className="bubble-time",s.textContent=rn(),o.appendChild(s),n.appendChild(o),n}function Ke(e){return`msg-${e}`}function rn(){const{time:e}=y();return`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`}let me=!1;function dn(){me||(me=!0,requestAnimationFrame(()=>{ae(),me=!1}))}function Qe(e){if(!V)return;V.innerHTML="";let t=0;for(const n of e){if(!Lt(n.cond))continue;t++;const o=document.createElement("button");o.className="choice-btn",o.textContent=n.label,o.addEventListener("click",()=>{q||un(n)}),V.appendChild(o)}if(t===0){const n=document.createElement("div");n.className="system-note",n.textContent="……",V.appendChild(n)}}async function un(e){if(q)return;for(const[a,s]of Object.entries(e.flags??{}))Y(a,s);xe();let t=!1;if(e.effect&&(t=await Ue(e.effect,lt)),t)return;const n=e.label.startsWith("*"),o=n?e.label.slice(1):e.label;if(o.trim()){if(!n){const s=Ae("wang",o);R.appendChild(s),I(),te.push({nodeId:e.go,asBubble:!0,label:o});const i=s.querySelector(".bubble-text");i.textContent=o}else{const s=document.createElement("div");s.className="msg-row msg-system";const i=document.createElement("div");i.className="system-note",i.textContent=o,s.appendChild(i),R.appendChild(s),te.push({nodeId:e.go,asBubble:!1})}ae()}await K(e.go)}function xe(){V&&(V.innerHTML="")}async function mn(){H&&(H.style.display="flex",ae(),await new Promise(e=>setTimeout(e,1400)),H.style.display="none")}function et(e){let t=document.querySelector(".fx-banner");t||(t=document.createElement("div"),t.className="fx-banner",document.getElementById("app")?.appendChild(t)),t.textContent=e,t.classList.remove("show"),t.offsetWidth,t.classList.add("show"),window.setTimeout(()=>t.classList.remove("show"),2600)}function tt(e){return new Promise(t=>{const n=Re(e);if(!n){t();return}if(n.pair&&n.diffZone){fn(n,t);return}ke();const o=document.getElementById("app"),a=document.createElement("div");a.className="photo-viewer";const s=document.createElement("div");s.className="photo-frame",s.appendChild(ce(e,n.real));let i=n.caption;if(e==="p_room"){const u=y().roomViewed;u>=3?i="你数了三遍。房间里没有人。可你知道，你看见了什么。":u===2&&(i="……窗边，好像站了个人？"),u>=2&&Te()}const l=document.createElement("div");l.className="photo-cap"+(e==="p_room"&&y().roomViewed>=2?" shifting":""),l.innerHTML=`<b>${n.title}</b> · ${n.date}<br><span>${i}</span>`,s.appendChild(l);const r=document.createElement("button");r.className="photo-close",r.textContent="关闭",a.appendChild(s),a.appendChild(r),o.appendChild(a);const c=()=>{a.classList.add("out"),setTimeout(()=>{a.remove(),t()},260)};r.addEventListener("click",c),a.addEventListener("click",u=>{u.target===a&&c()})})}function fn(e,t){const n=Re(e.pair),o=document.getElementById("app"),a=document.createElement("div");a.className="photo-viewer diff-viewer",a.innerHTML='<div class="diff-head">这张照片，和你相册里的<u>不太一样</u>。找出不同的地方。</div>';const s=document.createElement("div");s.className="photo-frame diff-frame";const i=document.createElement("div");i.className="diff-holder",i.appendChild(ce(e.id,e.real)),s.appendChild(i);const l=document.createElement("div");l.className="diff-bar";const r=document.createElement("button");r.className="diff-toggle",r.textContent="对照原图",l.appendChild(r),s.appendChild(l);const c=document.createElement("div");c.className="diff-hint",c.textContent="仔细看门缝那边。",s.appendChild(c),a.appendChild(s);const u=document.createElement("button");u.className="photo-close",u.textContent="关闭",a.appendChild(u),o.appendChild(a);let f=!1;const v=()=>{a.classList.add("out"),setTimeout(()=>{a.remove(),t()},260)},M=$=>{const F=i.getBoundingClientRect(),Ge=($.clientX-F.left)/F.width,Pe=($.clientY-F.top)/F.height,[dt,ut,mt,ft]=e.diffZone;if(f){c.textContent="这是你自己拍的原图。换回那张再看看。",c.classList.remove("good");return}Ge>=dt&&Ge<=mt&&Pe>=ut&&Pe<=ft?(c.textContent="找到了。门缝里，多了一个人。",c.classList.add("good"),I(),S.redFlash(260),Y("puzzle1Done",!0),$e(),u.disabled=!1,u.textContent="明白了 · 返回"):c.textContent="不对。再看看，那个地方多出来了什么。"};i.addEventListener("pointerup",M),r.addEventListener("click",()=>{f=!f,i.replaceChildren(ce(f?n.id:e.id,f?n.real:e.real)),r.textContent=f?"看它发来的那张":"对照原图"}),u.addEventListener("click",v)}function nt(e){return new Promise(t=>{const n=nn[e];if(!n){t();return}X();const o=document.getElementById("app"),a=document.createElement("div");a.className="chapter-card",a.innerHTML=`<div class="cc-no">第${n.no}章</div><div class="cc-title">《${n.title}》</div><div class="cc-hint">轻触继续</div>`,o.appendChild(a);let s=!1;const i=()=>{s||(s=!0,a.classList.add("out"),setTimeout(()=>{a.remove(),t()},500))};a.addEventListener("click",i),setTimeout(()=>{a.querySelector(".cc-hint")?.classList.add("blink")},1600)})}const at={};function Me(e,t){at[e]=t}function pn(e){const t=at[e];if(!t){console.warn(`[ui] 来电流程不存在: ${e}`);return}je();const n=document.getElementById("app"),o=document.createElement("div");o.className="call-ui",o.innerHTML=`
    <div class="call-avatar">${t.who==="未知号码"?"？":t.who[0]}</div>
    <div class="call-name">${t.who}</div>
    <div class="call-status">来电…</div>
    <div class="call-btns">
      <button class="call-btn decline">拒接</button>
      <button class="call-btn accept">接听</button>
    </div>
  `,n.appendChild(o);const a=s=>{o.remove(),Ne(),se("contact"),K(s)};o.querySelector(".decline").addEventListener("click",()=>{I(),a(t.onDecline)}),o.querySelector(".accept").addEventListener("click",()=>{I(),gn(o,t)})}function gn(e,t){e.querySelector(".call-status").textContent="通话中 · 00:0X";const n=e.querySelector(".call-btns");n.innerHTML='<button class="call-btn hangup">挂断</button>';let o=0;const a=document.createElement("div");a.className="call-body",e.insertBefore(a,n);const s=()=>{if(o>=t.lines.length)return;const l=t.lines[o];o++;const r=document.createElement("div");r.className="call-line "+Ke(l.speaker),r.innerHTML=`<div class="bubble bubble-${l.speaker}"><div class="bubble-text"></div></div>`,a.appendChild(r);const c=r.querySelector(".bubble-text");new ye(c,l.text,{speed:26,audio:!1,onDone:()=>setTimeout(s,420)}),l.speaker==="number"?ie(l.text,{voice:"distorted"}):l.speaker==="mom"?ie(l.text,{voice:"mom"}):ie(l.text,{voice:"normal"})};s();const i=()=>{e.remove(),Ne(),I(),K(t.onAccept)};n.querySelector(".hangup").addEventListener("click",i)}let ot=null;function bn(e){ot=e}function st(){return ot}function hn(e){let t=e.replace("ending:","");if(t==="resolve"){const o=Tt();t=It(o,{newGamePlus:de().newGamePlus,allBaseUnlocked:Nt()})}Ze(t)&&(wt(t),bn(t),we(),Ne(),window.dispatchEvent(new CustomEvent("game:end",{detail:t}))),E.show("ending")}function it(){yn(),Je(),ze(),Se(),ne(0),E.show("chat"),K("p1s1")}function vn(){ze(),Se(),ne(y().chapter),Je(),E.show("chat"),K(y().currentNode)}function yn(){Ee()}const lt={sfx(e){switch(e){case"msg_num":se("number");break;case"msg_con":se("contact");break;case"msg_lin":se("lin");break;case"send":I();break;case"ring":je();break;case"sting":X();break;case"breath":Te();break}},sting(){X(),S.redFlash()},stinglong(){X(),S.redFlash(60),S.glitch(500)},glitch(e){S.glitch(e)},noise(e){S.setNoise(e)},shake(e){S.shake(e)},time(e){_t(e),k.updateStatus()},chapter(e){yt(e),ne(e),k.updateStatus()},photo(e){bt(e),k.refreshScreens()},photoOpen(e){tt(e)},note(e){gt(e),k.refreshScreens()},contact(e){ht(e),k.refreshScreens()},calllog(e){vt(e),k.refreshScreens()},banner(e){et(e)},screen(e){E.show(e)},call(e){pn(e)},async typing(){await mn()},flag(e){Y(e,!0)},count(e){ge(e)},async card(e){await nt(e)},heart(e){e?qt():we()},ambient(e){e?Se():Pt()},noteopen(e){const t=Xe(e);t&&k.showNoteView(t.body)},drafts(){Y("draftsVisible",!0)},flicker(e){S.glitch(e??600);const t=document.querySelector(".phone-screen");t&&(t.classList.add("fx-flicker"),window.setTimeout(()=>t.classList.remove("fx-flicker"),(e??600)+200))},revoke(){Cn()},wallChange(e){Y("wallChanged",e),k.refreshScreens()},silenceDrop(){Vt()},presence(){const e=document.querySelector(".st-left");e&&(e.textContent="00:00",e.classList.add("presence-glitch"),window.setTimeout(()=>{k.updateStatus(),e.classList.remove("presence-glitch")},1800))},voice(e){ie(e,{voice:"distorted"})}};function Cn(){const e=R?.querySelectorAll(".msg-row")??[],t=e[e.length-1];if(t){t.classList.add("revoked");const n=document.createElement("div");n.className="system-note revoke-note",n.textContent="⚠ 对方撤回了一条消息",t.after(n),ae()}}function _n(){const e=document.createElement("div");e.className="menu-screen";const t=de(),n=document.createElement("div");n.className="menu-title",n.innerHTML="午<b>夜</b>来讯";const o=document.createElement("div");o.className="menu-sub",o.textContent="—— 你收到了一条陌生短信 ——";const a=document.createElement("div");a.className="menu-btns";const s=fe("开始新的一夜",()=>it());if(a.appendChild(s),Be()){const c=fe("继续上一夜",()=>vn());a.appendChild(c)}const i=le(),l=i.filter(c=>t.endings.includes(c.id)).length;if(l>0){const c=fe(`结局画廊（${l}/${i.length}）`,()=>E.show("settings"));c.classList.add("ghost"),a.appendChild(c)}e.append(n,o,a);const r=document.createElement("div");if(r.className="menu-foot",r.innerHTML='<div class="menu-hint">深夜 00:00 · 陌生人发来短信<br>回复与否，都由你决定</div>',e.appendChild(r),t.newGamePlus){const c=document.createElement("div");c.className="menu-ghost",c.textContent="（草稿箱里，有一封不是你写的信）",e.appendChild(c),n.classList.add("ngp")}return e}function fe(e,t){const n=document.createElement("button");return n.className="menu-btn",n.textContent=e,n.addEventListener("click",t),n}function En(){const e=document.createElement("div");e.className="chat-screen";const t=document.createElement("div");return t.className="chat-container",e.appendChild(t),an(t),requestAnimationFrame(()=>on()),e}function Sn(){const e=document.createElement("div");e.className="notes-screen";const t=ct();return e.appendChild(t),Dn(n=>{e.isConnected&&Ce(e,n)}),e}function ct(){const e=document.createElement("div");e.className="scroll-area notes-list";const{notes:t}=y();if(t.length===0){const n=document.createElement("div");return n.className="system-note",n.textContent="（没有备忘录）",e.appendChild(n),e}for(const n of t){const o=Xe(n);if(!o)continue;const a=document.createElement("button");a.className="note-card"+(o.glitched?" glitched":"");const s=document.createElement("div");s.className="note-card-title",s.textContent=o.title||"无标题";const i=document.createElement("div");i.className="note-card-date",i.textContent=o.date;const l=document.createElement("div");l.className="note-card-preview",l.textContent=o.body.split(`
`).slice(0,2).join(" "),a.append(s,i,l);let r=!1;if(a.addEventListener("click",()=>{if(r){r=!1;return}const c=a.closest(".notes-screen");c&&Ce(c,o.body)}),o.secret){let c=null;a.addEventListener("pointerdown",()=>{c=window.setTimeout(()=>{r=!0,S.redFlash(300);const u=a.closest(".notes-screen");u&&Ce(u,o.body+`

（长按唤出）
`+o.secret)},900)}),a.addEventListener("pointerup",()=>{c&&clearTimeout(c)}),a.addEventListener("pointerleave",()=>{c&&clearTimeout(c)})}e.appendChild(a)}return e}function Ce(e,t){const n=document.createElement("div");n.className="note-view";const o=document.createElement("button");o.className="note-back",o.textContent="‹ 返回",o.addEventListener("click",()=>{e.replaceChildren(ct())});const a=document.createElement("div");a.className="note-body",a.textContent=t;const s=document.createElement("div");s.className="note-date",s.textContent="编辑于某天",n.append(o,a,s),e.replaceChildren(n),t.includes("别信")&&S.glitch(350)}function kn(){const e=document.createElement("div");e.className="photos-screen";const t=document.createElement("div");t.className="scroll-area photo-grid";const{photos:n}=y();if(!!y().flags.night333&&!n.includes("p_333")&&n.push("p_333"),n.length===0){const a=document.createElement("div");a.className="system-note",a.textContent="（相册是空的）",t.appendChild(a)}for(const a of n){const s=Re(a);if(!s)continue;const i=document.createElement("button");i.className="photo-cell";const l=document.createElement("div");l.className="photo-cell-inner";const r=!!y().flags.wallChanged;a==="p_home"&&r&&l.classList.add("wall-abnormal"),l.appendChild(ce(a,s.real)),i.appendChild(l);const c=document.createElement("div");c.className="photo-cell-cap",c.textContent=a==="p_home"&&r?"壁纸 ·（变灰了？）":s.title,i.appendChild(c),i.addEventListener("click",()=>{a==="p_room"&&(ge("roomViewed"),Te(),wn()),a==="p_333"&&(ge("anomalyViewed"),X()),tt(a)}),t.appendChild(i)}return e.appendChild(t),e}function wn(){const e=document.createElement("div");e.className="fx-flash",e.style.animationDuration="260ms",document.getElementById("app")?.appendChild(e),e.addEventListener("animationend",()=>e.remove())}function Tn(){const{contacts:e}=y(),t={c_unknown:{id:"c_unknown",name:"未知号码",avatar:"？",phone:"+86 138-****-0404",note:"无备注 · 本机陌生来电",cold:!0},c_lin:{id:"c_lin",name:"林晚",avatar:"晚",phone:"+86 137-****-0918",note:"❤ 我的女孩 · 通话记录：去年十一月",cold:!0},c_zhou:{id:"c_zhou",name:"周凯",avatar:"凯",phone:"+86 139-****-7721",note:"同事 · 老骂我不出门"},c_doctor:{id:"c_doctor",name:"陈医生",avatar:"陈",phone:"010-****-6158",note:"心理门诊 · 周三下午"},c_mom:{id:"c_mom",name:"妈妈",avatar:"妈",phone:"+86 135-****-3302",note:"最近来电：8月9日（未接）"}},n=[],o=["c_unknown","c_lin","c_zhou","c_doctor","c_mom"];for(const a of o)e.includes(a)&&t[a]&&n.push(t[a]);return n}function Nn(){const e=document.createElement("div");e.className="contacts-screen";const t=document.createElement("div");t.className="scroll-area contacts-list";const n=Tn();if(n.length===0){const o=document.createElement("div");o.className="system-note",o.textContent="（通讯录是空的）",t.appendChild(o)}for(const o of n){const a=document.createElement("button");a.className="contact-row"+(o.cold?" cold":"");const s=document.createElement("div");s.className="contact-avatar",s.textContent=o.avatar;const i=document.createElement("div");i.className="contact-info";const l=document.createElement("div");l.className="contact-name",l.textContent=o.name;const r=document.createElement("div");r.className="contact-phone",r.textContent=o.phone;const c=document.createElement("div");c.className="contact-note",c.textContent=o.note??"",i.append(l,r,c),a.append(s,i),a.addEventListener("click",()=>{o.id==="c_unknown"?c.textContent="……这个号码，你越看越觉得眼熟。":o.id==="c_lin"&&(c.textContent="你点开又关上。她的头像，你不敢看太久。")}),t.appendChild(a)}return e.appendChild(t),e}function Ln(){const e=document.createElement("div");e.className="calls-screen";const t=document.createElement("div");t.className="scroll-area calls-list";const{calls:n}=y();if(n.length===0){const o=document.createElement("div");o.className="system-note",o.textContent="（暂无通话记录）",t.appendChild(o)}for(const o of n){const a=tn.find(c=>c.id===o);if(!a)continue;const s=document.createElement("div");s.className="call-row";const i=document.createElement("span");i.className="call-dir",i.textContent=a.dir==="in"?"↓":a.dir==="out"?"↑":"☓",a.dir==="out"&&s.classList.add("self-out");const l=document.createElement("span");l.className="call-who",l.textContent=a.who;const r=document.createElement("span");r.className="call-when",r.textContent=`${a.when} · ${a.dur}`,s.append(i,l,r),t.appendChild(s)}return e.appendChild(t),e}const Rn="1106",An=[{to:"未知号码",when:"定时发送 · 每天 00:00",text:"还没睡？"},{to:"未知号码",when:"定时发送 · 每天 00:00",text:"今天在公司，我又把方案弄砸了。你以前会笑我。"},{to:"未知号码",when:"定时发送 · 每天 00:00",text:"林晚，对不起。"},{to:"未知号码",when:"定时发送 · 每天 00:00",text:"你看到我的未读了吗。"},{to:"林晚",when:"定时发送 · 每年 4 月 18 日",text:"生日快乐。要记得我。",sent:!0},{to:"林晚",when:"2025-11-06 23:52",text:"雨好大，我马上到家，你等我。",sent:!0}];function Mn(){const e=document.createElement("div");return e.className="drafts-screen",pt("draftsUnlocked")||y().draftsUnlocked?e.appendChild(Pn(()=>E.show("chat"))):e.appendChild(Gn()),e}function Gn(){const e=document.createElement("div");e.className="drafts-lock";const t=document.createElement("div");t.className="drafts-lock-icon",t.textContent="🔒";const n=document.createElement("div");n.className="drafts-lock-title",n.textContent="草稿箱已加密";const o=document.createElement("div");o.className="drafts-lock-hint",o.textContent=`输入 4 位数字密码。
（提示：备忘录里有答案。那晚的雨……是哪一天？）`;const a=document.createElement("div");a.className="passcode";const s=document.createElement("div");s.className="passcode-dots";for(let f=0;f<4;f++){const v=document.createElement("span");v.className="dot",s.appendChild(v)}const i=document.createElement("div");i.className="passcode-keys";let l="",r=0;const c=()=>{s.querySelectorAll(".dot").forEach((f,v)=>f.classList.toggle("fill",v<l.length))},u=f=>{l.length>=4||(l+=f,ke(),c(),l.length===4&&(l===Rn?(I(),S.glitch(400),Y("draftsUnlocked",!0),y().draftsUnlocked=!0,E.show("drafts")):(X(),S.shake(260),l="",r++,r===3&&(et("「你在用谁的生日？她一定很失望。」"),S.glitch(500),o.textContent="（密码：那晚的雨，是哪一天？）"),window.setTimeout(c,180))))};for(const f of["1","2","3","4","5","6","7","8","9","C","0","⌫"]){const v=document.createElement("button");v.className="passcode-key",v.textContent=f,v.addEventListener("click",()=>{f==="C"?(l="",c()):f==="⌫"?(l=l.slice(0,-1),c()):u(f)}),i.appendChild(v)}return a.append(s,i),e.append(t,n,o,a),e}function Pn(e){const t=document.createElement("div");t.className="scroll-area drafts-list";const n=document.createElement("div");n.className="drafts-success",n.innerHTML="🔓 <b>已解锁</b> —— 这些定时短信，全是你自己一年前设下的。",t.appendChild(n);for(const s of An){const i=document.createElement("div");i.className="draft-row"+(s.sent?" sent":"");const l=document.createElement("div");l.className="draft-head",l.textContent=`发至：${s.to} · ${s.when}`;const r=document.createElement("div");if(r.className="draft-body",r.textContent=s.text,i.append(l,r),s.sent){const c=document.createElement("div");c.className="draft-tag",c.textContent="已发送",i.appendChild(c)}t.appendChild(i)}const o=document.createElement("div");o.className="system-note",o.textContent="（草稿箱的定时发送，最早的一条，是你出事前一周设置的。）",t.appendChild(o);const a=document.createElement("button");return a.className="menu-btn drafts-continue",a.textContent="我看完了 · 回到短信继续",a.addEventListener("click",e),t.appendChild(a),t}const qn={true:"真结局",good:"好结局",bad:"坏结局",hidden:"隐藏结局",silence:"隐藏结局"};function Vn(){const e=document.createElement("div");e.className="settings-screen";const t=document.createElement("div");t.className="scroll-area";const n=Rt();t.appendChild(pe("音量"));for(const[i,l]of[["master","总音量"],["ambience","氛围声"],["sfx","音效"]]){const r=document.createElement("div");r.className="set-row";const c=document.createElement("span");c.className="set-label",c.textContent=l;const u=document.createElement("input");u.type="range",u.min="0",u.max="1",u.step="0.05",u.value=String(n[i]),u.addEventListener("input",()=>{At({[i]:Number(u.value)})}),r.append(c,u),t.appendChild(r)}const o=de(),a=le();if(t.appendChild(pe("结局画廊")),a.every(i=>!o.endings.includes(i.id))){const i=document.createElement("div");i.className="system-note",i.textContent="（尚未解锁任何结局）",t.appendChild(i)}else{const i=document.createElement("div");i.className="ending-gallery";for(const l of a){const r=o.endings.includes(l.id),c=document.createElement("button");c.className="gallery-card kind-"+l.kind+(r?"":" locked"),r?(c.innerHTML=`<b>${l.title}</b><span>${qn[l.kind]}</span>`,l.id===st()&&c.classList.add("recent")):c.textContent="？",i.appendChild(c)}t.appendChild(i)}t.appendChild(pe("其他"));const s=document.createElement("button");return s.className="menu-btn ghost danger",s.textContent="清除全部存档与结局",s.addEventListener("click",()=>{confirm("确定要清空所有进度与结局吗？此操作不可撤销。")&&(Ee(),localStorage.removeItem("wywlx_meta_v1"),localStorage.removeItem("wywlx_audio"),location.reload())}),t.appendChild(s),e.appendChild(t),e}function pe(e){const t=document.createElement("div");return t.className="set-section",t.textContent=e,t}const Hn={true:"真结局",good:"好结局",bad:"坏结局",hidden:"隐藏结局",silence:"隐藏结局"};function In(){const e=document.createElement("div");e.className="ending-screen";const t=st(),n=t?Ze(t):void 0;if(!n)return e.innerHTML='<div class="system-note">（没有结局数据）</div>',e;const o=document.createElement("div");o.className="ending-kind kind-"+n.kind,o.textContent=Hn[n.kind]??"结局";const a=document.createElement("div");a.className="ending-title",a.textContent=n.title;const s=document.createElement("div");s.className="ending-divider";const i=document.createElement("div");i.className="ending-body",i.textContent=De(n.text);const l=de(),r=le().length,c=le().filter(F=>l.endings.includes(F.id)).length,u=document.createElement("div");u.className="ending-progress",u.textContent=`已解锁结局 ${c} / ${r}`;const f=document.createElement("div");f.className="ending-btns";const v=document.createElement("button");v.className="menu-btn ghost",v.textContent="回到主菜单",v.addEventListener("click",()=>E.show("menu"));const M=document.createElement("button");M.className="menu-btn",M.textContent="再试一次 · 另一条路",M.addEventListener("click",()=>{Ee(),it()});const $=document.createElement("button");return $.className="menu-btn ghost",$.textContent="查看结局画廊",$.addEventListener("click",()=>E.show("settings")),f.append(v,M,$),e.append(o,a,s,i,u,f),ne(1),e}const $n={menu:{render:()=>_n(),title:""},chat:{render:()=>En(),title:"未知号码",nav:!0},notes:{render:()=>Sn(),title:"备忘录",nav:!0},photos:{render:()=>kn(),title:"相册",nav:!0},contacts:{render:()=>Nn(),title:"通讯录",nav:!0},calls:{render:()=>Ln(),title:"最近通话",nav:!0},drafts:{render:()=>Mn(),title:"草稿箱",nav:!1},settings:{render:()=>Vn(),title:"设置",nav:!0},ending:{render:()=>In(),title:""}},Bn=["chat","notes","photos","contacts","settings"];let N="menu",Q=null,O=null,_e=null,ee=null,J=null;const k={updateStatus(){if(!_e)return;const{time:e}=y(),t=e%(24*60),n=Math.floor(t/60),o=t%60;_e.textContent=`${String(n).padStart(2,"0")}:${String(o).padStart(2,"0")}`},refreshScreens(){(N==="notes"||N==="photos"||N==="contacts"||N==="calls")&&E.show(N)},setHeader(e){ee&&(ee.textContent=e)},showNoteView(e){rt?.(e)}};let rt=null;function Dn(e){rt=e}const E={show(e,t){if(N=e,!O)return;const n=$n[e];k.setHeader(n.title),O.innerHTML="";let o;o=n.render(),O.appendChild(o),n.title&&(document.title=`${n.title} · 午夜来讯`),On(),window.dispatchEvent(new CustomEvent("screen:show",{detail:e}));const a=O.querySelector(".scroll-area");a&&(a.scrollTop=a.scrollHeight),ne(y().chapter)},current(){return N}};function On(){if(J){J.innerHTML="";for(const e of Bn){const t=document.createElement("button");t.className="nav-btn"+(e===N?" active":""),t.dataset.screen=e;const n=zn(e);if(t.innerHTML=`<span class="nav-ico">${n}</span><span class="nav-lbl">${Wn(e)}</span>`,e==="chat"){const o=document.createElement("span");o.className="nav-badge",t.appendChild(o)}t.addEventListener("click",()=>{E.show(e)}),J.appendChild(t)}}}function zn(e){switch(e){case"chat":return"💬";case"notes":return"📝";case"photos":return"🖼️";case"contacts":return"👤";case"settings":return"⚙️";default:return""}}function Wn(e){switch(e){case"chat":return"短信";case"notes":return"备忘录";case"photos":return"相册";case"contacts":return"联系人";case"settings":return"设置";default:return""}}function Fn(){const e=document.getElementById("app");e.innerHTML="",Q=document.createElement("div"),Q.className="phone";const t=document.createElement("div");t.className="phone-screen",Q.appendChild(t);const n=document.createElement("div");n.className="notch",t.appendChild(n);const o=document.createElement("div");o.className="status-bar",o.innerHTML=`
    <span class="st-left">23:57</span>
    <span class="st-right">📶 · 🔋</span>
  `,t.appendChild(o),_e=o.querySelector(".st-left");const a=document.createElement("div");a.className="screen-header";const s=document.createElement("button");s.className="header-back",s.textContent="‹",a.appendChild(s),ee=document.createElement("span"),ee.className="header-title",a.appendChild(ee);const i=document.createElement("span");i.className="header-spacer",a.appendChild(i),t.appendChild(a),O=document.createElement("div"),O.className="screen-content",t.appendChild(O),J=document.createElement("nav"),J.className="bottom-nav",t.appendChild(J),e.appendChild(Q);const l=document.createElement("div");l.className="fx-noise",e.appendChild(l);const r=document.createElement("div");return r.className="fx-tint",e.appendChild(r),s.addEventListener("click",()=>{N==="chat"?E.show("menu"):E.show("chat")}),window.setInterval(()=>{N==="menu"||N==="ending"||k.updateStatus()},3e4),E.show("menu"),Q}const G=(e,t,n,o,a,s)=>({id:e,speaker:t,text:n,effects:o,choices:a,next:s}),jn={nodes:[G("p1s1","narration",`二十三点五十分。雨下了一天。

钥匙在锁孔里转了两圈，门开了。你脱下湿透的外套，挂在椅背上。

桌上放着中午没吃完的外卖，垃圾桶里有三个空咖啡罐。

你是王斌。二十八岁，在一家不大不小的公司做方案，一周被驳回三次。`,["chapter:0","ambient:on"],void 0,"p1s2"),G("p1s2","narration",`你把自己摔进沙发。手机屏幕自己亮了一下，又暗下去。

一年了。有些东西，你一直没舍得删，也没敢再看。`,["banner:一年前，这里还住着另一个人"],void 0,"p1s2w"),G("p1s2w","narration","你点开手机。",[],[{label:"*打开备忘录，看看那些没删的便签",effect:["screen:notes","count:visitedExplore"],go:"p1s2w"},{label:"*打开相册，翻到那些老照片",effect:["screen:photos","count:visitedExplore"],go:"p1s2w"},{label:"*打开联系人，看那个永远不会再亮的头像",effect:["screen:contacts","count:visitedExplore"],go:"p1s2w"},{label:"*打开通话记录",effect:["screen:calls","count:visitedExplore"],go:"p1s2w"},{label:"*都看过了。有些事，想起来比忘掉疼。",cond:"count:visitedExplore>=2",go:"p1s3"}]),G("p1s3","narration",`你合上手机，盯着天花板。

雨声很大。你听见自己的呼吸。

有些事，你不敢多想。想多了，这间屋子就装不下了。`,["time:6"],void 0,"p1s4"),G("p1s4","narration",`二十三点五十八分。

手机屏幕又亮了一下。

不是闹钟。`,["time:2","sfx:msg_num"],void 0,"p1s5"),G("p1s5","system","00:00",["time:0"],void 0,"p1s6"),G("p1s6","number","还没睡？",["typing"],void 0,"p1s7"),G("p1s7","number","我知道你睡不着的。",["typing"],void 0,"p1s8"),G("p1s8","number",`一年了。你一直都在假装没事。

可我认得你。`,["typing"],[{label:"你是谁？",go:"c1s1",flags:{askWho:!0}},{label:"*不回。盯着屏幕。",go:"c1s1"}])]},_=(e,t,n,o,a,s)=>({id:e,speaker:t,text:n,effects:o,choices:a,next:s}),Un={nodes:[_("c1s1","number",`我是谁不重要。

我知道你叫王斌。今天下午三点，你在十七楼会议室，方案又没过。领导把文件摔在桌上时，你的手抖了一下。`,["typing"],void 0,"c1s2"),_("c1s2","number",`还有。你住的这间屋子，一年前，住着另一个人。

你把她弄丢了。`,["typing","stinglong"],void 0,"c1s3"),_("c1s3","number","我说的对吗。",["typing"],[{label:"你连这个都知道？你到底是谁？",effect:["count:trait_care"],go:"c1s4",flags:{askWho:!0}},{label:"*握紧手机，指节发白",effect:["count:trait_care"],go:"c1s4",flags:{shaken:!0}},{label:"*把这个号码拉黑",effect:["count:trait_avoid"],go:"c1s3b"}]),_("c1s3b","number",`拉黑没有用。

三秒后，一条新短信，来自一个新的陌生号码：

「我说过，我在你身边。」`,["typing","sting"],void 0,"c1s4"),_("c1s4","number",`别怕。我不会伤害你。

我只是……想让你想起来。`,["typing"],void 0,"c1s5"),_("c1s5","number",`今晚，先送你一样东西。

你收到一张照片。看仔细了。`,["typing","sfx:msg_num","photo:p_hallway","photo:open:p_hallway","sting"],void 0,"c1s6"),_("c1s6","narration",`屏幕暗下去，又亮起来。

那张照片……和你相册里你自己拍的那张，好像，不太一样？`,["sting"],void 0,"c1s7"),_("c1s7","narration","你盯着它看了很久。",[],[{label:"*回相册，两张对比一下",effect:["screen:photos"],go:"c1s7"},{label:"*告诉它：门缝里，多了一个人。",cond:"flag:puzzle1Done",go:"c1s8",flags:{foundDiff:!0},effect:["count:trait_truth"]},{label:"*告诉它：没什么不一样。",go:"c1s8",flags:{missedDiff:!0},effect:["count:trait_avoid"]}]),_("c1s8","number",`……你比我想的敏锐。

门缝里的人影，你怕吗？`,["typing","sting"],void 0,"c1s9"),_("c1s9","number",`别怕。

那只是我，想让你记住的某个东西。`,["typing"],void 0,"c1s10"),_("c1s10","number",`这张照片，是从你房间的门缝里拍的。

你回头看一眼——你客厅的灯，是不是还亮着？`,["typing","sting"],void 0,"c1s11"),_("c1s11","narration",`你回头。

客厅的灯，确实亮着。

你明明记得，进门的时候，没有开灯。`,["stinglong","silence"],void 0,"c1s12"),_("c1s12","number",`……晚安。明天 00:00，我还在。

除非——你想起来。`,["typing"],void 0,"c1s13"),_("c1s13","system","对方已离线。",[],void 0,"c1s14"),_("c1s14","narration",`你一夜没睡。

天一点点变亮。你看着那条短信，看了很久。`,["time:270"],[{label:"睡一会儿吧，明天还要上班。",go:"c2s1",flags:{keptWorking:!0}},{label:"*想把这件事告诉周凯",go:"c2s1",flags:{wantTell:!0}},{label:"*把号码删掉，假装没发生过",effect:["count:trait_avoid"],go:"c2s1",flags:{deleted:!0}}])]},b=(e,t,n,o,a,s)=>({id:e,speaker:t,text:n,effects:o,choices:a,next:s}),Yn={nodes:[b("c2s1","narration",`白天浑浑噩噩。周凯在微信上喊你吃午饭，你没回。

晚上十一点五十，你躺下，手机放在枕边。

你知道它要来。`,["chapter:2","card:2","note:n_secret","time:0"],void 0,"c2s2"),b("c2s2","number","我来了。",["typing","sfx:msg_num"],void 0,"c2s3"),b("c2s3","number","今天你开会走了三次神。第三次，你在备忘录里写了一个字，又删了。",["typing"],[{label:"你连我的备忘录都看得见？",go:"c2s4",flags:{revealNote:!0}},{label:"*没回，却打开了自己的备忘录",go:"c2s4b"}]),b("c2s4","number",`看不见。

但我读得懂你。你写的那个字，是"晚"。对吧。`,["typing"],void 0,"c2s5"),b("c2s4b","number",`你自己都忘了自己写过什么，对吧。

那我来告诉你——是"晚"。`,["typing"],void 0,"c2s5"),b("c2s5","number",`我们来玩个游戏。

你猜对一个，我就告诉你我是谁。`,["typing"],void 0,"c2s6"),b("c2s6","number",`谜题。

我们第一次见面的日子。

给你一个提示：你的相册里，有一张蛋糕。`,["typing"],void 0,"c2s6w"),b("c2s6w","narration","你想了想。",[],[{label:"*先去翻相册，找那张蛋糕的照片",effect:["screen:photos"],go:"c2s6w"},{label:"*直接回答：4 月 18 日",go:"c2s7",flags:{solvedPuzzle1:!0},effect:["count:trait_truth"]},{label:"*直接回答：6 月 2 日",go:"c2s6wrong"},{label:"*直接回答：11 月 6 日",go:"c2s6wrong"}]),b("c2s6wrong","number",`不对。

你连这个都忘了？她得多难过。`,["typing","sting"],[{label:"*再想想",go:"c2s6wrong2",flags:{wrongP1:!0}}]),b("c2s6wrong2","number",`再想想。

相册里那张蛋糕照片，日期，你看见过。`,["typing"],[{label:"*翻相册，找那张蛋糕的照片",effect:["screen:photos"],go:"c2s6w"},{label:"*再猜一次",go:"c2s6w"}]),b("c2s7","number",`……4 月 18 日。

那是你们相遇的第一天。很好，你记得。

可是你记不记得，你们在一起的最后一天，是哪一天？`,["typing","sfx:sting"],[{label:"11 月 6 日。车祸那天。",go:"c2s8",flags:{knowsDate:!0},effect:["count:trait_truth"]},{label:"*不想回答",go:"c2s8"}]),b("c2s8","number",`11 月 6 日。那天下着大雨。

你开着车，手机亮着——一条短信。

你回了吗？`,["typing"],void 0,"c2s9"),b("c2s9","number","回答我。",["typing"],[{label:"我……没回。我在开车。",go:"c2s9a",flags:{claimDriving:!0}},{label:"我不记得了。",go:"c2s9b",flags:{noMemory:!0}}]),b("c2s9a","number",`是吗。

你确定吗。`,["typing","sting"],[{label:"*沉默",go:"c2s10"}]),b("c2s9b","number",`你果然不记得了。

没关系。我替你记着。`,["typing","sting"],[{label:"*沉默",go:"c2s10"}]),b("c2s10","number",`今晚先到这儿。

明天，我带你去见一个人。`,["typing"],[{label:"*打给周凯，把这件事说出来",effect:["call:zhou","count:trait_help"],go:"c2_aftercall_zhou"},{label:"*打给妈妈，听听她的声音",effect:["call:mom","count:trait_help"],go:"c2_aftercall_mom"},{label:"*约陈医生周四复诊",effect:["count:trait_help","banner:已预约 陈医生 · 周四 15:00"],go:"c2s11",flags:{bookedDoctor:!0}},{label:"*谁都不找，自己扛",effect:["count:trait_avoid"],go:"c2s11",flags:{alone:!0}}]),b("c2s11","number",`很好。

你选择了自己扛。像以前一样。`,["typing"],void 0,"c2s12"),b("c2s12","number",`晚安。明天见。

等你真正想起来的时候，你会感谢今晚的你。`,["typing"],void 0,"c3s1"),b("c2_aftercall_zhou","number",`你的同事很关心你。

可惜，他帮不了你。`,["typing","calllog:c_zhou_1"],[{label:"*把号码发给周凯看",go:"c2s12",flags:{toldZhou:!0}},{label:"算了，说了他也不信。",go:"c2s12",flags:{toldZhou:!0}}]),b("c2_declined_zhou","number",`连周凯的电话你都不接？

你把自己关得太死了。`,["typing"],[{label:"……",go:"c2s12",flags:{refusedHelp:!0}}]),b("c2_aftercall_mom","number","妈妈的声音，让你有点想哭。",["typing","calllog:c_mom_1"],[{label:"*想把这件事告诉妈妈",go:"c2s12",flags:{toldMom:!0}},{label:'*没说出口，只说"我挺好的"',go:"c2s12",flags:{liedMom:!0}}]),b("c2_declined_mom","number","你挂断了妈妈的电话。",["typing"],[{label:"……",go:"c2s12",flags:{refusedHelp:!0}}])]},g=(e,t,n,o,a,s)=>({id:e,speaker:t,text:n,effects:o,choices:a,next:s}),Zn={nodes:[g("c3s1","narration",`白天，周凯在微信上问你"到底怎么了"。你打了几个字，又删了。

夜里，雨又下了起来。00:00，手机准时亮起。`,["chapter:3","card:3","time:0"],void 0,"c3s2"),g("c3s2","number",`今晚，我不说话。

你先去看你的备忘录。第三条。

那不是你写的。`,["typing","note:n_wrong","sting","wallchange"],void 0,"c3s2w"),g("c3s2w","narration","备忘录里，多了一条不是你写的东西。",[],[{label:"*打开备忘录看看",effect:["screen:notes"],go:"c3s2w"},{label:"我自己的备忘录，我还不清楚？",go:"c3s3",flags:{doubt:!0}}]),g("c3s3","number",`看到了吗。

"别信手机"。三条。

那是你自己写的，还是……我替你写的？`,["typing","sting"],void 0,"c3s4"),g("c3s4","number",`现在，去看你的通话记录。

昨晚 00:04，有一通拨出的电话，打给"未知号码"。时长 3 秒。`,["typing","calllog:c_self","sting"],void 0,"c3s4w"),g("c3s4w","narration","你不敢相信。",[],[{label:"*打开通话记录确认",effect:["screen:calls"],go:"c3s4w"},{label:"我没打过这个电话！",go:"c3s5",flags:{deniedCall:!0}}]),g("c3s5","number",`可它就在那里。

3 秒。00:04。

刚好在你删掉我聊天记录之前。`,["typing"],void 0,"c3s6"),g("c3s6","number",`你开始怀疑了吧。

你的手机，在背着你做事。

或者——背着你的人，是你自己。`,["typing","stinglong"],void 0,"c3s6b"),g("c3s6b","narration",`屏幕忽然闪了一下。

一条消息，被对方撤回了。`,["flicker","msgrevoke"],void 0,"c3s7"),g("c3s7","number",`……没什么。你什么都没看见。

今晚，我再给你看一样东西。然后，你决定信谁。`,["typing","note:n_right"],void 0,"c3s8"),g("c3s8","narration",`备忘录里，现在有两条故障的字。

一条说：别信手机。

一条说：别信自己。`,["sting"],void 0,"c3s8w"),g("c3s8w","narration","你站在两条之间。",[],[{label:"我信手机。至少它是我的。",go:"c3s9a",flags:{trustPhone:!0}},{label:"我信我自己。我怎么会害自己。",go:"c3s9b",flags:{trustSelf:!0},effect:["count:trait_truth"]},{label:"*两条都不信，再去备忘录看看",effect:["screen:notes"],go:"c3s8w"}]),g("c3s9a","number",`你信手机？

可昨晚 00:04 那通电话，就是你的手机自己打的。`,["typing","sting"],[{label:"*沉默",go:"c3s10"}]),g("c3s9b","number",`你信自己？

那为什么你会忘掉那么多事。为什么备忘录里会有你没写过的字。`,["typing","sting"],[{label:"*沉默",go:"c3s10"}]),g("c3s10","number",`你不是疯了。

你只是……不敢想起来。`,["typing"],void 0,"c3s11"),g("c3s11","narration",`你看了下时间。

凌晨 3:33。

屏幕自己亮了。相册……好像，多了一张照片。`,["time:213","flag:night333","banner:3:33 —— 相册里好像多了一张照片","sting"],void 0,"c3s11w"),g("c3s11w","narration","你盯着那条提醒，一动不动。",[],[{label:"*打开相册，看看那张多出来的照片",effect:["screen:photos"],go:"c3s11w"},{label:"*那张照片，我看着，像她。",cond:"count:anomalyViewed>=1",go:"c3s12",flags:{sawHer:!0},effect:["count:trait_care"]},{label:"*我什么都没看到。",go:"c3s12",effect:["count:trait_avoid"]}]),g("c3s12","number",`3:33 的照片，你看到了吧。

那不是别人。

那是你忘了的她。也是你忘掉的自己。`,["typing","stinglong","presence"],void 0,"c3s13"),g("c3s13","number",`明天，我给你看那晚的照片。

然后，你要做一个决定。`,["typing"],[{label:"*接这个未知号码的来电",effect:["call:number","count:trait_truth"],go:"c3_call_accepted"},{label:"*不接，挂断",effect:["count:trait_avoid"],go:"c3s14",flags:{refusedCall:!0}}]),g("c3_call_accepted","number","……你终于接了。",["typing"],void 0,"c3s14"),g("c3_call_declined","number",`你不接电话。

你以为躲开声音，就能躲开真相吗。`,["typing"],void 0,"c3s14"),g("c3s14","number",`明天晚上，还是这个时间。

我会给你看那晚的照片。

睡吧。你需要的。`,["typing"],void 0,"c3s15"),g("c3s15","narration",`你把手机放下，又拿起来。

屏幕的光，照着你一个人。

你忽然发现，你不记得自己是什么时候睡着的。`,["time:180"],[{label:"*天亮之前，必须弄明白",go:"c4s1"}])]},p=(e,t,n,o,a,s,i)=>({id:e,speaker:t,text:n,effects:o,choices:a,next:s,end:i}),Xn={nodes:[p("c4s1","narration",`白天，你翻了一整天的相册。

手机里的未读，从 99 变成 0。可你越看，越觉得哪里不对。

夜晚来得很慢。`,["chapter:4","card:4","photo:p_crash"],void 0,"c4s2"),p("c4s2","number","今晚，我不绕弯子了。",["typing","time:0"],void 0,"c4s3"),p("c4s3","number",`你说 11 月 6 号那晚，你在开车，没回短信。

那我问你——`,["typing"],void 0,"c4s4"),p("c4s4","number","那条短信，是谁发给你的？",["typing","sting"],void 0,"c4s4w"),p("c4s4w","narration","你握着手机，指尖发凉。",[],[{label:"是……林晚发的。她问我到家没有。",go:"c4s5",flags:{truthReply:!0},effect:["count:trait_truth"]},{label:"我不记得有短信。",go:"c4s5",flags:{denyAgain:!0},effect:["count:trait_avoid"]}]),p("c4s5","number",`她问你到家没有。

然后呢？你回了。

"马上到，等我。"`,["typing","sting"],void 0,"c4s6"),p("c4s6","number",`你一边开车，一边回她的短信。

雨很大。你看见前面的刹车灯时，已经来不及了。`,["typing","stinglong","heart:on"],void 0,"c4s7"),p("c4s7","number",`你一直以为，是那场雨。

其实不是。

是你自己的手。`,["typing"],void 0,"c4s8"),p("c4s8","number","你想起来了吗？",["typing"],[{label:"*一直摇头，不愿接受",go:"c4s8a"},{label:"*眼泪掉在屏幕上",go:"c4s8b",flags:{tears:!0},effect:["count:trait_care","count:trait_truth"]}]),p("c4s8a","number",`你把车开出护栏的时候，手机屏幕上还亮着两个字——

"等我"。

那是你发的。`,["typing","stinglong"],void 0,"c4s9"),p("c4s8b","number",`你把车开出护栏的时候，手机屏幕上还亮着两个字——

"等我"。

那是你发的。`,["typing","stinglong"],void 0,"c4s9"),p("c4s9","number",`你不是受害者。

你是那个，在雨里拿起手机的人。`,["typing"],void 0,"c4s10"),p("c4s10","number",`她那天下午问你：几点到家。你说：九点。

那天晚上，你迟了三个小时。

她等你的那三个小时里，打了四通电话。你都没接。`,["typing","sting"],void 0,"c4s11"),p("c4s11","number",`现在，你知道我是谁了。

我是那个替你记着这一切的人。

我是你。王斌。

是你忘掉的那个自己。`,["typing","stinglong"],void 0,"c4s12"),p("c4s12","number",`这一年来，每天 00:00 的短信，不是别人。

是你自己，在提醒你自己。`,["typing","heart:off"],[{label:"……你真是我自己？",go:"c4s13",flags:{believe:!0},effect:["count:trait_truth"]},{label:"*不信。拉黑这个号码",effect:["count:trait_avoid"],go:"c4s14",flags:{blockAgain:!0}}]),p("c4s13","number",`你不信？

那你去打开草稿箱。密码是你永远忘不掉的那一天。

「我们」之后的那一天。`,["typing","drafts"],void 0,"c4s13d"),p("c4s13d","narration","草稿箱需要 4 位数字密码。",[],[{label:"*去解锁草稿箱",effect:["screen:drafts"],go:"c4s13d"},{label:"我打开了，都看完了。",cond:"flag:draftsUnlocked",go:"c4s15",flags:{sawDrafts:!0},effect:["count:trait_truth"]},{label:"*先记下这个谜题，想想再回来",go:"c4s13d"}]),p("c4s14","number",`你拉黑了我。

手机安静了三秒。

然后，一条新短信，来自一个新的未知号码：

"别这样。你逃不掉的。"`,["typing","sting"],[{label:"*我该拿你怎么办",go:"c4s14b"}]),p("c4s14b","number",`去打开草稿箱。密码是 11 月 6 日。

那是你唯一逃不掉的日子。`,["typing"],[{label:"*回到草稿箱，解锁它",effect:["screen:drafts"],go:"c4s13d"}]),p("c4s15","number",`看完了？

那些定时短信——是你，一年前自己设下的。

每天 00:00，发给一个永远不会再回你的人。`,["typing","sting"],void 0,"c4s16"),p("c4s16","number",`你设下它们，是因为你怕自己忘了。

怕有一天，你真的会以为，那只是一场雨。`,["typing"],void 0,"c4s17"),p("c4s17","number",`你一直骗自己：我是受害者，是那场雨。

可你骗不了那个替你记得的你自己。`,["typing","sting"],void 0,"c4s18"),p("c4s18","number",`今晚就到这。

明天，是最后一夜。

到时候，你要做一个选择。

一个只有你能替自己做的选择。`,["typing"],void 0,"c4s19"),p("c4s19","narration",`你把手机放在胸口，睡了过去。

这一次，你没有梦到她。

你梦到了一条短信，一个从未发出的字：

「悔。」`,["time:240"],[{label:"*哭出声来",effect:["count:trait_care"],go:"c5s1"},{label:"*沉默了整整一夜",effect:["count:trait_truth"],go:"c5s1"},{label:"*告诉自己，那只是一场梦",effect:["count:trait_avoid"],go:"c5s1"}])]},T=(e,t,n,o,a,s,i)=>({id:e,speaker:t,text:n,effects:o,choices:a,next:s,end:i}),Jn={nodes:[T("c5s1","narration",`窗外下着雨，像那晚一样。

你坐在床边，没有开灯。手机握在手里，屏幕暗着。

你等它。

00:00。`,["chapter:5","card:5","time:0"],void 0,"c5s2"),T("c5s2","number","最后一夜了。王斌。",["typing","sfx:msg_num"],void 0,"c5s3"),T("c5s3","number",`一年了。每天 00:00，我都在这里等你。

现在你都想起来了。

所以——轮到你回答了。`,["typing"],void 0,"c5s4"),T("c5s4","number","这一夜，你一共 {trait_truth} 次直面我，{trait_help} 次向人求助，{trait_avoid} 次想把我推远，{trait_care} 次想起她。",["typing"],void 0,"c5s5"),T("c5s5","number",`我是那个替你记得一切的人。

现在，天快亮了。

你想记得我，还是忘了我？`,["typing","sting"],void 0,"c5s5w"),T("c5s5w","narration","雨声很大。你握着手机。",[],[{label:"*天亮就去派出所，把一切说清楚。",cond:"count:trait_truth>=3",effect:["count:trait_truth"],go:"c5s6t"},{label:"*拨通陈医生的电话。",cond:"count:trait_help>=2",effect:["count:trait_help"],go:"c5s6h"},{label:"*翻开她的照片，看最后一眼。",cond:"count:trait_care>=3",effect:["count:trait_care"],go:"c5s6c"},{label:"*把手机恢复出厂设置。",cond:"count:trait_avoid>=3",effect:["count:trait_avoid"],go:"c5s6a"},{label:"*什么都不做，也不说话。",cond:"count:trait_silent>=2",effect:["count:trait_silent"],go:"c5s6s"},{label:"*就这样坐着，天快亮了。",effect:["count:trait_silent"],go:"c5s6s"}]),T("c5s6t","narration",`你打出了那行字，发送。

然后，你拨出了那个号码。

号码没有再回。`,["sfx:send","time:5"],[],void 0,"ending:resolve"),T("c5s6h","narration",`你找到了陈医生的名片，拨了过去。

电话响了三声，接通了。

你说：医生，我想聊聊。`,["sfx:ring","time:5"],[],void 0,"ending:resolve"),T("c5s6c","narration",`你翻开相册，找到那张蛋糕照片。

蜡烛的光，照着你一个人的脸。

你忽然明白，这一年你真正怕的是什么。`,["sfx:breath","time:5"],[],void 0,"ending:resolve"),T("c5s6a","narration",`你删除了所有聊天记录，拉黑号码，清空了草稿箱。

手机恢复出厂设置的那一刻，你长长地舒了一口气。`,["sfx:send","time:5","sting"],[],void 0,"ending:resolve"),T("c5s6s","narration",`你没有回。

屏幕暗下去，又因为新消息亮起来。你没有看。

天亮了。你也没有看。`,["time:420","sting"],[],void 0,"ending:resolve")]};function Kn(){j(jn),j(Un),j(Yn),j(Zn),j(Xn),j(Jn)}Kn();Be()&&St();Me("zhou",{who:"周凯",onAccept:"c2_aftercall_zhou",onDecline:"c2_declined_zhou",lines:[{speaker:"zhou",text:"哥，你终于接电话了！你他妈吓死我了，两天不回消息。"},{speaker:"zhou",text:"周六晚上老地方，麻哥他们把火锅都订好了。你必须来，别跟我扯你困了。"},{speaker:"zhou",text:"…还有，你最近是不是又没睡好？黑眼圈快掉地上了。那个事都一年了，你得往前看。"}]});Me("mom",{who:"妈妈",onAccept:"c2_aftercall_mom",onDecline:"c2_declined_mom",lines:[{speaker:"mom",text:"斌斌，妈打了你好几个电话，你怎么才接。"},{speaker:"mom",text:"上周妈给你寄的补品收到了吗？你老熬夜，妈不放心。"},{speaker:"mom",text:"……妈知道你心里难过。但是晚晚她，也不想看到你这样。"}]});Me("number",{who:"未知号码",onAccept:"c3_call_accepted",onDecline:"c3_call_declined",lines:[{speaker:"number",text:"……你终于接了。"},{speaker:"number",text:"我以为你会一直躲下去。"},{speaker:"number",text:"别挂。听我说完。那晚……不是你一个人记得。"}]});Fn();window.setTimeout(()=>{const e=document.querySelector(".boot");e&&e.classList.add("hide"),window.setTimeout(()=>e?.remove(),1e3)},600);
