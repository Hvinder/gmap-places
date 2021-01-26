const express = require('express');
const router = express.Router();

require('dotenv').config();
const rest = require('./getJson');

const API_KEY = process.env.API_KEY;

router.use('/', (req, res, next) => {
  console.log(`${req.method} request received`);
  next();
});

router.post('/places', (req, res) => {
  const body = req.body;
  body.lat = body.lat ? body.lat : '-33.8670522';
  body.long = body.long ? body.long : '151.1957362';
  body.radius = body.radius ? body.radius : '1500';
  const options = {
    host: 'maps.googleapis.com',
    port: 443,
    path: `/maps/api/place/nearbysearch/json?location=${body.lat},${body.long}&radius=${body.radius}&type=restaurant&keyword=cruise&key=${API_KEY}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  rest.getJSON(options, (statusCode, result) => {
    // console.log(`onResult: (${statusCode})\n\n${JSON.stringify(result)}`);
    res.statusCode = statusCode;
    res.send(result);
  });
});

router.post('/placeDetails', (req, res) => {
  const body = req.body;
  body.id = body.id ? body.id : 'ChIJp-X0MWiuEmsR5k38ahXMlCs';
  const options = {
    host: 'maps.googleapis.com',
    port: 443,
    path: `/maps/api/place/details/json?place_id=${body.id}&key=${API_KEY}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  rest.getJSON(options, (statusCode, result) => {
    // console.log(`onResult: (${statusCode})\n\n${JSON.stringify(result)}`);
    res.statusCode = statusCode;
    res.send(result);
  });
});

router.get('/photo/:ref', (req, res) => {
  const ref =
    req.params.ref ||
    'ATtYBwLo4RwpWBDaGI5NCEBYI99-DchpDkiaMIKP-eQWwZBwODZRY627arvav0lWdKHfv_8Bu73HyMFRevEiXblv77c3p1oUl6CrPrgakBX_PxBkdqTLDe5lkuXlz1WdFYWi0Zt3XgoXmaVjNM-iISRVOnUjQHJkROlEVonWBgMZmLbIlMr3';
  res.redirect(
    `https://maps.googleapis.com/maps/api/place/photo?maxheight=823&photoreference=${ref}&key=${API_KEY}`
  );
});

module.exports = router;
