export const dynamic = "force-dynamic";

import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Chat from "@/components/views/Chat/Chat";

const Jelajah = () => {
  return (
    <LandingPageLayout marginTop="mt-[0px]" showFooter={false}>
      <Chat />
    </LandingPageLayout>
  );
};

export default Jelajah;
