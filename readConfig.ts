import * as fs from "fs";

import { CONFIG_FILE, StoredConfig } from "./writeConfig";

export function configExists(): boolean {
  return fs.existsSync(`./${CONFIG_FILE}`);
}

export function readConfig(): StoredConfig {
  return JSON.parse(fs.readFileSync(`./${CONFIG_FILE}`, "utf-8"));
}
