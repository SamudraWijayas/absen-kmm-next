import { DateValue } from "@nextui-org/react";

interface IKegiatanForm {
  id?: string;
  name: string;
  startDate: DateValue;
  endDate: DateValue;
  tingkat: string;
  kelompokId?: string | null;
  kelompok?: {
    id?: string;
    name?: string;
  };
  desaId?: string | null;
  desa?: {
    id?: string;
    name?: string;
  };
  daerahId?: string | null;
  daerah?: {
    id?: string;
    name?: string;
  };
}

interface IKegiatan {
  id?: string;
  name?: string;
  startDate?: string | DateValue;
  endDate?: string | DateValue;
  tingkat?: string;
  kelompokId?: string | null;
  kelompok?: {
    id?: string;
    name?: string;
  };
  desaId?: string | null;
  desa?: {
    id?: string;
    name?: string;
  };
  daerahId?: string | null;
  daerah?: {
    id?: string;
    name?: string;
  };
}

export type { IKegiatanForm, IKegiatan, Peserta, IDataKegiatan };
