import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Token, User, Project, Pagination, Member, Screen, Header } from './types';
import * as tsTypes from './types';

export const Types = tsTypes;

export default class Client {
  private requester: AxiosInstance;
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  /**
   * @constructor
   * @param clientId Client id
   * @param clientSecret Client secret
   * @param redirectUri Redirect url
   */
  constructor(clientId: string, clientSecret: string, redirectUri: string) {
    this.requester = axios.create({
      baseURL: 'https://api.zeplin.dev/v1',
      timeout: 3000,
    });
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
  }

  /**
   * Get access token of a user.
   * @param code Code retrieved from the redirect url's response
   * @returns Promise<Token>
   */
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

  /**
   * Refresh your access token, but validate if refresh_token is valid.
   * @param token Refresh token
   * @returns Promise<Token>
   */
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

  /**
   * Get current user properties.
   * @param accessToken Access token
   * @returns Promise<User>
   */
  async getCurrentUser(accessToken: string): Promise<User> {
    const response: AxiosResponse<User> = await this.requester.get<User>('/users/me', {
      headers: this.prepareHeaders(accessToken),
    });

    return response.data;
  }

  /**
   * Get currenct projects of the user
   * @param accessToken Access token
   * @param pagination Pagination fields including limit and offset.
   * @returns Promise<[Project]>
   */
  async getProjects(accessToken: string, pagination: Pagination): Promise<[Project]> {
    const response: AxiosResponse<[Project]> = await this.requester.get<[Project]>('/projects', {
      headers: this.prepareHeaders(accessToken),
      params: pagination,
    });

    return response.data;
  }

  /**
   * Retrieves a specific project
   * @param accessToken Access token
   * @param projectId Project id
   * @returns Promise<Project>
   */
  async getProject(accessToken: string, projectId: string): Promise<Project> {
    const response: AxiosResponse<Project> = await this.requester.get<Project>(
      `/projects/${projectId}`,
      {
        headers: this.prepareHeaders(accessToken),
      },
    );

    return response.data;
  }

  /**
   * Retrieve project's members
   * @param accessToken Access token
   * @param projectId Project id
   * @param pagination Pagination fields including limit and offset.
   * @returns Promise<[Member]>
   */
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

  /**
   * Get screens of a specific project
   * @param accessToken Access token
   * @param projectId Project id
   * @param pagination Pagination fields including limit and offset.
   */
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
