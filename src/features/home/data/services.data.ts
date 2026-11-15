import {
  Users,
  BriefcaseBusiness,
  MapPin,
  ShieldCheck,
} from "lucide-react";

import { sharedServices } from "../../../data/site.data";
import type {
  Service,
  ServiceStat,
} from "../types/services.types";

export const services: Service[] = sharedServices.map(
  ({ id, title, description, icon, href }) => ({
    id,
    title,
    description,
    icon,
    href,
  }),
);

export const serviceStats: ServiceStat[] = [
  {
    id: "clients",
    value: "50+",
    label: "Happy Clients",
    icon: Users,
  },
  {
    id: "projects",
    value: "100+",
    label: "Projects Delivered",
    icon: BriefcaseBusiness,
  },
  {
    id: "countries",
    value: "128+",
    label: "Countries Served",
    icon: MapPin,
  },
  {
    id: "satisfaction",
    value: "100%",
    label: "Client Satisfaction",
    icon: ShieldCheck,
  },
];
