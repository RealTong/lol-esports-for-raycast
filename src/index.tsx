import { useCachedState, useFetch } from "@raycast/utils";

export default function Command() {
    const { isLoading, data } = useFetch('https://esports-api.lolesports.com/persisted/gw/getSchedule?hl=zh-TW&leagueId=98767975604431411')

    const [filter, setFilter] = useCachedState("filter", "all");
    return (
        <div>
            <h1>Command</h1>
        </div>
    )
}