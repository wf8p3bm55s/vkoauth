export class StorageNotAvailableError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, StorageNotAvailableError.prototype);
        this.name = "StorageNotAvailableError";
    }
};

export class StorageProvider {
    private static instance: StorageProvider;

    private tokenStorage: Storage;
    private vkOAuth2ErrorStorage: Storage;
    private vkOAuth2RedirectParamsStorage: Storage;

    private static isStorageAvailable(storage: Storage | unknown): boolean {
        const something = Math.random().toString();
        if(!(storage instanceof Storage)) return false;
        try {
            storage.setItem(something, something);
            storage.removeItem(something);
            return true;
        } catch(e) {
            return false;
        }
    };

    static getInstance(): StorageProvider {
        if(StorageProvider.instance == undefined)
            StorageProvider.instance = new StorageProvider();
        return StorageProvider.instance;
    };

    private constructor() {
        const sessionStorage = 
            StorageProvider.isStorageAvailable(window.sessionStorage) ? 
                window.sessionStorage : null;
        const localStorage = 
            StorageProvider.isStorageAvailable(window.localStorage) ? 
                window.localStorage : null;

        if(localStorage === null && sessionStorage === null) {
            throw new StorageNotAvailableError();
        } else {
            this.tokenStorage = localStorage !== null ? 
                localStorage : sessionStorage!;
            this.vkOAuth2ErrorStorage = sessionStorage !== null ? 
                sessionStorage : localStorage!;
            this.vkOAuth2RedirectParamsStorage = sessionStorage !== null ? 
                sessionStorage : localStorage!;
        }
    };

    getTokenStorage(): Storage {
        return this.tokenStorage;
    };

    getVkOAuth2ErrorStorage(): Storage {
        return this.vkOAuth2ErrorStorage;
    };

    getVkOAuth2RedirectParamsStorage(): Storage {
        return this.vkOAuth2RedirectParamsStorage;
    };
};