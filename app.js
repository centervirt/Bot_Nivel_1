const axios = require('axios')
require('dotenv').config()

const { EVENTS } = require('@bot-whatsapp/bot')

const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


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

        .addAnswer('🧿 *IMPORTANTE*')
        .addAnswer('Para verificar la disponibilidad del servicio debe enviarnos las coordenadas de Google Maps al Whatsapp, solicitar hablar con un asesor')
        .addAnswer ('Para continuar *esbriba el numero* de la opcion que necesita')
                
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

.addAnswer('🤖 Un asesor técnico se pondrá en contacto con ud dentro de nuestros horarios de atención: lunes a viernes 9Hs a 17hs. Muchas Gracias')

.addAnswer('0️⃣ *Volver al menu anterior*',

                        {capture: true},
                        async (ctx, {gotoFlow}) => {
                            const body = ctx.body;
                            if (body === "0") 
                            return gotoFlow(flowInformacion)
                    }
                        )


////////////////////////////// FLUJO PARA SOLICITAR EL SERVICIO ////////////////////////////////////

const flowSolicitarServicio = addKeyword('3')

.addAnswer('*Solicitar nuevo servicio*')
.addAnswer(' Pediremos tus datos para dar de alta la solicitud de servicio')
//.addAnswer(' Cuando la cuenta este dada de alta te va a llegar un mensaje de bienvenida, y después un segundo mensaje confirmando día y hora de la instalación. Los tiempos de instalación son entre 24hs y 72hs. Muchas gracias!')
.addAnswer('0️⃣ *Para cancelar y ver el menu nuevamente*')
.addAnswer('1️⃣ *Para continuar*',

                            {capture: true},
                            async (ctx, {gotoFlow}) => {
                                const body = ctx.body;
                                    if (body === "0") 
                                        return gotoFlow(flowInformacion)
                                    }
                                    
                                        )

/////////////// FlUJO DE CLIENTE //////////////////////

/**
 * 
 * 
 * 
 * 
 

const menuAPI = async () => {
    const config = {
        method: 'get',
        url: 'http://autogestion.ar/api/v1/GetRouters',
        headers: {
            'Authorization': `Bearer ${process.env.MIKRO_API}`
        }
    };

    const {data} = await axios(config).then((i) => i.data)
        return data.map(m => ({body:[ `*EQUIPOS:* ${m.id} - *NOMBRE:* ${m.nombre} - *IP:* ${m.ip}`].join('\n')}))
}

*/




const flowCliente = addKeyword('2')
    .addAnswer('El estado del servicio es el siguiente:', null, async (ctx, {flowDynamic}) => {
        const equipos = await menuAPI()
       
        flowDynamic(equipos)

})
     


  /* 
    .addAnswer('0️⃣ *Volver Al Menu Principal*',
    
        { capture: true }, 
        async (ctx, { gotoFlow }) => {
            const body = ctx.body;
            if (body === "0") return gotoFlow(flowComienzo);
       
        })

*/
    
const flowComprobante = addKeyword('3')
    .addAnswer('➡ Para enviar tu comprobante de pago lo podes hacer desde el *Portal de Cliente*')
    .addAnswer('¿Como puedo hacerlo ?, muy facil. Con tu  E-mail y contraseña que se envia al momento de realizar la instalacion de servicio te logueas en  ')
    .addAnswer('Recibimos su comprobante, el mismo será imputado dentro de nuestros horarios de atención (lunes a viernes 9Hs a 17hs). Si no está enviando comprobante, un asesor se comunicará con Ud. Muchas gracias.')
   
  
const flowInformacion = addKeyword('1')
        .addAnswer(['1️⃣ *Costo de conexion y planes*',
                    '2️⃣ *Hablar con un asesor*',
                    '3️⃣ *Solicitar Servicio*',
                    '0️⃣ *Volver Al Menu Principal*', 
        ],
      
        {capture:true},
        async (ctx, {gotoFlow}) => {
            const body = ctx.body;
            if(body === "0") return gotoFlow(flowComienzo);
        },

         
            [flowCostos, flowAsesor, flowSolicitarServicio]
        )
      

     



const flowComienzo = addKeyword('UBNT', { sensitive: true })
    .addAnswer('🙌 Hola este es el menu de mi bot de *informacion* 🔢')
    
    .addAnswer('Escribe un *EL NUMERO*  de la opcion deseada:')
    .addAnswer(
        [
            '1️⃣ *QUIERO INFORMACION*',
            '2️⃣ *SOY CLIENTE* ',
            '3️⃣ *ENVIO DE COMPROBANTE*',
            '4️⃣ *AREA TECNICA*',
            '*Recorda escribir el número y darle enviar, mensajes de audio y fotos serán ignorados. Gracias!*'
           
        ],null,null,[flowInformacion,flowCliente,flowComprobante])
/*
        {capture: true},
        async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
            if (!["1","2","3","4"].includes(ctx.body)) {
                return fallBack(
                    "La respuesta no es valida, por favor seleccione una de la opciones."
                
                )}
            
            switch (ctx.body) {
                case "1":
                return await gotoFlow ("1");
                case "2":
                return await gotoFlow ("2");
                case "3":
                return await gotoFlow ("3");
                case "4":
                return await gotoFlow ("4");
                case "0":
                return await flowDynamic(
                    "Saliendo ... Puedes volver a acceder al menu escribiendo *UBNT*"
                )
            }
            
            })
    
   */ 

const flowSaludo = addKeyword('Gracias')
    .addAnswer('Gracias a vos .Saludos ')


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowComienzo],[flowSaludo])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
