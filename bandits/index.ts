export interface ArmName {
	__type: "arm",
	name: string
}

export const ArmName = {
	from: (name: string): ArmName => ({
		__type: "arm",
		name
	})
}

export interface Bandit {
  initialize: (arms: ArmName[]) => void;
	selectArm: () => ArmName;
	update: (arm: ArmName, reward: number) => void;
}

export * from './epsilon-greedy';
export * from './softmax';