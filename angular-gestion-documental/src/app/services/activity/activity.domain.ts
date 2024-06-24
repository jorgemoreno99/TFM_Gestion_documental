import { IContributionDTO } from "../contribution/contribution.domain";

export interface IActivityDTO {
  idactivity?: number;
  subject : string;
  description : string;
  due_date?: Date;
  idCreator?: number;
  creator? : string;
  contributions : any[]
}

export interface IActivityResponse {
    data: IActivityDTO
    message: string
}

