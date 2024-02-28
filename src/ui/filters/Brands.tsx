import Checkbox from "@/components/Checkbox";
import { getAllBrands } from "@/utils/api";

type BrandsProps = {
  searchBrend: string;
};
const Brands = async ({ searchBrend }: BrandsProps) => {
  const brands = await getAllBrands();
  const filtredBrands = brands?.filter((brand) =>
    searchBrend
      ? brand.toLowerCase().includes(searchBrend.toLowerCase())
      : brands,
  );
  return (
    <ul
      className={` w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
    >
      {filtredBrands?.map((brand) => <Checkbox key={brand} brand={brand} />)}
      {filtredBrands?.length === 0 && (
        <li className="p-2 text-center text-gray-500">Бренд не найден</li>
      )}
    </ul>
  );
};
export default Brands;
