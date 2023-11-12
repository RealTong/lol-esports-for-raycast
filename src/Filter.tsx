import { List } from "@raycast/api";

function Filter({ handleChange }: { handleChange: (v: string) => void }) {
  return (
    <List.Dropdown onChange={handleChange} tooltip="Select Filter">
      <List.Dropdown.Item title="Worlds" value="worlds" />
      <List.Dropdown.Item title="LPL" value="lpl" />
      <List.Dropdown.Item title="LCK" value="lck" />
      <List.Dropdown.Item title="All" value="all" />
    </List.Dropdown>
  );
}

export default Filter;
