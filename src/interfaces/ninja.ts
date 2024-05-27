export interface INinja {
  id: string;
  name: string;
  tier: string;
  classes: string;
  star: number;
  level: number;
  grade: string;
  attack: {
    value: number;
    deltaRate: number;
    deltaPoint: number;
    unit: string;
  };
  defense: {
    value: number;
    deltaRate: number;
    deltaPoint: number;
    unit: string;
  };
  healthPoint: {
    value: number;
    deltaRate: number;
    deltaPoint: number;
    unit: string;
  };
  chakra: {
    value: number;
    deltaRate: number;
    deltaPoint: number;
    unit: string;
  };
  critDamage: {
    value: number;
    deltaRate: number;
    deltaPoint: number;
    unit: string;
  };
  critRate: {
    value: number;
    deltaRate: number;
    deltaPoint: number;
    unit: string;
  };
  critResist: {
    value: number;
    deltaRate: number;
    deltaPoint: number;
    unit: string;
  };
  accuracy: {
    value: number;
    deltaRate: number;
    deltaPoint: number;
    unit: string;
  };
  dodge: {
    value: number;
    deltaRate: number;
    deltaPoint: number;
    unit: string;
  };
  pierce: {
    value: number;
    deltaRate: number;
    deltaPoint: number;
    unit: string;
  };
  toughness: {
    value: number;
    deltaRate: number;
    deltaPoint: number;
    unit: string;
  };
  damageAmplification: {
    value: number;
    deltaRate: number;
    deltaPoint: number;
    unit: string;
  };
  damageReduction: {
    value: number;
    deltaRate: number;
    deltaPoint: number;
    unit: string;
  };
  speed: {
    value: number;
    deltaRate: number;
    deltaPoint: number;
    unit: string;
  };
  position: {
    x: number;
    y: number;
  };
  isDead: false;
  effects: [];
  isStunned: false;
  team: string;
  logicPosition: {
    x: number;
    y: number;
  };
}
