const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')






const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowInformacion = addKeyword(['1'])
        .addAnswer(
        [
            '1️⃣ Costo de conexion y planes',
            '2️⃣ Hablar con un asesor',
            '3️⃣ Solicitar Servicio ',
        ],
        null,
        null,
        [flowSecundario])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Gracias por tu tiempo. Saludos !',
        
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowComienzo = addKeyword('UBNT', { sensitive: true })
    .addAnswer('🙌 Hola Gracias por comunicarte con  *Intertel Comunicaciones*')
    .addAnswer('Escribe un *EL NUMERO*  de la opcion deseada:')
    .addAnswer(
        [
            '1️⃣*QUIERO INFORMACION*',
            '2️⃣*SOY CLIENTE* ',
            '3️⃣*ENVIO DE COMPROBANTES*',
           
        ],null,null,[flowInformacion, flowSoyCliente, flowCompronte, flowDocs, flowGracias, flowTuto, flowDiscord]
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
