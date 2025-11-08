import { createFileRoute } from "@tanstack/react-router";
import RouteGuideWrapper from "@/components/RouteGuideWrapper";

export const Route = createFileRoute("/route-guide")({
  component: RouteGuideWrapper,
});
