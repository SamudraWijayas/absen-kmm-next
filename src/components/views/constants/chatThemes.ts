export type ChatTheme = {
  name: string;
  bubbleMe: string;
  bubbleOther: string;
  background: string;
  color: string;
  colorInput: string;
};

export const chatThemes: Record<string, ChatTheme> = {
  default: {
    name: "Default",
    bubbleMe: "bg-blue-600 text-white",
    bubbleOther: "bg-gray-200 dark:bg-gray-800 text-black dark:text-white",
    background: "bg-white dark:bg-black/10",
    color: "bg-blue-600 text-white",
    colorInput: "bg-blue-100",
  },
  wa: {
    name: "Tema WA",
    bubbleMe: "bg-blue-600 text-white",
    bubbleOther: "bg-white dark:bg-gray-800 text-black dark:text-white",
    background: "bg-[url('/images/bg-chat/bg1.jpeg')]",
    color: "bg-blue-600 text-white",
    colorInput: "bg-blue-100",
  },
  kaktus: {
    name: "Tema Kaktus",
    bubbleMe: "bg-green-700 text-white",
    bubbleOther: "bg-white dark:bg-gray-800 text-black dark:text-white",
    background: "bg-[url('/images/bg-chat/bg2.jpeg')] bg-cover bg-center",
    color: "bg-green-700 text-white",
    colorInput: "bg-green-100",
  },
  lemon: {
    name: "Tema Lemon",
    bubbleMe: "bg-yellow-500 text-black",
    bubbleOther: "bg-white dark:bg-gray-800 text-black dark:text-white",
    background:
      "bg-[url('/images/bg-chat/bg4.jpeg')] bg-center bg-no-repeat bg-auto",
    color: "bg-yellow-500 text-black",
    colorInput: "bg-yellow-100",
  },

  kaktus2: {
    name: "Tema Kaktus 2",
    bubbleMe: "bg-green-600 text-white",
    bubbleOther: "bg-white text-black",
    background: "bg-[url('/images/bg-chat/bg3.jpeg')] bg-cover bg-center",
    color: "bg-green-600 text-white",
    colorInput: "bg-green-100",
  },
  kucing: {
    name: "Tema Kucing",
    bubbleMe: "bg-blue-900 text-white",
    bubbleOther: "bg-white text-black",
    background: "bg-[url('/images/bg-chat/bg5.jpeg')] bg-cover bg-center",
    color: "bg-blue-900 text-white",
    colorInput: "bg-blue-100",
  },
  hokage: {
    name: "Tema Hokage",
    bubbleMe: "bg-blue-900 text-white",
    bubbleOther: "bg-white text-black",
    background: "bg-[url('/images/bg-chat/bg6.jpeg')] bg-cover bg-center",
    color: "bg-blue-900 text-white",
    colorInput: "bg-blue-100",
  },
  naruto: {
    name: "Tema Naruto",
    bubbleMe: "bg-orange-700 text-white",
    bubbleOther: "bg-white text-black",
    background: "bg-[url('/images/bg-chat/bg9.jpeg')] bg-cover bg-center",
    color: "bg-orange-700 text-white",
    colorInput: "bg-orange-100",
  },
  totoro: {
    name: "Tema Totoro",
    bubbleMe: "bg-red-800 text-white",
    bubbleOther: "bg-white text-black",
    background: "bg-[url('/images/bg-chat/bg10.jpeg')] bg-cover bg-center",
    color: "bg-red-800 text-white",
    colorInput: "bg-red-100",
  },
  rilakuma: {
    name: "Tema Rilakuma",
    bubbleMe: "bg-yellow-400 text-black",
    bubbleOther: "bg-white text-black",
    background: "bg-[url('/images/bg-chat/bg11.jpeg')] bg-cover bg-center",
    color: "bg-yellow-400 text-black",
    colorInput: "bg-yellow-100",
  },
};
