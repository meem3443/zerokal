export default function PurchaseFailModal({
  burnedCalories,
  remainingCalories,
  onFindOtherBread,
  onGoHome,
}: {
  burnedCalories: number;
  remainingCalories: number;
  onFindOtherBread: () => void;
  onGoHome: () => void;
}) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-sm mx-auto text-center space-y-5">
      <div className="text-6xl">🥖😢</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        아쉽지만 다음 기회에!
      </h2>
      <p>다른 빵을 찾아볼까요?</p>
      <div className="bg-gray-100 rounded-xl p-4 mt-4 space-y-1 text-left">
        <div className="flex justify-between text-blue-600 font-semibold">
          <span>이동으로 소모한 칼로리</span>
          <span>-{burnedCalories}kcal</span>
        </div>
        <div className="flex justify-between text-green-600 font-bold">
          <span>남은 목표</span>
          <span>{remainingCalories}kcal</span>
        </div>
      </div>
      <button
        onClick={onFindOtherBread}
        className="w-full rounded-xl bg-orange-500 py-4 text-white font-bold text-lg hover:bg-orange-600 transition"
      >
        다른 빵 찾기
      </button>
      <button
        onClick={onGoHome}
        className="w-full rounded-xl bg-gray-200 py-4 text-gray-700 font-semibold text-lg hover:bg-gray-300 transition"
      >
        홈으로
      </button>
    </div>
  );
}
