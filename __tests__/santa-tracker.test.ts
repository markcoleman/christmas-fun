import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Santa Tracker - Journey Data", () => {
  const journeyDataPath = path.join(__dirname, "../docs/santa-journey.json");
  let journeyData: any[];

  it("should load the Santa journey data file", () => {
    expect(fs.existsSync(journeyDataPath)).toBe(true);
    const rawData = fs.readFileSync(journeyDataPath, "utf-8");
    journeyData = JSON.parse(rawData);
    expect(Array.isArray(journeyData)).toBe(true);
  });

  it("should have at least 10 stops in the journey", () => {
    const rawData = fs.readFileSync(journeyDataPath, "utf-8");
    journeyData = JSON.parse(rawData);
    expect(journeyData.length).toBeGreaterThanOrEqual(10);
  });

  it("should start and end at the North Pole", () => {
    const rawData = fs.readFileSync(journeyDataPath, "utf-8");
    journeyData = JSON.parse(rawData);

    const firstStop = journeyData[0];
    const lastStop = journeyData[journeyData.length - 1];

    expect(firstStop.city).toBe("North Pole");
    expect(lastStop.city).toBe("North Pole");
    expect(firstStop.lat).toBe(90);
    expect(lastStop.lat).toBe(90);
  });

  it("should have required fields for each stop", () => {
    const rawData = fs.readFileSync(journeyDataPath, "utf-8");
    journeyData = JSON.parse(rawData);

    journeyData.forEach((stop, index) => {
      expect(stop).toHaveProperty("id");
      expect(stop).toHaveProperty("city");
      expect(stop).toHaveProperty("country");
      expect(stop).toHaveProperty("lat");
      expect(stop).toHaveProperty("lng");
      expect(stop).toHaveProperty("arrivalTime");
      expect(stop).toHaveProperty("funFact");
      expect(stop).toHaveProperty("deliveries");

      // Validate types
      expect(typeof stop.id).toBe("number");
      expect(typeof stop.city).toBe("string");
      expect(typeof stop.country).toBe("string");
      expect(typeof stop.lat).toBe("number");
      expect(typeof stop.lng).toBe("number");
      expect(typeof stop.arrivalTime).toBe("string");
      expect(typeof stop.funFact).toBe("string");
      expect(typeof stop.deliveries).toBe("number");

      // Validate coordinate ranges
      expect(stop.lat).toBeGreaterThanOrEqual(-90);
      expect(stop.lat).toBeLessThanOrEqual(90);
      expect(stop.lng).toBeGreaterThanOrEqual(-180);
      expect(stop.lng).toBeLessThanOrEqual(180);

      // Validate arrival time is a valid ISO 8601 date
      expect(() => new Date(stop.arrivalTime)).not.toThrow();
      expect(new Date(stop.arrivalTime).toString()).not.toBe("Invalid Date");
    });
  });

  it("should have unique IDs for each stop", () => {
    const rawData = fs.readFileSync(journeyDataPath, "utf-8");
    journeyData = JSON.parse(rawData);

    const ids = journeyData.map((stop) => stop.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should have arrival times in chronological order", () => {
    const rawData = fs.readFileSync(journeyDataPath, "utf-8");
    journeyData = JSON.parse(rawData);

    for (let i = 1; i < journeyData.length; i++) {
      const prevTime = new Date(journeyData[i - 1].arrivalTime).getTime();
      const currTime = new Date(journeyData[i].arrivalTime).getTime();
      expect(currTime).toBeGreaterThanOrEqual(prevTime);
    }
  });

  it("should have non-empty fun facts for each location", () => {
    const rawData = fs.readFileSync(journeyDataPath, "utf-8");
    journeyData = JSON.parse(rawData);

    journeyData.forEach((stop) => {
      expect(stop.funFact.length).toBeGreaterThan(0);
      // Fun facts should contain some text, not just emojis
      expect(stop.funFact.replace(/[\u{1F300}-\u{1F9FF}]/gu, "").trim().length).toBeGreaterThan(
        10,
      );
    });
  });

  it("should have reasonable delivery counts", () => {
    const rawData = fs.readFileSync(journeyDataPath, "utf-8");
    journeyData = JSON.parse(rawData);

    journeyData.forEach((stop) => {
      expect(stop.deliveries).toBeGreaterThanOrEqual(0);
      expect(stop.deliveries).toBeLessThanOrEqual(10000000000); // 10 billion max
    });
  });

  it("should have delivery counts that increase over the journey", () => {
    const rawData = fs.readFileSync(journeyDataPath, "utf-8");
    journeyData = JSON.parse(rawData);

    for (let i = 1; i < journeyData.length; i++) {
      expect(journeyData[i].deliveries).toBeGreaterThanOrEqual(
        journeyData[i - 1].deliveries,
      );
    }
  });
});

describe("Santa Tracker - HTML Files", () => {
  it("should have santa-tracker.html file", () => {
    const htmlPath = path.join(__dirname, "../docs/santa-tracker.html");
    expect(fs.existsSync(htmlPath)).toBe(true);
  });

  it("should reference Leaflet.js library", () => {
    const htmlPath = path.join(__dirname, "../docs/santa-tracker.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf-8");
    expect(htmlContent).toContain("leaflet");
  });

  it("should include santa-tracker.js script", () => {
    const htmlPath = path.join(__dirname, "../docs/santa-tracker.html");
    const htmlContent = fs.readFileSync(htmlPath, "utf-8");
    expect(htmlContent).toContain("santa-tracker.js");
  });

  it("should have santa-tracker.css file", () => {
    const cssPath = path.join(__dirname, "../docs/santa-tracker.css");
    expect(fs.existsSync(cssPath)).toBe(true);
  });

  it("should have santa-tracker.js file", () => {
    const jsPath = path.join(__dirname, "../docs/santa-tracker.js");
    expect(fs.existsSync(jsPath)).toBe(true);
  });

  it("should have a link to Santa Tracker in the main index.html", () => {
    const indexPath = path.join(__dirname, "../docs/index.html");
    const indexContent = fs.readFileSync(indexPath, "utf-8");
    expect(indexContent).toContain("santa-tracker.html");
  });
});
