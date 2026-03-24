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
  { Icon: Mail, text: "Reply to enquiry from last night" },
  { Icon: Phone, text: "Call back missed lead (3rd attempt)" },
  { Icon: FileText, text: "Copy form data into CRM" },
  { Icon: Calendar, text: "Reschedule Tuesday appointment" },
  { Icon: Clock, text: "Send appointment reminders (7 clients)" },
  { Icon: Send, text: "Chase invoice \u2014 14 days overdue" },
  { Icon: FileSearch, text: "Follow up on missing documents" },
  { Icon: ClipboardList, text: "Update spreadsheet with today\u2019s numbers" },
];

const bottomItems = [
  { Icon: Users, text: "Client consultations and meetings" },
  { Icon: TrendingUp, text: "Business development and sales" },
  { Icon: Coffee, text: "Lunch that is not at your desk" },
  { Icon: Home, text: "Home before your kids go to bed" },
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

    // Stagger top 8 items at 100ms intervals
    for (let i = 1; i <= 8; i++) {
      timers.push(
        setTimeout(() => setVisibleItems(i), i * 100)
      );
    }

    // After all 8: 300ms pause then show badge
    const badgeDelay = 8 * 100 + 300;
    timers.push(setTimeout(() => setBadgeVisible(true), badgeDelay));

    // Then stagger bottom 4 at 120ms intervals
    for (let i = 1; i <= 4; i++) {
      timers.push(
        setTimeout(() => setBottomVisible(i), badgeDelay + 200 + i * 120)
      );
    }

    // Then footer
    timers.push(
      setTimeout(() => setFooterVisible(true), badgeDelay + 200 + 4 * 120 + 200)
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

      {/* TOP HALF - YOUR DAY NOW */}
      <div
        style={{
          background: "#FEF2F2",
          padding: "0.75rem 1.5rem",
          borderBottom: "1px solid #FECACA",
        }}
      >
        <span
          style={{
            color: "#F87171",
            fontSize: "0.6875rem",
            fontWeight: 600,
            textTransform: "uppercase" as const,
            letterSpacing: "0.1em",
          }}
        >
          YOUR DAY NOW
        </span>
      </div>

      <div style={{ padding: "1rem 1.5rem" }}>
        {topTasks.map(({ Icon, text }, i) => (
          <div
            key={i}
            className="yourday-task"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.5rem 0",
              cursor: "pointer",
              opacity: i < visibleItems ? 1 : 0,
              transform: i < visibleItems ? "translateX(0)" : "translateX(-10px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <Icon size={16} color={RED_LIGHT} style={{ flexShrink: 0 }} />
            <span
              className="yourday-task-text"
              style={{
                fontSize: "0.875rem",
                color: "#4A4A4A",
                transition: "color 0.2s, text-decoration 0.2s",
              }}
            >
              {text}
            </span>
          </div>
        ))}

        <div
          style={{
            marginTop: "0.75rem",
            paddingTop: "0.75rem",
            borderTop: "1px solid #F3F4F6",
            display: "flex",
            justifyContent: "space-between",
            opacity: visibleItems >= 8 ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <span style={{ color: "#F87171", fontSize: "0.75rem", fontWeight: 500 }}>
            4+ hours on tasks that earn $0
          </span>
          <span style={{ color: RED_LIGHT, fontSize: "0.75rem" }}>
            Every. Single. Day.
          </span>
        </div>
      </div>

      {/* DIVIDER WITH BADGE */}
      <div
        style={{
          borderTop: "2px dashed rgba(40,56,145,0.2)",
          position: "relative",
          margin: "0",
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
          }}
        >
          <Zap size={12} />
          After Barrana
        </div>
      </div>

      {/* BOTTOM HALF - YOUR DAY AFTER */}
      <div
        style={{
          background: "#F0FDF4",
          padding: "0.75rem 1.5rem",
          borderBottom: "1px solid #BBF7D0",
        }}
      >
        <span
          style={{
            color: GREEN,
            fontSize: "0.6875rem",
            fontWeight: 600,
            textTransform: "uppercase" as const,
            letterSpacing: "0.1em",
          }}
        >
          YOUR DAY AFTER
        </span>
      </div>

      <div style={{ padding: "1rem 1.5rem" }}>
        {bottomItems.map(({ Icon, text }, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.5rem 0",
              opacity: i < bottomVisible ? 1 : 0,
              transform: i < bottomVisible ? "translateX(0)" : "translateX(-10px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <Icon size={16} color={GREEN} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: "0.875rem", color: "#4A4A4A", fontWeight: 500 }}>
              {text}
            </span>
          </div>
        ))}

        <div
          style={{
            marginTop: "0.75rem",
            paddingTop: "0.75rem",
            borderTop: "1px solid #F3F4F6",
            display: "flex",
            justifyContent: "space-between",
            opacity: bottomVisible >= 4 ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <span style={{ color: GREEN, fontSize: "0.75rem", fontWeight: 500 }}>
            {"\u2713"} The busywork runs itself
          </span>
          <span style={{ color: GREEN, fontSize: "0.75rem", fontWeight: 500 }}>
            {"\u2713"} 4+ hours recovered
          </span>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          background: "#F9FAFB",
          padding: "0.75rem 1.5rem",
          borderTop: "1px solid #F3F4F6",
          textAlign: "center" as const,
          opacity: footerVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <span style={{ color: "#7B7B7B", fontSize: "0.75rem" }}>
          Same tools. Same team. Different day.
        </span>
      </div>
    </div>
  );
}
