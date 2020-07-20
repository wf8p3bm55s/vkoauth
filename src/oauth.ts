import { 
    VkOAuth2SuccessRedirectParams,
    VkOAuth2ErrorRedirectParams,
    VkOAuth2Service } from "./vk-oauth2";
import {
    StorageProvider } from "./storage-provider";

class UnrecognizedRedirectParams extends Error {
    constructor() {
        super("Параметры авторизации не распознаны.");
        Object.setPrototypeOf(this, UnrecognizedRedirectParams.prototype);
        this.name = "UnrecognizedRedirectParams";
    }
};

try {
    if(new URL(document.referrer).hostname === "oauth.vk.com") {
        const storageProvider = StorageProvider.getInstance();
        const params = new URLSearchParams(location.hash.slice(1));
        const successParams = VkOAuth2SuccessRedirectParams.fromURLSearchParams(params);
        if(successParams !== null) {
            const token = VkOAuth2Service.buildToken(successParams);
            if(token !== null) {
                token.store(storageProvider.getTokenStorage());
            } else {
                throw new UnrecognizedRedirectParams();
            }
        } else {
            const errorParams = VkOAuth2ErrorRedirectParams.fromURLSearchParams(params);
            if(errorParams !== null) {
                const error = VkOAuth2Service.buildErrorAuthorize(errorParams);
                error.store(storageProvider.getVkOAuth2ErrorStorage());
            } else {
                throw new UnrecognizedRedirectParams();
            }
        }
    }
}
catch(e) {    
    alert(`Ошибка авторизации: ${e.name}: ${e.message}`);
}
finally {
    const nextLocation = location.origin.concat(location.pathname.split("/", 2).join("/"));
    location.replace(nextLocation);
};