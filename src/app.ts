import { 
    ViewEngine, 
    AuthorizedViewModel, 
    UnauthorizedViewModel } from "./view";
import { VkApiService } from "./vk-api";
import { VkOAuth2Service } from "./vk-oauth2";
import { 
    StorageProvider, 
    StorageNotAvailableError } from "./storage-provider";
import { JsonpTimeoutError } from "./jsonp";

interface SelfAnd5RandomFriendNamesResponse {
    response: {
        name: string;
        friends: string[]
    }
};

export const enum AppErrorCode {
    JsonpError,
    JsonpTimeout,
    StorageNotAvailable
};

export class AppError extends Error {
    constructor(
        public readonly code: AppErrorCode
    ) {
        super();
        Object.setPrototypeOf(this, AppError.prototype);
        this.name = 'AppError';
    }
};

export class AppConfig {
    constructor(
        public readonly appId: string, 
        public readonly appUrl: string, 
        public readonly redirectPath: string, 
        public readonly rootElement: HTMLDivElement
    ) {};
};

export class App {
    static init(config: AppConfig): Promise<void> {
        let storageProvider;
        try {
            storageProvider = StorageProvider.getInstance();
        } catch(e) {
            throw new AppError(AppErrorCode.StorageNotAvailable);
        }
        const viewEngine = new ViewEngine(config.rootElement);
        const token = VkOAuth2Service.findToken(
            storageProvider.getTokenStorage(), 
            storageProvider.getVkOAuth2RedirectParamsStorage()
        );
        if(token !== null && token.isValid()) {
            return VkApiService.requestApi<SelfAnd5RandomFriendNamesResponse>(
                token,
                "execute.getSelfAnd5RandomFriendNames", 
                {}, 
                10000
            ).then(result => {
                viewEngine.setupView(
                    ViewEngine.getAuthorizedView(
                        new AuthorizedViewModel(
                            result.response.name,
                            result.response.friends
                        )
                    )
                );
            }, error => { 
                if(error instanceof JsonpTimeoutError) {
                    throw new AppError(AppErrorCode.JsonpTimeout);
                } else if(error instanceof Event) {
                    throw new AppError(AppErrorCode.JsonpError);
                }
            });
        } else {
            viewEngine.setupView(
                ViewEngine.getUnauthorizedView(
                    new UnauthorizedViewModel(
                        () => VkOAuth2Service.authorize(
                            config.appId, 
                            config.appUrl.concat(config.redirectPath), 
                            "page", 
                            "friends",
                            1
                        )
                    )
                )
            );
            return Promise.resolve();
        }
    };
};