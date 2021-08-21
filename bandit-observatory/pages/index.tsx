import Head from "next/head";
import { Line } from "@nivo/line";
import { ArmName } from "../../bandits";
import styles from "../styles/Chart.module.css";
import * as epsilonGreedyBanditTestResultData from "../../results/epsilon-greedy.json";
import * as softmaxBanditTestResultData from "../../results/softmax.json";

interface TrialResult {
  chosenArm: ArmName;
  reward: number;
  cumulativeReward: number;
}

function prepareData(data: typeof epsilonGreedyBanditTestResultData) {
  let simNumbers = data.simNums.filter(
    (simNum, index) => index === data.simNums.indexOf(simNum)
  );

  // assumption: all sims have the same horizon
  let horizon = data.simNums.length / simNumbers.length;

  let sims = new Array(simNumbers.length);

  for (let i = 0; i < simNumbers.length; i++) {
    let sim = {
      id: simNumbers[i],
      trials: new Array(horizon) as TrialResult[],
    };
    for (let j = 0; j < horizon; j++) {
      sim.trials[j] = {
        chosenArm: data.chosenArms[i * horizon + j] as ArmName,
        reward: data.rewards[i * horizon + j],
        cumulativeReward: data.cumulativeRewards[i * horizon + j],
      };
    }
    sims[i] = sim;
  }
  return sims;
}

function useBandit(
  model: "epsilon-greedy" | "softmax",
  metric: "reward" | "cumulativeReward"
) {
  const selectedModel =
    model === "softmax"
      ? softmaxBanditTestResultData
      : epsilonGreedyBanditTestResultData;
  const preparedData = prepareData(selectedModel);
  return preparedData.map((sim) => ({
    id: `Sim ${sim.id}`,
    data: sim.trials.map((trial, index) => ({
      x: index,
      y: trial[metric],
    })),
  }));
}

export default function Home() {
  const TITLE = "Bandit Observer";
  const data = useBandit("softmax", "cumulativeReward");

  return (
    <div className={styles.container}>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>{TITLE}</h1>
      </header>
      <article className={styles.graphType}>
        <h2>Cumulative Reward</h2>
        <Line
          data={data}
          height={500}
          width={(500 * 16) / 9}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          animate={true}
          enableSlices="x"
          axisBottom={{
            tickValues: new Array(Math.ceil(data[0].data.length / 25))
              .fill(0)
              .map((_, index) => index * 25),
          }}
        ></Line>
      </article>
    </div>
  );
}