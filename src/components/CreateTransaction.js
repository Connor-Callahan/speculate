import React from 'react';

const CreateTransaction = (props) => (

  <div>
  {
    <form>
    <label htmlFor="Amount">Amount : </label>
    <input onChange={props.handleFormInput} type="number" id="buyOrder"/>
    <button onClick={props.handleTransaction}>Buy : </button>

    <label htmlFor="Amount">Amount : </label>
    <input onChange={props.handleFormInput} type="number" id="sellOrder"/>
    <button onClick={props.handleTransaction}>Sell : </button>
    </form>
  }
  </div>
);

export default CreateTransaction;
