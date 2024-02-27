import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import Search from "@/components/Search";
import { useState } from "react";

type BrandsFilterProps = {
  brands: string[];
};
const BrandsFilter = ({ brands }: BrandsFilterProps) => {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [search, setSearch] = useState("");
  const brandsToShow = showAllBrands && !search ? brands : brands.slice(0, 7);
  const filtredBrands = brandsToShow.filter((brand) =>
    search ? brand.toLowerCase().includes(search.toLowerCase()) : brandsToShow,
  );
  return (
    <div className="flex flex-col gap-2 justify-start  h-fit p-5 rounded-lg shadow-lg">
      <h3 className="mb-1 font-semibold text-gray-900 dark:text-white text-center">
        Бренд
      </h3>
      <Search
        label="Поиск по названию"
        icon
        value={search}
        action={(value) => setSearch(value)}
        placeholder="Найти бренд"
      />
      <ul
        className={`${!search && !showAllBrands && "-mb-7"} w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
        style={{
          maskImage:
            !search && !showAllBrands
              ? "linear-gradient(to bottom, black 55%, rgba(0, 0, 0, 0.01) 90%)"
              : undefined,
        }}
      >
        {filtredBrands.map((brand) => (
          <Checkbox key={brand} brand={brand} />
        ))}
        {filtredBrands.length === 0 && (
          <li className="p-2 text-center text-gray-500">Бренд не найден</li>
        )}
      </ul>
      {!search && (
        <Button
          onClick={() => setShowAllBrands(!showAllBrands)}
          addStyle="z-10"
        >
          {showAllBrands ? "Скрыть" : "Показать больше"}
        </Button>
      )}
    </div>
  );
};
export default BrandsFilter;
