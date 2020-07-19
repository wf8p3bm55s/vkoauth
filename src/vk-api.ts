import { JsonpService } from "./jsonp"
import { VkAccessToken } from "./vk-auth";

export class VkApiService {
    static readonly VERSION = "5.120";
    static readonly URL = "https://api.vk.com/method/";

    constructor(
        public readonly token: VkAccessToken
    ) {};

    buildApiUrl(methodName: string, params: {[key: string]: string}): string {
        let url = `${VkApiService.URL}${methodName}?`;
        url += Object.keys(params).map(key => `${key}=${params[key]}`).join("&");
        url += `&access_token=${this.token.token}`;
        url += `&v=${VkApiService.VERSION}`;
        return url;
    };

    requestApi<T>(methodName: string, params: {[key: string]: string}, timeout: number) {
        const url = this.buildApiUrl(methodName, params);
        return JsonpService.get<T>(url, timeout);
    };
};