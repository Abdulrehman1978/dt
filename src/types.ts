export type PlatformId = 'swiggy' | 'zomato' | 'zepto' | 'blinkit' | 'shadowfax' | 'uber';

export interface DeliveryPlatform {
  id: PlatformId;
  name: string;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  iconName: string;
  defaultEarnings: number;
  tdsRate: number; // 1% under 194-O / 194-C
  orderCount: number;
  riderId: string;
  connected: boolean;
  lastSynced?: string;
}

export interface MonthlyEarning {
  month: string;
  swiggy: number;
  zomato: number;
  zepto: number;
  blinkit: number;
  total: number;
  tds: number;
}

export interface RiderProfile {
  name: string;
  phone: string;
  pan: string;
  aadhaarLast4: string;
  city: string;
  primaryVehicle: 'bike' | 'ev_scooter' | 'cycle';
  bankName: string;
  accountNumberMasked: string;
  ifsc: string;
  financialYear: string;
  assessmentYear: string;
}

export interface DeductionItem {
  id: string;
  name: string;
  section: string;
  description: string;
  suggestedAmount: number;
  userAmount: number;
  enabled: boolean;
  category: 'expense' | 'insurance' | 'savings';
}

export interface FilingState {
  currentStep: number;
  incomeConfirmed: boolean;
  totalGrossIncome: number;
  totalTdsDeducted: number;
  deductions: DeductionItem[];
  selectedRegime: 'new' | 'old';
  bankVerified: boolean;
  filingStatus: 'not_started' | 'draft' | 'filed' | 'verified' | 'processing' | 'refund_credited';
  ackNumber?: string;
  filingDate?: string;
  estimatedRefund: number;
}

export type ActiveScreen = 
  | 'landing'
  | 'auth'
  | 'onboarding'
  | 'dashboard'
  | 'filing'
  | 'refund_tracker'
  | 'settings';
