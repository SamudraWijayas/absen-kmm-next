import React from "react";
import { Users, MapPin, ChevronRight } from "lucide-react";

const dataKelompok = [
  {
    id: 1,
    nama: "Kelompok 1 - Desa Mekarjaya",
    lokasi: "Desa Mekarjaya",
    anggota: 12,
  },
  {
    id: 2,
    nama: "Kelompok 2 - Desa Suka Maju",
    lokasi: "Desa Suka Maju",
    anggota: 9,
  },
  {
    id: 3,
    nama: "Kelompok 3 - Desa Harmoni",
    lokasi: "Desa Harmoni",
    anggota: 15,
  },
];

const ListKelompok = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-black/10 px-4 pt-[70px]">
      <div className="space-y-3">
        {dataKelompok.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center gap-4">
              {/* Avatar bulat dengan ikon */}
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="text-blue-600" size={22} />
              </div>

              {/* Info kelompok */}
              <div>
                <h2 className="font-semibold text-gray-800 dark:text-white text-sm">
                  {item.nama}
                </h2>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <MapPin size={12} />
                  <span>{item.lokasi}</span> •{" "}
                  <span>{item.anggota} anggota</span>
                </div>
              </div>
            </div>

            {/* Aksi */}
            <button className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition">
              <ChevronRight className="text-blue-600" size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListKelompok;
