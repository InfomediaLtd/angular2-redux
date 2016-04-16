module.exports = function (config) {
    var configuration = {
        frameworks: ['jasmine', 'jspm'],
        plugins: [
          'karma-jspm',
          'karma-jasmine',
          'karma-mocha-reporter',
          // 'karma-phantomjs-launcher',
          'karma-chrome-launcher',
        ],
        jspm: {
            serveFiles: ['src/**/*.+(ts|js|html|css)', 'test/**/*.spec.ts'],
        },
        files: [
            {pattern: 'node_modules/angular2/bundles/angular2-polyfills.js', included: true, watched: false},
            // {pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', included: true, watched: false}, // PhantomJS
            // {pattern: 'node_modules/es6-shim/es6-shim.js', included: true, watched: false}, // PhantomJS & PhantomJS2
            {pattern: 'test/karma-test-shim.js', included: true, watched: false}
        ],
        reporters: ['mocha'],
        browsers: ['Chrome'],
        customLaunchers: {
          Chrome_travis_ci: {
            base: 'Chrome',
            flags: ['--no-sandbox']
          }
        },
    };

    if(process.env.TRAVIS){
      configuration.browsers = ['Chrome_travis_ci'];
      // configuration.reporters = configuration.reporters.concat(['coverage', 'coveralls']);
      // configuration.coverageReporter = {
      //   type : 'lcovonly',
      //   dir : 'coverage/'
      // };
    }

    config.set(configuration);
};
