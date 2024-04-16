interface InputProps {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  placeholder: string;
  type: string;
  value: string;
  setValue: (text: string) => void;
  className?: string;
}

export default function Input(props: InputProps) {
  const {
    icon,
    iconPosition = "left",
    placeholder,
    type,
    value,
    className,
    setValue,
  } = props;

  return (
    <div
      className={`flex gap-3 items-center px-4 py-3 rounded-sm border border-stroke bg-white dark:bg-boxdark ${
        className && className
      }`}
    >
      {icon && iconPosition === "left" && icon}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={({ target: { value: inputValue } }) => setValue(inputValue)}
        className="w-full text-sm font-medium text-black dark:text-white bg-transparent outline-none"
      />
      {icon && iconPosition === "right" && icon}
    </div>
  );
}
