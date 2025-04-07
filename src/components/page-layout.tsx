import Header from "./header";
import Footer from "./footer";
import { useState } from "react";
type Props = {
  _site?: any;
  children?: React.ReactNode;
};
// const chatConfig: ChatConfig = {
//   apiKey: import.meta.env.YEXT_PUBLIC_CHAT_APIKEY,
//   botId: import.meta.env.YEXT_PUBLIC_CHAT_BOTID,
// };
const PageLayout = ({ _site, children }: Props) => {
  return (
    <div className="min-h-screen">
      <Header _site={_site} />
      <div className="py-4">{children}</div>
      <Footer _site={_site}></Footer>
    </div>
  );
};

export default PageLayout;
