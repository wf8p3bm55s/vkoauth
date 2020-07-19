export interface JsonpServiceRequest<T> {
    scriptElement: HTMLScriptElement;
    timeoutTimer: number;
    callback: (result: T) => void
};

export class JsonpService {
    static readonly requests: {[key: string]: JsonpServiceRequest<any>} = {};

    static finishRequest(id: string): void {
        window.clearTimeout(JsonpService.requests[id].timeoutTimer);
        document.head.removeChild(JsonpService.requests[id].scriptElement);
        delete JsonpService.requests[id];
    };

    static get<T>(url: string, timeout: number): Promise<T> {
        return new Promise((resolve, reject) => {
            let id: string;
            do
                id = Math.round(Math.random() * Math.pow(10, 16)).toString();
            while(id in JsonpService.requests);

            const scriptElement = document.createElement("script");
            scriptElement.onerror = error => {
                JsonpService.finishRequest(id);
                reject(error);
            };

            JsonpService.requests[id] = {
                scriptElement: scriptElement,
                timeoutTimer: window.setTimeout(() => {
                    JsonpService.finishRequest(id);
                    reject(new Error("Timeout"));
                }, timeout),
                callback: (result: T) => {
                    JsonpService.finishRequest(id);
                    resolve(result);
                }
            };

            scriptElement.src = `${url}&callback=JsonpService.requests[${id}].callback`;
            document.head.appendChild(scriptElement);
        });
    };
};