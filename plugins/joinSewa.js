let handler = async (m, { conn, text, usedPrefix, args, participants }) => {
  var time = db.data.users[m.sender].lastjoin + 86400000
  var linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
  var delay = time => new Promise(res => setTimeout(res, time))
 
  var name = m.sender
  var fkonn = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: '51983550805@s.whatsapp.net' } : {}) }, message: { contactMessage: { displayName: `${await conn.getName(name)}`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
  var [_, code] = text.match(linkRegex) || []
  if (!args[0]) throw `donde esta el enlace?` 
  if (!code) throw `Enlace invalido!`
  if (!args[1]) throw `¿Cuántos días?`
  if (isNaN(args[1])) throw `¡Solo un número, que representa el día!`
  var anubot = owner[0]
  m.reply(`Espere 3 segundos, el bot se unirá`)
  await delay(3000)
  try {
  var res = await conn.groupAcceptInvite(code)
  var b = await conn.groupMetadata(res)
  var d = b.participants.map(v => v.id)
  var member = d.toString()
  var e = await d.filter(v => v.endsWith(anubot + '@s.whatsapp.net'))
  var jumlahHari = 86400000 * args[1]
  var now = new Date() * 1
  if (now < global.db.data.chats[res].expired) global.db.data.chats[res].expired += jumlahHari
  else global.db.data.chats[res].expired = now + jumlahHari
  if (e.length) await m.reply(`Invito con éxito al bot al grupo\n\n${await conn.getName(res)}\n\nEl bot saldrá automáticamente después de *${msToDate(global.db.data.chats[res].expired - now)}*`)
  if (e.length) await conn.reply(res, `Hay @${anubot} Owner Aquí, solo quiero salir, con miedo de enojarme.

@${conn.user.jid.split(`@`)[0]} saldrá en 5 segundos
Bye😑
Thanks dah invite *${m.name}*`, fkonn, {
    mentions: d
     }).then(async () => {
     await delay(5000)
     }).then( async () => {
     await conn.reply(res, `pero boong 🤭`, 0)
     await conn.reply(owner[0]+'@s.whatsapp.net', `*¡ATRACTIVO!*\n\n@${m.sender.split('@')[0]} ha invitado ${conn.user.name} agrupar\n\n${await conn.getName(res)}\n\n${res}\n\nMensaje : ${args[0]}\n\nEl bot saldrá automáticamente después de *${msToDate(global.db.data.chats[res].expired - now)}*`, null, {mentions: [m.sender]})
     })
     if (!e.length) await conn.reply(owner[0]+'@s.whatsapp.net', `*INVITING!*\n\n@${m.sender.split('@')[0]} ha invitado ${conn.user.name} agrupar\n\n${await conn.getName(res)}\n\n${res}\n\nMensaje : ${args[0]}\n\nEl bot saldrá automáticamente después de *${msToDate(global.db.data.chats[res].expired - now)}*`, null, {mentions: [m.sender]})
     if (!e.length) await m.reply(`Invitar con éxito al bot al grupo\n\n${await conn.getName(res)}\n\nEl bot saldrá automáticamente después de *${msToDate(global.db.data.chats[res].expired - now)}*`).then(async () => {
     let mes = `Hola a todos👋🏻

*${conn.user.name}* es uno de los bots multidispositivo de WhatsApp creado con Node.js, *${conn.user.name}* Recién invitado por *${m.name}*
Para usar *${conn.user.name}* por favor escribe
#menu

@${conn.user.jid.split('@')[0]} saldrá automáticamente después *${msToDate(global.db.data.chats[res].expired - now)}*`
  await conn.sendB(res, mes, wm, null, [[`Owner`, `.owner`], [`Menu`, `${usedPrefix}menu`]], fkonn, {
        mentions: d
         })
     })
    } catch (e) {
      conn.reply(owner[0]+'@s.whatsapp.net', e)
      throw `¡Lo sentimos, los bots no pueden unirse a los grupos!`
      }
}
handler.help = ['joins <chat.whatsapp.com> <day>']
handler.tags = ['owner']
handler.command = /^joins(ewa)?$/i

handler.owner = true

module.exports = handler

function msToDate(ms) {
    temp = ms
    days = Math.floor(ms / (24 * 60 * 60 * 1000));
    daysms = ms % (24 * 60 * 60 * 1000);
    hours = Math.floor((daysms) / (60 * 60 * 1000));
    hoursms = ms % (60 * 60 * 1000);
    minutes = Math.floor((hoursms) / (60 * 1000));
    minutesms = ms % (60 * 1000);
    sec = Math.floor((minutesms) / (1000));
    return days + " dias " + hours + " horas " + minutes + " minutos";
    // +minutes+":"+sec;
}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
  seconds = Math.floor((duration / 1000) % 60),
  minutes = Math.floor((duration / (1000 * 60)) % 60),
  hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " horas " + minutes + " minutos"
}
