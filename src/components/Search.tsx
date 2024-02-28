"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { HTMLInputTypeAttribute } from "react";
import { useDebouncedCallback } from "use-debounce";

type SearchProps = {
  placeholder?: string;
  label: string;
  icon?: boolean;
  type?: HTMLInputTypeAttribute;
  keyOfSearch: "brand" | "product" | "price" | "searchBrend";
  debounce?: number;
};
const Search = ({
  icon,
  placeholder,
  type,
  label,
  keyOfSearch,
  debounce
}: SearchProps) => {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlSearch = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParam);
    if (keyOfSearch === ("product" || "price")) {
      params.set("page", "1");
    }
    if (search) {
      params.set(keyOfSearch, search);
    } else {
      params.delete(keyOfSearch);
    }
    replace(`${pathname}?${params.toString()}`);
  }, debounce);

  return (
    <div className="">
      <label htmlFor="input-group-search" className="">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          {icon && (
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          )}
        </div>
        <input
          type={type}
          id="input-group-search"
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-sky-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${icon && "ps-10"} p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          placeholder={placeholder}
          onChange={(e) => handlSearch(e.target.value)}
          defaultValue={searchParam.get(keyOfSearch)?.toString()}
        />
      </div>
    </div>
  );
};
export default Search;
