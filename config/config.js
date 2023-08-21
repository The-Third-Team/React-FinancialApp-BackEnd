require("dotenv").config();
module.exports = {
  development: {
    database: "finance_app_development",
    dialect: "postgres"
  },
  test: {
    database: "finance_app_test",
    dialect: "postgres"
  },
  production: {
    use_env_variable: "new_leaf_production",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
};
