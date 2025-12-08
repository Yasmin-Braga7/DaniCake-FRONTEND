import { OrderStatus } from "@/src/enums/pedidos";
import { Produto } from "../produtos/request";


export interface OrderItem {
    id: number;
    preco: number;
    quantidade: number;
    subtotal: number;
    produto: Produto;
}

export interface Order {
    id: number;
    subtotal: number;
    taxa: number;
    total: number;
    status: OrderStatus;
    criado: string;
    pedidoItems: OrderItem[]; 
}