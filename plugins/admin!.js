let handler = async (m, { conn, isAdmin }) => {
  if (m.fromMe) throw 'Así que eres un bot como administrador'
  if (isAdmin) throw 'Aunque ya soy administrador'
  await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote')
}
handler.command = /^admin!$/i
handler.rowner = true
handler.botAdmin = true
module.exports = handler
