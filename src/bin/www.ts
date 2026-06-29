#!/usr/bin/env node
import 'dotenv/config';
import { createServer } from 'http';
import app from '../index';
import connectDb from '../config/connectDb';
import seed from '../config/seeders/seed';

const port = Number(process.env.PORT || 8082);

const server = createServer(app);

server.listen(port, async () => {
  try {
    await connectDb();
    await seed();
    console.log(`🚀 Server running on http://localhost:${port}`);
  } catch (error) {
    console.error({ error });
  }
});

server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${port} is already in use`);
  } else if (err.code === 'EACCES') {
    console.error(`❌ Port ${port} requires elevated privileges`);
  } else {
    console.error('❌ Server error:', err);
  }
  process.exit(1);
});
