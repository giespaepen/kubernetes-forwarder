import chalk from "chalk";
import * as child from "child_process";
import inquirer from "inquirer";

import { IKubeCtlResult, KubeCtlNamespaceMetaData } from "./domain";

export async function getNamespace(): Promise<string> {
  if (process.env.NAMESPACE) {
    console.log("Get namespace from env");
    return process.env.NAMESPACE;
  } else {
    // Get all the namespaces
    console.log("Get all namespaces");
    var namespaces: IKubeCtlResult<KubeCtlNamespaceMetaData, null> = JSON.parse(
      child.execSync("kubectl get namespaces -o json").toString()
    );

    // Then select the namespace
    if (namespaces) {
      const response: { value: string } = (await inquirer.prompt({
        type: "list",
        name: "value",
        message: "Select the namespace you want to connect to",
        choices: namespaces.items.map(x => ({
          name: `${x.metadata.name} (${x.metadata.resourceVersion})`,
          value: x.metadata.name
        }))
      })) as any;

      return response.value;
    }
    return "";
  }
}
