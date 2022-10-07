export default function BadgeSelect({
  options,
  selected,
  selectAction,
}: {
  options: string[];
  selected: string;
  selectAction: (option: string) => void;
}) {
  return (
    <div className="relative inline-flex items-center space-x-3">
      {options.map((option) => (
        <button
          key={option}
          className={`${
            option === selected
              ? "bg-gray-200 dark:bg-gray-700"
              : "bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-900 "
          } px-2 sm:px-3 py-1 rounded-md text-sm font-medium capitalize active:scale-90 transition-all duration-75`}
          onClick={() => selectAction(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
