"use client";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Spinner from "@/components/Spinner";
import { diff } from "@/helpers/diff";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

const Brands = ({
  brands,
  isLoading,
  search,
}: {
  brands: string[];
  isLoading: boolean;
  search: string;
}) => {
  const [show, setShow] = useState(false);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const br = searchParams.getAll("brand") ?? [];
  const paramsBrands = typeof br === "string" ? [br] : br;
  const [checked, setChecked] = useState<string[]>(paramsBrands);
  const showingBrands = show ? brands : brands?.slice(0, 7);
  const handlCheck = useCallback((value: string) => {
    setChecked((prevChecked) =>
      prevChecked.includes(value)
        ? prevChecked.filter((item) => item !== value)
        : [...prevChecked, value],
    );
  }, []);

  const applayChecks = (brands: string[]) => {
    //think about it
    const params = new URLSearchParams(searchParams);
    for (const brand of brands) {
      params.delete("brand");
    }
    if (brands.length !== 0) {
      for (const brand of brands) {
        params.append("brand", brand);
      }
    }
    if (brands.length === 0) {
      params.delete("brand");
    }
    return replace(`${pathname}?${params.toString()}`);
  };

  const shouldRenderApplyButton = useMemo(
    () => !diff(paramsBrands, checked),
    [paramsBrands, checked],
  );
  if (isLoading) return <Spinner />;
  return (
    <div className="flex flex-col gap-3">
      {shouldRenderApplyButton && (
        <Button onClick={() => applayChecks(checked)}>Применить</Button>
      )}
      <ul
        className={`${!show && !search ? "-mb-7" : ""} w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
        style={{
          maskImage:
            show || search
              ? undefined
              : "linear-gradient(to bottom, black 55%, rgba(0, 0, 0, 0.01) 90%)",
        }}
      >
        {!isLoading &&
          showingBrands?.map((brand) => (
            <Checkbox
              key={brand}
              brand={brand}
              handlCheck={handlCheck}
              checked={checked}
            />
          ))}
        {!isLoading && showingBrands?.length === 0 && (
          <li className="p-2 text-center text-gray-500">Бренд не найден</li>
        )}
      </ul>
      {!search && (
        <Button onClick={() => setShow(!show)} addStyle="w-full">
          {show ? "Скрыть" : "Показать больше"}
        </Button>
      )}
    </div>
  );
};
export default Brands;
