import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Design base: iPhone 13 Mini (375x812) — tamanho "médio" de referência
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

// Escala baseada na largura
const widthScale = SCREEN_WIDTH / BASE_WIDTH;
// Escala baseada na altura
const heightScale = SCREEN_HEIGHT / BASE_HEIGHT;

/**
 * Retorna um valor proporcional baseado na % da largura da tela.
 * Ex: wp(90) = 90% da largura da tela
 */
export const wp = (percentage: number): number => {
    return Math.round((percentage / 100) * SCREEN_WIDTH);
};

/**
 * Retorna um valor proporcional baseado na % da altura da tela.
 * Ex: hp(50) = 50% da altura da tela
 */
export const hp = (percentage: number): number => {
    return Math.round((percentage / 100) * SCREEN_HEIGHT);
};

/**
 * Normaliza um tamanho fixo (fontSize, iconSize, padding, etc.)
 * para ser proporcional à tela do usuário.
 * Usa a MENOR escala (largura vs altura) para não estourar.
 */
export const normalize = (size: number): number => {
    const scale = Math.min(widthScale, heightScale);
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Escala moderada: meio-termo entre valor fixo e totalmente escalado.
 * factor = 0 → tamanho fixo original
 * factor = 1 → totalmente escalado (igual normalize)
 * factor = 0.5 → meio-termo (recomendado para fontes)
 */
export const moderateScale = (size: number, factor: number = 0.5): number => {
    return Math.round(size + (normalize(size) - size) * factor);
};

// Exporta dimensões da tela para uso direto
export const SCREEN = {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
};
