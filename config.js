// config.js

module.exports = {
  development: {
    database: {
      host: 'database-01.cbz57jnlwyud.ap-south-1.rds.amazonaws.com',
      user: 'admin',
      password: 'Admin131997',
      database: 'database-01'
      Port:3306
    },
    app: {
      port: 80,
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
