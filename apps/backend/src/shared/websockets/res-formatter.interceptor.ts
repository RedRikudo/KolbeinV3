import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorResDTO, ResDTO } from '@interfaces/dto/common.dto';

@Injectable()
export class WsResFormatterInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<ResDTO<T> | ErrorResDTO> {
    return next.handle().pipe(
      map((r) => ({
        status: 'Ok',
        ...(typeof r === 'object' ? r : { value: r }),
      })),
      catchError((err) =>
        err instanceof WsException
          ? of({ status: err.name, message: err.message })
          : throwError(err)
      )
    );
  }
}
