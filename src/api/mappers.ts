import {IPosition, ISignUpRequest, IUser} from "../entities";
import {ApiPosition, ApiUser} from "./entities";
import ApiSignUpRequest from "./entities/ApiSignUpRequest";

export const mapApiUserToIUser = (apiUser: ApiUser): IUser => ({
  id: apiUser.id,
  name: apiUser.name,
  position: apiUser.position,
  photo: apiUser.photo,
  email: apiUser.email,
  phone: apiUser.phone,
})

export const mapApiUsersToIUsers = (apiUsers: ApiUser[]): IUser[] => apiUsers.map(mapApiUserToIUser)

export const mapApiPositionToIPosition = (apiPosition: ApiPosition): IPosition => ({
  id: apiPosition.id,
  name: apiPosition.name
})

export const mapApiPositionsToIPositions = (apiPositions: ApiPosition[]): IPosition[] => apiPositions.map(mapApiPositionToIPosition)

export const mapISignUpRequestToApiSignUpRequest = (iSignUpRequest: ISignUpRequest): ApiSignUpRequest => ({
  name: iSignUpRequest.name,
  email: iSignUpRequest.email,
  phone: iSignUpRequest.phone,
  position_id: iSignUpRequest.positionId,
  photo: iSignUpRequest.photo
})
