// script.js - FUNCIONALIDAD COMPLETA DE MACASCONECTA
console.log("🚀 Iniciando MacasConecta...");

// ============================================
// 1. FUNCIÓN PARA CREAR TARJETA DE NEGOCIO
// ============================================
function crearTarjetaNegocio(negocio) {
    const esEmergencia = negocio.hours && negocio.hours.includes("24");
    const esDestacado = negocio.featured;
    
    // Determinar clase CSS
    let claseTarjeta = "tarjeta-negocio";
    if (esDestacado) claseTarjeta += " destacado";
    if (esEmergencia) claseTarjeta += " emergencia";
    
    // Crear etiquetas HTML
    let etiquetasHTML = '';
    if (esEmergencia) {
        etiquetasHTML += '<span class="etiqueta-emergencia">🚨 24 HORAS</span>';
    }
    if (esDestacado) {
        etiquetasHTML += '<span class="etiqueta-destacado">⭐ DESTACADO</span>';
    }
    
    // Crear tags HTML
    let tagsHTML = '';
    if (negocio.tags && negocio.tags.length > 0) {
        tagsHTML = '<div class="etiquetas-negocio">';
        negocio.tags.forEach(tag => {
            tagsHTML += `<span class="etiqueta-item">${tag}</span>`;
        });
        tagsHTML += '</div>';
    }
    
    return `
        <div class="${claseTarjeta}" style="border-left-color: ${negocio.color || '#28a745'}" data-id="${negocio.id}">
            <div class="encabezado-tarjeta">
                <span class="etiqueta-categoria">
                    <i class="fas ${negocio.icono || 'fa-store'}"></i>
                    ${negocio.category}
                </span>
                <div class="etiquetas-superiores">
                    ${etiquetasHTML}
                </div>
            </div>
            
            <h3 class="nombre-negocio">${negocio.name}</h3>
            
            ${negocio.description ? `
            <p class="descripcion-negocio">${negocio.description}</p>
            ` : ''}
            
            <div class="detalles-negocio">
                <div class="detalle-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span><strong>Ubicación:</strong> ${negocio.address}</span>
                </div>
                
                <div class="detalle-item ${esEmergencia ? 'emergencia-horario' : ''}">
                    <i class="fas fa-clock"></i>
                    <span><strong>Horario:</strong> ${negocio.hours}</span>
                </div>
                
                ${negocio.phone ? `
                <div class="detalle-item">
                    <i class="fas fa-phone"></i>
                    <span><strong>Teléfono:</strong> ${negocio.phone}</span>
                </div>
                ` : ''}
                
                ${negocio.whatsapp ? `
                <div class="detalle-item">
                    <i class="fab fa-whatsapp"></i>
                    <span><strong>WhatsApp:</strong> ${negocio.whatsapp}</span>
                </div>
                ` : ''}
            </div>
            
            ${tagsHTML}
            
            <div class="botones-accion">
                ${negocio.phone ? `
                <a href="tel:${negocio.phone}" 
                   class="btn-accion ${esEmergencia ? 'btn-llamar-emergencia' : 'btn-llamar'}">
                    <i class="fas fa-phone"></i>
                    ${esEmergencia ? 'LLAMAR AHORITA' : 'LLAMAR'}
                </a>
                ` : ''}
                
                ${negocio.whatsapp ? `
                <a href="https://wa.me/${negocio.whatsapp}?text=Hola%20${encodeURIComponent(negocio.name)}%2C%20vi%20su%20negocio%20en%20MacasConecta" 
                   class="btn-accion btn-whatsapp" target="_blank">
                    <i class="fab fa-whatsapp"></i>
                    WHATSAPP
                </a>
                ` : ''}
                
                ${negocio.address ? `
                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(negocio.address + ', Macas, Ecuador')}" 
                   class="btn-accion btn-mapa" target="_blank">
                    <i class="fas fa-map-marker-alt"></i>
                    VER MAPA
                </a>
                ` : ''}
            </div>
        </div>
    `;
}

// ============================================
// 2. FUNCIÓN PARA MOSTRAR TODOS LOS NEGOCIOS
// ============================================
function mostrarNegocios() {
    console.log("📋 Mostrando negocios...");
    
    const contenedor = document.getElementById('listaNegocios');
    const contador = document.getElementById('contadorNumero');
    
    if (!contenedor) {
        console.error("❌ No se encontró el contenedor #listaNegocios");
        return;
    }
    
    if (!negocios || !Array.isArray(negocios)) {
        contenedor.innerHTML = `
            <div class="error-carga">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Error al cargar negocios</h3>
                <p>Intenta recargar la página (F5)</p>
            </div>
        `;
        return;
    }
    
    if (negocios.length === 0) {
        contenedor.innerHTML = `
            <div class="sin-resultados">
                <i class="fas fa-store-slash"></i>
                <h3>No hay negocios registrados</h3>
                <p>Sé el primero en agregar tu negocio</p>
                <a href="agregar.html" class="btn-accion btn-verde" style="margin-top: 20px;">
                    <i class="fas fa-plus"></i> Agregar mi negocio
                </a>
            </div>
        `;
        
        if (contador) contador.textContent = '0';
        return;
    }
    
    // Mostrar negocios
    contenedor.innerHTML = '';
    negocios.forEach(negocio => {
        contenedor.innerHTML += crearTarjetaNegocio(negocio);
    });
    
    // Actualizar contador
    if (contador) {
        contador.textContent = negocios.length;
    }
    
    console.log(`✅ Mostrados ${negocios.length} negocios`);
}

// ============================================
// 3. FUNCIÓN PARA BUSCAR NEGOCIOS
// ============================================
function buscarNegocios(termino) {
    console.log(`🔍 Buscando: "${termino}"`);
    
    const contenedor = document.getElementById('listaNegocios');
    const contador = document.getElementById('contadorNumero');
    
    if (!contenedor || !negocios) return;
    
    const terminoBusqueda = termino.toLowerCase().trim();
    
    // Si el término está vacío, mostrar todos
    if (!terminoBusqueda) {
        mostrarNegocios();
        return;
    }
    
    // Filtrar negocios
    const resultados = negocios.filter(negocio => {
        const busquedaEn = [
            negocio.name?.toLowerCase() || '',
            negocio.category?.toLowerCase() || '',
            negocio.description?.toLowerCase() || '',
            negocio.address?.toLowerCase() || '',
            ...(negocio.tags || []).map(tag => tag.toLowerCase())
        ];
        
        return busquedaEn.some(texto => texto.includes(terminoBusqueda));
    });
    
    // Mostrar resultados
    if (resultados.length === 0) {
        contenedor.innerHTML = `
            <div class="sin-resultados">
                <i class="fas fa-search"></i>
                <h3>No encontramos resultados</h3>
                <p>No hay negocios que coincidan con "<strong>${termino}</strong>"</p>
                <button class="btn-accion btn-verde" onclick="mostrarNegocios()" style="margin-top: 20px;">
                    <i class="fas fa-times"></i> Ver todos los negocios
                </button>
            </div>
        `;
    } else {
        contenedor.innerHTML = '';
        resultados.forEach(negocio => {
            contenedor.innerHTML += crearTarjetaNegocio(negocio);
        });
        
        console.log(`✅ Encontrados ${resultados.length} resultados`);
    }
    
    // Actualizar contador
    if (contador) {
        contador.textContent = resultados.length;
    }
}

// ============================================
// 4. FUNCIÓN PARA MOSTRAR CATEGORÍAS
// ============================================
function mostrarCategorias() {
    const categorias = [
        "Farmacia", "Taxi", "Restaurante", "Taller", 
        "Supermercado", "Hotel", "Electrónica", "Ropa",
        "Construcción", "Salud", "Educación", "Transporte",
        "Perfumería", "Viajes", "Mecánica", "Abarrotes"
    ];
    
    const listaCategorias = categorias.map((cat, index) => 
        `${index + 1}. ${cat}`
    ).join('\n');
    
    const categoriaSeleccionada = prompt(
        '📂 CATEGORÍAS DISPONIBLES:\n\n' + 
        listaCategorias + 
        '\n\nEscribe el nombre de la categoría que buscas:'
    );
    
    if (categoriaSeleccionada) {
        buscarNegocios(categoriaSeleccionada);
        const buscadorInput = document.getElementById('buscadorInput');
        if (buscadorInput) {
            buscadorInput.value = categoriaSeleccionada;
        }
    }
}

// ============================================
// 5. FUNCIÓN PARA COMPARTIR APP
// ============================================
function compartirApp() {
    const mensaje = `¡Descubre MacasConecta! 🗺️🤝

La app que conecta Macas con sus negocios locales.

✅ Encuentra farmacias, taxis, talleres
✅ Horarios y teléfonos actualizados
✅ Contacto directo por WhatsApp
✅ Totalmente GRATIS

¡Únete a la comunidad y encuentra todo en Macas!

${window.location.href}`;

    const urlWhatsApp = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
    
    // Abrir en nueva pestaña
    window.open(urlWhatsApp, '_blank');
    
    console.log("📤 App compartida por WhatsApp");
}

// ============================================
// 6. CONFIGURAR NAVEGACIÓN
// ============================================
function configurarNavegacion() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Quitar activo de todos
            menuItems.forEach(i => i.classList.remove('menu-activo'));
            
            // Agregar activo al clickeado
            this.classList.add('menu-activo');
            
            const seccion = this.querySelector('span').textContent;
            console.log(`📍 Navegando a: ${seccion}`);
            
            // Acciones según sección
            switch(seccion.toLowerCase()) {
                case 'inicio':
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
                case 'mapa':
                    alert('🗺️ Mapa de negocios (próximamente)');
                    break;
                case 'dm':
                    alert('💬 Mensajes directos (próximamente)');
                    break;
                case 'alertas':
                    alert('🔔 Sistema de alertas (próximamente)');
                    break;
                case 'cuenta':
                    alert('👤 Mi cuenta (próximamente)');
                    break;
            }
        });
    });
}

// ============================================
// 7. INICIALIZAR LA APLICACIÓN
// ============================================
function inicializarAplicacion() {
    console.log("⚡ Inicializando MacasConecta...");
    
    // 1. Verificar que los datos cargaron
    if (typeof negocios === 'undefined') {
        console.error("❌ ERROR: negocios.js no se cargó correctamente");
        const contenedor = document.getElementById('listaNegocios');
        if (contenedor) {
            contenedor.innerHTML = `
                <div class="error-carga">
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Error de carga</h3>
                    <p>Recarga la página o contacta soporte</p>
                    <button onclick="location.reload()" class="btn-accion btn-verde">
                        <i class="fas fa-redo"></i> Recargar página
                    </button>
                </div>
            `;
        }
        return;
    }
    
    console.log(`✅ Datos cargados: ${negocios.length} negocios`);
    
    // 2. Mostrar negocios iniciales
    mostrarNegocios();
    
    // 3. Configurar buscador
    const buscadorInput = document.getElementById('buscadorInput');
    const buscadorBoton = document.getElementById('buscadorBoton');
    
    if (buscadorInput && buscadorBoton) {
        buscadorBoton.addEventListener('click', () => {
            buscarNegocios(buscadorInput.value);
        });
        
        buscadorInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                buscarNegocios(buscadorInput.value);
            }
        });
        
        // Limpiar búsqueda al hacer clic en input
        buscadorInput.addEventListener('click', function() {
            if (this.value) {
                this.select();
            }
        });
    }
    
    // 4. Configurar botón de categorías
    const btnCategorias = document.getElementById('btnCategorias');
    if (btnCategorias) {
        btnCategorias.addEventListener('click', mostrarCategorias);
    }
    
    // 5. Configurar botón compartir
    const btnCompartir = document.getElementById('btnCompartir');
    if (btnCompartir) {
        btnCompartir.addEventListener('click', compartirApp);
    }
    
    // 6. Configurar navegación
    configurarNavegacion();
    
    // 7. Ocultar mensaje de carga
    const cargando = document.querySelector('.cargando-negocios');
    if (cargando) {
        cargando.style.display = 'none';
    }
    
    console.log("🎉 MacasConecta inicializada correctamente");
    console.log("==========================================");
    console.log("💡 CONSEJO PARA GANAR DINERO:");
    console.log("Habla con 10 negocios hoy, ofrece 1 mes GRATIS.");
    console.log("Si 5 aceptan pagar $5 después, ganas $25 mensuales.");
    console.log("==========================================");
}

// ============================================
// 8. CUANDO EL DOCUMENTO ESTÉ LISTO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log("📄 DOM completamente cargado");
    
    // Pequeño delay para asegurar carga completa
    setTimeout(inicializarAplicacion, 500);
});

// ============================================
// 9. HACER FUNCIONES DISPONIBLES GLOBALMENTE
// ============================================
window.mostrarNegocios = mostrarNegocios;
window.buscarNegocios = buscarNegocios;
window.compartirApp = compartirApp;
window.mostrarCategorias = mostrarCategorias;

// ============================================
// 10. MANEJAR ERRORES NO CAPTURADOS
// ============================================
window.addEventListener('error', function(e) {
    console.error('❌ Error no capturado:', e.message);
    console.error('En:', e.filename, 'línea:', e.lineno);
});

console.log("✅ script.js cargado y listo");