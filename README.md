# Speculate.

![short-demo-main](src/assets/short-demo-main.gif)

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

Child component to the ProfileCard. Conditionally rendered based on loggedIn state. Enables users to buy shares (of the company the ProfileCard currently selected) or sell shares of that company if they are within the user portfolio. A sufficient balance is required to buy stocks.

### TransactionChart.js

Creates a bar chart using chartkick js based on the current transactions filtered (bought, sold or all). Using the function filterChart, an aggregate value for the cost of all shares of the same stock and created into a new chart to present in the table.

### TransactionTable.js

Presents transactions in a table with values for stock symbol, price, cost, number of shares and date of purchase. Can be sorted by symbol, price, cost and number of shares and filtered by bought, sold or all transactions. Pagination for every 7 transactions.

## Containers

### Landing.js

Welcome page when a user is not yet logged into the application. Brief overview of the app's purpose and explanation of how to use the app.

### Login.js

Handles the render for loginForm based on the value of LoggedIn in state. Conditionally renders button for Create Account/Login if a user is logged out and Logout if a use is logged in.

### StockList.js

Displays a list of stocks that updates based on user search input. Can be filtered to display a particular company sector (healthcare, technology, consumables) and sorted alphabetically. Search results are sliced to the first 7 results (to avoid lag and loading time in consideration of  UX and not providing an overflow of results) The sector filter returns companies over $17,000,000,000 but all stocks will be presented with a specific search within the sector. (another UX consideration to avoid an overload of sector results to browse)

### StockProfile.js

Child to StockList and rendered based on the user search input. When a StockProfile is clicked the fetch for stock data (52week high, lo, P/E ratio, etc.), company description, data to render the price chart, and the associated icon. The ProfileCard is then rendered with all of the data needed to display.

### UserAccount.js

Conditionally rendered when a user in logged in. Fetches user transactions based on the click event for the 'View Transactions' button. Provides a more in-depth review of the application's functionality, acting as a landing page once a user creates an account or logs in.
