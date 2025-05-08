import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import fs from 'node:fs/promises';

import todoRouter from './backend/routes/todo-routes.js';

dotenv.config();

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 5173;
const BASE = process.env.BASE || '/';
const DB_URL = isProduction
  ? 'mongodb://localhost:27017/mytestdb'
  : process.env.DB_URL;

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';

// Create http server
const app = express();

// Connect to database mongo
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('🐣 Connected to database');
  })
  .catch((err) => console.log('🔥 Error: connection to Database. ', err));

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('./build/client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(todoRouter);

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    BASE,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(BASE, sirv('./build/client', { extensions: ['html'] }));
  app.use(todoRouter);
}

// Serve HTML
app.use('/todos', async (req, res) => {
  try {
    const url = req.originalUrl.replace(BASE, '');
    /** @type {string} */
    let template;
    /** @type {import('./app/entry-server.ts').render} */
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('./app/entry-server.tsx')).render;
    } else {
      template = templateHtml;
      render = (await import('./build/server/entry-server.js')).render;
    }

    const rendered = render(url);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '');

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(PORT, (err) => {
  err
    ? console.log('Server error: ', err)
    : console.log(`Server is running on: http://localhost:${PORT}`);
});
