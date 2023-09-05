type Props = {
  label: string,
  name: string,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  value: string,
  maxLength: string,
  required?: boolean,
};

function TextArea({ name, label, onChange, value, maxLength, required = false }: Props) {
  return (
    <label htmlFor={ name } className="label">
      { label }
      <div className="control">
        <textarea
          className="textarea"
          name={ name }
          value={ value }
          onChange={ onChange }
          maxLength={ Number(maxLength) }
          id={ name }
          required={ required }
        />
      </div>
    </label>
  );
}

export default TextArea;
