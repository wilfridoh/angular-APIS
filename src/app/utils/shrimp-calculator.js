/**
 * Función para calcular los pesos óptimos por tipo de camarón en una piscina
 * @param {number[]} camarones - Arreglo de enteros representando los camarones
 *   - Números negativos: camarones naranjas
 *   - Ceros: camarones azules  
 *   - Números positivos: camarones verdes
 * @returns {number[]} Arreglo con [peso_naranja, peso_azul, peso_verde] con 6 decimales
 */
function shrimpWeight(camarones) {
    // Validación de entrada
    if (!Array.isArray(camarones) || camarones.length === 0) {
        return [0.000000, 0.000000, 0.000000];
    }
    
    // Contadores para cada tipo de camarón
    var naranjas = 0;
    var azules = 0;
    var verdes = 0;
    
    // Contar cada tipo de camarón
    for (let camaron of camarones) {
        if (camaron < 0) {
            naranjas++;
        } else if (camaron === 0) {
            azules++;
        } else {
            verdes++;
        }
    }
    
    // Total de camarones
    const total = camarones.length;
    
    // Si no hay camarones, retornar ceros
    if (total === 0) {
        return [0.000000, 0.000000, 0.000000];
    }
    
    // Calcular pesos óptimos con 6 decimales
    const pesoNaranja = parseFloat((naranjas / total).toFixed(6));
    const pesoAzul = parseFloat((azules / total).toFixed(6));
    const pesoVerde = parseFloat((verdes / total).toFixed(6));
    
    return [pesoNaranja, pesoAzul, pesoVerde];
}

// Función de prueba con los ejemplos proporcionados
function testShrimpWeight() {
    console.log('=== PRUEBAS DE LA FUNCIÓN SHRIMP WEIGHT ===');
    
    // Ejemplo 1: [1, 1, 0, -1, -1] => [0.400000, 0.200000, 0.400000]
    const test1 = [1, 1, 0, -1, -1];
    const result1 = shrimpWeight(test1);
    console.log(`shrimpWeight([1, 1, 0, -1, -1]) = [${result1.map(n => n.toFixed(6)).join(', ')}]`);
    
    // Ejemplo 2: [-80, 30, 20, -100, -1] => [0.600000, 0.000000, 0.400000]
    const test2 = [-80, 30, 20, -100, -1];
    const result2 = shrimpWeight(test2);
    console.log(`shrimpWeight([-80, 30, 20, -100, -1]) = [${result2.map(n => n.toFixed(6)).join(', ')}]`);
    
    // Ejemplo 3: [-8, 0, 3, -40, 0, 7, 0, 0, 2, 0, -10, -10] => [0.333333, 0.416667, 0.250000]
    const test3 = [-8, 0, 3, -40, 0, 7, 0, 0, 2, 0, -10, -10];
    const result3 = shrimpWeight(test3);
    console.log(`shrimpWeight([-8, 0, 3, -40, 0, 7, 0, 0, 2, 0, -10, -10]) = [${result3.map(n => n.toFixed(6)).join(', ')}]`);
    
    // Ejemplo del enunciado: 500 naranjas, 200 azules, 100 verdes
    console.log('\n=== EJEMPLO DEL ENUNCIADO ===');
    const naranjas = Array(500).fill(-1);
    const azules = Array(200).fill(0);
    const verdes = Array(100).fill(1);
    const ejemploCompleto = [...naranjas, ...azules, ...verdes];
    const resultadoCompleto = shrimpWeight(ejemploCompleto);
    console.log(`500 naranjas, 200 azules, 100 verdes:`);
    console.log(`Peso óptimo naranja: ${resultadoCompleto[0].toFixed(6)}`);
    console.log(`Peso óptimo azul: ${resultadoCompleto[1].toFixed(6)}`);
    console.log(`Peso óptimo verde: ${resultadoCompleto[2].toFixed(6)}`);
}

// Exportar la función para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { shrimpWeight, testShrimpWeight };
}

// Si se ejecuta directamente, correr las pruebas
if (typeof window === 'undefined') {
    testShrimpWeight();
}