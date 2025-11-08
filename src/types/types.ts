export interface Position {
  lat: number;
  lng: number;
}

export interface GoalPlace {
  name: string;
  position: Position;
  totalDistance: number; // 미터
  totalCalories: number;
}
