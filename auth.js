// auth.js - Sistema de autenticación independiente por sección
console.log("🔐 Sistema de autenticación cargado");

// Usar tu contraseña original
const CONTRASEÑA_MAESTRA = "macas2024"; 

// Permisos por sección
const permisosPorSeccion = {
    'dm': false,
    'alertas': false,
    'cuenta': false,
    'telefonos': false,
    'ubicacion': false
};

// Función principal de verificación
function verificarAcceso(seccion) {
    console.log(`🔐 Verificando acceso a: ${seccion}`);
    
    // Si ya tiene permiso
    if (permisosPorSeccion[seccion] === true) {
        console.log(`✅ Ya tiene acceso a ${seccion}`);
        return true;
    }
    
    // Si está guardado en localStorage
    if (localStorage.getItem(`permiso_${seccion}`) === 'true') {
        console.log(`✅ Permiso encontrado en localStorage para ${seccion}`);
        permisosPorSeccion[seccion] = true;
        return true;
    }
    
    // Pedir contraseña
    const password = prompt(
        `🔒 ACCESO PRIVADO - ${seccion.toUpperCase()}\n\n` +
        `Ingresa la contraseña para acceder a esta sección:\n` +
        `(Contraseña: ${CONTRASEÑA_MAESTRA})`
    );
    
    if (password === CONTRASEÑA_MAESTRA) {
        // Acceso concedido
        permisosPorSeccion[seccion] = true;
        localStorage.setItem(`permiso_${seccion}`, 'true');
        
        console.log(`✅ Acceso CONCEDIDO a ${seccion}`);
        alert(`✅ ¡Acceso concedido! Ahora puedes usar ${seccion}.`);
        return true;
    } else {
        // Acceso denegado
        console.log(`❌ Acceso DENEGADO a ${seccion}`);
        alert('❌ Contraseña incorrecta. Acceso denegado.');
        return false;
    }
}

// Función para dar acceso rápido desde index.html
function darAccesoRapido() {
    const confirmar = confirm("¿Quieres acceder a todas las secciones privadas?\n\nSe habilitarán DM, Alertas y Mi Cuenta.");
    
    if (confirmar) {
        const password = prompt("Ingresa la contraseña de MacasConecta:");
        
        if (password === CONTRASEÑA_MAESTRA) {
            ['dm', 'alertas', 'cuenta'].forEach(seccion => {
                permisosPorSeccion[seccion] = true;
                localStorage.setItem(`permiso_${seccion}`, 'true');
            });
            alert('✅ ¡Acceso concedido a todas las secciones!');
            return true;
        } else {
            alert('❌ Contraseña incorrecta');
            return false;
        }
    }
    return false;
}

// Cargar permisos guardados al iniciar
function cargarPermisos() {
    console.log("📋 Cargando permisos guardados...");
    
    Object.keys(permisosPorSeccion).forEach(seccion => {
        if (localStorage.getItem(`permiso_${seccion}`) === 'true') {
            permisosPorSeccion[seccion] = true;
            console.log(`   ✅ ${seccion}: PERMITIDO`);
        } else {
            console.log(`   ❌ ${seccion}: BLOQUEADO`);
        }
    });
}

// Cerrar sesión de una sección específica
function cerrarSesion(seccion) {
    if (confirm(`¿Seguro que quieres cerrar sesión de ${seccion.toUpperCase()}?`)) {
        permisosPorSeccion[seccion] = false;
        localStorage.removeItem(`permiso_${seccion}`);
        
        console.log(`🔓 Sesión cerrada para ${seccion}`);
        alert(`🔓 Sesión cerrada para ${seccion}. Necesitarás la contraseña para volver a acceder.`);
        
        return true;
    }
    return false;
}

// Cerrar todas las sesiones
function cerrarTodasLasSesiones() {
    if (confirm('¿Cerrar TODAS las sesiones? Volverás a necesitar contraseñas para todo.')) {
        Object.keys(permisosPorSeccion).forEach(seccion => {
            localStorage.removeItem(`permiso_${seccion}`);
        });
        alert('✅ Todas las sesiones cerradas.');
        return true;
    }
    return false;
}

// Verificar si ya tiene algún acceso
function tieneAlgunAcceso() {
    return permisosPorSeccion.dm || permisosPorSeccion.alertas || permisosPorSeccion.cuenta;
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', cargarPermisos);

// Exportar funciones para usar en otros archivos
window.verificarAcceso = verificarAcceso;
window.darAccesoRapido = darAccesoRapido;
window.cerrarSesion = cerrarSesion;
window.cerrarTodasLasSesiones = cerrarTodasLasSesiones;
window.tieneAlgunAcceso = tieneAlgunAcceso;
window.permisosPorSeccion = permisosPorSeccion;
window.CONTRASEÑA_MAESTRA = CONTRASEÑA_MAESTRA;