let handler = async (m, { usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) throw `_*¡No hubo ausencias en este grupo!*_\n\n*${usedPrefix}Esta ausente*`
    delete conn.absen[id]
    m.reply(`Done!`)
}
handler.help = ['helpha']
handler.tags = ['absen']
handler.command = /^(delete|hapus)absen$/i
handler.group = true
handler.admin = true
module.exports = handler