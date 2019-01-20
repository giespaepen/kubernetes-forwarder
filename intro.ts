import chalk from "chalk";

/**
 * Display intro banner
 */
export function intro() {
    var data = require("./package.json");

    console.log(chalk.blue(data.name + " " + data.version));
    console.log(chalk.blue("----------------------------------------"));
    console.log("")
}
