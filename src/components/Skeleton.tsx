type SkeletonProp = {
  line: number;
};
const Skeleton = ({ line }: SkeletonProp) => {
  const lines = new Array(line).fill(0).map((_, idx) => idx + 1);
  return (
    <div
      role="status"
      className="w-[900px] max-w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 "
    >
      {lines.map((line) => (
        <div
          className={`flex items-center justify-between ${(lines[0] || lines.length) && "p-4"} gap-5`}
          key={line}
        >
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};
export default Skeleton;
