System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "typescript",
  paths: {
    "npm:*": "jspm_packages/npm/*"
  },

  packages: {
    "app": {
      "main": "index",
      "defaultExtension": "ts"
    }
  },
  map: {
    "typescript": "npm:typescript@1.7.3"
  }
});
