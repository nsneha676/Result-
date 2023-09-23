// config.js

module.exports = {
  development: {
    database: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'ResultManagement'
    },
    app: {
      port: 3000,
      secret: 'your-secret-key'
    }
  },
  production: {
    database: {
      host: 'production-rds-instance-name.random-string.region.rds.amazonaws.com',
      user: 'production-db-username',
      password: 'production-db-password',
      database: 'production-db-name'
    },
    app: {
      port: 80,
      secret: 'production-secret-key'
    }
  }
  
};
