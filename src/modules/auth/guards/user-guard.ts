// import { Injectable, ExecutionContext } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class UserGuard extends AuthGuard('jwt') {
//   constructor() {
//     super();
//   }

//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;

//     if (!user) return false;

//     return true;
//   }
// }
