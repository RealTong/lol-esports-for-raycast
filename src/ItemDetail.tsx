import { List } from "@raycast/api";

type Props = {
  team1: any;
  team2: any;
};
export default function ItemDetail() {
  const markdown = `
  <img src="https://static.lolesports.com/teams/1641202879910_3.png" width="100" />
${"T1"} vs ${"EDG"}
<img src="https://static.lolesports.com/teams/1698742459630_T1_Color_v2.png" width="100" />`;
  return (
    <List.Item.Detail
      markdown={markdown}
      metadata={
        <List.Item.Detail.Metadata>
          <List.Item.Detail.Metadata.Label title="Strategy" text={"BO 5"} />
          <List.Item.Detail.Metadata.Label
            title="League"
            text={"World Championship 2021"}
            icon="http://static.lolesports.com/leagues/1592594612171_WorldsDarkBG.png"
          />
          {/* 比赛时间 */}
          <List.Item.Detail.Metadata.Label title="Start Time" text="2021-10-05 12:00" />
          {/* 比赛状态 */}
          <List.Item.Detail.Metadata.TagList title="State">
            <List.Item.Detail.Metadata.TagList.Item text="Completed" color={"#28A745"} />
          </List.Item.Detail.Metadata.TagList>
          <List.Item.Detail.Metadata.Separator />
          <List.Item.Detail.Metadata.Link
            title="See match"
            text="YouTube"
            target="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />
        </List.Item.Detail.Metadata>
      }
    />
  );
}
