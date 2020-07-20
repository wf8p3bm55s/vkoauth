export class UnauthorizedViewModel {
    constructor(
        public readonly authorizeBtnCLickCallback: () => void
    ) {};
};

export class AuthorizedViewModel {
    constructor(
        public readonly name: string,
        public readonly friends: Readonly<string[]>
    ) {};
};

export class ViewEngine {
    static getUnauthorizedView(model: UnauthorizedViewModel): HTMLDivElement {
        const container = document.createElement("div");
        const authorizeBtn = document.createElement("button");
        authorizeBtn.innerText = "Авторизоваться";
        authorizeBtn.onclick = model.authorizeBtnCLickCallback;
        container.appendChild(authorizeBtn);
        return container;
    };

    static getAuthorizedView(model: AuthorizedViewModel): HTMLDivElement {
        const container = document.createElement("div");
        const userName = document.createElement("div");
        const userFriends = document.createElement("div");
        userName.innerText = `Имя авторизованного пользователя: ${model.name}`;
        userFriends.innerText = `Друзья пользователя: ${model.friends.join(", ")}`;
        container.appendChild(userName);
        container.appendChild(userFriends);
        return container;
    };

    constructor(
        public readonly rootElement: HTMLDivElement
    ) {};

    setupView(view: HTMLDivElement): void {
        while (this.rootElement.firstChild) 
            this.rootElement.removeChild(this.rootElement.firstChild);
        this.rootElement.appendChild(view);
    };
};