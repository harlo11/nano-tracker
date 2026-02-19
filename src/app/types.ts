export type ActivityType = 'feeding' | 'pumping' | 'diaper' | 'measurement';
export type DiaperType = 'wet' | 'dirty' | 'both' | 'dry';
export type BreastSide = 'left' | 'right' | 'both';
export type SyncStatus = 'synced' | 'syncing' | 'offline';
export type GuidelineStatus = 'below' | 'within' | 'above';
export type MeasurementType = 'weight' | 'length';

export interface Activity {
  id: string;
  user_id?: string;
  baby_id?: string;
  type: ActivityType;
  occurred_at: string;
  timestamp?: Date;
  amount_ml?: number;
  quantity?: number;
  duration_min?: number;
  duration?: number;
  breast_side?: BreastSide;
  diaper_type?: DiaperType;
  diaperType?: DiaperType;
  measurement_type?: MeasurementType;
  weight_kg?: number;
  length_cm?: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Baby {
  id: string;
  user_id?: string;
  name: string;
  dob: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  birth_weight_g?: number;
  weight?: number;
  birth_length_cm?: number;
  photo_url?: string;
  avatarColor?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Caregiver {
  id: string;
  baby_id: string;
  user_id: string;
  email?: string;
  display_name?: string;
  role: 'owner' | 'parent' | 'caregiver' | 'viewer';
  invited_by: string;
  invited_at: string;
  accepted_at?: string;
}

export interface Reminder {
  id: string;
  user_id: string;
  baby_id: string;
  type: 'feeding' | 'diaper' | 'custom';
  interval_minutes: number;
  enabled: boolean;
  last_triggered_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DailySummary {
  date: Date;
  totalMilkIntake: number;
  pumpingDuration: number;
  pumpingOutput: number;
  wetDiapers: number;
  dirtyDiapers: number;
  activities: Activity[];
}

export interface Guideline {
  name: string;
  recommendedMin: number;
  recommendedMax: number;
  unit: string;
  description: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  status: GuidelineStatus;
  timestamp: Date;
}