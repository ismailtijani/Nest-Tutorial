import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

console.log('JWT Guard......');

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
