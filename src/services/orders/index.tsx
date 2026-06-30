import { Order } from "@/src/interfaces/pedidos";
import { api } from "../index";

export const OrderService = {
    async listarMeusPedidos(idUsuario?: number): Promise<Order[]> {
        try {
            // Se tiver idUsuario, filtra pelo endpoint específico do usuário
            // caso contrário, usa o endpoint geral como fallback
            const url = idUsuario
                ? `/pedido/listar/usuario/${idUsuario}`
                : '/pedido/listar';
            const response = await api.get<Order[]>(url);
            return response.data;
        } catch (error: any) {
            // Se o endpoint filtrado por usuário não existir (404), tenta o geral
            // e filtra localmente pelo idUsuario
            if (error?.response?.status === 404 && idUsuario) {
                try {
                    const response = await api.get<Order[]>('/pedido/listar');
                    return response.data.filter((order: any) =>
                        order.idUsuario === idUsuario || order.usuario?.id === idUsuario
                    );
                } catch (fallbackError) {
                    console.error("Erro ao buscar pedidos (fallback):", fallbackError);
                    throw fallbackError;
                }
            }
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

    async getDashboard(mes?: number, ano?: number): Promise<any> {
        try {
            const params: Record<string, number> = {};
            if (mes !== undefined) params.mes = mes;
            if (ano !== undefined) params.ano = ano;
            const response = await api.get('/pedido/dashboard', { params });
            return response.data;
        } catch (error) {
            console.error("Erro ao carregar dashboard:", error);
            throw error;
        }
    },

    // async fetchAnoMinimo() {
    //     const response = await api.get("/pedido/anos");
    //     return response.data;
    // },
};