var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(b,c,d){b!=Array.prototype&&b!=Object.prototype&&(b[c]=d.value)};$jscomp.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(b){return $jscomp.SYMBOL_PREFIX+(b||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.iterator;b||(b=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[b]&&$jscomp.defineProperty(Array.prototype,b,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(b){var c=0;return $jscomp.iteratorPrototype(function(){return c<b.length?{done:!1,value:b[c++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(b){$jscomp.initSymbolIterator();b={next:b};b[$jscomp.global.Symbol.iterator]=function(){return this};return b};$jscomp.makeIterator=function(b){$jscomp.initSymbolIterator();var c=b[Symbol.iterator];return c?c.call(b):$jscomp.arrayIterator(b)};
$jscomp.polyfill=function(b,c,d,e){if(c){d=$jscomp.global;b=b.split(".");for(e=0;e<b.length-1;e++){var a=b[e];a in d||(d[a]={});d=d[a]}b=b[b.length-1];e=d[b];c=c(e);c!=e&&null!=c&&$jscomp.defineProperty(d,b,{configurable:!0,writable:!0,value:c})}};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(b){function c(){this.batch_=null}function d(f){return f instanceof a?f:new a(function(a,b){a(f)})}if(b&&!$jscomp.FORCE_POLYFILL_PROMISE)return b;c.prototype.asyncExecute=function(a){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(a);return this};c.prototype.asyncExecuteBatch_=function(){var a=this;this.asyncExecuteFunction(function(){a.executeBatch_()})};var e=$jscomp.global.setTimeout;c.prototype.asyncExecuteFunction=function(a){e(a,
0)};c.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var g=a[b];delete a[b];try{g()}catch(k){this.asyncThrow_(k)}}}this.batch_=null};c.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var a=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var f=this.createResolveAndReject_();try{a(f.resolve,f.reject)}catch(g){f.reject(g)}};a.prototype.createResolveAndReject_=
function(){function a(a){return function(f){g||(g=!0,a.call(b,f))}}var b=this,g=!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};a.prototype.resolveTo_=function(f){if(f===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(f instanceof a)this.settleSameAsPromise_(f);else{a:switch(typeof f){case "object":var b=null!=f;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(f):this.fulfill_(f)}};a.prototype.resolveToNonPromiseObj_=function(a){var b=
void 0;try{b=a.then}catch(g){this.reject_(g);return}"function"==typeof b?this.settleSameAsThenable_(b,a):this.fulfill_(a)};a.prototype.reject_=function(a){this.settle_(2,a)};a.prototype.fulfill_=function(a){this.settle_(1,a)};a.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b|"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};a.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=
this.onSettledCallbacks_,b=0;b<a.length;++b)a[b].call(),a[b]=null;this.onSettledCallbacks_=null}};var h=new c;a.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};a.prototype.settleSameAsThenable_=function(a,b){var g=this.createResolveAndReject_();try{a.call(b,g.resolve,g.reject)}catch(k){g.reject(k)}};a.prototype.then=function(b,c){function g(a,b){return"function"==typeof a?function(b){try{f(a(b))}catch(m){e(m)}}:b}var f,e,d=new a(function(a,
b){f=a;e=b});this.callWhenSettled_(g(b,f),g(c,e));return d};a.prototype.catch=function(a){return this.then(void 0,a)};a.prototype.callWhenSettled_=function(a,b){function g(){switch(c.state_){case 1:a(c.result_);break;case 2:b(c.result_);break;default:throw Error("Unexpected state: "+c.state_);}}var c=this;null==this.onSettledCallbacks_?h.asyncExecute(g):this.onSettledCallbacks_.push(function(){h.asyncExecute(g)})};a.resolve=d;a.reject=function(b){return new a(function(a,c){c(b)})};a.race=function(b){return new a(function(a,
c){for(var g=$jscomp.makeIterator(b),e=g.next();!e.done;e=g.next())d(e.value).callWhenSettled_(a,c)})};a.all=function(b){var c=$jscomp.makeIterator(b),g=c.next();return g.done?d([]):new a(function(a,b){function e(b){return function(c){f[b]=c;h--;0==h&&a(f)}}var f=[],h=0;do f.push(void 0),h++,d(g.value).callWhenSettled_(e(f.length-1),b),g=c.next();while(!g.done)})};return a},"es6-impl","es3");
(function(b){function c(e){if(d[e])return d[e].exports;var a=d[e]={i:e,l:!1,exports:{}};b[e].call(a.exports,a,a.exports,c);a.l=!0;return a.exports}var d={};c.m=b;c.c=d;c.d=function(b,a,d){c.o(b,a)||Object.defineProperty(b,a,{configurable:!1,enumerable:!0,get:d})};c.n=function(b){var a=b&&b.__esModule?function(){return b["default"]}:function(){return b};c.d(a,"a",a);return a};c.o=function(b,a){return Object.prototype.hasOwnProperty.call(b,a)};c.p="";return c(c.s=0)})([function(b,c,d){d(1);d(2);d(3);
var e=d(4);e.install({onUpdating:function(){console.log("SW Event:","onUpdating")},onUpdateReady:function(){console.log("SW Event:","onUpdateReady");e.applyUpdate()},onUpdated:function(){console.log("SW Event:","onUpdated");window.location.reload()},onUpdateFailed:function(){console.log("SW Event:","onUpdateFailed")}})},function(b,c,d){b.exports=d.p+"index.html"},function(b,c,d){b.exports=d.p+"embedEn.html"},function(b,c){window.BABYLON=BABYLON;var d=document.getElementById("renderCanvas"),e=new BABYLON.Engine(d,
!0);BABYLON.SceneLoader.Load("","./js/ballistic.babylon",e,function(a){var b=a.activeCamera;window.camera=b;a.executeWhenReady(function(){b.touchMoveSensibility=500;b.touchAngularSensibility=7E4;window.greenMesh=a.getMeshByID("greenCube");window.redMesh=a.getMeshByID("redCube");window.ground=a.getMeshByID("ground");window.greenCube=window.greenMesh.physicsImpostor;window.redCube=window.redMesh.physicsImpostor;window.scene=a;window.lights=a.lights[0];window.shadowGenerator=new BABYLON.ShadowGenerator(1024,
window.lights);window.shadowGenerator.usePoissonSampling=!0;window.shadowGenerator.getShadowMap().renderList.push(window.greenMesh);window.shadowGenerator.getShadowMap().renderList.push(window.redMesh);window.redCube.setLinearVelocity(new BABYLON.Vector3(0,1,0));window.redCube.setAngularVelocity(new BABYLON.Quaternion(10,0,0,0));window.greenCube.applyImpulse(new BABYLON.Vector3(0,15,0),window.greenMesh.getAbsolutePosition());window.greenMesh.actionManager=new BABYLON.ActionManager(a);window.redMesh.actionManager=
new BABYLON.ActionManager(a);window.greenMesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction({trigger:BABYLON.ActionManager.OnPickTrigger,parameter:window.greenMesh},function(){window.greenCube.applyImpulse(new BABYLON.Vector3(0,15,0),window.greenMesh.getAbsolutePosition())}));window.redMesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction({trigger:BABYLON.ActionManager.OnPickTrigger,parameter:window.redMesh},function(){window.redCube.applyImpulse(new BABYLON.Vector3(0,15,0),
window.redMesh.getAbsolutePosition())}));a.activeCamera.attachControl(d);e.runRenderLoop(function(){a.render()})});return a});window.addEventListener("resize",function(){e.resize()})},function(b,c){function d(){return"serviceWorker"in navigator&&(window.fetch||"imageRendering"in document.documentElement.style)&&("https:"===window.location.protocol||"localhost"===window.location.hostname||0===window.location.hostname.indexOf("127."))}var e;c.install=function(a){a||(a={});if(d()){var b=function(a){function b(){switch(d.state){case "redundant":c("onUpdateFailed");
d.onstatechange=null;break;case "installing":h||c("onUpdating");break;case "installed":e||c("onUpdateReady");break;case "activated":c("onUpdated"),d.onstatechange=null}}function g(){switch(d.state){case "redundant":d.onstatechange=null;break;case "activated":c("onInstalled"),d.onstatechange=null}}var d=a.installing||a.waiting,e;if(d&&!d.onstatechange){if(a.active){b();var f=b}else g(),f=g;var h=!0;a.waiting&&(e=!0);d.onstatechange=f}},c=function(b){if("function"===typeof a[b])a[b]({source:"ServiceWorker"})};
navigator.serviceWorker.register("sw.js").then(function(a){a&&(b(a),a.onupdatefound=function(){b(a)})}).catch(function(a){c("onError");return Promise.reject(a)})}else if(window.applicationCache){var l=function(){var b=document.createElement("iframe");window.addEventListener("message",function(c){if(c.source===b.contentWindow&&(c=(c.data+"").match(/__offline-plugin_AppCacheEvent:(\w+)/)[1],"function"===typeof a[c]))a[c]({source:"AppCache"})});b.src="appcache/manifest.html";b.style.display="none";e=
b;document.body.appendChild(b)};"complete"===document.readyState?setTimeout(l):window.addEventListener("load",l)}};c.applyUpdate=function(a,b){if(d())navigator.serviceWorker.getRegistration().then(function(c){c&&c.waiting?(c.waiting.postMessage({action:"skipWaiting"}),a&&a()):b&&b()});else if(e)try{e.contentWindow.__applyUpdate(),a&&setTimeout(a)}catch(f){b&&setTimeout(b)}};c.update=function(){d()&&navigator.serviceWorker.getRegistration().then(function(a){if(a)return a.update()});if(e)try{e.contentWindow.applicationCache.update()}catch(a){}}}]);