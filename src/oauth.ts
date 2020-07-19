import { 
    VkOAuth2RedirectParamsSuccess,
    VkOAuth2RedirectParamsError 
} from "./vk-oauth2-redirect-params";

const params = new window.URLSearchParams(location.hash.slice(1));
const successParams = VkOAuth2RedirectParamsSuccess.fromURLSearchParams(params);
if(successParams !== null) {
    VkOAuth2RedirectParamsSuccess.store(successParams);
} else {
    const errorParams = VkOAuth2RedirectParamsError.fromURLSearchParams(params);
    if(errorParams !== null)
        VkOAuth2RedirectParamsError.store(errorParams);
}
console.log(document.referrer);
// location.replace(
//     location.origin.concat(location.pathname.split("/", 2).join("/")));