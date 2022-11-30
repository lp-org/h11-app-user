import { useQuery } from "@tanstack/react-query";

import { useScanHistoryStore } from "store/useScanHistoryStore";

export function useScanHistoryList() {
  const historyList = useScanHistoryStore((state) => state.scanHistoryList);

  return useQuery({
    queryKey: ["scanHistory"],
    queryFn: () => [...historyList],
    enabled: historyList.length > 0,
  });
}
