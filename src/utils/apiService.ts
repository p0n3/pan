import type { Person, Group } from '../types';

export interface ApiConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

interface ApiResponse<T> {
  items: T[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export class ApiService {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
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
    return (await this.request<ApiResponse<Person>>('/collections/people/records')).items;
  }

  async addPerson(person: Omit<Person, 'id'>): Promise<Person> {
    return this.request<Person>('/collections/people/records', {
      method: 'POST',
      body: JSON.stringify(person),
    });
  }

  async updatePerson(id: string, updates: Partial<Person>): Promise<Person> {
    return this.request<Person>(`/collections/people/records/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deletePerson(id: string): Promise<void> {
    await this.request(`/collections/people/records/${id}`, {
      method: 'DELETE',
    });
  }

  // Groups operations
  async getGroups(): Promise<Group[]> {
    return (await this.request<ApiResponse<Group>>('/collections/people_group/records')).items;
  }

  async addGroup(group: Omit<Group, 'id'>): Promise<Group> {
    return this.request<Group>('/collections/people_group/records', {
      method: 'POST',
      body: JSON.stringify(group),
    });
  }

  async updateGroup(id: string, updates: Partial<Group>): Promise<Group> {
    return this.request<Group>(`/collections/people_group/records/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteGroup(id: string): Promise<void> {
    await this.request(`/collections/people_group/records/${id}`, {
      method: 'DELETE',
    });
  }

  // Sort preference operations (stored on server per user/session)
  async getSortPreference(): Promise<string> {
    try {
      const response = (await this.request<ApiResponse<{ sort_preference: string }>>('/collections/settings/records')).items[0];
      return response.sort_preference || 'birthday-asc';
    } catch {
      return 'birthday-asc';
    }
  }

  async setSortPreference(sortValue: string): Promise<void> {
    const serverId = (await this.request<ApiResponse<{ id: string }>>('/collections/settings/records')).items[0];
    const recId =  serverId?.id;
    if(recId == null) {
      await this.request('/collections/settings/records', {
        method: 'POST',
        body: JSON.stringify({ sort_preference: sortValue }),
      });
    } else {
    await this.request(`/collections/settings/records/${recId}`, {
        method: 'PUT',
        body: JSON.stringify({ sort_preference: sortValue }),
      });
    }
  }
}

