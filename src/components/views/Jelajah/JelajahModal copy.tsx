"use client";

import Image from "next/image";
import { IKegiatan } from "@/types/Kegiatan";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: IKegiatan | null;
}

const JelajahModal = ({ isOpen, onClose, data }: Props) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 w-[95%] max-w-4xl rounded-2xl shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
          {data.name}
        </h2>

        <p className="text-sm text-gray-400 mb-6">
          {new Date(data.startDate).toLocaleDateString("id-ID")}
        </p>

        {data.dokumentasi?.length ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            className="rounded-xl"
          >
            {data.dokumentasi.map((doc, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE}${doc.url}`}
                    alt={`Dokumentasi ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center text-gray-400">Tidak ada dokumentasi</div>
        )}

        <button
          onClick={onClose}
          className="mt-8 bg-primary text-white px-5 py-2 rounded-lg"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default JelajahModal;
