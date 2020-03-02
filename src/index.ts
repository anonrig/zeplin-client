import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Token, User, Project, Pagination, Member, Screen, Header } from './types';
import * as tsTypes from './types';

export const Types = tsTypes;

export default class Client {
  private requester: AxiosInstance;
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor(clientId: string, clientSecret: string, redirectUri: string) {
    this.requester = axios.create({
      baseURL: 'https://api.zeplin.dev/v1',
      timeout: 3000,
    });
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
  }

  async getToken(code: string): Promise<Token> {
    const response: AxiosResponse<Token> = await this.requester.post<Token>(`/oauth/token`, {
      grant_type: 'authorization_code',
      code,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: this.redirectUri,
    });

    return response.data;
  }

  async refreshToken(token: string): Promise<Token> {
    const response: AxiosResponse<Token> = await this.requester.post<Token>(`/oauth/token`, {
      grant_type: 'authorization_code',
      refresh_token: token,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: this.redirectUri,
    });

    return response.data;
  }

  async getCurrentUser(accessToken: string): Promise<User> {
    const response: AxiosResponse<User> = await this.requester.get<User>('/users/me', {
      headers: this.prepareHeaders(accessToken),
    });

    return response.data;
  }

  async getProjects(accessToken: string, pagination: Pagination): Promise<[Project]> {
    const response: AxiosResponse<[Project]> = await this.requester.get<[Project]>('/projects', {
      headers: this.prepareHeaders(accessToken),
      params: pagination,
    });

    return response.data;
  }

  async getProject(accessToken: string, projectId: string): Promise<Project> {
    const response: AxiosResponse<Project> = await this.requester.get<Project>(
      `/projects/${projectId}`,
      {
        headers: this.prepareHeaders(accessToken),
      },
    );

    return response.data;
  }

  async getProjectMembers(
    accessToken: string,
    projectId: string,
    pagination: Pagination,
  ): Promise<[Member]> {
    const response: AxiosResponse<[Member]> = await this.requester.get<[Member]>(
      `/projects/${projectId}/members`,
      {
        headers: this.prepareHeaders(accessToken),
        params: pagination,
      },
    );

    return response.data;
  }

  async getProjectScreens(
    accessToken: string,
    projectId: string,
    pagination: Pagination,
  ): Promise<[Screen]> {
    const response: AxiosResponse<[Screen]> = await this.requester.get<[Screen]>(
      `/projects/${projectId}/screens`,
      {
        headers: this.prepareHeaders(accessToken),
        params: pagination,
      },
    );

    return response.data;
  }

  /**
   * @private
   * @param accessToken Access token of the user
   */
  private prepareHeaders(accessToken: string): Header {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }
}
