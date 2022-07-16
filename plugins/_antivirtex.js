let handler = m => m

handler.before = function (m, { user, text }) {

  if (m.isBaileys && m.fromMe) return
  let chat = global.db.data.chats[m.chat]
  let name = this.getName(m.sender)

  if (chat.antivirtex && text > 2000) {
    this.reply(m.chat `
*「 ANTI VIRTEX 」*

Detectado *${name}* esta enviando virtex!

¡Lo siento, serás expulsado de este grupo!
`.trim(), m)

    this.groupRemove(m.chat, [m.sender])
  } else return false
}
handler.group = true
handler.register = true

module.exports = handler
