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

sequelize db:create
sequelize db:migrate

npm run dev
