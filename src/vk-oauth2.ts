interface Storeable {
    store(storage: Storage): void;
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
        };
    };
};

export class VkOAuth2SuccessRedirectParams {
    static fromURLSearchParams(params: URLSearchParams): VkOAuth2SuccessRedirectParams | null {
        const accessToken = params.get("access_token");
        if(accessToken === null) return null;
        const expiresIn = params.get("expires_in");
        if(expiresIn === null) return null;
        const userId = params.get("user_id");
        if(userId === null) return null;
        const state = params.get("state");
        return new VkOAuth2SuccessRedirectParams(
            accessToken, 
            expiresIn, 
            userId, 
            state !== null ? state : undefined
        );
    };

    constructor(
        public readonly accessToken: string,
        public readonly expiresIn: string,
        public readonly userId: string,
        public readonly state?: string
    ) {};
};

export class VkOAuth2ErrorRedirectParams {
    static fromURLSearchParams(params: URLSearchParams): VkOAuth2ErrorRedirectParams | null {
        const error = params.get("error");
        if(error === null) return null;
        const error_description = params.get("error_description");
        if(error_description === null) return null;
        return new VkOAuth2ErrorRedirectParams(error, error_description);
    };

    constructor(
        public readonly error: string,
        public readonly errorDescription: string
    ) {};
};

export class VkAccessToken 
    extends StoreableBuilder.build("VkAccessToken") {
    static fromStorage(storage: Storage): VkAccessToken | null {
        const token = super.fromStorage(storage) as VkAccessToken | null;
        if(token === null) return null;
        if( typeof token.token === "string" &&
            typeof token.tokenExpires === "number" &&
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

export class VkErrorAuthorize 
    extends StoreableBuilder.build("VkErrorAuthorize") {
    static fromStorage(storage: Storage): VkErrorAuthorize | null {
        const error = super.fromStorage(storage) as VkErrorAuthorize | null;
        if(error === null) return null;
        if( typeof error.error === "string" && 
            typeof error.errorDescription === "string") {
            return new VkErrorAuthorize(
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

    static buildToken(params: VkOAuth2SuccessRedirectParams): VkAccessToken | null {
        if(params.state !== undefined) {
            const timestampMs = parseInt(params.state);
            if(!Number.isNaN(timestampMs)) {
                const tokenExpires = 
                    timestampMs + parseInt(params.expiresIn) * 1000;
                return new VkAccessToken(
                    params.accessToken,
                    tokenExpires,
                    params.userId
                );
            }
        }
        return null;
    };

    static buildErrorAuthorize(params: VkOAuth2ErrorRedirectParams): VkErrorAuthorize {
        return new VkErrorAuthorize(
            params.error,
            params.errorDescription
        );
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