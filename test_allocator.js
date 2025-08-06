const assert = require("assert");
const { allocateDiscounts } = require("./allocator");

describe("Discount Allocator", () => {
  it("should equally split for equal scores", () => {
    const input = {
      siteKitty: 1000,
      salesAgents: [
        {
          id: "X",
          performanceScore: 50,
          seniorityMonths: 10,
          targetAchievedPercent: 50,
          activeClients: 5,
        },
        {
          id: "Y",
          performanceScore: 50,
          seniorityMonths: 10,
          targetAchievedPercent: 50,
          activeClients: 5,
        },
      ],
    };
    const result = allocateDiscounts(input);
    assert.strictEqual(result.allocations[0].assignedDiscount, 500);
    assert.strictEqual(result.allocations[1].assignedDiscount, 500);
  });

  it("should reward high performer more", () => {
    const input = {
      siteKitty: 1000,
      salesAgents: [
        {
          id: "A",
          performanceScore: 90,
          seniorityMonths: 12,
          targetAchievedPercent: 90,
          activeClients: 10,
        },
        {
          id: "B",
          performanceScore: 50,
          seniorityMonths: 5,
          targetAchievedPercent: 50,
          activeClients: 3,
        },
      ],
    };
    const result = allocateDiscounts(input);
    assert(result.allocations[0].assignedDiscount > result.allocations[1].assignedDiscount);
  });

  it("should respect min and max limits", () => {
    const input = {
      siteKitty: 500,
      salesAgents: [
        {
          id: "A",
          performanceScore: 100,
          seniorityMonths: 100,
          targetAchievedPercent: 100,
          activeClients: 100,
        },
      ],
    };
    const result = allocateDiscounts(input, 100, 300);
    assert(result.allocations[0].assignedDiscount <= 300);
    assert(result.allocations[0].assignedDiscount >= 100);
  });
});