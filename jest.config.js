const nextJest = require("next/jest");
const dotenv = require('dotenv');
dotenv.config({  
  path: ".env.development"
});

const createJestIConfig = nextJest({
  dir: "."
});
const jestConfig = createJestIConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;