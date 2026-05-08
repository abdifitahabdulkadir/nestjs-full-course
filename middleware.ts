import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * this is the funciton based middleware. and it used for express world
 */
export default function middleware1(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Loggiing from the AppMiddleware function based middleware');

  // this will stop the request from being sent
  // to the next middleware in the chain
  // this is using express.js response object.
  //   res.send('Hello from the middleware. stop sending anything.');

  // this next function is used to call the next middleware in the chain.
  // forwads the request to the next middleware in the chain.
  console.log(req.method, req.url);
  next();
}

/**
 * this is the class based middleware. and it used for nestjs world
 */
export class AppMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    console.log('Loggiing from the AppMiddleware class based middleware');
    next();
  }
}
