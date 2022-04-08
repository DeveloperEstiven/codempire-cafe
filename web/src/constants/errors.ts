import { capitalize } from '@utils/capitalize';

export const error = (payload?: string | number) => ({
  required: `${capitalize(payload?.toString())} is required`,
  valid: `Enter a valid ${payload}`,
  min: `Must be at least ${payload} characters`,
  max: `Must be a maximum of ${payload} characters`,
  password: 'Password must contain one number and one special case character',
  name: 'Name must contain only characters',
});
