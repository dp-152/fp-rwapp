const eslintConfig = require("./eslint.config.cjs");

const configMap = [
  {
    config: "printWidth",
    rule: "max-len",
    field: "code",
    default: 70,
    transform: (val) => Math.floor(val * 0.8), // ensures line will not exceed max length even after formatted. Ref.: https://prettier.io/docs/en/options#print-width
  },
  {
    config: "tabWidth",
    rule: "indent",
    default: 4,
    transform: (val) => (typeof val === "number" ? val : null),
  },
  {
    config: "useTabs",
    rule: "indent",
    default: false,
    transform: (val) => typeof val === "string" && val.toLowerCase() === "tab",
  },
  {
    config: "semi",
    rule: "semi",
    default: true,
    transform: (val) => val === "always",
  },
  {
    config: "singleQuote",
    rule: "quotes",
    default: false,
    transform: (val) => val === "single",
  },
  {
    config: "quoteProps",
    rule: "quote-props",
    default: "always",
    transform: (val) =>
      ["consistent", "as-needed"].includes(val) ? val : val === "always" ? "preserve" : null,
  },
  {
    config: "trailingComma",
    rule: "comma-dangle",
    default: "none",
    transform: (val, opts) => {
      if (val === "never") {
        return "none";
      }

      if (["always", "always-multiline", "only-multiline"].includes(val)) {
        return "all";
      }

      if (!!opts && typeof opts === "object") {
        if (Object.entries(opts).reduce((res, [_, value]) => res && value === "never", true)) {
          return "none";
        }

        if (
          Object.entries(opts).reduce(
            (res, [key, value]) =>
              res &&
              ((key === "functions" && value === "never") ||
                (key !== "functions" &&
                  ["always", "always-multiline", "only-multiline", "ignore"].includes(value))),
            true,
          )
        ) {
          return "es5";
        }
      }
    },
  },
  {
    config: "bracketSpacing",
    rule: "object-curly-spacing",
    default: false,
    transform: (val) => val === "always",
  },
  {
    config: "arrowParens",
    rule: "arrow-parens",
    default: "always",
    transform: (val) => (val === "as-needed" ? "avoid" : val),
  },
];

function mapRules(source) {
  if (!source.rules) {
    return;
  }

  const options = Object.fromEntries(
    Object.entries(source.rules)
      .map(([key, val]) => {
        const [severity, value, opts] = Array.isArray(val) ? val : [val];

        if (["off", 0].includes(severity)) {
          return;
        }

        const matchedRuleMaps = configMap.filter((conf) => conf.rule === key);
        if (matchedRuleMaps.length === 0) {
          return;
        }

        const configEntries = [];
        for (const ruleMap of matchedRuleMaps) {
          if (!value) {
            configEntries.push([ruleMap.config, ruleMap.default]);
            continue;
          }

          if (typeof value === "object" && !!ruleMap.field && !!value[ruleMap.field]) {
            if (!!ruleMap.transform) {
              configEntries.push([
                ruleMap.config,
                ruleMap.transform(value[ruleMap.field], opts),
              ]);
              continue;
            }
            configEntries.push([ruleMap.config, value[ruleMap.field]]);
            continue;
          }

          if (!!ruleMap.transform) {
            configEntries.push([ruleMap.config, ruleMap.transform(value, opts)]);
            continue;
          }

          configEntries.push([ruleMap.config, value]);
        }

        if (configEntries.length === 0) {
          return;
        }

        return configEntries;
      })
      .filter((entries) => !!entries)
      .reduce((agg, entries) => {
        agg.push(...entries);
        return agg;
      }, []),
  );

  if (!options || Object.keys(options).length === 0) {
    return;
  }

  return {
    files: source.files,
    options,
  };
}

module.exports = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  quoteProps: "as-needed",
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "lf",
  proseWrap: "preserve",
  overrides: eslintConfig.map(mapRules).filter((el) => !!el),
};
