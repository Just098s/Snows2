let fetch = require('node-fetch')
let bpink = []
fetch('https://raw.githubusercontent.com/arivpn/dbase/master/kpop/blekping.txt')
    .then(res => res.text())
    .then(txt => bpink = txt.split('\n'))
let handler = async (m, { conn }) => {
    let img = bpink[Math.floor(Math.random() * bpink.length)]
    if (!img) throw img
    await conn.sendFile(m.chat, img, '', '© nih Blackpinknya no olvides suscribirte al canal https://www.youtube.com/channel/UCOmHUn--16B90oW2L6FRR3A 👍', m, 0, { thumbnail: await (await fetch(img)).buffer() })
}
handler.help = ['blackpink']
handler.tags = ['internet']
handler.limit = 5
handler.command = /^(bpink|bp|blackpink)$/i

module.exports = handler
