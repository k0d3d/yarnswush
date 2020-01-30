const path = require("path")

module.exports = {
  testPathIgnorePatterns: [`node_modules`, `.cache`, `public`],
  transformIgnorePatterns: [`node_modules/`, `\\.svg`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js"
  ],
  collectCoverage: true,
  coverageReporters: [
    "lcov",
    "text",
    "html"
  ]
}