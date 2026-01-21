export interface CreateRolesDto {
  name: string;
}

export interface UpdateRoleDto {
  name: string;
}

export interface RolesDto {
  roleId: number;
  name: string;
  users: [string]
}
