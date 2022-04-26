export enum USER_ROLES {
  user = 'user',
  manager = 'manager',
}

export const USER_ROUTES = {
  main: 'user',
  updateUser: 'update-user',
  changePassword: 'change-password',
};

export const USER_ERRORS = {
  notFound: 'This user was not found.',
  alreadyExists: 'User with the same data already exists.',
  invalidOldPassword: 'Invalid old password.',
};
