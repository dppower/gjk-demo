console.log("configuring system.js...");
(function (global) {
    var paths = {
        "npm:": "https://npmcdn.com/",
        "unpkg:": "https://unpkg.com/"
    }
    var map = {
        "app": "/gjk-demo/app/",
        "rxjs": "unpkg:rxjs"
    };

    var packages = {
        "app": { main: "./main.js", defaultExtension: "js" },
        "rxjs": { defaultExtension: "js" }
    };

    var ngModules = [
        "common", "compiler", "core", "platform-browser", "platform-browser-dynamic"
    ];

    ngModules.forEach((name) => {
        map["@angular/" + name] = "npm:@angular/" + name + "/bundles/" + name + ".umd.js";
    });

    var config = {
        paths,
        map,
        packages
    }

    System.config(config);

})(this);