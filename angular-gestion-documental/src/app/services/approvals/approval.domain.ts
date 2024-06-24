export interface IApprovalDTO {
    idApproval?: number;
    reviewed? : boolean;
    approved? : boolean;
    grade?: number;
    comment? : string;
    idcontribution?: number;
    idSupervisor?: number;
  }
  
  export interface IApprovalResponse {
      data: IApprovalDTO
      message: string
  }
  
  