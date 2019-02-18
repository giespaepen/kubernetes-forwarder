import * as fs from "fs";
import Configstore from "configstore";

import pkg from "./package.json";
import { ServicePort } from "./domain";

export type StoredConnection = {
  namespace: string;
  servicePorts: ServicePort[];
};

const config = new Configstore(packageName(), {});
const key = "CONN";


export function configExists(): boolean {
  return config.get(key) != null;
}

export function readConfig(): StoredConnection {
  return JSON.parse(config.get(key));
}

export function writeConfig(
  namespace: string,
  servicePorts: ServicePort[]
): void {
  writeConfigInternal({ namespace, servicePorts });
}

function writeConfigInternal(connection: StoredConnection) {
  config.set(key, JSON.stringify(connection));
}

function packageName() {
  return pkg.name;
}
