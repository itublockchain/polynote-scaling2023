import { CONFIG } from "config";
import { NextSeo } from "next-seo";

type Props = {
  title?: string;
  description?: string;
};

export const Header = ({ title, description }: Props) => {
  let _title = CONFIG.APP;
  if (title != null) {
    _title += ` - ${title}`;
  }

  return (
    <NextSeo
      additionalLinkTags={[
        {
          rel: "icon",
          href: "/favicon.ico",
        },
      ]}
      title={_title}
      description={description ?? CONFIG.APP_DESCRIPTION}
    />
  );
};
