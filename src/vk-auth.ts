import { 
    VkOAuth2RedirectParamsSuccess,
    VkOAuth2RedirectParamsError 
} from "./vk-oauth2-redirect-params";

export class VkAccessToken {
    static fromLocalStorage(): VkAccessToken | null {
        const tokenJson = localStorage.getItem("VkAccessToken");
        if(tokenJson === null) return null;
        const token = JSON.parse(tokenJson);
        return new VkAccessToken(
            token.token,
            token.tokenExpires,
            token.userId
        );
    };

    static store(token: VkAccessToken): void {
        localStorage.setItem("VkAccessToken", JSON.stringify(token));
    };

    static clearStorage(): void {
        localStorage.removeItem("VkAccessToken");
    };

    constructor(
        public readonly token: string, 
        public readonly tokenExpires: number,
        public readonly userId: string
    ) {};

    isValid(): boolean {
        return new Date().getTime() < this.tokenExpires;
    };
};

export class VkAuthorizeError {
    static fromSessionStorage(): VkAuthorizeError | null {
        const errorJson = sessionStorage.getItem("VkAuthorizeError");
        if(errorJson === null) return null;
        const error = JSON.parse(errorJson);
        return new VkAuthorizeError(
            error.error,
            error.errorDescription
        );
    };

    static store(error: VkAuthorizeError): void {
        localStorage.setItem("VkAuthorizeError", JSON.stringify(error));
    };

    static clearStorage(): void {
        sessionStorage.removeItem("VkAuthorizeError");
    };

    constructor(
        public readonly error: string,
        public readonly errorDescription: string
    ) {};
};

export class VkOAuth2Service {
    static readonly URL: string = "https://oauth.vk.com/authorize";

    static findToken(): VkAccessToken | null {
        let token = VkAccessToken.fromLocalStorage();
        const params = VkOAuth2RedirectParamsSuccess.fromLocalStorage();

        if(token !== null) {
            if(params !== null) {
                VkOAuth2RedirectParamsSuccess.clearStorage();
            }
            return token;
        }

        if(params === null) return null;
        else {
            if(params.state !== undefined) {
                const timestampMs = parseInt(params.state);
                if(!Number.isNaN(timestampMs)) {
                    const tokenExpires = 
                        timestampMs + parseInt(params.expiresIn) * 1000;
                    token = new VkAccessToken(
                        params.accessToken,
                        tokenExpires,
                        params.userId
                    );
                    VkAccessToken.store(token);
                }
            }
            VkOAuth2RedirectParamsSuccess.clearStorage();
            return token;
        }
    };

    static findAuthorizeError(): VkAuthorizeError | null {
        let error = VkAuthorizeError.fromSessionStorage();
        const params = VkOAuth2RedirectParamsError.fromSessionStorage();

        if(error !== null) {
            if(params !== null) {
                VkOAuth2RedirectParamsError.clearStorage();
            }
            return error;
        }

        if(params === null) return null;
        else {
            error = new VkAuthorizeError(
                params.error,
                params.errorDescription
            );
            VkAuthorizeError.store(error);
            VkOAuth2RedirectParamsError.clearStorage();
            return error;
        }
    };

    static buildAuthorizeUrl(
        client_id: string, 
        redirect_uri: string, 
        display: string, 
        scope: string | number, 
        response_type: string, 
        state: string, 
        revoke: number
    ): string { 
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
        client_id: string, 
        redirect_uri: string, 
        display: string, 
        scope: string | number, 
        revoke: number
    ): void {
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