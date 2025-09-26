export interface Group {
  id: string;
  name: string;
  color: string;
}

export interface Person {
  id: string;
  name: string;
  birthDate: string; // ISO date string
  groupId: string;
}

export interface AgeDisplay {
  value: number;
  unit: 'years' | 'months' | 'weeks' | 'days';
  formatted: string;
}
