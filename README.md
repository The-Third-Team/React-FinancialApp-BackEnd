# React-FinancialApp-BackEnd

# Getting Started
Pull the repo files to your folder

Run the following command on terminal. (make sure you are in the root folder for the project)


npm install
npm install -g sequelize-cli (This is one time only, if you already used sequelize before you may skip this step)

touch .env (First time only if you don't have dotenv setup in your environment or the file got removed)

in the env file, populate with the following, feel free to change the value
APP_SECRET=examplesupersecretkey
SALT_ROUNDS=14

sequelize db:create (Only run this one time to create the db)

sequelize db:migrate



node seed.js

npm run dev



Additionally, you can add the following command to clean up from PSQL and reset the ID to 1 (Change the categories to other table name as needed)
ALTER SEQUENCE categories_id_seq RESTART;