export interface ApiConfig {
  baseUrl: string;
  headers: {
    authorization: string;
    'Content-Type': string;
  };
}
