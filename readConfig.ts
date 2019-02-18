import * as fs from "fs";
import Configstore from "configstore";

import pkg from "./package.json";
import { ServicePort } from "./domain";

export type StoredConnection = {
  namespace: string;
  servicePorts: ServicePort[];
};

const config = new Configstore(packageName(), {});
const KEY = "CONN";
export const NEWARG = "new";


export function configExists(): boolean {
  return config.get(KEY) != null;
}

export function readConfig(): StoredConnection {
  return JSON.parse(config.get(KEY));
}

export function writeConfig(
  namespace: string,
  servicePorts: ServicePort[]
): void {
  writeConfigInternal({ namespace, servicePorts });
}

export function isForceNew() {
  return process.argv.filter(x => x === NEWARG).length > 0;
}

function writeConfigInternal(connection: StoredConnection) {
  config.set(KEY, JSON.stringify(connection));
}

function packageName() {
  return pkg.name;
}
