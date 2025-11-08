import { create } from "zustand";
import { persist } from "zustand/middleware";

// 사용자 프로필 타입 정의
export interface UserProfile {
  name: string;
  gender: "male" | "female" | "";
  height: string;
  weight: string;
}

interface ProfileStore {
  profile: UserProfile;
  setProfile: (profile: Partial<UserProfile>) => void;
  setField: <K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K],
  ) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: {
        name: "대전 빵순이",
        gender: "",
        height: "",
        weight: "",
      },
      setProfile: (newProfile) =>
        set((state) => ({
          profile: { ...state.profile, ...newProfile },
        })),
      setField: (key, value) =>
        set((state) => ({
          profile: { ...state.profile, [key]: value },
        })),
    }),
    {
      name: "user-profile-storage", // localStorage 키
    },
  ),
);

