import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Listing {
  id: string;
  title: string;
  location: string;
  price: number;
  status: 'Active' | 'Pending' | 'Sold' | 'Hidden';
  category: 'lands' | 'houses' | 'services';
  views: number;
  inquiries: number;
  lastUpdated: string;
  description: string;
  images: string[];
}

interface MyForSaleStore {
  // State
  activeTab: 'lands' | 'houses' | 'services';
  statsFilter: 'all' | 'lands' | 'houses' | 'services';
  currentPage: number;
  searchQuery: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  listings: Listing[];

  // Actions
  setActiveTab: (tab: 'lands' | 'houses' | 'services') => void;
  setStatsFilter: (filter: 'all' | 'lands' | 'houses' | 'services') => void;
  setCurrentPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
  setSorting: (column: string, order: 'asc' | 'desc') => void;
  addListing: (listing: Omit<Listing, 'id'>) => void;
  updateListing: (id: string, updates: Partial<Listing>) => void;
  deleteListing: (id: string) => void;
  getFilteredListings: () => Listing[];
  getStats: () => {
    total: number;
    active: number;
    pending: number;
    sold: number;
    totalViews: number;
    totalInquiries: number;
  };
}

// Mock data
const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Prime Commercial Land in Victoria Island',
    location: 'Victoria Island, Lagos',
    price: 150000000,
    status: 'Active',
    category: 'lands',
    views: 1250,
    inquiries: 45,
    lastUpdated: '2024-01-15',
    description: '5000 sqm prime commercial land',
    images: []
  },
  {
    id: '2',
    title: 'Luxury 4-Bedroom Duplex',
    location: 'Lekki Phase 1, Lagos',
    price: 85000000,
    status: 'Active',
    category: 'houses',
    views: 890,
    inquiries: 32,
    lastUpdated: '2024-01-14',
    description: 'Modern duplex with swimming pool',
    images: []
  },
  {
    id: '3',
    title: 'Web Development Services',
    location: 'Remote/Lagos',
    price: 500000,
    status: 'Active',
    category: 'services',
    views: 456,
    inquiries: 18,
    lastUpdated: '2024-01-13',
    description: 'Professional web development and design',
    images: []
  },
  {
    id: '4',
    title: 'Residential Plot in Abuja',
    location: 'Gwarinpa, Abuja',
    price: 25000000,
    status: 'Pending',
    category: 'lands',
    views: 234,
    inquiries: 12,
    lastUpdated: '2024-01-12',
    description: '1200 sqm residential plot',
    images: []
  },
  {
    id: '5',
    title: '3-Bedroom Bungalow',
    location: 'Ikeja, Lagos',
    price: 45000000,
    status: 'Sold',
    category: 'houses',
    views: 567,
    inquiries: 28,
    lastUpdated: '2024-01-10',
    description: 'Well-finished bungalow in serene environment',
    images: []
  },
  {
    id: '6',
    title: 'Digital Marketing Consultation',
    location: 'Remote',
    price: 200000,
    status: 'Active',
    category: 'services',
    views: 189,
    inquiries: 8,
    lastUpdated: '2024-01-11',
    description: 'Complete digital marketing strategy and implementation',
    images: []
  },
  {
    id: '7',
    title: 'Waterfront Land in Ikoyi',
    location: 'Ikoyi, Lagos',
    price: 300000000,
    status: 'Active',
    category: 'lands',
    views: 2100,
    inquiries: 87,
    lastUpdated: '2024-01-16',
    description: '3000 sqm waterfront land with C of O',
    images: []
  },
  {
    id: '8',
    title: 'Modern 5-Bedroom Mansion',
    location: 'Banana Island, Lagos',
    price: 250000000,
    status: 'Pending',
    category: 'houses',
    views: 1456,
    inquiries: 65,
    lastUpdated: '2024-01-15',
    description: 'Ultra-luxury mansion with smart home features',
    images: []
  },
  {
    id: '9',
    title: 'Commercial Land in Ikeja',
    location: 'Ikeja GRA, Lagos',
    price: 75000000,
    status: 'Active',
    category: 'lands',
    views: 678,
    inquiries: 34,
    lastUpdated: '2024-01-17',
    description: '2000 sqm commercial land in prime location',
    images: []
  },
  {
    id: '10',
    title: 'Graphic Design Services',
    location: 'Remote',
    price: 150000,
    status: 'Active',
    category: 'services',
    views: 234,
    inquiries: 12,
    lastUpdated: '2024-01-16',
    description: 'Professional logo and brand identity design',
    images: []
  },
  {
    id: '11',
    title: '2-Bedroom Apartment',
    location: 'Ajah, Lagos',
    price: 35000000,
    status: 'Active',
    category: 'houses',
    views: 456,
    inquiries: 23,
    lastUpdated: '2024-01-18',
    description: 'Modern apartment with fitted kitchen',
    images: []
  },
  {
    id: '12',
    title: 'Residential Land in Port Harcourt',
    location: 'GRA Phase 2, Port Harcourt',
    price: 20000000,
    status: 'Pending',
    category: 'lands',
    views: 345,
    inquiries: 15,
    lastUpdated: '2024-01-17',
    description: '800 sqm residential plot with good title',
    images: []
  },
  {
    id: '13',
    title: 'Photography Services',
    location: 'Lagos',
    price: 300000,
    status: 'Active',
    category: 'services',
    views: 123,
    inquiries: 7,
    lastUpdated: '2024-01-19',
    description: 'Wedding and event photography',
    images: []
  },
  {
    id: '14',
    title: '4-Bedroom Terrace',
    location: 'Chevron, Lekki',
    price: 65000000,
    status: 'Hidden',
    category: 'houses',
    views: 789,
    inquiries: 41,
    lastUpdated: '2024-01-16',
    description: 'Spacious terrace in gated estate',
    images: []
  },
  {
    id: '15',
    title: 'Industrial Land',
    location: 'Agbara, Ogun State',
    price: 40000000,
    status: 'Active',
    category: 'lands',
    views: 567,
    inquiries: 28,
    lastUpdated: '2024-01-20',
    description: '5000 sqm industrial land with power',
    images: []
  }
];

export const useMyForSaleStore = create<MyForSaleStore>()(
  persist(
    (set, get) => ({
      // Initial state
      activeTab: 'lands',
      statsFilter: 'all',
      currentPage: 1,
      searchQuery: '',
      sortBy: 'lastUpdated',
      sortOrder: 'desc',
      listings: mockListings,

      // Actions
      setActiveTab: (tab) => set({ activeTab: tab, currentPage: 1 }),
      setStatsFilter: (filter) => set({ statsFilter: filter }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
      setSorting: (column, order) => set({ sortBy: column, sortOrder: order, currentPage: 1 }),

      addListing: (newListing) => {
        const listing: Listing = {
          ...newListing,
          id: Date.now().toString(),
        };
        set((state) => ({ listings: [...state.listings, listing] }));
      },

      updateListing: (id, updates) => {
        set((state) => ({
          listings: state.listings.map((listing) =>
            listing.id === id ? { ...listing, ...updates } : listing
          ),
        }));
      },

      deleteListing: (id) => {
        set((state) => ({
          listings: state.listings.filter((listing) => listing.id !== id),
        }));
      },

      getFilteredListings: () => {
        const { activeTab, searchQuery, sortBy, sortOrder, listings } = get();
        
        let filtered = listings.filter((listing) => listing.category === activeTab);
        
        if (searchQuery) {
          filtered = filtered.filter((listing) =>
            listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.location.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        // Sort listings
        filtered.sort((a, b) => {
          let aValue = a[sortBy as keyof Listing];
          let bValue = b[sortBy as keyof Listing];
          
          if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = (bValue as string).toLowerCase();
          }
          
          if (sortOrder === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
          }
        });
        
        return filtered;
      },

      getStats: () => {
        const { listings, statsFilter } = get();
        
        let filtered = listings;
        if (statsFilter !== 'all') {
          filtered = listings.filter((listing) => listing.category === statsFilter);
        }
        
        return {
          total: filtered.length,
          active: filtered.filter((l) => l.status === 'Active').length,
          pending: filtered.filter((l) => l.status === 'Pending').length,
          sold: filtered.filter((l) => l.status === 'Sold').length,
          totalViews: filtered.reduce((sum, l) => sum + l.views, 0),
          totalInquiries: filtered.reduce((sum, l) => sum + l.inquiries, 0),
        };
      },
    }),
    {
      name: 'my-for-sale-store',
    }
  )
);
