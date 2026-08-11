(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const we="wywlx_save_v1",xe="wywlx_meta_v1";function et(){return{flags:{},currentNode:"p1s1",chapter:0,readCount:0,time:23*60+50,notes:["n_onboarding","n_lin_remind","n_lin_draft","n_zhou","n_secret"],photos:["p_home","p_lin_cake","p_lin_window","p_nightout","p_room","p_hallway_orig"],contacts:["c_unknown","c_lin","c_zhou","c_mom","c_doctor"],calls:["c_lin_last"],draftsUnlocked:!1,roomViewed:0,evidence:[],battery:87,hintsUsed:0,timelineCorrect:!1}}let m=et(),te=Xt();function k(){return m}function Ee(){return te}function J(e,t){m.flags[e]=t}function ve(e,t=1){m.flags[e]=(Number(m.flags[e])||0)+t}function Pt(e){return m.flags[e]}function $t(e){m.notes.includes(e)||m.notes.push(e)}function qt(e){m.photos.includes(e)||m.photos.push(e)}function Vt(e){m.contacts.includes(e)||m.contacts.push(e)}function Bt(e){m.calls.includes(e)||m.calls.push(e)}function Ht(e){m.chapter=e}function It(e){m.currentNode=e}function Dt(e){m.time=Math.max(0,m.time+e)}function zt(e){const t=Math.floor(m.time/1440);m.time=t*1440+Math.min(1439,Math.max(0,e))}function Ot(e,t=1){return Math.abs(m.time%1440-e)<=t}function oe(e){Array.isArray(m.evidence)||(m.evidence=[]),m.evidence.includes(e)||m.evidence.push(e)}function w(e){return Array.isArray(m.evidence)&&m.evidence.includes(e)}function Wt(){return m.evidence?.length??0}function qe(){return typeof m.battery=="number"?m.battery:87}function Ft(e){m.battery=Math.max(0,Math.min(100,e))}function ke(e){Ft(qe()+e)}function Ut(e){m.timelineCorrect=e,m.flags.timelineCorrect=e}function jt(){return m.hintsUsed=(m.hintsUsed||0)+1,m.hintsUsed}function tt(){return m.hintsUsed||0}function Zt(){m.readCount+=1}function ue(){try{localStorage.setItem(we,JSON.stringify(m))}catch{}}function nt(){try{return!!localStorage.getItem(we)}catch{return!1}}function Yt(){try{const e=localStorage.getItem(we);return e?(m=JSON.parse(e),!0):!1}catch{return!1}}function Ve(){m=et();try{localStorage.removeItem(we)}catch{}}function Xt(){try{const e=localStorage.getItem(xe);if(e){const t=JSON.parse(e);return{endings:t.endings??[],newGamePlus:t.newGamePlus??!1}}}catch{}return{endings:[],newGamePlus:!1}}function Jt(e){te.endings.includes(e)||te.endings.push(e),te.newGamePlus=!0;try{localStorage.setItem(xe,JSON.stringify(te))}catch{}}function Kt(){const e=t=>Number(m.flags[t])||0;return{truth:e("trait_truth"),help:e("trait_help"),avoid:e("trait_avoid"),care:e("trait_care"),silent:e("trait_silent")}}function Qt(){return["confess","therapy","loop","merge","silence"].every(e=>te.endings.includes(e))}function xt(e){if(!e)return!0;const t=e.match(/^!?flag:([A-Za-z0-9_.]+)$/);if(t){const i=!!m.flags[t[1]];return e.startsWith("!")?!i:i}const n=e.match(/^count:([A-Za-z0-9_.]+)\s*(>=|<=|==|>|<)\s*(-?\d+)$/);if(n){const a=Number(m.flags[n[1]])||0,i=Number(n[3]);switch(n[2]){case">=":return a>=i;case"<=":return a<=i;case"==":return a===i;case">":return a>i;case"<":return a<i}}if(e==="drafts:unlocked")return m.draftsUnlocked;if(e.startsWith("evidence:"))return w(e.slice(9));const o=e.match(/^battery:(<=|>=|<|>)\s*(\d+)$/);if(o){const a=qe(),i=Number(o[2]);switch(o[1]){case"<=":return a<=i;case">=":return a>=i;case"<":return a<i;case">":return a>i}}return e==="chapter:>1"?m.chapter>1:e==="chapter:>2"?m.chapter>2:e==="chapter:>3"?m.chapter>3:e==="chapter:>=3"?m.chapter>=3:e==="chapter:>=4"?m.chapter>=4:e==="chapter:>=5"?m.chapter>=5:!1}function at(e){return e.replace(/\{([A-Za-z0-9_]+)\}/g,(t,n)=>{if(n==="evidence_count")return String(Wt());const o=m.flags[n];return o===void 0?"":String(o)})}const ot={master:.9,ambience:.7,sfx:1};let d=null,Z=null,T=null,ne=null,K=!1,P=null,ge=null,Y=null,Re=1,B={...ot};try{const e=localStorage.getItem("wywlx_audio");e&&(B={...ot,...JSON.parse(e)})}catch{}function en(){return{...B}}function tn(e){B={...B,...e};try{localStorage.setItem("wywlx_audio",JSON.stringify(B))}catch{}d&&nn()}function me(e){Re=e,K&&st()}function it(){if(d){d.state==="suspended"&&d.resume();return}const e=window.AudioContext||window.webkitAudioContext;d=new e,Z=d.createGain(),Z.gain.value=B.master,Z.connect(d.destination),T=d.createGain(),T.gain.value=B.sfx,T.connect(Z),ne=d.createGain(),ne.gain.value=B.ambience,ne.connect(Z)}function nn(){Z&&Z.gain.setTargetAtTime(B.master,d.currentTime,.02),T&&T.gain.setTargetAtTime(B.sfx,d.currentTime,.02),ne&&ne.gain.setTargetAtTime(B.ambience,d.currentTime,.02)}function Be(e=2){const t=d.createBuffer(1,d.sampleRate*e,d.sampleRate),n=t.getChannelData(0);let o=0;for(let a=0;a<n.length;a++){const i=Math.random()*2-1;o=(o+.02*i)/1.02,n[a]=o*3.5}return t}function an(e,t,n,o=0){const a=d.createBufferSource();a.buffer=Be(e),a.loop=!0;const i=d.createBiquadFilter();i.type="lowpass",i.frequency.value=t,i.Q.value=.6;const s=d.createGain();s.gain.value=0,s.gain.setTargetAtTime(n,d.currentTime,.4);const l=d.createStereoPanner();l.pan.value=o,a.connect(i).connect(s).connect(l).connect(T),a.start(),a.stop(d.currentTime+e+.6)}function He(){!d||K||(K=!0,st())}function on(){if(P){try{P.lfo.stop(),P.drone.stop(),P.gain.disconnect()}catch{}P=null,K=!1}}function st(){if(!d||!K)return;if(P)try{P.lfo.stop(),P.drone.stop()}catch{}const e=d.createGain();e.gain.value=0;const t=d.createBufferSource();t.buffer=Be(4),t.loop=!0;const n=d.createBiquadFilter();n.type="lowpass",n.frequency.value=180;const o=d.createGain();o.gain.value=.5,t.connect(n).connect(o).connect(e);const a=d.createOscillator();a.type="sine",a.frequency.value=47;const i=d.createGain();i.gain.value=.12;const s=d.createOscillator();s.type="sine",s.frequency.value=.07;const l=d.createGain();l.gain.value=.06,s.connect(l).connect(i.gain),a.connect(i).connect(e);const r=d.createOscillator();r.type="triangle",r.frequency.value=88+Re*3;const c=d.createGain();c.gain.value=.018*Re,r.connect(c).connect(e),t.start(),a.start(),s.start(),r.start(),e.connect(ne),e.gain.setTargetAtTime(.5,d.currentTime,2.5),P={lfo:s,drone:a,gain:e}}function le(e){if(!d)return;const t=d.currentTime,n=d.createOscillator(),o=d.createGain();n.connect(o).connect(T),o.gain.setValueAtTime(0,t);const a=e==="number"?620:e==="lin"?820:720;n.type=e==="number"?"square":"sine",n.frequency.setValueAtTime(a,t),n.frequency.setValueAtTime(a*.92,t+.09),o.gain.setValueAtTime(1e-4,t),o.gain.exponentialRampToValueAtTime(.22,t+.012),o.gain.exponentialRampToValueAtTime(1e-4,t+.22),n.start(t),n.stop(t+.25),Ke(e==="number"?[18,40,12]:[10])}function D(){if(!d)return;const e=d.currentTime,t=d.createOscillator();t.type="sine",t.frequency.setValueAtTime(560,e),t.frequency.exponentialRampToValueAtTime(760,e+.07);const n=d.createGain();n.gain.setValueAtTime(1e-4,e),n.gain.exponentialRampToValueAtTime(.14,e+.01),n.gain.exponentialRampToValueAtTime(1e-4,e+.14),t.connect(n).connect(T),t.start(e),t.stop(e+.16)}function Ie(){if(!d)return;const e=d.currentTime,t=d.createOscillator();t.type="sine",t.frequency.value=900+Math.random()*500;const n=d.createGain();n.gain.setValueAtTime(.035,e),n.gain.exponentialRampToValueAtTime(1e-4,e+.03),t.connect(n).connect(T),t.start(e),t.stop(e+.035)}function lt(){if(!d)return;const e=[[880,0,.25],[880,.38,.25],[880,.76,.25],[1108,1.14,.35]];for(const[t,n,o]of e){const a=d.currentTime+n,i=d.createOscillator();i.type="sine",i.frequency.value=t;const s=d.createGain();s.gain.setValueAtTime(1e-4,a),s.gain.exponentialRampToValueAtTime(.2,a+.02),s.gain.exponentialRampToValueAtTime(1e-4,a+o),i.connect(s).connect(T),i.start(a),i.stop(a+o+.02)}}function U(){if(!d)return;const e=d.currentTime,t=d.createOscillator();t.type="sine",t.frequency.setValueAtTime(90,e),t.frequency.exponentialRampToValueAtTime(28,e+1.2);const n=d.createGain();n.gain.setValueAtTime(1e-4,e),n.gain.exponentialRampToValueAtTime(.6,e+.03),n.gain.exponentialRampToValueAtTime(1e-4,e+1.4),t.connect(n).connect(T),t.start(e),t.stop(e+1.5);for(const[o,a]of[[440,1],[467,1.007],[493.8,1.02],[554.4,1.04]]){const i=d.createOscillator();i.type="sawtooth",i.frequency.value=o*(a*.35+.65);const s=d.createGain();s.gain.setValueAtTime(1e-4,e),s.gain.exponentialRampToValueAtTime(.045,e+.08),s.gain.exponentialRampToValueAtTime(1e-4,e+1.8);const l=d.createBiquadFilter();l.type="lowpass",l.frequency.value=1200,i.connect(l).connect(s).connect(T),i.start(e+.01),i.stop(e+2)}an(2.2,800,.08,.2)}function sn(){if(!d)return;De(),Y=d.createGain(),Y.gain.value=0,Y.connect(T);const e=n=>{const o=d.createOscillator();o.type="sine",o.frequency.setValueAtTime(65,n),o.frequency.exponentialRampToValueAtTime(38,n+.16);const a=d.createGain();a.gain.setValueAtTime(1e-4,n),a.gain.exponentialRampToValueAtTime(.5,n+.02),a.gain.exponentialRampToValueAtTime(1e-4,n+.2),o.connect(a).connect(Y),o.start(n),o.stop(n+.25)},t=()=>{const n=d.currentTime;e(n),e(n+.28),ge=window.setTimeout(t,820)};t()}function De(){if(ge!==null&&(clearTimeout(ge),ge=null),Y){try{Y.disconnect()}catch{}Y=null}}function Ke(e){if(!d||!navigator.vibrate)return;const t=d.currentTime;for(let n=0;n<e.length;n++){if(n%2===0)continue;const o=t+e.slice(0,n).reduce((s,l)=>s+l,0)/1e3,a=d.createOscillator();a.type="sine",a.frequency.value=46;const i=d.createGain();i.gain.setValueAtTime(1e-4,o),i.gain.exponentialRampToValueAtTime(.3,o+.015),i.gain.exponentialRampToValueAtTime(1e-4,o+e[n]/1e3),a.connect(i).connect(T),a.start(o),a.stop(o+e[n]/1e3+.02)}if(navigator.vibrate)try{navigator.vibrate(e)}catch{}}function ln(){if(!d)return;(()=>{const t=d.currentTime,n=d.createOscillator();n.type="sine",n.frequency.value=1500;const o=d.createGain();o.gain.setValueAtTime(1e-4,t),o.gain.exponentialRampToValueAtTime(.05,t+.005),o.gain.exponentialRampToValueAtTime(1e-4,t+.03),n.connect(o).connect(T),n.start(t),n.stop(t+.04)})()}function re(){if(!d)return;const e=d.currentTime,t=d.createBufferSource();t.buffer=Be(.5);const n=d.createBiquadFilter();n.type="bandpass",n.frequency.value=2200,n.Q.value=.8;const o=d.createGain();o.gain.setValueAtTime(1e-4,e),o.gain.exponentialRampToValueAtTime(.14,e+.03),o.gain.exponentialRampToValueAtTime(1e-4,e+.3),t.connect(n).connect(o).connect(T),t.start(e),t.stop(e+.35)}function cn(){if(!d)return;const e=d;if(K&&P){const t=P.gain;t.gain.setTargetAtTime(0,e.currentTime,.05),setTimeout(()=>{K&&P&&t.gain.setTargetAtTime(.5,e.currentTime,.8)},1800)}rn()}function rn(){if(!d)return;const e=d,t=e.currentTime+1.9;for(const[n]of[[0],[.28]]){const o=e.createOscillator();o.type="sine",o.frequency.setValueAtTime(68,t+n),o.frequency.exponentialRampToValueAtTime(40,t+n+.16);const a=e.createGain();a.gain.setValueAtTime(1e-4,t+n),a.gain.exponentialRampToValueAtTime(.4,t+n+.02),a.gain.exponentialRampToValueAtTime(1e-4,t+n+.2),o.connect(a).connect(T),o.start(t+n),o.stop(t+n+.25)}}function ze(){if(!d)return;const e=d.currentTime,t=d.createOscillator();t.type="sine",t.frequency.value=210;const n=d.createBiquadFilter();n.type="lowpass",n.frequency.value=320;const o=d.createGain();o.gain.setValueAtTime(1e-4,e),o.gain.exponentialRampToValueAtTime(.05,e+.4),o.gain.exponentialRampToValueAtTime(1e-4,e+2.2),t.connect(n).connect(o).connect(T),t.start(e),t.stop(e+2.4)}let se=!1;function be(e,t={}){if(!("speechSynthesis"in window)){t.onEnd?.();return}se&&speechSynthesis.cancel(),se=!0;const n=new SpeechSynthesisUtterance(e);n.lang="zh-CN",n.rate=t.voice==="distorted"?.8:1,n.pitch=t.voice==="distorted"?.3:t.voice==="mom"?1.15:1,n.volume=.9;const a=speechSynthesis.getVoices().find(i=>i.lang.toLowerCase().startsWith("zh"));if(a&&(n.voice=a),n.onend=()=>{se=!1,t.onEnd?.()},n.onerror=()=>{se=!1,t.onEnd?.()},t.voice==="distorted"&&d){const i=d.createGain(),s=d.createBiquadFilter();s.type="lowpass",s.frequency.value=900,s.Q.value=1.4,i.gain.value=.6;const l=d.createMediaStreamDestination();s.connect(i).connect(l),i.connect(l),i.disconnect()}speechSynthesis.speak(n)}function Oe(){"speechSynthesis"in window&&speechSynthesis.cancel(),se=!1}const Ae=new Map;function ee(e){for(const t of e.nodes)Ae.has(t.id)&&console.warn(`[narrative] 重复节点 id: ${t.id}`),Ae.set(t.id,t)}function Me(e){return Ae.get(e)}async function ct(e,t){if(!e)return!1;let n=null;for(const o of e){let a,i;if(o.startsWith("photo:open:"))a="photo:open",i=o.slice(11);else{const s=o.indexOf(":");a=s<0?o:o.slice(0,s),i=s<0?"":o.slice(s+1)}switch(a){case"call":n={op:"call",arg:i};break;case"screen":n={op:"screen",arg:i};break;case"timed":n={op:"timed",arg:i};break;case"timeline":await t.timeline();break;case"card":await t.card(Number(i));break;case"typing":await t.typing();break;case"sfx":t.sfx(i);break;case"sting":t.sting();break;case"stinglong":t.stinglong();break;case"glitch":t.glitch(i?Number(i):void 0);break;case"noise":t.noise(i==="on"||i==="1");break;case"shake":t.shake(i?Number(i):void 0);break;case"time":t.time(i?Number(i):1);break;case"chapter":t.chapter(Number(i));break;case"photo":t.photo(i);break;case"photo:open":t.photoOpen(i);break;case"note":t.note(i);break;case"contact":t.contact(i);break;case"calllog":t.calllog(i);break;case"banner":t.banner(i);break;case"flag":t.flag(i);break;case"count":t.count(i);break;case"heart":t.heart(i==="on");break;case"ambient":t.ambient(i==="on"||i==="1");break;case"noteopen":t.noteopen(i);break;case"drafts":t.drafts();break;case"flicker":t.flicker(i?Number(i):void 0);break;case"msgrevoke":t.revoke();break;case"wallchange":t.wallChange(i!=="off");break;case"silence":t.silenceDrop();break;case"presence":t.presence();break;case"voice":t.voice(i);break;case"evidence":t.evidence(i);break;case"battery":t.battery(Number(i));break;case"scare":t.scare(i);break;case"clock":t.clock(Number(i));break}}return n?(n.op==="call"?t.call(n.arg):n.op==="timed"?t.timed(n.arg):t.screen(n.arg),!0):!1}const rt={confess:{id:"confess",title:"自首",kind:"true",unlocksNext:!0,text:`凌晨三点，你坐在派出所门口的长椅上，手机亮着。

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

（谢谢你，王斌。）`}};function dt(e){return rt[e]}function ye(){return Object.values(rt)}function dn(e,t){const n=k(),o=[w("e_hallway"),w("e_333"),w("e_call_self"),w("e_note_wrong"),w("e_draft"),n.timelineCorrect].filter(Boolean).length,a=[w("e_room"),w("e_lin_last"),w("e_nightout"),w("e_lin_draft")].filter(Boolean).length,i=tt(),s=Math.max(0,o-Math.floor(i/2));if(t.newGamePlus&&t.allBaseUnlocked&&e.truth>=3&&e.care>=3)return"awakening";if(e.silent>=4)return"silence";if(e.avoid>=4&&e.truth<=2&&o<2)return"loop";if(e.care>=5&&e.truth>=4||e.care>=4&&o>=2&&a>=2)return"merge";if(e.help>=3&&e.truth>=2)return"therapy";if(e.truth>=4&&s>=2||e.truth>=4)return"confess";switch(["truth","help","care","avoid","silent"].reduce((c,u)=>e[u]>e[c]?u:c,"truth")){case"help":return"therapy";case"care":return e.care>=3?"merge":"confess";case"avoid":return"loop";case"silent":return"silence";default:return"confess"}}function un(){const e=k(),t=[];return e.timelineCorrect&&t.push("你把那晚的顺序，自己拼对了。"),w("e_hallway")&&t.push("你找齐了门缝里的影子。"),w("e_333")&&t.push("你在 3:33 打开过相册。"),w("e_room")&&t.push("那个空房间，你反复看过。"),w("e_call_self")&&t.push("你看见了那通打给自己的电话。"),w("e_draft")&&t.push("你打开了草稿箱，看见定时短信。"),w("e_note_wrong")&&t.push("你读到了那两条矛盾的备忘录。"),tt()>=3&&t.push("有些答案，你是问出来的。"),t.length?t.join(`
`):""}function mn(){return document.getElementById("app")}const E={redFlash(e=500){const t=document.createElement("div");t.className="fx-flash",t.style.animationDuration=`${e}ms`,mn().appendChild(t),t.addEventListener("animationend",()=>t.remove())},glitch(e=400){const t=document.querySelector(".phone-screen");t&&(t.classList.add("fx-glitch"),window.setTimeout(()=>t.classList.remove("fx-glitch"),e))},shake(e=300){const t=document.querySelector(".phone");t&&(t.classList.add("fx-shake"),window.setTimeout(()=>t.classList.remove("fx-shake"),e))},setNoise(e){const t=document.querySelector(".fx-noise");t&&(t.style.opacity=e?"1":"0")},setRedTint(e){const t=document.querySelector(".fx-tint");t&&(t.style.opacity=e?"1":"0")}};function We(e,t){const n=document.createElement("div");n.className="hint-box";const o=document.createElement("button");o.className="hint-btn",o.textContent="需要提示？";const a=document.createElement("div");a.className="hint-body";let i=0,s=!1;return o.addEventListener("click",()=>{if(jt(),le("number"),E.glitch(220),!s){s=!0;const l=document.createElement("div");l.className="hint-taunt",l.textContent=t?.taunt??"「连这个都要问？它就在你手机里。」",n.insertBefore(l,a)}i<e.length&&(a.textContent=`【线索 ${i+1}/${e.length}】${e[i]}`,a.classList.add("show"),i++),i>=e.length&&(o.disabled=!0,o.textContent="线索已全部给出")}),n.append(o,a),n}class Ge{constructor(t,n,o={}){this.idx=0,this.timer=null,this.done=!1,this.el=t,this.text=n,this.opts=o,this.el.textContent="",this.clickHandler=()=>this.skip(),this.el.addEventListener("click",this.clickHandler),this.type()}type(){if(this.idx>=this.text.length){this.finish();return}const t=this.text[this.idx];this.el.textContent+=t,this.idx++,this.opts.audio&&!this.isPunct(t)&&Ie();let n=this.opts.speed??34;this.isLongPunct(t)?n=300:this.isPunct(t)&&(n=150),this.timer=window.setTimeout(()=>this.type(),n)}isPunct(t){return/[，。！？、；：……"”】—…\s]/.test(t)}isLongPunct(t){return/[。！？……—]/.test(t)}skip(){this.timer&&clearTimeout(this.timer),this.done||(this.el.textContent=this.text,this.idx=this.text.length,this.finish())}finish(){this.done||(this.done=!0,this.timer&&clearTimeout(this.timer),this.el.removeEventListener("click",this.clickHandler),this.opts.onDone?.())}isDone(){return this.done}destroy(){this.timer&&clearTimeout(this.timer),this.el.removeEventListener("click",this.clickHandler)}}const fn={p_home:"city",p_lin_cake:"cake",p_lin_window:"window",p_hallway:"hallway",p_hallway_orig:"hallway_orig",p_crash:"accident",p_room:"room",p_nightout:"city",p_wall:"wallpaper",p_333:"anomaly"};function pn(e){return fn[e]??"city"}function z(e,t,n,o){const a=e.createLinearGradient(0,0,0,n);for(const[i,s]of o)a.addColorStop(i,s);e.fillStyle=a,e.fillRect(0,0,t,n)}function C(e,t,n,o,a,i=1){const s=e.createRadialGradient(t,n,0,t,n,o);s.addColorStop(0,a),s.addColorStop(1,a.replace(/[\d.]+\)$/,"0)")),e.globalAlpha=i,e.fillStyle=s,e.beginPath(),e.arc(t,n,o,0,Math.PI*2),e.fill(),e.globalAlpha=1}function gn(e,t,n,o,a,i,s){for(let l=0;l<o;l++){const r=Math.random()*t,c=Math.random()*n,u=i+Math.random()*(s-i);C(e,r,c,u,a,.25+Math.random()*.3)}}function bn(e,t,n,o=.32){for(let a=0;a<t*n*.03;a++)e.fillStyle=`rgba(255,255,255,${Math.random()*o*.06})`,e.fillRect(Math.random()*t,Math.random()*n,1.1,1.1),e.fillStyle=`rgba(0,0,0,${Math.random()*o*.06})`,e.fillRect(Math.random()*t,Math.random()*n,1.1,1.1)}function hn(e,t,n,o=.5){const a=e.createRadialGradient(t/2,n/2,n*.3,t/2,n/2,n*.95);a.addColorStop(0,"rgba(0,0,0,0)"),a.addColorStop(1,`rgba(0,0,0,${o})`),e.fillStyle=a,e.fillRect(0,0,t,n)}function Q(e,t,n,o,a){e.fillStyle=o,e.globalAlpha=a,e.fillRect(0,0,t,n),e.globalAlpha=1}function Fe(e,t,n,o,a,i,s){e.globalAlpha=.14,e.fillStyle=s,e.beginPath(),e.ellipse(o,a,i,4,.25,0,Math.PI*2),e.fill(),e.globalAlpha=1}function vn(e,t,n){z(e,t,n,[[0,"#241a20"],[.6,"#19131a"],[1,"#0d0a10"]]);const o=t*.62,a=n*.12,i=t*.3,s=n*.4;z(e,0,0,[[0,"#0a0e1a"],[1,"#0a0e1a"]]),e.fillStyle="#0b1020",e.fillRect(o-10,a-10,i+20,s+20);const l=e.createRadialGradient(o+i*.4,a+s*.35,2,o+i*.4,a+s*.35,30);l.addColorStop(0,"rgba(200,215,240,0.9)"),l.addColorStop(1,"rgba(160,175,210,0)"),e.fillStyle=l,e.fillRect(o-20,a-20,i+40,s+40),e.strokeStyle="#0b1020",e.lineWidth=6,e.strokeRect(o,a,i,s),e.beginPath(),e.moveTo(o+i/2,a),e.lineTo(o+i/2,a+s),e.stroke();const r=t*.34,c=n*.6;C(e,r,c-30,130,"rgba(255,190,120,0.5)",.8),C(e,r,c-30,60,"rgba(255,220,160,0.5)",.9);for(let h=-2;h<=2;h++){const b=r+h*11;e.fillStyle="rgba(255,244,225,0.95)",e.fillRect(b-1.2,c-52,2.4,9),C(e,b,c-58,16,"rgba(255,210,130,0.85)")}const u=e.createLinearGradient(0,c-44,0,c+8);u.addColorStop(0,"#b07058"),u.addColorStop(1,"#7c4638"),e.fillStyle=u,e.beginPath(),e.moveTo(r-40,c-44),e.lineTo(r+40,c-44),e.lineTo(r+40,c),e.lineTo(r-40,c),e.closePath(),e.fill(),e.fillStyle="rgba(255,255,255,0.85)",e.fillRect(r-40,c-4,80,5);const f=e.createLinearGradient(0,c,0,n);f.addColorStop(0,"#1c1418"),f.addColorStop(1,"#0e0a0d"),e.fillStyle=f,e.fillRect(0,c,t,n-c),e.fillStyle="rgba(20,14,16,0.9)",e.fillRect(t*.78,c+6,54,5),e.fillRect(t*.13,c+12,40,4),gn(e,t,n,26,"rgba(255,180,110,0.5)",3,14),Q(e,t,n,"rgba(255,150,90,0.06)",1),Fe(e,t,n,r,c-40,90,"rgba(255,200,140,0.5)")}function yn(e,t,n){z(e,t,n,[[0,"#0d1526"],[.55,"#16233a"],[1,"#0c1120"]]);const o=t*.1,a=n*.08,i=t*.8,s=n*.62,l=e.createLinearGradient(0,a,0,a+s);l.addColorStop(0,"rgba(235,238,246,0.95)"),l.addColorStop(.5,"rgba(205,214,232,0.85)"),l.addColorStop(1,"rgba(150,166,196,0.6)"),e.fillStyle=l,e.fillRect(o,a,i,s),e.globalAlpha=.5,e.fillStyle="rgba(255,255,255,0.5)";for(let c=0;c<12;c++){const u=o+Math.random()*i,f=a+Math.random()*s*.8;e.beginPath(),e.ellipse(u,f,60+Math.random()*90,16+Math.random()*12,0,0,Math.PI*2),e.fill()}e.globalAlpha=1,e.fillStyle="#0a0e1a",e.fillRect(o-14,a-14,i+28,s+28),e.fillStyle="#0c1120",e.fillRect(o,a,i,s);const r=e.createLinearGradient(0,a,0,a+s);r.addColorStop(0,"rgba(235,238,246,0.95)"),r.addColorStop(1,"rgba(160,176,206,0.7)"),e.fillStyle=r,e.fillRect(o,a,i,s),e.strokeStyle="#0c1120",e.lineWidth=10,e.strokeRect(o,a,i,s),e.beginPath(),e.moveTo(t/2,a),e.lineTo(t/2,a+s),e.moveTo(o,a+s/2),e.lineTo(o+i,a+s/2),e.stroke(),C(e,t*.5,a+s*.5,120,"rgba(230,235,245,0.5)",.6),e.fillStyle="#0a0d18",e.beginPath(),e.arc(t*.5,a+s-2,30,0,Math.PI*2),e.fill(),e.beginPath(),e.moveTo(t*.5-44,a+s+6),e.quadraticCurveTo(t*.5,a+s-40,t*.5+44,a+s+6),e.closePath(),e.fill(),e.fillStyle="#0a0d18",e.fillRect(0,a+s,t,n-(a+s)),e.fillStyle="#131a2c",e.fillRect(o-20,a+s,i+40,10)}function Qe(e,t,n){z(e,t,n,[[0,"#0a1220"],[.6,"#101a2e"],[1,"#0d1526"]]),C(e,t*.74,n*.2,40,"rgba(220,230,250,0.7)"),C(e,t*.74,n*.2,14,"rgba(240,245,255,0.95)"),e.fillStyle="#0b1322";let o=-10;for(;o<t;){const i=26+Math.random()*46,s=n*(.12+Math.random()*.2);e.fillRect(o,n*.68-s,i,s+n*.32),o+=i+1}e.fillStyle="#0e1728";let a=n*.6;for(;o>-t;){const i=18+Math.random()*30;e.fillRect(o-i,a,i,n-a),o-=i+1}e.fillStyle="rgba(255,214,150,0.55)";for(let i=0;i<80;i++){const s=Math.random()*t,l=n*.3+Math.random()*n*.36;e.fillRect(s,l,2,3)}e.fillStyle="rgba(160,180,215,0.4)";for(let i=0;i<40;i++)e.fillRect(Math.random()*t,Math.random()*n*.3,2,3);for(let i=0;i<14;i++)C(e,Math.random()*t,n*.3+Math.random()*n*.4,3+Math.random()*5,"rgba(255,200,120,0.4)");e.strokeStyle="rgba(180,200,230,0.12)",e.lineWidth=1;for(let i=0;i<40;i++){const s=Math.random()*t,l=Math.random()*n;e.beginPath(),e.moveTo(s,l),e.lineTo(s-3,l+12),e.stroke()}Q(e,t,n,"rgba(120,160,230,0.05)",1),Fe(e,t,n,t*.74,n*.2,120,"rgba(210,225,250,0.4)")}function ut(e,t,n,o){const a=t*.15,i=n*.58,s=t*.1,l=n*.14;e.fillStyle="rgba(18,24,38,0.92)",e.fillRect(a-s/2,i,s,l),e.fillStyle="rgba(12,16,28,0.92)",e.fillRect(a-s/2+3,i+l-3,3,9),e.fillRect(a+s/2-6,i+l-3,3,9),e.fillStyle="rgba(0,0,0,0.35)",e.fillRect(a-s/2-2,i+l+4,s+4,4),o&&(e.fillStyle="rgba(150,165,200,0.32)",e.fillRect(a-4,i-12,8,12),e.beginPath(),e.arc(a+6,i-8,3,0,Math.PI*2),e.fill(),e.fillStyle="rgba(205,220,250,0.16)",e.fillRect(a-2,i-12,4,12))}function mt(e,t,n,o){const a=t*.64,i=n*.14,s=t*.2,l=n*.34;if(o){const r=e.createLinearGradient(a,0,a+s,0);r.addColorStop(0,"rgba(8,10,16,0.95)"),r.addColorStop(.5,"rgba(16,20,30,0.95)"),r.addColorStop(1,"rgba(8,10,16,0.95)"),e.fillStyle=r,e.fillRect(a,i,s,l),e.strokeStyle="rgba(120,135,170,0.12)",e.lineWidth=1;for(let c=1;c<4;c++)e.beginPath(),e.moveTo(a+s/4*c,i),e.lineTo(a+s/4*c,i+l),e.stroke();e.strokeStyle="rgba(150,165,200,0.2)",e.lineWidth=2,e.strokeRect(a,i,s,l)}else{const r=e.createLinearGradient(0,i,0,i+l);r.addColorStop(0,"rgba(150,165,200,0.22)"),r.addColorStop(1,"rgba(100,120,165,0.12)"),e.fillStyle=r,e.fillRect(a,i,s,l),e.fillStyle="rgba(6,8,14,0.9)",e.fillRect(a-4,i,6,l),e.fillRect(a+s-2,i,6,l),e.strokeStyle="rgba(170,185,215,0.25)",e.lineWidth=1.5,e.strokeRect(a,i,s,l),e.beginPath(),e.moveTo(a+s/2,i),e.lineTo(a+s/2,i+l),e.stroke()}}function _n(e,t,n){z(e,t,n,[[0,"#0a0e18"],[1,"#080b12"]]);const o=t*.5,a=n*.34,i=e.createLinearGradient(0,0,0,a);i.addColorStop(0,"#0b0f1a"),i.addColorStop(1,"#0a0d16"),e.fillStyle=i,e.fillRect(0,0,t,a);const s=e.createLinearGradient(0,a,0,n);s.addColorStop(0,"#101524"),s.addColorStop(.6,"#0d111c"),s.addColorStop(1,"#0a0d14"),e.fillStyle=s,e.fillRect(0,a,t,n-a),e.strokeStyle="rgba(150,165,200,0.08)",e.lineWidth=1;for(let c=0;c<10;c++)e.beginPath(),e.moveTo(c*(t/10),n),e.lineTo(o,a),e.stroke();e.strokeStyle="rgba(150,165,200,0.05)",e.beginPath(),e.moveTo(0,a),e.lineTo(t,a),e.stroke(),C(e,o,a+14,56,"rgba(200,210,235,0.4)"),C(e,o,a,26,"rgba(220,228,248,0.55)"),e.fillStyle="rgba(215,223,245,0.6)",e.fillRect(o-1.5,a-52,3,72),e.fillStyle="rgba(150,160,190,0.1)",e.fillRect(o-22,a-42,44,64),e.fillStyle="rgba(215,223,245,0.35)",e.fillRect(o-5,a-42,7,64),e.strokeStyle="rgba(170,180,205,0.2)",e.lineWidth=2,e.strokeRect(o-22,a-42,44,64),e.fillStyle="rgba(190,200,225,0.3)",e.fillRect(o+10,a-8,3,9),e.fillStyle="rgba(5,6,10,0.85)",e.beginPath(),e.arc(o+2,a+18,7,0,Math.PI*2),e.fill(),e.fillRect(o-4,a+20,13,34),ut(e,t,n,!0),mt(e,t,n,!0);const l=e.createLinearGradient(0,0,t*.18,0);l.addColorStop(0,"rgba(0,0,0,0.45)"),l.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=l,e.fillRect(0,0,t*.18,n);const r=e.createLinearGradient(t,0,t*.82,0);r.addColorStop(0,"rgba(0,0,0,0.45)"),r.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=r,e.fillRect(t*.82,0,t*.18,n),e.fillStyle="rgba(10,12,18,0.7)",e.fillRect(0,a*.92,t*.13,n),e.fillRect(t*.87,a*.92,t*.13,n),e.fillStyle="rgba(0,0,0,0.5)",e.beginPath(),e.moveTo(0,a),e.lineTo(t*.1,a*.75),e.lineTo(t*.16,a),e.closePath(),e.fill();for(let c=1;c<6;c++){const u=o+(o-t*.2)*c*.09,f=a-(a-0)*c*.09;C(e,u,f,5,"rgba(160,170,200,0.2)")}Q(e,t,n,"rgba(60,90,160,0.04)",1)}function Cn(e,t,n){z(e,t,n,[[0,"#05070d"],[1,"#0a0e18"]]),e.fillStyle="#0a0d15",e.fillRect(0,n*.58,t,n*.42);const o=e.createLinearGradient(0,n*.6,0,n);o.addColorStop(0,"rgba(20,26,40,0.9)"),o.addColorStop(1,"rgba(8,10,16,0.9)"),e.fillStyle=o,e.fillRect(0,n*.6,t,n*.4),C(e,t*.2,n*.52,5,"rgba(255,210,150,0.5)"),C(e,t*.3,n*.5,4,"rgba(255,210,150,0.4)"),C(e,t*.82,n*.53,6,"rgba(255,190,120,0.5)"),e.fillStyle="#0c111c",e.save(),e.translate(t*.62,n*.6),e.rotate(.16),e.fillRect(-70,-30,150,46),e.fillRect(-30,-30,40,-24),e.restore(),C(e,t*.55,n*.55,26,"rgba(255,120,90,0.5)"),C(e,t*.55,n*.55,8,"rgba(255,160,120,0.7)");const a=e.createLinearGradient(0,n*.6,0,n*.8);a.addColorStop(0,"rgba(200,60,50,0.25)"),a.addColorStop(1,"rgba(200,60,50,0)"),e.fillStyle=a,e.fillRect(t*.3,n*.6,t*.4,n*.2),C(e,t*.88,n*.5,18,"rgba(255,120,110,0.4)"),C(e,t*.88,n*.5,8,"rgba(140,160,255,0.4)"),e.strokeStyle="rgba(190,210,235,0.15)",e.lineWidth=1;for(let i=0;i<70;i++){const s=Math.random()*t,l=Math.random()*n;e.beginPath(),e.moveTo(s,l),e.lineTo(s-4,l+16),e.stroke()}Q(e,t,n,"rgba(120,60,70,0.06)",1)}function wn(e,t,n){z(e,t,n,[[0,"#0b0f18"],[1,"#0d111a"]]),e.fillStyle="#0b0f18",e.fillRect(0,0,t,n*.72);const o=e.createLinearGradient(0,n*.72,0,n);o.addColorStop(0,"#10141e"),o.addColorStop(1,"#0a0d14"),e.fillStyle=o,e.fillRect(0,n*.72,t,n*.28),e.strokeStyle="rgba(150,165,195,0.06)";for(let u=0;u<6;u++)e.beginPath(),e.moveTo(0,n*.72+u*n*.28/6),e.lineTo(t,n*.72+u*n*.28/6),e.stroke();const a=t*.32,i=n*.16,s=t*.36,l=n*.4;C(e,a+s/2,i+l/2,s,"rgba(180,195,230,0.5)");const r=e.createLinearGradient(0,i,0,i+l);r.addColorStop(0,"rgba(200,212,238,0.85)"),r.addColorStop(1,"rgba(150,168,205,0.7)"),e.fillStyle=r,e.fillRect(a,i,s,l),e.strokeStyle="#0b0f18",e.lineWidth=5,e.strokeRect(a,i,s,l),e.beginPath(),e.moveTo(a+s/2,i),e.lineTo(a+s/2,i+l),e.moveTo(a,i+l/2),e.lineTo(a+s,i+l/2),e.stroke();const c=e.createLinearGradient(a,i,a+80,n);c.addColorStop(0,"rgba(200,212,238,0.16)"),c.addColorStop(1,"rgba(200,212,238,0.02)"),e.fillStyle=c,e.beginPath(),e.moveTo(a,i+l),e.lineTo(a+s,i+l),e.lineTo(a+s+90,n),e.lineTo(a-40,n),e.closePath(),e.fill(),e.fillStyle="rgba(0,0,0,0.5)",e.beginPath(),e.ellipse(t*.58,n*.86,34,9,0,0,Math.PI*2),e.fill(),e.fillStyle="rgba(16,20,28,0.9)",e.fillRect(t*.14,n*.6,4,n*.16),e.fillRect(t*.14+16,n*.6,4,n*.16),e.fillRect(t*.1,n*.6,24,4),e.fillRect(t*.12,n*.47,3,n*.13),Q(e,t,n,"rgba(120,150,210,0.04)",1)}function En(e,t,n){z(e,t,n,[[0,"#0e1320"],[1,"#0b0f18"]]);const o=t*.5,a=n*.36,i=e.createLinearGradient(0,0,0,a);i.addColorStop(0,"#101525"),i.addColorStop(1,"#0d121e"),e.fillStyle=i,e.fillRect(0,0,t,a);const s=e.createLinearGradient(0,a,0,n);s.addColorStop(0,"#121828"),s.addColorStop(1,"#0c101a"),e.fillStyle=s,e.fillRect(0,a,t,n-a),e.strokeStyle="rgba(160,175,210,0.09)",e.lineWidth=1;for(let l=0;l<10;l++)e.beginPath(),e.moveTo(l*(t/10),n),e.lineTo(o,a),e.stroke();C(e,o,a+10,22,"rgba(160,172,200,0.12)"),e.fillStyle="rgba(150,162,190,0.14)",e.fillRect(o-22,a-42,44,64),e.strokeStyle="rgba(170,182,210,0.22)",e.lineWidth=2,e.strokeRect(o-22,a-42,44,64),e.fillStyle="rgba(180,192,220,0.3)",e.fillRect(o+10,a-8,3,9),ut(e,t,n,!1),mt(e,t,n,!1),e.fillStyle="rgba(12,15,24,0.7)",e.fillRect(0,a*.92,t*.13,n),e.fillRect(t*.87,a*.92,t*.13,n),Q(e,t,n,"rgba(80,110,180,0.03)",1)}function kn(e,t,n){z(e,t,n,[[0,"#080a10"],[1,"#0a0d14"]]),e.fillStyle="#090b12",e.fillRect(0,0,t,n*.7);const o=e.createLinearGradient(0,n*.7,0,n);o.addColorStop(0,"#0e121c"),o.addColorStop(1,"#080a10"),e.fillStyle=o,e.fillRect(0,n*.7,t,n*.3);const a=t*.3,i=n*.14,s=t*.4,l=n*.36;C(e,a+s/2,i+l/2,s*.8,"rgba(160,175,210,0.5)");const r=e.createLinearGradient(0,i,0,i+l);r.addColorStop(0,"rgba(150,165,200,0.5)"),r.addColorStop(1,"rgba(110,130,175,0.35)"),e.fillStyle=r,e.fillRect(a,i,s,l),e.strokeStyle="#090b12",e.lineWidth=5,e.strokeRect(a,i,s,l),e.beginPath(),e.moveTo(a+s/2,i),e.lineTo(a+s/2,i+l),e.stroke(),e.fillStyle="rgba(5,6,9,0.95)",e.beginPath(),e.arc(a+s/2,i+l-4,13,0,Math.PI*2),e.fill(),e.beginPath(),e.moveTo(a+s/2-20,i+l+2),e.quadraticCurveTo(a+s/2,i+l-22,a+s/2+20,i+l+2),e.closePath(),e.fill(),e.fillStyle="rgba(170,185,215,0.25)",e.fillRect(t*.24,n*.5,14,20),e.fillRect(t*.235,n*.47,17,4),e.fillStyle="rgba(0,0,0,0.5)",e.beginPath(),e.moveTo(a+s/2,i+l),e.lineTo(a+s/2+80,n),e.lineTo(a+s/2-10,n),e.closePath(),e.fill(),Q(e,t,n,"rgba(90,110,170,0.06)",1)}function Sn(e,t,n){z(e,t,n,[[0,"#05070d"],[1,"#0a0f1a"]]);for(let a=0;a<220;a++)e.fillStyle=`rgba(190,205,235,${.02+Math.random()*.05})`,e.fillRect(Math.random()*t,Math.random()*n,1.3,1.3);const o=e.createRadialGradient(t/2,n/2,10,t/2,n/2,n*.6);o.addColorStop(0,"rgba(110,168,255,0.06)"),o.addColorStop(1,"rgba(110,168,255,0)"),e.fillStyle=o,e.fillRect(0,0,t,n),Fe(e,t,n,t*.5,n*.4,200,"rgba(150,180,230,0.12)")}function Tn(e,t,n,o){switch(e){case"cake":vn(t,n,o);break;case"window":yn(t,n,o);break;case"city":Qe(t,n,o);break;case"hallway":_n(t,n,o);break;case"hallway_orig":En(t,n,o);break;case"anomaly":kn(t,n,o);break;case"accident":Cn(t,n,o);break;case"room":wn(t,n,o);break;case"wallpaper":Sn(t,n,o);break;default:Qe(t,n,o)}}function _e(e,t){const n=document.createElement("div");if(n.className="art-photo",t){const o=new Image;o.src=t,o.alt="",o.className="art-photo-img",o.onload=()=>{n.classList.add("art-loaded")},o.onerror=()=>{n.replaceChildren(Se(e))},n.appendChild(o);const a=Se(e);return n.appendChild(a),o.onload=()=>{n.querySelector(".art-proc")?.remove()},n}return n.appendChild(Se(e)),n}function Se(e){const t=document.createElement("canvas");t.className="art-proc";const n=800,o=600;t.width=n,t.height=o;const a=t.getContext("2d");return Tn(pn(e),a,n,o),bn(a,n,o,.3),hn(a,n,o,.45),t}const Nn=[{id:"p_home",title:"壁纸",date:"2026-08-01",caption:"随手拍的夜晚",real:"assets/photos/p_home.jpg"},{id:"p_lin_cake",title:"她的生日",date:"2025-04-18",caption:"四月。那天她吹蜡烛前说，下辈子还要一起过生日。",real:"assets/photos/p_lin_cake.jpg",evidence:"e_birthday"},{id:"p_lin_window",title:"窗边",date:"2025-06-02",caption:"她说看云能减压，我不信，跟着她看了一下午。",real:"assets/photos/p_lin_window.jpg"},{id:"p_nightout",title:"那晚",date:"2025-11-06",caption:"聚餐。她说雨大，让我别开车……",real:"assets/photos/p_nightout.jpg",evidence:"e_nightout"},{id:"p_hallway",title:"它发来的照片",date:"现在",caption:"……门缝里，好像有人。",real:"assets/photos/p_hallway.jpg",pair:"p_hallway_orig",diffZones:[{id:"figure",rect:[.4,.24,.6,.46]},{id:"cup",rect:[.07,.54,.24,.78]},{id:"curtain",rect:[.6,.16,.9,.52]}]},{id:"p_hallway_orig",title:"走廊",date:"去年 11 月 5 日",caption:"这张才是你自己拍的。那天走廊很干净。",real:"assets/photos/p_hallway_orig.jpg"},{id:"p_crash",title:"现场",date:"2025-11-06 23:41",caption:"新闻截图。雨夜，一辆车冲下护栏。",real:"assets/photos/p_crash.jpg"},{id:"p_room",title:"空房间",date:"2025-11-07",caption:"收拾东西那天拍的。她不在，房间就空了。",real:"assets/photos/p_room.jpg",shifting:!0,evidence:"e_room"},{id:"p_333",title:"？",date:"？？？？",caption:"这张照片，你从来没有拍过。",real:"assets/photos/p_333.jpg",evidence:"e_333"}],Ln=[{id:"n_onboarding",title:"待办",date:"2026-08-10",body:`· 给妈妈回电话
· 交水电费
· 买洗衣液
· 明天上午开会
· 别想太多`},{id:"n_lin_remind",title:"备忘",date:"2025-11-06",body:`· 晚上给她回电话
· 她说要给我看个东西
· 别忘了，她容易生气
· 九点前到家`},{id:"n_lin_draft",title:"未发送的草稿",date:"2025-11-07 00:12",body:`我错了。

对不起。

如果那天我没碰手机……`,evidence:"e_lin_draft"},{id:"n_dinner",title:"—",date:"2025-06-02",body:"她说想吃那家川菜。6 月 7 号去。"},{id:"n_secret",title:"—",date:"2025-04-18",body:`4.18

是我们的日子。
她让我别忘。
我不会忘。`,secret:"……她说：如果你有一天不在了，也要替她，好好活下去。"},{id:"n_zhou",title:"—",date:"2026-08-10",body:"周凯：周六出来喝酒，哥几个都到。别一个人闷着。"},{id:"n_wrong",title:"？？",date:"????",body:`别信手机。

它不是你。
它在骗你。
别信手机。别信手机。别信手机。`,glitched:!0,evidence:"e_note_wrong"},{id:"n_right",title:"？",date:"????",body:`别信自己。

你忘了很多事。
记得开车那晚吗。
你手机里，真的有那么多未读吗。`,glitched:!0,evidence:"e_note_wrong"}],Rn=[{id:"c_zhou_1",who:"周凯",when:"2026-08-10 21:03",dir:"in",dur:"12:47"},{id:"c_mom_1",who:"妈妈",when:"2026-08-09 19:52",dir:"missed",dur:"—"},{id:"c_self",who:"未知号码",when:"2026-08-11 00:04",dir:"out",dur:"00:03",evidence:"e_call_self"},{id:"c_lin_1",who:"林晚",when:"2025-11-06 23:38",dir:"in",dur:"00:31"},{id:"c_lin_last",who:"林晚",when:"2025-11-06 23:41",dir:"missed",dur:"—",evidence:"e_lin_last"}],An={e_birthday:{id:"e_birthday",title:"她的生日蛋糕照",note:"2025-04-18。你留着它，是不敢忘。",icon:"🎂"},e_hallway:{id:"e_hallway",title:"走廊照片（它发来的）",note:"门缝里多了一个人。你相册里没有这个人。",icon:"🖼️"},e_333:{id:"e_333",title:"3:33 的照片",note:"这张照片不是你拍的。它出现在你相册里，像一直就在。",icon:"🌑"},e_room:{id:"e_room",title:"空房间",note:"你数了三遍，房间里没有人。可你知道你看见了什么。",icon:"🚪"},e_call_self:{id:"e_call_self",title:"打给自己的电话",note:"通话记录里，凌晨 00:04，有一个打出去的号码——是你的号码。",icon:"📞"},e_note_wrong:{id:"e_note_wrong",title:"矛盾的备忘录",note:'一条说"别信手机"，一条说"别信自己"。你的手机里不该有这些字。',icon:"📝"},e_draft:{id:"e_draft",title:"草稿箱的定时短信",note:"每天 00:00 定时发送，发给你自己。你一年前设下的。",icon:"⏰"},e_lin_last:{id:"e_lin_last",title:"她最后一通电话",note:"2025-11-06 23:41，她打来，你未接。之后是那场雨。",icon:"📴"},e_nightout:{id:"e_nightout",title:"那晚的聚餐照",note:"2025-11-06。她说雨大，让你别开车。",icon:"🌧️"},e_lin_draft:{id:"e_lin_draft",title:"未发送的草稿",note:'"我错了。如果那天我没碰手机……" 你永远没有发出去。',icon:"✉️"}};function Mn(e){return An[e]}const ft=[{id:"t_party",label:"那晚的聚餐",sub:"她劝你：雨大，别开车。你没当回事。",when:"19:20",order:1},{id:"t_note",label:"你的备忘",sub:"「晚上给她回电话 · 九点前到家」",when:"17:10",order:2},{id:"t_call1",label:"她来电 · 31 秒",sub:"你在开车，接了。她说：雨好大，你慢点。",when:"23:38",order:3},{id:"t_call2",label:"她再来电 · 未接",sub:"第二通。你没接——你在回那条短信。",when:"23:41",order:4},{id:"t_msg",label:"她问你",sub:"「到家了吗？」亮在屏幕上。",when:"23:47",order:5},{id:"t_reply",label:"你回了",sub:"「马上到家，你等我」——一边开车，一边打字。",when:"23:52",order:6},{id:"t_fake1",label:"「未知号码」的短信",sub:"那晚，还没有这个号码。",when:"23:41",fake:!0},{id:"t_fake2",label:"第二天早上的闹钟",sub:"和那晚无关。",when:"07:00",fake:!0}];function Gn(){return ft.filter(e=>!e.fake).sort((e,t)=>e.order-t.order).map(e=>e.id)}function Ue(e){return Nn.find(t=>t.id===e)}function pt(e){return Ln.find(t=>t.id===e)}const Pn={1:{no:"壹",title:"第一夜"},2:{no:"贰",title:"第二夜"},3:{no:"叁",title:"第三夜"},4:{no:"肆",title:"真相"},5:{no:"伍",title:"最后一夜"}};let O=null,I=null,F=null,W=null,de=[],H=!1;function gt(){de=[]}function $n(e){e.innerHTML="",O=document.createElement("div"),O.className="scroll-area";const t=document.createElement("div");t.className="chat-top",t.innerHTML='<span class="chat-top-label">以下与「未知号码」的对话 · 仅你可见</span>',O.appendChild(t),I=document.createElement("div"),I.className="msg-list",O.appendChild(I),F=document.createElement("div"),F.className="typing-indicator",F.innerHTML='<span></span><span></span><span></span><span class="typing-txt">对方正在输入…</span>',F.style.display="none",O.appendChild(F),e.appendChild(O),W=document.createElement("div"),W.className="choices-area",e.appendChild(W)}function qn(){if(!I||H)return;I.innerHTML="";for(const t of de){const n=Me(t.nodeId);n&&t.asBubble&&Bn(t.nodeId,n.speaker??"narration",t.label??n.text)}fe();const e=Me(k().currentNode);e?.choices?.length&&!H&&ht(e.choices)}function fe(){O&&(O.scrollTop=O.scrollHeight)}async function x(e){if(H)return;const t=Me(e);if(!t){console.error(`[ui] 节点不存在: ${e}`);return}if(H=!0,vt(),It(e),ue(),t.chapterCard&&await _t(t.chapterCard.no),await ct(t.effects,St)){H=!1;return}if(t.speaker&&t.text&&await Vn(t),t.end){H=!1,Yn(t.end);return}if(t.next){const o=t.next;H=!1,window.setTimeout(()=>void x(o),420);return}t.choices?.length&&ht(t.choices),H=!1}async function Vn(e){const t=e.speaker??"narration",n=at(e.text);t==="number"&&Zt(),await Hn(e.id,t,n),S.updateStatus()}function Bn(e,t,n){const o=je(t,n);I.appendChild(o)}function Hn(e,t,n){return new Promise(o=>{t==="wang"&&D();const a=je(t,n);I.appendChild(a),de.push({nodeId:e,asBubble:!0});const i=a.querySelector(".bubble-text");t==="narration"?new Ge(i,n,{speed:20,audio:!1,onDone:()=>setTimeout(o,120)}):t==="system"?(i.textContent=n,setTimeout(o,200)):new Ge(i,n,{speed:30,audio:t!=="wang",onDone:()=>setTimeout(o,160)}),Dn()})}function je(e,t){const n=document.createElement("div");if(n.className="msg-row "+bt(e),e==="narration"||e==="system"){const s=document.createElement("div");s.className=e==="narration"?"narration":"system-note";const l=document.createElement("div");return l.className="bubble-text",l.textContent=t,s.appendChild(l),n.appendChild(s),n}const o=document.createElement("div");o.className="bubble bubble-"+e,e==="number"&&o.classList.add("bubble-mono");const a=document.createElement("div");a.className="bubble-text",a.textContent=t,o.appendChild(a);const i=document.createElement("div");return i.className="bubble-time",i.textContent=In(),o.appendChild(i),n.appendChild(o),n}function bt(e){return`msg-${e}`}function In(){const{time:e}=k();return`${String(Math.floor(e/60)).padStart(2,"0")}:${String(e%60).padStart(2,"0")}`}let Te=!1;function Dn(){Te||(Te=!0,requestAnimationFrame(()=>{fe(),Te=!1}))}function ht(e){if(!W)return;W.innerHTML="";let t=0;for(const n of e){if(!xt(n.cond))continue;t++;const o=document.createElement("button");o.className="choice-btn",o.textContent=n.label,o.addEventListener("click",()=>{H||zn(n)}),W.appendChild(o)}if(t===0){const n=document.createElement("div");n.className="system-note",n.textContent="……",W.appendChild(n)}}async function zn(e){if(H)return;for(const[a,i]of Object.entries(e.flags??{}))J(a,i);vt();let t=!1;if(e.effect&&(t=await ct(e.effect,St)),t)return;const n=e.label.startsWith("*"),o=n?e.label.slice(1):e.label;if(o.trim()){if(!n){const i=je("wang",o);I.appendChild(i),D(),de.push({nodeId:e.go,asBubble:!0,label:o});const s=i.querySelector(".bubble-text");s.textContent=o}else{const i=document.createElement("div");i.className="msg-row msg-system";const s=document.createElement("div");s.className="system-note",s.textContent=o,i.appendChild(s),I.appendChild(i),de.push({nodeId:e.go,asBubble:!1})}fe()}await x(e.go)}function vt(){W&&(W.innerHTML="")}async function On(){F&&(F.style.display="flex",fe(),await new Promise(e=>setTimeout(e,1400)),F.style.display="none")}function Ce(e){let t=document.querySelector(".fx-banner");t||(t=document.createElement("div"),t.className="fx-banner",document.getElementById("app")?.appendChild(t)),t.textContent=e,t.classList.remove("show"),t.offsetWidth,t.classList.add("show"),window.setTimeout(()=>t.classList.remove("show"),2600)}function yt(e){return new Promise(t=>{const n=Ue(e);if(!n){t();return}if(n.pair&&(n.diffZone||n.diffZones&&n.diffZones.length>0)){Wn(n,t);return}Ie();const o=document.getElementById("app"),a=document.createElement("div");a.className="photo-viewer";const i=document.createElement("div");i.className="photo-frame",i.appendChild(_e(e,n.real));let s=n.caption;if(e==="p_room"){const u=k().roomViewed;u>=3?s="你数了三遍。房间里没有人。可你知道，你看见了什么。":u===2&&(s="……窗边，好像站了个人？"),u>=2&&ze()}const l=document.createElement("div");l.className="photo-cap"+(e==="p_room"&&k().roomViewed>=2?" shifting":""),l.innerHTML=`<b>${n.title}</b> · ${n.date}<br><span>${s}</span>`,i.appendChild(l);const r=document.createElement("button");if(r.className="photo-close",r.textContent="关闭",a.appendChild(i),n.evidence){const u=document.createElement("button");u.className="collect-btn";const f=w(n.evidence);u.textContent=f?"已收证 ✓":"收证",u.disabled=f,u.addEventListener("click",()=>{oe(n.evidence),ue(),Ce("🔍 已收入证据册"),u.textContent="已收证 ✓",u.disabled=!0}),a.appendChild(u)}a.appendChild(r),o.appendChild(a);const c=()=>{a.classList.add("out"),setTimeout(()=>{a.remove(),t()},260)};r.addEventListener("click",c),a.addEventListener("click",u=>{u.target===a&&c()})})}function Wn(e,t){const n=Ue(e.pair),o=e.diffZones??(e.diffZone?[{id:"diff",rect:e.diffZone}]:[]),a=o.length,i=document.getElementById("app"),s=document.createElement("div");s.className="photo-viewer diff-viewer",s.innerHTML=`<div class="diff-head">这张照片，和你相册里的<u>不太一样</u>。找出 ${a} 处不同。</div>`;const l=document.createElement("div");l.className="photo-frame diff-frame";const r=document.createElement("div");r.className="diff-holder",r.appendChild(_e(e.id,e.real)),l.appendChild(r);const c=document.createElement("div");c.className="diff-bar";const u=document.createElement("button");u.className="diff-toggle",u.textContent="对照原图",c.appendChild(u),l.appendChild(c);const f=document.createElement("div");f.className="diff-hint",f.textContent="仔细看，有些地方不对劲。",l.appendChild(f),s.appendChild(l);const h=document.createElement("button");h.className="photo-close",h.textContent="关闭",s.appendChild(h),s.appendChild(We(["看那扇门。是不是……多了一个不该有的影子？","门对面的矮桌，和右侧的窗，再对照一次原图。","三处：门缝里的人影、矮桌上的杯子、被拉上的窗帘。"],{taunt:"「连这个都要问？它就在照片里。」"})),i.appendChild(s);let b=!1;const v=new Set,N=[],R=()=>{s.classList.add("out"),setTimeout(()=>{s.remove(),t()},260)},$=q=>{const M=document.createElement("div");M.className="diff-mark",M.style.left=`${q[0]*100}%`,M.style.top=`${q[1]*100}%`,M.style.width=`${(q[2]-q[0])*100}%`,M.style.height=`${(q[3]-q[1])*100}%`,r.appendChild(M),N.push(M)},j=q=>{const M=r.getBoundingClientRect(),Ye=(q.clientX-M.left)/M.width,Xe=(q.clientY-M.top)/M.height;if(b){f.textContent="这是你自己拍的原图。换回那张再看看。",f.classList.remove("good");return}let Je=!1;for(const pe of o){if(v.has(pe.id))continue;const[Rt,At,Mt,Gt]=pe.rect;if(Ye>=Rt&&Ye<=Mt&&Xe>=At&&Xe<=Gt){v.add(pe.id),$(pe.rect),Je=!0,D(),E.redFlash(220),f.classList.add("good"),v.size===a?(J("puzzle1Done",!0),oe("e_hallway"),ue(),h.disabled=!1,h.textContent="明白了 · 返回",f.textContent="全找到了。门缝里，多了一个人。"):f.textContent=`找到了。(${v.size}/${a})`;break}}Je||(f.textContent="不对。再看看，哪里多出来了什么。",f.classList.remove("good"),re(),E.shake(220),ke(-5),S.updateStatus())};r.addEventListener("pointerup",j),u.addEventListener("click",()=>{b=!b,r.replaceChildren(_e(b?n.id:e.id,b?n.real:e.real));for(const q of N)r.appendChild(q);u.textContent=b?"看它发来的那张":"对照原图"}),h.addEventListener("click",R)}function Fn(e){const t=Gn(),n=ft,o=t.map(()=>null),a=document.getElementById("app"),i=document.createElement("div");i.className="timeline-viewer";const s=document.createElement("div");s.className="tl-head",s.innerHTML='把那晚，按顺序拼出来。<br><span class="tl-sub">有些卡片不属于那晚。别放进去。</span>';const l=document.createElement("div");l.className="tl-slots";const r=document.createElement("div");r.className="tl-hint",r.textContent="点卡片放进时间槽；点时间槽取回。";const c=document.createElement("div");c.className="tl-pool";const u=()=>{l.innerHTML="",o.forEach((v,N)=>{const R=document.createElement("button");R.className="tl-slot"+(v?" filled":"");const $=n.find(j=>j.id===v);R.textContent=$?`${$.when} · ${$.label}`:`槽 ${N+1}`,R.addEventListener("click",()=>{v&&(o[N]=null,u(),f())}),l.appendChild(R)})},f=()=>{c.innerHTML="";for(const v of n){if(o.includes(v.id))continue;const N=document.createElement("button");N.className="tl-card"+(v.fake?" fake":""),N.innerHTML=`<span class="tl-when">${v.when}</span><b>${v.label}</b><small>${v.sub}</small>`,N.addEventListener("click",()=>{if(v.fake){r.textContent="这个……不属于那晚。",r.classList.remove("good"),U(),E.glitch(200);return}const R=o.findIndex($=>!$);R<0||(o[R]=v.id,u(),f(),h())}),c.appendChild(N)}},h=()=>{if(o.some(N=>!N))return;o.join("|")===t.join("|")?(r.textContent="你拼出了真相。",r.classList.add("good"),Ut(!0),ue(),D(),E.redFlash(260),window.setTimeout(()=>{i.classList.add("out"),window.setTimeout(()=>{i.remove(),e()},300)},900)):(r.textContent="有一处顺序不对。卡片会回到下面，再试一次。",r.classList.remove("good"),re(),E.shake(280),o.fill(null),u(),f())},b=document.createElement("button");b.className="tl-giveup",b.textContent="我拼不出来 · 放弃整理",b.addEventListener("click",()=>{i.classList.add("out"),window.setTimeout(()=>{i.remove(),e()},300)}),i.append(s,l,r,c),i.appendChild(We(["那晚从聚餐开始。她劝过你别开车。","她打了两通电话（一通接了、一通没接），然后是那条「到家了吗」。","顺序：聚餐→你的备忘→来电31秒→未接来电→她问你→你回「马上到家」。两条「未知号码」和闹钟是假的。"],{taunt:"「连顺序都拼不出来？你当时，可清醒得很。」"})),i.appendChild(b),a.appendChild(i),u(),f()}function _t(e){return new Promise(t=>{const n=Pn[e];if(!n){t();return}U();const o=document.getElementById("app"),a=document.createElement("div");a.className="chapter-card",a.innerHTML=`<div class="cc-no">第${n.no}章</div><div class="cc-title">《${n.title}》</div><div class="cc-hint">轻触继续</div>`,o.appendChild(a);let i=!1;const s=()=>{i||(i=!0,a.classList.add("out"),setTimeout(()=>{a.remove(),t()},500))};a.addEventListener("click",s),setTimeout(()=>{a.querySelector(".cc-hint")?.classList.add("blink")},1600)})}const Ct={};function Ze(e,t){Ct[e]=t}function Un(e){const t=Ct[e];if(!t){console.warn(`[ui] 来电流程不存在: ${e}`);return}lt();const n=document.getElementById("app"),o=document.createElement("div");o.className="call-ui",o.innerHTML=`
    <div class="call-avatar">${t.who==="未知号码"?"？":t.who[0]}</div>
    <div class="call-name">${t.who}</div>
    <div class="call-status">来电…</div>
    <div class="call-btns">
      <button class="call-btn decline">拒接</button>
      <button class="call-btn accept">接听</button>
    </div>
  `,n.appendChild(o);const a=i=>{o.remove(),Oe(),le("contact"),x(i)};o.querySelector(".decline").addEventListener("click",()=>{D(),a(t.onDecline)}),o.querySelector(".accept").addEventListener("click",()=>{D(),jn(o,t)})}function jn(e,t){e.querySelector(".call-status").textContent="通话中 · 00:0X";const n=e.querySelector(".call-btns");n.innerHTML='<button class="call-btn hangup">挂断</button>';let o=0;const a=document.createElement("div");a.className="call-body",e.insertBefore(a,n);const i=()=>{if(o>=t.lines.length)return;const l=t.lines[o];o++;const r=document.createElement("div");r.className="call-line "+bt(l.speaker),r.innerHTML=`<div class="bubble bubble-${l.speaker}"><div class="bubble-text"></div></div>`,a.appendChild(r);const c=r.querySelector(".bubble-text");new Ge(c,l.text,{speed:26,audio:!1,onDone:()=>setTimeout(i,420)}),l.speaker==="number"?be(l.text,{voice:"distorted"}):l.speaker==="mom"?be(l.text,{voice:"mom"}):be(l.text,{voice:"normal"})};i();const s=()=>{e.remove(),Oe(),D(),x(t.onAccept)};n.querySelector(".hangup").addEventListener("click",s)}let wt=null;function Zn(e){wt=e}function Et(){return wt}function Yn(e){let t=e.replace("ending:","");if(t==="resolve"){const o=Kt();t=dn(o,{newGamePlus:Ee().newGamePlus,allBaseUnlocked:Qt()})}dt(t)&&(Jt(t),Zn(t),De(),Oe(),window.dispatchEvent(new CustomEvent("game:end",{detail:t}))),A.show("ending")}function kt(){Jn(),gt(),it(),He(),me(0),A.show("chat"),x("p1s1")}function Xn(){it(),He(),me(k().chapter),gt(),A.show("chat"),x(k().currentNode)}function Jn(){Ve()}const St={sfx(e){switch(e){case"msg_num":le("number");break;case"msg_con":le("contact");break;case"msg_lin":le("lin");break;case"send":D();break;case"ring":lt();break;case"sting":U();break;case"breath":ze();break}},sting(){U(),E.redFlash()},stinglong(){U(),E.redFlash(60),E.glitch(500)},glitch(e){E.glitch(e)},noise(e){E.setNoise(e)},shake(e){E.shake(e)},time(e){Dt(e),S.updateStatus()},chapter(e){Ht(e),me(e),S.updateStatus()},photo(e){qt(e),S.refreshScreens()},photoOpen(e){yt(e)},note(e){$t(e),S.refreshScreens()},contact(e){Vt(e),S.refreshScreens()},calllog(e){Bt(e),S.refreshScreens()},banner(e){Ce(e)},screen(e){A.show(e)},call(e){Un(e)},async typing(){await On()},flag(e){J(e,!0)},count(e){ve(e)},async card(e){await _t(e)},heart(e){e?sn():De()},ambient(e){e?He():on()},noteopen(e){const t=pt(e);t&&S.showNoteView(t.body)},drafts(){J("draftsVisible",!0)},flicker(e){E.glitch(e??600);const t=document.querySelector(".phone-screen");t&&(t.classList.add("fx-flicker"),window.setTimeout(()=>t.classList.remove("fx-flicker"),(e??600)+200))},revoke(){xn()},wallChange(e){J("wallChanged",e),S.refreshScreens()},silenceDrop(){cn()},presence(){const e=document.querySelector(".st-left");e&&(e.textContent="00:00",e.classList.add("presence-glitch"),window.setTimeout(()=>{S.updateStatus(),e.classList.remove("presence-glitch")},1800))},voice(e){be(e,{voice:"distorted"})},evidence(e){oe(e),ue(),Ce("🔍 已收入证据册"),S.refreshScreens()},battery(e){ke(e),S.updateStatus()},scare(e){Tt(e)},clock(e){zt(e),S.updateStatus()},timed(e){Qn(e)},timeline(){return new Promise(e=>Fn(e))}},Kn={c333call:{prompt:`手机快没电了。门外传来敲门声。

你必须马上决定——`,seconds:6,options:[{label:"开门",node:"c3s13_open",flag:"openedDoor",count:"trait_truth"},{label:"不开门，盯着手机屏幕",node:"c3s13_phone",count:"trait_care"},{label:"关机，假装没人在家",node:"c3s13_hide",count:"trait_avoid",battery:4}],timeout:{label:"（你僵在原地，什么都没做）",node:"c3s13_timeout",battery:-25,scare:!0}}};function Qn(e){const t=Kn[e];if(!t){console.warn(`[timed] 未注册: ${e}`);return}ln();const n=document.getElementById("app"),o=document.createElement("div");o.className="timed-overlay";const a=document.createElement("div");a.className="timed-prompt",a.textContent=t.prompt;const i=document.createElement("div");i.className="timed-bar";const s=document.createElement("div");s.className="timed-fill",i.appendChild(s);const l=document.createElement("div");l.className="timed-btns";let r=!1;const c=b=>{b.flag&&J(b.flag,!0),b.count&&ve(b.count),b.battery&&ke(b.battery),S.updateStatus()},u=(b,v)=>{r||(r=!0,clearInterval(h),c(b),v&&Tt("flash"),o.classList.add("out"),window.setTimeout(()=>{o.remove(),D(),x(b.node)},300))};for(const b of t.options){const v=document.createElement("button");v.className="timed-opt",v.textContent=b.label,v.addEventListener("click",()=>u(b)),l.appendChild(v)}o.append(a,i,l),n.appendChild(o),requestAnimationFrame(()=>{s.style.width="0%"});const f=Date.now(),h=window.setInterval(()=>{Date.now()-f>=t.seconds*1e3&&(clearInterval(h),u(t.timeout,t.timeout.scare))},100)}function Tt(e){U(),E.glitch(500);const t=document.getElementById("app");if(!t)return;const n=document.createElement("div");n.className="scare-overlay",e==="photo"?(n.innerHTML='<div class="scare-figure"></div><div class="scare-label">它也在看你</div>',re()):(n.classList.add("flash"),re()),t.appendChild(n),window.setTimeout(()=>{n.classList.add("out"),window.setTimeout(()=>n.remove(),400)},620)}function xn(){const e=I?.querySelectorAll(".msg-row")??[],t=e[e.length-1];if(t){t.classList.add("revoked");const n=document.createElement("div");n.className="system-note revoke-note",n.textContent="⚠ 对方撤回了一条消息",t.after(n),fe()}}function ea(){const e=document.createElement("div");e.className="menu-screen";const t=Ee(),n=document.createElement("div");n.className="menu-title",n.innerHTML="午<b>夜</b>来讯";const o=document.createElement("div");o.className="menu-sub",o.textContent="—— 你收到了一条陌生短信 ——";const a=document.createElement("div");a.className="menu-btns";const i=Ne("开始新的一夜",()=>kt());if(a.appendChild(i),nt()){const c=Ne("继续上一夜",()=>Xn());a.appendChild(c)}const s=ye(),l=s.filter(c=>t.endings.includes(c.id)).length;if(l>0){const c=Ne(`结局画廊（${l}/${s.length}）`,()=>A.show("settings"));c.classList.add("ghost"),a.appendChild(c)}e.append(n,o,a);const r=document.createElement("div");if(r.className="menu-foot",r.innerHTML='<div class="menu-hint">深夜 00:00 · 陌生人发来短信<br>回复与否，都由你决定</div>',e.appendChild(r),t.newGamePlus){const c=document.createElement("div");c.className="menu-ghost",c.textContent="（草稿箱里，有一封不是你写的信）",e.appendChild(c),n.classList.add("ngp")}return e}function Ne(e,t){const n=document.createElement("button");return n.className="menu-btn",n.textContent=e,n.addEventListener("click",t),n}function ta(){const e=document.createElement("div");e.className="chat-screen";const t=document.createElement("div");return t.className="chat-container",e.appendChild(t),$n(t),requestAnimationFrame(()=>qn()),e}function na(){const e=document.createElement("div");e.className="notes-screen";const t=Nt();return e.appendChild(t),_a(n=>{e.isConnected&&Pe(e,n)}),e}function Nt(){const e=document.createElement("div");e.className="scroll-area notes-list";const{notes:t}=k();if(t.length===0){const n=document.createElement("div");return n.className="system-note",n.textContent="（没有备忘录）",e.appendChild(n),e}for(const n of t){const o=pt(n);if(!o)continue;const a=document.createElement("button");a.className="note-card"+(o.glitched?" glitched":"");const i=document.createElement("div");i.className="note-card-title",i.textContent=o.title||"无标题";const s=document.createElement("div");s.className="note-card-date",s.textContent=o.date;const l=document.createElement("div");l.className="note-card-preview",l.textContent=o.body.split(`
`).slice(0,2).join(" "),a.append(i,s,l);let r=!1;if(a.addEventListener("click",()=>{if(r){r=!1;return}const c=a.closest(".notes-screen");c&&Pe(c,o.body,o.evidence)}),o.secret){let c=null;a.addEventListener("pointerdown",()=>{c=window.setTimeout(()=>{r=!0,E.redFlash(300);const u=a.closest(".notes-screen");u&&Pe(u,o.body+`

（长按唤出）
`+o.secret,o.evidence)},900)}),a.addEventListener("pointerup",()=>{c&&clearTimeout(c)}),a.addEventListener("pointerleave",()=>{c&&clearTimeout(c)})}e.appendChild(a)}return e}function Pe(e,t,n){const o=document.createElement("div");o.className="note-view";const a=document.createElement("button");a.className="note-back",a.textContent="‹ 返回",a.addEventListener("click",()=>{e.replaceChildren(Nt())});const i=document.createElement("div");i.className="note-body",i.textContent=t;const s=document.createElement("div");if(s.className="note-date",s.textContent="编辑于某天",o.append(a,i,s),n){const l=document.createElement("button");l.className="collect-btn";const r=w(n);l.textContent=r?"已收证 ✓":"收证",l.disabled=r,l.addEventListener("click",()=>{oe(n),l.textContent="已收证 ✓",l.disabled=!0}),o.appendChild(l)}e.replaceChildren(o),t.includes("别信")&&E.glitch(350)}function aa(){const e=document.createElement("div");e.className="photos-screen";const t=document.createElement("div");t.className="scroll-area photo-grid";const{photos:n}=k();if(!!k().flags.night333&&Ot(213)&&!n.includes("p_333")&&n.push("p_333"),n.length===0){const a=document.createElement("div");a.className="system-note",a.textContent="（相册是空的）",t.appendChild(a)}for(const a of n){const i=Ue(a);if(!i)continue;const s=document.createElement("button");s.className="photo-cell";const l=document.createElement("div");l.className="photo-cell-inner";const r=!!k().flags.wallChanged;a==="p_home"&&r&&l.classList.add("wall-abnormal"),l.appendChild(_e(a,i.real)),s.appendChild(l);const c=document.createElement("div");c.className="photo-cell-cap",c.textContent=a==="p_home"&&r?"壁纸 ·（变灰了？）":i.title,s.appendChild(c),s.addEventListener("click",()=>{a==="p_room"&&(ve("roomViewed"),ze(),oa()),a==="p_333"&&(ve("anomalyViewed"),U()),yt(a)}),t.appendChild(s)}return e.appendChild(t),e}function oa(){const e=document.createElement("div");e.className="fx-flash",e.style.animationDuration="260ms",document.getElementById("app")?.appendChild(e),e.addEventListener("animationend",()=>e.remove())}function ia(){const{contacts:e}=k(),t={c_unknown:{id:"c_unknown",name:"未知号码",avatar:"？",phone:"+86 138-****-0404",note:"无备注 · 本机陌生来电",cold:!0},c_lin:{id:"c_lin",name:"林晚",avatar:"晚",phone:"+86 137-****-0918",note:"❤ 我的女孩 · 通话记录：去年十一月",cold:!0},c_zhou:{id:"c_zhou",name:"周凯",avatar:"凯",phone:"+86 139-****-7721",note:"同事 · 老骂我不出门"},c_doctor:{id:"c_doctor",name:"陈医生",avatar:"陈",phone:"010-****-6158",note:"心理门诊 · 周三下午"},c_mom:{id:"c_mom",name:"妈妈",avatar:"妈",phone:"+86 135-****-3302",note:"最近来电：8月9日（未接）"}},n=[],o=["c_unknown","c_lin","c_zhou","c_doctor","c_mom"];for(const a of o)e.includes(a)&&t[a]&&n.push(t[a]);return n}function sa(){const e=document.createElement("div");e.className="contacts-screen";const t=document.createElement("div");t.className="scroll-area contacts-list";const n=ia();if(n.length===0){const o=document.createElement("div");o.className="system-note",o.textContent="（通讯录是空的）",t.appendChild(o)}for(const o of n){const a=document.createElement("button");a.className="contact-row"+(o.cold?" cold":"");const i=document.createElement("div");i.className="contact-avatar",i.textContent=o.avatar;const s=document.createElement("div");s.className="contact-info";const l=document.createElement("div");l.className="contact-name",l.textContent=o.name;const r=document.createElement("div");r.className="contact-phone",r.textContent=o.phone;const c=document.createElement("div");c.className="contact-note",c.textContent=o.note??"",s.append(l,r,c),a.append(i,s),a.addEventListener("click",()=>{o.id==="c_unknown"?c.textContent="……这个号码，你越看越觉得眼熟。":o.id==="c_lin"&&(c.textContent="你点开又关上。她的头像，你不敢看太久。")}),t.appendChild(a)}return e.appendChild(t),e}function la(){const e=document.createElement("div");e.className="calls-screen";const t=document.createElement("div");t.className="scroll-area calls-list";const{calls:n}=k();if(n.length===0){const o=document.createElement("div");o.className="system-note",o.textContent="（暂无通话记录）",t.appendChild(o)}for(const o of n){const a=Rn.find(c=>c.id===o);if(!a)continue;const i=document.createElement("div");i.className="call-row";const s=document.createElement("span");s.className="call-dir",s.textContent=a.dir==="in"?"↓":a.dir==="out"?"↑":"☓",a.dir==="out"&&i.classList.add("self-out");const l=document.createElement("span");l.className="call-who",l.textContent=a.who;const r=document.createElement("span");if(r.className="call-when",r.textContent=`${a.when} · ${a.dur}`,i.append(s,l,r),a.evidence){const c=document.createElement("button");c.className="collect-btn";const u=w(a.evidence);c.textContent=u?"已收证 ✓":"收证",c.disabled=u,c.addEventListener("click",()=>{oe(a.evidence),c.textContent="已收证 ✓",c.disabled=!0}),i.appendChild(c)}t.appendChild(i)}return e.appendChild(t),e}const ca="1106",ra=[{to:"未知号码",when:"定时发送 · 每天 00:00",text:"还没睡？"},{to:"未知号码",when:"定时发送 · 每天 00:00",text:"今天在公司，我又把方案弄砸了。你以前会笑我。"},{to:"未知号码",when:"定时发送 · 每天 00:00",text:"林晚，对不起。"},{to:"未知号码",when:"定时发送 · 每天 00:00",text:"你看到我的未读了吗。"},{to:"林晚",when:"定时发送 · 每年 4 月 18 日",text:"生日快乐。要记得我。",sent:!0},{to:"林晚",when:"2025-11-06 23:52",text:"雨好大，我马上到家，你等我。",sent:!0}];function da(){const e=document.createElement("div");return e.className="drafts-screen",Pt("draftsUnlocked")||k().draftsUnlocked?e.appendChild(ma(()=>A.show("chat"))):e.appendChild(ua()),e}function ua(){const e=document.createElement("div");e.className="drafts-lock";const t=document.createElement("div");t.className="drafts-lock-icon",t.textContent="🔒";const n=document.createElement("div");n.className="drafts-lock-title",n.textContent="草稿箱已加密";const o=document.createElement("div");o.className="drafts-lock-hint",o.textContent=`输入 4 位数字密码。
（提示：先回答"那晚是哪一天"。相册、通话记录、备忘录里，都写着它。）`;const a=document.createElement("div");a.className="passcode";const i=document.createElement("div");i.className="passcode-dots";for(let f=0;f<4;f++){const h=document.createElement("span");h.className="dot",i.appendChild(h)}const s=document.createElement("div");s.className="passcode-keys";let l="",r=0;const c=()=>{i.querySelectorAll(".dot").forEach((f,h)=>f.classList.toggle("fill",h<l.length))},u=f=>{l.length>=4||(l+=f,Ie(),c(),l.length===4&&(l===ca?(D(),E.glitch(400),J("draftsUnlocked",!0),k().draftsUnlocked=!0,oe("e_draft"),A.show("drafts")):(U(),E.shake(260),re(),ke(-4),S.updateStatus(),l="",r++,r===3&&(Ce("「你在用谁的生日？她一定很失望。」"),E.glitch(500),o.textContent="（密码：那晚的雨，是哪一天？）"),window.setTimeout(c,180))))};for(const f of["1","2","3","4","5","6","7","8","9","C","0","⌫"]){const h=document.createElement("button");h.className="passcode-key",h.textContent=f,h.addEventListener("click",()=>{f==="C"?(l="",c()):f==="⌫"?(l=l.slice(0,-1),c()):u(f)}),s.appendChild(h)}return a.append(i,s),e.append(t,n,o,a),e.appendChild(We(["那晚是哪一天？想不起来就翻相册——有一张照片的日期，就是那晚。","那晚聚餐的照片，和最后一通未接来电，写的都是同一天。","密码 = 月在前、日在后。11 月 6 日 → 1106。"],{taunt:"「连密码都要问？你手机里全是答案。」"})),e}function ma(e){const t=document.createElement("div");t.className="scroll-area drafts-list";const n=document.createElement("div");n.className="drafts-success",n.innerHTML="🔓 <b>已解锁</b> —— 这些定时短信，全是你自己一年前设下的。",t.appendChild(n);for(const i of ra){const s=document.createElement("div");s.className="draft-row"+(i.sent?" sent":"");const l=document.createElement("div");l.className="draft-head",l.textContent=`发至：${i.to} · ${i.when}`;const r=document.createElement("div");if(r.className="draft-body",r.textContent=i.text,s.append(l,r),i.sent){const c=document.createElement("div");c.className="draft-tag",c.textContent="已发送",s.appendChild(c)}t.appendChild(s)}const o=document.createElement("div");o.className="system-note",o.textContent="（草稿箱的定时发送，最早的一条，是你出事前一周设置的。）",t.appendChild(o);const a=document.createElement("button");return a.className="menu-btn drafts-continue",a.textContent="我看完了 · 回到短信继续",a.addEventListener("click",e),t.appendChild(a),t}const fa={true:"真结局",good:"好结局",bad:"坏结局",hidden:"隐藏结局",silence:"隐藏结局"};function pa(){const e=document.createElement("div");e.className="settings-screen";const t=document.createElement("div");t.className="scroll-area";const n=en();t.appendChild(Le("音量"));for(const[s,l]of[["master","总音量"],["ambience","氛围声"],["sfx","音效"]]){const r=document.createElement("div");r.className="set-row";const c=document.createElement("span");c.className="set-label",c.textContent=l;const u=document.createElement("input");u.type="range",u.min="0",u.max="1",u.step="0.05",u.value=String(n[s]),u.addEventListener("input",()=>{tn({[s]:Number(u.value)})}),r.append(c,u),t.appendChild(r)}const o=Ee(),a=ye();if(t.appendChild(Le("结局画廊")),a.every(s=>!o.endings.includes(s.id))){const s=document.createElement("div");s.className="system-note",s.textContent="（尚未解锁任何结局）",t.appendChild(s)}else{const s=document.createElement("div");s.className="ending-gallery";for(const l of a){const r=o.endings.includes(l.id),c=document.createElement("button");c.className="gallery-card kind-"+l.kind+(r?"":" locked"),r?(c.innerHTML=`<b>${l.title}</b><span>${fa[l.kind]}</span>`,l.id===Et()&&c.classList.add("recent")):c.textContent="？",s.appendChild(c)}t.appendChild(s)}t.appendChild(Le("其他"));const i=document.createElement("button");return i.className="menu-btn ghost danger",i.textContent="清除全部存档与结局",i.addEventListener("click",()=>{confirm("确定要清空所有进度与结局吗？此操作不可撤销。")&&(Ve(),localStorage.removeItem("wywlx_meta_v1"),localStorage.removeItem("wywlx_audio"),location.reload())}),t.appendChild(i),e.appendChild(t),e}function Le(e){const t=document.createElement("div");return t.className="set-section",t.textContent=e,t}const ga={true:"真结局",good:"好结局",bad:"坏结局",hidden:"隐藏结局",silence:"隐藏结局"};function ba(){const e=document.createElement("div");e.className="ending-screen";const t=Et(),n=t?dt(t):void 0;if(!n)return e.innerHTML='<div class="system-note">（没有结局数据）</div>',e;const o=document.createElement("div");o.className="ending-kind kind-"+n.kind,o.textContent=ga[n.kind]??"结局";const a=document.createElement("div");a.className="ending-title",a.textContent=n.title;const i=document.createElement("div");i.className="ending-divider";const s=document.createElement("div");s.className="ending-body",s.textContent=at(n.text);const l=un();if(l){const R=document.createElement("div");R.className="ending-epilogue";const $=document.createElement("div");$.className="ending-epi-title",$.textContent="这一夜，你确实做了这些事";const j=document.createElement("div");j.className="ending-epi-body",j.innerHTML=l.replace(/\n/g,"<br>"),R.append($,j),e.insertBefore(R,s.nextSibling)}const r=Ee(),c=ye().length,u=ye().filter(R=>r.endings.includes(R.id)).length,f=document.createElement("div");f.className="ending-progress",f.textContent=`已解锁结局 ${u} / ${c}`;const h=document.createElement("div");h.className="ending-btns";const b=document.createElement("button");b.className="menu-btn ghost",b.textContent="回到主菜单",b.addEventListener("click",()=>A.show("menu"));const v=document.createElement("button");v.className="menu-btn",v.textContent="再试一次 · 另一条路",v.addEventListener("click",()=>{Ve(),kt()});const N=document.createElement("button");return N.className="menu-btn ghost",N.textContent="查看结局画廊",N.addEventListener("click",()=>A.show("settings")),h.append(b,v,N),e.append(o,a,i,s,f,h),me(1),e}function ha(){const e=document.createElement("div");e.className="evidence-screen";const t=document.createElement("div");t.className="scroll-area evidence-list";const{evidence:n}=k(),o=Array.isArray(n)?n:[],a=document.createElement("div");if(a.className="evidence-head",a.innerHTML=`已收证 <b>${o.length}</b> 件 · 可做推理的碎片`,o.length===0){const i=document.createElement("div");i.className="evidence-empty",i.textContent=`证据册是空的。

值得怀疑的东西，长按或点"收证"收进来。
它总有一天会把真相拼起来。`,t.append(a,i)}else{t.appendChild(a);for(const s of o){const l=Mn(s);if(!l)continue;const r=document.createElement("div");r.className="evidence-card";const c=document.createElement("div");c.className="evidence-icon",c.textContent=l.icon;const u=document.createElement("div");u.className="evidence-title",u.textContent=l.title;const f=document.createElement("div");f.className="evidence-note",f.textContent=l.note,r.append(c,u,f),t.appendChild(r)}const i=document.createElement("div");i.className="system-note",i.textContent="（证据不会消失。收集得越全，你越接近那晚的真相。）",t.appendChild(i)}return e.appendChild(t),e}const va={menu:{render:()=>ea(),title:""},chat:{render:()=>ta(),title:"未知号码",nav:!0},notes:{render:()=>na(),title:"备忘录",nav:!0},photos:{render:()=>aa(),title:"相册",nav:!0},contacts:{render:()=>sa(),title:"通讯录",nav:!0},calls:{render:()=>la(),title:"最近通话",nav:!0},drafts:{render:()=>da(),title:"草稿箱",nav:!1},settings:{render:()=>pa(),title:"设置",nav:!0},ending:{render:()=>ba(),title:""},evidence:{render:()=>ha(),title:"证据册",nav:!0}},ya=["chat","notes","photos","evidence","contacts","settings"];let V="menu",ie=null,X=null,$e=null,he=null,ce=null,ae=null;const S={updateStatus(){if(!$e)return;const{time:e}=k(),t=e%(24*60),n=Math.floor(t/60),o=t%60;if($e.textContent=`${String(n).padStart(2,"0")}:${String(o).padStart(2,"0")}`,he){const a=qe();he.textContent=`${a}%`,he.classList.toggle("low",a<=20)}},refreshScreens(){(V==="notes"||V==="photos"||V==="contacts"||V==="calls")&&A.show(V)},setHeader(e){ce&&(ce.textContent=e)},showNoteView(e){Lt?.(e)}};let Lt=null;function _a(e){Lt=e}const A={show(e,t){if(V=e,!X)return;const n=va[e];S.setHeader(n.title),X.innerHTML="";let o;o=n.render(),X.appendChild(o),n.title&&(document.title=`${n.title} · 午夜来讯`),Ca(),window.dispatchEvent(new CustomEvent("screen:show",{detail:e}));const a=X.querySelector(".scroll-area");a&&(a.scrollTop=a.scrollHeight),me(k().chapter)},current(){return V}};function Ca(){if(ae){ae.innerHTML="";for(const e of ya){const t=document.createElement("button");t.className="nav-btn"+(e===V?" active":""),t.dataset.screen=e;const n=wa(e);if(t.innerHTML=`<span class="nav-ico">${n}</span><span class="nav-lbl">${Ea(e)}</span>`,e==="chat"){const o=document.createElement("span");o.className="nav-badge",t.appendChild(o)}t.addEventListener("click",()=>{A.show(e)}),ae.appendChild(t)}}}function wa(e){switch(e){case"chat":return"💬";case"notes":return"📝";case"photos":return"🖼️";case"contacts":return"👤";case"settings":return"⚙️";case"evidence":return"🔍";default:return""}}function Ea(e){switch(e){case"chat":return"短信";case"notes":return"备忘录";case"photos":return"相册";case"contacts":return"联系人";case"settings":return"设置";case"evidence":return"证据";default:return""}}function ka(){const e=document.getElementById("app");e.innerHTML="",ie=document.createElement("div"),ie.className="phone";const t=document.createElement("div");t.className="phone-screen",ie.appendChild(t);const n=document.createElement("div");n.className="notch",t.appendChild(n);const o=document.createElement("div");o.className="status-bar",o.innerHTML=`
    <span class="st-left">23:57</span>
    <span class="st-right">📶 · <span class="st-batt">87%</span></span>
  `,t.appendChild(o),$e=o.querySelector(".st-left"),he=o.querySelector(".st-batt");const a=document.createElement("div");a.className="screen-header";const i=document.createElement("button");i.className="header-back",i.textContent="‹",a.appendChild(i),ce=document.createElement("span"),ce.className="header-title",a.appendChild(ce);const s=document.createElement("span");s.className="header-spacer",a.appendChild(s),t.appendChild(a),X=document.createElement("div"),X.className="screen-content",t.appendChild(X),ae=document.createElement("nav"),ae.className="bottom-nav",t.appendChild(ae),e.appendChild(ie);const l=document.createElement("div");l.className="fx-noise",e.appendChild(l);const r=document.createElement("div");return r.className="fx-tint",e.appendChild(r),i.addEventListener("click",()=>{V==="chat"?A.show("menu"):A.show("chat")}),window.setInterval(()=>{V==="menu"||V==="ending"||S.updateStatus()},3e4),A.show("menu"),ie}const G=(e,t,n,o,a,i)=>({id:e,speaker:t,text:n,effects:o,choices:a,next:i}),Sa={nodes:[G("p1s1","narration",`二十三点五十分。雨下了一天。

钥匙在锁孔里转了两圈，门开了。你脱下湿透的外套，挂在椅背上。

桌上放着中午没吃完的外卖，垃圾桶里有三个空咖啡罐。

你是王斌。二十八岁，在一家不大不小的公司做方案，一周被驳回三次。`,["chapter:0","ambient:on"],void 0,"p1s2"),G("p1s2","narration",`你把自己摔进沙发。手机屏幕自己亮了一下，又暗下去。

一年了。有些东西，你一直没舍得删，也没敢再看。

茶几上，放着一个空杯子。你不记得自己什么时候放上去的。`,["banner:一年前，这里还住着另一个人"],void 0,"p1s2w"),G("p1s2w","narration","你点开手机。",[],[{label:"*打开备忘录，看看那些没删的便签",effect:["screen:notes","count:visitedExplore"],go:"p1s2w"},{label:"*打开相册，翻到那些老照片",effect:["screen:photos","count:visitedExplore"],go:"p1s2w"},{label:"*打开联系人，看那个永远不会再亮的头像",effect:["screen:contacts","count:visitedExplore"],go:"p1s2w"},{label:"*打开通话记录",effect:["screen:calls","count:visitedExplore"],go:"p1s2w"},{label:"*都看过了。有些事，想起来比忘掉疼。",cond:"count:visitedExplore>=2",go:"p1s3"}]),G("p1s3","narration",`你合上手机，盯着天花板。

雨声很大。你听见自己的呼吸。

有些事，你不敢多想。想多了，这间屋子就装不下了。`,["time:6"],void 0,"p1s3a"),G("p1s3a","narration",`手机里还留着一段没发出去的备忘录：「给晚晚回电话」。

日期，是一年前。

妈妈上周又打来，问你周末回不回家吃饭。你说加班。

陈医生每周三，都还会发一条：「记得吃饭。」你没有回。`,["time:4"],[{label:"*去相册，找到那张蛋糕照片",effect:["screen:photos"],go:"p1s3a"},{label:"*我看了。把它收进证据册。",effect:["evidence:e_birthday"],go:"p1s3b"},{label:"*不看了。就这样坐着。",go:"p1s4",flags:{closedCake:!0},effect:["count:trait_avoid"]}]),G("p1s3b","narration",`蜡烛的光，照着你一个人的脸。

她吹蜡烛前说过：「下辈子还要一起过生日。」

有些东西你留着，是不敢忘。

试着收证——把它收进证据册，是你敢开始记得的第一步。`,["sting"],[{label:"*把它收进证据册",effect:["evidence:e_birthday"],go:"p1s3c"},{label:"*关掉。不看。",go:"p1s4",flags:{closedCake:!0},effect:["count:trait_avoid"]}]),G("p1s3c","narration",`「已收入证据册」。

证据册里多了一张蛋糕照片。

你忽然觉得，自己好像敢看一点了。`,["banner:🔍 已收入证据册"],void 0,"p1s4"),G("p1s4","narration",`二十三点五十八分。

手机屏幕又亮了一下。

不是闹钟。`,["time:2","sfx:msg_num"],void 0,"p1s5"),G("p1s5","system","00:00",["time:0"],void 0,"p1s6"),G("p1s6","number","还没睡？",["typing"],void 0,"p1s7"),G("p1s7","number","我知道你睡不着的。",["typing"],void 0,"p1s8"),G("p1s8","number",`一年了。你一直都在假装没事。

可我认得你。`,["typing"],[{label:"你是谁？",go:"c1s1",flags:{askWho:!0}},{label:"*不回。盯着屏幕。",go:"c1s1"}])]},_=(e,t,n,o,a,i)=>({id:e,speaker:t,text:n,effects:o,choices:a,next:i}),Ta={nodes:[_("c1s1","number",`我是谁不重要。

我知道你叫王斌。今天下午三点，你在十七楼会议室，方案又没过。领导把文件摔在桌上时，你的手抖了一下。`,["typing"],void 0,"c1s2"),_("c1s2","number",`还有。你住的这间屋子，一年前，住着另一个人。

你把她弄丢了。`,["typing","stinglong"],void 0,"c1s3"),_("c1s3","number","我说的对吗。",["typing"],[{label:"你连这个都知道？你到底是谁？",effect:["count:trait_care"],go:"c1s4",flags:{askWho:!0}},{label:"*握紧手机，指节发白",effect:["count:trait_care"],go:"c1s4",flags:{shaken:!0}},{label:"*把这个号码拉黑",effect:["count:trait_avoid"],go:"c1s3b"}]),_("c1s3b","number",`拉黑没有用。

三秒后，一条新短信，来自一个新的陌生号码：

「我说过，我在你身边。」`,["typing","sting"],void 0,"c1s4"),_("c1s4","number",`别怕。我不会伤害你。

我只是……想让你想起来。`,["typing"],void 0,"c1s4a"),_("c1s4a","number",`你昨天加班到十点，回来没吃晚饭。

冰箱第三层，有一盒你热过一次又放回去的饭。

你自己都不敢承认，那饭是你做的，却一直以为是她做的。`,["typing","sting"],[{label:"你连我家冰箱都知道？！",go:"c1s4b",flags:{knowFridge:!0}},{label:"*手一松，手机差点掉了",go:"c1s4b"}]),_("c1s4b","number",`我说过，我就在你身边。

今晚，先送你一样东西。

你收到一张照片。看仔细了。`,["typing","sfx:msg_num","photo:p_hallway","photo:open:p_hallway","sting"],void 0,"c1s5"),_("c1s5","number",`那张照片，是你相册里那张走廊照的"另一版"。

找出不同。全都找出来。`,["typing","banner:照片已收到 —— 找找哪里不对劲"],void 0,"c1s6"),_("c1s6","narration",`屏幕暗下去，又亮起来。

那张照片……和你相册里你自己拍的那张，好像，不太一样？

不是一处。是三处。`,["sting"],void 0,"c1s7"),_("c1s7","narration","你盯着它看了很久。",[],[{label:"*回相册，两张对比一下",effect:["screen:photos"],go:"c1s7"},{label:"*告诉它：门缝里，多了一个人。",cond:"flag:puzzle1Done",go:"c1s7a",flags:{foundDiff:!0},effect:["count:trait_truth"]},{label:"*告诉它：没什么不一样。",go:"c1s7b",flags:{missedDiff:!0},effect:["count:trait_avoid"]}]),_("c1s7a","number",`对。门缝里的人影。

还有呢？

你茶几上的杯子，是你昨晚加班忘带回去、早上又放回原位的。

你右边的窗帘，是你自己拉上的——你怕深夜有人从外面看进来。`,["typing","stinglong"],[{label:"*够了。你到底想干什么？",go:"c1s8",flags:{enough:!0},effect:["count:trait_truth"]},{label:"*那你告诉我，门缝里的人是谁？",go:"c1s8a"}]),_("c1s7b","number",`没有不一样？

你再想想。

门缝里，多了一个人。茶几上，多了一个杯子。窗帘，被拉上了。

三处。你一样都没看见。`,["typing","sting"],[{label:"*……你是说，照片在动？",go:"c1s8"},{label:"*我不想看了。",go:"c1s8"}]),_("c1s8","number",`你比我想的敏锐。

门缝里的人影，你怕吗？`,["typing","sting"],void 0,"c1s8a"),_("c1s8a","number",`怕，就对了。

你该怕的不是那个人影。

是你一直不敢确认的——那一晚，到底发生了什么。`,["typing"],[{label:"那一晚……是哪一晚？",go:"c1s9",flags:{askNight:!0}},{label:"*把手机扣在桌上",go:"c1s9",flags:{flipPhone:!0},effect:["count:trait_avoid"]}]),_("c1s9","number",`别怕。

那只是我，想让你记住的某个东西。

明天，或者后天，你会想起来的。`,["typing"],void 0,"c1s10"),_("c1s10","number",`这张照片，是从你房间的门缝里拍的。

你回头看一眼——你客厅的灯，是不是还亮着？`,["typing","sting"],void 0,"c1s11"),_("c1s11","narration",`你回头。

客厅的灯，确实亮着。

你明明记得，进门的时候，没有开灯。`,["stinglong","silence"],void 0,"c1s11a"),_("c1s11a","narration","你站在客厅和卧室的门口，不敢再往里走。",[],[{label:"*去走廊，看看那扇门",go:"c1s11b"},{label:"*去茶几，看看那个杯子",go:"c1s11c"},{label:"*退回床上，蒙住被子",go:"c1s11d"}]),_("c1s11b","narration",`走廊的灯没开。

你摸到门边。那扇门虚掩着，门缝里黑黢黢的，什么也看不见。

你忽然想起照片里那个站在门缝里的人影——

它现在，是在门里，还是门后？`,["sting","scare:flash"],[{label:"*猛地把门关上",go:"c1s11e"},{label:"*退回客厅",go:"c1s11e"}]),_("c1s11c","narration",`茶几上，确实放着一个杯子。

空的。杯沿还有一点干涸的水渍。

你昨晚加班回来，没有喝水，没有碰过它。

那是谁喝的？`,["sting","battery:-6"],[{label:"*拿起杯子，倒掉里面的空气",go:"c1s11e"},{label:"*手缩了回来",go:"c1s11e"}]),_("c1s11d","narration",`你退回床上，被子拉到头顶。

手机屏幕的微光，透过被子照进来。

你知道，它在等你。`,["battery:-6"],void 0,"c1s12"),_("c1s11e","narration",`你退回卧室。

背后，客厅的灯，在你自己关掉之后……过了三秒，又亮了。

你没有再回去关。`,["sting","wallchange"],void 0,"c1s12"),_("c1s12","number",`……晚安。明天 00:00，我还在。

除非——你想起来。`,["typing"],void 0,"c1s13"),_("c1s13","system","对方已离线。",[],void 0,"c1s13a"),_("c1s13a","narration",`凌晨一点。你睡意全无。

你翻着今天收到的照片，翻着相册里那张原图。

门缝里的人影、茶几上的杯子、被拉上的窗帘。

有些东西，你逃避了一年。`,["time:70","typing"],[{label:"*把这些碎片收进证据册",effect:["evidence:e_hallway"],go:"c1s14"},{label:"*把手机放远一点，闭上眼",go:"c1s14",flags:{putAway:!0},effect:["count:trait_avoid"]}]),_("c1s14","narration",`你一夜没睡。

天一点点变亮。你看着那条短信，看了很久。`,["time:270"],[{label:"睡一会儿吧，明天还要上班。",go:"c2s1",flags:{keptWorking:!0}},{label:"*想把这件事告诉周凯",go:"c2s1",flags:{wantTell:!0}},{label:"*把号码删掉，假装没发生过",effect:["count:trait_avoid"],go:"c2s1",flags:{deleted:!0}}])]},p=(e,t,n,o,a,i)=>({id:e,speaker:t,text:n,effects:o,choices:a,next:i}),Na={nodes:[p("c2s1","narration",`白天浑浑噩噩。周凯在微信上喊你吃午饭，你没回。

下班时，你在公司楼下站了很久，看着对面那家面馆——以前你们总去那吃。

晚上十一点五十，你躺下，手机放在枕边。

你知道它要来。`,["chapter:2","card:2","note:n_secret","time:0"],void 0,"c2s2"),p("c2s2","number","我来了。",["typing","sfx:msg_num"],void 0,"c2s3"),p("c2s3","number","今天你开会走了三次神。第三次，你在备忘录里写了一个字，又删了。",["typing"],[{label:"你连我的备忘录都看得见？",go:"c2s4",flags:{revealNote:!0}},{label:"*没回，却打开了自己的备忘录",go:"c2s4b"}]),p("c2s4","number",`看不见。

但我读得懂你。你写的那个字，是"晚"。对吧。`,["typing"],void 0,"c2s5"),p("c2s4b","number",`你自己都忘了自己写过什么，对吧。

那我来告诉你——是"晚"。`,["typing"],void 0,"c2s5"),p("c2s5","number",`我们来玩个游戏。

你猜对一个，我就告诉你我是谁。

我不会骗你——因为猜答案的，本来就是你自己。`,["typing","sting"],void 0,"c2s6"),p("c2s6","number",`谜题一。

我们第一次见面的日子。

提示：你的相册里，有一张蛋糕。它的日期，就是答案。`,["typing"],void 0,"c2s6w"),p("c2s6w","narration","你想了想。",[],[{label:"*先翻相册，查那张蛋糕的日期",effect:["screen:photos"],go:"c2s6w"},{label:"*回答：4 月 18 日",go:"c2s7",flags:{solvedPuzzle1:!0},effect:["count:trait_truth"]},{label:"*回答：6 月 2 日",go:"c2s6wrong"},{label:"*回答：11 月 6 日",go:"c2s6wrong"},{label:"*回答：3 月 9 日",go:"c2s6wrong"}]),p("c2s6wrong","number",`不对。

你连这个都忘了？她得多难过。`,["typing","sting"],[{label:"*再想想",go:"c2s6wrong2",flags:{wrongP1:!0}}]),p("c2s6wrong2","number",`再想想。

那张蛋糕照片，就在你相册里。点开它，看日期。

答案写在上面。`,["typing"],[{label:"*翻相册，点开蛋糕照片看日期",effect:["screen:photos"],go:"c2s6w"},{label:"*再猜一次",go:"c2s6w"}]),p("c2s7","number",`……4 月 18 日。

那是你们相遇的第一天。很好，你记得。

可是你记不记得——你们在一起的最后一天，是哪一天？`,["typing","sfx:sting"],void 0,"c2s7w"),p("c2s7w","narration","最后一天。",[],[{label:"*查那晚的照片和通话记录",effect:["screen:photos"],go:"c2s7w"},{label:"*回答：11 月 6 日",go:"c2s8",flags:{knowsDate:!0},effect:["count:trait_truth"]},{label:"*回答：10 月 31 日",go:"c2s7wrong"},{label:"*回答：12 月 24 日",go:"c2s7wrong"},{label:"*我不想回答。",go:"c2s7wrong"}]),p("c2s7wrong","number",`……

你知道正确答案。你只是不敢说出口。

那晚，就是你们在一起的最后一天。`,["typing","sting"],[{label:"*沉默",go:"c2s7w"}]),p("c2s8","number",`11 月 6 日。那天下着大雨。

你开着车，手机亮着——一条短信。

你回了吗？`,["typing"],void 0,"c2s9"),p("c2s9","number","回答我。",["typing"],[{label:"我……没回。我在开车。",go:"c2s9a",flags:{claimDriving:!0}},{label:"我不记得了。",go:"c2s9b",flags:{noMemory:!0}}]),p("c2s9a","number",`是吗。

你确定吗。

你确定你当时，没有碰那部手机？`,["typing","sting"],[{label:"*沉默",go:"c2s10"},{label:"……我记不清了。",go:"c2s10"}]),p("c2s9b","number",`你果然不记得了。

没关系。我替你记着。

记到你敢想起来的那天。`,["typing","sting"],[{label:"*沉默",go:"c2s10"}]),p("c2s10","number",`今晚先到这儿。

明天，我带你去见一个人。

在那之前——今晚，你可以先找一个人，说说话。`,["typing"],void 0,"c2s10w"),p("c2s10w","narration","你握着手机。",[],[{label:"*给周凯发消息",go:"c2_zhou_1",effect:["count:trait_help"]},{label:"*给妈妈发消息",go:"c2_mom_1",effect:["count:trait_help"]},{label:"*在备忘录里，给陈医生留一句话",go:"c2_doc_1",effect:["count:trait_help"]},{label:"*谁都不找，自己扛",go:"c2_alone_1",effect:["count:trait_avoid"]}]),p("c2_zhou_1","narration","你点开周凯的头像，删删打打，最后还是发了出去。",["sfx:send"],void 0,"c2_zhou_2"),p("c2_zhou_2","number","【周凯】：？？你总算回消息了！吓死我了，两天没动静。",["typing","sfx:msg_con"],void 0,"c2_zhou_3"),p("c2_zhou_3","number","【周凯】：咋了哥？看你状态不太对。周六出来喝酒？麻哥他们火锅都订好了。",["typing","sfx:msg_con"],[{label:"*把那个号码发给他",go:"c2_zhou_4",flags:{toldZhou:!0},effect:["count:trait_help"]},{label:"*说：我没事，就是最近睡得不好",go:"c2_zhou_5",flags:{liedZhou:!0}}]),p("c2_zhou_4","number","【周凯】：这个号？没见过。你搜一下归属地……等等，哥，这号码怎么看着像你自己？",["typing","sfx:msg_con","sting"],void 0,"c2_zhou_5"),p("c2_zhou_5","number","【周凯】：行了别想那么多。周六出来，哥们陪你喝。你一个人闷着，容易瞎想。",["typing","sfx:msg_con"],void 0,"c2_zhou_6"),p("c2_zhou_6","narration",'你盯着"这号码怎么看着像你自己"那行字，看了很久。',["sting"],[{label:"*把这条记下来",effect:["evidence:e_call_self"],go:"c2s12"},{label:"*他没看错的话……",go:"c2s12"}]),p("c2_mom_1","narration","你拨了妈妈的号码。响了两声，就接了。",["sfx:ring"],void 0,"c2_mom_2"),p("c2_mom_2","number","【妈妈】：斌斌！这么晚了，怎么还没睡？妈就说你熬夜。",["typing","sfx:msg_con"],void 0,"c2_mom_3"),p("c2_mom_3","number","【妈妈】：上周给你寄的排骨收到了吗？你一个人住，要好好吃饭。",["typing","sfx:msg_con"],[{label:"*妈，我最近总收到一条奇怪的短信",go:"c2_mom_4",flags:{toldMom:!0},effect:["count:trait_help"]},{label:"*我挺好的，妈。就是……想晚晚",go:"c2_mom_5",flags:{missLin:!0},effect:["count:trait_care"]}]),p("c2_mom_4","number","【妈妈】：短信？是不是诈骗的？你拉黑它！现在的骗子，专门盯你这种……不对，斌斌，你声音不对。你是不是又做噩梦了？",["typing","sfx:msg_con"],void 0,"c2_mom_5"),p("c2_mom_5","number","【妈妈】：你别吓妈。妈就你一个儿子。那个……那件事，都一年了，你得往前看。晚晚她，肯定也不想看你这样。",["typing","sfx:msg_con"],void 0,"c2_mom_6"),p("c2_mom_6","narration","电话挂了。你握着手机，忽然很想哭。",["sting"],[{label:"*把妈妈的话记下来",go:"c2s12",flags:{momTold:!0}},{label:"*沉默很久",go:"c2s12"}]),p("c2_doc_1","narration","你翻开备忘录，找到陈医生的号码。",["typing"],void 0,"c2_doc_2"),p("c2_doc_2","number","【你】：陈医生，我是王斌。周四的复诊，我还能去吗？",["typing","sfx:send"],void 0,"c2_doc_3"),p("c2_doc_3","number",`【陈医生】：王斌。你上次来，是三周前。

周四下午三点，我在。你……这一周睡得怎么样？`,["typing","sfx:msg_con"],[{label:"*不太好。总做同一个梦",go:"c2_doc_4",flags:{docTell:!0},effect:["count:trait_help"]},{label:"*还好。就是工作忙",go:"c2_doc_4",flags:{docLie:!0}}]),p("c2_doc_4","number",`【陈医生】：同一个梦？

说来听听。是……关于车的梦吗？`,["typing","sfx:msg_con","sting"],void 0,"c2_doc_5"),p("c2_doc_5","narration",`关于车的梦。

你从没跟任何人说过那个梦。陈医生是怎么知道的？`,["sting","typing"],[{label:"*把这件事记下来",go:"c2s12",flags:{docKnew:!0},effect:["evidence:e_note_wrong"]},{label:"*回：不是。是关于雨。",go:"c2s12",flags:{denyRain:!0}}]),p("c2_alone_1","narration",`你谁也没找。

把手机静音，扣在桌上。屋里很安静，安静得能听见自己的心跳。`,["battery:-8"],void 0,"c2_alone_2"),p("c2_alone_2","number",`……

你把自己关起来了，对吧。

没关系。门锁了，我还在屋里。`,["typing","sting"],void 0,"c2_alone_3"),p("c2_alone_3","narration",`你猛地抬头。

屋里，只有你一个人。`,["stinglong","presence"],[{label:"*把灯全打开",go:"c2s12",flags:{aloneScared:!0},effect:["count:trait_avoid"]}]),p("c2s12","number",`晚安。明天见。

等你真正想起来的时候，你会感谢今晚的你。`,["typing"],void 0,"c3s1")]},g=(e,t,n,o,a,i)=>({id:e,speaker:t,text:n,effects:o,choices:a,next:i}),La={nodes:[g("c3s1","narration",`白天，周凯在微信上问你"到底怎么了"。你打了几个字，又删了。

夜里，雨又下了起来。00:00，手机准时亮起。`,["chapter:3","card:3","time:0"],void 0,"c3s2"),g("c3s2","number",`今晚，我不说话。

你先去看你的备忘录。第三条。

那不是你写的。`,["typing","note:n_wrong","sting","wallchange"],void 0,"c3s2w"),g("c3s2w","narration","备忘录里，多了一条不是你写的东西。",[],[{label:"*打开备忘录看看",effect:["screen:notes"],go:"c3s2w"},{label:"我自己的备忘录，我还不清楚？",go:"c3s3",flags:{doubt:!0}}]),g("c3s3","number",`看到了吗。

"别信手机"。三条。

那是你自己写的，还是……我替你写的？`,["typing","sting"],void 0,"c3s4"),g("c3s4","number",`现在，去看你的通话记录。

昨晚 00:04，有一通拨出的电话，打给"未知号码"。时长 3 秒。`,["typing","calllog:c_self","sting"],void 0,"c3s4w"),g("c3s4w","narration","你不敢相信。",[],[{label:"*打开通话记录确认",effect:["screen:calls"],go:"c3s4w"},{label:"我没打过这个电话！",go:"c3s5",flags:{deniedCall:!0}}]),g("c3s5","number",`可它就在那里。

3 秒。00:04。

刚好在你删掉我聊天记录之前。`,["typing"],void 0,"c3s5a"),g("c3s5a","number",`不信？

那现在，你打开拨号界面，输入你自己的号码。

然后——拨出去。`,["typing","sting"],void 0,"c3s5b"),g("c3s5b","narration",`你鬼使神差地输入了自己的号码。

指尖悬在拨号键上方。

然后，你按了下去。`,["typing","battery:-6"],[{label:"*拨出",go:"c3s5c",flags:{dialSelf:!0}},{label:"*把手机关了",go:"c3s5d",flags:{killPhone:!0},effect:["count:trait_avoid"]}]),g("c3s5c","narration",`拨号音响起。

一声。两声。三声。

然后，你听见了自己的声音——从你自己手机的话筒里，传出来：

「喂？你打过来干什么？」`,["stinglong","scare:flash","battery:-10"],void 0,"c3s6"),g("c3s5d","narration",`屏幕黑了下去。

三秒后，它自己亮了。

显示：正在拨号——打给你的号码。`,["sting","battery:-10"],void 0,"c3s6"),g("c3s6","number",`你开始怀疑了吧。

你的手机，在背着你做事。

或者——背着你的人，是你自己。`,["typing","stinglong"],void 0,"c3s6b"),g("c3s6b","narration",`屏幕忽然闪了一下。

一条消息，被对方撤回了。`,["flicker","msgrevoke"],void 0,"c3s7"),g("c3s7","number",`……没什么。你什么都没看见。

今晚，我再给你看一样东西。然后，你决定信谁。`,["typing","note:n_right"],void 0,"c3s8"),g("c3s8","narration",`备忘录里，现在有两条故障的字。

一条说：别信手机。

一条说：别信自己。`,["sting"],void 0,"c3s8w"),g("c3s8w","narration","你站在两条之间。",[],[{label:"我信手机。至少它是我的。",go:"c3s9a",flags:{trustPhone:!0}},{label:"我信我自己。我怎么会害自己。",go:"c3s9b",flags:{trustSelf:!0},effect:["count:trait_truth"]},{label:"*两条都不信，再去备忘录看看",effect:["screen:notes"],go:"c3s8w"}]),g("c3s9a","number",`你信手机？

可昨晚 00:04 那通电话，就是你的手机自己打的。`,["typing","sting"],[{label:"*沉默",go:"c3s10"}]),g("c3s9b","number",`你信自己？

那为什么你会忘掉那么多事。为什么备忘录里会有你没写过的字。`,["typing","sting"],[{label:"*沉默",go:"c3s10"}]),g("c3s10","number",`你不是疯了。

你只是……不敢想起来。`,["typing"],void 0,"c3s10w"),g("c3s10w","number",`凌晨三点三十三分，你的相册里会出现一样东西。

你可以等，也可以不等。`,["typing","battery:-12"],[{label:"*熬到 3:33，等它出现",effect:["clock:213","flag:night333","banner:凌晨 3:33 —— 相册好像多了一张照片"],go:"c3s11"},{label:"*不等了，把手机扣过去",effect:["clock:270"],go:"c3s11miss"}]),g("c3s11","narration",`凌晨 3:33。

屏幕自己亮了。

相册……好像，多了一张照片。`,["sting","battery:-8"],void 0,"c3s11w"),g("c3s11w","narration","你盯着那条提醒，一动不动。",[],[{label:"*打开相册，看看那张多出来的照片",effect:["screen:photos"],go:"c3s11w"},{label:"*那张照片，我看着，像她。",cond:"count:anomalyViewed>=1",go:"c3s12",flags:{sawHer:!0},effect:["count:trait_care","evidence:e_333"]},{label:"*我什么都没看到。",go:"c3s12",effect:["count:trait_avoid"]}]),g("c3s11miss","number",`你错过了。

它等了你一整夜。3:33 的照片，你看不到了。`,["typing","battery:-8"],void 0,"c3s12m"),g("c3s12","number",`3:33 的照片，你看到了吧。

那不是别人。

那是你忘了的她。也是你忘掉的自己。`,["typing","stinglong","presence"],void 0,"c3s12a"),g("c3s12m","number",`你以为不看，它就不存在了吗。

它一直都在。等你。`,["typing","stinglong","presence"],void 0,"c3s12a"),g("c3s12a","narration",`你低头看了一眼电量。

只剩下 41%。

数字还在往下掉——1%……1%……

屏幕角落，有什么东西，好像多了一条。`,["battery:-10","typing"],[{label:"*盯着电量，不敢动",go:"c3s12b"},{label:"*想关机，手指却按不下去",go:"c3s12b",flags:{frozen:!0},effect:["count:trait_avoid"]}]),g("c3s12b","number",`手机快没电了。

门外，响起了敲门声。

一次。两次。三次。`,["typing","battery:-30","sting","scare:flash"],void 0,"c3s12t"),g("c3s12t","narration","你必须马上决定。",["timed:c333call"]),g("c3s13_open","number",`你拉开了门。

门外空无一人。

只有你的手机，在口袋里震了一下。`,["typing","sting"],void 0,"c3s14"),g("c3s13_phone","number",`你盯着屏幕。

敲门声停了。

可你知道，刚才门外的，不是风。`,["typing","sting"],void 0,"c3s14"),g("c3s13_hide","number",`你关了机。

黑暗里，敲门声又响了一次。然后，是很久的安静。`,["typing","sting"],void 0,"c3s14"),g("c3s13_timeout","number",`你僵在原地。

屏幕一黑，又一亮。

那张 3:33 的照片，正对着你的脸。`,["typing","stinglong","scare:photo"],void 0,"c3s14"),g("c3_call_accepted","number","……你终于接了。",["typing"],void 0,"c3s14"),g("c3_call_declined","number",`你不接电话。

你以为躲开声音，就能躲开真相吗。`,["typing"],void 0,"c3s14"),g("c3s14","number",`明天晚上，还是这个时间。

我会给你看那晚的照片。

睡吧。你需要的。`,["typing"],void 0,"c3s15"),g("c3s15","narration",`你把手机放下，又拿起来。

屏幕的光，照着你一个人。

你忽然发现，你不记得自己是什么时候睡着的。`,["time:180"],[{label:"*天亮之前，必须弄明白",go:"c4s1"}])]},y=(e,t,n,o,a,i,s)=>({id:e,speaker:t,text:n,effects:o,choices:a,next:i,end:s}),Ra={nodes:[y("c4s1","narration",`白天，你翻了一整天的相册。

手机里的未读，从 99 变成 0。可你越看，越觉得哪里不对。

夜晚来得很慢。`,["chapter:4","card:4","photo:p_crash"],void 0,"c4s2"),y("c4s2","number","今晚，我不绕弯子了。",["typing","time:0"],void 0,"c4s3"),y("c4s3","number",`你说 11 月 6 号那晚，你在开车，没回短信。

那我问你——`,["typing"],void 0,"c4s4"),y("c4s4","number","那条短信，是谁发给你的？",["typing","sting"],void 0,"c4s4w"),y("c4s4w","narration","你握着手机，指尖发凉。",[],[{label:"是……林晚发的。她问我到家没有。",go:"c4s5",flags:{truthReply:!0},effect:["count:trait_truth"]},{label:"我不记得有短信。",go:"c4s5",flags:{denyAgain:!0},effect:["count:trait_avoid"]}]),y("c4s5","number",`她问你到家没有。

然后呢？你回了。

"马上到，等我。"`,["typing","sting"],void 0,"c4s6"),y("c4s6","number",`你一边开车，一边回她的短信。

雨很大。你看见前面的刹车灯时，已经来不及了。`,["typing","stinglong","heart:on"],void 0,"c4s7"),y("c4s7","number",`你一直以为，是那场雨。

其实不是。

是你自己的手。`,["typing"],void 0,"c4s8"),y("c4s8","number","你想起来了吗？",["typing"],[{label:"*一直摇头，不愿接受",go:"c4s8a"},{label:"*眼泪掉在屏幕上",go:"c4s8b",flags:{tears:!0},effect:["count:trait_care","count:trait_truth"]}]),y("c4s8a","number",`你把车开出护栏的时候，手机屏幕上还亮着两个字——

"等我"。

那是你发的。`,["typing","stinglong"],void 0,"c4s9"),y("c4s8b","number",`你把车开出护栏的时候，手机屏幕上还亮着两个字——

"等我"。

那是你发的。`,["typing","stinglong"],void 0,"c4s9"),y("c4s9","number",`你不是受害者。

你是那个，在雨里拿起手机的人。`,["typing"],void 0,"c4s10"),y("c4s10","number",`她那天下午问你：几点到家。你说：九点。

那天晚上，你迟了三个小时。

她等你的那三个小时里，打了四通电话。你都没接。`,["typing","sting"],void 0,"c4s11"),y("c4s11","number",`现在，你知道我是谁了。

我是那个替你记着这一切的人。

我是你。王斌。

是你忘掉的那个自己。`,["typing","stinglong"],void 0,"c4s11a"),y("c4s11a","number",`不信的话，你自己去查。

相册里，有一张出事前一天的走廊照。

通话记录里，23:41 那通未接——是她打给你的最后一通。

草稿箱里——密码，你自己知道。

这一年来，我每天 00:00 都在等你。等你去看。`,["typing","sting"],void 0,"c4s12"),y("c4s12","number",`这一年来，每天 00:00 的短信，不是别人。

是你自己，在提醒你自己。`,["typing","heart:off"],[{label:"……你真是我自己？",go:"c4s13",flags:{believe:!0},effect:["count:trait_truth"]},{label:"*不信。拉黑这个号码",effect:["count:trait_avoid"],go:"c4s14",flags:{blockAgain:!0}}]),y("c4s13","number",`你不信？

那你去打开草稿箱。密码是你永远忘不掉的那一天。

「我们」之后的那一天。`,["typing","drafts"],void 0,"c4s13d"),y("c4s13d","narration","草稿箱需要 4 位数字密码。",[],[{label:"*去解锁草稿箱",cond:"!flag:draftsUnlocked",effect:["screen:drafts"],go:"c4s13d"},{label:"我打开了，都看完了。",cond:"flag:draftsUnlocked",go:"c4s15",flags:{sawDrafts:!0},effect:["count:trait_truth"]},{label:"*先记下这个谜题，想想再回来",go:"c4s13d"}]),y("c4s14","number",`你拉黑了我。

手机安静了三秒。

然后，一条新短信，来自一个新的未知号码：

"别这样。你逃不掉的。"`,["typing","sting"],[{label:"*我该拿你怎么办",go:"c4s14b"}]),y("c4s14b","number","去打开草稿箱。用那个日期——你手机里到处是它，只是你一直不看。",["typing"],[{label:"*回到草稿箱，解锁它",cond:"!flag:draftsUnlocked",effect:["screen:drafts"],go:"c4s13d"},{label:"我打开了，都看完了。",cond:"flag:draftsUnlocked",go:"c4s15",flags:{sawDrafts:!0},effect:["count:trait_truth"]}]),y("c4s15","number",`看完了？

那些定时短信——是你，一年前自己设下的。

每天 00:00，发给一个永远不会再回你的人。`,["typing","sting"],void 0,"c4s15t"),y("c4s15t","narration","你看着那些碎片，开始拼那一夜。",["timeline"],[{label:"*我拼出来了。顺序是这样。",cond:"flag:timelineCorrect",go:"c4s16",flags:{piecedTruth:!0},effect:["count:trait_truth"]},{label:"*我拼出来了。（可有些地方，我还是不敢看）",go:"c4s16b"}]),y("c4s16b","number",`你拼出的那晚，有些地方是错的。

可你已经很近了——近到不敢再近。`,["typing","sting"],void 0,"c4s17"),y("c4s16","number",`你设下它们，是因为你怕自己忘了。

怕有一天，你真的会以为，那只是一场雨。`,["typing"],void 0,"c4s17"),y("c4s17","number",`你一直骗自己：我是受害者，是那场雨。

可你骗不了那个替你记得的你自己。`,["typing","sting"],void 0,"c4s17a"),y("c4s17a","narration",`凌晨两点。你半梦半醒。

手机屏幕忽然亮起。

显示：草稿箱——有一条短信，正在发送。

收件人：未知号码。

内容：「还没睡？」

发送时间：00:00。

可现在是凌晨两点。`,["time:240","sting","flicker"],void 0,"c4s18"),y("c4s18","number",`今晚就到这。

明天，是最后一夜。

到时候，你要做一个选择。

一个只有你能替自己做的选择。`,["typing"],void 0,"c4s19"),y("c4s19","narration",`你把手机放在胸口，睡了过去。

这一次，你没有梦到她。

你梦到了一条短信，一个从未发出的字：

「悔。」`,["time:240"],[{label:"*哭出声来",effect:["count:trait_care"],go:"c5s1"},{label:"*沉默了整整一夜",effect:["count:trait_truth"],go:"c5s1"},{label:"*告诉自己，那只是一场梦",effect:["count:trait_avoid"],go:"c5s1"}])]},L=(e,t,n,o,a,i,s)=>({id:e,speaker:t,text:n,effects:o,choices:a,next:i,end:s}),Aa={nodes:[L("c5s1","narration",`窗外下着雨，像那晚一样。

你坐在床边，没有开灯。手机握在手里，屏幕暗着。

你等它。

00:00。`,["chapter:5","card:5","time:0"],void 0,"c5s2"),L("c5s2","number","最后一夜了。王斌。",["typing","sfx:msg_num"],void 0,"c5s2a"),L("c5s2a","number",`第一夜，你还没发现我。第二夜，你开始查我的日期。第三夜，你等到 3:33，看见了那张照片。

第四夜，你拼出了那晚的顺序。

这一年来，你一点一点，走回来了。`,["typing","sting"],void 0,"c5s3"),L("c5s3","number",`一年了。每天 00:00，我都在这里等你。

现在你都想起来了。

所以——轮到你回答了。`,["typing"],void 0,"c5s3a"),L("c5s3a","number",`你收集了 {evidence_count} 件证据。

我知道你不是故意要躲的。

你只是……怕。`,["typing"],void 0,"c5s4"),L("c5s4","number","这一夜，你一共 {trait_truth} 次直面我，{trait_help} 次向人求助，{trait_avoid} 次想把我推远，{trait_care} 次想起她。",["typing"],void 0,"c5s5"),L("c5s5","number",`我是那个替你记得一切的人。

现在，天快亮了。

你想记得我，还是忘了我？`,["typing","sting"],void 0,"c5s5w"),L("c5s5w","narration","雨声很大。你握着手机。",[],[{label:"*天亮就去派出所，把一切说清楚。",cond:"count:trait_truth>=3",effect:["count:trait_truth"],go:"c5s6t"},{label:"*拨通陈医生的电话。",cond:"count:trait_help>=2",effect:["count:trait_help"],go:"c5s6h"},{label:"*翻开她的照片，看最后一眼。",cond:"count:trait_care>=3",effect:["count:trait_care"],go:"c5s6c"},{label:"*把手机恢复出厂设置。",cond:"count:trait_avoid>=3",effect:["count:trait_avoid"],go:"c5s6a"},{label:"*什么都不做，也不说话。",cond:"count:trait_silent>=2",effect:["count:trait_silent"],go:"c5s6s"},{label:"*就这样坐着，天快亮了。",effect:["count:trait_silent"],go:"c5s6s"}]),L("c5s6t","narration",`你打出了那行字，发送。

然后，你拨出了那个号码。

号码没有再回。`,["sfx:send","time:5"],void 0,"c5s7t"),L("c5s7t","narration",`你穿上外套。门打开的那一刻，雨小了很多。

你没有回头。手机安安静静地躺在口袋里。`,["sfx:send"],void 0,void 0,"ending:resolve"),L("c5s6h","narration",`你找到了陈医生的名片，拨了过去。

电话响了三声，接通了。

你说：医生，我想聊聊。`,["sfx:ring","time:5"],void 0,"c5s7h"),L("c5s7h","narration",`那通电话打了很久。

挂断的时候，你发现自己哭了，却觉得轻松。

窗外，雨停了。`,["sfx:ring"],void 0,void 0,"ending:resolve"),L("c5s6c","narration",`你翻开相册，找到那张蛋糕照片。

蜡烛的光，照着你一个人的脸。

你忽然明白，这一年你真正怕的是什么。`,["sfx:breath","time:5"],void 0,"c5s7c"),L("c5s7c","narration",`你没有关掉相册。

就那么看着，直到天亮。

原来记得，比忘掉需要更多勇气。`,["sfx:breath"],void 0,void 0,"ending:resolve"),L("c5s6a","narration",`你删除了所有聊天记录，拉黑号码，清空了草稿箱。

手机恢复出厂设置的那一刻，你长长地舒了一口气。`,["sfx:send","time:5","sting"],void 0,"c5s7a"),L("c5s7a","narration",`清晨，你把新手机开机。

桌面干干净净。

你盯着那部新手机，忽然觉得，少了点什么。`,["sfx:send"],void 0,void 0,"ending:resolve"),L("c5s6s","narration",`你没有回。

屏幕暗下去，又因为新消息亮起来。你没有看。

天亮了。你也没有看。`,["time:420","sting"],void 0,void 0,"ending:resolve")]};function Ma(){ee(Sa),ee(Ta),ee(Na),ee(La),ee(Ra),ee(Aa)}Ma();nt()&&Yt();Ze("zhou",{who:"周凯",onAccept:"c2_aftercall_zhou",onDecline:"c2_declined_zhou",lines:[{speaker:"zhou",text:"哥，你终于接电话了！你他妈吓死我了，两天不回消息。"},{speaker:"zhou",text:"周六晚上老地方，麻哥他们把火锅都订好了。你必须来，别跟我扯你困了。"},{speaker:"zhou",text:"…还有，你最近是不是又没睡好？黑眼圈快掉地上了。那个事都一年了，你得往前看。"}]});Ze("mom",{who:"妈妈",onAccept:"c2_aftercall_mom",onDecline:"c2_declined_mom",lines:[{speaker:"mom",text:"斌斌，妈打了你好几个电话，你怎么才接。"},{speaker:"mom",text:"上周妈给你寄的补品收到了吗？你老熬夜，妈不放心。"},{speaker:"mom",text:"……妈知道你心里难过。但是晚晚她，也不想看到你这样。"}]});Ze("number",{who:"未知号码",onAccept:"c3_call_accepted",onDecline:"c3_call_declined",lines:[{speaker:"number",text:"……你终于接了。"},{speaker:"number",text:"我以为你会一直躲下去。"},{speaker:"number",text:"别挂。听我说完。那晚……不是你一个人记得。"}]});ka();window.setTimeout(()=>{const e=document.querySelector(".boot");e&&e.classList.add("hide"),window.setTimeout(()=>e?.remove(),1e3)},600);
