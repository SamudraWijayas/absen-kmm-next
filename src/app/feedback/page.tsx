import React from "react";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import { MessageSquare, Heart } from "lucide-react";

const Feedback = () => {
  const cards = [
    {
      title: "Berikan Masukan",
      description:
        "Bantu kami meningkatkan website KMM agar lebih aman dan nyaman digunakan.",
      link: "https://forms.gle/5MyDR4D6DiBKwFFU7",
      icon: <MessageSquare size={28} className="text-white" />,
      bgColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Support KMM",
      description: "Dukung kami agar terus bisa mengembangkan layanan KMM.",
      link: "https://saweria.co/generus",
      icon: <Heart size={28} className="text-white" />,
      bgColor: "bg-green-600 hover:bg-green-700",
    },
  ];

  return (
    <LandingPageLayout
      showNavBack={true}
      span="Feedback & Support"
      showFooter={false}
      showBottomNav={false}
      marginTop="mt-[0px]"
    >
      <div className="px-4 pt-16 min-h-screen bg-white dark:bg-black/10 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Feedback & Support
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, idx) => (
            <a
              key={idx}
              href={card.link}
              rel="noopener noreferrer"
              className={`flex flex-col gap-3 p-6 rounded-xl shadow-lg transition transform hover:-translate-y-1 ${card.bgColor}`}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
                {card.icon}
              </div>
              <h2 className="text-lg font-semibold text-white">{card.title}</h2>
              <p className="text-white/90 text-sm">{card.description}</p>
            </a>
          ))}
        </div>
      </div>
    </LandingPageLayout>
  );
};

export default Feedback;