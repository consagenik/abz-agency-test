import ApiResponse from "./entities/ApiResponse";
import {IPosition, ISignUpRequest, IUser} from "../entities";

export default interface IApi {
  getUsers(page: number, limit: number): Promise<ApiResponse<IUser[]>>;
  getPositions(): Promise<ApiResponse<IPosition[]>>;
  getToken(): Promise<ApiResponse<null>>;
  signUp(data: ISignUpRequest): Promise<ApiResponse<null>>
}
