interface CompleteProps {
  breadName: string;
  totalIntake: number;
  totalBurned: number;
  remainingGoal: number;
  onFindBread?: () => void;
  onViewRecords?: () => void;
  onGoHome?: () => void;
}

export const Complete = ({
  breadName,
  totalIntake,
  totalBurned,
  remainingGoal,
  onFindBread,
  onViewRecords,
  onGoHome,
}: CompleteProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">✔️🥖</div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            기록이 완료되었습니다!
          </h1>
        </div>
        <div className="bg-orange-50 rounded-lg px-6 py-6 mb-8 text-center shadow-sm">
          <div className="mb-2 text-orange-700 font-bold text-lg">
            {breadName} {totalIntake}kcal 섭취
          </div>
          <div className="mb-2 text-blue-600 font-semibold">
            도보 {totalBurned}kcal 소모
          </div>
          <div className="mt-1 text-green-600 font-bold">
            남은 목표: {remainingGoal}kcal
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={onFindBread}
            className="w-full rounded-xl bg-orange-500 text-white text-lg font-bold py-4 text-center hover:bg-orange-600 transition"
          >
            다른 빵 찾으러 가기 🍞
          </button>
          <button
            onClick={onViewRecords}
            className="w-full rounded-xl bg-green-600 text-white text-lg font-bold py-4 text-center hover:bg-green-700 transition"
          >
            오늘의 기록 보기
          </button>
          <button
            onClick={onGoHome}
            className="w-full rounded-xl bg-gray-100 text-gray-800 text-lg font-semibold py-4 text-center hover:bg-gray-200 transition"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};
export default Complete;
