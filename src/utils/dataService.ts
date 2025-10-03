import type { Person, Group } from '../types';
import { storage as localStorageService } from './localStorage';
import { ApiService } from './apiService';

export interface DataServiceInterface {
  // People operations
  getPeople(): Promise<Person[]>;
  addPerson(person: Omit<Person, 'id'> | Person): Promise<void>;
  updatePerson(id: string, updates: Partial<Person>): Promise<void>;
  deletePerson(id: string): Promise<void>;

  // Groups operations
  getGroups(): Promise<Group[]>;
  addGroup(group: Omit<Group, 'id'> | Group): Promise<void>;
  updateGroup(id: string, updates: Partial<Group>): Promise<void>;
  deleteGroup(id: string): Promise<void>;

  // Sort preference operations
  getSortPreference(): Promise<string>;
  setSortPreference(sortValue: string): Promise<void>;
}

class LocalStorageDataService implements DataServiceInterface {
  async getPeople(): Promise<Person[]> {
    return localStorageService.getPeople();
  }

  async addPerson(person: Omit<Person, 'id'> | Person): Promise<void> {
    const personWithId = 'id' in person ? person : { ...person, id: Date.now().toString() };
    localStorageService.addPerson(personWithId);
  }

  async updatePerson(id: string, updates: Partial<Person>): Promise<void> {
    localStorageService.updatePerson(id, updates);
  }

  async deletePerson(id: string): Promise<void> {
    localStorageService.deletePerson(id);
  }

  async getGroups(): Promise<Group[]> {
    return localStorageService.getGroups();
  }

  async addGroup(group: Omit<Group, 'id'> | Group): Promise<void> {
    const groupWithId = 'id' in group ? group : { ...group, id: Date.now().toString() };
    localStorageService.addGroup(groupWithId);
  }

  async updateGroup(id: string, updates: Partial<Group>): Promise<void> {
    localStorageService.updateGroup(id, updates);
  }

  async deleteGroup(id: string): Promise<void> {
    localStorageService.deleteGroup(id);
  }

  async getSortPreference(): Promise<string> {
    return localStorageService.getSortPreference();
  }

  async setSortPreference(sortValue: string): Promise<void> {
    localStorageService.setSortPreference(sortValue);
  }
}

class ApiDataService implements DataServiceInterface {
  private apiService: ApiService;

  constructor(apiUrl: string) {
    this.apiService = new ApiService(apiUrl);
  }

  async getPeople(): Promise<Person[]> {
    return this.apiService.getPeople();
  }

  async addPerson(person: Omit<Person, 'id'> | Person): Promise<void> {
    if ('id' in person) {
      // If person already has an ID, use update instead
      await this.apiService.updatePerson(person.id, person);
    } else {
      await this.apiService.addPerson(person);
    }
  }

  async updatePerson(id: string, updates: Partial<Person>): Promise<void> {
    await this.apiService.updatePerson(id, updates);
  }

  async deletePerson(id: string): Promise<void> {
    await this.apiService.deletePerson(id);
  }

  async getGroups(): Promise<Group[]> {
    return this.apiService.getGroups();
  }

  async addGroup(group: Omit<Group, 'id'> | Group): Promise<void> {
    if ('id' in group) {
      // If group already has an ID, use update instead
      await this.apiService.updateGroup(group.id, group);
    } else {
      await this.apiService.addGroup(group);
    }
  }

  async updateGroup(id: string, updates: Partial<Group>): Promise<void> {
    await this.apiService.updateGroup(id, updates);
  }

  async deleteGroup(id: string): Promise<void> {
    await this.apiService.deleteGroup(id);
  }

  async getSortPreference(): Promise<string> {
    return this.apiService.getSortPreference();
  }

  async setSortPreference(sortValue: string): Promise<void> {
    await this.apiService.setSortPreference(sortValue);
  }
}

// Configuration and factory
export interface DataServiceConfig {
  mode: 'demo' | 'production';
  apiUrl?: string;
}

export function createDataService(config: DataServiceConfig): DataServiceInterface {
  if (config.mode === 'demo') {
    return new LocalStorageDataService();
  } else {
    return new ApiDataService(config.apiUrl || '');
  }
}

// Global data service instance
let dataServiceInstance: DataServiceInterface | null = null;

export function initializeDataService(config: DataServiceConfig): void {
  dataServiceInstance = createDataService(config);
}

export function getDataService(): DataServiceInterface {
  if (!dataServiceInstance) {
    throw new Error('Data service not initialized. Call initializeDataService first.');
  }
  return dataServiceInstance;
}

