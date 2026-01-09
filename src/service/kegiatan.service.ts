import instance from "@/libs/axios/instance";
import endpoint from "@/service/endpoint.constant";
import { ApiResponse } from "@/types/api";

const kegiatanServices = {
  getKegiatanDaerah: (tanggal?: string) =>
    instance.get(`${endpoint.KEGIATAN}/daerah`, {
      params: { tanggal },
    }),

  getKegiatanDesa: (tanggal?: string) =>
    instance.get(`${endpoint.KEGIATAN}/desa`, {
      params: { tanggal },
    }),

  scanBarcode: (kegiatanId: string) =>
    instance.post<ApiResponse>(`${endpoint.ABSEN}/scan`, { kegiatanId }),
};

export default kegiatanServices;
