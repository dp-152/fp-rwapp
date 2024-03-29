const jestConfig = require("./jest.config");

module.exports = Object.assign(
  {
    testMatch: ["**/?(*.)+(spec|test).integration.[tj]s?(x)"],
  },
  jestConfig
);
