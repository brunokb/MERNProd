import React from 'react';
import {
    Table,
    Form,
    Button
  } from "semantic-ui-react";



const costumerTb = (props) => { 
    return(
    <Table called selectable>
    <Table.Row>
    <Form.Field>
      <label>Name     </label>
      <input placeholder='Name' onChange={(e)=>{props.changestate(e.target.value,"customerName")}} value={props.customerName} />
    </Form.Field>
    <Form.Field>
      <label>Email    </label>
      <input placeholder='Email' onChange={(e)=>{props.changestate(e.target.value,"customerEmail")}} value={props.customerEmail}/>
    </Form.Field>
    <Button type='submit' onClick={()=>props.submitCust()}>Add</Button>
    </Table.Row>

   
    <Table.Body>
        <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Create At</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>

    
    {props.customers.map(e1 => (
        <Table.Row key={e1._id} >
            <Table.Cell onClick={()=>props.onlineclicked(e1._id)}>{e1.name}</Table.Cell>
            <Table.Cell onClick={()=>props.onlineclicked(e1._id)}>{e1.email}</Table.Cell>
            <Table.Cell onClick={()=>props.onlineclicked(e1._id)}>{e1.createAt}</Table.Cell>
            <Table.Cell><button className="logout_btn" onClick={()=>props.deleteCustomer(e1._id)} > Delete </button></Table.Cell>
  
            
        </Table.Row>
    ))}
    </Table.Body>
    </Table>
    )
};


export default costumerTb;


