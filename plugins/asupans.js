let handler = async (m, { conn }) => {
	conn.sendFile(m.chat, 'https://api.zacros.my.id/asupan/random', 'asupan.mp4', '✿𝗖𝗥𝗘𝗔𝗧𝗢𝗥➢*Koncit*\nSubscribe : https://www.youtube.com/channel/UClfUAjgtQ19vGnUbkQxTuAg/', m)
}
handler.help = ['asupan']
handler.tags = ['asupan']

handler.command = /^(asupan)$/i
handler.premium = false
handler.register = true
handler.limit = 5
module.exports = handler
