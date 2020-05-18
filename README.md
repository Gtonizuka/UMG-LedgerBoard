# LedgerX options board

## Run the server

From the `server` directory run `npm install` to install dependencies. Therefore run `node server.js`. This will spin a server on port 4000.

## Run the React app

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

## Live Feed data

I am pulling live data from the Ledger X [https://trade.ledgerx.com/api](live feed)).

Since I had some issue in getting the data directly from the React app, due to CORS settings, I took the following steps:

- For the REST API I am using a proxy to circumnavigate CORS.
- For the WSS data I created a Node backend that I use as middleman between the Live Feed server the client. I open a socket connection and directly stream the data for the front end to consume from an Express API.
  Please note that due to the usage of proxy getting data might be a bit slower than expected. I would also expect some ms delay on WSS data due to the extra layer.

In the front end I am displaying all the different contracts data in a scrollable table.
If you would like to see extra details about an individual contract, you can do so by clicking the graph icons to the left/right of the table row. This will redirect to a page where a chart about that contract call/put historical data is displayed.

At the top of the table there is a BTC price field that stais sticky so users can always know which option is in/out of the money.

## Testing

I am using Jest and Enzyme for unit testing.

## TODO list

- Improve theme colours.
- Pull graph data from historic API.
- Test performance.
- Refactor code and split into different functions.
- Beetter error handling.
