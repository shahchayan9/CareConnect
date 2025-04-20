const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../../visualizations/data/nyc-service-volunteer-opportunities.csv');
  const csv = fs.readFileSync(filePath, 'utf8');
  Papa.parse(csv, {
    header: true,
    complete: function (results) {
      res.json(results.data);
    }
  });
});

module.exports = router;
