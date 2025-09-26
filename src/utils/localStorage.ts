import type { Person, Group } from '../types';

const STORAGE_KEYS = {
  PEOPLE: 'tage-people',
  GROUPS: 'tage-groups',
  SORT_PREFERENCE: 'tage-sort-preference'
} as const;

export const storage = {
  // People operations
  getPeople(): Person[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.PEOPLE);
    return data ? JSON.parse(data) : [];
  },

  savePeople(people: Person[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.PEOPLE, JSON.stringify(people));
  },

  addPerson(person: Person): void {
    const people = this.getPeople();
    people.push(person);
    this.savePeople(people);
  },

  updatePerson(id: string, updates: Partial<Person>): void {
    const people = this.getPeople();
    const index = people.findIndex(p => p.id === id);
    if (index !== -1) {
      people[index] = { ...people[index], ...updates };
      this.savePeople(people);
    }
  },

  deletePerson(id: string): void {
    const people = this.getPeople().filter(p => p.id !== id);
    this.savePeople(people);
  },

  // Groups operations
  getGroups(): Group[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.GROUPS);
    return data ? JSON.parse(data) : [];
  },

  saveGroups(groups: Group[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
  },

  addGroup(group: Group): void {
    const groups = this.getGroups();
    groups.push(group);
    this.saveGroups(groups);
  },

  updateGroup(id: string, updates: Partial<Group>): void {
    const groups = this.getGroups();
    const index = groups.findIndex(g => g.id === id);
    if (index !== -1) {
      groups[index] = { ...groups[index], ...updates };
      this.saveGroups(groups);
    }
  },

  deleteGroup(id: string): void {
    const groups = this.getGroups().filter(g => g.id !== id);
    this.saveGroups(groups);
  },

  // Sort preference operations
  getSortPreference(): string {
    if (typeof window === 'undefined') return 'birthday-asc';
    return localStorage.getItem(STORAGE_KEYS.SORT_PREFERENCE) || 'birthday-asc';
  },

  setSortPreference(sortValue: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.SORT_PREFERENCE, sortValue);
  }
};
