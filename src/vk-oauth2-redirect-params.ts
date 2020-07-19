export class VkOAuth2RedirectParamsSuccess {
    static fromURLSearchParams(params: URLSearchParams): VkOAuth2RedirectParamsSuccess | null {
        const accessToken = params.get("access_token");
        if(accessToken === null) return null;
        const expiresIn = params.get("expires_in");
        if(expiresIn === null) return null;
        const userId = params.get("user_id");
        if(userId === null) return null;
        const state = params.get("state");
        return new VkOAuth2RedirectParamsSuccess(
            accessToken, 
            expiresIn, 
            userId, 
            state !== null ? state : undefined
        );
    };

    static fromLocalStorage(): VkOAuth2RedirectParamsSuccess | null {
        const paramsJson = localStorage.getItem("VkOAuth2RedirectParamsSuccess");
        if(paramsJson === null) return null;
        const params = JSON.parse(paramsJson);
        return new VkOAuth2RedirectParamsSuccess(
            params.accessToken, 
            params.expiresIn, 
            params.userId, 
            params.state
        );
    };

    static store(params: VkOAuth2RedirectParamsSuccess): void {
        localStorage.setItem("VkOAuth2RedirectParamsSuccess", JSON.stringify(params));
    };

    static clearStorage(): void {
        localStorage.removeItem("VkOAuth2RedirectParamsSuccess");
    };

    constructor(
        public readonly accessToken: string,
        public readonly expiresIn: string,
        public readonly userId: string,
        public readonly state?: string
    ) {};
};

export class VkOAuth2RedirectParamsError {
    static fromURLSearchParams(params: URLSearchParams): VkOAuth2RedirectParamsError | null {
        const error = params.get("error");
        if(error === null) return null;
        const error_description = params.get("error_description");
        if(error_description === null) return null;
        return new VkOAuth2RedirectParamsError(error, error_description);
    };
    
    static fromSessionStorage(): VkOAuth2RedirectParamsError | null {
        const paramsJson = localStorage.getItem("VkOAuth2RedirectParamsError");
        if(paramsJson === null) return null;
        const params = JSON.parse(paramsJson);
        return new VkOAuth2RedirectParamsError(
            params.error, 
            params.error_description
        );
    };

    static store(params: VkOAuth2RedirectParamsError): void {
        sessionStorage.setItem("VkOAuth2RedirectParamsError", JSON.stringify(params));
    };

    static clearStorage(): void {
        sessionStorage.removeItem("VkOAuth2RedirectParamsError");
    };

    constructor(
        public readonly error: string,
        public readonly errorDescription: string
    ) {};
};