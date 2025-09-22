// Veriprops Global State Management with Zustand
import { Company } from '@components/portal/company/models';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Wishlist Store
interface WishlistState {
  items: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (id) => set((state) => ({ 
        items: state.items.includes(id) ? state.items : [...state.items, id] 
      })),
      remove: (id) => set((state) => ({ 
        items: state.items.filter(item => item !== id) 
      })),
      toggle: (id) => {
        const { items } = get();
        if (items.includes(id)) {
          get().remove(id);
        } else {
          get().add(id);
        }
      },
      clear: () => set({ items: [] }),
      isInWishlist: (id) => get().items.includes(id),
    }),
    {
      name: 'veriprops-wishlist',
    }
  )
);

// Compare Store
interface CompareState {
  items: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  isInCompare: (id: string) => boolean;
  canAdd: () => boolean;
}

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (id) => set((state) => {
        if (state.items.length >= 3 || state.items.includes(id)) return state;
        return { items: [...state.items, id] };
      }),
      remove: (id) => set((state) => ({ 
        items: state.items.filter(item => item !== id) 
      })),
      toggle: (id) => {
        const { items } = get();
        if (items.includes(id)) {
          get().remove(id);
        } else if (items.length < 3) {
          get().add(id);
        }
      },
      clear: () => set({ items: [] }),
      isInCompare: (id) => get().items.includes(id),
      canAdd: () => get().items.length < 3,
    }),
    {
      name: 'veriprops-compare',
    }
  )
);

// Auth Store (Simulated)
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful login
        const mockUser: User = {
          id: 'user_current',
          name: email.split('@')[0],
          email,
          avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
        };
        
        set({ user: mockUser, isAuthenticated: true });
        return true;
      },
      register: async (name, email, password) => {
        // Simulate API call  
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const mockUser: User = {
          id: 'user_current',
          name,
          email,
          avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
        };
        
        set({ user: mockUser, isAuthenticated: true });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      updateProfile: (data) => set((state) => ({ 
        user: state.user ? { ...state.user, ...data } : null 
      })),
    }),
    {
      name: 'veriprops-auth',
    }
  )
);

// Bookings Store (Client-side simulation)
interface Booking {
  id: string;
  propertyId?: string;
  serviceId?: string;
  type: 'property' | 'service';
  status: 'pending' | 'confirmed' | 'cancelled';
  date: string;
  message: string;
  createdAt: string;
}

interface BookingsState {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  getBookings: () => Booking[];
}

export const useBookings = create<BookingsState>()(
  persist(
    (set, get) => ({
      bookings: [],
      addBooking: (booking) => {
        const newBooking: Booking = {
          ...booking,
          id: `booking_${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ bookings: [newBooking, ...state.bookings] }));
      },
      updateBookingStatus: (id, status) => set((state) => ({
        bookings: state.bookings.map(booking => 
          booking.id === id ? { ...booking, status } : booking
        )
      })),
      getBookings: () => get().bookings,
    }),
    {
      name: 'veriprops-bookings',
    }
  )
);

// Toast/Notification Store
interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToasts = create<ToastState>((set, get) => ({
  toasts: [],
  addToast: (toast) => {
    const id = `toast_${Date.now()}`;
    const newToast = { ...toast, id };
    set((state) => ({ toasts: [...state.toasts, newToast] }));
    
    // Auto remove after 5 seconds unless it has an action
    if (!toast.action) {
      setTimeout(() => {
        get().removeToast(id);
      }, 5000);
    }
  },
  removeToast: (id) => set((state) => ({ 
    toasts: state.toasts.filter(toast => toast.id !== id) 
  })),
  clearToasts: () => set({ toasts: [] }),
}));

// UI State Store
interface UIState {
  isMobileMenuOpen: boolean;
  isCompareModalOpen: boolean;
  isOnBoardingModalOpen: boolean;
  isProfileDropdownOpen: boolean;
  searchFilters: {
    location: string;
    type: string;
    minPrice: number;
    maxPrice: number;
    verified: boolean;
  };
  activeCompany: Company | null;
  setMobileMenuOpen: (open: boolean) => void;
  setCompareModalOpen: (open: boolean) => void;
  setOnBoardingModalOpen: (open: boolean) => void;
  setProfileDropdownOpen: (open: boolean) => void;
  updateSearchFilters: (filters: Partial<UIState['searchFilters']>) => void;
  resetSearchFilters: () => void;
  setActiveCompany: (company: Company) => void;
}

const defaultFilters = {
  location: '',
  type: 'All',
  minPrice: 0,
  maxPrice: 1000000000,
  verified: false,
};

export const useUI = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isCompareModalOpen: false,
  isOnBoardingModalOpen: false,
  isProfileDropdownOpen: false,
  searchFilters: defaultFilters,
  activeCompany: null,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setCompareModalOpen: (open) => set({ isCompareModalOpen: open }),
  setOnBoardingModalOpen: (open) => set({ isOnBoardingModalOpen: open }),
  setProfileDropdownOpen: (open) => set({ isProfileDropdownOpen: open }),
  updateSearchFilters: (filters) => set((state) => ({
    searchFilters: { ...state.searchFilters, ...filters }
  })),
  resetSearchFilters: () => set({ searchFilters: defaultFilters }),
  setActiveCompany: (company) => set({ activeCompany: company }),
}));
