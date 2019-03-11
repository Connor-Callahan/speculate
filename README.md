# Speculate.

This application was created to simulate trading shares of companies listed on the U.S. Stock Exchange. Add shares of companies with the money in your balance to create a portfolio of stocks. Sell shares within that portfolio to add to your balance. Track the performance of your portfolio over time and review detailed analytics of your transactions, earnings and returns.

## Components

#### LoginForm.js

Contains the form to either create a new account or log into an account as a pre-existing user. Two separate functions to 'login' and 'create' to initiate the createAccount and handleLogin functions with the form values.

### Portfolio.js

An aggregate of all stocks currently owned in the portfolio. The function handleCurrentVal filters bought and sold to first determine which stocks exist in the portfolio (shares bought - shares sold) and create a new object with the values of the same stock combined. Using chartkick to render a pie chart of cost value. The current value of the total number of shares of stock is also updated in this function.

### ProfileCard.js

Data, description and price history chart for each company. Rendered by a click event located on each company header mapped in StockList.js. Conditionally rendered by setting state of state.stock.

### SearchStocks.js

Search bar, sector filter and alphabetical sorting. Listed results are dynamically sliced to the first 7 during search. When a sector is selected the returned data is sliced to stocks with a market cap above $17,000,000,000. (all stocks within the sector are still searchable, just not part of the inital browse.) 

### Transaction.js

### TransactionChart.js

### TransactionTable.js

## Containers

### Landing.js

### Login.js

### StockList.js

### StockProfile.js

### UserAccount.js
