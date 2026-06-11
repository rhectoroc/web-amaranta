import { create } from 'zustand'

type TravelType = 'familiar' | 'pareja' | 'grupos' | 'solo' | null;

interface UIState {
  // Mobile Navigation Menu State
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  
  // Custom Filter State
  selectedTravelType: TravelType;
  setSelectedTravelType: (type: TravelType) => void;

  // WhatsApp Widget Modal State
  isWhatsAppModalOpen: boolean;
  setWhatsAppModalOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  selectedTravelType: null,
  setSelectedTravelType: (type) => set({ selectedTravelType: type }),

  isWhatsAppModalOpen: false,
  setWhatsAppModalOpen: (open) => set({ isWhatsAppModalOpen: open }),
}))
