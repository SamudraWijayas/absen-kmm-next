import React from "react";
import Image from "next/image";
import { Camera, MapPin } from "lucide-react";

// 🟢 Definisikan tipe data untuk item kegiatan
interface Kegiatan {
  id: number;
  nama: string;
  tanggal: string;
  img: string;
  lokasi: string;
}

interface DataJelajah {
  daerah: Kegiatan[];
  desa: Kegiatan[];
  kelompok: Kegiatan[];
}

const dataJelajah: DataJelajah = {
  daerah: [
    {
      id: 1,
      nama: "Festival Santri Nusantara",
      tanggal: "10 Oktober 2025",
      img: "/bg.png",
      lokasi: "Kabupaten Cirebon",
    },
    {
      id: 2,
      nama: "Lomba Baca Kitab Kuning",
      tanggal: "7 Oktober 2025",
      img: "/foto2.jpg",
      lokasi: "Kota Bandung",
    },
  ],
  desa: [
    {
      id: 1,
      nama: "Pengajian Malam Jumat",
      tanggal: "12 Oktober 2025",
      img: "/foto3.jpg",
      lokasi: "Desa Mekarjaya",
    },
    {
      id: 2,
      nama: "Bersih Desa",
      tanggal: "6 Oktober 2025",
      img: "/foto4.jpg",
      lokasi: "Desa Wanasari",
    },
  ],
  kelompok: [
    {
      id: 1,
      nama: "Kajian Subuh Kelompok 3",
      tanggal: "3 Oktober 2025",
      img: "/foto5.jpg",
      lokasi: "Posko RT 05",
    },
    {
      id: 2,
      nama: "Pelatihan Literasi Digital",
      tanggal: "2 Oktober 2025",
      img: "/foto6.jpg",
      lokasi: "Balai RW 02",
    },
  ],
};

const Jelajah = () => {
  // 🟣 Ubah `any[]` jadi `Kegiatan[]`
  const renderSection = (title: string, data: Kegiatan[]) => (
    <section className="mb-8 ">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 px-1">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="relative w-full h-32 sm:h-40">
              <Image
                src={item.img}
                alt={item.nama}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                <Camera size={10} />
                <span>Dokumentasi</span>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium text-gray-800 dark:text-white leading-tight line-clamp-2">
                {item.nama}
              </h3>
              <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-100 mt-1">
                <MapPin size={12} />
                <span>{item.lokasi}</span>
              </div>
              <p className="text-[11px] text-gray-400 dark:text-gray-200 mt-1">{item.tanggal}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-black/10 p-4">
      <h1 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">
        Jelajah Dokumentasi Kegiatan
      </h1>

      {renderSection("Kegiatan Daerah", dataJelajah.daerah)}
      {renderSection("Kegiatan Desa", dataJelajah.desa)}
      {renderSection("Kegiatan Kelompok", dataJelajah.kelompok)}
    </div>
  );
};

export default Jelajah;
