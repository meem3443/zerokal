import RouteGuidePage from "@/pages/RouteGuidePage";
import { useLocation } from "@tanstack/react-router";
import type { GoalPlace } from "@/types/types";

function RouteGuideWrapper() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const goal: GoalPlace = {
    name: params.get("name") || "",
    position: {
      lat: Number(params.get("lat")) || 0,
      lng: Number(params.get("lng")) || 0,
    },
    totalDistance: Number(params.get("totalDistance")) || 0,
    totalCalories: Number(params.get("totalCalories")) || 0,
  };
  return <RouteGuidePage goal={goal} />;
}
export default RouteGuideWrapper;
