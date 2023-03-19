import { PolybaseUser } from "restapi/types";

export const getPolybaseUserName = (polybaseUser: PolybaseUser | null) => {
  return polybaseUser?.name || "Unknown name";
};
