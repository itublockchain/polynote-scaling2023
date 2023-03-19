import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { TokenAtom, UserAtom } from "recoil/user/UserStore";
import { PolybaseUser } from "restapi/types";

export const usePolybaseUser = (): PolybaseUser | null => {
  return useRecoilValue(UserAtom);
};

export const useSetPolybaseUser = (): SetterOrUpdater<PolybaseUser | null> => {
  return useSetRecoilState(UserAtom);
};

export const useToken = (): string | null => {
  return useRecoilValue(TokenAtom);
};

export const useSetToken = (): SetterOrUpdater<string | null> => {
  return useSetRecoilState(TokenAtom);
};
