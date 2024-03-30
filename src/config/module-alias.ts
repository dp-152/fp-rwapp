import { resolve, dirname } from "path";
import { addAliases } from "module-alias";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const src = resolve(root, "src");

addAliases({
  "@/*": src,
  "@common/*": resolve(src, "common"),
  "@config/*": resolve(src, "config"),
  "@util/*": resolve(src, "util"),
  "@application/*": resolve(src, "application"),
});
