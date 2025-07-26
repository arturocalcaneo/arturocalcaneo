// Obtiene y valida los valores del formulario
function obtenerDatosFormulario() {
const nombre = document.getElementById('name').value.trim();
const motivo = document.getElementById('motivoConsulta').value;
const mensaje = document.getElementById('message').value.trim();

if (!nombre || !motivo) {
    alert('Por favor, completa los campos requeridos.');
    return null;
}

return { nombre, motivo, mensaje };
}

// Construye el texto formateado para WhatsApp
function construirMensaje({ nombre, motivo, mensaje }) {
let texto = `Hola, me llamo *${nombre}* y quisiera hacer una consulta sobre *${motivo}*.\n\n`;

if (mensaje) {
    texto += `Te comparto un poco más de detalle:\n${mensaje}\n\n`;
}

texto += 'Quedo atento(a) a tu respuesta. Gracias.';

return texto;
}

// Abre WhatsApp Web con el mensaje preparado
function abrirWhatsApp(numeroDestino, textoMensaje) {
    const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(textoMensaje)}`;
    window.open(url, '_blank');
}

// Maneja el evento submit del formulario
function manejarEnvioFormulario(event) {
    event.preventDefault();

    const datos = obtenerDatosFormulario();
    if (!datos) return;

    const mensajeWhatsApp = construirMensaje(datos);

    // Reemplaza con tu número en formato internacional sin espacios ni signos
    const numeroDestino = '522292098172';

    abrirWhatsApp(numeroDestino, mensajeWhatsApp);
}

// Agregar listener cuando cargue el DOM
$(document).ready(function(){
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', manejarEnvioFormulario);
});