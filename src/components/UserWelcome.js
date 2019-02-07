import React from 'react';


const UserWelcome = (props) => {

  return (
    <div>
    <h1>Welcome, {props.firstname}</h1>
    <h1>balance : {props.balance}</h1>,
    {
      props.transactions.length > 0 ?
        <div>
        <button className="portfolio-button" onClick={props.fetchTransactions}>All Transactions</button>
        <button className="portfolio-button" onClick={props.handleCurrentVal}>Portfolio</button>
        </div>
        :
        null
    }
    </div>
  );
}



export default UserWelcome;
