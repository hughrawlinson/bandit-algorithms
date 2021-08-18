import { Bandit, ArmName } from ".";

class EpsilonGreedy implements Bandit {
	epsilon: number;
	counts: { [arm: string]: number };
	values: { [arm: string]: number };

	constructor(epsilon: number) {
		this.epsilon = epsilon;
		this.counts = {};
		this.values = {};
	}

	initialize(arms: ArmName[]) {
		for (let arm of arms) {
			this.counts[arm.name] = 0;
			this.values[arm.name] = 0;
		}
	}

	private selectRandomArm(): ArmName {
		let armNames = Object.keys(this.counts);
		return ArmName.from(armNames[Math.floor(Math.random() * armNames.length)]);
	}

	private bestArmSoFar(): ArmName {
		let armNames = Object.keys(this.counts);
		let bestArm = ArmName.from(armNames[0]);
		for (let armName of armNames) {
			if (this.values[armName] > this.values[bestArm.name]) {
				bestArm = ArmName.from(armName);
			}
		}
		return bestArm;
	}

	selectArm(): ArmName {
		if (Math.random() < this.epsilon) {
			return this.selectRandomArm();
		}
		return this.bestArmSoFar();
	}

	update(arm: ArmName, reward: number) {
		this.counts[arm.name] += 1;
		const n = this.counts[arm.name];
		// this.values[arm.name] += (reward - this.values[arm.name]) / this.counts[arm.name];
		this.values[arm.name] = ((n - 1) / n) * this.values[arm.name] + (1 / n) * reward;
	}
}

export { EpsilonGreedy }