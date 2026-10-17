import { cpSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const source = resolve("prebuilt-release");
const destination = resolve("dist");

if (!existsSync(resolve(source, "index.js")) || !existsSync(resolve(source, "public/index.html"))) {
  throw new Error("The validated prebuilt release is incomplete.");
}

rmSync(destination, { recursive: true, force: true });
cpSync(source, destination, { recursive: true });
console.log("Validated prerendered release copied to dist.");
