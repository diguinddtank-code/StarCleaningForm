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
  
  // No longer strictly calculated, but kept for payload compatibility
  estimatedPrice: number;
}

export interface ServiceOption {
  id: string;
  label: string;
  type: 'one-time' | 'recurring';
  tag?: string; // "Popular", "Best Value"
  description?: string;
}
