# Euro 2024 Group Stages

https://euro-2024-steel.vercel.app

This is simple app for following results, upcoming and live matches for Euro 2024 group stages. Live update every 10 minutes.

## State managment

- Data is fetched with SVR
- SVR reevalidates data every 10 minutes and rerenders page if there is new data

## Run Locally

git clone https://github.com/PetarJovanovic/euro-2024.

Go to the project directory open it and enter euro-2024.

Before you can run app locally you will have to create .env file and put the following variables there:
`BASE_URL = https://api.nifs.no/stages/`
`GROUP_A = 691296`
`GROUP_B = 691297`
`GROUP_C = 691300`
`GROUP_E = 691299`
`GROUP_F = 691301`

After you setup .env file you will need to run:

`npm i` and after that
`npm run dev` for app to run locally

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
