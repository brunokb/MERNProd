import React, { Component } from "react";
import "./Products.css";
import store from '../store/index';
import { Provider } from 'react-redux';
import api from '../features/api'
import { connect , dispatch} from 'react-redux';


import CostumerTable from './costumerTb'
import ProdTable from './prodTb'
import {
  Table,
} from "semantic-ui-react";
import costumer from "../store/reducer/costumer";

const getCustomer = () => async dispatch => {
  let varProd = await api.get(`/costumer/${"616c0b9e99a8c7d1a850b0d1"}`,{
  }).catch(function(error){
//        console.log("error")
  }); 
  dispatch({
    type: "UPDATE_COSTUMER",
    payload: varProd.data.costumer
  })        
}

const includeCustomer = (name,email) => async dispatch => {
  let varProd = await api.post(`/costumer`,{
    name:name ,
	  email:email,
    userId:"616c0b9e99a8c7d1a850b0d1",
    prod:[]

  }).catch(function(error){
//        console.log("error")
  })
  dispatch(getCustomer());        
}

const includeProd = (name,quant,customer) => async dispatch => {
  let varProd = await api.put(`/costumer/addProd`,{
    description:name,
	  quantity:quant,
    _id:customer,
  }).catch(function(error){
//        console.log("error")
  })
  dispatch(getCustomer());        
}

const deleteCust = (customerId) => async dispatch => {
  let varProd = await api.delete(`/costumer/delCustomer`,{
    data:{
      _id:customerId,
    }
  }).catch(function(error){
//        console.log("error")
  })
  dispatch(getCustomer());        
}
const deleteProd = (customerId,productId) => async dispatch => {
  let varProd = await api.delete(`/costumer/delProduct`,{
    data:{
      _id:productId,
      userId:customerId,
    }
  }).catch(function(error){
//        console.log("error")
  })
  dispatch(getCustomer());        
}

class Products extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      products:[],
      prodName:"",
      prodQuant:"",
      customerName:"",
      customerEmail:"",
      customerId:"",
      customers: []
    }
    this.changeState=this.changeState.bind(this);
    this.addCustomer=this.addCustomer.bind(this);
    this.addProd=this.addProd.bind(this);
    this.deleteCustomer=this.deleteCustomer.bind(this);
    this.deleteProduct=this.deleteProduct.bind(this);
  }
  changeState(value,variable){
    this.setState({
      ...this.state,
      [variable]:value
    })
    
  }

  componentDidUpdate(){
    const {customerId} = this.state

    if (JSON.stringify(this.state.customers) !== JSON.stringify(this.props.costumer)) {
      const tempState = this.state

      tempState.customers = this.props.costumer

      if (customerId) {
        const c = this.props.costumer.find((cost)=>cost._id===customerId) || {};
        const products = c.prod

        tempState.products = products
      }    

      this.setState(tempState)
    }
  }
  addCustomer(){
    const {customerName,customerEmail} = this.state;
    this.props.includeCustomer(customerName,customerEmail);
    this.setState(
      {
      ...this.state,
        customerEmail:"",
        customerName:""
      }
    )
  }
  addProd(){
    const {prodName,prodQuant, customerId} = this.state;
    this.props.includeProd(prodName,prodQuant,customerId);
    this.setState(
      {
      ...this.state,
        prodName:"",
        prodQuant:""
      }
    )
  }
  deleteCustomer(customerId){
    this.props.deleteCust(customerId);
  }
  deleteProduct(prodId){
    const {customerId} = this.state;
    this.props.deleteProd(customerId,prodId);
  }

  componentDidMount(){
    this.props.getCustomer();
  }
  onLineClicked = (userId) =>{
    const c = this.props.costumer.find((cost)=>cost._id===userId);
    this.setState(
      {
        ...this.state,
        products:c.prod,
        customerId: userId
      }
    )
  }
  
  render(){
    const {products,prodName,prodQuant,customerEmail,customerName} = this.state;

    return (
// eslint-disable-next-line 
            <Table>
                 <Table.Header className="tab_header">Costumer</ Table.Header>
                    <Table.Row>
                        <Provider store={store}>
                          <CostumerTable 
                          customers={this.props.costumer} 
                          onlineclicked={this.onLineClicked} 
                          changestate={this.changeState}
                          customerEmail={customerEmail}
                          customerName={customerName}
                          submitCust={this.addCustomer}
                          deleteCustomer={this.deleteCustomer}
                          />
                          <ProdTable 
                          products={products}
                          changestate={this.changeState}
                          prodName={prodName}
                          prodQuant={prodQuant}
                          submitProd={this.addProd}
                          deleteProduct={this.deleteProduct}
                           />
                        </ Provider>
                    </Table.Row>
              </Table>
            )
    }}

export default connect(state=> {
//  console.log(state);
  return {
  costumer: state.costumer.costumer
  }
},
{getCustomer,
includeCustomer,
includeProd,
deleteCust,
deleteProd}
)(Products);