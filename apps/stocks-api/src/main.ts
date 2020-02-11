/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import { environment } from './environments/environment';

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost'
  });

  const Wreck = require('wreck');

  const getStockData = async (symbol: string, period: string) => {
    try {
      // GET Stock Data response
      const { stockDataResponse, payload } = await Wreck.get(
        `${environment.STOCK_DATA_URL}${symbol}/chart/${period}?token=${
          environment.API_KEY
        }`,
        {
          json: true
        }
      );
      return payload;
    } catch (error) {
      return error;
    }
  };

  server.method('getStockData', getStockData, {
    cache: {
      expiresIn: 10 * 3000,
      generateTimeout: 10000
    }
  });

  server.route({
    method: 'GET',
    path: '/api/v1/stockData',
    handler: async request => {
      const stockData = server.methods.getStockData(
        request.query.symbol,
        request.query.period
      );
      return stockData;
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
