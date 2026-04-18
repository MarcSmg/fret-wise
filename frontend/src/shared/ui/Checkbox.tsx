type CheckboxProps = {
    value: string;
}

export const Checkbox = ({value}: CheckboxProps) => {
  return (
    <input
        type="checkbox"
        value={value}
        
    >
    </input>
  )
}
