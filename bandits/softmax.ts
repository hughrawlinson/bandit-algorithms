import { ArmName, Bandit } from ".";

function categoricalDraw(probs: number[]): ArmName {
	const z = Math.random();
	let cum_prob = 0;
	for (let i = 0; i < probs.length; i++) {
		cum_prob += probs[i];
		if (z < cum_prob) {
			return ArmName.from(""+i);
		}
	}
	throw new Error("Sum of probabilities of arms is less than 1.0. This is a bug.");
}

export class Softmax implements Bandit {
	private temperature: number;
	private counts: number[];
	private values: number[];

	constructor(temperature: number) {
		this.temperature = temperature;
		this.counts = [];
		this.values = [];
	}

	initialize(arms: ArmName[]): void {
		this.counts = arms.map(() => 0);
		this.values = arms.map(() => 0);
	}

	selectArm(): ArmName {
		const z = this.values.reduce((a, b) => a + Math.exp(b / this.temperature), 0);
		const probs = this.values.map(v => Math.exp(v / this.temperature) / z);
    return categoricalDraw(probs);
	}

	update(arm: ArmName, reward: number): void {
    const n = this.counts[Number(arm.name)];
		this.counts[Number(arm.name)] = n + 1;

		const value = this.values[Number(arm.name)];
		if (n === 0) {
			this.values[Number(arm.name)] = reward;
		} else {
			this.values[Number(arm.name)] = ((n-1) / n) * value + (1 / n) * reward;
		}
	}
}