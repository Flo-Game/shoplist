module.exports = {
  preset: 'ts-jest',
  testEnvironment: "node",
  //setupFiles: ["dotenv/config"],
  collectCoverage: false,
  collectCoverageFrom: ["<rootDir>/**/*.tsx","<rootDir>/**/*.ts", "!<rootDir>/node_modules/", "!<rootDir>/src/**/__test__/**"],
};
