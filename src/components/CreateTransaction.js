import React from 'react';

const CreateTransaction = (props) => (

  <div className="create-transaction">
  {
    <form>
    <label htmlFor="Amount"></label>
    <input className="input-field" onChange={props.handleFormInput} type="number" id="orderSize" placeholder="# of shares"/>
    <button className="purchase-button" id="buy" onClick={props.handleTransaction}>Buy</button>
    <br></br>
    <label htmlFor="Amount"></label>
    <input className="input-field" onChange={props.handleFormInput} type="number" id="orderSize" placeholder="# of shares"/>
    <button className="purchase-button" id="sell" onClick={props.handleTransaction}>Sell</button>
    </form>
  }
  </div>
);

export default CreateTransaction;
