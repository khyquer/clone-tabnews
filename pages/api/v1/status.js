import { name, version } from '../../../package.json';

export default function handler(req, res) {
  res.status(200).json({
    updated_at: new Date().toISOString(),
    dependencies: {
      database: {
        version: 16,
        max_connections: 100,
        count_connections: 1
      }
    },
    application: {
      name,
      version,
      uptime_seconds: Math.floor(process.uptime()),
      environment: process.env.NODE_ENV || "development"
    }
  });
}