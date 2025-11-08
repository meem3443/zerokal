import { useState } from "react";
import { Bell, Edit2, X } from "lucide-react";
import { useCalorieStore } from "@/store/calorieStore";

function HomePage() {
  const { data, setField } = useCalorieStore();
  const [modalType, setModalType] = useState<
    "goal" | "consumed" | "burned" | null
  >(null);
  const [inputValue, setInputValue] = useState("");

  const remaining = data.goal - data.consumed + data.burned;
  const progress = ((data.consumed - data.burned) / data.goal) * 100;

  const openModal = (type: "goal" | "consumed" | "burned") => {
    setModalType(type);
    setInputValue(data[type].toString());
  };

  const closeModal = () => {
    setModalType(null);
    setInputValue("");
  };

  const handleSave = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value) && value >= 0 && modalType) {
      setField(modalType, value);
    }
    closeModal();
  };

  const getModalTitle = () => {
    if (modalType === "goal") return "목표 칼로리 수정";
    if (modalType === "consumed") return "섭취 칼로리 수정";
    if (modalType === "burned") return "소모 칼로리 수정";
    return "";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">오늘의 칼로리</h1>
          <p className="text-sm text-gray-500">11/9 일</p>
        </div>
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <Bell className="w-6 h-6 text-gray-700" />
        </button>
      </header>

      {/* Calorie Circle */}
      <div className="flex justify-center items-center py-8">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="128"
              cy="128"
              r="100"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="20"
            />
            {/* Progress circle */}
            <circle
              cx="128"
              cy="128"
              r="100"
              fill="none"
              stroke="#fb923c"
              strokeWidth="20"
              strokeDasharray={`${progress * 6.28} 628`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <p className="text-5xl font-bold text-gray-900">{remaining}kcal</p>
            <p className="text-lg text-gray-600 mt-2">남음</p>
            <p className="text-sm text-gray-400 mt-1">
              섭취 {data.consumed} / 소모 {data.burned}
            </p>
          </div>
        </div>
      </div>

      {/* Calorie Cards */}
      <div className="px-6 grid grid-cols-3 gap-4 mb-8">
        {/* Goal Card */}
        <div className="bg-green-50 rounded-2xl p-4 text-center">
          <button
            onClick={() => openModal("goal")}
            className="flex items-center justify-center gap-1 text-green-600 mb-2 w-full"
          >
            <span className="text-sm font-medium">목표</span>
            <Edit2 className="w-4 h-4" />
          </button>
          <p className="text-3xl font-bold text-green-700">{data.goal}</p>
          <p className="text-sm text-green-600 mt-1">kcal</p>
        </div>

        {/* Consumed Card */}
        <div className="bg-orange-50 rounded-2xl p-4 text-center">
          <button
            onClick={() => openModal("consumed")}
            className="flex items-center justify-center gap-1 text-orange-600 mb-2 w-full"
          >
            <span className="text-sm font-medium">섭취</span>
            <Edit2 className="w-4 h-4" />
          </button>
          <p className="text-3xl font-bold text-orange-700">{data.consumed}</p>
          <p className="text-sm text-orange-600 mt-1">kcal</p>
        </div>

        {/* Burned Card */}
        <div className="bg-blue-50 rounded-2xl p-4 text-center">
          <button
            onClick={() => openModal("burned")}
            className="flex items-center justify-center gap-1 text-blue-600 mb-2 w-full"
          >
            <span className="text-sm font-medium">소모</span>
            <Edit2 className="w-4 h-4" />
          </button>
          <p className="text-3xl font-bold text-blue-700">{data.burned}</p>
          <p className="text-sm text-blue-600 mt-1">kcal</p>
        </div>
      </div>

      {/* Modal */}
      {modalType && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-40 ">
          <div className="bg-white rounded-3xl p-6 max-w-sm overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {getModalTitle()}
              </h2>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-700 mb-2">
                {modalType === "goal" && "목표 칼로리 (kcal)"}
                {modalType === "consumed" && "섭취 칼로리 (kcal)"}
                {modalType === "burned" && "소모 칼로리 (kcal)"}
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full text-center text-4xl font-bold text-gray-900 border-2 border-gray-200 rounded-2xl py-4 focus:outline-none focus:border-orange-400"
                placeholder="2000"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={closeModal}
                className="py-4 px-6 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="py-4 px-6 bg-orange-500 text-white rounded-2xl font-medium hover:bg-orange-600 transition-colors"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
