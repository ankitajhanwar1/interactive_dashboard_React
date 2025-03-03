import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.get('/v1/api/partitions', async (req, res) => {
  const fileContent = await fs.readFile('./data/partitions.json');
  const partitions = JSON.parse(fileContent);
  res.status(200).json(partitions);
});

app.get('/v1/api/partitions/:partitionId/data/sources', async (req, res) => {
  const fileContent = await fs.readFile('./data/sources.json');
  const sources = JSON.parse(fileContent);
  res.status(200).json({sources});
});

app.get('/v1/api/partitions/:partitionId/data', async (req, res) => {
  const fileContent = await fs.readFile('./data/partitionData.json');
  let partitionData = JSON.parse(fileContent);

  const { partitionId } = req.params;
  const {from_date, to_date, source, optimisation_target} = req.query;

  partitionData = partitionData.filter(data => data.partition_id === partitionId);
  // Filter by source if provided
  if (source) {
    partitionData = partitionData.filter(data => data.source === source);
  }

  // Filter by optimisation_target if provided
  if (optimisation_target) {
    partitionData = partitionData.filter(data => data.optimisation_target === optimisation_target);
  }

  // Filter by date range if provided
  if (from_date || to_date) {
    partitionData = partitionData.filter(data => {
      const dataDate = new Date(data.date);
      const fromDate = from_date ? new Date(from_date) : null;
      const toDate = to_date ? new Date(to_date) : null;

      return (!fromDate || dataDate >= fromDate) && (!toDate || dataDate <= toDate);
    });
  }

  res.status(200).json(partitionData);
});

app.get('/v1/api/partitions/:partitionId/report/performance', async (req, res) => {
  const fileContent = await fs.readFile('./data/performanceReport.json');
  const report = JSON.parse(fileContent);
  res.status(200).json(report);
});

app.get('/v1/api/partitions/:partitionId/totals', async (req, res) => {
  const fileContent = await fs.readFile('./data/summaryStatistics.json');
  const sources = JSON.parse(fileContent);
  res.status(200).json(sources);
});

app.listen(3000);
