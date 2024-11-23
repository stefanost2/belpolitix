const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const cors = require('cors');  // CORS toevoegen

const app = express();
//const port = 3000; //Lokaal gebruik
const port = process.env.PORT || 3000; // Render gebruikt process.env.PORT

// Gebruik CORS in de applicatie
app.use(cors());

// Route voor de homepage
app.get('/', (req, res) => {
  res.send('Hallo! Dit is jouw Belgische Politiek Quiz server.');
});

// Route voor het ophalen van vragen uit vragen.csv
app.get('/vragen', (req, res) => {
  let vragen = [];
  const vragenPath = path.join(__dirname, 'vragen.csv');

  fs.createReadStream(vragenPath)
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
      vragen.push(row);
    })
    .on('error', (err) => {
      console.error('Fout bij het lezen van vragen.csv:', err);
      res.status(500).send('Fout bij het inlezen van het CSV-bestand');
    })
    .on('end', () => {
      res.json(vragen);
    });
});

// Route voor het ophalen van actualiteit uit aktualiteit.csv
app.get('/aktualiteit', (req, res) => {
  let aktualiteit = [];
  const aktualiteitPath = path.join(__dirname, 'aktualiteit.csv');

  fs.createReadStream(aktualiteitPath)
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
      aktualiteit.push(row);
    })
    .on('error', (err) => {
      console.error('Fout bij het lezen van aktualiteit.csv:', err);
      res.status(500).send('Fout bij het inlezen van het CSV-bestand');
    })
    .on('end', () => {
      res.json(aktualiteit);
    });
});

// Server luisteren op poort 3000
app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
