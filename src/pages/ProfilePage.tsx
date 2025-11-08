import { useState, useEffect } from "react";
import {
  User,
  Settings,
  LogOut,
  Edit2,
  ChevronRight,
  Ruler,
  Scale,
  UserCircle,
  X,
} from "lucide-react";
import { useProfileStore } from "@/store/profileStore";

function ProfilePage() {
  const { profile, setField } = useProfileStore();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    gender: profile.gender,
    height: profile.height,
    weight: profile.weight,
  });

  // 프로필이 변경되면 editForm도 업데이트
  useEffect(() => {
    setEditForm({
      name: profile.name,
      gender: profile.gender,
      height: profile.height,
      weight: profile.weight,
    });
  }, [profile]);

  const handleEditProfile = () => {
    setEditForm({
      name: profile.name,
      gender: profile.gender,
      height: profile.height,
      weight: profile.weight,
    });
    setShowEditModal(true);
  };

  const handleSaveProfile = () => {
    setField("name", editForm.name);
    setField("gender", editForm.gender);
    setField("height", editForm.height);
    setField("weight", editForm.weight);
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">마이페이지</h1>
      </header>

      {/* Profile Section */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {profile.name}
            </h2>
            <p className="text-sm text-gray-500">대전 빵 여행 중</p>
          </div>
        </div>
      </div>

      {/* User Info Section */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">내 정보</h3>
          <button
            onClick={handleEditProfile}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <Edit2 className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 space-y-4">
          {/* Gender */}
          <div className="flex items-center gap-3">
            <UserCircle className="w-5 h-5 text-gray-600" />
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">성별</p>
              <p className="text-base font-semibold text-gray-900">
                {profile.gender === "male"
                  ? "남성"
                  : profile.gender === "female"
                    ? "여성"
                    : "미입력"}
              </p>
            </div>
          </div>

          {/* Height */}
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-gray-600" />
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">키</p>
              <p className="text-base font-semibold text-gray-900">
                {profile.height ? `${profile.height}cm` : "미입력"}
              </p>
            </div>
          </div>

          {/* Weight */}
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-gray-600" />
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">몸무게</p>
              <p className="text-base font-semibold text-gray-900">
                {profile.weight ? `${profile.weight}kg` : "미입력"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="px-6 mb-8">
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">설정</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">로그아웃</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-40">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">프로필 수정</h2>
              <button
                onClick={handleCancelEdit}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  사용자 이름
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full text-center text-lg font-semibold text-gray-900 border-2 border-gray-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-orange-400"
                  placeholder="이름을 입력하세요"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">성별</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() =>
                      setEditForm({ ...editForm, gender: "male" })
                    }
                    className={`py-3 px-4 rounded-2xl font-medium transition-colors ${
                      editForm.gender === "male"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    남성
                  </button>
                  <button
                    onClick={() =>
                      setEditForm({ ...editForm, gender: "female" })
                    }
                    className={`py-3 px-4 rounded-2xl font-medium transition-colors ${
                      editForm.gender === "female"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    여성
                  </button>
                </div>
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">키 (cm)</label>
                <input
                  type="number"
                  value={editForm.height}
                  onChange={(e) =>
                    setEditForm({ ...editForm, height: e.target.value })
                  }
                  className="w-full text-center text-lg font-semibold text-gray-900 border-2 border-gray-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-orange-400"
                  placeholder="170"
                  min="0"
                  max="250"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  몸무게 (kg)
                </label>
                <input
                  type="number"
                  value={editForm.weight}
                  onChange={(e) =>
                    setEditForm({ ...editForm, weight: e.target.value })
                  }
                  className="w-full text-center text-lg font-semibold text-gray-900 border-2 border-gray-200 rounded-2xl py-3 px-4 focus:outline-none focus:border-orange-400"
                  placeholder="70"
                  min="0"
                  max="300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={handleCancelEdit}
                className="py-4 px-6 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSaveProfile}
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

export default ProfilePage;

