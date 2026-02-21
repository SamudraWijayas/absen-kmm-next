"use client";

import { ChangeEvent, useState } from "react";
import useDebounce from "./useDebounce";

const useFIlter = () => {
  const debounce = useDebounce();

  const LIMIT_DEFAULT = 10;
  const PAGE_DEFAULT = 1;
  const DELAY = 500;

  // ================= STATE LOKAL =================
  const [limit, setLimit] = useState<number>(LIMIT_DEFAULT);
  const [page, setPage] = useState<number>(PAGE_DEFAULT);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isOnline, setIsOnline] = useState<string>("");
  const [isFeatured, setIsFeatured] = useState<string>("");

  // ================= HANDLERS =================
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(PAGE_DEFAULT); // reset page kalau limit berubah
  };

  const handleChangeCategory = (value: string) => {
    setCategory(value);
    setPage(PAGE_DEFAULT);
  };

  const handleChangeIsOnline = (value: string) => {
    setIsOnline(value);
    setPage(PAGE_DEFAULT);
  };

  const handleChangeIsFeatured = (value: string) => {
    setIsFeatured(value);
    setPage(PAGE_DEFAULT);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value); // update langsung input
    debounce(() => {
      setPage(PAGE_DEFAULT); // reset page
    }, DELAY);
  };

  const handleClearSearch = () => {
    setSearch("");
    setPage(PAGE_DEFAULT);
  };

  return {
    limit,
    page,
    search,
    category,
    isOnline,
    isFeatured,

    handleChangePage,
    handleChangeLimit,
    handleSearch,
    handleClearSearch,
    handleChangeCategory,
    handleChangeIsOnline,
    handleChangeIsFeatured,
  };
};

export default useFIlter;
