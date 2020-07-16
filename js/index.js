
class VkAccessToken {
    constructor(token, tokenExpires) {
        this.token = token;
        this.tokenExpires = tokenExpires;
    };

    isValid() {
        return (new Date()).getTime() < this.tokenExpires;
    };
};

class VkOAuth2Provider {
    static URL = "https://oauth.vk.com/authorize";
    static buildAuthorizeUrl(
        client_id, redirect_uri, display, scope, response_type, state, revoke) { 
        let url = VkOAuth2Provider.URL;
        url += `?client_id=${client_id}`;
        url += `&redirect_uri=${redirect_uri}`;
        display != undefined ? url += `&display=${display}` : null;
        scope != undefined ? url += `&scope=${scope}` : null;
        response_type != undefined ? url += `&response_type=${response_type}` : null;
        state != undefined ? url += `&state=${state}` : null;
        revoke != undefined ? url += `&revoke=${revoke}` : null;
        return url;
    };

    static authorize(
        client_id, redirect_uri, display, scope, revoke) {
        const url = VkOAuth2Provider.buildAuthorizeUrl(
            client_id, 
            redirect_uri, 
            display, 
            scope, 
            "token", 
            new Date().getTime().toString(), 
            revoke
        );
        window.location.replace(url);
    };

    static loadTokenFromStorage() {
        const tokenInfoJson = localStorage.getItem("token");
        if(tokenInfoJson === null) {
            const tokenErrorInfoJson = sessionStorage.getItem("tokenError");
            if(tokenErrorInfoJson !== null) {
                alert(JSON.parse(tokenErrorInfoJson)["error_description"]);
                sessionStorage.removeItem("tokenError");
            }
            return null;
        }
        const tokenInfo = JSON.parse(tokenInfoJson);
        return new VkAccessToken(
            tokenInfo["access_token"],
            parseInt(tokenInfo["state"]) + parseInt(tokenInfo["expires_in"]) * 1000
        );
    };
};

class VkApiProvider {
    static VERSION = "5.120";
    static URL = "https://api.vk.com/method/";

    constructor(accessToken) {
        this.accessToken = accessToken;
    };

    buildApiUrl(methodName, params) {
        let url = `${VkApiProvider.URL}${methodName}?`;
        url += Object.entries(params).map(entry => `${entry[0]}=${entry[1]}`).join("&");
        url += `&access_token=${this.accessToken.token}`;
        url += `&V=${VkApiProvider.VERSION}`;
        return url;
    };

    requestApi(methodName, params) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.timeout = 10000;
            xhr.open("GET", this.buildApiUrl(methodName, params), true);
            xhr.send();
            xhr.onload = () => resolve(xhr);
            xhr.onerror = () => reject(xhr);
            xhr.timeout = () => reject(xhr);
        });
    };
};

class ViewEngine {
    static getUnauthorizedView(model) {
        const button = document.createElement("button");
        button.innerText = "Авторизоваться";
        button.onclick = model.authorizeBtnCLickCallback;
        return button;
    };

    static getAuthorizedView(model) {
        const button = document.createElement("button");
        button.innerText = "Авторизоваться";
        // button.onclick = authorizeBtnCLickCallback;
        return button;
    };

    constructor(rootElementId) {
        this.rootElement = document.getElementById(rootElementId);
    };

    setupView(view) {
        while (this.rootElement.firstChild) 
            this.rootElement.removeChild(this.rootElement.firstChild);
        this.rootElement.appendChild(view);
    };
};

class AppConfig {
    constructor(appUrl, appId, rootElementId) {
        this.appUrl = appUrl;
        this.appId = appId;
        this.rootElementId = rootElementId;
    };
};

class App {
    constructor(config) {
        this.config = config;
    };

    init() {
        this.viewEngine = new ViewEngine(this.config.rootElementId);
        this.accessToken = VkOAuth2Provider.loadTokenFromStorage();
        if(this.accessToken !== null && this.accessToken.isValid()) {
            this.vkApiProvider = new VkApiProvider(this.accessToken);

            const executeCode = 
            `
                var profileInfo = API.account.getProfileInfo();
                return {
                    "firstName": profileInfo.first_name, 
                    "lastName": profileInfo.last_name,
                    "friends": API.friends.get({
                        "order": "random", 
                        "count": 5, 
                        "fields": "nickname"
                    })
                };
            `

            this.vkApiProvider.requestApi("execute", {
                code: executeCode
            }).then((xhr) => {
                console.log(xhr);
                // this.viewEngine.setupView(ViewEngine.getAuthorizedView());
            }, (xhr) => { 
                console.log(xhr);
            });
        } else {
            const authorizeBtnCLickCallback = () => {
                VkOAuth2Provider.authorize(
                    this.config.appId, 
                    this.config.appUrl, 
                    undefined, 
                    1,
                    undefined
                );
            };

            this.viewEngine.setupView(
                ViewEngine.getUnauthorizedView({
                    authorizeBtnCLickCallback: authorizeBtnCLickCallback
                })
            );
        }
    };
};

new App(
    new AppConfig(
        window.location.href, 
        "7540692", 
        "root"
    )
).init();