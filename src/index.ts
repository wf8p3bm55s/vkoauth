import { 
    AppConfig,
    App,
    AppErrorCode,
    AppError } from "./app";

const rootElement = document.createElement("div"); 
document.body.appendChild(rootElement);

App.init(
    new AppConfig(
        "7540692", 
        "https://wf8p3bm55s.github.io/vkoauth",
        "/oauth.html",
        rootElement
    )
).catch(e => {
    if(e instanceof AppError) {
        let errorMsg = "Ошибка приложения:";
        switch(e.code) {
            case AppErrorCode.JsonpError:
                errorMsg = `${errorMsg} Ошибка запроса: Попробуйте \
                    ${navigator.userAgent.includes("Mozilla") ? 
                        "отключить защиту от отслеживания и " : " "}\
                        перезагрузить страницу. \
                        Код ошибки: ${AppErrorCode.JsonpError}`;
                break;
            case AppErrorCode.JsonpTimeout:
                errorMsg = `${errorMsg} Сервер не ответил в отведенное время. \
                    Проверьте доступ к интернету и презагрузите страницу. \
                    Код ошибки: ${AppErrorCode.JsonpTimeout}`;
                break;
            case AppErrorCode.StorageNotAvailable:
                errorMsg = `${errorMsg} Локальное хранилище недоступно. \
                Обеспечьте доступ к хранилищу и перезагрузите страницу. 
                Код ошибки: ${AppErrorCode.StorageNotAvailable}`;
                break;
            default:
                errorMsg = `${errorMsg} Иная ошибка.`;
                break;
        }
    } else {
        alert(`Неизвестная ошибка: ${e.message}`);
    }
});