interface DeclinedProps {
  burnedCalories: number;
  remainingGoal: number;
  onFindBread?: () => void;
  onGoHome?: () => void;
}

export const Declined = ({
  burnedCalories,
  remainingGoal,
  onFindBread,
  onGoHome,
}: DeclinedProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-5xl mb-5">🥖😢</div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
          아쉽지만 다음 기회에!
        </h2>
        <p className="mb-7 text-gray-500">다른 빵을 찾아볼까요?</p>
        <div className="bg-gray-50 rounded-lg px-6 py-6 mb-8 text-center">
          <div className="mb-1 text-base text-gray-700">
            이동으로 소모한 칼로리{" "}
            <span className="text-blue-600 font-bold">
              -{burnedCalories}kcal
            </span>
          </div>
          <div className="text-base text-gray-700">
            남은 목표{" "}
            <span className="text-green-600 font-bold">
              {remainingGoal}kcal
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={onFindBread}
            className="w-full rounded-xl bg-orange-500 text-white text-lg font-bold py-4 text-center hover:bg-orange-600 transition"
          >
            다른 빵 찾기
          </button>
          <button
            onClick={onGoHome}
            className="w-full rounded-xl bg-gray-100 text-gray-800 text-lg font-semibold py-4 text-center hover:bg-gray-200 transition"
          >
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
};
