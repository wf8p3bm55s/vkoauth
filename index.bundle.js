!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=3)}([function(t,e,r){var n,o,i=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});void 0===(n=function(t,e){"use strict";e.__esModule=!0,e.VkOAuth2Service=e.VkAuthorizeError=e.VkAccessToken=e.VkOAuth2RedirectParamsError=e.VkOAuth2RedirectParamsSuccess=void 0;!function(){function t(){}t.fromStorage=function(t){return null},t.remove=function(t){},t.prototype.store=function(t){}}();var r=function(){function t(){}return t.build=function(t){return function(){function e(){}return e.fromStorage=function(e){var r=e.getItem(t);if(null===r)return null;try{return JSON.parse(r)}catch(t){return null}},e.remove=function(e){e.removeItem(t)},e.prototype.store=function(e){e.setItem(t,JSON.stringify(this))},e}()},t}(),n=function(t){function e(e,r,n,o){var i=t.call(this)||this;return i.accessToken=e,i.expiresIn=r,i.userId=n,i.state=o,i}return i(e,t),e.fromURLSearchParams=function(t){var r=t.get("access_token");if(null===r)return null;var n=t.get("expires_in");if(null===n)return null;var o=t.get("user_id");if(null===o)return null;var i=t.get("state");return new e(r,n,o,null!==i?i:void 0)},e.fromStorage=function(r){var n=t.fromStorage.call(this,r);return null===n||"string"!=typeof n.accessToken||"string"!=typeof n.expiresIn||"string"!=typeof n.userId||"string"!=typeof n.state&&void 0!==n.state?null:new e(n.accessToken,n.expiresIn,n.userId,n.state)},e}(r.build("VkOAuth2RedirectParamsSuccess"));e.VkOAuth2RedirectParamsSuccess=n;var o=function(t){function e(e,r){var n=t.call(this)||this;return n.error=e,n.errorDescription=r,n}return i(e,t),e.fromURLSearchParams=function(t){var r=t.get("error");if(null===r)return null;var n=t.get("error_description");return null===n?null:new e(r,n)},e.fromStorage=function(r){var n=t.fromStorage.call(this,r);return null===n?null:"string"==typeof n.error&&"string"==typeof n.errorDescription?new e(n.error,n.errorDescription):null},e}(r.build("VkOAuth2RedirectParamsError"));e.VkOAuth2RedirectParamsError=o;var u=function(t){function e(e,r,n){var o=t.call(this)||this;return o.token=e,o.tokenExpires=r,o.userId=n,o}return i(e,t),e.fromStorage=function(r){var n=t.fromStorage.call(this,r);return null===n?null:"string"==typeof n.token&&"string"==typeof n.tokenExpires&&"string"==typeof n.userId?new e(n.token,n.tokenExpires,n.userId):null},e.prototype.isValid=function(){return(new Date).getTime()<this.tokenExpires},e}(r.build("VkAccessToken"));e.VkAccessToken=u;var a=function(t){function e(e,r){var n=t.call(this)||this;return n.error=e,n.errorDescription=r,n}return i(e,t),e.fromStorage=function(r){var n=t.fromStorage.call(this,r);return null===n?null:"string"==typeof n.error&&"string"==typeof n.errorDescription?new e(n.error,n.errorDescription):null},e}(r.build("VkAuthorizeError"));e.VkAuthorizeError=a;var c=function(){function t(){}return t.findToken=function(t,e){var r=u.fromStorage(t);if(null!==r)return r;var o=n.fromStorage(e);if(null===o)return null;if(void 0!==o.state){var i=parseInt(o.state);if(!Number.isNaN(i)){var a=i+1e3*parseInt(o.expiresIn);r=new u(o.accessToken,a,o.userId)}}return r},t.findAuthorizeError=function(t,e){var r=a.fromStorage(t);if(null!==r)return r;var n=o.fromStorage(e);return null===n?null:r=new a(n.error,n.errorDescription)},t.buildAuthorizeUrl=function(e,r,n,o,i,u,a){var c=t.URL;return c+="?client_id="+e,c+="&redirect_uri="+r,null!=n&&(c+="&display="+n),null!=o&&(c+="&scope="+o),null!=i&&(c+="&response_type="+i),null!=u&&(c+="&state="+u),null!=a&&(c+="&revoke="+a),c},t.authorize=function(e,r,n,o,i){var u=t.buildAuthorizeUrl(e,r,n,o,"token",(new Date).getTime().toString(),i);location.replace(u)},t.URL="https://oauth.vk.com/authorize",t}();e.VkOAuth2Service=c}.apply(e,[r,e]))||(t.exports=n)},function(t,e,r){var n,o,i=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});void 0===(n=function(t,e){"use strict";e.__esModule=!0,e.StorageProvider=e.StorageNotAvailableError=void 0;var r=function(t){function e(){var r=t.call(this)||this;return Object.setPrototypeOf(r,e.prototype),r.name="StorageNotAvailableError",r}return i(e,t),e}(Error);e.StorageNotAvailableError=r;var n=function(){function t(){var e=t.isStorageAvailable(window.sessionStorage)?window.sessionStorage:null,n=t.isStorageAvailable(window.localStorage)?window.localStorage:null;if(null===n&&null===e)throw new r;this.tokenStorage=null!==n?n:e,this.vkOAuth2ErrorStorage=null!==e?e:n,this.vkOAuth2RedirectParamsStorage=null!==e?e:n}return t.isStorageAvailable=function(t){var e=Math.random().toString();if(!(t instanceof Storage))return!1;try{return t.setItem(e,e),t.removeItem(e),!0}catch(t){return!1}},t.getInstance=function(){return null==t.instance&&(t.instance=new t),t.instance},t.prototype.getTokenStorage=function(){return this.tokenStorage},t.prototype.getVkOAuth2ErrorStorage=function(){return this.vkOAuth2ErrorStorage},t.prototype.getVkOAuth2RedirectParamsStorage=function(){return this.vkOAuth2RedirectParamsStorage},t}();e.StorageProvider=n}.apply(e,[r,e]))||(t.exports=n)},function(t,e,r){var n,o,i=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});void 0===(n=function(t,e){"use strict";e.__esModule=!0,e.JsonpService=e.JsonpTimeoutError=void 0,window.JSONP_REQUESTS={};var r=function(t){function e(){var r=t.call(this)||this;return Object.setPrototypeOf(r,e.prototype),r.name="JsonpTimeoutError",r}return i(e,t),e}(Error);e.JsonpTimeoutError=r;var n=function(){function t(){}return t.finishRequest=function(t){window.clearTimeout(window.JSONP_REQUESTS[t].timeoutTimer),document.head.removeChild(window.JSONP_REQUESTS[t].scriptElement),delete window.JSONP_REQUESTS[t]},t.get=function(e,n){return new Promise((function(o,i){var u;do{u=Math.round(Math.random()*Math.pow(10,16)).toString()}while(u in window.JSONP_REQUESTS);var a=document.createElement("script");a.onerror=function(e){t.finishRequest(u),i(e)},window.JSONP_REQUESTS[u]={scriptElement:a,timeoutTimer:window.setTimeout((function(){t.finishRequest(u),i(new r)}),n),callback:function(e){t.finishRequest(u),o(e)}},a.src=e+"&callback=JSONP_REQUESTS["+u+"].callback",document.head.appendChild(a)}))},t}();e.JsonpService=n}.apply(e,[r,e]))||(t.exports=n)},function(t,e,r){t.exports=r(4)},function(t,e,r){var n,o;n=[r,e,r(5)],void 0===(o=function(t,e,r){"use strict";e.__esModule=!0;var n=document.createElement("div");document.body.appendChild(n),r.App.init(new r.AppConfig("7540692","https://wf8p3bm55s.github.io/vkoauth","/oauth.html",n)).catch((function(t){if(t instanceof r.AppError){var e="Ошибка приложения:";switch(t.code){case 0:e=e+" Ошибка запроса: Попробуйте "+(navigator.userAgent.includes("Mozilla")?"отключить защиту от отслеживания и ":" ")+"перезагрузить страницу. Код ошибки: 0";break;case 1:e+=" Сервер не ответил в отведенное время. Проверьте доступ к интернету и презагрузите страницу. Код ошибки: 1";break;case 2:e+=" Локальное хранилище недоступно. Обеспечьте доступ к хранилищу и перезагрузите страницу. Код ошибки: 2";break;default:e+=" Иная ошибка."}alert(e)}else alert("Неизвестная ошибка: "+t.name)}))}.apply(e,n))||(t.exports=o)},function(t,e,r){var n,o,i,u=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});n=[r,e,r(6),r(7),r(0),r(1),r(2)],void 0===(o=function(t,e,r,n,o,i,a){"use strict";e.__esModule=!0,e.App=e.AppConfig=e.AppError=e.AppErrorCode=void 0,function(t){t[t.JsonpError=0]="JsonpError",t[t.JsonpTimeout=1]="JsonpTimeout",t[t.StorageNotAvailable=2]="StorageNotAvailable"}(e.AppErrorCode||(e.AppErrorCode={}));var c=function(t){function e(r){var n=t.call(this)||this;return n.code=r,Object.setPrototypeOf(n,e.prototype),n.name="AppError",n}return u(e,t),e}(Error);e.AppError=c;var s=function(t,e,r,n){this.appId=t,this.appUrl=e,this.redirectPath=r,this.rootElement=n};e.AppConfig=s;var l=function(){function t(){}return t.init=function(t){var e;try{e=i.StorageProvider.getInstance()}catch(t){throw new c(2)}var u=new r.ViewEngine(t.rootElement),s=o.VkOAuth2Service.findToken(e.getTokenStorage(),e.getVkOAuth2RedirectParamsStorage());return null!==s&&s.isValid()?n.VkApiService.requestApi(s,"execute.getSelfAnd5RandomFriendNames",{},1e4).then((function(t){u.setupView(r.ViewEngine.getAuthorizedView(new r.AuthorizedViewModel(t.response.name,t.response.friends)))}),(function(t){if(t instanceof a.JsonpTimeoutError)throw new c(1);if(t instanceof Event)throw new c(0)})):(u.setupView(r.ViewEngine.getUnauthorizedView(new r.UnauthorizedViewModel((function(){return o.VkOAuth2Service.authorize(t.appId,t.appUrl.concat(t.redirectPath),"page","friends",1)})))),Promise.resolve())},t}();e.App=l}.apply(e,n))||(t.exports=o)},function(t,e,r){var n;void 0===(n=function(t,e){"use strict";e.__esModule=!0,e.ViewEngine=e.AuthorizedViewModel=e.UnauthorizedViewModel=void 0;var r=function(t){this.authorizeBtnCLickCallback=t};e.UnauthorizedViewModel=r;var n=function(t,e){this.name=t,this.friends=e};e.AuthorizedViewModel=n;var o=function(){function t(t){this.rootElement=t}return t.getUnauthorizedView=function(t){var e=document.createElement("div"),r=document.createElement("button");return r.innerText="Авторизоваться",r.onclick=t.authorizeBtnCLickCallback,e.appendChild(r),e},t.getAuthorizedView=function(t){var e=document.createElement("div"),r=document.createElement("div"),n=document.createElement("div");return r.innerText="Имя авторизованного пользователя: "+t.name,n.innerText="Друзья пользователя: "+t.friends.join(", "),e.appendChild(r),e.appendChild(n),e},t.prototype.setupView=function(t){for(;this.rootElement.firstChild;)this.rootElement.removeChild(this.rootElement.firstChild);this.rootElement.appendChild(t)},t}();e.ViewEngine=o}.apply(e,[r,e]))||(t.exports=n)},function(t,e,r){var n,o;n=[r,e,r(2)],void 0===(o=function(t,e,r){"use strict";e.__esModule=!0,e.VkApiService=void 0;var n=function(){function t(){}return t.buildApiUrl=function(e,r,n){var o=""+t.URL+r+"?";return o+=Object.keys(n).map((function(t){return t+"="+n[t]})).join("&"),o+="&access_token="+e.token,o+="&v="+t.VERSION},t.requestApi=function(e,n,o,i){var u=t.buildApiUrl(e,n,o);return r.JsonpService.get(u,i)},t.VERSION="5.120",t.URL="https://api.vk.com/method/",t}();e.VkApiService=n}.apply(e,n))||(t.exports=o)}]);