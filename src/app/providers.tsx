"use client";

import { SocketProvider } from "@/contexts/SocketProvider";
import ToasterProvider from "@/contexts/ToasterContext";
import { onErrorHander } from "@/libs/axios/responseHanler";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError(error) {
        onErrorHander(error);
        return false;
      },
    },
    mutations: {
      onError: onErrorHander,
    },
  },
});

/* ✅ Component yang boleh pakai useSession */
function InnerProviders({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const userId = session?.user?.id ? Number(session.user.id) : null;

  return (
    <HeroUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ToasterProvider>
          <SocketProvider userId={userId}>{children}</SocketProvider>
        </ToasterProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

/* ✅ Wrapper utama */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <InnerProviders>{children}</InnerProviders>
      </QueryClientProvider>
    </SessionProvider>
  );
}

// "use client";

// import { SocketProvider } from "@/contexts/SocketProvider";
// import ToasterProvider from "@/contexts/ToasterContext";
// import { onErrorHander } from "@/libs/axios/responseHanler";
// import { HeroUIProvider } from "@heroui/react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { SessionProvider, useSession } from "next-auth/react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: false,
//       throwOnError(error) {
//         onErrorHander(error);
//         return false;
//       },
//     },
//     mutations: {
//       onError: onErrorHander,
//     },
//   },
// });
// export function Providers({ children }: { children: React.ReactNode }) {
//   const { data: session } = useSession();

//   const userId = session?.user?.id ? Number(session.user.id) : null;
//   return (
//     <SessionProvider>
//       <QueryClientProvider client={queryClient}>
//         <HeroUIProvider>
//           <NextThemesProvider
//             attribute="class"
//             defaultTheme="system"
//             enableSystem
//             disableTransitionOnChange
//           >
//             <ToasterProvider>
//               <SocketProvider userId={userId}>{children}</SocketProvider>
//             </ToasterProvider>
//           </NextThemesProvider>
//         </HeroUIProvider>
//       </QueryClientProvider>
//     </SessionProvider>
//   );
// }
