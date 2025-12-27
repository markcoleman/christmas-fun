/**
 * Holiday Spirit Generator - Browser version for GitHub Pages
 * 
 * NOTE: This file is intentionally separate from the TypeScript module
 * to provide a zero-dependency, standalone JavaScript file that can be
 * used directly in the browser without any build tools or bundlers.
 * 
 * While this creates some duplication, it ensures the GitHub Pages site
 * works independently and loads quickly without requiring module bundlers
 * or transpilation. For a production application, consider using a build
 * tool to generate this from the TypeScript source.
 */

// Christmas-themed jokes
const jokes = [
  "Why is Christmas just like a day at the office? You do all the work and the fat guy in the suit gets all the credit.",
  "What do you call an obnoxious reindeer? Rude-olph!",
  "Why did the developer go broke during Christmas? Because he used up all his cache!",
  "What's a programmer's favorite Christmas carol? 'While(true) { bells.ring() }'",
  "Why do coders prefer dark mode during the holidays? Because light attracts bugs, even in December!",
  "What did the Git commit say on Christmas? 'Merge Christmas!'",
  "Why was the computer cold at Christmas? It left its Windows open!",
  "What's Santa's favorite programming language? Rust - it's memory-safe for his naughty and nice list!",
  "Why don't programmers like Christmas decorations? Too many hanging ornaments - they prefer async/await!",
  "What do you call a cat on Christmas Eve? Santa Claws!",
];

// Christmas trivia facts
const triviaFacts = [
  "The tradition of putting up a Christmas tree originated in Germany in the 16th century.",
  "Jingle Bells was originally written for Thanksgiving, not Christmas!",
  "The first artificial Christmas tree was made in Germany using goose feathers dyed green.",
  "In Japan, it's a popular tradition to eat KFC for Christmas dinner.",
  "The world's largest Christmas stocking measured 168 feet and 5.5 inches long and 70 feet and 4.5 inches wide.",
  "The abbreviation 'Xmas' comes from the Greek letter Chi (X), which is the first letter of 'Christ' in Greek.",
  "The song 'White Christmas' by Bing Crosby is the best-selling single of all time with over 50 million copies sold.",
  "In Ukraine, it's traditional to decorate Christmas trees with artificial spider webs for good luck.",
  "The tradition of hanging stockings comes from a legend about Saint Nicholas helping a poor family.",
  "The first electric Christmas lights were created by Thomas Edison's associate, Edward H. Johnson, in 1882.",
];

// Festive activity suggestions
const activities = [
  "Build a snowman and give it a programmer's twist - maybe a keyboard as buttons!",
  "Watch a classic holiday movie like 'Home Alone' or 'Elf'",
  "Bake Christmas cookies in festive shapes",
  "Create a GitHub repo to track your New Year's resolutions",
  "Write a holiday-themed script or app",
  "Decorate your Christmas tree with tech-themed ornaments",
  "Have a hot cocoa coding session",
  "Read 'A Christmas Carol' by Charles Dickens",
  "Make a festive Spotify playlist",
  "Try your hand at Christmas caroling with friends",
  "Set up your development environment with a festive theme",
  "Contribute to an open-source project as a holiday gift to the community",
  "Create ASCII art of holiday characters",
  "Host a virtual holiday party with your remote team",
];

/**
 * Generates a random Christmas-themed joke
 * @returns {string} A festive joke string
 */
function generateJoke() {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  return jokes[randomIndex];
}

/**
 * Returns random Christmas trivia or facts
 * @returns {string} A trivia fact string
 */
function randomTrivia() {
  const randomIndex = Math.floor(Math.random() * triviaFacts.length);
  return triviaFacts[randomIndex];
}

/**
 * Suggests a festive activity
 * @returns {string} An activity suggestion string
 */
function suggestActivity() {
  const randomIndex = Math.floor(Math.random() * activities.length);
  return activities[randomIndex];
}

/**
 * Calculates the time remaining to a specified date
 * @param {Date} [targetDate] - The target date (default: New Year's Day)
 * @returns {Object} An object with countdown information
 */
function getCountdown(targetDate) {
  const now = new Date();
  const target = targetDate || new Date(now.getFullYear() + 1, 0, 1); // Default to next New Year
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      formatted: "The countdown has ended! 🎉",
    };
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const remainingHours = hours % 24;
  const remainingMinutes = minutes % 60;
  const remainingSeconds = seconds % 60;

  const formatted = `${days} days, ${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds`;

  return {
    days,
    hours: remainingHours,
    minutes: remainingMinutes,
    seconds: remainingSeconds,
    totalSeconds: seconds,
    formatted,
  };
}

// Export for use in browser
if (typeof window !== "undefined") {
  window.HolidaySpirit = {
    generateJoke,
    randomTrivia,
    suggestActivity,
    getCountdown,
  };
}
