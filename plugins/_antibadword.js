let { GroupSettingChange } = require('@adiwajshing/baileys')
let handler = m => m

let badwordRegex = /anj(k|g)|ajn?(g|k)|a?njin(g|k)|bajingan|b(a?n)?gsa?t|ko?nto?l|me?me?(k|q)|pe?pe?(k|q)|meki|titi(t|d)|pe?ler|tetek|toket|ngewe|go?blo?k|to?lo?l|idiot|(k|ng)e?nto?(t|d)|jembut|bego|dajj?al|janc(u|o)k|pantek|puki ?(mak)?|kimak|kampang|lonte|col(i|mek?)|pelacur|henceu?t|nigga|fuck|dick|bitch|tits|bastard|asshole/i // tambahin sendiri

handler.before = function (m, { isOwner, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return !0
    let chat = db.data.chats[m.chat]
    let user = db.data.users[m.sender]
    let isBadword = badwordRegex.exec(m.text)

    if (!chat.badword && !chat.isBanned && isBadword) {
        user.warning += 1
        this.send2Button(m.chat, `*Badword terdeteksi!*
Warning: ${user.warning} / 5
Si la advertencia llega a 5 serás baneado

escribe *#on antibadword* para activar el antibadword
escribe *#astagfirullah* o *#maaf* para reducir la advertencia

“Quien crea en Alá y en el Último Día, que diga el bien o calle.” (HR. al-Bukhari dan Muslim).`, 'Activa Antibadword', ',1 antibadword', 'Astaghfirullah', ',maaf', m)
        if (user.warning >= 5) {
            user.banned = true
            if (m.isGroup) {
                if (isBotAdmin) {
                    // this.groupSettingChange(m.chat, GroupSettingChange.messageSend, true)
                }
            }
        }
    }
    return !0
}
module.exports = handler