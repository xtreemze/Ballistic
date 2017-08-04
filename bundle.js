var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(c,e,d){c!=Array.prototype&&c!=Object.prototype&&(c[e]=d.value)};$jscomp.getGlobal=function(c){return"undefined"!=typeof window&&window===c?c:"undefined"!=typeof global&&null!=global?global:c};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(c){return $jscomp.SYMBOL_PREFIX+(c||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var c=$jscomp.global.Symbol.iterator;c||(c=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[c]&&$jscomp.defineProperty(Array.prototype,c,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(c){var e=0;return $jscomp.iteratorPrototype(function(){return e<c.length?{done:!1,value:c[e++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(c){$jscomp.initSymbolIterator();c={next:c};c[$jscomp.global.Symbol.iterator]=function(){return this};return c};$jscomp.makeIterator=function(c){$jscomp.initSymbolIterator();var e=c[Symbol.iterator];return e?e.call(c):$jscomp.arrayIterator(c)};
$jscomp.polyfill=function(c,e,d,f){if(e){d=$jscomp.global;c=c.split(".");for(f=0;f<c.length-1;f++){var a=c[f];a in d||(d[a]={});d=d[a]}c=c[c.length-1];f=d[c];e=e(f);e!=f&&null!=e&&$jscomp.defineProperty(d,c,{configurable:!0,writable:!0,value:e})}};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(c){function e(){this.batch_=null}function d(b){return b instanceof a?b:new a(function(a,d){a(b)})}if(c&&!$jscomp.FORCE_POLYFILL_PROMISE)return c;e.prototype.asyncExecute=function(b){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(b);return this};e.prototype.asyncExecuteBatch_=function(){var b=this;this.asyncExecuteFunction(function(){b.executeBatch_()})};var f=$jscomp.global.setTimeout;e.prototype.asyncExecuteFunction=function(b){f(b,
0)};e.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var b=this.batch_;this.batch_=[];for(var a=0;a<b.length;++a){var d=b[a];delete b[a];try{d()}catch(p){this.asyncThrow_(p)}}}this.batch_=null};e.prototype.asyncThrow_=function(b){this.asyncExecuteFunction(function(){throw b;})};var a=function(b){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var a=this.createResolveAndReject_();try{b(a.resolve,a.reject)}catch(h){a.reject(h)}};a.prototype.createResolveAndReject_=
function(){function b(b){return function(c){d||(d=!0,b.call(a,c))}}var a=this,d=!1;return{resolve:b(this.resolveTo_),reject:b(this.reject_)}};a.prototype.resolveTo_=function(b){if(b===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(b instanceof a)this.settleSameAsPromise_(b);else{a:switch(typeof b){case "object":var d=null!=b;break a;case "function":d=!0;break a;default:d=!1}d?this.resolveToNonPromiseObj_(b):this.fulfill_(b)}};a.prototype.resolveToNonPromiseObj_=function(b){var a=
void 0;try{a=b.then}catch(h){this.reject_(h);return}"function"==typeof a?this.settleSameAsThenable_(a,b):this.fulfill_(b)};a.prototype.reject_=function(b){this.settle_(2,b)};a.prototype.fulfill_=function(b){this.settle_(1,b)};a.prototype.settle_=function(b,a){if(0!=this.state_)throw Error("Cannot settle("+b+", "+a|"): Promise already settled in state"+this.state_);this.state_=b;this.result_=a;this.executeOnSettledCallbacks_()};a.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var b=
this.onSettledCallbacks_,a=0;a<b.length;++a)b[a].call(),b[a]=null;this.onSettledCallbacks_=null}};var g=new e;a.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};a.prototype.settleSameAsThenable_=function(a,d){var b=this.createResolveAndReject_();try{a.call(d,b.resolve,b.reject)}catch(p){b.reject(p)}};a.prototype.then=function(b,d){function c(a,b){return"function"==typeof a?function(b){try{e(a(b))}catch(m){f(m)}}:b}var e,f,g=new a(function(a,
b){e=a;f=b});this.callWhenSettled_(c(b,e),c(d,f));return g};a.prototype.catch=function(a){return this.then(void 0,a)};a.prototype.callWhenSettled_=function(a,d){function b(){switch(c.state_){case 1:a(c.result_);break;case 2:d(c.result_);break;default:throw Error("Unexpected state: "+c.state_);}}var c=this;null==this.onSettledCallbacks_?g.asyncExecute(b):this.onSettledCallbacks_.push(function(){g.asyncExecute(b)})};a.resolve=d;a.reject=function(b){return new a(function(a,d){d(b)})};a.race=function(b){return new a(function(a,
c){for(var e=$jscomp.makeIterator(b),f=e.next();!f.done;f=e.next())d(f.value).callWhenSettled_(a,c)})};a.all=function(b){var c=$jscomp.makeIterator(b),e=c.next();return e.done?d([]):new a(function(a,b){function f(b){return function(d){g[b]=d;h--;0==h&&a(g)}}var g=[],h=0;do g.push(void 0),h++,d(e.value).callWhenSettled_(f(g.length-1),b),e=c.next();while(!e.done)})};return a},"es6-impl","es3");
(function(c){function e(f){if(d[f])return d[f].exports;var a=d[f]={i:f,l:!1,exports:{}};c[f].call(a.exports,a,a.exports,e);a.l=!0;return a.exports}var d={};e.m=c;e.c=d;e.d=function(d,a,c){e.o(d,a)||Object.defineProperty(d,a,{configurable:!1,enumerable:!0,get:c})};e.n=function(d){var a=d&&d.__esModule?function(){return d["default"]}:function(){return d};e.d(a,"a",a);return a};e.o=function(d,a){return Object.prototype.hasOwnProperty.call(d,a)};e.p="";return e(e.s=0)})([function(c,e,d){d(1);d(2);var f=
d(3);f.install({onUpdating:function(){console.log("SW Event:","onUpdating")},onUpdateReady:function(){console.log("SW Event:","onUpdateReady");f.applyUpdate()},onUpdated:function(){console.log("SW Event:","onUpdated");window.location.reload()},onUpdateFailed:function(){console.log("SW Event:","onUpdateFailed")}})},function(c,e,d){c.exports=d.p+"index.html"},function(c,e){var d=window.BABYLON;window.up=130;window.forward=93;var f=document.getElementById("renderCanvas"),a=new d.Engine(f,!0);d.SceneLoader.Load("",
"./js/ballistic.babylon",a,function(c){new d.Sound("lake","./audio/ambient_mixdown.mp3",c,null,{loop:!0,autoplay:!0,volume:.2});var b=c.activeCamera;window.inputManager=b.inputs;b.fov=1.5;b.inertia=.72;b.speed=2.2;b.angularSensibility=1400;b.touchMoveSensibility=180;b.touchAngularSensibility=12E3;c.executeWhenReady(function(){var e=c.getMeshByID("greenCube"),h=c.getMeshByID("icebergMesh"),g=c.getMeshByID("monkeyMesh"),l=c.getMeshByID("redCube"),u=c.getMeshByID("greenCube2"),q=c.getMeshByID("redCube2"),
r=c.getMeshByID("ice"),t=e.physicsImpostor,m=l.physicsImpostor,v=u.physicsImpostor,w=q.physicsImpostor,x=g.physicsImpostor,y=h.physicsImpostor,k=d.Mesh.CreateBox("button",.8,c);window.button=k;window.cube=m;window.cubeMesh=l;window.camera=b;window.setInterval(function(){l.lookAt(b.position);var a=b.position.subtract(l.position);a.normalize();a=a.scale(window.forward);a.y=window.up;var c=l.position.subtract(new d.Vector3(0,2,0));m.applyImpulse(a,c)},2E3);k.material=l.material;k.parent=b;k.position=
new d.Vector3(0,-2,4);var n=d.Mesh.CreateBox("button2",.7,c);n.material=l.material;n.parent=b;n.position=new d.Vector3(0,-2,6);k.actionManager=new d.ActionManager(c);k.actionManager.registerAction(new d.ExecuteCodeAction({trigger:d.ActionManager.OnPickTrigger,parameter:k},function(){k.position=new d.Vector3(0,-2,3.6);k.rotate(d.Axis.Z,Math.PI/-9,d.Space.LOCAL);setTimeout(function(){k.position=new d.Vector3(0,-2,4)},30);!1===!window.navigator.vibrate&&window.navigator.vibrate([38,8,32]);var a=d.Mesh.CreateBox("newMesh",
2,c),e=new d.Sound("whoosh","./audio/whoosh_mixdown.mp3",c,null,{loop:!1,autoplay:!0,volume:.8});e.onended=e.dispose();a.material=r.material;a.position.copyFrom(k.absolutePosition);a.rotation.copyFrom(b.rotation);var f=new d.PhysicsImpostor(a,d.PhysicsImpostor.BoxImpostor,{mass:5,restitution:.2,friction:10},c),e=new d.Vector3(0,0,44),e=n.getDirection(e);f.setLinearVelocity(e);f.registerOnPhysicsCollide([v,t,m,w,x,y],function(a,b){a=new d.Sound("thud","./audio/thud_mixdown.mp3",c,null,{loop:!1,autoplay:!0,
maxDistance:180,volume:2/3});a.attachToMesh(b.object.geometry._meshes[0]);a.onended=a.dispose();!1===!window.navigator.vibrate&&window.navigator.vibrate([50,8,60])});setTimeout(function(){a.dispose();f.dispose()},2800)}));c.activeCamera.attachControl(f,!0);a.runRenderLoop(function(){c.render()})});return c});window.addEventListener("resize",function(){a.resize()})},function(c,e){function d(){return"serviceWorker"in navigator&&(window.fetch||"imageRendering"in document.documentElement.style)&&("https:"===
window.location.protocol||"localhost"===window.location.hostname||0===window.location.hostname.indexOf("127."))}var f;e.install=function(a){a||(a={});if(d()){var c=function(a){function c(){switch(e.state){case "redundant":b("onUpdateFailed");e.onstatechange=null;break;case "installing":g||b("onUpdating");break;case "installed":f||b("onUpdateReady");break;case "activated":b("onUpdated"),e.onstatechange=null}}function d(){switch(e.state){case "redundant":e.onstatechange=null;break;case "activated":b("onInstalled"),
e.onstatechange=null}}var e=a.installing||a.waiting,f;if(e&&!e.onstatechange){if(a.active){c();var h=c}else d(),h=d;var g=!0;a.waiting&&(f=!0);e.onstatechange=h}},b=function(b){if("function"===typeof a[b])a[b]({source:"ServiceWorker"})};navigator.serviceWorker.register("sw.js").then(function(a){a&&(c(a),a.onupdatefound=function(){c(a)})}).catch(function(a){b("onError");return Promise.reject(a)})}else if(window.applicationCache){var e=function(){var b=document.createElement("iframe");window.addEventListener("message",
function(c){if(c.source===b.contentWindow&&(c=(c.data+"").match(/__offline-plugin_AppCacheEvent:(\w+)/)[1],"function"===typeof a[c]))a[c]({source:"AppCache"})});b.src="appcache/manifest.html";b.style.display="none";f=b;document.body.appendChild(b)};"complete"===document.readyState?setTimeout(e):window.addEventListener("load",e)}};e.applyUpdate=function(a,c){if(d())navigator.serviceWorker.getRegistration().then(function(b){b&&b.waiting?(b.waiting.postMessage({action:"skipWaiting"}),a&&a()):c&&c()});
else if(f)try{f.contentWindow.__applyUpdate(),a&&setTimeout(a)}catch(b){c&&setTimeout(c)}};e.update=function(){d()&&navigator.serviceWorker.getRegistration().then(function(a){if(a)return a.update()});if(f)try{f.contentWindow.applicationCache.update()}catch(a){}}}]);