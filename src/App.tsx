/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ActiveScreen, 
  DeliveryPlatform, 
  RiderProfile, 
  FilingState, 
  PlatformId 
} from './types';
import { 
  INITIAL_PLATFORMS, 
  MOCK_RIDER_PROFILE, 
  INITIAL_DEDUCTIONS 
} from './data/mockData';
import { DemoBar } from './components/DemoBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { WhyFileITR } from './components/WhyFileITR';
import { LiveTaxCalculator } from './components/LiveTaxCalculator';
import { PricingSection } from './components/PricingSection';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { OnboardingWizard } from './components/OnboardingWizard';
import { DashboardView } from './components/DashboardView';
import { ITRFilingWizard } from './components/ITRFilingWizard';
import { RefundTrackerView } from './components/RefundTrackerView';
import { SettingsView } from './components/SettingsView';
import { Form26ASModal } from './components/Form26ASModal';

export default function App() {
  // Navigation & Screen State
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('landing');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [is26ASModalOpen, setIs26ASModalOpen] = useState<boolean>(false);

  // Core Application Mock Data State
  const [platforms, setPlatforms] = useState<DeliveryPlatform[]>(INITIAL_PLATFORMS);
  const [riderProfile, setRiderProfile] = useState<RiderProfile>(MOCK_RIDER_PROFILE);
  
  const [filingState, setFilingState] = useState<FilingState>({
    currentStep: 1,
    incomeConfirmed: true,
    totalGrossIncome: 395000,
    totalTdsDeducted: 3950,
    deductions: INITIAL_DEDUCTIONS,
    selectedRegime: 'new',
    bankVerified: true,
    filingStatus: 'not_started',
    estimatedRefund: 4068, // Includes ~3% Sec 244A interest
    ackNumber: 'ITR4-88492019482-2025',
  });

  // Toggle platform connection state
  const handleTogglePlatformConnect = (id: PlatformId) => {
    setPlatforms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, connected: !p.connected } : p))
    );
  };

  // Update Rider Profile
  const handleUpdateProfile = (newProfile: Partial<RiderProfile>) => {
    setRiderProfile((prev) => ({ ...prev, ...newProfile }));
  };

  // Update Filing State
  const handleUpdateFilingState = (newState: Partial<FilingState>) => {
    setFilingState((prev) => ({ ...prev, ...newState }));
  };

  // Reset all mock states
  const handleResetData = () => {
    setPlatforms(INITIAL_PLATFORMS);
    setRiderProfile(MOCK_RIDER_PROFILE);
    setFilingState({
      currentStep: 1,
      incomeConfirmed: true,
      totalGrossIncome: 395000,
      totalTdsDeducted: 3950,
      deductions: INITIAL_DEDUCTIONS,
      selectedRegime: 'new',
      bankVerified: true,
      filingStatus: 'not_started',
      estimatedRefund: 4068,
      ackNumber: 'ITR4-88492019482-2025',
    });
    setCurrentScreen('landing');
  };

  // Auth Success handler
  const handleAuthSuccess = (phone: string) => {
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
    setRiderProfile((prev) => ({ ...prev, phone: `+91 ${phone}` }));
    setCurrentScreen('onboarding');
  };

  const handleStartFilingFromLanding = () => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
    } else {
      setCurrentScreen('onboarding');
    }
  };

  const handleStartFilingWithAmount = (amount: number) => {
    setFilingState((prev) => ({ ...prev, estimatedRefund: amount }));
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
    } else {
      setCurrentScreen('filing');
    }
  };

  const handleSelectPlan = (planName: string) => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
    } else {
      setCurrentScreen('filing');
    }
  };

  return (
    <div className="min-h-screen bg-[#070B11] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* 1. Presentation Demo Control Bar (Sticky at top) */}
      <DemoBar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onResetData={handleResetData}
        filingStatus={filingState.filingStatus}
      />

      {/* 2. Global Brand Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        isLoggedIn={isLoggedIn}
        onLogout={() => {
          setIsLoggedIn(false);
          setCurrentScreen('landing');
        }}
        userName={riderProfile.name}
      />

      {/* 3. Main Screen View Switcher */}
      <main className="flex-1">
        
        {/* VIEW 1: LANDING PAGE */}
        {currentScreen === 'landing' && (
          <div className="space-y-4">
            <HeroSection
              onGetStarted={handleStartFilingFromLanding}
              platforms={platforms}
            />
            <HowItWorks
              onStartFiling={handleStartFilingFromLanding}
            />
            <WhyFileITR
              onExploreFiling={() => setCurrentScreen('filing')}
            />
            <LiveTaxCalculator
              onStartFilingWithAmount={handleStartFilingWithAmount}
            />
            <PricingSection
              onSelectPlan={handleSelectPlan}
            />
            <Testimonials />
            <FAQSection />
          </div>
        )}

        {/* VIEW 2: ONBOARDING WIZARD */}
        {currentScreen === 'onboarding' && (
          <OnboardingWizard
            platforms={platforms}
            onTogglePlatformConnect={handleTogglePlatformConnect}
            riderProfile={riderProfile}
            onUpdateProfile={handleUpdateProfile}
            onComplete={() => setCurrentScreen('dashboard')}
          />
        )}

        {/* VIEW 3: MAIN DASHBOARD */}
        {currentScreen === 'dashboard' && (
          <DashboardView
            platforms={platforms}
            onTogglePlatformConnect={handleTogglePlatformConnect}
            riderProfile={riderProfile}
            filingState={filingState}
            onStartFiling={() => setCurrentScreen('filing')}
            onOpen26AS={() => setIs26ASModalOpen(true)}
            onNavigateToTracker={() => setCurrentScreen('refund_tracker')}
            onNavigateToSettings={() => setCurrentScreen('settings')}
          />
        )}

        {/* VIEW 4: ITR FILING WIZARD */}
        {currentScreen === 'filing' && (
          <ITRFilingWizard
            platforms={platforms}
            riderProfile={riderProfile}
            filingState={filingState}
            onUpdateFilingState={handleUpdateFilingState}
            onCompleteFiling={() => {
              setFilingState((prev) => ({
                ...prev,
                filingStatus: 'verified',
              }));
            }}
            onGoToTracker={() => setCurrentScreen('refund_tracker')}
          />
        )}

        {/* VIEW 5: REFUND TRACKER */}
        {currentScreen === 'refund_tracker' && (
          <RefundTrackerView
            riderProfile={riderProfile}
            filingState={filingState}
            onNavigateToDashboard={() => setCurrentScreen('dashboard')}
          />
        )}

        {/* VIEW 6: SETTINGS & VAULT */}
        {currentScreen === 'settings' && (
          <SettingsView
            riderProfile={riderProfile}
            platforms={platforms}
            onTogglePlatform={handleTogglePlatformConnect}
            onUpdateProfile={handleUpdateProfile}
            onOpen26AS={() => setIs26ASModalOpen(true)}
          />
        )}

      </main>

      {/* 4. Global Footer */}
      <Footer onNavigate={setCurrentScreen} />

      {/* 5. Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <Form26ASModal
        isOpen={is26ASModalOpen}
        onClose={() => setIs26ASModalOpen(false)}
        platforms={platforms}
        riderProfile={riderProfile}
      />

    </div>
  );
}
