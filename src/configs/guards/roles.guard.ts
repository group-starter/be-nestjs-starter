import { BaseInput } from '@/graphql'
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const allRoles = this.reflector.getAllAndOverride<string[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ])
      if (!allRoles?.length) {
        return true
      }
      const ctx = GqlExecutionContext.create(context)
      const currentUser = JSON.parse(
        JSON.stringify(ctx.getContext().currentUser),
      )
      const baseInput: BaseInput = ctx.getArgs().baseInput
      console.log('RolesGuard', {
        currentUser,
        allRoles,
        baseInput,
      })
      if (baseInput.profileId !== 'admin') {
        throw new UnauthorizedException()
      }
      return true
    } catch (err) {
      console.log(`err RolesGuard: ${err.message}`)
      throw err
    }
  }
}
