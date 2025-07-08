import { KeyboardEvent } from 'react';

import { ALLOWED_KEYS } from 'constants/allowedKeys';

export const checkAllowedKey = (e: KeyboardEvent, pattern: RegExp): boolean =>
  !pattern.test(e.key) && !ALLOWED_KEYS.includes(e.key);
