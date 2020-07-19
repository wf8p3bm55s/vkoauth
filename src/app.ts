import { ViewEngine } from "./view";
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
                console.log(result);
            }, (error) => { 
                console.log(error);
            });
        } else {
            viewEngine.setupView(
                ViewEngine.getUnauthorizedView({
                    authorizeBtnCLickCallback: () => VkOAuth2Service.authorize(
                        config.appId, 
                        config.appUrl.concat(config.redirectPath), 
                        "page", 
                        "friends",
                        1
                    )
                })
            );
        }
    };
};