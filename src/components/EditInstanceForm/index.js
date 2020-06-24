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

const ItemText = styled.p(({ isChecked }) => `
   color: ${ !isChecked ? '#1c4369 !important' : 'grey'};
   opacity ${!isChecked ? 1 : .31};
   display: inline;
   text-align: center !important;
   width: 50%;
   vertical-align: middle;
   font-size: 1.5rem;
   text-decoration: ${isChecked ? 'line-through' : 'none'}
`);

const InputCheckBox = styled.input`
  zoom: 2.5;
  vertical-align: middle;
  margin-right: 5px;
`
const Label = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
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
      <Label htmlFor={id}>
      
          <InputCheckBox type="checkbox" name="example" disabled/>
          
        
        <Input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          
        />
      </Label>
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
