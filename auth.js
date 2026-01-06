// auth.js - Sistema de autenticación independiente por sección
console.log("🔐 Sistema de autenticación cargado");

const permisosPorSeccion = {
    'dm': false,
    'alertas': false,
    'cuenta': false,
    'telefonos': false,
    'ubicacion': false
};

// CONTRASEÑAS (¡CÁMBIALAS POR UNAS MÁS SEGURAS!)
const contraseñas = {
    'dm': 'dm123',
    'alertas': 'alert456',
    'cuenta': 'cuenta789',
    'telefonos': 'tel123',
    'ubicacion': 'ubi456'
};

// Verificar acceso a una sección específica
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
        `(Prueba con: ${contraseñas[seccion]})`
    );
    
    if (password === contraseñas[seccion]) {
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
        
        // Recargar para actualizar estado
        setTimeout(() => location.reload(), 1000);
    }
}

// Cerrar todas las sesiones
function cerrarTodasLasSesiones() {
    if (confirm('¿Cerrar TODAS las sesiones? Volverás a necesitar contraseñas para todo.')) {
        Object.keys(permisosPorSeccion).forEach(seccion => {
            localStorage.removeItem(`permiso_${seccion}`);
        });
        alert('✅ Todas las sesiones cerradas.');
        location.reload();
    }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', cargarPermisos);

// Exportar funciones para usar en otros archivos
window.verificarAcceso = verificarAcceso;
window.cerrarSesion = cerrarSesion;
window.cerrarTodasLasSesiones = cerrarTodasLasSesiones;
window.permisosPorSeccion = permisosPorSeccion;