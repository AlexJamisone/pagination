import Tabel from "@/ui/Tabel";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <>
      <header className="flex justify-center">
        <Link href={"/"}>
          <Image src="/tmp.png" alt="tmp" width={100} height={100} />
        </Link>
      </header>
      <main className="w-full flex justify-center gap-7 mx-auto">
        <div className="flex flex-col">
          <Suspense>
            <Tabel currentPage={currentPage} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
