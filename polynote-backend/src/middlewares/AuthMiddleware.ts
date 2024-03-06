import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (token == null) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const parsed = req.headers.authorization.split('Bearer ')[1];
    try {
      const data = this.jwtService.verify(parsed);
      req.headers['address'] = data.address;
      next();
    } catch {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
