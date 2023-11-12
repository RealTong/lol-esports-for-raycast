export type Event = {
  blockName: string;
  startTime: string;
  state: "completed" | "inProgress" | "unstarted";
  type: string;
  league: {
    name: string;
    slug: string;
  };
  match: Match;
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
  id: string;
  image: string;
  name: string;
  priority: number;
  region: string;
  slug: string;
  displayPriority: {
    position: number;
    status: "selected" | "force_selected";
  };
};
