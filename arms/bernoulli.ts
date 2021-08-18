import { Arm } from ".";

export class BernoulliArm implements Arm {
  private p: number;

  constructor(p: number) {
      this.p = p;
  }

  public draw(): number {
      return Math.random() < this.p ? 1 : 0;
  }
}