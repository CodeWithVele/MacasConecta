// script.js - FUNCIONALIDADES PRINCIPALES DE MACASCONECTA
console.log("🚀 MacasConecta cargando...");

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM cargado, iniciando MacasConecta...");
    
    // Verificar si hay negocios cargados
    if (typeof window.negociosMacas === 'undefined') {
        console.warn("⚠️ No se encontró negocios.js, cargando datos de respaldo...");
        cargarDatosRespaldo();
    }
    
    // Inicializar contador de negocios
    actualizarContadorNegocios();
    
    // Cargar negocios en la página principal
    cargarNegociosInicio();
    
    // Configurar sistema de compartir
    configurarCompartir();
    
    // Configurar menú de navegación
    configurarNavegacion();
    
    console.log("🎉 MacasConecta completamente cargado");
});

// Función para cargar datos de respaldo si no hay negocios.js
function cargarDatosRespaldo() {
    window.negociosMacas = [
        {
            id: 1,
            nombre: "Zapatería Colombiano",
            categoria: "Reparación de Calzado",
            descripcion: "¡FUNDADOR DE MACASCONECTA! 🌟 35 años reparando el calzado de Macas.",
            ubicacion: "Macas Centro",
            telefono: "0981342236",
            fundador: true
        }
    ];
}

// Función para actualizar el contador de negocios
function actualizarContadorNegocios() {
    const contador = document.getElementById('contadorNumero');
    if (contador && window.negociosMacas) {
        contador.textContent = window.negociosMacas.length;
    }
}

// Función para cargar negocios en la página principal
function cargarNegociosInicio() {
    const contenedor = document.getElementById('listaNegocios');
    if (!contenedor) return;
    
    // Limpiar mensaje de carga
    contenedor.innerHTML = '';
    
    if (!window.negociosMacas || window.negociosMacas.length === 0) {
        contenedor.innerHTML = `
            <div class="sin-resultados">
                <i class="fas fa-exclamation-circle"></i>
                <h3>No hay negocios disponibles</h3>
                <p>Pronto agregaremos más negocios de Macas.</p>
            </div>
        `;
        return;
    }
    
    // Mostrar máximo 4 negocios destacados en la página principal
    const negociosAMostrar = window.negociosMacas.slice(0, 4);
    
    negociosAMostrar.forEach(negocio => {
        const tarjeta = crearTarjetaNegocio(negocio);
        contenedor.appendChild(tarjeta);
    });
    
    // Si hay más de 4 negocios, agregar botón para ver todos
    if (window.negociosMacas.length > 4) {
        const verTodosBtn = document.createElement('a');
        verTodosBtn.href = 'negocios.html';
        verTodosBtn.className = 'btn-ver-todos';
        verTodosBtn.innerHTML = `
            <i class="fas fa-list"></i> Ver todos los ${window.negociosMacas.length} negocios
        `;
        contenedor.appendChild(verTodosBtn);
    }
}

// Función para crear tarjeta de negocio
function crearTarjetaNegocio(negocio) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-negocio';
    
    const contenidoHTML = `
        <div class="encabezado-tarjeta">
            <span class="etiqueta-categoria">
                <i class="fas fa-tag"></i> ${negocio.categoria}
            </span>
            ${negocio.fundador ? '<span class="etiqueta-destacado">🌟 FUNDADOR</span>' : ''}
        </div>
        
        <h3 class="nombre-negocio">
            ${negocio.nombre}
        </h3>
        
        <p class="descripcion-negocio">
            ${negocio.descripcion}
        </p>
        
        <div class="detalles-negocio">
            <div class="detalle-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>${negocio.ubicacion}</span>
            </div>
            ${negocio.telefono ? `
            <div class="detalle-item">
                <i class="fas fa-phone"></i>
                <span>${negocio.telefono}</span>
            </div>
            ` : ''}
            ${negocio.horario ? `
            <div class="detalle-item">
                <i class="fas fa-clock"></i>
                <span>${negocio.horario}</span>
            </div>
            ` : ''}
        </div>
        
        <div class="botones-accion">
            ${negocio.telefono ? `
            <a href="tel:${negocio.telefono}" class="btn-accion btn-llamar">
                <i class="fas fa-phone"></i> LLAMAR
            </a>
            ` : ''}
            
            ${negocio.whatsapp ? `
            <a href="https://wa.me/${negocio.whatsapp}" class="btn-accion btn-whatsapp" target="_blank">
                <i class="fab fa-whatsapp"></i> WHATSAPP
            </a>
            ` : ''}
            
            <a href="dm.html?negocio=${negocio.id}" class="btn-accion btn-dm">
                <i class="fas fa-comment-dots"></i> DM
            </a>
        </div>
    `;
    
    tarjeta.innerHTML = contenidoHTML;
    return tarjeta;
}

// Configurar sistema de compartir
function configurarCompartir() {
    const btnCompartir = document.getElementById('btnCompartir');
    if (btnCompartir) {
        btnCompartir.addEventListener('click', function() {
            const url = window.location.href;
            const mensaje = "¡Mira esta app increíble para encontrar negocios en Macas! - MacasConecta";
            const whatsappURL = `https://wa.me/?text=${encodeURIComponent(mensaje + " " + url)}`;
            
            window.open(whatsappURL, '_blank');
        });
    }
}

// Configurar navegación del menú
function configurarNavegacion() {
    // Verificar si ya tiene acceso para actualizar íconos
    if (typeof window.permisosPorSeccion !== 'undefined') {
        const dmIcon = document.querySelector('#dm-icono, .dm-notificacion');
        const alertasIcon = document.querySelector('#alertas-icono');
        
        if (dmIcon && window.permisosPorSeccion.dm) {
            dmIcon.textContent = '💬';
            dmIcon.style.background = '#6a11cb';
        }
        
        if (alertasIcon && window.permisosPorSeccion.alertas) {
            alertasIcon.textContent = '🔔';
            alertasIcon.style.color = '#28a745';
        }
    }
}

// Función para contactar negocio (global)
window.contactarNegocio = function(telefono) {
    if (telefono && telefono.trim() !== '') {
        const mensaje = "Hola, vi tu negocio en MacasConecta y me interesa...";
        const url = `https://wa.me/593${telefono.replace(/\D/g, '')}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
    } else {
        alert('Este negocio no tiene número de contacto registrado.');
    }
};

// Función para ver en mapa (global)
window.verEnMapa = function(ubicacion) {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ubicacion)}`;
    window.open(url, '_blank');
};

// Exportar para debugging
console.log("📦 script.js cargado exitosamente");