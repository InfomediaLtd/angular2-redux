module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', 'jspm'],
        plugins: ['karma-jspm', 'karma-jasmine', 'karma-mocha-reporter', 'karma-phantomjs-launcher'],
        jspm: {
            serveFiles: ['src/**/*.+(ts|js|html|css)', 'test/**/*.spec.ts'],
        },
        files: [
            {pattern: 'node_modules/angular2/bundles/angular2-polyfills.js', included: true, watched: false},
            {pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', included: true, watched: false}, // PhantomJS
            {pattern: 'node_modules/es6-shim/es6-shim.js', included: true, watched: false}, // PhantomJS & PhantomJS2
            {pattern: 'test/karma-test-shim.js', included: true, watched: false}
        ],
        reporters: ['mocha'],
        browsers: ['PhantomJS']
    })
};
