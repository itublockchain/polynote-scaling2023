export type PolybaseUser = {
  address: string;
  name: string;
  id: string;
};

export type CreatePolybaseUserDto = {
  address: string;
  signature: string;
};

export type AuthUserDto = {
  address: string;
  signature: string;
};

export type UpdatePolybaseUserNameDto = {
  name: string;
};

export type CreateNoteDto = {
  address: string;
  emoji: string;
  title: string;
  content: string;
};
