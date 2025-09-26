import type { Person, Group } from '../types';

export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Family',
    color: '#ef4444' // red-500
  },
  {
    id: '2', 
    name: 'Friends',
    color: '#3b82f6' // blue-500
  },
  {
    id: '3',
    name: 'Work',
    color: '#10b981' // emerald-500
  },
  {
    id: '4',
    name: 'Kids',
    color: '#f59e0b' // amber-500
  }
];

export const mockPeople: Person[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    birthDate: '2020-03-15',
    groupId: '4' // Kids
  },
  {
    id: '2',
    name: 'Michael Smith', 
    birthDate: '1985-07-22',
    groupId: '1' // Family
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    birthDate: '1992-11-08',
    groupId: '2' // Friends
  },
  {
    id: '4',
    name: 'David Brown',
    birthDate: '1978-04-12',
    groupId: '3' // Work
  },
  {
    id: '5',
    name: 'Baby Oliver',
    birthDate: '2024-08-20',
    groupId: '1' // Family
  },
  {
    id: '6',
    name: 'Lisa Garcia',
    birthDate: '1989-12-03',
    groupId: '2' // Friends
  },
  {
    id: '7',
    name: 'Toddler Mia',
    birthDate: '2022-01-10',
    groupId: '4' // Kids
  },
  {
    id: '8',
    name: 'Newborn Alex',
    birthDate: '2024-09-15',
    groupId: '1' // Family  
  }
];

export function initializeMockData(): void {
  if (typeof window === 'undefined') return;
  
  // Only initialize if no data exists
  const existingGroups = localStorage.getItem('tage-groups');
  const existingPeople = localStorage.getItem('tage-people');
  
  if (!existingGroups) {
    localStorage.setItem('tage-groups', JSON.stringify(mockGroups));
  }
  
  if (!existingPeople) {
    localStorage.setItem('tage-people', JSON.stringify(mockPeople));
  }
}
