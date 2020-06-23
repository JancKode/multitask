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
const ItemStyleWrapper = styled.div(({
  selected,
  isDeleting,
}) => `
  margin: 2em 1em;
  padding: 1.5em;
  border: ${selected ? '1px solid aquamarine' : '1px solid white'};
  border-radius: 10px;
  
  background-color: ${isDeleting && 'tomato'};
  cursor: ${selected ? 'auto' : 'pointer'};
  text-align: center;
  &:hover {
    border: 1px solid aquamarine;
  }
  display: flex;
  justify-content: space-between;

`);

const ItemText = styled.p`
   color: #1c4369 !important;
   display: inline;
   text-align: center !important;
   width: 50%;
   vertical-align: middle;
   
`

const InputCheckBox = styled.input`
  zoom: 2;
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




  if (!selected) {
    return (
      <ItemStyleWrapper onClick={() => onSelect(item.id)}>
        <div>
          <InputCheckBox type="checkbox" name="example"/>
          <label><ItemText>{itemValue}</ItemText> </label>
        </div>

      </ItemStyleWrapper>
    );
  }

  function handleItemValueChange(e) {
    updateItemValue(e.target.value);
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

  if (isDeleteMode) {
    return (
      <ItemStyleWrapper
        selected={selected}
        isDeleting={isDeleting}
      >
        <div>
          <InputCheckBox type="checkbox" name="example" style={{zoom: 2 }}/>
          <label><ItemText>{itemValue}</ItemText> </label>
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
          <InputCheckBox type="checkbox" name="example" />
          <label><ItemText>{itemValue}</ItemText> </label>
        </div>
      <div>
        <Button
          type="button"
          onClick={() => updateIsEditMode(true)}
        >
          &#9998;
      </Button>
        <Button
          type="button"
          onClick={() => updateIsDeleteMode(true)}
        >
          &#128465;
      </Button>
      </div>



    </ItemStyleWrapper>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'updateInstance' }),
  graphql(EXECUTE, { name: 'deleteInstance' })
)(Item);
