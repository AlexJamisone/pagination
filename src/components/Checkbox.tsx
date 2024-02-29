"use client";
type CheckboxProps = {
  brand: string;
  handlCheck: (value: string) => void;
  checked: string[];
};
const Checkbox = ({ brand, handlCheck, checked }: CheckboxProps) => {
  return (
    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
      <div className="flex items-center ps-3 cursor-pointer">
        <input
          id={brand}
          name={brand}
          type="checkbox"
          onChange={() => handlCheck(brand)}
          defaultChecked={checked.includes(brand)}
          className="w-4 h-4 text-blue-600 bg-gray-100 cursor-pointer border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
        />
        <label
          className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
          htmlFor={brand}
        >
          {brand}
        </label>
      </div>
    </li>
  );
};
export default Checkbox;
