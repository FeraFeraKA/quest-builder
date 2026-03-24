export interface RegisterLoginBody {
  nickname: string;
  password: string;
}

export interface RegisterLoginEndpoint {
  nickname: string;
  passwordHash: string;
}
