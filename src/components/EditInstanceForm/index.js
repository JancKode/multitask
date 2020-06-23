import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  color: #bbbbbb;
  transition: color 0.5s ease;
  &:hover {
    color: ${props => props.hoverColor || '#000000'};
  }
`;

const Input = styled.input`
  border: none;
  padding: 0.5rem;
  margin: 0.5rem;
  font-size: 1.5rem;
  color: #1c4369 !important;
  &:focus {
   outline: none;
  }
`

function EditInstanceForm({
  id,
  label,
  value,
  onChange,
  onSave,
  onCancel,
  disabled,
}) {
  return (
    <>
      <label htmlFor={id}>
        <Input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          
        />
      </label>
      <Button
        type="button"
        hoverColor="#00FF00"
        onClick={onSave}
        disabled={disabled}
      >
        &#10003;
      </Button>
      <Button
        type="button"
        hoverColor="#FF0000"
        onClick={onCancel}
        disabled={disabled}
      >
        &#10005;
      </Button>
    </>
  );
}

export default EditInstanceForm;
