let handler = m => m

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
handler.before = async function (m, { user, isBotAdmin, isAdmin }) {
  if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink) {
    await m.reply(`*γ ππ½πΎππ π°π½ππΈπ»πΈπ½πΊ γ*\n\nDetectado *${await conn.getName(m.sender)}* Β‘Has enviado un enlace al grupo!\n\nΒ‘Lo siento, serΓ‘s expulsado de este grupo byee!`)
    if (isAdmin) return m.reply('*oh hombre, no se puede hacer clic en el administrador π’. hehe..*')
    if (!isBotAdmin) return m.reply('*El bot no es un administrador, ΒΏcΓ³mo puedes reirte? π*')
    let linkGC = ('https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat))
    let isLinkconnGc = new RegExp(linkGC, 'i')
    let isgclink = isLinkconnGc.test(m.text)
    if (isgclink) return m.reply('*γ ππ½πΎππ π°π½ππΈπ»πΈπ½πΊ γ*\n\nEstΓ‘ prohibidoβ, Lo siento, expulsado.\nPor enviar enlaces π')
    await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
  }
  return true
}

module.exports = handler


