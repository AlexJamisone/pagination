import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { HTMLInputTypeAttribute } from "react";
import { useDebouncedCallback } from "use-debounce";

type SearchProps = {
  value?: string | number;
  placeholder?: string;
  action?: (value: string) => void;
  label: string;
  icon?: boolean;
  type?: HTMLInputTypeAttribute;
};
const Search = ({
  value,
  action,
  icon,
  placeholder,
  type,
  label,
}: SearchProps) => {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handlSearch = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParam);
    params.set("page", "1");
    if (search) {
      params.set("product", search);
    } else {
      params.delete("product");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 1500);

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
          onChange={(e) => {
            if (!action) {
              handlSearch(e.target.value);
              return;
            }
            action(e.target.value);
          }}
          value={!action ? undefined : value}
          defaultValue={
            !action ? searchParam.get("product")?.toString() : undefined
          }
        />
      </div>
    </div>
  );
};
export default Search;
