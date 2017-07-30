var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(b,d,a){b!=Array.prototype&&b!=Object.prototype&&(b[d]=a.value)};$jscomp.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(b){return $jscomp.SYMBOL_PREFIX+(b||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.iterator;b||(b=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[b]&&$jscomp.defineProperty(Array.prototype,b,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(b){var d=0;return $jscomp.iteratorPrototype(function(){return d<b.length?{done:!1,value:b[d++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(b){$jscomp.initSymbolIterator();b={next:b};b[$jscomp.global.Symbol.iterator]=function(){return this};return b};$jscomp.makeIterator=function(b){$jscomp.initSymbolIterator();var d=b[Symbol.iterator];return d?d.call(b):$jscomp.arrayIterator(b)};
$jscomp.polyfill=function(b,d,a,g){if(d){a=$jscomp.global;b=b.split(".");for(g=0;g<b.length-1;g++){var c=b[g];c in a||(a[c]={});a=a[c]}b=b[b.length-1];g=a[b];d=d(g);d!=g&&null!=d&&$jscomp.defineProperty(a,b,{configurable:!0,writable:!0,value:d})}};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(b){function d(){this.batch_=null}function a(e){return e instanceof c?e:new c(function(a,c){a(e)})}if(b&&!$jscomp.FORCE_POLYFILL_PROMISE)return b;d.prototype.asyncExecute=function(e){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(e);return this};d.prototype.asyncExecuteBatch_=function(){var e=this;this.asyncExecuteFunction(function(){e.executeBatch_()})};var g=$jscomp.global.setTimeout;d.prototype.asyncExecuteFunction=function(e){g(e,
0)};d.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var e=this.batch_;this.batch_=[];for(var a=0;a<e.length;++a){var c=e[a];delete e[a];try{c()}catch(p){this.asyncThrow_(p)}}}this.batch_=null};d.prototype.asyncThrow_=function(e){this.asyncExecuteFunction(function(){throw e;})};var c=function(e){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var a=this.createResolveAndReject_();try{e(a.resolve,a.reject)}catch(f){a.reject(f)}};c.prototype.createResolveAndReject_=
function(){function a(a){return function(e){f||(f=!0,a.call(c,e))}}var c=this,f=!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};c.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof c)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var e=null!=a;break a;case "function":e=!0;break a;default:e=!1}e?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};c.prototype.resolveToNonPromiseObj_=function(a){var c=
void 0;try{c=a.then}catch(f){this.reject_(f);return}"function"==typeof c?this.settleSameAsThenable_(c,a):this.fulfill_(a)};c.prototype.reject_=function(a){this.settle_(2,a)};c.prototype.fulfill_=function(a){this.settle_(1,a)};c.prototype.settle_=function(a,c){if(0!=this.state_)throw Error("Cannot settle("+a+", "+c|"): Promise already settled in state"+this.state_);this.state_=a;this.result_=c;this.executeOnSettledCallbacks_()};c.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=
this.onSettledCallbacks_,c=0;c<a.length;++c)a[c].call(),a[c]=null;this.onSettledCallbacks_=null}};var h=new d;c.prototype.settleSameAsPromise_=function(a){var c=this.createResolveAndReject_();a.callWhenSettled_(c.resolve,c.reject)};c.prototype.settleSameAsThenable_=function(a,c){var f=this.createResolveAndReject_();try{a.call(c,f.resolve,f.reject)}catch(p){f.reject(p)}};c.prototype.then=function(a,b){function f(a,c){return"function"==typeof a?function(c){try{e(a(c))}catch(m){h(m)}}:c}var e,h,d=new c(function(a,
c){e=a;h=c});this.callWhenSettled_(f(a,e),f(b,h));return d};c.prototype.catch=function(a){return this.then(void 0,a)};c.prototype.callWhenSettled_=function(a,c){function f(){switch(b.state_){case 1:a(b.result_);break;case 2:c(b.result_);break;default:throw Error("Unexpected state: "+b.state_);}}var b=this;null==this.onSettledCallbacks_?h.asyncExecute(f):this.onSettledCallbacks_.push(function(){h.asyncExecute(f)})};c.resolve=a;c.reject=function(a){return new c(function(c,f){f(a)})};c.race=function(b){return new c(function(c,
f){for(var h=$jscomp.makeIterator(b),e=h.next();!e.done;e=h.next())a(e.value).callWhenSettled_(c,f)})};c.all=function(b){var h=$jscomp.makeIterator(b),f=h.next();return f.done?a([]):new c(function(c,b){function e(a){return function(b){d[a]=b;g--;0==g&&c(d)}}var d=[],g=0;do d.push(void 0),g++,a(f.value).callWhenSettled_(e(d.length-1),b),f=h.next();while(!f.done)})};return c},"es6-impl","es3");
(function(b){function d(g){if(a[g])return a[g].exports;var c=a[g]={i:g,l:!1,exports:{}};b[g].call(c.exports,c,c.exports,d);c.l=!0;return c.exports}var a={};d.m=b;d.c=a;d.d=function(a,c,b){d.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:b})};d.n=function(a){var c=a&&a.__esModule?function(){return a["default"]}:function(){return a};d.d(c,"a",c);return c};d.o=function(a,c){return Object.prototype.hasOwnProperty.call(a,c)};d.p="";return d(d.s=0)})([function(b,d,a){a(1);a(2);var g=
a(3);g.install({onUpdating:function(){console.log("SW Event:","onUpdating")},onUpdateReady:function(){console.log("SW Event:","onUpdateReady");g.applyUpdate()},onUpdated:function(){console.log("SW Event:","onUpdated");window.location.reload()},onUpdateFailed:function(){console.log("SW Event:","onUpdateFailed")}})},function(b,d,a){b.exports=a.p+"index.html"},function(b,d){var a=window.BABYLON,g=document.getElementById("renderCanvas"),c=new a.Engine(g,!0);a.SceneLoader.Load("","./js/ballistic.babylon",
c,function(b){window.scene=b;var d=new a.Vector3(0,-9.81,0),h=new a.OimoJSPlugin;b.enablePhysics(d,h);b.clearColor=new a.Color3(0,.259,.841);b.fogColor=new a.Color3(.2,.4,.8);var f=b.activeCamera;window.inputManager=f.inputs;f.fov=1.65;f.inertia=.72;f.speed=2;f.angularSensibility=1400;f.touchMoveSensibility=150;f.touchAngularSensibility=7400;b.executeWhenReady(function(){var d=b.getMeshByID("greenCube"),e=b.getMeshByID("redCube"),h=b.getMeshByID("greenCube2"),q=b.getMeshByID("redCube2"),v=b.getMeshByID("ice"),
t=d.physicsImpostor,m=e.physicsImpostor,r=h.physicsImpostor,u=q.physicsImpostor,k=a.Mesh.CreateBox("button",.8,b);window.button=k;k.material=e.material;k.parent=f;k.position=new a.Vector3(0,-2,4);var l=a.Mesh.CreateBox("button2",.7,b);l.material=e.material;l.parent=f;l.position=new a.Vector3(0,-2,6);k.actionManager=new a.ActionManager(b);d.actionManager=new a.ActionManager(b);e.actionManager=new a.ActionManager(b);h.actionManager=new a.ActionManager(b);q.actionManager=new a.ActionManager(b);(new a.Sound("lake",
"./audio/ambient_mixdown.mp3",b,null,{loop:!0,autoplay:!0,maxDistance:10})).attachToMesh(l);var n=function(c,b){c.actionManager.registerAction(new a.ExecuteCodeAction({trigger:a.ActionManager.OnPickTrigger,parameter:c},function(){b.applyImpulse(new a.Vector3(0,100,0),c.getAbsolutePosition())}))};n(e,m);n(q,u);n(d,t);n(h,r);k.actionManager.registerAction(new a.ExecuteCodeAction({trigger:a.ActionManager.OnPickTrigger,parameter:k},function(){window.navigator.vibrate([25,20,25,20,16,14,16,8,15]);var c=
a.Mesh.CreateBox("newMesh",2,b),d=new a.Sound("fire","./audio/fire_mixdown.mp3",b,null,{loop:!1,autoplay:!0,maxDistance:80});d.attachToMesh(c);(new a.Sound("whoosh","./audio/whoosh_mixdown.mp3",b,null,{loop:!1,autoplay:!0,maxDistance:60})).attachToMesh(k);c.material=v.material;c.position.copyFrom(k.absolutePosition);c.rotation.copyFrom(f.rotation);var e=new a.Vector3(0,0,44),g=new a.PhysicsImpostor(c,a.PhysicsImpostor.BoxImpostor,{mass:5},b),e=l.getDirection(e);g.setLinearVelocity(e);c.checkCollisions=
!0;for(var e=[r,t,m,u],h=0;h<e.length;h+=1)g.registerOnPhysicsCollide(e[h],function(c,b){b.object.material.diffuseColor=new a.Color3(Math.random(),Math.random(),Math.random())});e=b.meshes;for(h=0;h<b.meshes.length;h+=1)g.registerOnPhysicsCollide(e[h].physicsImpostor,function(e,f){(new a.Sound("thud","./audio/thud_mixdown.mp3",b,null,{loop:!1,autoplay:!0,maxDistance:160})).attachToMesh(c)}),window.navigator.vibrate(15);setTimeout(function(){c.dispose();g.dispose();d.dispose()},6E3);k.position=new a.Vector3(0,
-2,3.6);k.rotate(a.Axis.Z,Math.PI/3,a.Space.LOCAL);setTimeout(function(){k.position=new a.Vector3(0,-2,4)},45)}));b.activeCamera.attachControl(g,!0);c.runRenderLoop(function(){b.render()})});return b});window.addEventListener("resize",function(){c.resize()})},function(b,d){function a(){return"serviceWorker"in navigator&&(window.fetch||"imageRendering"in document.documentElement.style)&&("https:"===window.location.protocol||"localhost"===window.location.hostname||0===window.location.hostname.indexOf("127."))}
var g;d.install=function(c){c||(c={});if(a()){var b=function(a){function c(){switch(d.state){case "redundant":e("onUpdateFailed");d.onstatechange=null;break;case "installing":h||e("onUpdating");break;case "installed":f||e("onUpdateReady");break;case "activated":e("onUpdated"),d.onstatechange=null}}function b(){switch(d.state){case "redundant":d.onstatechange=null;break;case "activated":e("onInstalled"),d.onstatechange=null}}var d=a.installing||a.waiting,f;if(d&&!d.onstatechange){if(a.active){c();
var g=c}else b(),g=b;var h=!0;a.waiting&&(f=!0);d.onstatechange=g}},e=function(a){if("function"===typeof c[a])c[a]({source:"ServiceWorker"})};navigator.serviceWorker.register("sw.js").then(function(a){a&&(b(a),a.onupdatefound=function(){b(a)})}).catch(function(a){e("onError");return Promise.reject(a)})}else if(window.applicationCache){var d=function(){var a=document.createElement("iframe");window.addEventListener("message",function(b){if(b.source===a.contentWindow&&(b=(b.data+"").match(/__offline-plugin_AppCacheEvent:(\w+)/)[1],
"function"===typeof c[b]))c[b]({source:"AppCache"})});a.src="appcache/manifest.html";a.style.display="none";g=a;document.body.appendChild(a)};"complete"===document.readyState?setTimeout(d):window.addEventListener("load",d)}};d.applyUpdate=function(c,b){if(a())navigator.serviceWorker.getRegistration().then(function(a){a&&a.waiting?(a.waiting.postMessage({action:"skipWaiting"}),c&&c()):b&&b()});else if(g)try{g.contentWindow.__applyUpdate(),c&&setTimeout(c)}catch(e){b&&setTimeout(b)}};d.update=function(){a()&&
navigator.serviceWorker.getRegistration().then(function(a){if(a)return a.update()});if(g)try{g.contentWindow.applicationCache.update()}catch(c){}}}]);