'use strict';

let express = require('express');

let app = express();
let server = app.listen(4000, ()=>{
  console.log('listening on request port 4000');
});
