import { Rank } from '@interfaces/rank';

export interface GetUserInputDTO {
  userId: string;
}
export interface GetUserResDTO {
  user: PublicUser;
}

export interface PublicUser {
  twitchName: string;
  displayName?: string;
  rank: Rank;
  socials?: Record<string, string>;
  description?: string;
  voteThanksMsg?: string;
}
