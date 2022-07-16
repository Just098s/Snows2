let handler = async m => m.reply(`
            .✵.*ANYA-BOT-V2*.✵.

            *KAGA ADA :'*
`.trim()) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
