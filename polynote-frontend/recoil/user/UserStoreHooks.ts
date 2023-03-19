import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { UserAtom } from "recoil/user/UserStore";
import { PolybaseUser } from "restapi/types";

export const usePolybaseUser = (): PolybaseUser | null => {
  return useRecoilValue(UserAtom);
};

export const useSetPolybaseUser = (): SetterOrUpdater<PolybaseUser | null> => {
  return useSetRecoilState(UserAtom);
};
