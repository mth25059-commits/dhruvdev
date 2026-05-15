# Deployment Guide

This portfolio is a Next.js 16 app with two server-side API routes
(`/api/contact` and `/api/chat`). You have two recommended deployment paths:

1. **Vercel** — easiest, free tier covers personal portfolios.
2. **Your own Ubuntu VPS** — full control, runs on a `$5/month`-class box.

Both paths produce the same site. The only thing you swap is hosting.

---

## Path A — Vercel (recommended for first deploy)

1. Push this repo to GitHub.
2. Go to <https://vercel.com/new>, import the repo.
3. Add these **Environment Variables** in Vercel project settings:
   - `DHRUV_PORTFOLIO_TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID` (e.g. `7092478487`)
   - `GROQ_API_KEY`
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://dhruvdeveloper.me`)
4. Trigger deploy. Vercel auto-detects Next.js and ships in under 2 minutes.
5. Add your custom domain `dhruvdeveloper.me` under **Domains**.

That's it.

---

## Path B — Self-hosted on Ubuntu VPS (1 GB RAM is enough)

This is the path for your `100 GB · 1 GB RAM` VPS. It runs Next.js in a
small Node process behind Nginx as reverse proxy, with Let's Encrypt SSL.

### 1. Prerequisites on the VPS

```bash
# As root or with sudo
apt-get update && apt-get upgrade -y
apt-get install -y curl git ufw nginx certbot python3-certbot-nginx

# Install Node 20 (matches the version this app was built for)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install Docker (optional, for the alternative containerised path)
curl -fsSL https://get.docker.com | sh

# Firewall
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
```

### 2. Clone & build

```bash
mkdir -p /var/www && cd /var/www
git clone https://github.com/<your-org>/dhruvdeveloper.git
cd dhruvdeveloper
cp .env.local.template .env.local
# Edit .env.local with the real Telegram token + Groq key
nano .env.local

npm ci
npm run build
```

### 3. Run with PM2 (simple, ~50 MB RAM)

```bash
npm install -g pm2
pm2 start npm --name dhruvdeveloper -- start
pm2 startup systemd     # follow the printed command to auto-start on boot
pm2 save
```

The site is now serving on `http://localhost:3000`. Don't expose that port —
Nginx will sit in front.

### 4. Nginx reverse proxy + SSL

Create `/etc/nginx/sites-available/dhruvdeveloper.me`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name dhruvdeveloper.me www.dhruvdeveloper.me;

    # gzip / brotli
    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1024;

    # Long cache for hashed Next.js assets
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # Everything else
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Enable and reload:

```bash
ln -s /etc/nginx/sites-available/dhruvdeveloper.me /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

Issue SSL:

```bash
certbot --nginx -d dhruvdeveloper.me -d www.dhruvdeveloper.me
```

Certbot adds the renewal cron automatically.

### 5. Optional: Docker compose path

If you'd rather run everything in containers, create a `Dockerfile` like:

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["npm", "start"]
```

And a `docker-compose.yml`:

```yaml
services:
  web:
    build: .
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    env_file: .env.local
```

Then `docker compose up -d --build`. Nginx config above stays the same.

### 6. Updates

```bash
cd /var/www/dhruvdeveloper
git pull
npm ci
npm run build
pm2 restart dhruvdeveloper
```

---

## Operating tips

- The Groq + Telegram tokens must NEVER ship to the browser. They're only
  referenced via `process.env.*` inside `app/api/*/route.ts`.
- The site uses `prefers-reduced-motion` — accessibility users won't get the
  heavy animation pass.
- Custom cursor and interactive grid auto-disable on touch devices.
- Static pages prerender; only `/api/*` routes hit Node at runtime, so the
  1 GB RAM box stays comfortable.
