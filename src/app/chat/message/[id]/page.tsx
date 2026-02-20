import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import MessageView from "@/components/views/Chat/Message/Message";
import { cookies } from "next/headers";

const MessagePage = async () => {
  const cookieStore = await cookies();
  const theme = cookieStore.get("chatTheme")?.value || "default";

  return (
    <LandingPageLayout
      marginTop="mt-[0px]"
      showFooter={false}
      showBottomNav={false}
    >
      <MessageView initialTheme={theme} />
    </LandingPageLayout>
  );
};

export default MessagePage;
