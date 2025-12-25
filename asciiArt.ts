// asciiArt.ts
import chalk from "chalk";

/**
 * A festive ASCII Christmas tree
 */
export const christmasTree: string = `
           ${chalk.yellow("|")}
         ${chalk.greenBright("'.'.''")}
        ${chalk.greenBright("-= o =-")}
         ${chalk.greenBright(".'.'.")}
           ${chalk.yellow("|")}
           ${chalk.yellow(",")}
          ${chalk.greenBright("/ \\")}
        ${chalk.greenBright(".'. o'.")}
       ${chalk.greenBright("/ 6 s ^.\\")}
      ${chalk.greenBright("/.-.o *.-.\\")}
      ${chalk.greenBright("`/. '.'9  \\`")}
     ${chalk.greenBright(".'6. *  s o '.")}
    ${chalk.greenBright("/.--.s .6 .--.\\")}
    ${chalk.greenBright("`/ s '. .' * .\\`")}
   ${chalk.greenBright(".' o 6 .` .^ 6 s'.")}
  ${chalk.greenBright("/.---. * ^ o .----.\\")}
  ${chalk.greenBright("`/s * \\`.^ s.' ^ * \\`")}
 ${chalk.greenBright(".' o , 6 \\`.' ^ o  6 '.")}
${chalk.greenBright("/,-^--,  o ^ * s ,----,\\")}
${chalk.greenBright("`'-._s.;-,_6_^,-;._o.-'")}
     ${chalk.yellow("jgs |   |")}
         ${chalk.yellow("`\"\"\"`")}
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
