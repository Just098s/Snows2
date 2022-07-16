let fetch = require('node-fetch')
let bts = []
fetch('https://raw.githubusercontent.com/arivpn/dbase/master/kpop/batues.txt')
    .then(res => res.text())
    .then(txt => bts = txt.split('\n'))
let handler = async (m, { conn }) => {
    let img = bts[Math.floor(Math.random() * bts.length)]
    if (!img) throw img
    await conn.sendFile(m.chat, img, '', '© Aquí está TWICE, no olvides suscribirte al canal. https://www.youtube.com/channel/UCzgxx_DM2Dcb9Y1spb9mUJA 👍', m, 0, { thumbnail: await (await fetch(img)).buffer() })
}
handler.help = ['twice']
handler.tags = ['internet']
handler.limit = 5
handler.command = /^(twice|once|tw|nayeon|dosveces)$/i

module.exports = handler
