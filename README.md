# Umberto Mirko Garozzo infinite scroll implementation

## Run the server

From the server directory first run `npm install` and then `node server.js`. This should spin a server on port 4000.

## Run the Front End

In the project directory, you can run:

### `yarn`

Will bootstrapp the app and download dependencies.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

## Ledger X live feed option board

I am pulling live data from the Ledger X [https://trade.ledgerx.com/api](live feed)).

Since I had some issue in pulling the data from the API directly from the client, due to auth permission, I took the following steps:

- For the REST API I am using a proxy.
- For the WSS I am pulling the data from the backend I created first and then stream it to the client.
  Please note that due to the usage of proxy getting data might be a bit slower than expected.

I am displaying all the different contracts data in a scrollable table and the user can see extra details about the contract from clicking the graph icons to the left/right of the table row.

At the top of the table there is a BTC price field that stais sticky so users can always know which option is in/out of the money.

## Testing

I am using Jest and Enzyme for unit testing.

## TODO list

- Improve theme colours.
- Pull graph data from historic API.
- Test performance.
- Refactor code and split into different functions.
- Beetter error handling.
