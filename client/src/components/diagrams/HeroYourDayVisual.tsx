import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  FileText,
  Calendar,
  Clock,
  Send,
  FileSearch,
  ClipboardList,
  Users,
  TrendingUp,
  Coffee,
  Home,
  Zap,
} from "lucide-react";

const RED_LIGHT = "#FCA5A5";
const GREEN = "#22C55E";
const NAVY = "#283891";

const topTasks = [
  { Icon: Mail, text: "Reply to enquiry" },
  { Icon: Phone, text: "Call back missed lead" },
  { Icon: FileText, text: "Copy data into CRM" },
  { Icon: Calendar, text: "Reschedule appointment" },
  { Icon: Clock, text: "Send reminders (7)" },
  { Icon: Send, text: "Chase overdue invoice" },
  { Icon: FileSearch, text: "Follow up documents" },
  { Icon: ClipboardList, text: "Update spreadsheet" },
];

const bottomItems = [
  { Icon: Users, label: "Clients" },
  { Icon: TrendingUp, label: "Growth" },
  { Icon: Coffee, label: "Lunch" },
  { Icon: Home, label: "Home" },
];

export default function HeroYourDayVisual() {
  const [visibleItems, setVisibleItems] = useState(0);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(0);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setVisibleItems(8);
      setBadgeVisible(true);
      setBottomVisible(4);
      setFooterVisible(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 1; i <= 8; i++) {
      timers.push(setTimeout(() => setVisibleItems(i), i * 80));
    }

    const badgeDelay = 8 * 80 + 250;
    timers.push(setTimeout(() => setBadgeVisible(true), badgeDelay));

    for (let i = 1; i <= 4; i++) {
      timers.push(
        setTimeout(() => setBottomVisible(i), badgeDelay + 150 + i * 100)
      );
    }

    timers.push(
      setTimeout(() => setFooterVisible(true), badgeDelay + 150 + 4 * 100 + 150)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      style={{
        maxWidth: "480px",
        width: "100%",
        background: "white",
        borderRadius: "1rem",
        border: "1px solid #E2E4ED",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      <style>{`
        .yourday-task:hover .yourday-task-text {
          text-decoration: line-through;
          color: #FCA5A5;
        }
      `}</style>

      {/* TOP — YOUR DAY NOW */}
      <div
        style={{
          background: "#FEF2F2",
          padding: "0.5rem 1.25rem",
          borderBottom: "1px solid #FECACA",
        }}
      >
        <span
          style={{
            color: "#F87171",
            fontSize: "0.625rem",
            fontWeight: 600,
            textTransform: "uppercase" as const,
            letterSpacing: "0.1em",
          }}
        >
          Your Day Now
        </span>
      </div>

      <div style={{ padding: "0.75rem 1.25rem 0.625rem" }}>
        {/* 2-column grid: 8 items in 4 rows */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.25rem 1rem",
          }}
        >
          {topTasks.map(({ Icon, text }, i) => (
            <div
              key={i}
              className="yourday-task"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.25rem 0",
                cursor: "pointer",
                opacity: i < visibleItems ? 1 : 0,
                transform: i < visibleItems ? "translateX(0)" : "translateX(-8px)",
                transition: "opacity 0.25s ease, transform 0.25s ease",
              }}
            >
              <Icon size={13} color={RED_LIGHT} style={{ flexShrink: 0 }} />
              <span
                className="yourday-task-text"
                style={{
                  fontSize: "0.75rem",
                  color: "#4A4A4A",
                  lineHeight: 1.3,
                  transition: "color 0.2s, text-decoration 0.2s",
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "0.5rem",
            paddingTop: "0.5rem",
            borderTop: "1px solid #F3F4F6",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: visibleItems >= 8 ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <span style={{ color: "#F87171", fontSize: "0.625rem", fontWeight: 500 }}>
            4+ hours on tasks that earn $0
          </span>
          <span style={{ color: RED_LIGHT, fontSize: "0.625rem" }}>
            Every. Single. Day.
          </span>
        </div>
      </div>

      {/* DIVIDER WITH BADGE */}
      <div
        style={{
          borderTop: "2px dashed rgba(40,56,145,0.2)",
          position: "relative",
          height: "1px",
        }}
      >
        <div
          style={{
            background: NAVY,
            color: "white",
            fontSize: "0.6875rem",
            fontWeight: 600,
            padding: "0.2rem 0.75rem",
            borderRadius: "2rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: badgeVisible
              ? "translate(-50%, -50%) scale(1)"
              : "translate(-50%, -50%) scale(0.8)",
            whiteSpace: "nowrap" as const,
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            opacity: badgeVisible ? 1 : 0,
            transition: "opacity 0.2s ease, transform 0.2s ease",
            zIndex: 1,
          }}
        >
          <Zap size={11} />
          After Barrana
        </div>
      </div>

      {/* BOTTOM — YOUR DAY AFTER */}
      <div
        style={{
          background: "#F0FDF4",
          padding: "0.5rem 1.25rem",
          borderBottom: "1px solid #BBF7D0",
          marginTop: "1px",
        }}
      >
        <span
          style={{
            color: GREEN,
            fontSize: "0.625rem",
            fontWeight: 600,
            textTransform: "uppercase" as const,
            letterSpacing: "0.1em",
          }}
        >
          Your Day After
        </span>
      </div>

      <div style={{ padding: "0.875rem 1.25rem 0.625rem" }}>
        {/* Single row of 4 icons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0.5rem",
            textAlign: "center" as const,
          }}
        >
          {bottomItems.map(({ Icon, label }, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                gap: "0.375rem",
                opacity: i < bottomVisible ? 1 : 0,
                transform: i < bottomVisible ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "0.5rem",
                  background: "rgba(34,197,94,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={18} color={GREEN} />
              </div>
              <span
                style={{
                  fontSize: "0.6875rem",
                  color: "#4A4A4A",
                  fontWeight: 500,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "0.625rem",
            paddingTop: "0.5rem",
            borderTop: "1px solid #F3F4F6",
            display: "flex",
            justifyContent: "space-between",
            opacity: bottomVisible >= 4 ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <span style={{ color: GREEN, fontSize: "0.625rem", fontWeight: 500 }}>
            {"\u2713"} The busywork runs itself
          </span>
          <span style={{ color: GREEN, fontSize: "0.625rem", fontWeight: 500 }}>
            {"\u2713"} 4+ hours recovered
          </span>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          background: "#F9FAFB",
          padding: "0.5rem 1.25rem",
          borderTop: "1px solid #F3F4F6",
          textAlign: "center" as const,
          opacity: footerVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <span style={{ color: "#7B7B7B", fontSize: "0.6875rem" }}>
          Same tools. Same team. Different day.
        </span>
      </div>
    </div>
  );
}
