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

export interface FeatureItemProps {
  feature: WorkFeature;
}
