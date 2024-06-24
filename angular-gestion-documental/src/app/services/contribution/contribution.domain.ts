import { IApprovalDTO } from "../approvals/approval.domain";

export interface IContributionDTO {
  idcontribution?: number;
  idActivity?: number;
  idProfile? : number;
  comment : string;
  files?: string;
  date?: Date;
  approvals? : IApprovalDTO[]
}

export interface IContributionResponse {
    data: IContributionDTO
    message: string
}

