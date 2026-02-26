import React from "react";

export type Props = {
  delay: number;
  text: string;
  href: string;
};

const AutoRedirect: React.FC<Props> = ({ delay, text, href }) => {
  const [visible, setVisible] = React.useState(true);
  const [countdown, setCountdown] = React.useState<number>(delay);

  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (delay > 0) {
      timerRef.current = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clear();
            location.href = href;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return clear;
    }
  }, []);

  const clear = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const cancel = () => {
    clear();
    setVisible(false);
  };

  if (!visible || delay <= 0) {
    return null;
  }

  return (
    <div
      style={{
        padding: "0.75em 1em",
        border: "1px solid var(--sl-color-orange)",
        backgroundColor: "var(--sl-color-orange-low)",
      }}
    >
      {"页面将在 "}
      <span id="auto-redirect-countdown">{countdown}</span>
      {" 秒后自动跳转到"}
      <a href={href}>{text}</a>
      {"，您也可以手动"}
      <a
        style={{
          cursor: "pointer",
          color: "-webkit-link",
          textDecoration: "underline",
        }}
        onClick={cancel}
      >
        {"取消跳转"}
      </a>
      。
    </div>
  );
};

export default AutoRedirect;
