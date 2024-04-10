const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
/**
 * Punto de Entrada! 
 * NO Inteligente (no usa intelgencia artificial)
 * Flujo de bienvenida
 */
module.exports = addKeyword(EVENTS.WELCOME)

.addAction(async (ctx, ctxFn) => {
      const {state} = ctxFn
      const mensajeEntrante = ctx.body //buenas me interesa el curso de nodejs
      const pluginAi = ctxFn.extensions.employeesAddon

      const empleadoIdeal = await pluginAi.determine(mensajeEntrante)

    if(!empleadoIdeal?.employee){
        return ctxFn.flowDynamic('Ups lo siento no te entiendo ¿Me puedes generar nuevamente la pregunta?')
      }
      state.update({answer:empleadoIdeal.answer})
      return ctxFn.flowDynamic(empleadoIdeal.answer)
     // pluginAi.gotoFlow(empleadoIdeal.employee, ctxFn)

})