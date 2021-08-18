import { ArmName, Bandit } from "../bandits";
import { Arm } from "../arms";

export type NamedArm = ArmName & {
  arm: Arm
}

interface TestResult {
  simNums: number[];
  times: number[];
  chosenArms: ArmName[];
  rewards: number[];
  cumulativeRewards: number[];
}

export function testAlgorithm(algorithm: Bandit, arms: NamedArm[], numSims: number, horizon: number): TestResult {
  const numDraws = numSims * horizon;
  let chosenArms: ArmName[] = new Array(numDraws).fill(0);
  let rewards = new Array(numDraws).fill(0);
  let cumulativeRewards = new Array(numDraws).fill(0);
  let simNums = new Array(numDraws).fill(0);
  let times = new Array(numDraws).fill(0);

  for (let sim = 0; sim < numSims; sim++) {
    algorithm.initialize(arms);
    
    for (let t = 0; t < horizon; t++) {
      let index = sim * horizon + t;
      simNums[index] = sim;
      times[index] = t;
      chosenArms[index] = algorithm.selectArm();

      const reward = arms.find(arm => arm.name === chosenArms[index].name)!.arm.draw();
      rewards[index] = reward;

      if (t === 0) {
        cumulativeRewards[index] = reward;
      } else {
        cumulativeRewards[index] = cumulativeRewards[index - 1] + reward;
      }

      algorithm.update(chosenArms[index], reward);
    }
  }

  return {
    simNums,
    times,
    chosenArms,
    rewards,
    cumulativeRewards
  }
}
