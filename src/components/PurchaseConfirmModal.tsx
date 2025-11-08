export default function PurchaseConfirmModal({
  burnedCalories,
  placeName,
  onPurchaseConfirm,
  onPurchaseCancel,
}: {
  burnedCalories: number;
  placeName: string;
  onPurchaseConfirm: () => void;
  onPurchaseCancel: () => void;
}) {
  return (
    <div className="p-6 bg-white rounded-3xl shadow-lg w-full max-w-sm mx-auto text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-green-100 mx-auto flex justify-center items-center text-green-600">
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M5 13l4 4L19 7"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{placeName} 도착!</h2>
      <div className="bg-green-50 border border-green-300 rounded-lg py-2 px-4 text-green-700 flex items-center justify-center gap-1 font-medium">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M13 17h-1v-6h-1m1-4h.01"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        소모 칼로리: {burnedCalories}kcal
      </div>
      <div>빵을 구매하셨나요?</div>
      <button
        onClick={onPurchaseConfirm}
        className="w-full rounded-xl bg-orange-500 py-4 text-white font-bold text-lg hover:bg-orange-600 transition"
      >
        네, 구매했어요 📸
      </button>
      <button
        onClick={onPurchaseCancel}
        className="w-full rounded-xl bg-gray-200 py-4 text-gray-800 font-semibold text-lg hover:bg-gray-300 transition"
      >
        아니요
      </button>
    </div>
  );
}
