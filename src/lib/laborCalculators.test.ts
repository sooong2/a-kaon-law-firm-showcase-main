import { describe, expect, it } from "vitest";
import { calculateAnnualLeave, calculateSeverance } from "./laborCalculators";

describe("calculateSeverance", () => {
  it("calculates severance for 1 year service", () => {
    const result = calculateSeverance({
      hireDate: "2024-01-01",
      resignDate: "2024-12-31",
      monthlyAverageWage: 3_000_000,
      bonusIncluded: true,
    });
    expect(result.valid).toBe(true);
    expect(result.totalServiceDays).toBe(366); // 2024 leap year
    expect(result.estimatedSeverance).toBeCloseTo(3_000_000 * (366 / 365), 0);
  });

  it("rejects invalid date order", () => {
    const result = calculateSeverance({
      hireDate: "2024-06-01",
      resignDate: "2024-01-01",
      monthlyAverageWage: 3_000_000,
      bonusIncluded: false,
    });
    expect(result.valid).toBe(false);
  });
});

describe("calculateAnnualLeave", () => {
  it("returns monthly accrual under 1 year", () => {
    const result = calculateAnnualLeave({
      hireDate: "2025-01-15",
      referenceDate: new Date("2025-06-20"),
    });
    expect(result.valid).toBe(true);
    expect(result.isUnderOneYear).toBe(true);
    expect(result.firstYearAccrued).toBe(5);
  });

  it("returns 15 days after 1 year", () => {
    const result = calculateAnnualLeave({
      hireDate: "2020-03-01",
      referenceDate: new Date("2026-03-01"),
    });
    expect(result.valid).toBe(true);
    expect(result.annualEntitlement).toBeGreaterThanOrEqual(15);
  });
});
