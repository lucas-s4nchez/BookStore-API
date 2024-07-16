import { UseGuards, applyDecorators } from '@nestjs/common';
import { RefreshJwtGuard } from '../guards';

/**
 * A decorator function that applies the RefreshJwtGuard to the decorated route.
 *
 * @return {ReturnType<typeof applyDecorators>} The decorated function.
 */
export function AuthWithRefreshToken() {
  return applyDecorators(UseGuards(RefreshJwtGuard));
}
