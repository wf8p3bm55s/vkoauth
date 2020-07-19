import { 
    AppConfig,
    App
} from "./app";

try {
    const rootElement = document.createElement("div"); 
    document.body.appendChild(rootElement);
    App.init(
        new AppConfig(
            "7540692", 
            "https://wf8p3bm55s.github.io/vkoauth",
            "/oauth.html",
            rootElement
        )
    );
} catch(e) {
    alert(`${e.name} ${e.message}`);
};