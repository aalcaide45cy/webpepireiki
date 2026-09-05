# Memoria Técnica y Funcional del Proyecto: Blanco y Negro - Terapias Holísticas y Bienestar

**Cliente / Negocio:** Blanco y Negro - Terapias Holísticas y Bienestar  
**Ubicación Física:** Boiro (A Coruña, Galicia)  
**Terapeuta y Gerente:** Pepi  
**Repositorio GitHub:** [https://github.com/aalcaide45cy/webpepireiki.git](https://github.com/aalcaide45cy/webpepireiki.git)  
**Despliegue y Hosting:** Vercel (CI/CD automático sincronizado con la rama `main`)  
**Fecha de Redacción:** Septiembre 2026  

---

## 1. Resumen Ejecutivo y Objetivos del Proyecto

El objetivo principal es dotar a **Blanco y Negro** de una presencia digital profesional, serena y de alto impacto visual que refleje la filosofía del centro: **quiromasaje terapéutico, Reiki Usui, Registros Akáshicos, respiración consciente, talleres presenciales y venta de productos botánicos y de armonización**.

### Requisitos Estratégicos Clave:
1. **Velocidad y Fiabilidad Absoluta:** Construida con **Next.js 16 (App Router)**, Tailwind CSS y desplegada en **Vercel** para carga instantánea y optimización SEO.
2. **Identidad Gráfica Propia y Original:** Integración de la obra gráfica de la clienta (símbolo Yin-Yang en textura orgánica de carboncillo y cañas de bambú natural) como eje visual.
3. **Cero Costes Mensuales Fijos (0€ Mantenimiento):** Sin servidores dedicados de pago, sin suscripciones a Shopify o WooCommerce, y sin bases de datos pesadas que requieran administración técnica.
4. **Facilidad de Gestión para la Dueña (Pepi):** El catálogo y los pedidos se sincronizan con **Google Sheets**, de modo que Pepi puede gestionar su negocio desde su propio móvil u ordenador mediante una hoja de cálculo familiar.

---

## 2. Identidad Visual y Estructura Web

### 2.1. Logotipo y Recursos de Marca
- **Yin-Yang Circular (`/brand/yinyang.webp` y `/brand/yinyang.png`):** Extraído con transparencia alfa limpia en alta definición. Utilizado en favicon (`favicon.ico`, `icon.svg`, `icon.png`), cabecera de navegación (`Navbar.tsx`), asistente de citas (`BookingModal.tsx`) y pie de página (`Footer.tsx`).
- **Cañas de Bambú Zen Ambientales (`/brand/bamboo-left.webp` y `/brand/bamboo-right.webp`):** Extraídas del lienzo original con transparencia alfa perfecta (sin artefactos de recorte ni recuadros). Enmarcan los laterales de la pantalla fijas a `z-0`.
- **Paleta de Colores Natural:**
  - Fondo orgánico zen: Crema suave (`#fbf9f5`).
  - Verde bosque profundo: (`#3d5a4c` y `#2d473b`).
  - Dorado arena y bambú: (`#dfc89f` y `#b5935b`).
  - Tipografía de lectura: *Plus Jakarta Sans* para interfaz y *Playfair Display* para titulares editoriales.

### 2.2. Arquitectura de Páginas y Secciones
1. **Portada Principal (`/`):**
   - **Hero:** Mensaje de bienvenida, distintivo *"Armonía Yin-Yang & Bienestar Holístico · Boiro"*, botones de acción rápida.
   - **Tira de los 7 Chakras:** Explorador interactivo con significados, bloqueos emocionales y colores de frecuencia.
   - **Sobre el Espacio & Filosofía:** Trayectoria de Pepi y tarjetas dedicadas a la sabiduría del Yin-Yang y el Bambú.
   - **Carta de Terapias:** Fichas individuales de Quiromasaje, Reiki, Registros Akáshicos y Respiración.
   - **Talleres y Convocatorias:** Calendario formativo con modalidades presenciales y streaming.
   - **Espacio Botánico y Armonización:** Muestrario de aceites, minerales, rodillos y saquitos.
   - **Reseñas Verificadas:** Testimonios de clientes con enlace directo a Google Maps.
   - **Asistente de Reservas (`BookingModal.tsx`):** Modal interactivo para solicitar cita o consultar Google Calendar.
   - **Ubicación y Contacto:** Dirección en Boiro, teléfono, WhatsApp y preguntas frecuentes (FAQs).

2. **Tienda Holística (`/tienda`):**
   - Catálogo clasificado por categorías (*Aromaterapia*, *Minerales*, *Herramientas*, *Armonización*).
   - Buscador por texto en vivo.
   - Carrito deslizante (*CartDrawer*).
   - Proceso de pedido directo en 2 pasos.

---

## 3. Remodelación de la Tienda: Por qué se descartó WhatsApp y se eligió la Opción 2

### 3.1. Problemas Detectados con la "Opción A" (WhatsApp Commerce)
- Abrir la API de WhatsApp (`wa.me`) resulta inestable en ordenadores de sobremesa si el cliente no tiene la app instalada o WhatsApp Web activo.
- Transmite una imagen informal ("cutre" o amateur), poco acorde con un centro de terapias que proyecta exclusividad, confianza y rigor.
- Si el usuario cierra la ventana de WhatsApp antes de enviar, el pedido se perdía en el limbo.

### 3.2. La Solución Implantada: "Opción 2" (Checkout Integrado en la Web)
- **100% Dentro de la Web:** El cliente añade sus productos y finaliza el pedido en el propio panel lateral sin abandonar la página ni abrir aplicaciones externas.
- **Paso 1 (Cesta):** Control de unidades, eliminación de items y cálculo de subtotales.
- **Paso 2 (Formulario de Checkout):**
  - Datos de contacto: Nombre, Correo Electrónico (para el recibo) y Teléfono.
  - Modalidad de entrega:
    - **Recogida en Tienda (Gratis · Boiro)**.
    - **Envío a Domicilio** (con dirección, código postal y ciudad).
  - Forma de pago:
    - **Bizum Directo**.
    - **En Efectivo o Tarjeta al Recoger** en la tienda de Boiro.
- **Paso 3 (Confirmación en Pantalla):**
  - Genera automáticamente un **Código de Pedido Único Oficial** (ej. `#BYN-8421`).
  - Muestra en pantalla el importe exacto, el número de teléfono para el Bizum (`600 123 456`) y el código como concepto obligatorio, con **botones de copiado en 1 clic**.
  - Si eligió recogida, le confirma que su paquete le esperará en la tienda de Boiro.
  - Vacía la cesta automáticamente para evitar duplicidades.
  - Envía la comanda al endpoint serverless `/api/order`.

---

## 4. Integración con Google Sheets y Sistema de Envío de Emails

Para que Pepi lleve el control de forma limpia, sin perder pedidos y sin pagar comisiones ni cuotas mensuales de bases de datos, se define el siguiente sistema:

### 4.1. Estructura de la Pestaña `Pedidos` en Google Sheets
En la hoja de cálculo de Google Drive del negocio, se añade una pestaña llamada **`Pedidos`** con las siguientes columnas en la fila 1:

| Columna | Nombre de Cabecera | Descripción |
|---|---|---|
| **A** | `Fecha y Hora` | Fecha y hora en que se registró el pedido (ej. `05/09/2026, 14:30`) |
| **B** | `ID Pedido` | Código único de la comanda (ej. `#BYN-8421`) |
| **C** | `Cliente` | Nombre y apellidos del comprador |
| **D** | `Teléfono` | Móvil de contacto |
| **E** | `Email` | Correo electrónico del cliente |
| **F** | `Entrega` | *Recogida en Tienda (Boiro)* o *Envío a Domicilio* |
| **G** | `Dirección Envío` | Dirección, CP y Ciudad (o "N/A - Recogida en Boiro") |
| **H** | `Método Pago` | *Bizum* o *En Efectivo/Tarjeta en Tienda* |
| **I** | `Productos` | Desglose claro: `1x Lavanda Vera (16.50€), 2x Gua Sha (39.00€)` |
| **J** | `Total (€)` | Importe total del pedido |
| **K** | `Estado` | Desplegable editable por Pepi: `Pendiente Bizum`, `Pagado`, `Preparado`, `Entregado` |
| **L** | `Notas` | Observaciones especiales del cliente |

---

### 4.2. Código Automatizado en Google Apps Script
Este script se instala en la misma hoja de cálculo (`Extensiones -> Apps Script`). Cumple dos funciones simultáneas en menos de un segundo:
1. **Inserta la fila** en la pestaña `Pedidos`.
2. **Envía el correo electrónico de aviso** a `pedidos@pepi.com` y opcionalmente una copia elegante de confirmación al cliente.

```javascript
/**
 * GOOGLE APPS SCRIPT: RECEPCIÓN DE PEDIDOS Y NOTIFICACIÓN POR EMAIL
 * Blanco y Negro - Terapias Holísticas y Bienestar (Boiro)
 */

const EMAIL_TIENDA = "pedidos@pepi.com"; // Email que recibirá las alertas de pedidos
const NOMBRE_TIENDA = "Blanco y Negro - Terapias Holísticas";
const TELEFONO_BIZUM = "600 123 456";
const DIRECCION_TIENDA = "Boiro (A Coruña)";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // 1. Obtener o crear la pestaña 'Pedidos'
    let sheet = ss.getSheetByName("Pedidos");
    if (!sheet) {
      sheet = ss.insertSheet("Pedidos");
      sheet.appendRow([
        "Fecha y Hora",
        "ID Pedido",
        "Cliente",
        "Teléfono",
        "Email",
        "Entrega",
        "Dirección Envío",
        "Método Pago",
        "Productos",
        "Total (€)",
        "Estado",
        "Notas"
      ]);
      sheet.getRange(1, 1, 1, 12).setFontWeight("bold").setBackground("#eaf0ec");
    }

    // 2. Formatear la lista de productos
    const productosTexto = (data.items || []).map(function(item) {
      return item.quantity + "x " + item.product.name + " (" + (item.product.price * item.quantity).toFixed(2) + "€)";
    }).join("\n");

    const productosHtml = (data.items || []).map(function(item) {
      return "<li><strong>" + item.quantity + "x</strong> " + item.product.name + " &mdash; " + (item.product.price * item.quantity).toFixed(2) + "€</li>";
    }).join("");

    const direccionCompleta = data.deliveryType === "envio"
      ? (data.clientAddress + ", " + data.clientPostalCode + " " + data.clientCity)
      : "Recogida en Tienda (Boiro)";

    const metodoPagoTexto = data.paymentMethod === "bizum" ? "Bizum Directo" : "En Tienda (Efectivo/Tarjeta)";

    // 3. Añadir la fila a Google Sheets
    sheet.appendRow([
      data.orderDate || new Date().toLocaleString("es-ES"),
      data.orderId,
      data.clientName,
      data.clientPhone,
      data.clientEmail,
      data.deliveryType === "envio" ? "Envío a Domicilio" : "Recogida en Tienda",
      direccionCompleta,
      metodoPagoTexto,
      productosTexto,
      Number(data.total).toFixed(2) + " €",
      "Pendiente",
      data.notes || ""
    ]);

    // 4. Enviar Correo de Aviso a Pepi (pedidos@pepi.com)
    const asuntoPepi = "📦 Nuevo Pedido " + data.orderId + " - " + data.clientName + " (" + Number(data.total).toFixed(2) + "€)";
    const cuerpoPepiHtml = 
      "<div style='font-family: Arial, sans-serif; color: #212924; max-width: 600px; border: 1px solid #ece4d8; border-radius: 12px; padding: 24px;'>" +
        "<h2 style='color: #3d5a4c; margin-top: 0;'>🌿 ¡Nuevo Pedido en la Tienda Online!</h2>" +
        "<p>Has recibido un nuevo pedido registrado a través de la web:</p>" +
        "<div style='background: #fbf9f5; padding: 16px; border-radius: 8px; margin-bottom: 20px;'>" +
          "<p style='margin: 4px 0;'><strong>Código de Pedido:</strong> <span style='font-family: monospace; font-size: 16px; color: #3d5a4c;'>" + data.orderId + "</span></p>" +
          "<p style='margin: 4px 0;'><strong>Cliente:</strong> " + data.clientName + "</p>" +
          "<p style='margin: 4px 0;'><strong>Teléfono:</strong> <a href='tel:" + data.clientPhone + "'>" + data.clientPhone + "</a></p>" +
          "<p style='margin: 4px 0;'><strong>Email:</strong> " + data.clientEmail + "</p>" +
          "<p style='margin: 4px 0;'><strong>Modalidad:</strong> " + (data.deliveryType === 'envio' ? 'Envío a Domicilio' : 'Recogida en Tienda (Boiro)') + "</p>" +
          (data.deliveryType === 'envio' ? "<p style='margin: 4px 0;'><strong>Dirección de Envío:</strong> " + direccionCompleta + "</p>" : "") +
          "<p style='margin: 4px 0;'><strong>Forma de Pago:</strong> " + metodoPagoTexto + "</p>" +
          (data.notes ? "<p style='margin: 4px 0;'><strong>Notas del Cliente:</strong> " + data.notes + "</p>" : "") +
        "</div>" +
        "<h3 style='color: #3d5a4c; margin-bottom: 8px;'>Productos solicitados:</h3>" +
        "<ul style='line-height: 1.6;'>" + productosHtml + "</ul>" +
        "<div style='border-top: 2px solid #3d5a4c; padding-top: 12px; margin-top: 16px;'>" +
          "<p style='font-size: 18px; font-weight: bold; color: #212924; margin: 0;'>Total a cobrar: " + Number(data.total).toFixed(2) + " €</p>" +
        "</div>" +
      "</div>";

    MailApp.sendEmail({
      to: EMAIL_TIENDA,
      subject: asuntoPepi,
      htmlBody: cuerpoPepiHtml
    });

    // 5. Enviar Correo de Confirmación al Cliente
    if (data.clientEmail) {
      const asuntoCliente = "Confirmación de tu pedido " + data.orderId + " - " + NOMBRE_TIENDA;
      const cuerpoClienteHtml = 
        "<div style='font-family: Arial, sans-serif; color: #212924; max-width: 600px; border: 1px solid #ece4d8; border-radius: 12px; padding: 24px;'>" +
          "<h2 style='color: #3d5a4c; margin-top: 0;'>🌿 Gracias por tu pedido, " + data.clientName + "</h2>" +
          "<p>Hemos recibido tu comanda correctamente en <strong>" + NOMBRE_TIENDA + "</strong>.</p>" +
          "<div style='background: #fbf9f5; border: 1px solid #dfc89f; padding: 16px; border-radius: 8px; margin: 20px 0;'>" +
            "<p style='margin: 0; font-size: 14px;'>Tu número de pedido oficial es:</p>" +
            "<p style='margin: 8px 0; font-family: monospace; font-size: 22px; font-weight: bold; color: #3d5a4c;'>" + data.orderId + "</p>" +
            "<p style='margin: 0; font-size: 14px;'><strong>Total:</strong> " + Number(data.total).toFixed(2) + " €</p>" +
          "</div>" +
          (data.paymentMethod === 'bizum' ? 
            ("<div style='background: #eaf4ee; border: 1px solid #cbdbd0; padding: 14px; border-radius: 8px; margin-bottom: 20px;'>" +
               "<h4 style='color: #2e7d32; margin: 0 0 6px 0;'>Instrucciones de Pago por Bizum:</h4>" +
               "<p style='margin: 4px 0; font-size: 13px;'>1. Realiza tu Bizum al teléfono: <strong>" + TELEFONO_BIZUM + "</strong></p>" +
               "<p style='margin: 4px 0; font-size: 13px;'>2. Indica obligatoriamente en el concepto: <strong>" + data.orderId + "</strong></p>" +
               "<p style='margin: 4px 0; font-size: 13px;'>3. Importe exacto: <strong>" + Number(data.total).toFixed(2) + " €</strong></p>" +
             "</div>") : 
            ("<div style='background: #fbf9f5; border: 1px solid #cbdbd0; padding: 14px; border-radius: 8px; margin-bottom: 20px;'>" +
               "<h4 style='color: #3d5a4c; margin: 0 0 6px 0;'>Recogida en Tienda:</h4>" +
               "<p style='margin: 0; font-size: 13px;'>Te esperamos en nuestra tienda en <strong>" + DIRECCION_TIENDA + "</strong>. Podrás abonar tu pedido en efectivo o tarjeta en el momento de la recogida.</p>" +
             "</div>")
          ) +
          "<h3 style='color: #3d5a4c; margin-bottom: 8px;'>Resumen de productos:</h3>" +
          "<ul style='line-height: 1.6; font-size: 14px;'>" + productosHtml + "</ul>" +
          "<p style='font-size: 12px; color: #6e7d73; margin-top: 24px; border-top: 1px solid #ece4d8; padding-top: 12px;'>" +
            "Si tienes cualquier consulta, puedes responder a este correo o escribirnos a nuestro WhatsApp." +
          "</p>" +
        "</div>";

      MailApp.sendEmail({
        to: data.clientEmail,
        subject: asuntoCliente,
        htmlBody: cuerpoClienteHtml
      });
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true, orderId: data.orderId }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

### 4.3. Pasos de Instalación en Google Sheets (Guía de 2 minutos para Pepi)
1. Abrir la hoja de cálculo de Google Drive del negocio.
2. Hacer clic en el menú superior: **Extensiones &rarr; Apps Script**.
3. Borrar el código que haya y pegar el código anterior.
4. Ajustar si se desea el valor de `EMAIL_TIENDA = "pedidos@pepi.com"`.
5. Hacer clic en el botón azul superior **Implementar &rarr; Nueva implementación**:
   - Seleccionar tipo: **Aplicación web**.
   - Descripción: `Recepción de pedidos web`.
   - Ejecutar como: **Yo**.
   - Quién tiene acceso: **Cualquiera** (*Anyone*).
6. Pulsar **Implementar**, aceptar los permisos de Google y copiar la **URL de la aplicación web** generada.
7. Esa URL se añade en Vercel como variable de entorno `GOOGLE_SHEET_ORDERS_WEBHOOK_URL`.

---

## 5. Ventajas Técnicas y de Negocio del Sistema

1. **Coste 0€ Mensual Permanente:** Sin Shopify ($39/mes), sin servidores de base de datos ni pasarelas de pago con cuotas fijas.
2. **Doble Respaldo Antiextravíos:** El pedido nunca se pierde: queda guardado en la fila de Google Sheets aunque el correo caiga en spam o se borre por error.
3. **Máxima Tasa de Entrega de Email:** El correo lo envía Google internamente a través de `MailApp`, por lo que no es marcado como spam.
4. **Comprobante Inmediato para el Comprador:** El cliente recibe un correo formal con su código `#BYN-XXXX`, lo que incrementa exponencialmente la tasa de pago voluntario por Bizum.
5. **Facilidad Contable:** Pepi puede añadir columnas extra en Google Sheets (como notas de facturación, fecha de pago o notas de envío) sin romper nada de la web.

---

## 6. Estado del Código y Despliegue

| Componente | Estado | Ubicación en el Código |
|---|---|---|
| **Página de Tienda** | ✅ Completado | `src/app/tienda/page.tsx` y `src/app/tienda/ShopClient.tsx` |
| **Guía de 4 Pasos en Cabecera** | ✅ Completado | `src/app/tienda/ShopClient.tsx` (bajo el título principal) |
| **Carrito Persistente (LocalStorage)** | ✅ Completado | `src/context/CartContext.tsx` |
| **Drawer de Checkout & Confirmación** | ✅ Completado | `src/components/CartDrawer.tsx` |
| **Endpoint Serverless de Pedidos** | ✅ Completado | `src/app/api/order/route.ts` |
| **Ubicación Boiro & Recogida en Tienda** | ✅ Completado | `src/data/defaultContent.ts` y componentes globales |
| **Control de Versiones y Despliegue** | ✅ Sincronizado | Rama `main` en [GitHub](https://github.com/aalcaide45cy/webpepireiki.git) |

---
*Documento preparado y aprobado para la puesta en marcha de Blanco y Negro - Terapias Holísticas y Bienestar (Boiro).*
