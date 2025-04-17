const { rejects } = require('assert');
const { createConnection } = require('mysql2');
const { resolve } = require('path');
const fs = require('fs');

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '21092003',
  database: 'mentorship',
  port: 3306
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL: ' + error.stack);
    return;
  }
  console.log('function file Connected to MySQL database!');
});

function getData(table,key,value){
    let q=`select * from ${table} where ${key}="${value}";`;
    return new Promise((resolve,rejects)=>{
        connection.query(q,async(err,results)=>{
            if(err){
                console.log(err);
                rejects(err);
            }
            if(results){
                resolve(results);
            }
        });
    })
    
}
module.exports = getData;





