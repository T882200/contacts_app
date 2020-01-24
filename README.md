1. first, create a new mysql database named "database_development".

2. to run the migrations, run:
'''
$ cd database
$ npx sequelize-cli db:migrate
'''

3. to generate the first seed, run:
'''
$ npx sequelize-cli db:seed:all
'''


if you're on on UNIX or UNIX-like systems, go back to top-level folder and run
'''
npm i && npm start
'''

if you're on Windows, follow the instructions in this sections:

4. to run the server:
'''
$ cd database
$ npm i
$ nodemon app.js
'''

5. to run the frontend, open another terminal and run
'''
$ cd database
$ npm i
$ npm start
'''


the server REST API will be available on <https://localhost:8000>
and the React frontend will be available on  <https://localhost:3000>


