import { List, Icon, ActionPanel, Action } from "@raycast/api";
import { useCachedState, useFetch } from "@raycast/utils";
import { Event } from "./types";
import Filter from "./Filter";
import { getIcon, prettyDate } from "./utils";

export default function Command() {
  const { isLoading, data } = useFetch<{
    data: {
      schedule: {
        events: Event[];
      };
      pages: any;
    };
  }>("https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=zh-TW&leagueId=98767975604431411", {
    headers: {
      "x-api-key": "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z",
    },
  });
  const [events, setEvents] = useCachedState("matches", data?.data.schedule.events);

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
  return (
    <List
      isShowingDetail={showingDetail}
      isLoading={isLoading}
      searchBarAccessory={<Filter handleChange={onFilterChange} />}
    >
      <List.EmptyView title="No Result" />
      <List.Section title="Matches" key={"1"}>
        {events?.map((event: Event, index) => {
          const team1 = event.match.teams[0];
          const team2 = event.match.teams[1];

          return (
            <List.Item
              key={event.match.id}
              id={event.match.id}
              icon={{
                source: Icon.Dot,
                tintColor: iconColor[event.state],
              }}
              keywords={["T1"]}
              title={`${team1.code} vs ${team2.code}`}
              subtitle={prettyDate(event.startTime)}
              actions={
                <ActionPanel>
                  <Action title="Show Details" onAction={() => setShowingDetail(!showingDetail)} />
                  <Action title="Add Calendar" onAction={() => setShowingDetail(!showingDetail)} />
                  <Action title="Open Bilibili" onAction={() => setShowingDetail(!showingDetail)} />
                  <Action title="Open YouTube" onAction={() => setShowingDetail(!showingDetail)} />
                </ActionPanel>
              }
              accessories={[
                {
                  icon: getIcon('http%3A%2F%2Fstatic.lolesports.com%2Fleagues%2F1592594612171_WorldsDarkBG.png'),
                  tag: "Worlds 2023",
                },
                {
                  icon: getIcon(team1.image),
                },
                {
                  icon: getIcon(team2.image),
                },
              ]}
            />
          );
        })}
      </List.Section>
    </List>
  );
}
