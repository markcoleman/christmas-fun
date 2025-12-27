import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  generateJoke,
  randomTrivia,
  suggestActivity,
  getCountdown,
} from "../src/shared/spirit-generator.js";

describe("Holiday Spirit Generator", () => {
  let randomSpy: ReturnType<typeof vi.spyOn> | null = null;

  afterEach(() => {
    // Restore Math.random if it was mocked
    if (randomSpy) {
      randomSpy.mockRestore();
      randomSpy = null;
    }
  });

  describe("generateJoke", () => {
    it("returns a string", () => {
      const joke = generateJoke();
      expect(typeof joke).toBe("string");
      expect(joke.length).toBeGreaterThan(0);
    });

    it("returns different jokes (testing randomness)", () => {
      const jokes = new Set();
      for (let i = 0; i < 20; i++) {
        jokes.add(generateJoke());
      }
      // Should get at least 2 different jokes in 20 attempts
      expect(jokes.size).toBeGreaterThan(1);
    });

    it("returns a specific joke when Math.random is mocked", () => {
      randomSpy = vi.spyOn(Math, "random").mockReturnValue(0); // First joke
      const joke = generateJoke();
      expect(joke).toContain("office");
    });
  });

  describe("randomTrivia", () => {
    it("returns a string", () => {
      const trivia = randomTrivia();
      expect(typeof trivia).toBe("string");
      expect(trivia.length).toBeGreaterThan(0);
    });

    it("returns different trivia (testing randomness)", () => {
      const facts = new Set();
      for (let i = 0; i < 20; i++) {
        facts.add(randomTrivia());
      }
      // Should get at least 2 different facts in 20 attempts
      expect(facts.size).toBeGreaterThan(1);
    });

    it("returns a specific trivia when Math.random is mocked", () => {
      randomSpy = vi.spyOn(Math, "random").mockReturnValue(0); // First trivia
      const trivia = randomTrivia();
      expect(trivia).toContain("Germany");
    });
  });

  describe("suggestActivity", () => {
    it("returns a string", () => {
      const activity = suggestActivity();
      expect(typeof activity).toBe("string");
      expect(activity.length).toBeGreaterThan(0);
    });

    it("returns different activities (testing randomness)", () => {
      const activities = new Set();
      for (let i = 0; i < 20; i++) {
        activities.add(suggestActivity());
      }
      // Should get at least 2 different activities in 20 attempts
      expect(activities.size).toBeGreaterThan(1);
    });

    it("returns a specific activity when Math.random is mocked", () => {
      randomSpy = vi.spyOn(Math, "random").mockReturnValue(0); // First activity
      const activity = suggestActivity();
      expect(activity).toContain("snowman");
    });
  });

  describe("getCountdown", () => {
    beforeEach(() => {
      // Mock the current date to a fixed point for consistent testing
      vi.useFakeTimers();
      vi.setSystemTime(new Date("2025-12-25T12:00:00Z"));
    });

    it("returns an object with countdown properties", () => {
      const countdown = getCountdown();
      expect(countdown).toHaveProperty("days");
      expect(countdown).toHaveProperty("hours");
      expect(countdown).toHaveProperty("minutes");
      expect(countdown).toHaveProperty("seconds");
      expect(countdown).toHaveProperty("totalSeconds");
      expect(countdown).toHaveProperty("formatted");
    });

    it("calculates correct countdown to New Year's Day", () => {
      const countdown = getCountdown();
      // From Dec 25, 12:00 to Jan 1, 00:00 is 6 days and 12 hours
      expect(countdown.days).toBe(6);
      expect(countdown.hours).toBe(12);
      expect(countdown.minutes).toBe(0);
      expect(countdown.seconds).toBe(0);
    });

    it("formats countdown string correctly", () => {
      const countdown = getCountdown();
      expect(countdown.formatted).toBe(
        "6 days, 12 hours, 0 minutes, 0 seconds",
      );
    });

    it("calculates countdown to a custom date", () => {
      const targetDate = new Date("2025-12-31T12:00:00Z");
      const countdown = getCountdown(targetDate);
      expect(countdown.days).toBe(6);
      expect(countdown.hours).toBe(0);
      expect(countdown.minutes).toBe(0);
      expect(countdown.seconds).toBe(0);
    });

    it("handles past dates correctly", () => {
      const pastDate = new Date("2025-12-20T12:00:00Z");
      const countdown = getCountdown(pastDate);
      expect(countdown.days).toBe(0);
      expect(countdown.hours).toBe(0);
      expect(countdown.minutes).toBe(0);
      expect(countdown.seconds).toBe(0);
      expect(countdown.formatted).toBe("The countdown has ended! 🎉");
    });

    it("calculates total seconds correctly", () => {
      const countdown = getCountdown();
      // 6 days and 12 hours = (6 * 24 * 60 * 60) + (12 * 60 * 60) = 561600 seconds
      expect(countdown.totalSeconds).toBe(561600);
    });
  });
});
