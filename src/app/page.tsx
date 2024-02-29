import Skeleton from "@/components/Skeleton";
import Tabel from "@/ui/Tabel";
import Filter from "@/ui/filters";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    product?: string;
    page?: string;
    brand?: string[];
    price?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const brand = searchParams?.brand || [];
  const product = searchParams?.product || "";
  const price = searchParams?.price || "";

  return (
    <>
      <header className="flex justify-center">
        <Link href={"/"}>
          <Image src="/tmp.png" alt="tmp" width={100} height={100} />
        </Link>
      </header>
      <main className="w-full flex justify-center gap-7 mx-auto">
        <Filter />
        <Suspense
          key={`${currentPage + product + price + brand}`}
          fallback={<Skeleton line={9} />}
        >
          <Tabel
            currentPage={currentPage}
            brands={brand}
            product={product}
            price={price}
          />
        </Suspense>
      </main>
    </>
  );
}
