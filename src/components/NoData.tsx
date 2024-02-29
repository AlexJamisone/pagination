type NoDataProps = {
  label: string;
};
const NoData = ({ label }: NoDataProps) => {
  return (
    <div className="flex items-center justify-center w-full h-[200px] rounded-lg border border-dashed border-gray-200 dark:border-gray-800 max-w-[900px]">
      <div className="ml-4 text-2xl font-bold text-gray-500 dark:text-gray-400">
        {label}
      </div>
    </div>
  );
};
export default NoData;
