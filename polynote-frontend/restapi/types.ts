export type PolybaseUser = {
  address: string;
  name: string;
  id: string;
};

export type CreatePolybaseUserDto = {
  address: string;
  signature: string;
};
