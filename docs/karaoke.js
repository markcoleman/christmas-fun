/* global document, fetch */

// State management
let carolsData = [];
let currentCarol = null;
let currentLineIndex = 0;
let isPlaying = false;
let isPaused = false;
let isKaraokeMode = false;
let animationTimer = null;
let speedMultiplier = 1.0;
let score = 0;
let totalBlanks = 0;
let correctAnswers = 0;

// DOM elements
const carolSelectionSection = document.getElementById("carol-selection");
const karaokePlayerSection = document.getElementById("karaoke-player");
const resultsSection = document.getElementById("results-section");
const carolList = document.getElementById("carol-list");
const songTitle = document.getElementById("song-title");
const lyricsContainer = document.getElementById("lyrics");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const backBtn = document.getElementById("back-btn");
const modeBtn = document.getElementById("mode-btn");
const speedSlider = document.getElementById("speed-slider");
const speedValue = document.getElementById("speed-value");
const scoreDisplay = document.getElementById("score-display");
const scoreElement = document.getElementById("score");
const accuracyElement = document.getElementById("accuracy");
const karaokeInputArea = document.getElementById("karaoke-input-area");
const karaokeInput = document.getElementById("karaoke-input");
const submitAnswerBtn = document.getElementById("submit-answer");
const feedbackElement = document.getElementById("feedback");
const progressBar = document.getElementById("progress");
const resultsContent = document.getElementById("results-content");
const playAgainBtn = document.getElementById("play-again-btn");
const chooseAnotherBtn = document.getElementById("choose-another-btn");

// Load carols data
async function loadCarols() {
  try {
    const response = await fetch("carols.json");
    if (!response.ok) {
      throw new Error("Failed to load carols");
    }
    carolsData = await response.json();
    displayCarolSelection();
  } catch (error) {
    console.error("Error loading carols:", error);
    carolList.innerHTML =
      '<p style="color: #ef9a9a;">Failed to load carols. Please refresh the page.</p>';
  }
}

// Display carol selection cards
function displayCarolSelection() {
  carolList.innerHTML = "";

  const icons = ["🔔", "🌟", "🎄", "🎅"];

  carolsData.forEach((carol, index) => {
    const carolCard = document.createElement("div");
    carolCard.className = "carol-card";
    carolCard.innerHTML = `
      <div class="carol-icon">${icons[index % icons.length]}</div>
      <h3>${carol.title}</h3>
      <span class="carol-difficulty difficulty-${carol.difficulty}">${carol.difficulty.toUpperCase()}</span>
    `;
    carolCard.addEventListener("click", () => selectCarol(carol));
    carolList.appendChild(carolCard);
  });

  // Add random carol option
  const randomCard = document.createElement("div");
  randomCard.className = "carol-card";
  randomCard.innerHTML = `
    <div class="carol-icon">🎲</div>
    <h3>Random Carol</h3>
    <span class="carol-difficulty difficulty-medium">SURPRISE</span>
  `;
  randomCard.addEventListener("click", selectRandomCarol);
  carolList.appendChild(randomCard);
}

// Select a carol
function selectCarol(carol) {
  currentCarol = carol;
  showKaraokePlayer();
}

// Select random carol
function selectRandomCarol() {
  const randomIndex = Math.floor(Math.random() * carolsData.length);
  selectCarol(carolsData[randomIndex]);
}

// Show karaoke player
function showKaraokePlayer() {
  carolSelectionSection.style.display = "none";
  karaokePlayerSection.style.display = "block";
  resultsSection.style.display = "none";

  songTitle.textContent = `🎵 ${currentCarol.title}`;
  resetKaraokeState();
  displayLyrics();
}

// Show carol selection
function showCarolSelection() {
  carolSelectionSection.style.display = "block";
  karaokePlayerSection.style.display = "none";
  resultsSection.style.display = "none";
}

// Reset karaoke state
function resetKaraokeState() {
  currentLineIndex = 0;
  isPlaying = false;
  isPaused = false;
  score = 0;
  totalBlanks = 0;
  correctAnswers = 0;
  updateScore();

  playBtn.style.display = "inline-flex";
  pauseBtn.style.display = "none";
  karaokeInputArea.style.display = "none";
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";
  progressBar.style.width = "0%";

  if (animationTimer) {
    clearTimeout(animationTimer);
    animationTimer = null;
  }
}

// Display lyrics
function displayLyrics() {
  lyricsContainer.innerHTML = "";

  currentCarol.lyrics.forEach((lyricLine, index) => {
    const lineDiv = document.createElement("div");
    lineDiv.className = "lyric-line";
    lineDiv.dataset.index = index;

    if (lyricLine.line === "") {
      lineDiv.innerHTML = "&nbsp;";
    } else if (isKaraokeMode && lyricLine.blank) {
      // In karaoke mode, replace blank word with placeholder
      const lineWithBlank = lyricLine.line.replace(
        new RegExp(lyricLine.blank, "i"),
        '<span class="blank-word">_____</span>',
      );
      lineDiv.innerHTML = `🎶 ${lineWithBlank}`;
    } else {
      lineDiv.textContent = `🎶 ${lyricLine.line}`;
    }

    lyricsContainer.appendChild(lineDiv);
  });

  // Count total blanks for scoring
  totalBlanks = currentCarol.lyrics.filter((l) => l.blank).length;
}

// Toggle karaoke mode
function toggleKaraokeMode() {
  isKaraokeMode = !isKaraokeMode;

  if (isKaraokeMode) {
    modeBtn.innerHTML = '<span class="material-icons">queue_music</span> Sing-Along Mode';
    scoreDisplay.style.display = "flex";
  } else {
    modeBtn.innerHTML = '<span class="material-icons">microphone</span> Karaoke Mode';
    scoreDisplay.style.display = "none";
    karaokeInputArea.style.display = "none";
  }

  resetKaraokeState();
  displayLyrics();
}

// Update score display
function updateScore() {
  scoreElement.textContent = score;
  const accuracy = totalBlanks > 0 ? Math.round((correctAnswers / totalBlanks) * 100) : 0;
  accuracyElement.textContent = `${accuracy}%`;
}

// Start playing
function startPlaying() {
  if (isPaused) {
    isPaused = false;
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline-flex";
    animateLyrics();
  } else {
    isPlaying = true;
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline-flex";
    currentLineIndex = 0;
    animateLyrics();
  }
}

// Pause playing
function pausePlaying() {
  isPaused = true;
  playBtn.style.display = "inline-flex";
  pauseBtn.style.display = "none";
  if (animationTimer) {
    clearTimeout(animationTimer);
    animationTimer = null;
  }
}

// Reset playing
function resetPlaying() {
  pausePlaying();
  resetKaraokeState();
  displayLyrics();
}

// Animate lyrics
function animateLyrics() {
  if (!isPlaying || isPaused) return;

  const lines = lyricsContainer.querySelectorAll(".lyric-line");

  if (currentLineIndex >= currentCarol.lyrics.length) {
    // Song finished
    finishSong();
    return;
  }

  const currentLyric = currentCarol.lyrics[currentLineIndex];

  // Update line styling (only update current and adjacent lines for efficiency)
  const prevIndex = currentLineIndex - 1;
  
  if (prevIndex >= 0 && prevIndex < lines.length) {
    lines[prevIndex].classList.add("past");
    lines[prevIndex].classList.remove("current");
  }
  
  if (currentLineIndex < lines.length) {
    const currentLine = lines[currentLineIndex];
    currentLine.classList.add("current");
    currentLine.classList.remove("past");
    
    // Only scroll if the line is not already visible
    const rect = currentLine.getBoundingClientRect();
    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
    if (!isVisible) {
      currentLine.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // Update progress bar
  const progress = ((currentLineIndex + 1) / currentCarol.lyrics.length) * 100;
  progressBar.style.width = `${progress}%`;

  // Check if this line has a blank in karaoke mode
  if (isKaraokeMode && currentLyric.blank) {
    // Show input for karaoke mode
    pausePlaying();
    showKaraokeInput(currentLyric.blank);
    return;
  }

  // Move to next line after delay
  currentLineIndex++;
  const delay = currentLyric.time / speedMultiplier;
  animationTimer = setTimeout(() => animateLyrics(), delay);
}

// Show karaoke input
function showKaraokeInput(correctAnswer) {
  karaokeInputArea.style.display = "block";
  karaokeInput.value = "";
  karaokeInput.focus();
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";

  // Store correct answer for checking
  karaokeInput.dataset.correctAnswer = correctAnswer;
}

// Check karaoke answer
function checkAnswer() {
  const userAnswer = karaokeInput.value.trim();
  const correctAnswer = karaokeInput.dataset.correctAnswer;

  if (!userAnswer) return;

  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    // Correct answer
    score += 10;
    correctAnswers++;
    feedbackElement.textContent = "✅ Correct! +10 points";
    feedbackElement.className = "feedback correct";
  } else {
    // Incorrect answer
    feedbackElement.textContent = `❌ Oops! The word was "${correctAnswer}"`;
    feedbackElement.className = "feedback incorrect";
  }

  updateScore();

  // Continue after a short delay
  setTimeout(() => {
    karaokeInputArea.style.display = "none";
    currentLineIndex++;
    isPaused = false;
    isPlaying = true;
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline-flex";
    animateLyrics();
  }, 2000);
}

// Finish song
function finishSong() {
  isPlaying = false;
  playBtn.style.display = "inline-flex";
  pauseBtn.style.display = "none";
  progressBar.style.width = "100%";

  if (isKaraokeMode) {
    showResults();
  } else {
    // Show a completion message in sing-along mode
    setTimeout(() => {
      // Create a simple notification instead of alert
      const notification = document.createElement("div");
      notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(76, 175, 80, 0.95);
        color: white;
        padding: 2rem 3rem;
        border-radius: 16px;
        font-size: 1.5rem;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      `;
      notification.innerHTML = "🎉 Great singing!<br>Thanks for joining the karaoke! 🎤";
      notification.setAttribute("role", "alert");
      notification.setAttribute("aria-live", "polite");
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
        resetPlaying();
      }, 3000);
    }, 500);
  }
}

// Show results
function showResults() {
  karaokePlayerSection.style.display = "none";
  resultsSection.style.display = "block";

  const accuracy = totalBlanks > 0 ? Math.round((correctAnswers / totalBlanks) * 100) : 0;
  let performanceMessage = "";
  let emoji = "";

  if (accuracy === 100) {
    performanceMessage = "🌟 Perfect! You're a Christmas carol master! 🌟";
    emoji = "🏆";
  } else if (accuracy >= 70) {
    performanceMessage = "🎅 Great job! Santa is impressed! 🎅";
    emoji = "⭐";
  } else if (accuracy >= 40) {
    performanceMessage = "🎄 Good effort! Keep practicing! 🎄";
    emoji = "🎵";
  } else {
    performanceMessage = "❄️ Nice try! Practice makes perfect! ❄️";
    emoji = "🎶";
  }

  resultsContent.innerHTML = `
    <h3>${emoji} Performance Complete! ${emoji}</h3>
    <div class="results-stats">
      <div class="stat-card">
        <span class="stat-value">${score}</span>
        <span class="stat-label">Total Score</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">${correctAnswers}/${totalBlanks}</span>
        <span class="stat-label">Correct Answers</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">${accuracy}%</span>
        <span class="stat-label">Accuracy</span>
      </div>
    </div>
    <div class="results-message">
      <p>${performanceMessage}</p>
    </div>
  `;
}

// Update speed
function updateSpeed() {
  speedMultiplier = parseFloat(speedSlider.value);
  speedValue.textContent = `${speedMultiplier}x`;
}

// Event listeners
backBtn.addEventListener("click", showCarolSelection);
modeBtn.addEventListener("click", toggleKaraokeMode);
playBtn.addEventListener("click", startPlaying);
pauseBtn.addEventListener("click", pausePlaying);
resetBtn.addEventListener("click", resetPlaying);
speedSlider.addEventListener("input", updateSpeed);
submitAnswerBtn.addEventListener("click", checkAnswer);
karaokeInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkAnswer();
  }
});
playAgainBtn.addEventListener("click", () => {
  showKaraokePlayer();
});
chooseAnotherBtn.addEventListener("click", showCarolSelection);

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadCarols();
});
