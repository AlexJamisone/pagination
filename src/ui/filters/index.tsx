import Button from "@/components/Button";
import BrandsFilter from "./BrandsFilter";
import { usePathname, useSearchParams } from "next/navigation";
import FildsFilte from "./FildsFilte";

type FilterProps = { brands: string[] };
const Filter = ({ brands }: FilterProps) => {
  const pathname = usePathname();
  const searchParam = useSearchParams();
  const brend = searchParam.getAll("brend");
  const query = searchParam.get("query")?.toString() || "";
  const handlFilter = () => {
    console.log(brend);
    console.log(searchParam.toString());
  };
  return (
    <div className="flex flex-col gap-7">
      <FildsFilte />
      <BrandsFilter brands={brands} />
      {!query && (
        <Button onClick={() => handlFilter()} addStyle="w-full text-md ">
          Применить
        </Button>
      )}
    </div>
  );
};
export default Filter;
