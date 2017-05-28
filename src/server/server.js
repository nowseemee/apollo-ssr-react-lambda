import 'isomorphic-fetch';
import Express from 'express';
import path from 'path';
import dance from './handler';

const app = new Express();
const PORT = 3000;

app.use('/static', Express.static(path.join(process.cwd(), 'build/static')));

app.use((req, res) => dance(req.originalUrl).then(body => res.send(body)));

app.listen(PORT, () => console.log(`App Server is now running on http://localhost:${PORT}`));
