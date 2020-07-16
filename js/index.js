
class VkAccessToken {
    constructor(token, tokenExpires) {
        this.token = token;
        this.tokenExpires = tokenExpires;
    };

    isValid() {
        return this.token != undefined && (new Date()).getTime() < this.tokenExpires;
    };
};

class VkOAuth2Provider {
    static buildAuthorizeUrl(client_id, redirect_uri, display, scope, response_type, state, revoke) {        
        let url = "https://oauth.vk.com/authorize";
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
        client_id, redirect_uri, display, scope, response_type, state, revoke) {
        const url = VkOAuth2Provider.buildAuthorizeUrl(
            client_id, redirect_uri, display, scope, response_type, state, revoke);
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

class AppConfig {
    constructor(appUrl, appClientId, htmlRootId) {
        this.appUrl = appUrl;
        this.appClientId = appClientId;
        this.htmlRootId = htmlRootId;
    };
};

class App {
    constructor(config) {
        this.config = config;
    };

    getRootElement() {
        const root = document.getElementById(this.config.htmlRootId);
        if(root === null) throw new Error("Root not found.");
        return root;
    };

    getUnauthorizedView() {
        const button = document.createElement("button");
        button.innerText = "Авторизоваться";
        button.onclick = () => {
            VkOAuth2Provider.authorize(
                this.config.appClientId, 
                this.config.appUrl, 
                undefined, 
                1, 
                "token",
                new Date().getTime().toString());
        };
        return button;
    };

    getAuthorizedView() {
        const button = document.createElement("button");
        button.innerText = "Авторизован";
        return button;
    };

    setupView(view) {
        const rootElement = this.getRootElement();
        while (rootElement.firstChild) 
            rootElement.removeChild(rootElement.firstChild);
        rootElement.appendChild(view);
    };

    init() {
        const token = VkOAuth2Provider.loadTokenFromStorage();
        if(token !== null && token.isValid) {
            this.setupView(this.getAuthorizedView());
        } else {
            this.setupView(this.getUnauthorizedView());
        }
    };
};

new App(new AppConfig(window.location.origin, "", "root")).init();