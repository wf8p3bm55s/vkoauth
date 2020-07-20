declare global {
    interface Window {
        JSONP_REQUESTS: {[key: string]: JsonpServiceRequest<any>};
    }
};

window.JSONP_REQUESTS = {};

export interface JsonpServiceRequest<T> {
    scriptElement: HTMLScriptElement;
    timeoutTimer: number;
    callback: (result: T) => void
};

export class JsonpTimeoutError extends Error {};

export class JsonpService {
    static finishRequest(id: string): void {
        window.clearTimeout(window.JSONP_REQUESTS[id].timeoutTimer);
        document.head.removeChild(window.JSONP_REQUESTS[id].scriptElement);
        delete window.JSONP_REQUESTS[id];
    };

    static get<T>(url: string, timeout: number): Promise<T> {
        return new Promise((resolve, reject) => {
            let id: string;
            do
                id = Math.round(Math.random() * Math.pow(10, 16)).toString();
            while(id in window.JSONP_REQUESTS);

            const scriptElement = document.createElement("script");
            scriptElement.onerror = error => {
                JsonpService.finishRequest(id);
                reject(error);
            };

            window.JSONP_REQUESTS[id] = {
                scriptElement: scriptElement,
                timeoutTimer: window.setTimeout(() => {
                    JsonpService.finishRequest(id);
                    reject(new JsonpTimeoutError());
                }, timeout),
                callback: (result: T) => {
                    JsonpService.finishRequest(id);
                    resolve(result);
                }
            };

            scriptElement.src = `${url}&callback=JSONP_REQUESTS[${id}].callback`;
            document.head.appendChild(scriptElement);
        });
    };
};