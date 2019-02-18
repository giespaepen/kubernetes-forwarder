import chalk from "chalk";
import * as child from "child_process";
import { eventNames } from "cluster";
import inquirer from "inquirer";

import { ServicePort } from "./domain";
import { getNamespace } from "./getNamespace";
import { getPods } from "./getPods";
import { intro } from "./intro";
import { configExists, readConfig, writeConfig } from "./readConfig";
import { terminate } from "./terminate";

type Answers = { items: ServicePort[] };

async function main() {
  // Print the intro
  intro();

  let namespace: string | undefined;
  let servicePorts: ServicePort[] | undefined;

  // Get the settings from last config
  if (configExists()) {
    console.log(chalk.yellow("Found a config, will start from that."));
    let config = readConfig();
    namespace = config.namespace;
    servicePorts = config.servicePorts;
  }

  if (!namespace) {
    // Get the namespace
    namespace = await getNamespace();
  }

  if (!servicePorts) {
    servicePorts = await getPods(namespace);
  }

  const kubectlprocesses: child.ChildProcess[] = [];

  if (servicePorts.length === 0) {
    console.log(chalk.magenta("No serviceports selected."));
    process.exit();
  } else {
    // First write the last config away
    writeConfig(namespace, servicePorts);

    servicePorts.forEach(x => {
      // Exec the command
      const commandArgs = [
        "port-forward",
        x.name,
        `${x.port}:${x.port}`,
        `--namespace=${namespace}`
      ];
      const command = "kubectl";
      console.log(chalk.yellow("Starting", command, commandArgs.join(" ")));
      const kubectl = child.spawn("kubectl", [
        "port-forward",
        x.name,
        `${x.port}:${x.port}`,
        `--namespace=${namespace}`
      ]);

      // Follow up the output
      kubectl.stdout.on("data", data =>
        console.log(
          chalk.bgGreen(x.name),
          "\t",
          chalk.gray(data.toString().replace("\n", ""))
        )
      );

      // Print the error and send SIGINT
      kubectl.stderr.on("data", data => {
        console.log(
          chalk.bgMagenta(x.name),
          "\t",
          chalk.gray(data.toString().replace("\n", ""))
        );
        terminate(kubectlprocesses);
      });

      kubectlprocesses.push(kubectl);
    });
  }
}

export default main;
