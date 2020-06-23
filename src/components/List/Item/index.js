import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';

import {
  UPDATE_ITEM_FOR_LIST_ACTION_ID,
  DELETE_ITEM_FOR_LIST_ACTION_ID,
} from '../../../config';

import EditInstanceForm from '../../EditInstanceForm';
import DeleteInstanceMenu from '../../DeleteInstanceMenu';





// add styling here
//border: ${selected ? '1px solid aquamarine' : '1px solid white'};
//cursor: ${selected ? 'auto' : 'pointer'};
const ItemStyleWrapper = styled.div(({
  selected,
  isDeleting,
}) => `
  margin: 0 1em;
  padding: 1rem 1.5em;
  
  border-radius: 10px;
  
  background-color: ${selected && '#82878c52'};
  
  
  text-align: center;
 
  display: flex;
  justify-content: space-between;

`);

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

function Item({
  item,
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
}) {
  const [itemValue, updateItemValue] = useState(item.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [isDeleteMode, updateIsDeleteMode] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);
  const [isChecked, setIsChecked] = useState(false)


 



  if (!selected) {
    return (
      <ItemStyleWrapper>
        <div>
          <InputCheckBox type="checkbox" name="example" onChange={handleCheckbox} />
          <label><ItemText isChecked={isChecked}  onClick={handleEditMode}  onClick={() => onSelect(item.id)}>{itemValue}</ItemText> </label>
        </div>

      </ItemStyleWrapper>
    );
  }

  function handleItemValueChange(e) {
    updateItemValue(e.target.value);
  }

  function handleEditMode(){
    console.log(`isEditMode`, isEditMode)
    updateIsEditMode(!isEditMode)
  }

  async function handleItemValueSave() {
    updateIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_ITEM_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          value: itemValue,
          instanceId: item.id,
        }),
      },
      refetchQueries,
    });

    updateIsEditMode(false);
    updateIsSaving(false);
  }

  function handleCancelEdit() {
    updateIsEditMode(false);
  }

  if (isEditMode) {
    return (
      <ItemStyleWrapper>
        <EditInstanceForm
          id={item.id}
          label="Item Value:"
          value={itemValue}
          onChange={handleItemValueChange}
          onSave={handleItemValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
      </ItemStyleWrapper>
    );
  }

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_ITEM_FOR_LIST_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: item.id,
          }),
        },
        refetchQueries
      });
    } catch (e) {
      updateIsDeleting(false);
    }
  }

  function handleCancelDelete() {
    updateIsDeleteMode(false);
  }

  function handleCheckbox() {
    setIsChecked(!isChecked)
  }

  if (isDeleteMode) {
    return (
      <ItemStyleWrapper
        selected={selected}
        isDeleting={isDeleting}
      >
        <div>
          <InputCheckBox type="checkbox" name="example" style={{ zoom: 2 }} onChange={handleCheckbox} isChecked={isChecked} />
          <label><ItemText isChecked={isChecked}>{itemValue}</ItemText> </label>
        </div>
        <DeleteInstanceMenu
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
          disabled={isDeleting}
        />
      </ItemStyleWrapper>
    );
  }

  return (
    <ItemStyleWrapper selected={selected}>
      <div>
        <InputCheckBox type="checkbox" name="example" onChange={handleCheckbox} />
        <label><ItemText isChecked={isChecked}>{itemValue}</ItemText> </label>
      </div>
      <div>
        <Button
          type="button"
          onClick={() => updateIsEditMode(true)}
        >
          <span style={{ fontSize: '40px' }}>&#9998;</span>
      </Button>
        <Button
          type="button"
          onClick={() => updateIsDeleteMode(true)}
        >
          <span style={{ fontSize: '40px' }}>&#128465;</span>
        </Button>
      </div>



    </ItemStyleWrapper>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'updateInstance' }),
  graphql(EXECUTE, { name: 'deleteInstance' })
)(Item);
