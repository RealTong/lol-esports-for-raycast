export type Event = {
  blockName: string;
  startTime: string;
  state: string;
  type: string;
  league: League;
  matches: Match[];
};

export type Match = {
  id: string;
  startTime: string;
  state: string;
  type: string;
  flags: string[];
  strategy: {
    type: string;
    count: number;
  };
  teams: Team[];
};
export type Team = {
  code: string;
  image: string;
  name: string;
  record: {
    wins: number;
    losses: number;
  };
  result: {
    gameWins: number;
    outcome: string;
  };
};

export type League = {
  name: string;
  slug: string;
};
