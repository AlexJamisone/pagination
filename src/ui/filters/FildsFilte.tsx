import Search from "@/components/Search";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useDebouncedCallback } from "use-debounce";

const FildsFilte = () => {
  const pathname = usePathname();
  const searcPrams = useSearchParams();
  const { replace } = useRouter();
  const handlSearchByPrice = useDebouncedCallback((price: string) => {
    const params = new URLSearchParams(searcPrams);
    params.set("page", "1");
    if (price) {
      params.set("price", price);
    } else {
      params.delete("price");
    }
    return replace(`${pathname}?${params.toString()}`);
  }, 500);
  return (
    <div className="gap-3 flex flex-col p-3 shadow-md rounded">
      <Search label="Поиск по названию" placeholder="Название продукта" />
      <Search
        label="Поиск по цене"
        placeholder="Цена"
        value={searcPrams.get("price")?.toString()}
        action={(price) => handlSearchByPrice(price)}
      />
    </div>
  );
};
export default FildsFilte;
