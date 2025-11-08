import { useState, useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Search,
  SlidersHorizontal,
  Star,
  Flame,
  ArrowLeft,
  Footprints,
  Bike,
  Bus,
  AlertCircle,
  X,
} from "lucide-react";
import type { Position } from "../types/types";

interface Place {
  id: number;
  name: string;
  distance: string;
  walkTime: string;
  rating: number;
  reviewCount: number;
  calories: number;
  position: Position;
}

interface TransportOption {
  id: string;
  type: "walk" | "bike" | "bus";
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  time: string;
  distance: string;
  calories: number;
  recommended?: boolean;
}

interface Bread {
  id: number;
  name: string;
  price: number;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  image: string;
}

function ExplorePage() {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedTransport, setSelectedTransport] = useState<string>("walk");
  const [showBreadModal, setShowBreadModal] = useState(false);
  const [selectedBread, setSelectedBread] = useState<Bread | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const navigate = useNavigate();

  const places: Place[] = [
    {
      id: 1,
      name: "성심당본점",
      distance: "850m",
      walkTime: "도보 12분",
      rating: 4.8,
      reviewCount: 3240,
      calories: 85,
      position: { lat: 36.3274, lng: 127.427 },
    },
    {
      id: 2,
      name: "성심당 대전역점",
      distance: "1.2km",
      walkTime: "도보 16분",
      rating: 4.7,
      reviewCount: 1890,
      calories: 105,
      position: { lat: 36.3316, lng: 127.4348 },
    },
    {
      id: 3,
      name: "몽심",
      distance: "950m",
      walkTime: "도보 13분",
      rating: 4.9,
      reviewCount: 856,
      calories: 92,
      position: { lat: 36.329, lng: 127.43 },
    },
  ];

  const breads: Bread[] = [
    {
      id: 1,
      name: "튀김소보로",
      price: 2200,
      calories: 350,
      carbs: 45,
      protein: 8,
      fat: 15,
      image: "https://example.com/images/twigim-soboro.jpg",
    },
    {
      id: 2,
      name: "명란바게트",
      price: 4500,
      calories: 320,
      carbs: 38,
      protein: 12,
      fat: 14,
      image: "https://example.com/images/myeongran-baguette.jpg",
    },
    {
      id: 3,
      name: "부추빵",
      price: 2000,
      calories: 280,
      carbs: 35,
      protein: 9,
      fat: 12,
      image: "https://example.com/images/buchu-bread.jpg",
    },
  ];

  useEffect(() => {
    const loadKakaoMap = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;
        const center = new window.kakao.maps.LatLng(36.3504, 127.3845);
        const options = { center, level: 5 };
        const map = new window.kakao.maps.Map(mapRef.current, options);
        mapInstanceRef.current = map;
        places.forEach((place) => {
          const markerPosition = new window.kakao.maps.LatLng(
            place.position.lat,
            place.position.lng,
          );
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            map: map,
          });
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:12px;text-align:center;width:150px;">${place.name}</div>`,
          });
          window.kakao.maps.event.addListener(marker, "click", () => {
            infowindow.open(map, marker);
          });
        });
      });
    };
    if (window.kakao && window.kakao.maps) {
      loadKakaoMap();
    }
  });

  const handlePlaceClick = (place: Place) => {
    setSelectedPlace(place);
    if (mapInstanceRef.current) {
      const moveLatLon = new window.kakao.maps.LatLng(
        place.position.lat,
        place.position.lng,
      );
      mapInstanceRef.current.setCenter(moveLatLon);
      mapInstanceRef.current.setLevel(3);
    }
  };

  const getDistanceValue = (distanceStr: string) => {
    const num = parseFloat(distanceStr.replace(/[^\d.]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const getTransportOptions = (place: Place): TransportOption[] => [
    {
      id: "walk",
      type: "walk",
      icon: Footprints,
      label: "도보",
      time: place.walkTime.replace("도보 ", ""),
      distance: place.distance,
      calories: place.calories,
      recommended: true,
    },
    {
      id: "bike",
      type: "bike",
      icon: Bike,
      label: "자전거",
      time: "5분",
      distance: place.distance,
      calories: Math.round(place.calories * 0.7),
    },
    {
      id: "bus",
      type: "bus",
      icon: Bus,
      label: "버스",
      time: "8분",
      distance: "3정거장",
      calories: Math.round(place.calories * 0.12),
    },
  ];

  const handleBreadClick = (bread: Bread) => {
    setSelectedBread(bread);
    setShowBreadModal(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-20">
      {/* Search Header */}
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <button
            onClick={() => setShowBreadModal(true)}
            className="flex-1 flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3 hover:bg-gray-200 transition-colors"
          >
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900 font-medium">
              {selectedBread ? selectedBread.name : "빵을 선택해주세요"}
            </span>
          </button>
          <button className="p-3 bg-gray-100 rounded-2xl hover:bg-gray-200">
            <SlidersHorizontal className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
      {/* Map Section */}
      <div className="relative h-64">
        <div ref={mapRef} className="w-full h-full" />
        <button className="absolute top-4 left-4 bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2 hover:bg-gray-50 z-10">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
          <span className="text-sm font-medium text-gray-900">
            크게 지도 보기
          </span>
        </button>
      </div>
      {/* Places List */}
      <div className="flex-1 overflow-y-auto">
        <h2 className="px-4 py-4 text-xl font-bold text-gray-900">주변 맛집</h2>
        <div className="space-y-3 px-4 pb-4">
          {places.map((place) => (
            <div
              key={place.id}
              onClick={() => handlePlaceClick(place)}
              className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900">
                  {place.name}
                </h3>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-900">
                    {place.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({place.reviewCount.toLocaleString()})
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {place.distance} · {place.walkTime}
                </p>
                <div className="flex items-center gap-1 text-orange-500">
                  <Flame className="w-4 h-4" />
                  <span className="font-bold text-sm">
                    {place.calories}kcal
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transport Modal */}
      {selectedPlace && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setSelectedPlace(null)}
          />
          <div className="fixed inset-0 flex items-end justify-center z-50 pointer-events-none">
            <div
              className="bg-white rounded-t-3xl w-full max-w-2xl shadow-2xl pointer-events-auto animate-slide-up pb-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <button onClick={() => setSelectedPlace(null)} className="mb-4">
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900">
                  현재위치 → {selectedPlace.name} ({selectedPlace.distance})
                </h2>
              </div>
              {/* 교통수단 선택 */}
              <div className="p-6 space-y-3">
                {getTransportOptions(selectedPlace).map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedTransport(option.id)}
                      className={`w-full rounded-2xl p-4 border-2 transition-all ${
                        selectedTransport === option.id
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      } ${
                        option.recommended && selectedTransport !== option.id
                          ? "border-green-500 bg-green-50"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-full ${
                            selectedTransport === option.id
                              ? "bg-orange-100"
                              : option.recommended
                                ? "bg-green-100"
                                : "bg-gray-100"
                          }`}
                        >
                          <IconComponent
                            className={`w-6 h-6 ${
                              selectedTransport === option.id
                                ? "text-orange-600"
                                : option.recommended
                                  ? "text-green-600"
                                  : "text-gray-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg font-bold text-gray-900">
                              {option.label}
                            </span>
                            {option.recommended && (
                              <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full font-medium">
                                추천
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {option.time} · {option.distance}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-orange-500">
                            <Flame className="w-4 h-4" />
                            <span className="font-bold text-sm">
                              {option.calories}kcal
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">소모</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {selectedTransport === "walk" && (
                <div className="mx-6 mb-6 bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-orange-900">
                    <span className="font-bold">
                      도보 선택시 튀김소보로 350kcal 섭취 가능!
                    </span>
                  </p>
                </div>
              )}
              {/* 경로 안내 시작: TanStack Router navigate */}
              <div className="px-6">
                <button
                  onClick={() => {
                    navigate({
                      to: "/route-guide",
                      search: {
                        name: selectedPlace.name,
                        lat: selectedPlace.position.lat,
                        lng: selectedPlace.position.lng,
                        totalDistance: getDistanceValue(selectedPlace.distance),
                        totalCalories: selectedPlace.calories,
                      },
                    });
                    setSelectedPlace(null);
                  }}
                  className="w-full bg-orange-500 text-white rounded-2xl py-4 font-bold text-lg hover:bg-orange-600 transition-colors"
                >
                  경로 안내 시작
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bread Selection Modal */}
      {showBreadModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setShowBreadModal(false)}
          />
          <div className="fixed inset-0 flex justify-center items-center z-60 p-4">
            <div
              className="bg-white rounded-2xl max-w-md w-full p-6 overflow-y-auto max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">빵 선택</h2>
                <button
                  onClick={() => setShowBreadModal(false)}
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="mb-4 text-gray-600">어떤 빵을 먹고 싶으세요?</p>
              <div className="space-y-4">
                {breads.map((bread) => (
                  <button
                    key={bread.id}
                    onClick={() => handleBreadClick(bread)}
                    className={`w-full flex gap-4 items-center border rounded-xl p-4 hover:shadow-md transition-shadow ${
                      selectedBread?.id === bread.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <img
                      src={bread.image}
                      alt={bread.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 text-left">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {bread.name}
                        </h3>
                        <span className="text-orange-600 font-semibold text-lg">
                          {bread.price.toLocaleString()}원
                        </span>
                      </div>
                      <p className="text-gray-700 font-semibold mb-1">
                        {bread.calories}kcal
                      </p>
                      <div className="flex gap-4 text-sm text-gray-600 font-medium">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                          탄수화물 {bread.carbs}g
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                          단백질 {bread.protein}g
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" />
                          지방 {bread.fat}g
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowBreadModal(false)}
                className="mt-6 w-full py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition font-semibold"
              >
                닫기
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ExplorePage;
