import type {
  UserData,
  UserProfileFormData,
  AvatarFormData,
} from '../interfaces/UserData';
import type { CardData, CardFormData } from '../interfaces/CardData';
import type { ApiConfig } from '../interfaces/ApiConfig';

const apiConfig: ApiConfig = {
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: 'c0ddf0cf-88d1-48e6-85fb-4d797dfcd802',
    'Content-Type': 'application/json',
  },
};

class Api {
  private baseUrl: string;
  private headers: ApiConfig['headers'];

  constructor(config: ApiConfig) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Error: ${res.status}`);
  }

  private async sendRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: this.headers,
    });
    return this.handleResponse<T>(res);
  }

  async getUserInfo(): Promise<UserData> {
    return this.sendRequest<UserData>('/users/me');
  }

  async getInitialCards(): Promise<CardData[]> {
    return this.sendRequest<CardData[]>('/cards/');
  }

  async editUserInfo(data: UserProfileFormData): Promise<UserData> {
    return this.sendRequest<UserData>('/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async addCard(data: CardFormData): Promise<CardData> {
    return this.sendRequest<CardData>('/cards/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteCard(cardId: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
  }

  async addLike(cardId: string): Promise<CardData> {
    return this.sendRequest<CardData>(`/cards/${cardId}/likes`, {
      method: 'PUT',
    });
  }

  async removeLike(cardId: string): Promise<CardData> {
    return this.sendRequest<CardData>(`/cards/${cardId}/likes`, {
      method: 'DELETE',
    });
  }

  async updateAvatar(data: AvatarFormData): Promise<UserData> {
    return this.sendRequest<UserData>('/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

const api = new Api(apiConfig);

export default api;
