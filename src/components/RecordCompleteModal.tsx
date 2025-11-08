export default function RecordCompleteModal({
  intakeCalories,
  burnedCalories,
  remainingCalories,
  onFindOtherBread,
  onViewTodayRecords,
  onGoHome,
}: {
  intakeCalories: number;
  burnedCalories: number;
  remainingCalories: number;
  onFindOtherBread: () => void;
  onViewTodayRecords: () => void;
  onGoHome: () => void;
}) {
  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg w-full max-w-sm mx-auto text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-green-200 mx-auto flex justify-center items-center">
        <svg
          className="w-10 h-10 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <svg
          className="w-7 h-7 text-orange-500 absolute ml-6 mt-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 10v6h-6"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">기록 완료!</h1>
      <div className="bg-gray-100 rounded-xl p-4 space-y-2 font-semibold text-lg text-gray-700">
        <div className="flex justify-between">
          <span>섭취</span>
          <span className="text-orange-500">+{intakeCalories}kcal</span>
        </div>
        <div className="flex justify-between">
          <span>도보 소모</span>
          <span className="text-blue-600">-{burnedCalories}kcal</span>
        </div>
        <hr className="border-gray-300" />
        <div className="flex justify-between text-green-600">
          <span>남은 목표</span>
          <span className="font-bold">{remainingCalories}kcal</span>
        </div>
      </div>
      <button
        onClick={onFindOtherBread}
        className="w-full rounded-xl bg-orange-500 py-4 text-white font-bold text-lg hover:bg-orange-600 transition"
      >
        다른 빵 찾기 🍞
      </button>
      <button
        onClick={onViewTodayRecords}
        className="w-full rounded-xl bg-green-600 py-4 text-white font-bold text-lg hover:bg-green-700 transition"
      >
        오늘 기록 보기
      </button>
      <button
        onClick={onGoHome}
        className="w-full rounded-xl bg-gray-200 py-4 text-gray-800 font-semibold text-lg hover:bg-gray-300 transition"
      >
        홈으로
      </button>
    </div>
  );
}
