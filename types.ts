export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  zipCode: string;
  serviceType: string;
}

export interface ServiceOption {
  value: string;
  label: string;
}

export const SERVICE_OPTIONS: ServiceOption[] = [
  { value: 'Standard Cleaning', label: 'Standard Residential Cleaning' },
  { value: 'Deep Cleaning', label: 'Deep Cleaning / Spring Cleaning' },
  { value: 'Move-In/Move-Out', label: 'Move-In / Move-Out' },
  { value: 'Office Cleaning', label: 'Commercial / Office Cleaning' },
];