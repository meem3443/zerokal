import { create } from "zustand";

// 타입 정의
export interface CalorieData {
  goal: number;
  consumed: number;
  burned: number;
}

// setValue 함수가 number 또는 함수 모두 받게 하기
type SetFieldFn = (
  key: keyof CalorieData,
  value: number | ((prev: number) => number),
) => void;

interface CalorieStore {
  data: CalorieData;
  setData: (data: CalorieData) => void;
  setField: SetFieldFn;
}

export const useCalorieStore = create<CalorieStore>((set) => ({
  data: {
    goal: 2000,
    consumed: 1200,
    burned: 300,
  },
  setData: (data) => set({ data }),
  setField: (key, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [key]: typeof value === "function" ? value(state.data[key]) : value,
      },
    })),
}));
