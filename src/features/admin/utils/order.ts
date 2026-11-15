export function moveItem<T extends { id: number; sort_order: number }>(items: T[], sourceId: number, targetId: number): T[] {
  const next = [...items];
  const from = next.findIndex((item) => item.id === sourceId);
  const to = next.findIndex((item) => item.id === targetId);
  if (from < 0 || to < 0 || from === to) return items;
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next.map((item, index) => ({ ...item, sort_order: (index + 1) * 10 }));
}
