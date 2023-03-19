import { useQuery } from "react-query";
import { apiGetPolybaseUser, POLYBASE_USER_QUERY } from "restapi";

export const usePolybaseUserQuery = () => {
  const { data, ...rest } = useQuery({
    queryKey: POLYBASE_USER_QUERY,
    queryFn: () =>
      apiGetPolybaseUser().then((res) => {
        const user = res.data;

        if (user == null) {
          return null;
        }

        return user;
      }),
  });

  return { user: data, ...rest };
};
