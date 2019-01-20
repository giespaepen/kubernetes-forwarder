import * as fs from "fs";

import { ServicePort } from "./domain";

export type StoredConfig = {
  namespace: string;
  servicePorts: ServicePort[];
};

export const CONFIG_FILE: string = "config.json";

export function writeConfig(
  namespace: string,
  servicePorts: ServicePort[]
): void {
  writeConfigInternal({ namespace, servicePorts });
}

function writeConfigInternal(storedConfig: StoredConfig): void {
  fs.writeFileSync(`./${CONFIG_FILE}`, JSON.stringify(storedConfig), "utf-8");
}
