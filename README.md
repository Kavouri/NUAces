# 106
section 1 team 6

# Setting up your environment for the frontend

1) Ensure that you have npm & node installed on your machine.  

2) cd to frontend directory and npm install. 

3) From here, npm start will launch a development server
    A browser will pop up, with the dev server running on localhost:3000

# Setting up your environment for the backend

1) cd to the backend directory and npm install

2) npm start will launch the backend, running on localhost:3001

3) npm test will run backend tests

Please have mysql installed & running, here are some pointers. 

1) install it, the process depends on your system

2) mysql -u root -p 
  (hit enter, then type your password)

  Now we are in the mysql console as the root mysql user.
3) CREATE DATABASE devEnvironment;

4) inside the mysql console, type CREATE USER 'dev'@'localhost' IDENTIFIED BY 'password';  (or whatever you want it to be called, you have to update db/connect.js if you do)

5) after this, we need to grant the new privileges. 
GRANT ALL PRIVILEGES ON *.* TO 'dev'@"localhost'

6) exit the mysql shell and import the schema to your currently empty database
mysql -u dev -p devEnvironemtn < schema/initial_dump.sql
      
