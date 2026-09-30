
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = {
  async checkHealth() {
    try {
      const response = await fetch(`${API_URL}/health`, { cache: 'no-store' });
      return response.ok;
    } catch {
      return false; 
    }
  },


  async getLinks() {
    const response = await fetch(`${API_URL}/api/links`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to load links from server.');
    }
    return response.json();
  },

  async createLink({ url, customCode, title }) {
    const response = await fetch(`${API_URL}/api/links`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, customCode, title }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create link.');
    }

    return data;
  },

  
  async getAnalytics(linkId) {
    const response = await fetch(`${API_URL}/api/links/${linkId}/analytics`, {
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to load analytics.');
    }

    return data;
  },


  async deleteLink(linkId) {
    const response = await fetch(`${API_URL}/api/links/${linkId}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete link.');
    }

    return data;
  },


  getShortUrl(shortCode) {
    return `${API_URL}/${shortCode}`;
  },
};