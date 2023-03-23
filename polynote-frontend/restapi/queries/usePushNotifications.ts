import { NOTIFICATIONS } from "restapi";
import * as PushAPI from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { useQuery } from "react-query";
import { PushNotificationsResponseData } from "restapi/types";

export const usePushNotifications = ({
  page = 1,
  address,
}: {
  page?: number;
  address?: string;
}) => {
  const { data: notifications, ...rest } = useQuery({
    queryKey: NOTIFICATIONS,
    queryFn: () =>
      PushAPI.user
        .getFeeds({
          user: `eip155:5:${address}`,
          env: ENV.STAGING,
          page,
          limit: 100,
        })
        .then((res: PushNotificationsResponseData[]) => {
          return res;
        }),
    cacheTime: 0,
    refetchOnWindowFocus: false,
    enabled: address != null,
  });

  return { notifications: notifications ?? [], ...rest };
};
