import chalk from "chalk";
import * as child from "child_process";

export function terminate(processes: child.ChildProcess[]) {
  console.log("");
  console.log(chalk.blue(`Closing ${processes.length} processes`));
  processes.filter(x => !x.killed).forEach(x => x.kill("SIGHUP"));
  console.log(chalk.blue("Terminating program"));
  process.exit();
}
