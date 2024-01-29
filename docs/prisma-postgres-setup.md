# How to setup a local PostgresDB with this Next.js App

_Context: In the future, a container should spin up the DB and do this automatically. Until then, he's a how to..._

- Run `npm install` to install libraries. This should install Prisma & Prisma Studio.
- Create a new Postgres DB.
  - You can do this via command line or with a GUI. I did this with the TablePlus GUI for Postgres.
- Create or update your .env file to include DATABASE_URL=”SCHEME://USER:PASSWORD@HOST:PORT/DATABASE”
    - ex: “postgresql://mateo:<password>@localhost:5432/ipip”
- Run initial migration:
    - `prisma migrate dev --name init`
- Install prisma globally to run Prisma studio
    - `npm install -g prisma`
- Run the command to open the Prisa Web UI
    - `prisma studio`
    - Should open browser to http://localhost:5555/
- Check and confirm there are no errors connecting to the DB. You may need to troubleshoot the DATABASE URL.
