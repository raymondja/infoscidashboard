// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import axios from 'axios';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('FinalProject'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get((req, res) => {
    console.log('GET request detected');
    res.send(`Lab 5 for ${process.env.NAME}`);
  })
  .post(async(req, res) => {
    console.log(req.body);
    const query_param = {
      dept_id:"INST",
      semester:"202101",
      semester:"202008",
      semester:"202001",
      semester:"201908",
      semester:"201901",
      semester:"201808",
      semester:"201801",
      semester:"202101"

    };
    if (req.body) req.body.forEach(q => {
      if(q.value) query_param[q.name] = q.value
    });
    console.log(query_param);
    const data = await axios.get('https://api.umd.io/v0/courses',{
      params:query_param
    });
    res.send(data.data);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});