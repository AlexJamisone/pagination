"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

type CheckboxProps = {
  brand: string;
};
const Checkbox = ({ brand }: CheckboxProps) => {
  const searchParam = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handlCheck = useDebouncedCallback((isChecked: boolean) => {
    const params = new URLSearchParams(searchParam);
    if (isChecked) {
      params.append("brend", brand);
    } else {
      params.delete("brend", brand);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);
  return (
    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
      <div className="flex items-center ps-3">
        <input
          id={brand}
          type="checkbox"
          onChange={(e) => handlCheck(e.target.checked)}
          defaultChecked={searchParam.getAll("brend").includes(brand)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />
        <label
          className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          htmlFor={brand}
        >
          {brand}
        </label>
      </div>
    </li>
  );
};
export default Checkbox;
