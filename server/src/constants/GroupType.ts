export const GroupType= {
    EXPENSE: 'EXPENSE',
    INCOME: 'INCOME'
  };

  export type GroupType = (typeof GroupType)[keyof typeof GroupType]