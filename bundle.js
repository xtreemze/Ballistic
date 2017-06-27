var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(c,e,b){c!=Array.prototype&&c!=Object.prototype&&(c[e]=b.value)};$jscomp.getGlobal=function(c){return"undefined"!=typeof window&&window===c?c:"undefined"!=typeof global&&null!=global?global:c};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(c){return $jscomp.SYMBOL_PREFIX+(c||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var c=$jscomp.global.Symbol.iterator;c||(c=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[c]&&$jscomp.defineProperty(Array.prototype,c,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(c){var e=0;return $jscomp.iteratorPrototype(function(){return e<c.length?{done:!1,value:c[e++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(c){$jscomp.initSymbolIterator();c={next:c};c[$jscomp.global.Symbol.iterator]=function(){return this};return c};$jscomp.makeIterator=function(c){$jscomp.initSymbolIterator();var e=c[Symbol.iterator];return e?e.call(c):$jscomp.arrayIterator(c)};
$jscomp.polyfill=function(c,e,b,f){if(e){b=$jscomp.global;c=c.split(".");for(f=0;f<c.length-1;f++){var a=c[f];a in b||(b[a]={});b=b[a]}c=c[c.length-1];f=b[c];e=e(f);e!=f&&null!=e&&$jscomp.defineProperty(b,c,{configurable:!0,writable:!0,value:e})}};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(c){function e(){this.batch_=null}function b(d){return d instanceof a?d:new a(function(a,b){a(d)})}if(c&&!$jscomp.FORCE_POLYFILL_PROMISE)return c;e.prototype.asyncExecute=function(d){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(d);return this};e.prototype.asyncExecuteBatch_=function(){var d=this;this.asyncExecuteFunction(function(){d.executeBatch_()})};var f=$jscomp.global.setTimeout;e.prototype.asyncExecuteFunction=function(d){f(d,
0)};e.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var d=this.batch_;this.batch_=[];for(var a=0;a<d.length;++a){var b=d[a];delete d[a];try{b()}catch(k){this.asyncThrow_(k)}}}this.batch_=null};e.prototype.asyncThrow_=function(d){this.asyncExecuteFunction(function(){throw d;})};var a=function(d){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var a=this.createResolveAndReject_();try{d(a.resolve,a.reject)}catch(h){a.reject(h)}};a.prototype.createResolveAndReject_=
function(){function d(d){return function(c){b||(b=!0,d.call(a,c))}}var a=this,b=!1;return{resolve:d(this.resolveTo_),reject:d(this.reject_)}};a.prototype.resolveTo_=function(d){if(d===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(d instanceof a)this.settleSameAsPromise_(d);else{a:switch(typeof d){case "object":var b=null!=d;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(d):this.fulfill_(d)}};a.prototype.resolveToNonPromiseObj_=function(d){var a=
void 0;try{a=d.then}catch(h){this.reject_(h);return}"function"==typeof a?this.settleSameAsThenable_(a,d):this.fulfill_(d)};a.prototype.reject_=function(a){this.settle_(2,a)};a.prototype.fulfill_=function(a){this.settle_(1,a)};a.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b|"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};a.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=
this.onSettledCallbacks_,b=0;b<a.length;++b)a[b].call(),a[b]=null;this.onSettledCallbacks_=null}};var g=new e;a.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};a.prototype.settleSameAsThenable_=function(a,b){var d=this.createResolveAndReject_();try{a.call(b,d.resolve,d.reject)}catch(k){d.reject(k)}};a.prototype.then=function(b,c){function d(a,b){return"function"==typeof a?function(b){try{e(a(b))}catch(l){f(l)}}:b}var e,f,g=new a(function(a,
b){e=a;f=b});this.callWhenSettled_(d(b,e),d(c,f));return g};a.prototype.catch=function(a){return this.then(void 0,a)};a.prototype.callWhenSettled_=function(a,b){function d(){switch(c.state_){case 1:a(c.result_);break;case 2:b(c.result_);break;default:throw Error("Unexpected state: "+c.state_);}}var c=this;null==this.onSettledCallbacks_?g.asyncExecute(d):this.onSettledCallbacks_.push(function(){g.asyncExecute(d)})};a.resolve=b;a.reject=function(b){return new a(function(a,d){d(b)})};a.race=function(d){return new a(function(a,
c){for(var e=$jscomp.makeIterator(d),f=e.next();!f.done;f=e.next())b(f.value).callWhenSettled_(a,c)})};a.all=function(d){var c=$jscomp.makeIterator(d),e=c.next();return e.done?b([]):new a(function(a,d){function f(b){return function(d){g[b]=d;h--;0==h&&a(g)}}var g=[],h=0;do g.push(void 0),h++,b(e.value).callWhenSettled_(f(g.length-1),d),e=c.next();while(!e.done)})};return a},"es6-impl","es3");
(function(c){function e(f){if(b[f])return b[f].exports;var a=b[f]={i:f,l:!1,exports:{}};c[f].call(a.exports,a,a.exports,e);a.l=!0;return a.exports}var b={};e.m=c;e.c=b;e.d=function(b,a,c){e.o(b,a)||Object.defineProperty(b,a,{configurable:!1,enumerable:!0,get:c})};e.n=function(b){var a=b&&b.__esModule?function(){return b["default"]}:function(){return b};e.d(a,"a",a);return a};e.o=function(b,a){return Object.prototype.hasOwnProperty.call(b,a)};e.p="";return e(e.s=0)})([function(c,e,b){b(1);b(2);var f=
b(3);f.install({onUpdating:function(){console.log("SW Event:","onUpdating")},onUpdateReady:function(){console.log("SW Event:","onUpdateReady");f.applyUpdate()},onUpdated:function(){console.log("SW Event:","onUpdated");window.location.reload()},onUpdateFailed:function(){console.log("SW Event:","onUpdateFailed")}})},function(c,e,b){c.exports=b.p+"index.html"},function(c,e){var b=window.BABYLON,f=document.getElementById("renderCanvas"),a=new b.Engine(f,!0,null,!1);b.SceneLoader.Load("","./js/ballistic.babylon",
a,function(c){window.scene=c;window.scene.enablePhysics(new b.Vector3(0,-9.81,0),new b.OimoJSPlugin);window.scene.workerCollisions=!0;window.scene.fogMode=b.Scene.FOGMODE_EXP2;window.scene.fogDensity=.015;window.scene.clearColor=new b.Color3(0,.259,.841);window.scene.fogColor=new b.Color3(.2,.4,.8);window.scene.fogStart=15;window.scene.fogEnd=200;var d=c.activeCamera;window.camera=d;d.touchMoveSensibility=150;d.touchAngularSensibility=6E4;d.angularSensibility=2500;d.speed=.6;c.executeWhenReady(function(){window.greenMesh=
c.getMeshByID("greenCube");window.redMesh=c.getMeshByID("redCube");window.greenMesh2=c.getMeshByID("greenCube2");window.redMesh2=c.getMeshByID("redCube2");window.greenCube=window.greenMesh.physicsImpostor;window.redCube=window.redMesh.physicsImpostor;window.greenCube2=window.greenMesh2.physicsImpostor;window.redCube2=window.redMesh2.physicsImpostor;window.button=b.Mesh.CreateBox("button",.5,c);window.button.material=window.redMesh.material;window.button.parent=d;window.button.position=new b.Vector3(0,
-1,2);window.button.actionManager=new b.ActionManager(c);window.greenMesh.actionManager=new b.ActionManager(c);window.redMesh.actionManager=new b.ActionManager(c);window.greenMesh2.actionManager=new b.ActionManager(c);window.redMesh2.actionManager=new b.ActionManager(c);window.forceUp=function(a,c){a.actionManager.registerAction(new b.ExecuteCodeAction({trigger:b.ActionManager.OnPickTrigger,parameter:a},function(){c.applyImpulse(new b.Vector3(0,100,0),a.getAbsolutePosition())}))};window.forceUp(window.redMesh,
window.redCube);window.forceUp(window.redMesh2,window.redCube2);window.forceUp(window.greenMesh,window.greenCube);window.forceUp(window.greenMesh2,window.greenCube2);window.button.actionManager.registerAction(new b.ExecuteCodeAction({trigger:b.ActionManager.OnPickTrigger,parameter:window.button},function(){window.newMesh=b.Mesh.CreateBox("newMesh",3,c);window.newMesh.material=window.redMesh.material;window.newMesh.rotation.copyFrom(window.camera.rotation);window.newMesh.position.copyFrom(window.button.absolutePosition);
window.newMesh.position.addInPlace(new b.Vector3(0,2,0));window.forwardLocal=new b.Vector3(0,0,40);window.newMesh.setPhysicsState(b.PhysicsEngine.BoxImpostor,{mass:4});window.newImpostor=window.newMesh.physicsImpostor;var a=window.newMesh.getDirection(window.forwardLocal);window.newImpostor.setLinearVelocity(a);window.newMesh.checkCollisions=!0}));c.activeCamera.attachControl(f,!0);a.runRenderLoop(function(){c.render()})});return c});window.addEventListener("resize",function(){a.resize()})},function(c,
e){function b(){return"serviceWorker"in navigator&&(window.fetch||"imageRendering"in document.documentElement.style)&&("https:"===window.location.protocol||"localhost"===window.location.hostname||0===window.location.hostname.indexOf("127."))}var f;e.install=function(a){a||(a={});if(b()){var c=function(a){function b(){switch(e.state){case "redundant":d("onUpdateFailed");e.onstatechange=null;break;case "installing":g||d("onUpdating");break;case "installed":f||d("onUpdateReady");break;case "activated":d("onUpdated"),
e.onstatechange=null}}function c(){switch(e.state){case "redundant":e.onstatechange=null;break;case "activated":d("onInstalled"),e.onstatechange=null}}var e=a.installing||a.waiting,f;if(e&&!e.onstatechange){if(a.active){b();var h=b}else c(),h=c;var g=!0;a.waiting&&(f=!0);e.onstatechange=h}},d=function(b){if("function"===typeof a[b])a[b]({source:"ServiceWorker"})};navigator.serviceWorker.register("sw.js").then(function(a){a&&(c(a),a.onupdatefound=function(){c(a)})}).catch(function(a){d("onError");
return Promise.reject(a)})}else if(window.applicationCache){var e=function(){var b=document.createElement("iframe");window.addEventListener("message",function(c){if(c.source===b.contentWindow&&(c=(c.data+"").match(/__offline-plugin_AppCacheEvent:(\w+)/)[1],"function"===typeof a[c]))a[c]({source:"AppCache"})});b.src="appcache/manifest.html";b.style.display="none";f=b;document.body.appendChild(b)};"complete"===document.readyState?setTimeout(e):window.addEventListener("load",e)}};e.applyUpdate=function(a,
c){if(b())navigator.serviceWorker.getRegistration().then(function(b){b&&b.waiting?(b.waiting.postMessage({action:"skipWaiting"}),a&&a()):c&&c()});else if(f)try{f.contentWindow.__applyUpdate(),a&&setTimeout(a)}catch(d){c&&setTimeout(c)}};e.update=function(){b()&&navigator.serviceWorker.getRegistration().then(function(a){if(a)return a.update()});if(f)try{f.contentWindow.applicationCache.update()}catch(a){}}}]);