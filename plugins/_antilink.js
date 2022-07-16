let handler = m => m

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
handler.before = async function (m, { user, isBotAdmin, isAdmin }) {
  if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink) {
    await m.reply(`*「 𝚂𝙽𝙾𝚆𝚂 𝙰𝙽𝚃𝙸𝙻𝙸𝙽𝙺 」*\n\nDetectado *${await conn.getName(m.sender)}* ¡Has enviado un enlace al grupo!\n\n¡Lo siento, serás expulsado de este grupo byee!`)
    if (isAdmin) return m.reply('*oh hombre, no se puede hacer clic en el administrador 😢. hehe..*')
    if (!isBotAdmin) return m.reply('*El bot no es un administrador, ¿cómo puedes reirte? 😐*')
    let linkGC = ('https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat))
    let isLinkconnGc = new RegExp(linkGC, 'i')
    let isgclink = isLinkconnGc.test(m.text)
    if (isgclink) return m.reply('*「 𝚂𝙽𝙾𝚆𝚂 𝙰𝙽𝚃𝙸𝙻𝙸𝙽𝙺 」*\n\nEstá prohibido❗, Lo siento, expulsado.\nPor enviar enlaces 👍')
    await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
  }
  return true
}

module.exports = handler


