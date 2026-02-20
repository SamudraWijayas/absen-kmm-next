import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#f8faf9] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:60px_60px] opacity-40 pointer-events-none" />

      {/* Navbar */}
      <header className="relative z-10 flex items-center justify-between px-10 py-6">
        <Image
          src="/images/logo/generusbdl.png"
          alt="logo"
          width={100}
          height={100}
          className="w-26 h-auto"
        />

        {/* <nav className="hidden md:flex gap-8 text-sm text-gray-700">
          <a href="#">Solutions</a>
          <a href="#">Customers</a>
          <a href="#">Pricing</a>
        </nav> */}

        <div className="flex gap-4">
          <Link
            href="auth/login"
            className="text-sm px-4 py-2 rounded-lg border border-gray-300"
          >
            Log in
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center text-center mt-20 px-6">
        {/* <div className="mb-6 text-xs font-medium px-4 py-2 bg-green-100 text-green-900 rounded-full">
          ⚡ CREATE FOR FAST
        </div> */}

        <h1 className="text-4xl md:text-6xl font-bold text-blue-700 leading-tight max-w-4xl">
          Kemuda Mudian Bandar Lampung
        </h1>

        <p className="mt-6 max-w-2xl text-gray-600 text-lg">
          KMM Bandar Lampung adalah pengurus muda-mudi daerah yang meramut
          muda-mudi se-daerah Bandar Lampung untuk mensukseskan program
          pembinaan generasi penerus.
        </p>

        {/* <div className="mt-8 flex gap-4 flex-col sm:flex-row">
          <button className="px-6 py-3 rounded-xl bg-green-900 text-white font-medium hover:bg-green-800 shadow-md">
            Start for Free
          </button>
          <button className="px-6 py-3 rounded-xl bg-white border border-gray-300 font-medium hover:bg-gray-50">
            Get a Demo
          </button>
        </div> */}

        {/* Partner Logos */}
        <div className="mt-20 text-sm text-gray-500">
          More than 100+ Generus in Bandar Lampung
        </div>

        {/* <div className="mt-6 flex flex-wrap justify-center items-center gap-10 opacity-70">
          <span className="font-semibold">HubSpot</span>
          <span className="font-semibold">Dropbox</span>
          <span className="font-semibold">Square</span>
          <span className="font-semibold">Intercom</span>
          <span className="font-semibold">Grammarly</span>
        </div> */}
      </main>
    </div>
  );
};

export default LandingPage;
