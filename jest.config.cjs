module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
}
