// karaoke.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import readline from "readline";
import { logWithDelay } from "./logWithDelay.js";
import { santaClaus } from "./asciiArt.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface LyricLine {
  line: string;
  time: number;
  blank: string | null;
}

interface Carol {
  id: string;
  title: string;
  difficulty: string;
  lyrics: LyricLine[];
}

let carolsData: Carol[] = [];

// Load carols data
try {
  const carolsPath = path.join(__dirname, "carols.json");
  const raw = fs.readFileSync(carolsPath, "utf-8");
  carolsData = JSON.parse(raw) as Carol[];
} catch (err) {
  console.error(chalk.red("Failed to load carols data. Exiting."), err);
  process.exit(1);
}

/**
 * Create readline interface for user input
 */
function createReadlineInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

/**
 * Ask user a question and return their answer
 */
function askQuestion(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

/**
 * Display main menu and get user choice
 */
async function showMainMenu(rl: readline.Interface): Promise<string> {
  console.log(chalk.cyan("\n🎄🎅 Christmas Carol Karaoke 🎅🎄\n"));
  console.log(chalk.yellow("Select a mode:\n"));
  console.log(chalk.white("1. Sing-Along Mode (just enjoy the lyrics)"));
  console.log(chalk.white("2. Karaoke Mode (fill in the blanks!)"));
  console.log(chalk.white("3. Exit\n"));

  const choice = await askQuestion(rl, chalk.green("Enter your choice (1-3): "));
  return choice;
}

/**
 * Display carol selection menu
 */
async function selectCarol(rl: readline.Interface): Promise<Carol | null> {
  console.log(chalk.cyan("\n🎵 Available Carols:\n"));
  
  carolsData.forEach((carol, index) => {
    console.log(
      chalk.white(
        `${index + 1}. ${carol.title} (${carol.difficulty})`,
      ),
    );
  });
  console.log(chalk.white(`${carolsData.length + 1}. Random carol`));
  console.log(chalk.white(`${carolsData.length + 2}. Back to main menu\n`));

  const choice = await askQuestion(
    rl,
    chalk.green(`Select a carol (1-${carolsData.length + 2}): `),
  );
  const choiceNum = parseInt(choice, 10);

  if (choiceNum === carolsData.length + 2) {
    return null; // Back to menu
  }

  if (choiceNum === carolsData.length + 1) {
    // Random carol
    const randomIndex = Math.floor(Math.random() * carolsData.length);
    return carolsData[randomIndex];
  }

  if (choiceNum >= 1 && choiceNum <= carolsData.length) {
    return carolsData[choiceNum - 1];
  }

  console.log(chalk.red("Invalid choice. Please try again."));
  return await selectCarol(rl);
}

/**
 * Sing-Along Mode: Display lyrics line by line
 */
async function singAlongMode(carol: Carol): Promise<void> {
  console.clear();
  console.log(chalk.cyan(`\n🎵 Now Singing: "${carol.title}" 🎵\n`));
  console.log(chalk.yellow("═".repeat(50)));
  console.log(chalk.yellow("Sing along with the lyrics!\n"));

  // Show Santa ASCII art occasionally
  if (Math.random() < 0.3) {
    await logWithDelay(chalk.green(santaClaus), 0);
  }

  for (const lyricLine of carol.lyrics) {
    if (lyricLine.line === "") {
      await logWithDelay("", lyricLine.time);
    } else {
      await logWithDelay(chalk.whiteBright(`🎶 ${lyricLine.line}`), lyricLine.time);
    }
  }

  console.log(chalk.yellow("\n═".repeat(50)));
  console.log(chalk.greenBright("\n✨ Great singing! ✨\n"));
}

/**
 * Karaoke Mode: Interactive fill-in-the-blank
 */
async function karaokeMode(carol: Carol, rl: readline.Interface): Promise<void> {
  console.clear();
  console.log(chalk.cyan(`\n🎤 Karaoke Mode: "${carol.title}" 🎤\n`));
  console.log(chalk.yellow("═".repeat(50)));
  console.log(chalk.yellow("Fill in the missing words to earn points!\n"));

  let score = 0;
  let totalBlanks = 0;

  for (const lyricLine of carol.lyrics) {
    if (lyricLine.line === "") {
      await logWithDelay("", lyricLine.time);
      continue;
    }

    if (lyricLine.blank) {
      totalBlanks++;
      // Show line with blank
      const lineWithBlank = lyricLine.line.replace(
        new RegExp(lyricLine.blank, "i"),
        chalk.bgYellow.black(" _____ "),
      );
      console.log(chalk.whiteBright(`🎶 ${lineWithBlank}`));

      // Get user input
      const userAnswer = await askQuestion(
        rl,
        chalk.green("(Your answer): "),
      );

      // Check answer
      if (userAnswer.toLowerCase() === lyricLine.blank.toLowerCase()) {
        score += 10;
        console.log(chalk.greenBright("✅ Correct! +10 points\n"));
      } else {
        console.log(
          chalk.red(
            `❌ Oops! The word was "${lyricLine.blank}". Keep singing!\n`,
          ),
        );
      }

      await logWithDelay("", 500);
    } else {
      // Regular line, just display it
      await logWithDelay(chalk.whiteBright(`🎶 ${lyricLine.line}`), lyricLine.time);
    }
  }

  console.log(chalk.yellow("\n═".repeat(50)));
  console.log(
    chalk.greenBright(
      `\n🎁 Your Total Score: ${score}/${totalBlanks * 10} points! 🎁\n`,
    ),
  );

  // Show performance message
  const percentage = totalBlanks > 0 ? (score / (totalBlanks * 10)) * 100 : 0;
  if (percentage === 100) {
    console.log(chalk.cyanBright("🌟 Perfect! You're a Christmas carol master! 🌟\n"));
  } else if (percentage >= 70) {
    console.log(chalk.greenBright("🎅 Great job! Santa is impressed! 🎅\n"));
  } else if (percentage >= 40) {
    console.log(chalk.yellow("🎄 Good effort! Keep practicing! 🎄\n"));
  } else {
    console.log(chalk.magenta("❄️ Nice try! Practice makes perfect! ❄️\n"));
  }
}

/**
 * Main karaoke function
 */
export async function runKaraoke(): Promise<void> {
  const rl = createReadlineInterface();

  let running = true;

  while (running) {
    const mainChoice = await showMainMenu(rl);

    switch (mainChoice) {
      case "1": {
        // Sing-Along Mode
        const carol = await selectCarol(rl);
        if (carol) {
          await singAlongMode(carol);
          await askQuestion(rl, chalk.cyan("Press Enter to continue..."));
        }
        break;
      }
      case "2": {
        // Karaoke Mode
        const carol = await selectCarol(rl);
        if (carol) {
          await karaokeMode(carol, rl);
          await askQuestion(rl, chalk.cyan("Press Enter to continue..."));
        }
        break;
      }
      case "3":
        // Exit
        console.log(chalk.greenBright("\n🎄 Thanks for singing! Merry Christmas! 🎄\n"));
        running = false;
        break;
      default:
        console.log(chalk.red("Invalid choice. Please try again."));
    }
  }

  rl.close();
}

/**
 * If this file is run directly, start karaoke
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  runKaraoke().catch((err) => {
    console.error(chalk.red("An error occurred:", err));
  });
}
