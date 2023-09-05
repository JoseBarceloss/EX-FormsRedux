type Props = {
  type: string,
  label: string,
  value: string,
  name: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  required?: boolean,
};

function Input({ type, name, label, onChange, value, required = false }: Props) {
  return (
    <label className="label" htmlFor={ name }>
      { label }
      <div className="control">
        <input
          className="input"
          type={ type }
          name={ name }
          value={ value }
          onChange={ onChange }
          id={ name }
          required={ required }
        />
      </div>
    </label>
  );
}

export default Input;
