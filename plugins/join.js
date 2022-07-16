let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, text, isOwner, groupMetadata }) => {
    let [_, code, expired] = text.match(linkRegex) || []
    if (!code) throw 'Link invalid'
    if (global.db.data.users[m.sender].joinlimit == 0) return m.reply('Lo siento, ya no puedes usar la unión gratuita.\nContacta con *owner*')
    global.db.data.users[m.sender].joinlimit -= 1
   // let id = m.chat
   // let groupMetadata = await conn.groupMetadata(m.chat)
    let res = await conn.groupAcceptInvite(code)
    expired = Math.floor(Math.min(999, Math.max(7, isOwner ? isNumber(expired) ? parseInt(expired) : 0 : 3)))
    m.reply(`Se unió al grupo con éxito ${res} durante ${expired ? ` durante ${expired} hari` : ''}`)
   // conn.reply(`El bot ha sido invitado al grupo.: ${groupMetadata.subject}\nCode ID: ${res}`, `51983550805@s.whatsapp.net`)
    setTimeout(() => {
    conn.reply(res, `*${conn.user.name}* es un bot de whatsapp construido usando Nodejs, Invitado por @${m.sender.split`@`[0]} hora \n*${msToDate(global.db.data.chats[res].expired - new Date() * 1)}*\n\nPara ver la lista *Menu* llamar al Bot *#menu*\n\nSi desea ampliar el grupo caducado, póngase en contacto con *owner*`.trim(), null, { contextInfo: { mentionedJid: [m.sender] } })
    }, 1500) 
    let chats = global.db.data.chats[res]
    if (!chats) chats = global.db.data.chats[res] = {}
    if (expired) chats.expired = +new Date() + expired * 1000 * 60 * 60 * 24
}
//handler.help = ['join <chat.whatsapp.com>']
//handler.tags = ['premium']

handler.command = /^join$/i
handler.premium = true
handler.owner = true

module.exports = handler

const isNumber = (x) => (x = parseInt(x), typeof x === 'number' && !isNaN(x))

function msToDate(ms) {
    temp = ms
    days = Math.floor(ms / (24 * 60 * 60 * 1000));
    daysms = ms % (24 * 60 * 60 * 1000);
    hours = Math.floor((daysms) / (60 * 60 * 1000));
    hoursms = ms % (60 * 60 * 1000);
    minutes = Math.floor((hoursms) / (60 * 1000));
    minutesms = ms % (60 * 1000);
    sec = Math.floor((minutesms) / (1000));
    return days + " dia " + hours + " hora " + minutes + " minutos";
    // +minutes+":"+sec;
}