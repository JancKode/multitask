import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { withNoStack, EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { Button, Form } from 'semantic-ui-react'


import { CREATE_ITEM_FOR_LIST_ACTION_ID
 } from '../../../config';

 import './styles.scss'

// change styling here
// const Form = styled.div`
//   margin: 2em;
//   padding: 1.5em;
//   border: none;
//   border-radius: 5px;
//   background-color: #F5F5F5;
//   position: relative;
    
// `;

// const Button = styled.button`
//   margin-left: 1em;
//   backgound-color: blue;
  
// `;

function ItemCreationForm({ userId, createItem, refetchQueries }) {
  const [ itemValue, updateItemValue ] = useState('');
  const [ loading, updateLoading ] = useState(false);
  const [ buttonFlag, setButtonFlag] = useState(false);

  function handleChange(e) {
    updateItemValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!itemValue) {
      return;
    }

    updateLoading(true);



  const createItemResponse = await createItem({
      variables: {
        actionId: CREATE_ITEM_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: userId,
          value: itemValue,
        }),
        unrestricted: false,
      },
      refetchQueries
    });

    const newItemData = JSON.parse(createItemResponse.data.Execute);

    


    updateItemValue('');
    updateLoading(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

    return (
     <div>
    <Form size='small' className="Form">
      <label htmlFor="item-value">
        <input
          className="Form--input"
          id="item-value"
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={ itemValue }
          disabled={loading}
        />
      </label>
      <Button primary onClick={handleSubmit} >Add a task + </Button>
    </Form>
    </div> 
  );
}

export default compose(
  graphql(EXECUTE, { name: 'createItem' }),
  
)(ItemCreationForm);
