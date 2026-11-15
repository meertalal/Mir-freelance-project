import { apiRequest } from "./client";

export type CountryMarket = { id: number; name: string; region: string; flag_image: string; sort_order: number; show_in_hero: boolean; show_in_coverage: boolean };
export type CountryMarketInput = Omit<CountryMarket, "id">;
export const listCountries = (token: string) => apiRequest<{ data: CountryMarket[] }>("/api/admin/countries", { token });
export const createCountry = (token: string, input: CountryMarketInput) => apiRequest<{ data: CountryMarket }>("/api/admin/countries", { method: "POST", token, body: input });
export const updateCountry = (token: string, id: number, input: CountryMarketInput) => apiRequest<{ data: CountryMarket }>(`/api/admin/countries/${id}`, { method: "PATCH", token, body: input });
export const deleteCountry = (token: string, id: number) => apiRequest<{ message: string }>(`/api/admin/countries/${id}`, { method: "DELETE", token });
export const reorderCountries = (token: string, ids: number[]) => apiRequest<{ message: string }>("/api/admin/countries/order", { method: "PATCH", token, body: { ids } });
