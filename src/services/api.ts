const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async login(username: string, password: string) {
    return this.request<{ token: string; user: { id: number; username: string } }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  // Guide methods
  async getGuides() {
    return this.request<any[]>('/api/guides');
  }

  async getGuide(guideId: string) {
    return this.request<any>(`/api/guides/${guideId}`);
  }

  // Admin guide methods
  async getAdminGuides(token: string) {
    return this.request<any[]>('/api/admin/guides', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createGuide(guideData: any, token: string) {
    return this.request<any>('/api/admin/guides', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(guideData),
    });
  }

  async updateGuide(id: number, guideData: any, token: string) {
    return this.request<any>(`/api/admin/guides/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(guideData),
    });
  }

  async deleteGuide(id: number, token: string) {
    return this.request<{ message: string }>(`/api/admin/guides/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Blog methods
  async getBlogs() {
    return this.request<any[]>('/api/blogs');
  }

  async getAdminBlogs(token: string) {
    return this.request<any[]>('/api/admin/blogs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createBlog(blogData: any, token: string) {
    return this.request<any>('/api/admin/blogs', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });
  }

  // Newsletter methods
  async subscribeNewsletter(email: string) {
    return this.request<{ message: string }>('/api/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Health check
  async healthCheck() {
    return this.request<{ status: string; timestamp: string }>('/api/health');
  }
}

export const apiService = new ApiService();
