import { 
    ViewEngine, 
    AuthorizedViewModel, 
    UnauthorizedViewModel 
} from "./view";
import { VkApiService } from "./vk-api";
import { VkOAuth2Service } from "./vk-auth";

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
    static init(config: AppConfig): void {
        const viewEngine = new ViewEngine(config.rootElement);
        const token = VkOAuth2Service.findToken();
        if(token !== null && token.isValid()) {
            const vkApiService = new VkApiService(token);
            vkApiService.requestApi<SelfAnd5RandomFriendNamesResponse>(
                "execute.getSelfAnd5RandomFriendNames", {}, 10000
            ).then((result) => {
                viewEngine.setupView(
                    ViewEngine.getAuthorizedView(
                        new AuthorizedViewModel(
                            result.response.name,
                            result.response.friends
                        )
                    )
                );
            }, (error) => { 
                if(error instanceof Error) {
                    alert(error.message);
                } else if(error instanceof Event) {
                    alert("Ошибка запроса. Перезагрузите страницу.");
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
        }
    };
};