// Définition de AccountKind avec exportation constante
export const AccountKind = {
  Student: "E",
  // Family1: "1",
  // Family2: "2",
  // Staff: "A",
  // Teacher: "P"
} as const;


export type AccountKind = typeof AccountKind[keyof typeof AccountKind];


export type Module = {
  code: string;
  enable: boolean;
  order: number;
  badge: number;
  params: Record<string, any>;  
};
