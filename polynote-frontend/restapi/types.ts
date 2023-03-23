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

export type PushNotificationDto = {
  address: string;
};

export type UpdateNoteDto = {
  emoji: string;
  title: string;
  content: string;
};

export type PushNotificationsResponseData = {
  cta: string;
  title: string;
  message: string;
  icon: string;
  url: string;
  sid: string;
  app: string;
  image: string;
  blockchain: string;
  notification: {
    body: string;
    title: string;
  };
  secret: string;
};
