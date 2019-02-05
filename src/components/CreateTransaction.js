import React from 'react';

const CreateTransaction = (props) => (

  <div>
  {
    <form>
    <label htmlFor="Amount">Amount : </label>
    <input onChange={props.handleFormInput} type="number" id="buyOrder"/>
    <button id="buy" onClick={props.handleTransaction}>Buy : </button>

    <label htmlFor="Amount">Amount : </label>
    <input onChange={props.handleFormInput} type="number" id="sellOrder"/>
    <button id="sell" onClick={props.handleTransaction}>Sell : </button>
    </form>
  }
  </div>
);

export default CreateTransaction;
