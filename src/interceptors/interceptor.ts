import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

/**
 * unlike guards which sits before route handler ,
 * intercpets sits between request and reponse.
 * and have an access to the request and response.
 */
@Injectable()
export class CustomInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    // all thse run and execute before requests gets to router controller.
    const originalUrl = context.switchToHttp().getRequest().originalUrl;
    console.log('Request URL', originalUrl);
    context.switchToHttp().getRequest().headers['accept-language'] = 'so';

    // this is the response from the router controller.
    // const response = await firstValueFrom(next.handle());
    return next
      .handle()
      .pipe(map((data) => ({ data, timestamp: new Date().toISOString() })));

    /**
     * one such big usecase of interceptor is catching
     * and stopping reqquest from
     * going on. we can check if the data is already there in the cache,
     * and only returns early and otherise proceed with next handler().
     * and after the response, we can then update our catche
     * and return the data.
     *
     *
     */
  }
}
