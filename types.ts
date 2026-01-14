export interface LeadFormData {
  // Step 1: Contact
  name: string;
  email: string;
  phone: string;
  zipCode: string;

  // Step 2: Home Details
  bedrooms: number;
  bathrooms: number;
  sqFt: number;
  people: number;
  pets: {
    dogs: boolean;
    cats: boolean;
    none: boolean;
  };

  // Step 3: Service
  cleaningType: 'one-time' | 'recurring';
  serviceDetail: string; // e.g., 'Deep Clean', 'Weekly - Premium'
  
  // Calculated
  estimatedPrice: number;
}

export interface ServiceOption {
  id: string;
  label: string;
  type: 'one-time' | 'recurring';
  multiplier?: number; // Price multiplier (e.g., 1.3 for Deep Clean)
  discount?: number; // Discount percentage (e.g., 0.2 for Weekly)
  tag?: string; // "Popular", "Best Value"
  description?: string;
}

// Configuration for the Pricing Engine
export const PRICING_CONFIG = {
  BASE_PRICE: 100,
  PER_BEDROOM: 20,
  PER_BATHROOM: 15,
};
