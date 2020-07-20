import { 
    ViewEngine, 
    AuthorizedViewModel, 
    UnauthorizedViewModel } from "./view";
import { VkApiService } from "./vk-api";
import { 
    VkOAuth2Service,
    VkAccessToken } from "./vk-oauth2";
import { 
    StorageProvider } from "./storage-provider";

interface SelfAnd5RandomFriendNamesResponse {
    response: {
        name: string;
        friends: string[]
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
        const storageProvider = StorageProvider.getInstance();
        const viewEngine = new ViewEngine(config.rootElement);
        const token = VkAccessToken.fromStorage(storageProvider.getTokenStorage());
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