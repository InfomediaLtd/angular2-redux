// Sourced from: https://github.com/mgechev/angular2-seed -- check it out.

// Tun on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

// Cancel Karma's synchronous start,
// we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function () {
};

// Since beta-2
System.import('angular2/testing').then(function(testing) {
    return System.import('angular2/platform/testing/browser').then(function(testing_platform_browser) {
        testing.setBaseTestProviders(testing_platform_browser.TEST_BROWSER_PLATFORM_PROVIDERS,
                                     testing_platform_browser.TEST_BROWSER_APPLICATION_PROVIDERS);
    });
})
// This worked until beta-2
// System.import('angular2/src/platform/browser/browser_adapter')
//     .then(function (browser_adapter) {
//         browser_adapter.BrowserDomAdapter.makeCurrent();
//     })
    .then(function () {
        // console.log("Importing test.");
        return System.import('test')
    })
    .then(function () {
        return Promise.all(
            Object.keys(window.__karma__.files) // All files served by Karma.
                .filter(onlyAppFiles)
                .filter(onlySpecFiles)
                .map(function (path) {
                    // console.log("Loading " + path);
                    return System.import(path).then(function (module) {
                        if (module.hasOwnProperty('main')) {
                            module.main();
                        } else {
                            console.warn(' skipping ' + path + ' which does not implement main() method.');
                        }
                    });
                }))
    })
    .then(function () {
        __karma__.start();
    }, function (error) {
        console.error(error.stack || error);
        __karma__.start();
    });


function onlySpecFiles(path) {
    // console.log("isSpec? " + path);
    return /[_|-|\.]spec\.[j|t]s$/.test(path);
}

function onlyAppFiles(path) {
    // console.log("isApp? " + path);
    return /^\/base\/test/.test(path);
}
