type Props = {
  label: string,
  name: string,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  value: string,
  options: string[],
  defaultOption: string,
};

function Select({
  label,
  name,
  onChange,
  value,
  defaultOption,
  options,
}: Props) {
  return (
    <label htmlFor={ name } className="label">
      { label }
      <div className="select">
        <select
          name={ name }
          id={ name }
          required
          onChange={ onChange }
          value={ value }
        >
          <option>{ defaultOption }</option>
          {
            options.map((option, index) => (
              <option key={ index } value={ option }>{ option }</option>
            ))
          }
        </select>
      </div>
    </label>
  );
}

export default Select;
