import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handleName = context.getHandler().name
    const now = Date.now()
    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `After... ${Date.now() - now}ms`,
            `ExecutionTime-${handleName}`,
          ),
        ),
      )
  }
}
