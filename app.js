require('dotenv').config()
const axios = require('axios')
const { EVENTS } = require('@bot-whatsapp/bot')

const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

/**
 * 
 * 
 * 
 * 
 
const menuAPI = async () => {
    const config = {
        method: 'get',
        url: 'https://intertel.online/api/v1/GetClientsDetails',
        headers: {
            'Authorization': `Bearer ${process.env.MIKRO_API}`
        }
    };
    const {data} = await axios(config).then((i) => i.data)
    return data.map(m =>
    ({
        body:[`*DNI: ${m.attibutes.cedula}:*Telefono: ${m.attributtes.telefono}`].join('\n')
    }))
}

*/

/////////// FLUJOS DE COSTOS - OK ///////////////
const flowCostos = addKeyword('1')

        .addAnswer('👉 *PLAN_BASICO* - Conexion recomendada para 3 dispositivos simultaneos - $8.000 x mes')
        .addAnswer('👉 *PLAN_PREMIUM* - Recomendado para 5 dispositivos simultaneos - $10.000 x mes')
        .addAnswer('👉 *PLAN_FULL* - Velocidad de hasta 15 Megas Simetricos- Compartido - $12.000 x mes')
        .addAnswer('👉 *PLAN_FTTC_BASICO* - Conexion recomendada para 5 dispositivos simultaneos - $9.000 x mes')
        .addAnswer('👉 *PLAN_FTTC_PREMIUM* - Conexion recomendada para MULTIPLES dispositivos  - $11.000 x mes')
        .addAnswer('👉 *PLAN_FTTC_FULL* - Conexion de hasta 20 Megas Simetricos - Compartidos - $13.000 x mes')
                

        .addAnswer('💰 Costo de la instalacion $90.000')
        .addAnswer('*INCLUYE EN COMODATO*')

        .addAnswer('🧿 *IMPORTANTE*',
                    'Para corroborar la disponibilidad del servicio debe enviarnos las coordenadas de Google Maps al Whatsapp, solicitar hablar con un asesor',
                    
                 )
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


/////////////// FlUJO DE CLIENTE //////////////////////

/**
 * 
 * 
 * 
 * 
 
const menuAPI = async () => {
    const config = {
        method: 'get',
        url: 'https://intertel.online/api/v1/GetClientsDetails',
        headers: {
            'Authorization': `Bearer ${process.env.MIKRO_API}`
        }
    };
    const {data} = await axios(config).then((i) => i.data)
    return data.map(m =>
    ({
        body:[`*DNI: ${m.attibutes.cedula}:*Telefono: ${m.attributtes.telefono}`].join('\n')
    }))
}




const flowCliente = addKeyword('2')
    .addAction (async (_, { flowDynamic }) => {
            return flowDynamic ('➡ Ingrese el DNI del titular *SIN PUNTO, NI ESPACIOS* ...')
    })

    .addAction({ capture: true }, async (ctx, { flowDynamic, state }) => {
        await state.update({ cedula: ctx.body }); // Actualiza el estado con el DNI ingresado
        const dni = ctx.body.trim().replace(/\./g, ''); // Elimina puntos del DNI
        try {
            const response = await axios.get(`https://intertel.online/api/v1/GetClientsDetails/${cedula}`); // Realiza la solicitud a la API con el DNI
            const { nombre, estado } = response.data; // Extrae nombre y teléfono de la respuesta
            await state.update({ nombre, estado }); // Actualiza el estado con nombre y teléfono
            return flowDynamic(`Nombre: ${nombre}, Estado: ${estado}`);
        } catch (error) {
            console.error('Error al obtener datos del cliente:', error);
            return flowDynamic('En este momento la conexión con la base de datos no está disponible 🔴. Inténtelo más tarde. Gracias');
        }
    })
    .addAnswer('Tu datos de cliente son: ', null, async (ctx, { flowDynamic, state }) => {
        // Accede al estado para obtener nombre y teléfono
        const { nombre, telefono } = await state.load();
        if (nombre && telefono) {
            return flowDynamic(`Nombre: ${nombre}, Teléfono: ${telefono}`);
        } else {
            return flowDynamic('Los datos del cliente no están disponibles en este momento. Inténtelo más tarde.');
        }
    });

    /*
    .addAction({ capture: true }, async (ctx, { flowDynamic, state }) => {
        await state.update({ name: ctx.body })
        return flowDynamic(`Tu DNI es : ${ctx.body}`)
    })
    .addAnswer('En este momento la conexion con la base de datos no esta disponible 🔴. Intentelo mas tarde! Gracias', {
        delay:1500,
    })
    .addAnswer('Tu datos de cliente son: ', null, async (ctx, {flowDynamic}) => {
        const data = await menuAPI()
        return flowDynamic(data);
    }
)


    .addAnswer('0️⃣ *Volver Al Menu Principal*',
         
                                 {capture: true},
                                 async (ctx, {gotoFlow}) => {
                                     const body = ctx.body;
                                     if (body === "0") 
                                     return gotoFlow(flowComienzo)
                             })

    


*/
//const axios = require('axios'); // Asegúrate de tener Axios instalado en tu proyecto

const menuAPI = async () => {
    const config = {
        method: 'get',
        url: 'https://intertel.online/api/v1/GetClientsDetails',
        headers: {
            'Authorization': `Bearer ${process.env.MIKRO_API}`
        }
    };
    try {
        const response = await axios(config);
        const { data } = response;
        
        // Comprueba si data es un array
        if (Array.isArray(data)) {
            // Si es un array, mapea los elementos y retorna el resultado
            return data.map(m =>
                ({
                    body: `*DNI: ${m.attributes.cedula}*\nTeléfono: ${m.attributes.telefono}`
                }));
        } else {
            // Si no es un array, retorna un mensaje indicando que la estructura no es válida
            return [{ body: 'La estructura de datos no es válida.' }];
        }
    } catch (error) {
        console.error('Error al obtener datos del cliente:', error);
        throw error; // Lanza el error para que sea manejado externamente
    }
};

const flowCliente = addKeyword('2')
    .addAction(async (_, { flowDynamic }) => {
        return flowDynamic('➡ Ingrese el DNI del titular *SIN PUNTO, NI ESPACIOS* ...');
    })
    .addAction({ capture: true }, async (ctx, { flowDynamic, state }) => {
        const dni = ctx.body.trim().replace(/\./g, ''); // Elimina puntos del DNI
        try {
            const data = await menuAPI(); // Obtén los detalles del cliente utilizando la función menuAPI
            const clientDetails = data.find(item => item.body.includes(`*DNI: ${cedula}:`)); // Encuentra los detalles del cliente correspondientes al DNI ingresado
            if (clientDetails) {
                return flowDynamic(clientDetails.body);
            } else {
                return flowDynamic('No se encontraron detalles para el DNI proporcionado.');
            }
        } catch (error) {
            console.error('Error al obtener datos del cliente:', error);
            return flowDynamic('En este momento la conexión con la base de datos no está disponible 🔴. Inténtelo más tarde. Gracias');
        }
    });



const flowComprobante = addKeyword('3')
    .addAnswer('➡ Para enviar tu comprobante de pago lo podes hacer desde el *Portal de Cliente*')
    .addAnswer('¿Como puedo hacerlo ?, muy facil. Con tu  E-mail y contraseña que se envia al momento de realizar la instalacion de servicio te logueas en  ')
    .addAnswer('Recibimos su comprobante, el mismo será imputado dentro de nuestros horarios de atención (lunes a viernes 9Hs a 17hs). Si no está enviando comprobante, un asesor se comunicará con Ud. Muchas gracias.')
   
  
const flowInformacion = addKeyword('1')
        .addAnswer(['1️⃣ *Costo de conexion y planes*',
                    '2️⃣ *Hablar con un asesor*',
                    '3️⃣ *Costo de conexion y planes*',
                    '0️⃣ *Volver Al Menu Principal*',
        ],
      
        {capture:true},
        async (ctx, {gotoFlow}) => {
            const body = ctx.body;
            if(body === "0") return gotoFlow(flowComienzo);
        },

         
            [flowCostos, flowSolicitarServicio, flowAsesor]
        )
       // .addAnswer('0️⃣ *Volver Al Menu Principal*')


const flowComienzo = addKeyword('UBNT', { sensitive: true })
    .addAnswer('🙌 Hola gracias por comunicarte con  *Intertel Comunicaciones*')
   // {capture:true},(ctx) => {
     //   console.log('Inicio de Mensaje: ',ctx)
  //  })
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
