
// negocios.js - VERSIÓN CORREGIDA
console.log("🚀 Cargando datos de negocios de Macas...");

const negocios = [
    {
        id: 1,
        name: "Zapatería Colombiano",  // ← CORREGIDO: con acento
        category: "Reparación de Calzado",
        address: "Macas Centro, a lado de la cooperativa JEP",
        hours: "Lun-Sáb: 8:00 - 20:00 | Dom: 9:00 - 15:00",
        whatsapp: "593981342236",
        tags: ["Cambio de suela", "Arreglo de cuero", "Zapatos escolares", "Tacones", "Botas", "Urgencias", "Cambio cierres de bolso mochila pantalon y otros...!"],
        featured: true,
        phone: "0981342236",
        description: "🏆 ¡FUNDADOR DE MACASCONECTA! 🏆\n\n35 años reparando el calzado de Macas. Especialista en cuero, cambio de suelas y arreglos urgentes.",
        icono: "fas fa-shoe-prints",
        color: "#8B4513",
        lat: -2.3087,
        lng: -78.1114,
        // Campos para DM (mantener compatibilidad)
        nombre: "Zapatería Colombiano",
        categoria: "Reparación de Calzado",
        telefono: "0981342236",
        mensajesPendientes: 0,
        seleccionado: true,
        fundador: true,
        ofertaEspecial: "25% descuento por usar MacasConecta"
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
        phone: "0994544402",
        description: "Agencia de viajes y turismo con los mejores destinos",
        icono: "fas fa-plane",
        color: "#0984e3",
        lat: -2.3090,
        lng: -78.1120,
        // Campos para DM
        nombre: "Viaja Conmigo Ecuador",
        categoria: "Turismo",
        telefono: "0994544402",
        mensajesPendientes: 2,
        seleccionado: true
    },
    {
        id: 3,  // ← ¡ESTE DEBERÍA SER ELECTRÓNICA OCHOA, NO ZAPATERÍA DUPLICADA!
        name: "Electrónica Ochoa",
        category: "Reparación Electrónica",
        address: "Calle Amazonas, Macas",
        hours: "08:00 - 20:00",
        whatsapp: "593981139424",
        tags: ["Reparación", "Electrónica", "Técnico", "Mantenimiento"],
        featured: false,
        phone: "0981139424",
        description: "Reparación y mantenimiento de equipos electrónicos",
        icono: "fas fa-tv",
        color: "#8e44ad",
        lat: -2.3075,
        lng: -78.1130,
        // Campos para DM
        nombre: "Electrónica Ochoa",
        categoria: "Electrónica",
        telefono: "0981139424",
        mensajesPendientes: 1,
        seleccionado: true
    },

     {
        id: 4,
        name: "Restaurant Proaño",
        category: "Restaurante",
        address: "Barrio Proaño, Macas",
        hours: "07:00 - 20:00",
        whatsapp: "593989866092",
        tags: ["Comida típica", "Almuerzos", "Cenas", "Platos ecuatorianos"],
        featured: true,
        phone: "0989866092",
        description: "Comida típica ecuatoriana con los mejores sabores de Macas",
        icono: "fas fa-utensils",
        color: "#e67e22",
        lat: -2.3100,
        lng: -78.1090,
        // Campos adicionales para DM
        nombre: "Restaurant Proaño",
        categoria: "Restaurante",
        telefono: "0989866092",
        mensajesPendientes: 0,
        seleccionado: false
    },
     {
       id: 5,
     name: "Farmacia Mia",
        category: "Farmacia",
        address: "Av. Amazonas, Macas",
        hours: "09:00 - 20:00",
        whatsapp: "593990035600",
        tags: ["Medicamentos", "Farmacia", "Salud", "Despacho a domicilio"],
        featured: false,
        phone: "0990035600",
        description: "Farmacia con amplio stock y despacho a domicilio",
        icono: "fas fa-pills",
        color: "#e74c3c",
        lat: -2.3065,
        lng: -78.1110,
        // Campos adicionales para DM
        nombre: "Farmacia Mia",
        categoria: "Farmacia",
        telefono: "0990035600",
        mensajesPendientes: 0,
        seleccionado: false
},
    {
        id: 6,
        name: "Taller Mecánico Rápido",
        category: "Mecánica Automotriz",
        address: "Vía al Puyo, Macas",
        hours: "08:00 - 18:00",
        whatsapp: "593987654321",
        tags: ["Mecánica", "Reparación", "Automóviles", "Mantenimiento"],
        featured: false,
        phone: "0987654321",
        description: "Taller mecánico especializado en todo tipo de vehículos",
        icono: "fas fa-car",
        color: "#34495e",
        lat: -2.3120,
        lng: -78.1080,
        // Campos adicionales para DM
        nombre: "Taller Mecánico Rápido",
        categoria: "Mecánica",
        telefono: "0987654321",
        mensajesPendientes: 0,
        seleccionado: false
    },
    {
        id: 7,
        name: "Supermercado El Ahorro",
        category: "Supermercado",
        address: "Centro Comercial Macas",
        hours: "07:00 - 21:00",
        whatsapp: "593996633221",
        tags: ["Supermercado", "Abarrotes", "Víveres", "Despensa"],
        featured: false,
        phone: "0996633221",
        description: "Supermercado con los mejores precios y variedad",
        icono: "fas fa-shopping-cart",
        color: "#27ae60",
        lat: -2.3070,
        lng: -78.1140,
        // Campos adicionales para DM
        nombre: "Supermercado El Ahorro",
        categoria: "Supermercado",
        telefono: "0996633221",
        mensajesPendientes: 0,
        seleccionado: false
    },
    {
        id: 8,
        name: "Moto Servicio Macas",
        category: "Transporte",
        address: "Av. Ciudad de Macas",
        hours: "07:00 - 19:00",
        whatsapp: "593991234567",
        tags: ["Moto", "Transporte", "Mensajería", "Servicio"],
        featured: true,
        phone: "0991234567",
        description: "Servicio de transporte y mensajería en moto",
        icono: "fas fa-motorcycle",
        color: "#2575fc",
        lat: -2.3050,
        lng: -78.1100,
        // Campos adicionales para DM
        nombre: "Moto Servicio Macas",
        categoria: "Transporte",
        telefono: "0991234567",
        mensajesPendientes: 3,
        seleccionado: true
    },
    {
        id: 9,
        name: "Loccion Nelly",
        category: "Belleza y Spa",
        address: "Calle 10 de Agosto, Macas",
        hours: "09:00 - 19:00",
        whatsapp: "593987654321",
        tags: ["Belleza", "Spa", "Cuidado personal", "Estética"],
        featured: true,
        phone: "0987654321",
        description: "Centro de belleza y spa con los mejores tratamientos",
        icono: "fas fa-spa",
        color: "#ff6b9d",
        lat: -2.3080,
        lng: -78.1150,
        // Campos adicionales para DM
        nombre: "Loccion Nelly",
        categoria: "Belleza",
        telefono: "0987654321",
        mensajesPendientes: 2,
        seleccionado: true
    }
 
    // ... Los demás negocios (IDs 4, 5, 6, etc.)
];

console.log(`✅ ${negocios.length} negocios cargados correctamente`);
window.negocios = negocios;
