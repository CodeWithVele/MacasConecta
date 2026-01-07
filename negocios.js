// negocios.js - BASE DE DATOS DE NEGOCIOS DE MACAS
console.log("🏪 Cargando base de datos de negocios...");

const negociosMacas = [
    {
        id: 1,
        nombre: "Zapatería Colombiano",
        categoria: "Reparación de Calzado",
        descripcion: "¡FUNDADOR DE MACASCONECTA! 🌟 35 años reparando el calzado de Macas. Especialista en cuero, cambio de suelas y arreglos urgentes.",
        ubicacion: "Macas Centro, a lado de la cooperativa JEP",
        telefono: "0981342236",
        whatsapp: "593981342236",
        horario: "Lun-Sáb: 8:00-20:00 | Dom: 9:00-15:00",
        servicios: ["Cambio de suela", "Arreglo de cuero", "Zapatos escolares", "Tacones", "Botas", "Urgencias", "Cambio cierres"],
        fundador: true,
        destacado: true,
        coordenadas: {
            lat: -2.3087,
            lng: -78.1114
        },
        etiquetas: ["reparación", "calzado", "zapatería", "urgencias"]
    },
    {
        id: 2,
        nombre: "Restaurante El Sabor de Macas",
        categoria: "Restaurante",
        descripcion: "Comida típica amazónica en un ambiente familiar. Especialidades en maito de pescado y chontacuro.",
        ubicacion: "Av. Amazonas, frente al parque central",
        telefono: "0912345678",
        whatsapp: "593912345678",
        horario: "Todos los días: 7:00-22:00",
        servicios: ["Comida amazónica", "Maito de pescado", "Chontacuro", "Almuerzos ejecutivos", "Postres típicos"],
        fundador: false,
        destacado: true,
        coordenadas: {
            lat: -2.3065,
            lng: -78.1123
        },
        etiquetas: ["restaurante", "comida", "amazónica", "maito"]
    },
    {
        id: 3,
        nombre: "Farmacia Santa Marianita",
        categoria: "Farmacia",
        descripcion: "Atención 24/7. Entrega a domicilio gratuita en el centro de Macas. Amplio stock de medicamentos.",
        ubicacion: "Av. 10 de Agosto, frente al hospital",
        telefono: "0923456789",
        whatsapp: "593923456789",
        horario: "24 horas, todos los días",
        servicios: ["Medicamentos", "Primeros auxilios", "Entrega a domicilio", "Farmacéutico 24/7", "Productos de higiene"],
        fundador: false,
        destacado: false,
        coordenadas: {
            lat: -2.3072,
            lng: -78.1108
        },
        etiquetas: ["farmacia", "24 horas", "medicamentos", "urgencias"]
    },
    {
        id: 4,
        nombre: "Supermercado El Ahorro",
        categoria: "Supermercado",
        descripcion: "Los mejores precios de la ciudad. Productos frescos, abarrotes y línea blanca.",
        ubicacion: "Av. Amazonas Km 1.5",
        telefono: "0934567890",
        whatsapp: "593934567890",
        horario: "Lun-Sáb: 8:00-21:00 | Dom: 8:00-14:00",
        servicios: ["Abarrotes", "Frutas y verduras", "Carnicería", "Productos de limpieza", "Electrodomésticos"],
        fundador: false,
        destacado: false,
        coordenadas: {
            lat: -2.3105,
            lng: -78.1150
        },
        etiquetas: ["supermercado", "abarrotes", "comestibles", "despensa"]
    },
    {
        id: 5,
        nombre: "Taller Mecánico Rápido",
        categoria: "Mecánica",
        descripcion: "Mecánica general, cambio de aceite y reparación de frenos. Garantía en todos los trabajos.",
        ubicacion: "Vía a Puyo Km 0.5",
        telefono: "0945678901",
        whatsapp: "593945678901",
        horario: "Lun-Vie: 8:00-18:00 | Sáb: 8:00-14:00",
        servicios: ["Mecánica general", "Cambio de aceite", "Reparación de frenos", "Diagnóstico computarizado", "Llantas"],
        fundador: false,
        destacado: false,
        coordenadas: {
            lat: -2.3120,
            lng: -78.1095
        },
        etiquetas: ["mecánica", "taller", "reparación", "automóviles"]
    },
    {
        id: 6,
        nombre: "Pizzería La Italiana",
        categoria: "Restaurante",
        descripcion: "Pizza artesanal y pasta fresca. El mejor lugar para comida italiana en Macas.",
        ubicacion: "Calle Bolívar, junto al mercado",
        telefono: "0956789012",
        whatsapp: "593956789012",
        horario: "Mar-Dom: 12:00-23:00 | Lun: Cerrado",
        servicios: ["Pizza artesanal", "Pasta fresca", "Ensaladas", "Postres italianos", "Domicilio"],
        fundador: false,
        destacado: false,
        coordenadas: {
            lat: -2.3058,
            lng: -78.1137
        },
        etiquetas: ["pizzería", "italiana", "comida rápida", "domicilio"]
    },
    {
        id: 7,
        nombre: "Clínica Veterinaria Peludos",
        categoria: "Veterinaria",
        descripcion: "Atención a mascotas. Vacunas, consultas y peluquería. Amor y cuidado profesional.",
        ubicacion: "Calle Sucre 234",
        telefono: "0967890123",
        whatsapp: "593967890123",
        horario: "Lun-Sáb: 9:00-19:00 | Dom: 10:00-14:00",
        servicios: ["Consultas veterinarias", "Vacunación", "Peluquería canina", "Cirugías menores", "Hospitalización"],
        fundador: false,
        destacado: false,
        coordenadas: {
            lat: -2.3043,
            lng: -78.1142
        },
        etiquetas: ["veterinaria", "mascotas", "animales", "cuidado"]
    },
    {
        id: 8,
        nombre: "Lavandería Express",
        categoria: "Lavandería",
        descripcion: "Lavado y planchado express en 2 horas. Servicio recogida y entrega a domicilio.",
        ubicacion: "Av. 29 de Mayo",
        telefono: "0978901234",
        whatsapp: "593978901234",
        horario: "Lun-Sáb: 8:00-20:00 | Dom: 9:00-17:00",
        servicios: ["Lavado express", "Planchado", "Limpieza en seco", "Recogida a domicilio", "Entrega express"],
        fundador: false,
        destacado: false,
        coordenadas: {
            lat: -2.3091,
            lng: -78.1163
        },
        etiquetas: ["lavandería", "limpieza", "express", "domicilio"]
    },
    {
        id: 9,
        nombre: "Cafetería Aroma Andino",
        categoria: "Cafetería",
        descripcion: "Café orgánico de altura. Postres artesanales y ambiente acogedor para trabajar o estudiar.",
        ubicacion: "Centro Comercial Macas",
        telefono: "0989012345",
        whatsapp: "593989012345",
        horario: "Lun-Dom: 7:00-22:00",
        servicios: ["Café orgánico", "Postres artesanales", "WiFi gratis", "Ambiente de trabajo", "Reuniones"],
        fundador: false,
        destacado: false,
        coordenadas: {
            lat: -2.3037,
            lng: -78.1158
        },
        etiquetas: ["cafetería", "café", "postres", "wifi"]
    }
];

// Función para obtener todos los negocios
function obtenerTodosNegocios() {
    return negociosMacas;
}

// Función para buscar negocios por término
function buscarNegocios(termino) {
    const terminoLower = termino.toLowerCase();
    return negociosMacas.filter(negocio => 
        negocio.nombre.toLowerCase().includes(terminoLower) ||
        negocio.categoria.toLowerCase().includes(terminoLower) ||
        negocio.descripcion.toLowerCase().includes(terminoLower) ||
        negocio.etiquetas.some(etiqueta => etiqueta.includes(terminoLower))
    );
}

// Función para obtener negocios por categoría
function obtenerNegociosPorCategoria(categoria) {
    return negociosMacas.filter(negocio => 
        negocio.categoria.toLowerCase() === categoria.toLowerCase()
    );
}

// Función para obtener negocios destacados
function obtenerNegociosDestacados() {
    return negociosMacas.filter(negocio => negocio.destacado);
}

// Función para obtener el negocio fundador
function obtenerNegocioFundador() {
    return negociosMacas.find(negocio => negocio.fundador) || negociosMacas[0];
}

// Función para DM (versión simplificada)
function obtenerNegociosDM() {
    return negociosMacas.map(negocio => ({
        id: negocio.id,
        nombre: negocio.nombre,
        categoria: negocio.categoria,
        telefono: negocio.telefono,
        icono: 'fas fa-store',
        color: '#6a11cb',
        seleccionado: false,
        featured: negocio.fundador
    }));
}

// Exportar para uso global
window.negociosMacas = negociosMacas;
window.obtenerTodosNegocios = obtenerTodosNegocios;
window.buscarNegocios = buscarNegocios;
window.obtenerNegociosPorCategoria = obtenerNegociosPorCategoria;
window.obtenerNegociosDestacados = obtenerNegociosDestacados;
window.obtenerNegocioFundador = obtenerNegocioFundador;
window.obtenerNegociosDM = obtenerNegociosDM;

console.log(`✅ Base de datos cargada: ${negociosMacas.length} negocios disponibles`);