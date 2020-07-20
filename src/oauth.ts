import { 
    VkOAuth2RedirectParamsSuccess,
    VkOAuth2RedirectParamsError } from "./vk-oauth2";
import {
    StorageProvider } from "./storage-provider";

try {
    const storageProvider = StorageProvider.getInstance();
    if(new URL(document.referrer).hostname === "oauth.vk.com") {
        const params = new window.URLSearchParams(location.hash.slice(1));
        const successParams = VkOAuth2RedirectParamsSuccess.fromURLSearchParams(params);
        const storage = storageProvider.getVkOAuth2RedirectParamsStorage();
        if(successParams !== null) {
            successParams.store(storage);
        } else {
            const errorParams = VkOAuth2RedirectParamsError.fromURLSearchParams(params);
            if(errorParams !== null) {
                errorParams.store(storage);
            }
        }
    }
} 
catch(e) {}
finally {
    const nextLocation = location.origin.concat(location.pathname.split("/", 2).join("/"));
    location.replace(nextLocation);
}