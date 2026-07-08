import React from "react";

// Lucide-style inline icons (stroke 2, round caps) — the house icon set.
// Substituted from the Lucide open-source set; see ICONOGRAPHY in the design
// system readme. Swap in the real package if the site later standardizes on one.
const ico = (paths) => (props) =>
  React.createElement(
    "svg",
    {
      width: props.size || 18,
      height: props.size || 18,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: props.strokeWidth || 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: props.style,
      "aria-hidden": "true",
    },
    paths.map((d, i) => React.createElement("path", { key: i, d })),
  );

export const IconCheck = ico(["M20 6 9 17l-5-5"]);
export const IconArrowRight = ico(["M5 12h14", "m12 5 7 7-7 7"]);
export const IconArrowUpRight = ico(["M7 7h10v10", "M7 17 17 7"]);

export const IconGitHub = (props) =>
  React.createElement(
    "svg",
    {
      width: props.size || 18,
      height: props.size || 18,
      viewBox: "0 0 24 24",
      fill: "currentColor",
      style: props.style,
      "aria-hidden": "true",
    },
    React.createElement("path", {
      d: "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.9c-2.78.62-3.37-1.2-3.37-1.2-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z",
    }),
  );

export const IconMail = (props) =>
  React.createElement(
    "svg",
    {
      width: props.size || 18,
      height: props.size || 18,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: props.strokeWidth || 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: props.style,
      "aria-hidden": "true",
    },
    React.createElement("rect", { width: 20, height: 16, x: 2, y: 4, rx: 2 }),
    React.createElement("path", {
      d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
    }),
  );

export const IconMoon = ico(["M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"]);

export const IconSun = (props) =>
  React.createElement(
    "svg",
    {
      width: props.size || 18,
      height: props.size || 18,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: props.strokeWidth || 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: props.style,
      "aria-hidden": "true",
    },
    React.createElement("circle", { cx: 12, cy: 12, r: 4 }),
    React.createElement("path", {
      d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4",
    }),
  );

export const IconClock = (props) =>
  React.createElement(
    "svg",
    {
      width: props.size || 18,
      height: props.size || 18,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: props.strokeWidth || 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: props.style,
      "aria-hidden": "true",
    },
    React.createElement("circle", { cx: 12, cy: 12, r: 10 }),
    React.createElement("path", { d: "M12 6v6l4 2" }),
  );
