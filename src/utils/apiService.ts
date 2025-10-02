import type { Person, Group } from '../types';

export interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

export class ApiService {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...this.config.headers,
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // People operations
  async getPeople(): Promise<Person[]> {
    return this.request<Person[]>('/people');
  }

  async addPerson(person: Omit<Person, 'id'>): Promise<Person> {
    return this.request<Person>('/people', {
      method: 'POST',
      body: JSON.stringify(person),
    });
  }

  async updatePerson(id: string, updates: Partial<Person>): Promise<Person> {
    return this.request<Person>(`/people/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deletePerson(id: string): Promise<void> {
    await this.request(`/people/${id}`, {
      method: 'DELETE',
    });
  }

  // Groups operations
  async getGroups(): Promise<Group[]> {
    return this.request<Group[]>('/groups');
  }

  async addGroup(group: Omit<Group, 'id'>): Promise<Group> {
    return this.request<Group>('/groups', {
      method: 'POST',
      body: JSON.stringify(group),
    });
  }

  async updateGroup(id: string, updates: Partial<Group>): Promise<Group> {
    return this.request<Group>(`/groups/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteGroup(id: string): Promise<void> {
    await this.request(`/groups/${id}`, {
      method: 'DELETE',
    });
  }

  // Sort preference operations (stored on server per user/session)
  async getSortPreference(): Promise<string> {
    try {
      const response = await this.request<{ sortPreference: string }>('/preferences/sort');
      return response.sortPreference || 'birthday-asc';
    } catch {
      return 'birthday-asc';
    }
  }

  async setSortPreference(sortValue: string): Promise<void> {
    await this.request('/preferences/sort', {
      method: 'PUT',
      body: JSON.stringify({ sortPreference: sortValue }),
    });
  }
}

