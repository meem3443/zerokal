import { useEffect, useRef, useState } from "react";
import type { GoalPlace, Position } from "@/types/types";
import { useNavigate } from "@tanstack/react-router";

const REST_API_KEY = import.meta.env.VITE_KAKAO_MAP_REST_KEY;

async function fetchKakaoDirections({
  origin,
  destination,
  priority = "RECOMMEND",
}: {
  origin: Position;
  destination: Position;
  priority?: "RECOMMEND" | "SHORTEST" | "FASTEST";
}) {
  const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin.lng},${origin.lat}&destination=${destination.lng},${destination.lat}&priority=${priority}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `KakaoAK ${REST_API_KEY}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("경로 요청 실패");
  const data = await res.json();
  const roads = data.routes?.[0]?.sections?.[0]?.roads ?? [];
  const coords: Position[] = [];
  roads.forEach((road: any) => {
    for (let i = 0; i < road.vertexes.length; i += 2) {
      coords.push({ lng: road.vertexes[i], lat: road.vertexes[i + 1] });
    }
  });
  return coords;
}

function RouteGuidePage({ goal }: { goal: GoalPlace }) {
  const [currentPos, setCurrentPos] = useState<Position | null>(null);
  const [distance, setDistance] = useState<number>(goal.totalDistance);
  const [duration, setDuration] = useState<number>(0);
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
  const [routeCoords, setRouteCoords] = useState<Position[]>([]);

  const navigate = useNavigate();

  const mapRef = useRef<HTMLDivElement>(null);
  const mapObjRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const polylineRef = useRef<any>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setCurrentPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 },
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (!currentPos) return;
    fetchKakaoDirections({
      origin: currentPos,
      destination: goal.position,
      priority: "RECOMMEND",
    })
      .then(setRouteCoords)
      .catch((err) => {
        console.error(err);
        setRouteCoords([]);
      });
  }, [currentPos, goal]);

  useEffect(() => {
    if (!mapRef.current || !window.kakao?.maps) return;
    window.kakao.maps.load(() => {
      const center = new window.kakao.maps.LatLng(
        goal.position.lat,
        goal.position.lng,
      );
      const mapObj = new window.kakao.maps.Map(mapRef.current, {
        center,
        level: 5,
      });
      mapObjRef.current = mapObj;

      // 목적지 마커
      markerRef.current = new window.kakao.maps.Marker({
        position: center,
        map: mapObj,
        title: goal.name,
      });

      // 경로 폴리라인 준비(빈 상태)
      polylineRef.current = new window.kakao.maps.Polyline({
        strokeWeight: 6,
        strokeColor: "#fb923c",
        strokeOpacity: 0.9,
        strokeStyle: "solid",
      });
      polylineRef.current.setMap(mapObj);
    });
  }, [goal]);

  useEffect(() => {
    if (
      !currentPos ||
      !mapObjRef.current ||
      !markerRef.current ||
      !polylineRef.current
    )
      return;

    const currentLatLng = new window.kakao.maps.LatLng(
      currentPos.lat,
      currentPos.lng,
    );
    mapObjRef.current.setCenter(currentLatLng);

    // 현재 위치 마커 추가/이동
    if (!markerRef.current.currentMarker) {
      markerRef.current.currentMarker = new window.kakao.maps.Marker({
        position: currentLatLng,
        map: mapObjRef.current,
        image: new window.kakao.maps.MarkerImage(
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
          new window.kakao.maps.Size(36, 36),
        ),
      });
    } else {
      markerRef.current.currentMarker.setPosition(currentLatLng);
    }

    // Polyline 경로 적용
    if (routeCoords.length > 0) {
      const latLngPath = routeCoords.map(
        (c) => new window.kakao.maps.LatLng(c.lat, c.lng),
      );
      polylineRef.current.setPath(latLngPath);
    }

    // 거리 계산 (haversine formula)
    const toRad = (d: number) => (d * Math.PI) / 180;
    const R = 6371000;
    const dLat = toRad(goal.position.lat - currentPos.lat);
    const dLng = toRad(goal.position.lng - currentPos.lng);
    const lat1 = toRad(currentPos.lat);
    const lat2 = toRad(goal.position.lat);
    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
    const remain = 2 * R * Math.asin(Math.sqrt(h));
    setDistance(Math.round(remain));

    const avgSpeed = 1.25; // m/s (도보대략속도)
    setDuration(Math.round(remain / avgSpeed));

    const burned = Math.round(
      goal.totalCalories * (1 - remain / goal.totalDistance),
    );
    setCaloriesBurned(Math.max(0, Math.min(burned, goal.totalCalories)));
  }, [currentPos, goal, routeCoords]);

  function navigateHome() {
    navigate({ to: "/home" });
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-white pb-14 rounded-t-3xl drop-shadow-lg">
      <div className="relative w-full h-96 rounded-t-3xl overflow-hidden shadow-md">
        <div ref={mapRef} className="w-full h-full rounded-t-3xl" />
      </div>
      {/* 거리/시간/칼로리 안내 */}
      <div className="bg-white p-8 rounded-b-3xl shadow-lg flex flex-col items-center space-y-3 -mt-10 ">
        <span className="mt-10 text-6xl font-extrabold text-gray-900 tracking-tight">
          {distance.toLocaleString()}m
        </span>
        <span className="text-base text-gray-500">남음</span>
        <span className="text-sm text-gray-400">
          {duration ? `약 ${Math.round(duration / 60)}분 소요` : ""}
        </span>
        <div className="flex justify-between w-full mt-6 px-10">
          <div className="text-sm text-gray-400 font-medium">소모 칼로리</div>
          <div className="text-lg font-bold text-orange-600 tracking-wider">
            {caloriesBurned.toLocaleString()}/{goal.totalCalories}kcal
          </div>
        </div>
        <div className="flex gap-6 mt-8 w-full px-4">
          <button
            className="flex-1 py-4 rounded-2xl border border-gray-300 text-gray-700 font-semibold text-lg hover:bg-gray-100 transition"
            onClick={navigateHome}
          >
            경로 취소
          </button>
          <button
            className="flex-1 py-4 rounded-2xl border border-red-300 text-gray-700 font-semibold text-lg hover:bg-gray-100 transition"
            onClick={() =>
              navigate({
                to: "/route-end",
                search: {
                  placeName: goal.name,
                  burnedCalories: caloriesBurned,
                },
              })
            }
          >
            도착 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default RouteGuidePage;
