/*let handler = m => m

handler.before = function (m) {
  let user = global.db.data.users[m.sender]
        let role = (user.level <= 20) ? 'Beginner'
          : ((user.level >= 20) && (user.level <= 40)) ? 'Commander Elite'
          : ((user.level >= 40) && (user.level <= 60)) ? 'The Commander Hero'
          : ((user.level >= 60) && (user.level <= 80)) ? 'The Commander Elite Hero'
          : ((user.level >= 80) && (user.level <= 100)) ? 'The Commander Elite Super Strong Hero'
          : ((user.level >= 100) && (user.level <= 120)) ? 'The Commander Elite Super Strong Shadow Hero'
          : ((user.level >= 120) && (user.level <= 140)) ? 'The Commander Legends Shadow Hero'
          : ((user.level >= 140) && (user.level <= 160)) ? 'The Commander Super Legends Shadow Hero'
          : 'Legends'
  user.role = role
  return true
}

module.exports = handler*/

const roles = {
  /*
  'Role Name': <Minimal Level To Obtain this Role>
  */
  'Principiante': 0, 
  'Soldado temprano': 5,
  'Comandante': 10,
  'Comandante inicial' 15,
  'Comandante de élitee': 20,
  'Élite de comandante inicial': 25,
  'Héroe de élite': 30,
  'El Comandante Élite Súper Héroe': 40,
  'El Capitan Comandante Élite Súper Héroe ': 50,
  'El héroe de las sombras': 60,
  'El héroe de las sombras legendario': 70,
  'La comandante Superpremo de las Sombras': 80,
  'La leyenda más fuerte': 90,
  'El héroe de la leyenda\'s': 100
}

module.exports = {
  before (m) {
    let user = global.db.data.users[m.sender]
    let level = user.level
    let role = (Object.entries(roles).sort((a, b) => b[1] - a[1]).find(([,minLevel]) => level >= minLevel) || Object.entries(roles)[0])[0]
    user.role = role
    return true
  }
}
