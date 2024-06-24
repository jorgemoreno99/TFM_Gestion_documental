export interface IProfileDTO {
  idProfile?: number;
  email : string;
  password : string;
  name?: string;
  phone_number?: number;
}

export interface IProfileResponse {
    data: IProfileDTO
    message: string
}

