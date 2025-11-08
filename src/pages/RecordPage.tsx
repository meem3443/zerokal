import { useState } from "react";
import { useSearch } from "@tanstack/react-router";
import { useCalorieStore } from "@/store/calorieStore";

interface RecordPageSearch {
  placeName?: string;
  breadName?: string;
  time?: string;
  caloriesBurned?: string;
  intakeCalories?: string;
}

export default function RecordPage() {
  const {
    placeName = "성심당본점",
    breadName = "튀김소보로",
    time = "오전 02:51",
    caloriesBurned = "85",
  } = useSearch({ from: "/record" }) as RecordPageSearch;

  const caloriesBurnedNum = Number(caloriesBurned);

  // Zustand 스토어 사용
  const { setField } = useCalorieStore();

  const breads = [
    { name: "튀김소보로", calories: 350 },
    { name: "명란바게트", calories: 320 },
    { name: "부추빵", calories: 280 },
  ];

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([breadName]);

  const totalIntake = breads
    .filter((b) => selected.includes(b.name))
    .reduce((sum, b) => sum + b.calories, 0);

  const net = totalIntake - caloriesBurnedNum;

  // 기록 완료 버튼 클릭 시, 칼로리 스토어에 업데이트
  const handleComplete = () => {
    setField("consumed", (prev: number) => prev + totalIntake);
    setField("burned", (prev: number) => prev + caloriesBurnedNum);
    // 추가: 필요 시 알림, 페이지 이동 등 처리
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-8">
      <div className="max-w-md w-full mx-auto rounded-3xl bg-white shadow-lg mt-8 overflow-hidden">
        <h2 className="text-2xl font-bold text-gray-900 text-left p-6 pb-2">
          구매 기록
        </h2>
        <div className="bg-gray-50 p-4 rounded-xl mx-6 space-y-1 font-semibold text-gray-700">
          <div className="flex justify-between">
            <span>장소</span>
            <span>{placeName}</span>
          </div>
          <div className="flex justify-between">
            <span>선택한 빵</span>
            <span>{breadName}</span>
          </div>
          <div className="flex justify-between">
            <span>시간</span>
            <span>{time}</span>
          </div>
          <div className="flex justify-between text-blue-600">
            <span>소모 칼로리</span>
            <span className="font-semibold">-{caloriesBurnedNum}kcal</span>
          </div>
        </div>
        <div className="px-6 mt-6 mb-4">
          <div className="text-gray-800 font-semibold mb-1">구매 인증 사진</div>
          <label className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl py-8 flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 transition">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setPhotoUrl(URL.createObjectURL(file));
              }}
            />
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="구매 인증"
                className="w-28 h-28 object-cover rounded-xl"
              />
            ) : (
              <>
                <svg
                  className="w-10 h-10 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth={2}
                  />
                  <path
                    d="M4 16v-1a4 4 0 014-4h8a4 4 0 014 4v1"
                    stroke="currentColor"
                    strokeWidth={2}
                  />
                </svg>
                구매한 빵 사진 찍기 (선택)
              </>
            )}
          </label>
        </div>
        <div className="px-6 mb-2">
          <div className="font-bold text-lg mb-1">구매한 빵 선택</div>
          <div className="space-y-3">
            {breads.map((b) => (
              <label
                key={b.name}
                className="flex items-center gap-2 text-black"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(b.name)}
                  onChange={(e) => {
                    if (e.target.checked)
                      setSelected((arr) => [...arr, b.name]);
                    else setSelected((arr) => arr.filter((n) => n !== b.name));
                  }}
                  className="accent-orange-500 w-5 h-5"
                />
                <span>
                  {b.name} {b.calories}kcal
                </span>
              </label>
            ))}
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-orange-500 w-5 h-5" />
              <span className="text-black">기타</span>
            </label>
          </div>
        </div>
        <div className="bg-orange-50 rounded-xl mx-6 my-4 p-4 font-bold">
          <div className="text-orange-700 text-sm mb-2">칼로리 요약</div>
          <div className="flex justify-between">
            <span className="text-orange-600">총 섭취</span>
            <span className="text-orange-600">+{totalIntake}kcal</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-600">소모</span>
            <span className="text-blue-600">-{caloriesBurnedNum}kcal</span>
          </div>
          <div className="flex justify-between">
            <span className="text-orange-700">순 증가</span>
            <span className="text-orange-700">
              {net >= 0 ? "+" : ""}
              {net}kcal
            </span>
          </div>
        </div>
        <div className="flex gap-3 px-6 mb-4">
          <button className="flex-1 h-14 rounded-xl border border-gray-300 text-lg font-bold text-gray-700 bg-white hover:bg-gray-50">
            다른 빵 더 찾기
          </button>
          <button
            className="flex-1 h-14 rounded-xl bg-orange-500 text-white font-bold text-lg hover:bg-orange-600"
            onClick={handleComplete}
          >
            기록 완료
          </button>
        </div>
      </div>
    </div>
  );
}
