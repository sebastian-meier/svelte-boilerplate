module.exports = {
  "clearMocks": true,
  "transform": {
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        "preprocess": true
      }
    ],
    "^.+\\.(js|mjs)$": "babel-jest",
    "^.+\\.ts$": "ts-jest"
  },
  "moduleFileExtensions": [
    "js",
    "mjs",
    "ts",
    "svelte"
  ],
  "coverageDirectory": ".coverage",
  "collectCoverageFrom": [
    "src/**/*.js",
    "src/**/*.svelte",
    "src/**/*.ts"
  ],
  "coverageProvider": "babel",
  transformIgnorePatterns: [
    ignoreModules([
      'svelte-spa-router',
      'regexparam'
    ])
  ],
  moduleNameMapper: {
    "^regexparam$": "<rootDir>/node_modules/regexparam/dist/regexparam.mjs"
  },
  "bail": 1,
  "verbose": true,
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};

function ignoreModules(modules) {
  return `node_modules/(?!(${modules.join('|')})/)`
}