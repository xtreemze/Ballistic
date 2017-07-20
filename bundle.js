var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(c,d,b){c!=Array.prototype&&c!=Object.prototype&&(c[d]=b.value)};$jscomp.getGlobal=function(c){return"undefined"!=typeof window&&window===c?c:"undefined"!=typeof global&&null!=global?global:c};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(c){return $jscomp.SYMBOL_PREFIX+(c||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var c=$jscomp.global.Symbol.iterator;c||(c=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[c]&&$jscomp.defineProperty(Array.prototype,c,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(c){var d=0;return $jscomp.iteratorPrototype(function(){return d<c.length?{done:!1,value:c[d++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(c){$jscomp.initSymbolIterator();c={next:c};c[$jscomp.global.Symbol.iterator]=function(){return this};return c};$jscomp.makeIterator=function(c){$jscomp.initSymbolIterator();var d=c[Symbol.iterator];return d?d.call(c):$jscomp.arrayIterator(c)};
$jscomp.polyfill=function(c,d,b,g){if(d){b=$jscomp.global;c=c.split(".");for(g=0;g<c.length-1;g++){var a=c[g];a in b||(b[a]={});b=b[a]}c=c[c.length-1];g=b[c];d=d(g);d!=g&&null!=d&&$jscomp.defineProperty(b,c,{configurable:!0,writable:!0,value:d})}};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(c){function d(){this.batch_=null}function b(e){return e instanceof a?e:new a(function(a,b){a(e)})}if(c&&!$jscomp.FORCE_POLYFILL_PROMISE)return c;d.prototype.asyncExecute=function(e){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(e);return this};d.prototype.asyncExecuteBatch_=function(){var e=this;this.asyncExecuteFunction(function(){e.executeBatch_()})};var g=$jscomp.global.setTimeout;d.prototype.asyncExecuteFunction=function(e){g(e,
0)};d.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var e=this.batch_;this.batch_=[];for(var a=0;a<e.length;++a){var b=e[a];delete e[a];try{b()}catch(n){this.asyncThrow_(n)}}}this.batch_=null};d.prototype.asyncThrow_=function(e){this.asyncExecuteFunction(function(){throw e;})};var a=function(e){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var a=this.createResolveAndReject_();try{e(a.resolve,a.reject)}catch(f){a.reject(f)}};a.prototype.createResolveAndReject_=
function(){function a(a){return function(e){f||(f=!0,a.call(b,e))}}var b=this,f=!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};a.prototype.resolveTo_=function(e){if(e===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(e instanceof a)this.settleSameAsPromise_(e);else{a:switch(typeof e){case "object":var b=null!=e;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(e):this.fulfill_(e)}};a.prototype.resolveToNonPromiseObj_=function(a){var b=
void 0;try{b=a.then}catch(f){this.reject_(f);return}"function"==typeof b?this.settleSameAsThenable_(b,a):this.fulfill_(a)};a.prototype.reject_=function(a){this.settle_(2,a)};a.prototype.fulfill_=function(a){this.settle_(1,a)};a.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b|"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};a.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=
this.onSettledCallbacks_,b=0;b<a.length;++b)a[b].call(),a[b]=null;this.onSettledCallbacks_=null}};var h=new d;a.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};a.prototype.settleSameAsThenable_=function(a,b){var f=this.createResolveAndReject_();try{a.call(b,f.resolve,f.reject)}catch(n){f.reject(n)}};a.prototype.then=function(b,c){function f(a,b){return"function"==typeof a?function(b){try{e(a(b))}catch(q){d(q)}}:b}var e,d,h=new a(function(a,
b){e=a;d=b});this.callWhenSettled_(f(b,e),f(c,d));return h};a.prototype.catch=function(a){return this.then(void 0,a)};a.prototype.callWhenSettled_=function(a,b){function f(){switch(e.state_){case 1:a(e.result_);break;case 2:b(e.result_);break;default:throw Error("Unexpected state: "+e.state_);}}var e=this;null==this.onSettledCallbacks_?h.asyncExecute(f):this.onSettledCallbacks_.push(function(){h.asyncExecute(f)})};a.resolve=b;a.reject=function(b){return new a(function(a,f){f(b)})};a.race=function(e){return new a(function(a,
f){for(var c=$jscomp.makeIterator(e),d=c.next();!d.done;d=c.next())b(d.value).callWhenSettled_(a,f)})};a.all=function(e){var c=$jscomp.makeIterator(e),f=c.next();return f.done?b([]):new a(function(a,e){function d(b){return function(e){h[b]=e;g--;0==g&&a(h)}}var h=[],g=0;do h.push(void 0),g++,b(f.value).callWhenSettled_(d(h.length-1),e),f=c.next();while(!f.done)})};return a},"es6-impl","es3");
(function(c){function d(g){if(b[g])return b[g].exports;var a=b[g]={i:g,l:!1,exports:{}};c[g].call(a.exports,a,a.exports,d);a.l=!0;return a.exports}var b={};d.m=c;d.c=b;d.d=function(b,a,c){d.o(b,a)||Object.defineProperty(b,a,{configurable:!1,enumerable:!0,get:c})};d.n=function(b){var a=b&&b.__esModule?function(){return b["default"]}:function(){return b};d.d(a,"a",a);return a};d.o=function(b,a){return Object.prototype.hasOwnProperty.call(b,a)};d.p="";return d(d.s=0)})([function(c,d,b){b(1);b(2);var g=
b(3);g.install({onUpdating:function(){console.log("SW Event:","onUpdating")},onUpdateReady:function(){console.log("SW Event:","onUpdateReady");g.applyUpdate()},onUpdated:function(){console.log("SW Event:","onUpdated");window.location.reload()},onUpdateFailed:function(){console.log("SW Event:","onUpdateFailed")}})},function(c,d,b){c.exports=b.p+"index.html"},function(c,d){var b=window.BABYLON,g=document.getElementById("renderCanvas"),a=new b.Engine(g,!0);b.SceneLoader.Load("","./js/ballistic.babylon",
a,function(c){var e=new b.Vector3(0,-9.81,0),d=new b.OimoJSPlugin;c.enablePhysics(e,d);c.workerCollisions=!0;c.fogMode=b.Scene.FOGMODE_EXP2;c.fogDensity=.01;c.fogStart=15;c.fogEnd=150;c.clearColor=new b.Color3(0,.259,.841);c.fogColor=new b.Color3(.2,.4,.8);var f=c.activeCamera;f.fov=1.65;f.inertia=.72;f.speed=2;f.angularSensibility=1400;f.touchMoveSensibility=150;f.touchAngularSensibility=7400;c.executeWhenReady(function(){var e=c.getMeshByID("greenCube"),d=c.getMeshByID("redCube"),h=c.getMeshByID("greenCube2"),
p=c.getMeshByID("redCube2"),t=c.getMeshByID("ice"),u=e.physicsImpostor,q=d.physicsImpostor,r=h.physicsImpostor,v=p.physicsImpostor,k=b.Mesh.CreateBox("button",.8,c);k.material=d.material;k.parent=f;k.position=new b.Vector3(0,-2,4);var l=b.Mesh.CreateBox("button2",.7,c);l.material=d.material;l.parent=f;l.position=new b.Vector3(0,-2,6);k.actionManager=new b.ActionManager(c);e.actionManager=new b.ActionManager(c);d.actionManager=new b.ActionManager(c);h.actionManager=new b.ActionManager(c);p.actionManager=
new b.ActionManager(c);var m=function(a,c){a.actionManager.registerAction(new b.ExecuteCodeAction({trigger:b.ActionManager.OnPickTrigger,parameter:a},function(){c.applyImpulse(new b.Vector3(0,100,0),a.getAbsolutePosition())}))};m(d,q);m(p,v);m(e,u);m(h,r);k.actionManager.registerAction(new b.ExecuteCodeAction({trigger:b.ActionManager.OnPickTrigger,parameter:k},function(){window.navigator.vibrate(16);var a=b.Mesh.CreateBox("newMesh",2,c);a.material=t.material;a.position.copyFrom(l.absolutePosition);
a.rotation.copyFrom(f.rotation);var e=new b.Vector3(0,0,70),d=new b.PhysicsImpostor(a,b.PhysicsImpostor.BoxImpostor,{mass:3},c),e=a.getDirection(e);d.setLinearVelocity(e);a.checkCollisions=!0;setTimeout(function(){a.dispose()},5E3);k.position=new b.Vector3(0,-2,3.6);k.rotate(b.Axis.Z,Math.PI/3,b.Space.LOCAL);setTimeout(function(){k.position=new b.Vector3(0,-2,4);window.navigator.vibrate(8)},85)}));c.activeCamera.attachControl(g,!0);a.runRenderLoop(function(){c.render()})});return c});window.addEventListener("resize",
function(){a.resize()})},function(c,d){function b(){return"serviceWorker"in navigator&&(window.fetch||"imageRendering"in document.documentElement.style)&&("https:"===window.location.protocol||"localhost"===window.location.hostname||0===window.location.hostname.indexOf("127."))}var g;d.install=function(a){a||(a={});if(b()){var c=function(a){function b(){switch(d.state){case "redundant":e("onUpdateFailed");d.onstatechange=null;break;case "installing":h||e("onUpdating");break;case "installed":f||e("onUpdateReady");
break;case "activated":e("onUpdated"),d.onstatechange=null}}function c(){switch(d.state){case "redundant":d.onstatechange=null;break;case "activated":e("onInstalled"),d.onstatechange=null}}var d=a.installing||a.waiting,f;if(d&&!d.onstatechange){if(a.active){b();var g=b}else c(),g=c;var h=!0;a.waiting&&(f=!0);d.onstatechange=g}},e=function(b){if("function"===typeof a[b])a[b]({source:"ServiceWorker"})};navigator.serviceWorker.register("sw.js").then(function(a){a&&(c(a),a.onupdatefound=function(){c(a)})}).catch(function(a){e("onError");
return Promise.reject(a)})}else if(window.applicationCache){var d=function(){var b=document.createElement("iframe");window.addEventListener("message",function(c){if(c.source===b.contentWindow&&(c=(c.data+"").match(/__offline-plugin_AppCacheEvent:(\w+)/)[1],"function"===typeof a[c]))a[c]({source:"AppCache"})});b.src="appcache/manifest.html";b.style.display="none";g=b;document.body.appendChild(b)};"complete"===document.readyState?setTimeout(d):window.addEventListener("load",d)}};d.applyUpdate=function(a,
c){if(b())navigator.serviceWorker.getRegistration().then(function(b){b&&b.waiting?(b.waiting.postMessage({action:"skipWaiting"}),a&&a()):c&&c()});else if(g)try{g.contentWindow.__applyUpdate(),a&&setTimeout(a)}catch(e){c&&setTimeout(c)}};d.update=function(){b()&&navigator.serviceWorker.getRegistration().then(function(a){if(a)return a.update()});if(g)try{g.contentWindow.applicationCache.update()}catch(a){}}}]);