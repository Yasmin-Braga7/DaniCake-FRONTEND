import { Order } from "@/src/interfaces/pedidos";

export type OrderGroup = {
  label: string;
  data: Order[];
};

export function groupOrdersByPeriod(orders: Order[]): OrderGroup[] {
  const now = new Date();

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const startOfThisWeek = new Date(startOfToday);
  startOfThisWeek.setDate(startOfToday.getDate() - startOfToday.getDay());

  const startOfLastWeek = new Date(startOfThisWeek);
  startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);

  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfThisYear = new Date(now.getFullYear(), 0, 1);

  const groups: { label: string; orders: Order[] }[] = [
    { label: "Hoje", orders: [] },
    { label: "Ontem", orders: [] },
    { label: "Esta semana", orders: [] },
    { label: "Semana passada", orders: [] },
    { label: "Este mês", orders: [] },
    { label: "Este ano", orders: [] },
    { label: "Mais antigos", orders: [] },
  ];

  for (const order of orders) {
    const date = new Date(order.criado);

    if (date >= startOfToday) {
      groups[0].orders.push(order);
    } else if (date >= startOfYesterday) {
      groups[1].orders.push(order);
    } else if (date >= startOfThisWeek) {
      groups[2].orders.push(order);
    } else if (date >= startOfLastWeek) {
      groups[3].orders.push(order);
    } else if (date >= startOfThisMonth) {
      groups[4].orders.push(order);
    } else if (date >= startOfThisYear) {
      groups[5].orders.push(order);
    } else {
      groups[6].orders.push(order);
    }
  }

  return groups
    .filter((g) => g.orders.length > 0)
    .map((g) => ({ label: g.label, data: g.orders }));
}

export function formatOrderId(id: number | string): string {
  return `Nº ${String(id).padStart(3, "0")}`;
}
