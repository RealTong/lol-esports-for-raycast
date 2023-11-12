import { List, Icon, ActionPanel, Action } from "@raycast/api";
import { useCachedState, useFetch } from "@raycast/utils";
import { Event, League } from "./types";
import Filter from "./Filter";
import { getIcon, prettyDate } from "./utils";
import { useEffect } from "react";

export default function Command() {
  const apiKey = "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z";
  const { isLoading, data } = useFetch<{
    data: {
      schedule: {
        events: Event[];
      };
      pages: any;
    };
  }>("https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=zh-TW", {
    headers: {
      "x-api-key": apiKey,
    },
  });

  const { isLoading: isLoadingLeagues, data: dataLeagues } = useFetch<{
    data: {
      leagues: League[];
    };
  }>("https://esports-api.lolesports.com/persisted/gw/getLeagues?hl=zh-TW", {
    headers: {
      "x-api-key": apiKey,
    },
  });
  let eventList: Event[] = [];
  const [events, setEvents] = useCachedState<Event[]>("events", []);

  const [leagues, setLeagues] = useCachedState("leagues", dataLeagues?.data.leagues);

  const [filter, setFilter] = useCachedState("filter", "all");
  const [showingDetail, setShowingDetail] = useCachedState("showDetails", false);
  const onFilterChange = (value: string) => {
    setFilter(value);
  };

  const iconColor = {
    // completed: FFC107 橙黄色
    // inProgress: 28A745 绿色
    // notStarted: 6C757D 灰色
    completed: "#28A745",
    inProgress: "#FFC107",
    unstarted: "#6C757D",
  };

  useEffect(() => {
    let eventList = data?.data.schedule.events || [];
    // 对比赛进行过滤
    if (filter !== "all") {
        const filterLeague = leagues?.find((league) => league.id === filter);
        eventList = eventList.filter((event) => event.league.slug === filterLeague?.slug);
    } 
    // 对比赛进行排序
    eventList.sort((a, b) => {
      const dataA = new Date(a.startTime).getTime();
      const dataB = new Date(b.startTime).getTime();
      return dataB - dataA;
    });

    setEvents(eventList);
  }, [filter]);
  return (
    <List
      isShowingDetail={showingDetail}
      searchBarAccessory={<Filter leagueList={leagues} handleChange={onFilterChange} />}
    >
      <List.EmptyView title="No Result" />
      <List.Section title="Matches" key={"1"}>
        {events?.map((event: Event, index) => {
          const team1 = event.match.teams[0];
          const team2 = event.match.teams[1];
          const league = leagues?.find((league) => league.slug === event.league.slug) || {
            name: "Worlds",
            image: "http%3A%2F%2Fstatic.lolesports.com%2Fleagues%2F1592594612171_WorldsDarkBG.png",
          };
          const title =
            event.state === "completed"
              ? `${team1.code} ${team1.result.gameWins} - ${team2.result.gameWins} ${team2.code}`
              : `${event.blockName} ${team1.code} vs ${team2.code}`;

          return (
            <List.Item
              key={event.match.id}
              id={event.match.id}
              icon={{
                source: Icon.Dot,
                tintColor: iconColor[event.state],
              }}
              keywords={["T1"]}
              title={title}
              subtitle={prettyDate(event.startTime)}
              actions={
                <ActionPanel>
                  <Action
                    title="Show Details"
                    icon={Icon.CircleEllipsis}
                    onAction={() => setShowingDetail(!showingDetail)}
                  />
                  <Action title="Add Calendar" icon={Icon.Calendar} onAction={() => setShowingDetail(!showingDetail)} />
                  <Action
                    title="Open with Bilibili"
                    icon={Icon.Video}
                    onAction={() => setShowingDetail(!showingDetail)}
                  />
                  <Action
                    title="Open with YouTube"
                    icon={Icon.Video}
                    onAction={() => setShowingDetail(!showingDetail)}
                  />
                </ActionPanel>
              }
              accessories={[
                {
                  icon: getIcon(league.image),
                  tag: league.name,
                },
                {
                  icon: getIcon(team1.image),
                  text: team1.result.gameWins.toString(),
                },
                {
                  text: " : ",
                },
                {
                  icon: getIcon(team2.image),
                  text: team2.result.gameWins.toString(),
                },
              ]}
            />
          );
        })}
      </List.Section>
    </List>
  );
}
