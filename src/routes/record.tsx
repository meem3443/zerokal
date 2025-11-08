import { createFileRoute } from "@tanstack/react-router";
import RecordPage from "@/pages/RecordPage";

export const Route = createFileRoute("/record")({
  component: RecordPage,
});
