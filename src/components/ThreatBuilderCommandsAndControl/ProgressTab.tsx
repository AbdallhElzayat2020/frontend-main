export default function ProgressTab({
  disabled,
  sidebarOpen,
  setSidebarOpen,
}: any) {
  if (!sidebarOpen) return null;
  return (
    <div>
      <div
        className={`flex w-full flex-1 flex-col gap-2 ${
          disabled ? "opacity-50" : ""
        }`}
      >
        <label htmlFor="name" className="font-medium text-[#4A5568]">
          Attack script
        </label>
        <input
          id="name"
          type="text"
          disabled={disabled}
          value={sidebarOpen?.Script?.args || ""}
          className={`
              rounded-md border border-[#E3E8EF] px-[20px]
              py-[16px] text-[#4A5568] outline-none dark:bg-boxdark dark:text-white
            `}
          onChange={(e) => {
            setSidebarOpen({
              ...sidebarOpen,
              Script: {
                ...sidebarOpen.Script,
                args: e.target.value,
              },
            });
          }}
        />
      </div>
    </div>
  );
}
