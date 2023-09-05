type Props = {
  label: string,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  type: 'button' | 'submit',
  moreClasses: string,
};

function Button({ label, onClick = () => {}, type = 'button', moreClasses = '' }: Props) {
  return (
    <button
      className={ `button ${moreClasses}` }
      type={ type }
      onClick={ onClick }
    >
      { label }
    </button>
  );
}

export default Button;
