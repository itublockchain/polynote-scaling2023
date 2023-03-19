import { atom } from "recoil";
import { PolybaseUser } from "restapi/types";

export const UserAtom = atom<PolybaseUser | null>({
  default: null,
  key: "PolbaseUser.Atom",
});
