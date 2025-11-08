import { createFileRoute } from "@tanstack/react-router";

import RouteEndPage from "@/pages/RouteEndPage";

export const Route = createFileRoute("/route-end")({
  component: RouteEndPage,
});
