// negocios.js - DATOS COMPLETOS DE NEGOCIOS DE MACAS
console.log("🚀 Cargando datos de negocios de Macas...");

const negocios = [
    {
        id: 1,
        name: "Loccion Nelly",
        category: "Perfumería",
        address: "Macas Centro",
        hours: "08:00 - 20:00",
        whatsapp: "573136407028",
        tags: ["Perfumes", "Loción", "Belleza"],
        featured: true,
        phone: "+573136407028",
        description: "Perfumes y lociones de calidad importada",
        icono: "fa-spray-can",
        color: "#e84393",
        lat: -2.3087,
        lng: -78.1114
    },
    {
        id: 2,
        name: "Viaja Conmigo Ecuador",
        category: "Agencia de Viajes",
        address: "Macas Centro",
        hours: "08:00 - 20:00",
        whatsapp: "593994544402",
        tags: ["Turismo", "Viajes", "Excursiones"],
        featured: false,
        phone: "+593994544402",
        description: "Agencia de viajes y turismo con los mejores destinos",
        icono: "fa-plane",
        color: "#0984e3",
        lat: -2.3090,
        lng: -78.1120
    },
    {
        id: 3,
        name: "Taxi Seguro Macas",
        category: "Transporte",
        address: "Toda la ciudad de Macas",
        hours: "24 HORAS",
        whatsapp: "593986888729",
        tags: ["Taxi", "Emergencia", "24 horas", "Transporte urgente"],
        featured: false,
        phone: "+593986888729",
        description: "Servicio de taxi seguro 24 horas los 7 días de la semana",
        icono: "fa-taxi",
        color: "#00b894",
        emergencia: true,
        lat: -2.3080,
        lng: -78.1100
    },
    {
        id: 4,
        name: "Electrónica Ochoa",
        category: "Reparación Electrónica",
        address: "Calle Amazonas, Macas",
        hours: "08:00 - 20:00",
        whatsapp: "593981139424",
        tags: ["Reparación", "Electrónica", "Técnico", "Mantenimiento"],
        featured: false,
        phone: "+593981139424",
        description: "Reparación y mantenimiento de equipos electrónicos",
        icono: "fa-tv",
        color: "#8e44ad",
        lat: -2.3075,
        lng: -78.1130
    },
    {
        id: 5,
        name: "Restaurant Proaño",
        category: "Restaurante",
        address: "Barrio Proaño, Macas",
        hours: "07:00 - 20:00",
        whatsapp: "593989866092",
        tags: ["Comida típica", "Almuerzos", "Cenas", "Platos ecuatorianos"],
        featured: true,
        phone: "+593989866092",
        description: "Comida típica ecuatoriana con los mejores sabores de Macas",
        icono: "fa-utensils",
        color: "#e67e22",
        lat: -2.3100,
        lng: -78.1090
    },
    {
        id: 6,
        name: "Farmacia Mia",
        category: "Farmacia",
        address: "Av. Amazonas, Macas",
        hours: "09:00 - 20:00",
        whatsapp: "593990035600",
        tags: ["Medicamentos", "Farmacia", "Salud", "Despacho a domicilio"],
        featured: false,
        phone: "+593990035600",
        description: "Farmacia con amplio stock y despacho a domicilio",
        icono: "fa-pills",
        color: "#e74c3c",
        lat: -2.3065,
        lng: -78.1110
    },
    {
        id: 7,
        name: "Taller Mecánico Rápido",
        category: "Mecánica Automotriz",
        address: "Vía al Puyo, Macas",
        hours: "08:00 - 18:00",
        whatsapp: "593987654321",
        tags: ["Mecánica", "Reparación", "Automóviles", "Mantenimiento"],
        featured: false,
        phone: "+593987654321",
        description: "Taller mecánico especializado en todo tipo de vehículos",
        icono: "fa-car",
        color: "#34495e",
        lat: -2.3120,
        lng: -78.1080
    },
    {
        id: 8,
        name: "Supermercado El Ahorro",
        category: "Supermercado",
        address: "Centro Comercial Macas",
        hours: "07:00 - 21:00",
        whatsapp: "593996633221",
        tags: ["Supermercado", "Abarrotes", "Víveres", "Despensa"],
        featured: false,
        phone: "+593996633221",
        description: "Supermercado con los mejores precios y variedad",
        icono: "fa-shopping-cart",
        color: "#27ae60",
        lat: -2.3070,
        lng: -78.1140
    }
];

console.log(`✅ ${negocios.length} negocios cargados correctamente`);

// Hacer array disponible globalmente
window.negocios = negocios;