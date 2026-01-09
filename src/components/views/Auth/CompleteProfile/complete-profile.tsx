"use client";

import { Controller } from "react-hook-form";
import useCompleteProfile from "./useCompleteProfile";

export default function CompleteProfile() {
  const {
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,

    controlUpdateInfo,
    errorsUpdateInfo,
    handleSubmitUpdateInfo,
  } = useCompleteProfile();

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmitUpdateInfo(handleUpdateProfile)}
        className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md"
      >
        <h2 className="text-xl font-bold">Lengkapi Profil Anda</h2>

        {/* Gender */}
        <div>
          <label className="mb-1 block">Jenis Kelamin</label>
          <Controller
            name="gender"
            control={controlUpdateInfo}
            render={({ field }) => (
              <select {...field} className="w-full rounded border p-2">
                <option value="">Pilih</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            )}
          />
          {errorsUpdateInfo.gender && (
            <p className="text-sm text-red-500">
              {errorsUpdateInfo.gender.message}
            </p>
          )}
        </div>

        {/* WhatsApp */}
        <div>
          <label className="mb-1 block">Nomor WhatsApp</label>
          <Controller
            name="nohp"
            control={controlUpdateInfo}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="08xxxxxxxxxx"
                className="w-full rounded border p-2"
              />
            )}
          />
          {errorsUpdateInfo.nohp && (
            <p className="text-sm text-red-500">
              {errorsUpdateInfo.nohp.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPendingMutateUpdateProfile}
          className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPendingMutateUpdateProfile ? "Menyimpan..." : "Simpan"}
        </button>

        {isSuccessMutateUpdateProfile && (
          <p className="mt-2 text-sm text-green-600">
            Profil berhasil diperbarui!
          </p>
        )}
      </form>
    </section>
  );
}
