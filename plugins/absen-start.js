let handler = async (m, { usedPrefix, text }) => {
    conn.absen = conn.absen ? conn.absen : {}
    let id = m.chat
    if (id in conn.absen) {
        throw `_*Aun hay ausencias en este chat*_\n\n*${usedPrefix}quita ausencia*`
    }
    conn.absen[id] = [
        m.reply(`Inicio exitoso ausente\n\n*${usedPrefix}Llamada de rol*\n*${usedPrefix}esta ausente* - para comprobar la asistencia\n*${usedPrefix} eliminar ausencia* - para borrar los datos de asistencia`),
        [],
        text
    ]
}
handler.help = ['mulaiabsen [teks]']
handler.tags = ['absen']
handler.command = /^(start|mulai)absen$/i
handler.group = true
handler.admin = true
module.exports = handler