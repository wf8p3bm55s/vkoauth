(function() {
    const params = new URLSearchParams(location.hash.slice(1));
    if(params.get("access_token") !== null) {
        const token = {};
        params.forEach(function(value, key) {
            token[key] = value;
        });
        localStorage.setItem("token", JSON.stringify(token));
    } else if(params.get("error") !== null) {
        const tokenError = {};
        params.forEach(function(value, key) {
            tokenError[key] = value;
        });
        sessionStorage.setItem("tokenError", JSON.stringify(tokenError));
    }
    // location.replace(
    //     location.origin.concat(location.pathname.split("/", 2).join("/")));
})();