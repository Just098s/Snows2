let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) throw `_*¡No hubo ausencias en este grupo! *_\n\n*${usedPrefix}Esta ausente*`

    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let absen = conn.absen[id][1]
    let list = absen.map((v, i) => `│ ${i + 1}. @${v.split`@`[0]}`).join('\n')
    conn.reply(m.chat, `*「 AFK 」*

Tanggal: ${date}
${conn.absen[id][2]}

┌ *El que ha estado ausente:*
│ 
│ Total: ${absen.length}
${list}
│ 
└────

_${global.wm}_`, m, { contextInfo: { mentionedJid: absen } })
}
handler.help = ['cekabsen']
handler.tags = ['absen']
handler.command = /^cekabsen$/i
handler.group = true
module.exports = handler
