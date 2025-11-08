import { useLocation, useNavigate } from "@tanstack/react-router";

export default function RouteEndPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params =
    search instanceof URLSearchParams ? search : new URLSearchParams(search);
  const placeName = params.get("placeName") || "성심당본점";
  const burnedCalories = Number(params.get("burnedCalories")) || 85;
  const breadName = params.get("breadName") || "튀김소보로";
  const time = params.get("time") || "오전 02:51";
  const intakeCalories = 350;

  // 실제 앱이면 빵 리스트를 별도 모듈/상태에서 관리
  const breads = [
    { name: "튀김소보로", calories: 350 },
    { name: "명란바게트", calories: 320 },
    { name: "부추빵", calories: 280 },
    // 필요시 더 추가
  ];

  return (
    <div className="h-full flex items-center justify-center bg-transparent ">
      <div className="w-full h-full bg-white  shadow-lg text-center p-8 relative">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6 shadow-inner">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-black">
          {placeName} 도착!
        </h1>
        <div className="bg-green-50 border border-green-300 rounded-lg py-3 px-6 mb-6 inline-flex items-center gap-2 text-green-700 font-semibold">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M13 17h-1v-6h-1m1-4h.01" />
          </svg>
          소모 칼로리: {burnedCalories}kcal
        </div>
        <p className="mb-8 text-gray-600">빵을 구매하셨나요?</p>
        <button
          onClick={() => {
            const payload = {
              placeName,
              breadName,
              time,
              caloriesBurned: burnedCalories,
              intakeCalories,
              breads,
            };
            console.log("Navigate with payload:", payload);
            // RouteEndPage.tsx
            navigate({
              to: "/record",
              search: {
                placeName,
                breadName,
                time,
                caloriesBurned: burnedCalories.toString(),
                intakeCalories: intakeCalories.toString(),
                // breads는 넘기지 않음
              },
            });
          }}
          className="w-full mb-3 rounded-xl bg-orange-500 text-white py-4 font-bold hover:bg-orange-600 transition"
        >
          네, 구매했어요 📸
        </button>

        <button
          //   onClick={() => navigate({ to: "/declined" })}
          className="w-full rounded-xl bg-gray-100 text-gray-700 py-4 font-semibold hover:bg-gray-200 transition"
        >
          아니요
        </button>
      </div>
    </div>
  );
}
