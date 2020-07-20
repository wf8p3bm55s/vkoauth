abstract class Storeable {
    static fromStorage(storage: Storage): Object | null { return null; };
    static remove(storage: Storage): void {};
    store(storage: Storage): void {};
};

class StoreableBuilder {
    static build(key: string): {
        new (): Storeable;
        fromStorage(storage: Storage): Object | null;
        remove(storage: Storage): void;
    } {
        return class {
            static fromStorage(storage: Storage): Object | null {
                const paramsJson = storage.getItem(key);
                if(paramsJson === null) return null;
                try {
                    return JSON.parse(paramsJson);
                }
                catch(e) {
                    return null;
                }
            };

            static remove(storage: Storage): void {
                storage.removeItem(key);
            };

            store(storage: Storage): void {
                storage.setItem(key, JSON.stringify(this));
            };
        }
    }
};

export class VkOAuth2RedirectParamsSuccess 
    extends StoreableBuilder.build("VkOAuth2RedirectParamsSuccess") {
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

    static fromStorage(storage: Storage): VkOAuth2RedirectParamsSuccess | null {
        const params = super.fromStorage(storage) as VkOAuth2RedirectParamsSuccess | null;
        if(params === null) return null;
        if( typeof params.accessToken === "string" && 
            typeof params.expiresIn === "string" && 
            typeof params.userId === "string" && 
            (typeof params.state === "string" || typeof params.state === "undefined")) {
            return new VkOAuth2RedirectParamsSuccess(
                params.accessToken, 
                params.expiresIn, 
                params.userId, 
                params.state
            );
        }
        return null;
    };

    constructor(
        public readonly accessToken: string,
        public readonly expiresIn: string,
        public readonly userId: string,
        public readonly state?: string
    ) {
        super();
    };
};

export class VkOAuth2RedirectParamsError 
    extends StoreableBuilder.build("VkOAuth2RedirectParamsError") {
    static fromURLSearchParams(params: URLSearchParams): VkOAuth2RedirectParamsError | null {
        const error = params.get("error");
        if(error === null) return null;
        const error_description = params.get("error_description");
        if(error_description === null) return null;
        return new VkOAuth2RedirectParamsError(error, error_description);
    };
    
    static fromStorage(storage: Storage): VkOAuth2RedirectParamsError | null {
        const params = super.fromStorage(storage) as VkOAuth2RedirectParamsError | null;
        if(params === null) return null;
        if( typeof params.error === "string" &&
            typeof params.errorDescription === "string") {
            return new VkOAuth2RedirectParamsError(
                params.error, 
                params.errorDescription
            );
        }
        return null;
    };

    constructor(
        public readonly error: string,
        public readonly errorDescription: string
    ) {
        super();
    };
};

export class VkAccessToken 
    extends StoreableBuilder.build("VkAccessToken") {
    static fromStorage(storage: Storage): VkAccessToken | null {
        const token = super.fromStorage(storage) as VkAccessToken | null;
        if(token === null) return null;
        if( typeof token.token === "string" &&
            typeof token.tokenExpires === "string" &&
            typeof token.userId === "string") {
            return new VkAccessToken(
                token.token,
                token.tokenExpires,
                token.userId
            );
        }
        return null;
    };

    constructor(
        public readonly token: string, 
        public readonly tokenExpires: number,
        public readonly userId: string
    ) {
        super();
    };

    isValid(): boolean {
        return new Date().getTime() < this.tokenExpires;
    };
};

export class VkAuthorizeError 
    extends StoreableBuilder.build("VkAuthorizeError") {
    static fromStorage(storage: Storage): VkAuthorizeError | null {
        const error = super.fromStorage(storage) as VkAuthorizeError | null;
        if(error === null) return null;
        if( typeof error.error === "string" && 
            typeof error.errorDescription === "string") {
            return new VkAuthorizeError(
                error.error,
                error.errorDescription
            );
        }
        return null;
    };

    constructor(
        public readonly error: string,
        public readonly errorDescription: string
    ) {
        super();
    };
};

export class VkOAuth2Service {
    static readonly URL: string = "https://oauth.vk.com/authorize";

    static findToken(
        tokenStorage: Storage, paramsStorage: Storage): VkAccessToken | null {
        let token = VkAccessToken.fromStorage(tokenStorage);
        if(token !== null) return token;
        const params = VkOAuth2RedirectParamsSuccess.fromStorage(paramsStorage);
        if(params === null) return null;
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
            }
        }
        return token;
    };

    static findAuthorizeError(
        errorStorage: Storage, paramsStorage: Storage): VkAuthorizeError | null {
        let error = VkAuthorizeError.fromStorage(errorStorage);
        if(error !== null) return error;
        const params = VkOAuth2RedirectParamsError.fromStorage(paramsStorage);
        if(params === null) return null;
        error = new VkAuthorizeError(
            params.error,
            params.errorDescription
        );
        return error;
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