// script.js - FUNCIONALIDAD COMPLETA DE MACASCONECTA (VERSIÓN CORREGIDA)
console.log("🚀 Iniciando MacasConecta...");

// ============================================
// 1. FUNCIÓN PARA CREAR TARJETA DE NEGOCIO (VERSIÓN CORREGIDA)
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
    
    // Obtener número de mensajes pendientes para este negocio
    const mensajesPendientes = obtenerMensajesPendientes(negocio.id) || 0;
    
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
                
                <!-- NUEVO BOTÓN DM -->
                <button class="btn-accion btn-dm" 
                        data-id="${negocio.id}"
                        data-nombre="${negocio.name}"
                        data-categoria="${negocio.category}">
                    <i class="fas fa-comment-dots"></i>
                    ${mensajesPendientes > 0 ? `DM (${mensajesPendientes})` : 'DM'}
                </button>
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
// 6. CONFIGURAR NAVEGACIÓN (VERSIÓN MEJORADA)
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
            
            // Acciones según sección (MEJORADO)
            switch(seccion.toLowerCase()) {
                case 'inicio':
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
                case 'mapa':
                    abrirMapaNegocios();
                    break;
                case 'dm':
                    window.location.href = 'dm.html';
                    break;
                case 'alertas':
                    mostrarAlertas();
                    break;
                case 'cuenta':
                    abrirMiCuenta();
                    break;
            }
        });
    });
}

// Nueva función para abrir DM desde tarjetas
function configurarBotonesDM() {
    // Agregar botones DM a cada tarjeta de negocio
    const botonesDM = document.querySelectorAll('.btn-dm');
    
    botonesDM.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const negocioId = this.dataset.id;
            const negocioNombre = this.dataset.nombre;
            
            // Redirigir a dm.html con parámetros
            window.location.href = `dm.html?negocio=${negocioId}&nombre=${encodeURIComponent(negocioNombre)}`;
        });
    });
}

// ============================================
// 7. INICIALIZAR LA APLICACIÓN (MEJORADA)
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
    
    // 2. Inicializar sistema de mensajes
    if (typeof sistemaMensajes !== 'undefined') {
        sistemaMensajes.actualizarNotificaciones();
    }
    
    // 3. Mostrar negocios iniciales
    mostrarNegocios();
    
    // 4. Configurar botones DM en las tarjetas
    setTimeout(() => {
        configurarBotonesDM();
    }, 100); // Pequeño delay para asegurar que las tarjetas se crearon
    
    // 5. Configurar buscador
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
    
    // 6. Configurar botón de categorías
    const btnCategorias = document.getElementById('btnCategorias');
    if (btnCategorias) {
        btnCategorias.addEventListener('click', mostrarCategorias);
    }
    
    // 7. Configurar botón compartir
    const btnCompartir = document.getElementById('btnCompartir');
    if (btnCompartir) {
        btnCompartir.addEventListener('click', compartirApp);
    }
    
    // 8. Configurar navegación
    configurarNavegacion();
    
    // 9. Ocultar mensaje de carga
    const cargando = document.querySelector('.cargando-negocios');
    if (cargando) {
        cargando.style.display = 'none';
    }
    
    // 10. Crear usuario por defecto si no existe
    if (!localStorage.getItem('usuario_macasconecta')) {
        localStorage.setItem('usuario_macasconecta', JSON.stringify({
            nombre: 'Usuario',
            email: '',
            telefono: '',
            fechaRegistro: new Date().toISOString(),
            negociosContactados: 0,
            mensajesEnviados: 0
        }));
    }
    
    console.log("🎉 MacasConecta inicializada correctamente");
    console.log("==========================================");
    console.log("💡 CONSEJO PARA GANAR DINERO:");
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

// ============================================
// 11. SISTEMA DE MENSAJES DM (NUEVO)
// ============================================

// Inicializar sistema de mensajes
const sistemaMensajes = {
    // Guardar mensaje
    enviarMensaje: function(negocioId, texto, tipo = 'personalizado') {
        const mensaje = {
            id: Date.now(),
            negocioId,
            texto,
            tipo,
            fecha: new Date().toISOString(),
            leido: false,
            timestamp: new Date().toLocaleString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: 'short'
            })
        };
        
        // Guardar en localStorage
        const mensajes = JSON.parse(localStorage.getItem('dm_mensajes') || '[]');
        mensajes.push(mensaje);
        localStorage.setItem('dm_mensajes', JSON.stringify(mensajes));
        
        // Actualizar notificaciones
        this.actualizarNotificaciones();
        
        return mensaje;
    },
    
    // Obtener mensajes por negocio
    obtenerMensajesNegocio: function(negocioId) {
        const mensajes = JSON.parse(localStorage.getItem('dm_mensajes') || '[]');
        return mensajes.filter(m => m.negocioId === negocioId);
    },
    
    // Marcar como leído
    marcarComoLeido: function(negocioId) {
        const mensajes = JSON.parse(localStorage.getItem('dm_mensajes') || '[]');
        mensajes.forEach(m => {
            if (m.negocioId === negocioId && !m.leido) {
                m.leido = true;
            }
        });
        localStorage.setItem('dm_mensajes', JSON.stringify(mensajes));
        this.actualizarNotificaciones();
    },
    
    // Actualizar notificaciones
    actualizarNotificaciones: function() {
        const mensajes = JSON.parse(localStorage.getItem('dm_mensajes') || '[]');
        const noLeidos = mensajes.filter(m => !m.leido);
        
        // Actualizar badge
        const badge = document.querySelector('.dm-notificacion');
        if (badge) {
            if (noLeidos.length > 0) {
                badge.textContent = noLeidos.length;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }
        
        return noLeidos.length;
    }
};

// Función auxiliar para obtener mensajes pendientes por negocio
function obtenerMensajesPendientes(negocioId) {
    const mensajes = JSON.parse(localStorage.getItem('dm_mensajes') || '[]');
    const mensajesNegocio = mensajes.filter(m => 
        m.negocioId === negocioId && !m.leido
    );
    return mensajesNegocio.length;
}

// ============================================
// 12. FUNCIONES AUXILIARES DM (NUEVO)
// ============================================

function abrirMapaNegocios() {
    // Mapa mejorado con ubicaciones reales
    const modalHTML = `
        <div id="modalMapa" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 1000;
            display: flex;
            flex-direction: column;
        ">
            <div style="
                background: linear-gradient(135deg, #6a11cb, #2575fc);
                color: white;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <h3 style="margin: 0;">
                    <i class="fas fa-map-marked-alt"></i> Mapa de Negocios
                </h3>
                <button onclick="cerrarModal('modalMapa')" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                ">×</button>
            </div>
            
            <div style="flex: 1; padding: 20px; background: white;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <p style="color: #666;">
                        <i class="fas fa-info-circle"></i>
                        Los negocios aparecerán aquí en próximas actualizaciones
                    </p>
                </div>
                
                <div style="
                    background: #f8f9ff;
                    border-radius: 10px;
                    padding: 20px;
                    margin-bottom: 20px;
                ">
                    <h4 style="color: #6a11cb; margin-top: 0;">
                        <i class="fas fa-map-pin"></i> Negocios por zona
                    </h4>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
                        ${negocios ? negocios.map(negocio => `
                            <div style="
                                background: white;
                                padding: 15px;
                                border-radius: 8px;
                                border-left: 4px solid ${negocio.color || '#6a11cb'};
                                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                            ">
                                <h5 style="margin: 0 0 10px 0; color: #333;">${negocio.name}</h5>
                                <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">
                                    <i class="fas fa-map-marker-alt"></i> ${negocio.address}
                                </p>
                                <button onclick="abrirUbicacion('${negocio.address}')" style="
                                    background: #2575fc;
                                    color: white;
                                    border: none;
                                    padding: 8px 15px;
                                    border-radius: 5px;
                                    cursor: pointer;
                                    font-size: 13px;
                                    margin-top: 10px;
                                ">
                                    <i class="fas fa-directions"></i> Cómo llegar
                                </button>
                            </div>
                        `).join('') : '<p>No hay negocios cargados</p>'}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function abrirUbicacion(direccion) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion + ', Macas, Ecuador')}`, '_blank');
}

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.remove();
}

function mostrarAlertas() {
    const alertas = [
        { tipo: 'info', mensaje: '📢 Nuevos negocios agregados esta semana', fecha: 'Hoy' },
        { tipo: 'success', mensaje: '✅ 5 personas contactaron negocios hoy', fecha: 'Hoy' },
        { tipo: 'warning', mensaje: '⚠️ Algunos negocios tienen horarios actualizados', fecha: 'Ayer' }
    ];
    
    const modalHTML = `
        <div id="modalAlertas" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
        ">
            <div style="
                background: white;
                width: 90%;
                max-width: 400px;
                border-radius: 15px;
                overflow: hidden;
            ">
                <div style="
                    background: linear-gradient(135deg, #ff9500, #ff5e3a);
                    color: white;
                    padding: 20px;
                    text-align: center;
                ">
                    <h3 style="margin: 0;">
                        <i class="fas fa-bell"></i> Alertas
                    </h3>
                </div>
                
                <div style="padding: 20px; max-height: 400px; overflow-y: auto;">
                    ${alertas.map(alerta => `
                        <div style="
                            background: ${alerta.tipo === 'info' ? '#e3f2fd' : alerta.tipo === 'success' ? '#e8f5e9' : '#fff3e0'};
                            border-left: 4px solid ${alerta.tipo === 'info' ? '#2196f3' : alerta.tipo === 'success' ? '#4caf50' : '#ff9800'};
                            padding: 15px;
                            margin-bottom: 10px;
                            border-radius: 0 8px 8px 0;
                        ">
                            <div>${alerta.mensaje}</div>
                            <div style="
                                font-size: 12px;
                                color: #888;
                                text-align: right;
                                margin-top: 5px;
                            ">${alerta.fecha}</div>
                        </div>
                    `).join('')}
                    
                    <div style="text-align: center; margin-top: 20px;">
                        <button onclick="cerrarModal('modalAlertas')" style="
                            background: #6a11cb;
                            color: white;
                            border: none;
                            padding: 12px 30px;
                            border-radius: 25px;
                            cursor: pointer;
                            font-weight: bold;
                        ">
                            <i class="fas fa-check"></i> Entendido
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function abrirMiCuenta() {
    const usuario = JSON.parse(localStorage.getItem('usuario_macasconecta')) || {
        nombre: 'Usuario',
        email: '',
        telefono: '',
        fechaRegistro: new Date().toISOString()
    };
    
    const modalHTML = `
        <div id="modalCuenta" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
        ">
            <div style="
                background: white;
                width: 90%;
                max-width: 400px;
                border-radius: 15px;
                overflow: hidden;
            ">
                <div style="
                    background: linear-gradient(135deg, #6a11cb, #2575fc);
                    color: white;
                    padding: 30px 20px;
                    text-align: center;
                ">
                    <div style="
                        width: 80px;
                        height: 80px;
                        background: rgba(255,255,255,0.2);
                        border-radius: 50%;
                        margin: 0 auto 15px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 32px;
                    ">
                        <i class="fas fa-user"></i>
                    </div>
                    <h3 style="margin: 0 0 5px 0;">${usuario.nombre}</h3>
                    <p style="margin: 0; opacity: 0.9;">Miembro desde ${new Date(usuario.fechaRegistro).toLocaleDateString('es-ES')}</p>
                </div>
                
                <div style="padding: 20px;">
                    <div style="margin-bottom: 20px;">
                        <h4 style="color: #6a11cb; margin-top: 0;">
                            <i class="fas fa-chart-line"></i> Mi Actividad
                        </h4>
                        <p>Negocios contactados: <strong>${usuario.negociosContactados || 0}</strong></p>
                        <p>Mensajes enviados: <strong>${usuario.mensajesEnviados || 0}</strong></p>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <h4 style="color: #6a11cb; margin-top: 0;">
                            <i class="fas fa-cog"></i> Configuración
                        </h4>
                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            <button onclick="editarPerfil()" style="
                                background: #f0f2ff;
                                border: 2px solid #6a11cb;
                                color: #6a11cb;
                                padding: 10px;
                                border-radius: 8px;
                                cursor: pointer;
                                font-weight: bold;
                            ">
                                <i class="fas fa-user-edit"></i> Editar perfil
                            </button>
                            
                            <button onclick="cerrarSesion()" style="
                                background: #fff0f0;
                                border: 2px solid #ff4757;
                                color: #ff4757;
                                padding: 10px;
                                border-radius: 8px;
                                cursor: pointer;
                                font-weight: bold;
                            ">
                                <i class="fas fa-sign-out-alt"></i> Cerrar sesión
                            </button>
                        </div>
                    </div>
                    
                    <div style="text-align: center;">
                        <button onclick="cerrarModal('modalCuenta')" style="
                            background: #6a11cb;
                            color: white;
                            border: none;
                            padding: 12px 30px;
                            border-radius: 25px;
                            cursor: pointer;
                            font-weight: bold;
                        ">
                            <i class="fas fa-times"></i> Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function editarPerfil() {
    const usuario = JSON.parse(localStorage.getItem('usuario_macasconecta')) || {
        nombre: 'Usuario',
        email: '',
        telefono: ''
    };
    
    const nuevoNombre = prompt('Ingresa tu nombre:', usuario.nombre);
    if (nuevoNombre) {
        usuario.nombre = nuevoNombre;
        localStorage.setItem('usuario_macasconecta', JSON.stringify(usuario));
        cerrarModal('modalCuenta');
        abrirMiCuenta(); // Recargar modal
        mostrarToast('✅ Perfil actualizado', 'success');
    }
}

function cerrarSesion() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        // Aquí podrías limpiar datos de sesión si los hubiera
        cerrarModal('modalCuenta');
        mostrarToast('👋 Sesión cerrada', 'info');
    }
}

// Función de toast (notificación)
function mostrarToast(mensaje, tipo = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#4CAF50' : tipo === 'warning' ? '#FF9800' : tipo === 'error' ? '#FF4757' : '#2196F3'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1002;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
    `;
    
    const icon = tipo === 'success' ? '✅' : tipo === 'warning' ? '⚠️' : tipo === 'error' ? '❌' : 'ℹ️';
    toast.innerHTML = `${icon} ${mensaje}`;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Agregar estilos CSS para las animaciones
const estiloAnimaciones = document.createElement('style');
estiloAnimaciones.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(estiloAnimaciones);

// Hacer funciones disponibles globalmente
window.abrirMapaNegocios = abrirMapaNegocios;
window.mostrarAlertas = mostrarAlertas;
window.abrirMiCuenta = abrirMiCuenta;
window.editarPerfil = editarPerfil;
window.cerrarSesion = cerrarSesion;
window.mostrarToast = mostrarToast;
window.obtenerMensajesPendientes = obtenerMensajesPendientes;
window.cerrarModal = cerrarModal;
window.abrirUbicacion = abrirUbicacion;

console.log("✅ script.js cargado y listo");

//🥑🥑🥑🥑🥑🥑🥑
// ============================================
// SOLUCIÓN DEFINITIVA PARA BOTÓN DM
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        console.log("🚀 CONFIGURANDO BOTONES DM DEFINITIVAMENTE...");
        
        // 1. Asegurar que todos los botones DM tengan los atributos correctos
        document.querySelectorAll('.tarjeta-negocio').forEach((tarjeta, index) => {
            const botonesAccion = tarjeta.querySelector('.botones-accion');
            const nombreNegocio = tarjeta.querySelector('.nombre-negocio')?.textContent || `Negocio ${index + 1}`;
            const idNegocio = tarjeta.getAttribute('data-id') || (index + 1);
            
            if (botonesAccion) {
                // Verificar si ya existe botón DM
                let botonDM = botonesAccion.querySelector('.btn-dm');
                
                if (!botonDM) {
                    // Crear botón DM si no existe
                    botonDM = document.createElement('button');
                    botonDM.className = 'btn-accion btn-dm';
                    botonDM.innerHTML = '<i class="fas fa-comment-dots"></i> DM';
                    botonesAccion.appendChild(botonDM);
                    console.log(`✅ Botón DM creado para: ${nombreNegocio}`);
                }
                
                // Asegurar atributos
                botonDM.setAttribute('data-id', idNegocio);
                botonDM.setAttribute('data-nombre', nombreNegocio);
                botonDM.setAttribute('data-categoria', 'Negocio');
                
                // Remover eventos anteriores
                const nuevoBoton = botonDM.cloneNode(true);
                botonDM.parentNode.replaceChild(nuevoBoton, botonDM);
                
                // Configurar evento CLICK correctamente
                nuevoBoton.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const negocioId = this.getAttribute('data-id');
                    const negocioNombre = this.getAttribute('data-nombre');
                    
                    console.log(`📤 Redirigiendo a DM con: ${negocioNombre} (ID: ${negocioId})`);
                    alert(`Redirigiendo a chat con: ${negocioNombre}`); // Para depuración
                    
                    // REDIRECCIÓN CORRECTA
                    window.location.href = `dm.html?negocio=${negocioId}&nombre=${encodeURIComponent(negocioNombre)}`;
                });
                
                // También agregar estilo inline por si acaso
                nuevoBoton.style.cssText = `
                    background: linear-gradient(135deg, #6a11cb, #2575fc);
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: bold;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    text-decoration: none;
                    margin: 5px;
                `;
            }
        });
        
        console.log(`✅ Configurados ${document.querySelectorAll('.btn-dm').length} botones DM`);
        
        // 2. Verificar que dm.html existe
        fetch('dm.html')
            .then(response => {
                if (response.ok) {
                    console.log("✅ dm.html existe y es accesible");
                } else {
                    console.error("❌ dm.html NO existe o hay error");
                    alert("Error: El archivo dm.html no se encuentra. Verifica que exista en la carpeta.");
                }
            })
            .catch(error => {
                console.error("❌ Error accediendo a dm.html:", error);
            });
            
    }, 1500); // Esperar 1.5 segundos
});

// ============================================
// MEJORAS PARA SISTEMA DM
// ============================================

// Solo se ejecuta si estamos en dm.html
if (window.location.pathname.includes('dm.html')) {
    console.log("🔧 Aplicando mejoras para dm.html");
    
    // 1. Sistema de persistencia de selecciones
    const dmMejoras = {
        guardarSelecciones: function() {
            const selecciones = [];
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                if (checkbox.checked && checkbox.id.includes('negocio-')) {
                    selecciones.push(checkbox.id);
                }
            });
            localStorage.setItem('dm_selecciones', JSON.stringify(selecciones));
            console.log(`💾 Selecciones guardadas: ${selecciones.length}`);
        },
        
        cargarSelecciones: function() {
            const guardadas = JSON.parse(localStorage.getItem('dm_selecciones') || '[]');
            console.log(`📂 Cargando ${guardadas.length} selecciones`);
            
            guardadas.forEach(id => {
                const checkbox = document.getElementById(id);
                if (checkbox) checkbox.checked = true;
            });
            
            // Actualizar contador si existe la función
            if (typeof cargarNegociosDM === 'function') {
                setTimeout(() => cargarNegociosDM(), 100);
            }
        },
        
        actualizarBadge: function() {
            const mensajes = JSON.parse(localStorage.getItem('dm_mensajes') || '[]');
            const noLeidos = mensajes.filter(m => !m.leido).length;
            
            const badge = document.querySelector('#contador-negocios');
            if (badge && noLeidos > 0) {
                badge.innerHTML = `${noLeidos} 📩`;
                badge.style.background = '#ff4757';
            }
            
            return noLeidos;
        }
    };
    
    // Configurar cuando el DOM esté listo
    setTimeout(() => {
        // Cargar selecciones guardadas
        dmMejoras.cargarSelecciones();
        
        // Guardar automáticamente cuando cambien checkboxes
        document.addEventListener('change', function(e) {
            if (e.target.type === 'checkbox') {
                dmMejoras.guardarSelecciones();
            }
        });
        
        // Actualizar badge periódicamente
        setInterval(() => dmMejoras.actualizarBadge(), 5000);
        dmMejoras.actualizarBadge(); // Primera vez
        
        console.log("✅ Mejoras DM aplicadas correctamente");
    }, 1000);
}