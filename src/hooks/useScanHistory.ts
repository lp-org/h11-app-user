import { useQuery } from "@tanstack/react-query";

import { QrInfoWithKey, useScanHistoryStore } from "store/useScanHistoryStore";

interface scanHistoryProps {
  queryName?: string | null;
}

export function useScanHistoryList({ queryName }: scanHistoryProps) {
  const historyList = useScanHistoryStore((state) => state.scanHistoryList);

  return useQuery({
    queryKey: ["scanHistory", queryName],

    queryFn: (): QrInfoWithKey[] =>
      historyList.filter((el) => {
        if (queryName) {
          return (
            el.bc_prd_name.toLowerCase().search(queryName.toLowerCase()) >= 0
          );
        } else return true;
      }) || [],
    enabled: true,
  });
}
