import React from "react";

export type Props = {
  tag: string;
  today: string;
  total: string;
  ok: string;
  error: string;
  loading: string;
};

type State = "ok" | "error" | "loading";

type Data = {
  today: string;
  total: string;
};

const HitsInfo: React.FC<Props> = ({
  tag,
  today: todayLabel,
  total: totalLabel,
  ok,
  error,
  loading,
}) => {
  const [state, setState] = React.useState<State>("loading");
  const [data, setData] = React.useState<Data | null>(null);
  React.useEffect(() => {
    const hitsUrl = new URL("https://hits.zkitefly.eu.org");
    hitsUrl.searchParams.set("tag", tag);

    fetch(hitsUrl, { method: "HEAD" })
      .then((response) => {
        if (response.status === 200) {
          const { headers } = response;
          const total = headers.get("X-Total-Hits");
          const today = headers.get("X-Today-Hits");
          if (total !== null && today !== null) {
            setData({ total, today });
            setState("ok");
            return;
          }
        }
        setState("error");
      })
      .catch(() => {
        setState("error");
      });
  }, []);

  if (data === null) {
    return <>{state === "ok" ? ok : state === "error" ? error : loading}</>;
  }

  return (
    <>
      <span title={todayLabel}>{data.today}</span>
      {" / "}
      <span title={totalLabel}>{data.total}</span>
    </>
  );
};

export default HitsInfo;
