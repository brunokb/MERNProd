import React from 'react';
import { connect } from 'react-redux';

import {
    Table,
    Form,
    Button
  } from "semantic-ui-react";

const userTb = (props) => {

    return (
    <Table called selectable>
        <Table.Row>
            <Form.Field>
            <label>Description  </label>
            <input placeholder='Description' onChange={(e)=>{props.changestate(e.target.value,"prodName")}} value={props.prodName} />
            </Form.Field>
            <Form.Field>
            <label>Quantity </label>
            <input placeholder='Quantity' onChange={(e)=>{props.changestate(e.target.value,"prodQuant")}} value={props.prodQuant} />
            </Form.Field>
            <Button type='button' onClick={()=>props.submitProd()}>Add</Button>
        </Table.Row>
   
    {props.products.length > 0 && <Table.Body>
        <Table.Row>
        <Table.HeaderCell>Product Description</Table.HeaderCell>
        <Table.HeaderCell>Quantity</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>

    {props.products.map(e1 => (
        <Table.Row key={e1._id} >
            <Table.Cell onClick={()=>console.log(e1._id)}>{e1.description}</Table.Cell>
            <Table.Cell onClick={()=>console.log(e1._id)}>{e1.quantity}</Table.Cell>
            <Table.Cell ><button className="logout_btn" onClick={()=>props.deleteProduct(e1._id)}> Delete </button></Table.Cell>
        </Table.Row>
    ))}
    </Table.Body>}
    </Table>
);
}

export default userTb;


