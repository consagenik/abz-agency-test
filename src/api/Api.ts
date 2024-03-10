import IApi from './IApi';
import ApiResponse from "./entities/ApiResponse";
import IUser from "../entities/IUser";
import {mapApiPositionsToIPositions, mapApiUsersToIUsers, mapISignUpRequestToApiSignUpRequest} from "./mappers";
import {IPosition, ISignUpRequest} from "../entities";

export default class Api implements IApi {
  private baseUrl: string = process.env.REACT_APP_API_HOST!;

  private async fetchData(path: string, requestOptions: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, { ...requestOptions });
      const statusCode = response.status;
      const data = await response.json();

      return {
        data,
        statusCode,
        error: statusCode !== 200 ? data.message : null,
        pagesNumber: statusCode === 200 ? data.total_pages : null
      };
    } catch (e) {
      throw new Error(`API Fetch error: ${e}`);
    }
  }

  private async getData(path: string): Promise<any> {
    const myHeaders: { [key: string]: string } = {};

    const requestOptions: {
      method: string;
      redirect: 'follow' | 'error' | 'manual' | undefined;
      headers: { [key: string]: string };
    } = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };
    return this.fetchData(path, requestOptions);
  }

  private async postData(
    path: string,
    data: any,
  ): Promise<any> {
    const accessToken = localStorage.getItem('access_token');

    const myHeaders: { [key: string]: string } = {};
    if (accessToken) {
      myHeaders.Token = accessToken;
    }

    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value as string | Blob);
    }

    const requestOptions: {
      method: string;
      headers: { [key: string]: string };
      body: FormData;
    } = {
      method: 'POST',
      headers: myHeaders,
      body: formData,
    };

    return this.fetchData(path, requestOptions);
  }

  public async getUsers(page: number, limit: number): Promise<ApiResponse<IUser[]>> {
    const path = `/users?page=${page}&count=${limit}`;
    const response = await this.getData(path);

    return {
      ...response,
      data: mapApiUsersToIUsers(response.data.users),
    };
  }

  public async getPositions(): Promise<ApiResponse<IPosition[]>> {
    const response = await this.getData('/positions');

    return {
      ...response,
      data: mapApiPositionsToIPositions(response.data.positions),
    };
  }

  public async getToken(): Promise<ApiResponse<null>> {
    const response = await this.getData('/token');

    if (response.statusCode === 200) {
      localStorage.setItem('access_token', response.data.token);
    }

    return {
      ...response,
      data: null,
    };
  }

  public async signUp(data: ISignUpRequest): Promise<ApiResponse<null>> {
    const apiData = mapISignUpRequestToApiSignUpRequest(data);
    const response = await this.postData('/users', apiData);

    return {
      ...response,
      data: null,
    };
  }
}
