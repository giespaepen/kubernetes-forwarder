import chalk from "chalk";
import * as child from "child_process";
import inquirer from "inquirer";

import { IKubeCtlResult, KubeCtlPodMetaData, KubeCtlPodSpec, ServicePort } from "./domain";

export async function getPods(namespace: string): Promise<ServicePort[]> {
  // Get all the pods from the namespace
  console.log("Requesting pods from namespace", namespace);
  var result: IKubeCtlResult<KubeCtlPodMetaData, KubeCtlPodSpec> = JSON.parse(
    child
      .execSync(`kubectl get pods --namespace=${namespace} -o json`)
      .toString()
  );

  // Map to serviceports
  const servicePorts: ServicePort[] = result.items
    .filter((x: any) => x.kind === "Pod")
    .map((x: any) => ({
      name: x.metadata.name,
      ports: x.spec.containers[0].ports
    }))
    .reduce((acc: any, curr: any) => {
      const name = curr.name;
      if (curr.ports) {
        curr.ports.forEach((port: any) => {
          acc.push({
            name,
            port: port.containerPort
          });
        });
      }
      return acc;
    }, []);

  // Now inquire the user
  const response = (await inquirer.prompt({
    type: "checkbox",
    name: "value",
    message:
      "Select the service and port to forward. Use spacebar to select, enter to confirm selection.",
    choices: servicePorts.map((x: any) => ({
      name: x.name + ": " + x.port,
      value: x
    }))
  })) as any;

  return response.value;
}
