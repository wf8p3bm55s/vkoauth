import { 
    AppConfig,
    App } from "./app";

import {
    JsonpTimeoutError,
    JsonpRequestError
} from "./jsonp";

import {
    StorageNotAvailableError
} from "./storage-provider";

const rootElement = document.createElement("div"); 
document.body.appendChild(rootElement);

App.init(
    new AppConfig(
        "7540692", 
        "https://wf8p3bm55s.github.io/vkoauth",
        "/oauth.html",
        rootElement
    )
).catch((e: Error) => {
    let errorMsg = "Ошибка приложения";
    if(e instanceof JsonpRequestError) {
        alert(
            `${errorMsg}: ${e.name}: ${e.message} Попробуйте ` +
            `${navigator.userAgent.includes("Mozilla") ? 
                        "отключить защиту от отслеживания и " : " "}` +
            `перезагрузить страницу.`
        );
    } else if(e instanceof JsonpTimeoutError) {
        alert(
            `${errorMsg}: ${e.name}: ${e.message} ` +
            `Проверьте доступ к интернету и презагрузите страницу.`
        );
    } else if(e instanceof StorageNotAvailableError) {
        alert(
            `${errorMsg}: ${e.name}: ${e.message} ` +
            `Обеспечьте доступ к хранилищу и перезагрузите страницу.`
        );
    } else {
        alert(`${errorMsg}: ${e.name}: ${e.message}`);
    }
});