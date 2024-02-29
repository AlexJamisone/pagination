import Pagination from "./Pagination";
import { getProducts } from "@/utils/api";
type TabelProps = {
  currentPage: number;
  brands: string[];
  product: string;
  price: string;
};
const Tabel = async ({ currentPage, product, price, brands }: TabelProps) => {
  const items = await getProducts({
    currentPage,
    product,
    price,
    brands,
  });
  if (items.error) throw new Error(`${items.error}`);
  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Название
            </th>
            <th scope="col" className="px-6 py-3">
              Бренд
            </th>
            <th scope="col" className="px-6 py-3">
              Цена
            </th>
          </tr>
        </thead>
        <tbody>
          {items?.products?.map((item, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={item.id + index}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
              >
                {item.id}
              </th>
              <td className="px-6 py-4 text-gray-900">{item.product}</td>
              <td className="px-6 py-4 text-center">{item.brand || "-"}</td>
              <td className="px-6 py-4">{item.price} ₽</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination total={items?.totalPage ?? 0} />
    </div>
  );
};
export default Tabel;
