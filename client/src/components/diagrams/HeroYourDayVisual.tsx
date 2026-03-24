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

// Barrana brand colors
const NAVY = "#283891";
const MAGENTA = "#7E0F4A";
const GREY = "#7B7B7B";
const BORDER = "#E2E4ED";
const GREEN = "#0D9668"; // Barrana success green

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
        maxWidth: "540px",
        width: "100%",
        background: "white",
        borderRadius: "1rem",
        border: `1px solid ${BORDER}`,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        overflow: "hidden",
      }}
    >
      <style>{`
        .yourday-task { cursor: pointer; }
        .yourday-task:hover .yourday-task-text {
          text-decoration: line-through;
          color: ${MAGENTA};
          opacity: 0.6;
        }
      `}</style>

      {/* TOP — YOUR DAY NOW */}
      <div
        style={{
          background: "rgba(126,15,74,0.06)",
          padding: "0.625rem 1.5rem",
          borderBottom: `1px solid rgba(126,15,74,0.1)`,
        }}
      >
        <span
          style={{
            color: MAGENTA,
            fontSize: "0.6875rem",
            fontWeight: 700,
            textTransform: "uppercase" as const,
            letterSpacing: "0.1em",
          }}
        >
          Your Day Now
        </span>
      </div>

      <div style={{ padding: "1rem 1.5rem 0.75rem" }}>
        {/* 2-column grid: 8 items in 4 rows */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.375rem 1.25rem",
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
                padding: "0.3125rem 0",
                opacity: i < visibleItems ? 1 : 0,
                transform: i < visibleItems ? "translateX(0)" : "translateX(-8px)",
                transition: "opacity 0.25s ease, transform 0.25s ease",
              }}
            >
              <Icon size={14} color={MAGENTA} strokeWidth={1.8} style={{ flexShrink: 0, opacity: 0.6 }} />
              <span
                className="yourday-task-text"
                style={{
                  fontSize: "0.8125rem",
                  color: "#4A4A4A",
                  lineHeight: 1.35,
                  transition: "color 0.2s, text-decoration 0.2s, opacity 0.2s",
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "0.75rem",
            paddingTop: "0.625rem",
            borderTop: `1px solid ${BORDER}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            opacity: visibleItems >= 8 ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <span style={{ color: MAGENTA, fontSize: "0.6875rem", fontWeight: 600 }}>
            4+ hours on tasks that earn $0
          </span>
          <span style={{ color: GREY, fontSize: "0.6875rem", fontStyle: "italic" }}>
            Every. Single. Day.
          </span>
        </div>
      </div>

      {/* DIVIDER WITH BADGE */}
      <div
        style={{
          borderTop: `2px dashed rgba(40,56,145,0.18)`,
          position: "relative",
          height: "1px",
        }}
      >
        <div
          style={{
            background: NAVY,
            color: "white",
            fontSize: "0.75rem",
            fontWeight: 600,
            padding: "0.25rem 0.875rem",
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
          <Zap size={12} />
          After Barrana
        </div>
      </div>

      {/* BOTTOM — YOUR DAY AFTER */}
      <div
        style={{
          background: "rgba(13,150,104,0.05)",
          padding: "0.625rem 1.5rem",
          borderBottom: `1px solid rgba(13,150,104,0.1)`,
          marginTop: "1px",
        }}
      >
        <span
          style={{
            color: GREEN,
            fontSize: "0.6875rem",
            fontWeight: 700,
            textTransform: "uppercase" as const,
            letterSpacing: "0.1em",
          }}
        >
          Your Day After
        </span>
      </div>

      <div style={{ padding: "1rem 1.5rem 0.75rem" }}>
        {/* Single row of 4 icons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0.75rem",
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
                gap: "0.5rem",
                opacity: i < bottomVisible ? 1 : 0,
                transform: i < bottomVisible ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "0.625rem",
                  background: "rgba(13,150,104,0.08)",
                  border: `1px solid rgba(13,150,104,0.12)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={20} color={GREEN} strokeWidth={1.8} />
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#4A4A4A",
                  fontWeight: 600,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "0.75rem",
            paddingTop: "0.625rem",
            borderTop: `1px solid ${BORDER}`,
            display: "flex",
            justifyContent: "space-between",
            opacity: bottomVisible >= 4 ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <span style={{ color: GREEN, fontSize: "0.6875rem", fontWeight: 600 }}>
            {"\u2713"} The busywork runs itself
          </span>
          <span style={{ color: GREEN, fontSize: "0.6875rem", fontWeight: 600 }}>
            {"\u2713"} 4+ hours recovered
          </span>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          background: "rgba(40,56,145,0.03)",
          padding: "0.625rem 1.5rem",
          borderTop: `1px solid ${BORDER}`,
          textAlign: "center" as const,
          opacity: footerVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <span style={{ color: NAVY, fontSize: "0.75rem", fontWeight: 600 }}>
          Same tools. Same team. Different day.
        </span>
      </div>
    </div>
  );
}
