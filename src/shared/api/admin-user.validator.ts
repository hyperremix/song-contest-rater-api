export const isAdminUser = (authorizer?: { claims?: any }): boolean => {
  let userGroups = authorizer?.claims?.['cognito:groups'];
  if (!userGroups) {
    return false;
  }

  if (typeof userGroups === 'string') {
    userGroups = [userGroups];
  }

  return Array.isArray(userGroups) && userGroups.some((val) => val === 'Admin');
};
