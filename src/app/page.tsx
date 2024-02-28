import Skeleton from "@/components/Skeleton";
import Spinner from "@/components/Spinner";
import Tabel from "@/ui/Tabel";
import Brands from "@/ui/filters/Brands";
import BrandsFilter from "@/ui/filters/BrandsFilter";
import FildsFilte from "@/ui/filters/FildsFilte";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    product?: string;
    page?: string;
    brend?: string[];
    price?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const brend = searchParams?.brend || [];
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
        <div className="flex gap-7 mx-5">
          <div className="flex flex-col">
            <FildsFilte />
            <div className="flex flex-col gap-2 justify-start h-fit p-5 rounded-lg shadow-lg">
              <BrandsFilter />
              <Suspense fallback={<Spinner />}>
                <Brands />
              </Suspense>
            </div>
          </div>
          <Suspense
            key={`${currentPage + product + price + brend}`}
            fallback={<Skeleton line={50} />}
          >
            <Tabel
              currentPage={currentPage}
              brands={brend}
              product={product}
              price={price}
            />
          </Suspense>
        </div>
      </main>
    </>
  );
}
