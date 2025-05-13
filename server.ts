import 'localstorage-polyfill';
if (typeof localStorage === 'undefined' || localStorage === null) {
    global['localStorage'] = require('localstorage-polyfill');
}
import 'zone.js/node';
(global as any).XMLHttpRequest = require('xhr2');

const compression = require('compression');
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { AppServerModule } from './src/main.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const app = express();
const commonEngine = new CommonEngine();

app.set('view engine', 'html');
app.set('views', browserDistFolder);

// Middleware for compression
app.use(compression());

// Serve static files
app.get(
    '*.*',
    express.static(browserDistFolder, {
        maxAge: '1y',
    })
);

// All regular routes use the Angular Universal engine
app.get('**', (req, res, next) => {
    commonEngine
        .render({
            bootstrap: AppServerModule,
            documentFilePath: indexHtml,
            url: req.originalUrl,
            providers: [
                { provide: APP_BASE_HREF, useValue: req.baseUrl },


            ],
        })
        .then((html) => res.send(html))
        .catch((err) => next(err));
});

if (isMainModule(import.meta.url)) {
    const port = process.env['PORT'] || 4000;
    app.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}
