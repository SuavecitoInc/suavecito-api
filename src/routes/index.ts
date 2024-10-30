import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express';
import { verifyRequest } from '../middleware.js';
import { helloFriend } from '../controllers/index.js';
import { format } from '../lib/utils/index.js';
import { postItemToShopify } from '../controllers/shopify.js';

const routes = (app: Express) => {
  app.get('/', helloFriend);

  app.get('/uptime', (req: Request, res: Response) => {
    res.status(200).send({
      uptime: format(process.uptime()),
      message: 'Ok',
      date: new Date(),
      ip: req.ip,
    });
  });

  const apiV1Router = express.Router();

  // shopify
  // TODO: verifyRequest middleware
  apiV1Router.post('/product/create', postItemToShopify);

  app.use('/v1', apiV1Router);
};

export default routes;
