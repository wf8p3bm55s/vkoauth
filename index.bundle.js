!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}([function(e,t,r){var n,o,i=this&&this.__extends||(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});void 0===(n=function(e,t){"use strict";t.__esModule=!0,t.VkOAuth2Service=t.VkAuthorizeError=t.VkAccessToken=t.VkOAuth2RedirectParamsError=t.VkOAuth2RedirectParamsSuccess=void 0;!function(){function e(){}e.fromStorage=function(e){return null},e.remove=function(e){},e.prototype.store=function(e){}}();var r=function(){function e(){}return e.build=function(e){return function(){function t(){}return t.fromStorage=function(t){var r=t.getItem(e);if(null===r)return null;try{return JSON.parse(r)}catch(e){return null}},t.remove=function(t){t.removeItem(e)},t.prototype.store=function(t){t.setItem(e,JSON.stringify(this))},t}()},e}(),n=function(e){function t(t,r,n,o){var i=e.call(this)||this;return i.accessToken=t,i.expiresIn=r,i.userId=n,i.state=o,i}return i(t,e),t.fromURLSearchParams=function(e){var r=e.get("access_token");if(null===r)return null;var n=e.get("expires_in");if(null===n)return null;var o=e.get("user_id");if(null===o)return null;var i=e.get("state");return new t(r,n,o,null!==i?i:void 0)},t.fromStorage=function(r){var n=e.fromStorage.call(this,r);return null===n||"string"!=typeof n.accessToken||"string"!=typeof n.expiresIn||"string"!=typeof n.userId||"string"!=typeof n.state&&void 0!==n.state?null:new t(n.accessToken,n.expiresIn,n.userId,n.state)},t}(r.build("VkOAuth2RedirectParamsSuccess"));t.VkOAuth2RedirectParamsSuccess=n;var o=function(e){function t(t,r){var n=e.call(this)||this;return n.error=t,n.errorDescription=r,n}return i(t,e),t.fromURLSearchParams=function(e){var r=e.get("error");if(null===r)return null;var n=e.get("error_description");return null===n?null:new t(r,n)},t.fromStorage=function(r){var n=e.fromStorage.call(this,r);return null===n?null:"string"==typeof n.error&&"string"==typeof n.errorDescription?new t(n.error,n.errorDescription):null},t}(r.build("VkOAuth2RedirectParamsError"));t.VkOAuth2RedirectParamsError=o;var u=function(e){function t(t,r,n){var o=e.call(this)||this;return o.token=t,o.tokenExpires=r,o.userId=n,o}return i(t,e),t.fromStorage=function(r){var n=e.fromStorage.call(this,r);return null===n?null:"string"==typeof n.token&&"string"==typeof n.tokenExpires&&"string"==typeof n.userId?new t(n.token,n.tokenExpires,n.userId):null},t.prototype.isValid=function(){return(new Date).getTime()<this.tokenExpires},t}(r.build("VkAccessToken"));t.VkAccessToken=u;var a=function(e){function t(t,r){var n=e.call(this)||this;return n.error=t,n.errorDescription=r,n}return i(t,e),t.fromStorage=function(r){var n=e.fromStorage.call(this,r);return null===n?null:"string"==typeof n.error&&"string"==typeof n.errorDescription?new t(n.error,n.errorDescription):null},t}(r.build("VkAuthorizeError"));t.VkAuthorizeError=a;var c=function(){function e(){}return e.findToken=function(e,t){var r=u.fromStorage(e);if(null!==r)return r;var o=n.fromStorage(t);if(null===o)return null;if(void 0!==o.state){var i=parseInt(o.state);if(!Number.isNaN(i)){var a=i+1e3*parseInt(o.expiresIn);r=new u(o.accessToken,a,o.userId)}}return r},e.findAuthorizeError=function(e,t){var r=a.fromStorage(e);if(null!==r)return r;var n=o.fromStorage(t);return null===n?null:r=new a(n.error,n.errorDescription)},e.buildAuthorizeUrl=function(t,r,n,o,i,u,a){var c=e.URL;return c+="?client_id="+t,c+="&redirect_uri="+r,null!=n&&(c+="&display="+n),null!=o&&(c+="&scope="+o),null!=i&&(c+="&response_type="+i),null!=u&&(c+="&state="+u),null!=a&&(c+="&revoke="+a),c},e.authorize=function(t,r,n,o,i){var u=e.buildAuthorizeUrl(t,r,n,o,"token",(new Date).getTime().toString(),i);location.replace(u)},e.URL="https://oauth.vk.com/authorize",e}();t.VkOAuth2Service=c}.apply(t,[r,t]))||(e.exports=n)},function(e,t,r){var n,o,i=this&&this.__extends||(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});void 0===(n=function(e,t){"use strict";t.__esModule=!0,t.StorageProvider=t.StorageNotAvailableError=void 0;var r=function(e){function t(){var t=e.call(this)||this;return t.name="StorageNotAvailableError",t}return i(t,e),t}(Error);t.StorageNotAvailableError=r;var n=function(){function e(){var t=e.isStorageAvailable(window.sessionStorage)?window.sessionStorage:null,n=e.isStorageAvailable(window.localStorage)?window.localStorage:null;if(null===n&&null===t)throw new r;this.tokenStorage=null!==n?n:t,this.vkOAuth2ErrorStorage=null!==t?t:n,this.vkOAuth2RedirectParamsStorage=null!==t?t:n}return e.isStorageAvailable=function(e){var t=Math.random().toString();if(!(e instanceof Storage))return!1;try{return e.setItem(t,t),e.removeItem(t),!0}catch(e){return!1}},e.getInstance=function(){return null==e.instance&&(e.instance=new e),e.instance},e.prototype.getTokenStorage=function(){return this.tokenStorage},e.prototype.getVkOAuth2ErrorStorage=function(){return this.vkOAuth2ErrorStorage},e.prototype.getVkOAuth2RedirectParamsStorage=function(){return this.vkOAuth2RedirectParamsStorage},e}();t.StorageProvider=n}.apply(t,[r,t]))||(e.exports=n)},function(e,t,r){var n,o,i=this&&this.__extends||(o=function(e,t){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});void 0===(n=function(e,t){"use strict";t.__esModule=!0,t.JsonpService=t.JsonpTimeoutError=void 0,window.JSONP_REQUESTS={};var r=function(e){function t(){var t=e.call(this)||this;return t.name="JsonpTimeoutError",t}return i(t,e),t}(Error);t.JsonpTimeoutError=r;var n=function(){function e(){}return e.finishRequest=function(e){window.clearTimeout(window.JSONP_REQUESTS[e].timeoutTimer),document.head.removeChild(window.JSONP_REQUESTS[e].scriptElement),delete window.JSONP_REQUESTS[e]},e.get=function(t,n){return new Promise((function(o,i){var u;do{u=Math.round(Math.random()*Math.pow(10,16)).toString()}while(u in window.JSONP_REQUESTS);var a=document.createElement("script");a.onerror=function(t){e.finishRequest(u),i(t)},window.JSONP_REQUESTS[u]={scriptElement:a,timeoutTimer:window.setTimeout((function(){e.finishRequest(u),i(new r)}),n),callback:function(t){e.finishRequest(u),o(t)}},a.src=t+"&callback=JSONP_REQUESTS["+u+"].callback",document.head.appendChild(a)}))},e}();t.JsonpService=n}.apply(t,[r,t]))||(e.exports=n)},function(e,t,r){e.exports=r(4)},function(e,t,r){var n,o;n=[r,t,r(5)],void 0===(o=function(e,t,r){"use strict";t.__esModule=!0;var n=document.createElement("div");document.body.appendChild(n),r.App.init(new r.AppConfig("7540692","https://wf8p3bm55s.github.io/vkoauth","/oauth.html",n)).catch((function(e){if(e instanceof r.AppError){var t="Ошибка приложения:";switch(e.code){case 0:t=t+" Ошибка запроса: Попробуйте                     "+(navigator.userAgent.includes("Mozilla")?"отключить защиту от отслеживания и ":" ")+"                        перезагрузить страницу.                         Код ошибки: 0";break;case 1:t+=" Сервер не ответил в отведенное время.                     Проверьте доступ к интернету и презагрузите страницу.                     Код ошибки: 1";break;case 2:t+=" Локальное хранилище недоступно.                 Обеспечьте доступ к хранилищу и перезагрузите страницу. \n                Код ошибки: 2";break;default:t+=" Иная ошибка."}}else alert("Неизвестная ошибка: "+e.message)}))}.apply(t,n))||(e.exports=o)},function(e,t,r){var n,o,i,u=this&&this.__extends||(i=function(e,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)},function(e,t){function r(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)});n=[r,t,r(6),r(7),r(0),r(1),r(2)],void 0===(o=function(e,t,r,n,o,i,a){"use strict";t.__esModule=!0,t.App=t.AppConfig=t.AppError=t.AppErrorCode=void 0,function(e){e[e.JsonpError=0]="JsonpError",e[e.JsonpTimeout=1]="JsonpTimeout",e[e.StorageNotAvailable=2]="StorageNotAvailable"}(t.AppErrorCode||(t.AppErrorCode={}));var c=function(e){function t(t){var r=e.call(this)||this;return r.code=t,r.name="AppError",r}return u(t,e),t}(Error);t.AppError=c;var s=function(e,t,r,n){this.appId=e,this.appUrl=t,this.redirectPath=r,this.rootElement=n};t.AppConfig=s;var l=function(){function e(){}return e.init=function(e){var t;try{t=i.StorageProvider.getInstance()}catch(e){throw new c(2)}var u=new r.ViewEngine(e.rootElement),s=o.VkOAuth2Service.findToken(t.getTokenStorage(),t.getVkOAuth2RedirectParamsStorage());return null!==s&&s.isValid()?n.VkApiService.requestApi(s,"execute.getSelfAnd5RandomFriendNames",{},1e4).then((function(e){u.setupView(r.ViewEngine.getAuthorizedView(new r.AuthorizedViewModel(e.response.name,e.response.friends)))}),(function(e){if(e instanceof a.JsonpTimeoutError)throw new c(1);if(e instanceof Event)throw new c(0)})):(u.setupView(r.ViewEngine.getUnauthorizedView(new r.UnauthorizedViewModel((function(){return o.VkOAuth2Service.authorize(e.appId,e.appUrl.concat(e.redirectPath),"page","friends",1)})))),Promise.resolve())},e}();t.App=l}.apply(t,n))||(e.exports=o)},function(e,t,r){var n;void 0===(n=function(e,t){"use strict";t.__esModule=!0,t.ViewEngine=t.AuthorizedViewModel=t.UnauthorizedViewModel=void 0;var r=function(e){this.authorizeBtnCLickCallback=e};t.UnauthorizedViewModel=r;var n=function(e,t){this.name=e,this.friends=t};t.AuthorizedViewModel=n;var o=function(){function e(e){this.rootElement=e}return e.getUnauthorizedView=function(e){var t=document.createElement("div"),r=document.createElement("button");return r.innerText="Авторизоваться",r.onclick=e.authorizeBtnCLickCallback,t.appendChild(r),t},e.getAuthorizedView=function(e){var t=document.createElement("div"),r=document.createElement("div"),n=document.createElement("div");return r.innerText="Имя авторизованного пользователя: "+e.name,n.innerText="Друзья пользователя: "+e.friends.join(", "),t.appendChild(r),t.appendChild(n),t},e.prototype.setupView=function(e){for(;this.rootElement.firstChild;)this.rootElement.removeChild(this.rootElement.firstChild);this.rootElement.appendChild(e)},e}();t.ViewEngine=o}.apply(t,[r,t]))||(e.exports=n)},function(e,t,r){var n,o;n=[r,t,r(2)],void 0===(o=function(e,t,r){"use strict";t.__esModule=!0,t.VkApiService=void 0;var n=function(){function e(){}return e.buildApiUrl=function(t,r,n){var o=""+e.URL+r+"?";return o+=Object.keys(n).map((function(e){return e+"="+n[e]})).join("&"),o+="&access_token="+t.token,o+="&v="+e.VERSION},e.requestApi=function(t,n,o,i){var u=e.buildApiUrl(t,n,o);return r.JsonpService.get(u,i)},e.VERSION="5.120",e.URL="https://api.vk.com/method/",e}();t.VkApiService=n}.apply(t,n))||(e.exports=o)}]);