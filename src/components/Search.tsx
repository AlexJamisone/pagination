"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { HTMLInputTypeAttribute } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useMaskito } from "@maskito/react";
import maskitoOption from "@/utils/maskitoOption";

type SearchProps = {
  placeholder?: string;
  label: string;
  icon?: boolean;
  type?: HTMLInputTypeAttribute;
  keyOfSearch?: "brand" | "product" | "price";
  onChange?: (value: string) => void;
  value?: string;
  debounce?: number;
};
const Search = ({
  icon,
  placeholder,
  type,
  label,
  keyOfSearch,
  onChange,
  debounce,
  value,
}: SearchProps) => {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const maskInputRef = useMaskito({ options: maskitoOption });

  const handlSearch = useDebouncedCallback((search: string) => {
    if (keyOfSearch) {
      const params = new URLSearchParams(searchParam);
      if (keyOfSearch === ("product" || "price")) {
        params.set("page", "1");
      }
      if (keyOfSearch === "price") {
        search = parseInt(search.replace(/[^\d.]/g, "")).toString();
        if (isNaN(+search)) {
          search = "";
        }
      }
      if (search) {
        params.set(keyOfSearch, search);
      } else {
        params.delete(keyOfSearch);
      }
      replace(`${pathname}?${params.toString()}`);
    }
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
              className="w-4 h-4 text-gray-500"
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
          ref={keyOfSearch === "price" ? maskInputRef : undefined}
          type={type}
          id="input-group-search"
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-sky-500 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${icon && "ps-10"} p-2.5`}
          placeholder={placeholder}
          onInput={(e) => handlSearch(e.currentTarget.value)}
          onChange={(e) => {
            if (keyOfSearch) {
              handlSearch(e.target.value);
            }
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          value={value ?? undefined}
          defaultValue={
            keyOfSearch ? searchParam.get(keyOfSearch)?.toString() : undefined
          }
        />
      </div>
    </div>
  );
};
export default Search;
