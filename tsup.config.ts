import type { Options } from "tsup";

export const tsup: Options = {
  entry: ["lib/*ts"],
  format: ["cjs"],
  dts: true,
  splitting: true,
  clean: true
}