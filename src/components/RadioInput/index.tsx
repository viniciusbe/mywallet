import React, { useEffect, useRef, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';
import { Label } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options: {
    id: string;
    value: string;
    label: string;
  }[];
}

const RadioInput: React.FC<Props> = ({ name, options, ...rest }: Props) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const { fieldName, registerField, defaultValue = '' } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs: HTMLInputElement[]) => {
        return refs.find(ref => ref.checked)?.value || '';
      },
      setValue: (refs: HTMLInputElement[], id: string) => {
        const inputRef = refs.find(ref => ref.id === id);
        if (inputRef) inputRef.checked = true;
      },
      clearValue: (refs: HTMLInputElement[]) => {
        const inputRef = refs.find(ref => ref.checked === true);
        if (inputRef) inputRef.checked = false;
      },
    });
  }, [defaultValue, fieldName, registerField]);

  return (
    <>
      {options.map((option, index) => (
        <Label htmlFor={option.id} key={option.id}>
          <input
            ref={ref => ref && (inputRefs.current[index] = ref)}
            id={option.id}
            type="radio"
            name={name}
            defaultChecked={defaultValue.includes(option.id)}
            value={option.value}
            {...rest}
          />
          {option.label}
        </Label>
      ))}
    </>
  );
};

export default RadioInput;
