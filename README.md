## Mobile Login API

### Backend Setup

- Install dependencies: `npm install`
- Create `.env` with your environment variables
- Create a database with MySQL
- Run `npm run dev` for creating `localhost` server to listen
- Have to manually stored the `phone_number` data inside the database
- For storing the `phone_number`, **remember** have to begin with `+60`
- i.e. Copy query below for inserting the data into the database
  ```sql
  INSERT INTO TABLE_NAME (phone_number, createdAt, updatedAt)
  VALUES ("+60112380554", now(), now())
  ```
- For viewing apidoc, have to navigate to `./routes/doc/index.html`
