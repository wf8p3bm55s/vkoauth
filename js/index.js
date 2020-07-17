
class JsonpService {
    static requests = {};
    static finishRequest(id) {
        clearTimeout(requests[id].timer);
        document.head.removeChild(requests[id].script);
        delete requests[id];
    };

    static get(url) {
        return new Promise((resolve, reject) => {
            let id;
            do
                id = Math.round(Math.random() * Math.pow(10, 16));
            while(id in JsonpService.requests);
            const script = document.createElement("script");
            script.onerror = (error) => {
                JsonpService.finishRequest(id);
                reject(error);
            };
            JsonpService.requests[id] = {
                script: script,
                callback: (result) => {
                    JsonpService.finishRequest(id);
                    resolve(result);
                },
                timer: setTimeout(() => {
                    JsonpService.finishRequest(id);
                    reject(new Error("Timeout"));
                }, 10000)
            };            
            script.src = `${url}&callback=JsonpService.requests[${key}].callback`;
            document.head.appendChild(script);
        });
    };
};

class VkAccessToken {
    static loadFromStorage() {
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

    constructor(token, tokenExpires) {
        this.token = token;
        this.tokenExpires = tokenExpires;
    };

    isValid() {
        return new Date().getTime() < this.tokenExpires;
    };
};

class VkOAuth2Service {
    static URL = "https://oauth.vk.com/authorize";
    static buildAuthorizeUrl(
        client_id, redirect_uri, display, scope, response_type, state, revoke) { 
        let url = VkOAuth2Service.URL;
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
        const url = VkOAuth2Service.buildAuthorizeUrl(
            client_id, 
            redirect_uri, 
            display, 
            scope, 
            "token", 
            new Date().getTime().toString(), 
            revoke
        );
        location.replace(url);
    };
};

class VkApiService {
    static VERSION = "5.120";
    static URL = "https://api.vk.com/method/";

    constructor(accessToken) {
        this.accessToken = accessToken;
    };

    buildApiUrl(methodName, params) {
        let url = `${VkApiService.URL}${methodName}?`;
        url += Object.entries(params).map(entry => `${entry[0]}=${entry[1]}`).join("&");
        url += `&access_token=${this.accessToken.token}`;
        url += `&v=${VkApiService.VERSION}`;
        return url;
    };

    requestApi(methodName, params) {
        return JsonpService.get(this.buildApiUrl(methodName, params));
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
        button.innerText = "Авторизован";
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
    constructor(appId, appUrl, redirectPath, rootElementId) {
        this.appId = appId;
        this.appUrl = appUrl;
        this.redirectPath = redirectPath;
        this.rootElementId = rootElementId;
    };
};

class App {
    constructor(config) {
        this.config = config;
    };

    init() {
        this.viewEngine = new ViewEngine(this.config.rootElementId);
        this.accessToken = VkAccessToken.loadFromStorage();
        if(this.accessToken !== null && this.accessToken.isValid()) {
            this.VkApiService = new VkApiService(this.accessToken);

            this.VkApiService.requestApi(
                "execute.getSelfAnd5RandomFriendNames", {}
            ).then((result) => {
                console.log(result);
            }, (error) => { 
                console.log(error);
            });
        } else {
            const authorizeBtnCLickCallback = () => 
                VkOAuth2Service.authorize(
                    this.config.appId, 
                    this.config.appUrl.concat(this.config.redirectPath), 
                    "page", 
                    "friends",
                    1
                );

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
        "7540692", 
        "https://wf8p3bm55s.github.io/vkoauth",
        "/oauth.html",
        "root"
    )
).init();