function calculateWeightedScore(agent) {
  const weights = {
    performanceScore: 0.4,
    seniorityMonths: 0.2,
    targetAchievedPercent: 0.3,
    activeClients: 0.1,
  };

  return (
    agent.performanceScore * weights.performanceScore +
    agent.seniorityMonths * weights.seniorityMonths +
    agent.targetAchievedPercent * weights.targetAchievedPercent +
    agent.activeClients * weights.activeClients
  );
}

function generateJustification(score) {
  if (score >= 85) return "Consistently high performance and long-term contribution";
  if (score >= 60) return "Moderate performance with potential for growth";
  return "Needs improvement but has growth potential";
}

function allocateDiscounts(data, minPerAgent = 0, maxPerAgent = Infinity) {
  const { siteKitty, salesAgents } = data;
  const scores = salesAgents.map(agent => ({
    ...agent,
    score: calculateWeightedScore(agent),
  }));

  const totalScore = scores.reduce((sum, a) => sum + a.score, 0);

  const allocations = scores.map(agent => {
    const rawAllocation = (agent.score / totalScore) * siteKitty;
    const assignedDiscount = Math.min(Math.max(rawAllocation, minPerAgent), maxPerAgent);
    return {
      id: agent.id,
      assignedDiscount: parseFloat(assignedDiscount.toFixed(2)),
      justification: generateJustification(agent.performanceScore),
    };
  });

  return { allocations };
}

module.exports = { allocateDiscounts };