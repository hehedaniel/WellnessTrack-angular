import{Fa as m,Ga as k,Ic as x,Jc as U,La as N,ba as R,cb as $,da as d,ea as B,eb as a,ga as p,gb as E,ia as h,ja as f,kb as F,na as O,ob as y,pa as T,qa as g,wa as P}from"./chunk-CPJRB4V3.js";var Z=null;function w(){return Z}function Ke(n){Z??=n}var z=class{};var I=new p(""),M=(()=>{let e=class e{historyGo(t){throw new Error("")}};e.\u0275fac=function(i){return new(i||e)},e.\u0275prov=d({token:e,factory:()=>f(J),providedIn:"platform"});let n=e;return n})(),qe=new p(""),J=(()=>{let e=class e extends M{constructor(){super(),this._doc=f(I),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return w().getBaseHref(this._doc)}onPopState(t){let i=w().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",t,!1),()=>i.removeEventListener("popstate",t)}onHashChange(t){let i=w().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",t,!1),()=>i.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,i,r){this._history.pushState(t,i,r)}replaceState(t,i,r){this._history.replaceState(t,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}};e.\u0275fac=function(i){return new(i||e)},e.\u0275prov=d({token:e,factory:()=>new e,providedIn:"platform"});let n=e;return n})();function L(n,e){if(n.length==0)return e;if(e.length==0)return n;let s=0;return n.endsWith("/")&&s++,e.startsWith("/")&&s++,s==2?n+e.substring(1):s==1?n+e:n+"/"+e}function j(n){let e=n.match(/#|\?|$/),s=e&&e.index||n.length,t=s-(n[s-1]==="/"?1:0);return n.slice(0,t)+n.slice(s)}function l(n){return n&&n[0]!=="?"?"?"+n:n}var C=(()=>{let e=class e{historyGo(t){throw new Error("")}};e.\u0275fac=function(i){return new(i||e)},e.\u0275prov=d({token:e,factory:()=>f(ee),providedIn:"root"});let n=e;return n})(),K=new p(""),ee=(()=>{let e=class e extends C{constructor(t,i){super(),this._platformLocation=t,this._removeListenerFns=[],this._baseHref=i??this._platformLocation.getBaseHrefFromDOM()??f(I).location?.origin??""}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}prepareExternalUrl(t){return L(this._baseHref,t)}path(t=!1){let i=this._platformLocation.pathname+l(this._platformLocation.search),r=this._platformLocation.hash;return r&&t?`${i}${r}`:i}pushState(t,i,r,o){let u=this.prepareExternalUrl(r+l(o));this._platformLocation.pushState(t,i,u)}replaceState(t,i,r,o){let u=this.prepareExternalUrl(r+l(o));this._platformLocation.replaceState(t,i,u)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}};e.\u0275fac=function(i){return new(i||e)(h(M),h(K,8))},e.\u0275prov=d({token:e,factory:e.\u0275fac,providedIn:"root"});let n=e;return n})(),Xe=(()=>{let e=class e extends C{constructor(t,i){super(),this._platformLocation=t,this._baseHref="",this._removeListenerFns=[],i!=null&&(this._baseHref=i)}ngOnDestroy(){for(;this._removeListenerFns.length;)this._removeListenerFns.pop()()}onPopState(t){this._removeListenerFns.push(this._platformLocation.onPopState(t),this._platformLocation.onHashChange(t))}getBaseHref(){return this._baseHref}path(t=!1){let i=this._platformLocation.hash??"#";return i.length>0?i.substring(1):i}prepareExternalUrl(t){let i=L(this._baseHref,t);return i.length>0?"#"+i:i}pushState(t,i,r,o){let u=this.prepareExternalUrl(r+l(o));u.length==0&&(u=this._platformLocation.pathname),this._platformLocation.pushState(t,i,u)}replaceState(t,i,r,o){let u=this.prepareExternalUrl(r+l(o));u.length==0&&(u=this._platformLocation.pathname),this._platformLocation.replaceState(t,i,u)}forward(){this._platformLocation.forward()}back(){this._platformLocation.back()}getState(){return this._platformLocation.getState()}historyGo(t=0){this._platformLocation.historyGo?.(t)}};e.\u0275fac=function(i){return new(i||e)(h(M),h(K,8))},e.\u0275prov=d({token:e,factory:e.\u0275fac});let n=e;return n})(),te=(()=>{let e=class e{constructor(t){this._subject=new k,this._urlChangeListeners=[],this._urlChangeSubscription=null,this._locationStrategy=t;let i=this._locationStrategy.getBaseHref();this._basePath=re(j(V(i))),this._locationStrategy.onPopState(r=>{this._subject.emit({url:this.path(!0),pop:!0,state:r.state,type:r.type})})}ngOnDestroy(){this._urlChangeSubscription?.unsubscribe(),this._urlChangeListeners=[]}path(t=!1){return this.normalize(this._locationStrategy.path(t))}getState(){return this._locationStrategy.getState()}isCurrentPathEqualTo(t,i=""){return this.path()==this.normalize(t+l(i))}normalize(t){return e.stripTrailingSlash(ie(this._basePath,V(t)))}prepareExternalUrl(t){return t&&t[0]!=="/"&&(t="/"+t),this._locationStrategy.prepareExternalUrl(t)}go(t,i="",r=null){this._locationStrategy.pushState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+l(i)),r)}replaceState(t,i="",r=null){this._locationStrategy.replaceState(r,"",t,i),this._notifyUrlChangeListeners(this.prepareExternalUrl(t+l(i)),r)}forward(){this._locationStrategy.forward()}back(){this._locationStrategy.back()}historyGo(t=0){this._locationStrategy.historyGo?.(t)}onUrlChange(t){return this._urlChangeListeners.push(t),this._urlChangeSubscription??=this.subscribe(i=>{this._notifyUrlChangeListeners(i.url,i.state)}),()=>{let i=this._urlChangeListeners.indexOf(t);this._urlChangeListeners.splice(i,1),this._urlChangeListeners.length===0&&(this._urlChangeSubscription?.unsubscribe(),this._urlChangeSubscription=null)}}_notifyUrlChangeListeners(t="",i){this._urlChangeListeners.forEach(r=>r(t,i))}subscribe(t,i,r){return this._subject.subscribe({next:t,error:i,complete:r})}};e.normalizeQueryParams=l,e.joinWithSlash=L,e.stripTrailingSlash=j,e.\u0275fac=function(i){return new(i||e)(h(C))},e.\u0275prov=d({token:e,factory:()=>ne(),providedIn:"root"});let n=e;return n})();function ne(){return new te(h(C))}function ie(n,e){if(!n||!e.startsWith(n))return e;let s=e.substring(n.length);return s===""||["/",";","?","#"].includes(s[0])?s:e}function V(n){return n.replace(/\/index.html$/,"")}function re(n){if(new RegExp("^(https?:)?//").test(n)){let[,s]=n.split(/\/\/[^\/]+/);return s}return n}function Qe(n,e){e=encodeURIComponent(e);for(let s of n.split(";")){let t=s.indexOf("="),[i,r]=t==-1?[s,""]:[s.slice(0,t),s.slice(t+1)];if(i.trim()===e)return decodeURIComponent(r)}return null}var A=/\s+/,G=[],Je=(()=>{let e=class e{constructor(t,i){this._ngEl=t,this._renderer=i,this.initialClasses=G,this.stateMap=new Map}set klass(t){this.initialClasses=t!=null?t.trim().split(A):G}set ngClass(t){this.rawClass=typeof t=="string"?t.trim().split(A):t}ngDoCheck(){for(let i of this.initialClasses)this._updateState(i,!0);let t=this.rawClass;if(Array.isArray(t)||t instanceof Set)for(let i of t)this._updateState(i,!0);else if(t!=null)for(let i of Object.keys(t))this._updateState(i,!!t[i]);this._applyStateDiff()}_updateState(t,i){let r=this.stateMap.get(t);r!==void 0?(r.enabled!==i&&(r.changed=!0,r.enabled=i),r.touched=!0):this.stateMap.set(t,{enabled:i,changed:!0,touched:!0})}_applyStateDiff(){for(let t of this.stateMap){let i=t[0],r=t[1];r.changed?(this._toggleClass(i,r.enabled),r.changed=!1):r.touched||(r.enabled&&this._toggleClass(i,!1),this.stateMap.delete(i)),r.touched=!1}}_toggleClass(t,i){t=t.trim(),t.length>0&&t.split(A).forEach(r=>{i?this._renderer.addClass(this._ngEl.nativeElement,r):this._renderer.removeClass(this._ngEl.nativeElement,r)})}};e.\u0275fac=function(i){return new(i||e)(a(m),a(F))},e.\u0275dir=g({type:e,selectors:[["","ngClass",""]],inputs:{klass:[O.None,"class","klass"],ngClass:"ngClass"},standalone:!0});let n=e;return n})();var S=class{constructor(e,s,t,i){this.$implicit=e,this.ngForOf=s,this.index=t,this.count=i}get first(){return this.index===0}get last(){return this.index===this.count-1}get even(){return this.index%2===0}get odd(){return!this.even}},et=(()=>{let e=class e{set ngForOf(t){this._ngForOf=t,this._ngForOfDirty=!0}set ngForTrackBy(t){this._trackByFn=t}get ngForTrackBy(){return this._trackByFn}constructor(t,i,r){this._viewContainer=t,this._template=i,this._differs=r,this._ngForOf=null,this._ngForOfDirty=!0,this._differ=null}set ngForTemplate(t){t&&(this._template=t)}ngDoCheck(){if(this._ngForOfDirty){this._ngForOfDirty=!1;let t=this._ngForOf;if(!this._differ&&t)if(0)try{}catch{}else this._differ=this._differs.find(t).create(this.ngForTrackBy)}if(this._differ){let t=this._differ.diff(this._ngForOf);t&&this._applyChanges(t)}}_applyChanges(t){let i=this._viewContainer;t.forEachOperation((r,o,u)=>{if(r.previousIndex==null)i.createEmbeddedView(this._template,new S(r.item,this._ngForOf,-1,-1),u===null?void 0:u);else if(u==null)i.remove(o===null?void 0:o);else if(o!==null){let D=i.get(o);i.move(D,u),H(D,r)}});for(let r=0,o=i.length;r<o;r++){let D=i.get(r).context;D.index=r,D.count=o,D.ngForOf=this._ngForOf}t.forEachIdentityChange(r=>{let o=i.get(r.currentIndex);H(o,r)})}static ngTemplateContextGuard(t,i){return!0}};e.\u0275fac=function(i){return new(i||e)(a(y),a(E),a(x))},e.\u0275dir=g({type:e,selectors:[["","ngFor","","ngForOf",""]],inputs:{ngForOf:"ngForOf",ngForTrackBy:"ngForTrackBy",ngForTemplate:"ngForTemplate"},standalone:!0});let n=e;return n})();function H(n,e){n.context.$implicit=e.item}var tt=(()=>{let e=class e{constructor(t,i){this._viewContainer=t,this._context=new _,this._thenTemplateRef=null,this._elseTemplateRef=null,this._thenViewRef=null,this._elseViewRef=null,this._thenTemplateRef=i}set ngIf(t){this._context.$implicit=this._context.ngIf=t,this._updateView()}set ngIfThen(t){Y("ngIfThen",t),this._thenTemplateRef=t,this._thenViewRef=null,this._updateView()}set ngIfElse(t){Y("ngIfElse",t),this._elseTemplateRef=t,this._elseViewRef=null,this._updateView()}_updateView(){this._context.$implicit?this._thenViewRef||(this._viewContainer.clear(),this._elseViewRef=null,this._thenTemplateRef&&(this._thenViewRef=this._viewContainer.createEmbeddedView(this._thenTemplateRef,this._context))):this._elseViewRef||(this._viewContainer.clear(),this._thenViewRef=null,this._elseTemplateRef&&(this._elseViewRef=this._viewContainer.createEmbeddedView(this._elseTemplateRef,this._context)))}static ngTemplateContextGuard(t,i){return!0}};e.\u0275fac=function(i){return new(i||e)(a(y),a(E))},e.\u0275dir=g({type:e,selectors:[["","ngIf",""]],inputs:{ngIf:"ngIf",ngIfThen:"ngIfThen",ngIfElse:"ngIfElse"},standalone:!0});let n=e;return n})(),_=class{constructor(){this.$implicit=null,this.ngIf=null}};function Y(n,e){if(!!!(!e||e.createEmbeddedView))throw new Error(`${n} must be a TemplateRef, but received '${R(e)}'.`)}var nt=(()=>{let e=class e{constructor(t,i,r){this._ngEl=t,this._differs=i,this._renderer=r,this._ngStyle=null,this._differ=null}set ngStyle(t){this._ngStyle=t,!this._differ&&t&&(this._differ=this._differs.find(t).create())}ngDoCheck(){if(this._differ){let t=this._differ.diff(this._ngStyle);t&&this._applyChanges(t)}}_setStyle(t,i){let[r,o]=t.split("."),u=r.indexOf("-")===-1?void 0:$.DashCase;i!=null?this._renderer.setStyle(this._ngEl.nativeElement,r,o?`${i}${o}`:i,u):this._renderer.removeStyle(this._ngEl.nativeElement,r,u)}_applyChanges(t){t.forEachRemovedItem(i=>this._setStyle(i.key,null)),t.forEachAddedItem(i=>this._setStyle(i.key,i.currentValue)),t.forEachChangedItem(i=>this._setStyle(i.key,i.currentValue))}};e.\u0275fac=function(i){return new(i||e)(a(m),a(U),a(F))},e.\u0275dir=g({type:e,selectors:[["","ngStyle",""]],inputs:{ngStyle:"ngStyle"},standalone:!0});let n=e;return n})(),it=(()=>{let e=class e{constructor(t){this._viewContainerRef=t,this._viewRef=null,this.ngTemplateOutletContext=null,this.ngTemplateOutlet=null,this.ngTemplateOutletInjector=null}ngOnChanges(t){if(this._shouldRecreateView(t)){let i=this._viewContainerRef;if(this._viewRef&&i.remove(i.indexOf(this._viewRef)),!this.ngTemplateOutlet){this._viewRef=null;return}let r=this._createContextForwardProxy();this._viewRef=i.createEmbeddedView(this.ngTemplateOutlet,r,{injector:this.ngTemplateOutletInjector??void 0})}}_shouldRecreateView(t){return!!t.ngTemplateOutlet||!!t.ngTemplateOutletInjector}_createContextForwardProxy(){return new Proxy({},{set:(t,i,r)=>this.ngTemplateOutletContext?Reflect.set(this.ngTemplateOutletContext,i,r):!1,get:(t,i,r)=>{if(this.ngTemplateOutletContext)return Reflect.get(this.ngTemplateOutletContext,i,r)}})}};e.\u0275fac=function(i){return new(i||e)(a(y))},e.\u0275dir=g({type:e,selectors:[["","ngTemplateOutlet",""]],inputs:{ngTemplateOutletContext:"ngTemplateOutletContext",ngTemplateOutlet:"ngTemplateOutlet",ngTemplateOutletInjector:"ngTemplateOutletInjector"},standalone:!0,features:[P]});let n=e;return n})();var rt=(()=>{let e=class e{};e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=T({type:e}),e.\u0275inj=B({});let n=e;return n})(),se="browser",oe="server";function ue(n){return n===se}function st(n){return n===oe}var ot=(()=>{let e=class e{};e.\u0275prov=d({token:e,providedIn:"root",factory:()=>ue(f(N))?new b(f(I),window):new v});let n=e;return n})(),b=class{constructor(e,s){this.document=e,this.window=s,this.offset=()=>[0,0]}setOffset(e){Array.isArray(e)?this.offset=()=>e:this.offset=e}getScrollPosition(){return[this.window.scrollX,this.window.scrollY]}scrollToPosition(e){this.window.scrollTo(e[0],e[1])}scrollToAnchor(e){let s=ae(this.document,e);s&&(this.scrollToElement(s),s.focus())}setHistoryScrollRestoration(e){this.window.history.scrollRestoration=e}scrollToElement(e){let s=e.getBoundingClientRect(),t=s.left+this.window.pageXOffset,i=s.top+this.window.pageYOffset,r=this.offset();this.window.scrollTo(t-r[0],i-r[1])}};function ae(n,e){let s=n.getElementById(e)||n.getElementsByName(e)[0];if(s)return s;if(typeof n.createTreeWalker=="function"&&n.body&&typeof n.body.attachShadow=="function"){let t=n.createTreeWalker(n.body,NodeFilter.SHOW_ELEMENT),i=t.currentNode;for(;i;){let r=i.shadowRoot;if(r){let o=r.getElementById(e)||r.querySelector(`[name="${e}"]`);if(o)return o}i=t.nextNode()}}return null}var v=class{setOffset(e){}getScrollPosition(){return[0,0]}scrollToPosition(e){}scrollToAnchor(e){}setHistoryScrollRestoration(e){}},W=class{};var c=function(n){return n[n.State=0]="State",n[n.Transition=1]="Transition",n[n.Sequence=2]="Sequence",n[n.Group=3]="Group",n[n.Animate=4]="Animate",n[n.Keyframes=5]="Keyframes",n[n.Style=6]="Style",n[n.Trigger=7]="Trigger",n[n.Reference=8]="Reference",n[n.AnimateChild=9]="AnimateChild",n[n.AnimateRef=10]="AnimateRef",n[n.Query=11]="Query",n[n.Stagger=12]="Stagger",n}(c||{}),ct="*";function dt(n,e){return{type:c.Trigger,name:n,definitions:e,options:{}}}function lt(n,e=null){return{type:c.Animate,styles:e,timings:n}}function ht(n,e=null){return{type:c.Sequence,steps:n,options:e}}function ft(n){return{type:c.Style,styles:n,offset:null}}function Dt(n,e,s){return{type:c.State,name:n,styles:e,options:s}}function gt(n){return{type:c.Keyframes,steps:n}}function pt(n,e,s=null){return{type:c.Transition,expr:n,animation:e,options:s}}function mt(n,e=null){return{type:c.Reference,animation:n,options:e}}function Ft(n=null){return{type:c.AnimateChild,options:n}}function yt(n,e=null){return{type:c.AnimateRef,animation:n,options:e}}function Ct(n,e,s=null){return{type:c.Query,selector:n,animation:e,options:s}}var q=class{constructor(e=0,s=0){this._onDoneFns=[],this._onStartFns=[],this._onDestroyFns=[],this._originalOnDoneFns=[],this._originalOnStartFns=[],this._started=!1,this._destroyed=!1,this._finished=!1,this._position=0,this.parentPlayer=null,this.totalTime=e+s}_onFinish(){this._finished||(this._finished=!0,this._onDoneFns.forEach(e=>e()),this._onDoneFns=[])}onStart(e){this._originalOnStartFns.push(e),this._onStartFns.push(e)}onDone(e){this._originalOnDoneFns.push(e),this._onDoneFns.push(e)}onDestroy(e){this._onDestroyFns.push(e)}hasStarted(){return this._started}init(){}play(){this.hasStarted()||(this._onStart(),this.triggerMicrotask()),this._started=!0}triggerMicrotask(){queueMicrotask(()=>this._onFinish())}_onStart(){this._onStartFns.forEach(e=>e()),this._onStartFns=[]}pause(){}restart(){}finish(){this._onFinish()}destroy(){this._destroyed||(this._destroyed=!0,this.hasStarted()||this._onStart(),this.finish(),this._onDestroyFns.forEach(e=>e()),this._onDestroyFns=[])}reset(){this._started=!1,this._finished=!1,this._onStartFns=this._originalOnStartFns,this._onDoneFns=this._originalOnDoneFns}setPosition(e){this._position=this.totalTime?e*this.totalTime:1}getPosition(){return this.totalTime?this._position/this.totalTime:1}triggerCallback(e){let s=e=="start"?this._onStartFns:this._onDoneFns;s.forEach(t=>t()),s.length=0}},X=class{constructor(e){this._onDoneFns=[],this._onStartFns=[],this._finished=!1,this._started=!1,this._destroyed=!1,this._onDestroyFns=[],this.parentPlayer=null,this.totalTime=0,this.players=e;let s=0,t=0,i=0,r=this.players.length;r==0?queueMicrotask(()=>this._onFinish()):this.players.forEach(o=>{o.onDone(()=>{++s==r&&this._onFinish()}),o.onDestroy(()=>{++t==r&&this._onDestroy()}),o.onStart(()=>{++i==r&&this._onStart()})}),this.totalTime=this.players.reduce((o,u)=>Math.max(o,u.totalTime),0)}_onFinish(){this._finished||(this._finished=!0,this._onDoneFns.forEach(e=>e()),this._onDoneFns=[])}init(){this.players.forEach(e=>e.init())}onStart(e){this._onStartFns.push(e)}_onStart(){this.hasStarted()||(this._started=!0,this._onStartFns.forEach(e=>e()),this._onStartFns=[])}onDone(e){this._onDoneFns.push(e)}onDestroy(e){this._onDestroyFns.push(e)}hasStarted(){return this._started}play(){this.parentPlayer||this.init(),this._onStart(),this.players.forEach(e=>e.play())}pause(){this.players.forEach(e=>e.pause())}restart(){this.players.forEach(e=>e.restart())}finish(){this._onFinish(),this.players.forEach(e=>e.finish())}destroy(){this._onDestroy()}_onDestroy(){this._destroyed||(this._destroyed=!0,this._onFinish(),this.players.forEach(e=>e.destroy()),this._onDestroyFns.forEach(e=>e()),this._onDestroyFns=[])}reset(){this.players.forEach(e=>e.reset()),this._destroyed=!1,this._finished=!1,this._started=!1}setPosition(e){let s=e*this.totalTime;this.players.forEach(t=>{let i=t.totalTime?Math.min(1,s/t.totalTime):1;t.setPosition(i)})}getPosition(){let e=this.players.reduce((s,t)=>s===null||t.totalTime>s.totalTime?t:s,null);return e!=null?e.getPosition():0}beforeDestroy(){this.players.forEach(e=>{e.beforeDestroy&&e.beforeDestroy()})}triggerCallback(e){let s=e=="start"?this._onStartFns:this._onDoneFns;s.forEach(t=>t()),s.length=0}},Et="!";export{w as a,Ke as b,z as c,I as d,qe as e,C as f,ee as g,Xe as h,te as i,Qe as j,Je as k,et as l,tt as m,nt as n,it as o,rt as p,se as q,ue as r,st as s,ot as t,W as u,c as v,ct as w,dt as x,lt as y,ht as z,ft as A,Dt as B,gt as C,pt as D,mt as E,Ft as F,yt as G,Ct as H,q as I,X as J,Et as K};