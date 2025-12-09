import { Order } from "@/src/interfaces/pedidos";
import { api } from "../index";

export const OrderService = {
    async listarMeusPedidos(): Promise<Order[]> {
        try {
            const response = await api.get<Order[]>('/pedido/listar');
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
            throw error;
        }
    },

    async atualizarStatus(pedidoId: number, novoStatus: number): Promise<void> {
        try {
            await api.patch(`/pedido/atualizarStatus/${pedidoId}`, {
                status: novoStatus
            });
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
            throw error;
        }
    },

    async criarPedido(dados: { subtotal: number; taxa: number; total: number; idUsuario: number }): Promise<Order> {
        try {
            const payload = {
                ...dados,
                status: 0,
                criado: new Date().toISOString()
            };
            const response = await api.post<Order>('/pedido/criar', payload);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            throw error;
        }
    },

    async criarItemPedido(dados: { preco: number; quantidade: number; subtotal: number; idProduto: number; idPedido: number }): Promise<void> {
        try {
            await api.post('/pedidoItem/criar', dados);
        } catch (error) {
            console.error("Erro ao criar item do pedido:", error);
            throw error;
        }
    },

    async getDashboard(): Promise<any> {
        try {
            const response = await api.get('/pedido/dashboard');
            return response.data;
        } catch (error) {
            console.error("Erro ao carregar dashboard:", error);
            throw error;
        }
    }
};