// asciiArt.ts
import chalk from "chalk";

/**
 * A festive ASCII Christmas tree
 */
export const christmasTree: string = `
          ${chalk.yellowBright("★")}
         ${chalk.greenBright("/|\\")}
        ${chalk.greenBright("/*|*\\")}
       ${chalk.greenBright("/*/|\\*\\")}
      ${chalk.greenBright("/*/*/*\\*\\")}
     ${chalk.greenBright("/*/*/|\\*\\*\\")}
    ${chalk.greenBright("/*/*/*/|\\*\\*\\*\\")}
        ${chalk.yellow("|||")}
        ${chalk.yellow("|||")}
   ~ ${chalk.blueBright("SOFTWARE")} ~
     ${chalk.magentaBright("ENGINEER")}
`;

/**
 * A simple Santa Claus ASCII
 */
export const santaClaus: string = `
        ${chalk.bgRed.white("Ho Ho Ho!")}
           ${chalk.white("_____")}
         ${chalk.red("<(")} ${chalk.white("^ ^")} ${chalk.red(")>")}
           ${chalk.white("-----")}
          ${chalk.red("<(")}     ${chalk.red(")>")}
            ${chalk.white("| | |")}
          ${chalk.red("==")}[${chalk.white("___")}]==
`;
