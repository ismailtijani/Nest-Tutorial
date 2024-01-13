import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token)
      throw new HttpException(
        'Access denied.Please Authenticate.',
        HttpStatus.UNAUTHORIZED
      );
    console.log('Inside middleware');
    next();
  }
}
