export interface IRegisterLoginBody {
  nickname: string;
  password: string;
}

export interface IRegisterLoginEndpoint {
  nickname: string;
  passwordHash: string;
}

export type TNickname = string;