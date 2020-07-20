import { JsonpService } from "./jsonp"
import { VkAccessToken } from "./vk-oauth2";

export class VkApiService {
    static readonly VERSION = "5.120";
    static readonly URL = "https://api.vk.com/method/";

    static buildApiUrl(
        token: VkAccessToken, 
        methodName: string, 
        params: {[key: string]: string}
    ): string {
        let url = `${VkApiService.URL}${methodName}?`;
        url += Object.keys(params).map(key => `${key}=${params[key]}`).join("&");
        url += `&access_token=${token.token}`;
        url += `&v=${VkApiService.VERSION}`;
        return url;
    };

    static requestApi<T>(
        token: VkAccessToken, 
        methodName: string, 
        params: {[key: string]: string}, 
        timeout: number
    ) {
        const url = VkApiService.buildApiUrl(token, methodName, params);
        return JsonpService.get<T>(url, timeout);
    };
};