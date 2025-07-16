export const LOCAL_STORAGE_KEYS = {
  IsAuth: 'isAuth',
  Email: 'email',
  LegalEntityValues: 'legalEntity',
  // companyEmail: 'companyEmail',
  // Nip: 'nip',
  // OwnerName: 'ownerName',
  // CompanyName: 'companyName'
} as const;

export const SESSION_STORAGE_KEYS = {
  IsEmployeeAuth: 'isEmployeeAuth',
  EmployeeEmail: 'employeeEmail',
  EmployeeRole: 'employeeRole',
} as const;
