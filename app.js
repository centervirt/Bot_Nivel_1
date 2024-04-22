//const { EVENTS } = require('@bot-whatsapp/bot')

const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


/**
 * 
 * 
 */

const menuAPI = async (cedula) => {
    try {
      const token = process.env.MIKRO_API // Obtiene el token de autenticación de las variables de entorno
      if (!token) {
        throw new Error('Token de autenticación no encontrado en las variables de entorno.');
      }
  
      const response = await axios.post('https://intertel.online/api/v1/GetClientsDetails', {
        cedula: cedula
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      console.log('Status:', response.status);
      console.log('Data:', response.data);
  
      // Aquí puedes procesar la respuesta y preparar el mensaje para enviar a WhatsApp
      const cliente = response.data.datos[0]; // Suponiendo que la respuesta contiene un solo cliente
      const mensaje = `Cliente encontrado:\nNombre: ${cliente.nombre},\nEstado: ${cliente.estado},\nCorreo: ${cliente.correo}`;
  
      return mensaje; // Devuelve el mensaje para enviar a WhatsApp
  
    } catch (error) {
      console.error('Error:', error.message);
      return 'Ocurrió un error al buscar el cliente.'; // En caso de error, devuelve un mensaje de error
    }
  };
  

/////////////Costos de conexiones  y planes de servicio /////////////////////

const flowCostos = addKeyword('1')

        .addAnswer('👉 *PLAN_BASICO* - Conexion recomendada para 3 dispositivos simultaneos - $8.000 x mes')
        .addAnswer('👉 *PLAN_PREMIUM* - Recomendado para 5 dispositivos simultaneos - $10.000')
        .addAnswer('👉 *PLAN_FULL* - Velocidad de hasta 15 Megas Simetricos- Compartido - $12.000')
        .addAnswer('👉 *PLAN_FTTC_BASICO* - Conexion recomendada para 5 dispositivos simultaneos - $9.000')
        .addAnswer('👉 *PLAN_FTTC_PREMIUM* - Conexion recomendada para MULTIPLES dispositivos  - $11.000')
        .addAnswer('👉 *PLAN_FTTC_FULL* - Conexion de hasta 20 Megas Simetricos - Compartidos - $13.000')
                

        .addAnswer('💰 Costo de la instalacion $90.000')
        .addAnswer('*INCLUYE EN COMODATO*')

        .addAnswer(['🧿 *IMPORTANTE*',
                    'Para corroborar la disponibilidad del servicio debe enviarnos las coordenadas de Google Maps al Whatsapp, solicitar hablar con un asesor',
                    'Se incluye acceso a Portal de Cliente',
                ])
        .addAnswer ('Para continuar *esbriba el numero* de la opcion que necesita')
    // .addAnswer('1️⃣ *Portal de Cliente*')
        .addAnswer('0️⃣ *Volver al menu anterior*',

                        {capture: true},
                        async (ctx, {gotoFlow}) => {
                            const body = ctx.body;
                            if (body === "0") 
                            return gotoFlow(flowInformacion)
                    }
                         )

        

/////////////////////////////////// FLUJO DE ASESOR ///////////////////////////////////////////////////

const flowAsesor = addKeyword('2')

.addAnswer('🤖 Un asesor técnico se pondrá en contacto con ud dentro de nuestros horarios de atención: lunes a viernes 9Hs a 19hs. Muchas Gracias')

.addAnswer('0️⃣ *Volver al menu anterior*')


////////////////////////////// FLUJO PARA SOLICITAR EL SERVICIO ////////////////////////////////////

const flowSolicitarServicio = addKeyword('3')

.addAnswer('*Solicitar nuevo servicio*')
.addAnswer(' Pediremos tus datos y daremos de alta tu cuenta de cliente')
.addAnswer(' Cuando la cuenta este dada de alta te va a llegar un mensaje de bienvenida, y después un segundo mensaje confirmando día y hora de la instalación. Los tiempos de instalación son entre 24hs y 72hs. Muchas gracias!')
.addAnswer('0️⃣ *Para cancelar y ver el menu nuevamente*')
.addAnswer('1️⃣ *Para continuar')




const flowCliente = addKeyword('2')
    .addAnswer(
    [
        ' Ingrese el DNI del titular *SIN PUNTO , NI ESPACIOS* ',
        'Este en proceso',
        
    ]
)

const flowComprobante = addKeyword('3')
    .addAnswer('Recibimos su comprobante, el mismo será imputado dentro de nuestros horarios de atención (lunes a viernes 9Hs a 17hs). Si no está enviando comprobante, un asesor se comunicará con Ud. Muchas gracias.')
   
  
const flowInformacion = addKeyword('1')
        .addAnswer(
        [
            '1️⃣ *Costo de conexion y planes*',
            '2️⃣ *Hablar con un asesor*',
            '3️⃣ *Solicitar Servicio* ',
            '0️⃣ *Volver el Menu Principal*'
        ],
        {capture: true},
            async, (ctx, { gotoFlow }) => {
            const body = ctx.body;
            if (body === "0") return gotoFlow(flowComienzo)
         //   if (body === "1") return gotoFlow(flowCostos);
         //   if (body === "2") return gotoFlow(flowAsesor);
         //   if (body === "3") return gotoFlow(flowSolicitarServicio);
        },
        
         
        [flowCostos, flowSolicitarServicio, flowAsesor])

     



const flowComienzo = addKeyword('UBNT', '0', { sensitive: true })
    .addAnswer('🙌 Hola gracias por comunicarte con  *Intertel Comunicaciones*')
    .addAnswer('Escribe un *EL NUMERO*  de la opcion deseada:')
    .addAnswer(
        [
            '1️⃣ *QUIERO INFORMACION*',
            '2️⃣ *SOY CLIENTE* ',
            '3️⃣ *ENVIO DE COMPROBANTE*',
            '*Recorda escribir el número y darle enviar, mensajes de audio y fotos serán ignorados. Gracias!*'
           
        ],null,null,[flowInformacion,flowCliente,flowComprobante]
    )
    



const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowComienzo])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
