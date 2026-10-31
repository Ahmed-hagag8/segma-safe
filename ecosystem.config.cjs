/**
 * PM2 config for a Hostinger VPS (non-Docker).
 *
 * Single instance in fork mode on purpose:
 *  - the contact-form rate limiter is in-memory (per process)
 *  - SQLite handles one writer best
 * A marketing site with static pages does not need clustering.
 */
module.exports = {
  apps: [
    {
      name: "sigma-safe",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000 -H 127.0.0.1",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
