interface SelectProps {
  options: string[] | number[];
}

export default function Select(
  props: SelectProps & React.ComponentProps<"select">
) {
  const { options } = props;
  return (
    <select {...props}>
      {options.map((option, index) => (
        <option key={`option-${index}`} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
