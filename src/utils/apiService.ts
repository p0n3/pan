import type { Person, Group } from '../types';
import PocketBase from 'pocketbase';

export class ApiService {
  private pb: PocketBase;

  constructor(apiUrl: string) {
    this.pb = new PocketBase(apiUrl);
  }

  // People operations
  async getPeople(): Promise<Person[]> {
    const records = await this.pb.collection('people').getFullList<Person>();
    return records;
  }

  async addPerson(person: Omit<Person, 'id'>): Promise<Person> {
    const record = await this.pb.collection('people').create<Person>(person);
    return record;
  }

  async updatePerson(id: string, updates: Partial<Person>): Promise<Person> {
    const record = await this.pb.collection('people').update<Person>(id, updates);
    return record;
  }

  async deletePerson(id: string): Promise<void> {
    await this.pb.collection('people').delete(id);
  }

  // Groups operations
  async getGroups(): Promise<Group[]> {
    const records = await this.pb.collection('people_group').getFullList<Group>();
    return records;
  }

  async addGroup(group: Omit<Group, 'id'>): Promise<Group> {
    const record = await this.pb.collection('people_group').create<Group>(group);
    return record;
  }

  async updateGroup(id: string, updates: Partial<Group>): Promise<Group> {
    const record = await this.pb.collection('people_group').update<Group>(id, updates);
    return record;
  }

  async deleteGroup(id: string): Promise<void> {
    await this.pb.collection('people_group').delete(id);
  }

  // Sort preference operations (stored on server per user/session)
  async getSortPreference(): Promise<string> {
    try {
      const records = await this.pb.collection('settings').getFullList<{ sort_preference: string }>();
      return records[0]?.sort_preference || 'birthday-asc';
    } catch {
      return 'birthday-asc';
    }
  }

  async setSortPreference(sortValue: string): Promise<void> {
    try {
      const records = await this.pb.collection('settings').getFullList<{ id: string }>();
      const existingRecord = records[0];
      
      if (existingRecord) {
        await this.pb.collection('settings').update(existingRecord.id, { sort_preference: sortValue });
      } else {
        await this.pb.collection('settings').create({ sort_preference: sortValue });
      }
    } catch (error) {
      // If no records exist, create a new one
      await this.pb.collection('settings').create({ sort_preference: sortValue });
    }
  }
}

