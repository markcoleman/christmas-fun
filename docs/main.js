/* global showdown, Swiper, document */

document.addEventListener("DOMContentLoaded", async () => {
  const releaseList = document.getElementById("release-list");

  try {
    // 1) Fetch releases from GitHub
    const response = await fetch(
      "https://api.github.com/repos/markcoleman/christmas-fun/releases",
    );
    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status}`);
    }
    const releases = await response.json();

    if (releases.length === 0) {
      releaseList.innerHTML = `
          <div class="swiper-slide">
            <div class="card">
              <div class="card-content">
                <span class="card-title">No releases found.</span>
                <p>Check back later for release notes!</p>
              </div>
            </div>
          </div>
        `;
    } else {
      releaseList.innerHTML = ""; // Clear loading message

      // Create Showdown converter
      const converter = new showdown.Converter();

      // Regex for capturing @username references
      // We'll transform "@username" -> link to https://github.com/username
      function linkifyMentions(htmlString) {
        return htmlString.replace(/@([\w-]+)/g, (match, username) => {
          const url = `https://github.com/${username}`;
          return `<a href="${url}" target="_blank" rel="noopener noreferrer">@${username}</a>`;
        });
      }

      // 2) Build each release slide
      releases.forEach((release) => {
        // Convert Markdown to HTML
        const mdBody = release.body || "(No release notes)";
        let htmlBody = converter.makeHtml(mdBody);

        // Linkify @mentions
        htmlBody = linkifyMentions(htmlBody);

        // Create slide content using Card
        const slideContent = `
            <div class="card">
              <div class="card-content">
                <span class="card-title">
                  <a
                    class="release-name"
                    href="${release.html_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ${release.name || release.tag_name}
                  </a>
                </span>
                <p class="release-date">
                  Published on: ${new Date(release.published_at).toLocaleDateString()}
                </p>
                <div class="release-body">
                  ${htmlBody}
                </div>
              </div>
            </div>
          `;

        // Append slide
        const slideDiv = document.createElement("div");
        slideDiv.className = "swiper-slide";
        slideDiv.innerHTML = slideContent;
        releaseList.appendChild(slideDiv);
      });

      // Initialize Swiper after slides are added
      new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: releases.length > 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        // Enable keyboard navigation
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
        // Auto-height for variable content
        autoHeight: true,
      });
    }
  } catch (error) {
    releaseList.innerHTML = `
        <div class="swiper-slide">
          <div class="card">
            <div class="card-content">
              <span class="card-title">Error loading releases</span>
              <p>${error.message}</p>
            </div>
          </div>
        </div>
      `;
  }
});

// Holiday Spirit Generator Functions
function showJoke() {
  const joke = window.HolidaySpirit.generateJoke();
  const output = document.getElementById("spirit-output");
  output.innerHTML = `
    <div class="spirit-card joke-card">
      <h4>🎅 Christmas Joke 🎄</h4>
      <p>${joke}</p>
    </div>
  `;
  output.style.display = "block";
}

function showTrivia() {
  const trivia = window.HolidaySpirit.randomTrivia();
  const output = document.getElementById("spirit-output");
  output.innerHTML = `
    <div class="spirit-card trivia-card">
      <h4>🎄 Christmas Trivia 🎅</h4>
      <p>${trivia}</p>
    </div>
  `;
  output.style.display = "block";
}

function showActivity() {
  const activity = window.HolidaySpirit.suggestActivity();
  const output = document.getElementById("spirit-output");
  output.innerHTML = `
    <div class="spirit-card activity-card">
      <h4>✨ Festive Activity Suggestion ✨</h4>
      <p>${activity}</p>
    </div>
  `;
  output.style.display = "block";
}

// Update countdown every second
function updateCountdown() {
  const countdown = window.HolidaySpirit.getCountdown();
  document.getElementById("days").textContent = countdown.days;
  document.getElementById("hours").textContent = countdown.hours;
  document.getElementById("minutes").textContent = countdown.minutes;
  document.getElementById("seconds").textContent = countdown.seconds;
}

// Start countdown timer
if (window.HolidaySpirit) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}
