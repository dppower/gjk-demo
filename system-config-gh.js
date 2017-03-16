(function (global) {
    const ngVer = "@2.3.1";
    const ngCDN = "https://npmcdn.com/@angular"

    var map = {
        "app": "build/app",
        "rxjs": "https://npmcdn.com/rxjs@5.0.0-rc.4"
    };

    var packages = {
        "app": { main: "./main.js", defaultExtension: "js" },
        "rxjs": { defaultExtension: "js" }
    };

    var ngModules = [
        "common", "compiler", "core", "platform-browser", "platform-browser-dynamic"
    ];

    ngModules.forEach((name) => {
        map["@angular/" + name] = ngCDN + name + ngVer;
    });

    ngModules.forEach((name) => {
        packages["@angular/" + name] = { main: '/bundles/' + name + '.umd.js', defaultExtension: 'js' };
    });


    var config = {
        map,
        packages
    }

    System.config(config);

})(this);