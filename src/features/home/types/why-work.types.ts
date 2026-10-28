export type FeatureIcon =
  | "communication"
  | "delivery"
  | "technology"
  | "support";

export interface WorkFeature {
  id: string;
  title: string;
  description: string;
  icon: FeatureIcon;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
}

export interface FeatureItemProps {
  feature: WorkFeature;
}

export interface StarRatingProps {
  rating: number;
}

export interface TestimonialCardProps {
  testimonial: Testimonial;
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalTestimonials: number;
  onSelect: (index: number) => void;
}
