import React from 'react';

const CreateTransaction = (props) => (

  <div>
  {
    <form>
    <label htmlFor="Amount"></label>
    <input onChange={props.handleFormInput} type="number" id="orderSize" placeholder="number of shares"/>
    <button id="buy" onClick={props.handleTransaction}>Buy : </button>
    <br></br>
    <label htmlFor="Amount"></label>
    <input onChange={props.handleFormInput} type="number" id="orderSize" placeholder="number of shares"/>
    <button id="sell" onClick={props.handleTransaction}>Sell : </button>
    </form>
  }
  </div>
);

export default CreateTransaction;
