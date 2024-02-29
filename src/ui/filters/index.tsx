import BrandsFilter from "./BrandsFilter";
import FildsFilte from "./FildsFilte";

const Filter = ({}) => {
  return (
    <aside className="flex flex-col gap-5">
      <FildsFilte />
      <BrandsFilter />
    </aside>
  );
};
export default Filter;
