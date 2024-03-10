import ApiUser from "./ApiUser";

export default interface ApiGetUsersResponse {
  users: ApiUser[];
  total_pages: number;
  success: boolean;
}
