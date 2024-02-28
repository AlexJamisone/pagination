"use client";
import Search from "@/components/Search";

const BrandsFilter = () => {
  return (
    <>
      <h3 className="mb-1 font-semibold text-gray-900 dark:text-white text-center">
        Бренд
      </h3>
      <Search
        label=""
        icon
        placeholder="Найти бренд"
        keyOfSearch="searchBrend"
        debounce={200}
      />
    </>
  );
};
export default BrandsFilter;
