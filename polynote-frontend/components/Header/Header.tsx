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
        { rel: "preconnet", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap",
        },
      ]}
      title={_title}
      description={description ?? CONFIG.APP_DESCRIPTION}
    />
  );
};
