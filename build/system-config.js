(function(global) {
    var map = {
        "rxjs": "scripts/rxjs"
    };

    var packages = {
        "app": { main: "./main.js", defaultExtension: "js" },
        "rxjs": { defaultExtension: "js" }
    };

    var ngBundles = [
        "common", "compiler", "core", "platform-browser", "platform-browser-dynamic", "http", "router", "forms"
    ];

    ngBundles.forEach((name) => {
        map["@angular/" + name] = "scripts/@angular/" + name;
    });

    ngBundles.forEach((name) => {
        packages["@angular/" + name] = { main: '/bundles/' + name + '.umd.js', defaultExtension: 'js' };
    });

    var config = {
        map,
        packages
    }

    System.config(config);

})(this);