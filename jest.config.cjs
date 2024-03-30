const src = "<rootDir>/src";

module.exports = {
  preset: "ts-jest",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  moduleNameMapper: {
    "@common/(.*)": `${src}/common/$1`,
    "@config/(.*)": `${src}/config/$1`,
    "@util/(.*)": `${src}/util/$1`,
    "@application/(.*)": `${src}/application/$1`,
    "@/(.*)": `${src}/$1`,
  },
};
