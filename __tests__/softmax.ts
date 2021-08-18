import { BernoulliArm } from "../arms";
import { Softmax } from "../bandits";
import { writeFileSync } from "fs";
import { shuffle, testAlgorithm, NamedArm } from "../testing";

describe("SoftMax", () => {
  it("should return a valid probability distribution", () => {
    const means = [0.1, 0.1, 0.1, 0.1, 0.9];
    const arms: NamedArm[] = shuffle(means).map((mean, index) => ({
      __type: "arm" as const,
      name: "" + index,
      arm: new BernoulliArm(mean)
    }));

    const softmax = new Softmax(0.1);
    
    const testResult = testAlgorithm(softmax, arms, 100, 10);

    writeFileSync("softmax.json", JSON.stringify(testResult, null, 2));
  });
});