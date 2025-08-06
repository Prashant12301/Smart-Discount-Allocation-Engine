const { allocateDiscounts } = require("./allocator");

const input = {
  siteKitty: 10000,
  salesAgents: [
    {
      id: "A1",
      performanceScore: 90,
      seniorityMonths: 18,
      targetAchievedPercent: 75,
      activeClients: 12,
    },
    {
      id: "A2",
      performanceScore: 70,
      seniorityMonths: 6,
      targetAchievedPercent: 60,
      activeClients: 8,
    },
  ],
};

const result = allocateDiscounts(input);
console.log(JSON.stringify(result, null, 2));