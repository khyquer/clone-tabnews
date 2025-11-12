const nextJest = require("next/jest");
const dotenv = require("dotenv");

// Carrega variáveis de ambiente do .env.development
dotenv.config({  
  path: ".env.development"
});

// Cria configuração base do Next.js para Jest
const createJestConfig = nextJest({
  dir: ".",
});

// Exporta a configuração combinada
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/tests/integration/api/v1/migrations/" // ignora os testes de migrations
  ],
});

module.exports = jestConfig;