import Checkbox from "@/components/Checkbox";
import { getAllBrands } from "@/utils/api";

const Brands = async () => {
  const brands = await getAllBrands();
  return (
    <ul
      className={` w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
    >
      {brands?.map((brand) => <Checkbox key={brand} brand={brand} />)}
      {brands?.length === 0 && (
        <li className="p-2 text-center text-gray-500">Бренд не найден</li>
      )}
    </ul>
  );
};
export default Brands;
