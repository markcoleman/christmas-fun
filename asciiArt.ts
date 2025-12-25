// asciiArt.ts
import chalk from "chalk";

/**
 * A festive ASCII Christmas tree
 * Using escaped string for reliable rendering
 */
const rawChristmasTree = `
           |
         '.'.'
        -= o =-
         .'.'.
           |
           ,
          / \\
        .'. o'.
       / 6 s ^.\\
      /.-.o *.-. \\
      \`/. '.'9  \\\`
     .'6. *  s o '.
    /.--.s .6 .--.\\
    \`/ s '. .' * .\\\`
   .' o 6 .\` .^ 6 s'.
  /.---. * ^ o .----.\\
  \`/s * \\\`.^ s.' ^ * \\\`
 .' o , 6 \\\`.' ^ o  6 '.
/,-^--,  o ^ * s ,----,\\
\`'-._s.;-,_6_^,-;._o.-'
     jgs |   |
         \`"""\`
`;

/**
 * Apply colors to the Christmas tree
 */
export const christmasTree: string = rawChristmasTree
  .split('\n')
  .map((line, index) => {
    // Color the top star/trunk yellow, rest of tree green
    if (index === 0 || index === 1 || line.includes('jgs') || line.includes('"""')) {
      return chalk.yellow(line);
    }
    return chalk.greenBright(line);
  })
  .join('\n');

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
