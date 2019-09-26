const Sequelize = require('sequelize')
// const db = new Sequelize('wikistack', 'postgres', 'admin', {
//   dialect: 'postgres',
//   logging: false
// })

const db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false})

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: ''
  },
  status: Sequelize.ENUM('open', 'closed')
})

Page.beforeValidate(pageInstance => {
  pageInstance.slug = pageInstance.title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/( )+/g, '_')
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

Page.belongsTo(User, {as: 'author'})

// ensure database connection is working:
// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

module.exports = {
  Page, User
}
