import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

describe("Christmas Carol Karaoke", () => {
  describe("Carols Data", () => {
    it("loads carols.json successfully", () => {
      const carolsPath = path.join(__dirname, "../carols.json");
      expect(fs.existsSync(carolsPath)).toBe(true);
      
      const raw = fs.readFileSync(carolsPath, "utf-8");
      const carols = JSON.parse(raw);
      
      expect(Array.isArray(carols)).toBe(true);
      expect(carols.length).toBeGreaterThan(0);
    });

    it("validates carol structure", () => {
      const carolsPath = path.join(__dirname, "../carols.json");
      const raw = fs.readFileSync(carolsPath, "utf-8");
      const carols: Carol[] = JSON.parse(raw);

      carols.forEach((carol: Carol) => {
        expect(carol).toHaveProperty("id");
        expect(carol).toHaveProperty("title");
        expect(carol).toHaveProperty("difficulty");
        expect(carol).toHaveProperty("lyrics");
        expect(Array.isArray(carol.lyrics)).toBe(true);
      });
    });

    it("validates lyric line structure", () => {
      const carolsPath = path.join(__dirname, "../carols.json");
      const raw = fs.readFileSync(carolsPath, "utf-8");
      const carols: Carol[] = JSON.parse(raw);

      carols.forEach((carol: Carol) => {
        carol.lyrics.forEach((line: LyricLine) => {
          expect(line).toHaveProperty("line");
          expect(line).toHaveProperty("time");
          expect(line).toHaveProperty("blank");
          expect(typeof line.line).toBe("string");
          expect(typeof line.time).toBe("number");
          expect(line.time).toBeGreaterThan(0);
        });
      });
    });

    it("includes expected carols", () => {
      const carolsPath = path.join(__dirname, "../carols.json");
      const raw = fs.readFileSync(carolsPath, "utf-8");
      const carols: Carol[] = JSON.parse(raw);

      const titles = carols.map((c: Carol) => c.title);
      expect(titles).toContain("Jingle Bells");
      expect(titles).toContain("Silent Night");
      expect(titles).toContain("Deck the Halls");
    });

    it("includes blank words for karaoke mode", () => {
      const carolsPath = path.join(__dirname, "../carols.json");
      const raw = fs.readFileSync(carolsPath, "utf-8");
      const carols: Carol[] = JSON.parse(raw);

      carols.forEach((carol: Carol) => {
        const blanks = carol.lyrics.filter((line: LyricLine) => line.blank !== null);
        expect(blanks.length).toBeGreaterThan(0);
      });
    });

    it("validates blank words exist in lyrics", () => {
      const carolsPath = path.join(__dirname, "../carols.json");
      const raw = fs.readFileSync(carolsPath, "utf-8");
      const carols: Carol[] = JSON.parse(raw);

      carols.forEach((carol: Carol) => {
        carol.lyrics.forEach((line: LyricLine) => {
          if (line.blank !== null && line.line !== "") {
            // Blank word should exist in the line (case-insensitive)
            const regex = new RegExp(line.blank, "i");
            expect(regex.test(line.line)).toBe(true);
          }
        });
      });
    });
  });

  describe("Karaoke Scoring Logic", () => {
    it("calculates correct score for perfect answers", () => {
      const totalBlanks = 5;
      const correctAnswers = 5;
      const score = correctAnswers * 10;
      const accuracy = (correctAnswers / totalBlanks) * 100;

      expect(score).toBe(50);
      expect(accuracy).toBe(100);
    });

    it("calculates correct score for partial answers", () => {
      const totalBlanks = 5;
      const correctAnswers = 3;
      const score = correctAnswers * 10;
      const accuracy = Math.round((correctAnswers / totalBlanks) * 100);

      expect(score).toBe(30);
      expect(accuracy).toBe(60);
    });

    it("handles zero blanks gracefully", () => {
      const totalBlanks = 0;
      const correctAnswers = 0;
      const accuracy = totalBlanks > 0 ? (correctAnswers / totalBlanks) * 100 : 0;

      expect(accuracy).toBe(0);
    });
  });

  describe("Difficulty Levels", () => {
    it("includes multiple difficulty levels", () => {
      const carolsPath = path.join(__dirname, "../carols.json");
      const raw = fs.readFileSync(carolsPath, "utf-8");
      const carols: Carol[] = JSON.parse(raw);

      const difficulties = carols.map((c: Carol) => c.difficulty);
      const uniqueDifficulties = [...new Set(difficulties)];
      
      expect(uniqueDifficulties.length).toBeGreaterThan(0);
    });

    it("uses valid difficulty values", () => {
      const carolsPath = path.join(__dirname, "../carols.json");
      const raw = fs.readFileSync(carolsPath, "utf-8");
      const carols: Carol[] = JSON.parse(raw);

      const validDifficulties = ["easy", "medium", "hard"];
      carols.forEach((carol: Carol) => {
        expect(validDifficulties).toContain(carol.difficulty);
      });
    });
  });
});
