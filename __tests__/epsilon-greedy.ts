import { Arm, BernoulliArm } from "../arms";
import { EpsilonGreedy } from "../bandits";
import { writeFileSync } from "fs";
import { NamedArm, shuffle, testAlgorithm } from "../testing";

describe("EpsilonGreedy", () => {
  it("should return a valid probability distribution", () => {
    const means = [0.1, 0.1, 0.1, 0.1, 0.9];
    // const arms: NamedArm[] = shuffle(means).map((mean, index) => ({
    const arms: NamedArm[] = means.map((mean, index) => ({
      __type: "arm" as const,
      name: "" + index,
      arm: new BernoulliArm(mean),
    }));

    const epsilonGreedy = new EpsilonGreedy(0.1);

    const testResult = testAlgorithm(epsilonGreedy, arms, 3, 250);

    writeFileSync(
      "results/epsilon-greedy.json",
      JSON.stringify(testResult, null, 2)
    );
  });
});
