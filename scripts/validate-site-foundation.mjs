import { readFile } from "node:fs/promises";

const files = [
  "client/src/pages/Home.tsx",
  "client/src/pages/Contact.tsx",
  "client/src/components/Navigation.tsx",
  "client/src/components/Footer.tsx",
  "client/index.html",
];

const content = Object.fromEntries(
  await Promise.all(
    files.map(async (file) => [file, await readFile(file, "utf8")]),
  ),
);

const combined = Object.values(content).join("\n");
const errors = [];

for (const phrase of [
  "Book Free Audit",
  "free automation audit",
  "Show success even on failure",
  "maximum-scale",
  "%VITE_ANALYTICS_",
  "—",
]) {
  if (combined.toLowerCase().includes(phrase.toLowerCase())) {
    errors.push(`Disallowed public foundation phrase or token: ${phrase}`);
  }
}

const requiredCta = "Find the Workflow AI Should Fix First";
for (const file of files.slice(0, 4)) {
  if (!content[file].includes(requiredCta)) {
    errors.push(`${file} is missing the controlled CTA.`);
  }
}

if (!content["client/src/pages/Contact.tsx"].includes("htmlFor=")) {
  errors.push("Contact form labels are not programmatically associated.");
}

if (!content["client/src/components/Navigation.tsx"].includes("aria-controls=")) {
  errors.push("Mobile navigation is missing aria-controls.");
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Barrana site foundation controls passed.");
}
