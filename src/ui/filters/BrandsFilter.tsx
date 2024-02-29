"use client";
import { getAllBrands } from "@/utils/api";
import { useEffect, useState } from "react";
import Brands from "./Brands";
import Search from "@/components/Search";

const BrandsFilter = () => {
  const [brands, setBrands] = useState<string[]>([]);
  const [isLoading, setIsLoadind] = useState(true);
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function getBrends() {
      try {
        setIsLoadind(true);
        const response = await getAllBrands();
        setBrands(response ?? []);
        setIsLoadind(false);
      } catch (err) {
        console.log(err);
        setIsLoadind(false);
      }
    }
    getBrends();
  }, []);
  const handlSearchBrand = (value: string) => {
    setSearch(value);
  };
  const filteredBrands = search
    ? brands.filter((item) => item.toLowerCase().includes(search.toLowerCase()))
    : brands;

  return (
    <div className="flex flex-col gap-3 p-3 rounded shadow-md">
      <h3 className="mb-1 font-semibold text-gray-900 dark:text-white text-center">
        Бренд
      </h3>
      <Search
        label=""
        placeholder="Найти бренд"
        value={search}
        onChange={(value) => handlSearchBrand(value)}
      />
      <Brands isLoading={isLoading} brands={filteredBrands} search={search} />
    </div>
  );
};
export default BrandsFilter;
