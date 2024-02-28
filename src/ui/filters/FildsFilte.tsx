"use client";
import Search from "@/components/Search";

const FildsFilte = () => {
  return (
    <div className="gap-3 flex flex-col p-3 shadow-md rounded">
      <Search
        keyOfSearch="product"
        label="Поиск по названию"
        placeholder="Название продукта"
        debounce={500}
      />
      <Search
        keyOfSearch="price"
        label="Поиск по цене"
        placeholder="Цена"
        debounce={500}
      />
    </div>
  );
};
export default FildsFilte;
