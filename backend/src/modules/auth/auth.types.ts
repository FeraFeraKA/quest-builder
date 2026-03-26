export interface IRegisterLoginBody {
  nickname: string;
  password: string;
}

export interface IRegisterEndpoint {
  nickname: string;
  passwordHash: string;
}

export type TNickname = string;

export type TUserId = string;

export type TToken = string;