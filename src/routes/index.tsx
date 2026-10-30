import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/manual-do-imigrante" });
  },
  head: () => ({
    meta: [
      { title: "Manual do Imigrante – Reino Unido" },
      { name: "description", content: "Frases prontas em inglês britânico para a rotina da sua família no Reino Unido." },
      { property: "og:title", content: "Manual do Imigrante – Reino Unido" },
      { property: "og:description", content: "Frases prontas em inglês britânico para a rotina da sua família no Reino Unido." },
    ],
  }),
});
