# CRM Admin UI

Production-ready Next.js admin dashboard for multi-tenant AI chatbot CRM.

## Features

- Multi-tenant authentication (Tenant ID + API Key)
- Dashboard with real-time statistics
- Conversation management with polling
- Human handoff queue
- Product CRUD operations
- FAQ/Knowledge base management
- AI prompt settings
- Usage monitoring

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Server-side rendering with client-side polling

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
```

Edit `.env` and set `NEXT_PUBLIC_API_BASE_URL` to your backend API URL.

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: Backend API base URL (default: http://localhost:5678)

## Backend API Requirements

The backend must implement the following endpoints:

### Auth
- `POST /api/auth/login` - Returns `{ success, data: { token }, error }`

### Dashboard
- `GET /api/dashboard` - Returns dashboard statistics

### Conversations
- `GET /api/conversations` - Returns conversation list
- `GET /api/conversations/:sessionId` - Returns conversation detail
- `POST /api/handoff` - Create handoff request

### Handoff Queue
- `GET /api/handoff` - Returns pending handoffs
- `POST /api/handoff/resolve` - Resolve handoff

### Products
- `GET /api/products` - List products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### FAQ
- `GET /api/faq` - List FAQs
- `POST /api/faq` - Create FAQ
- `PUT /api/faq/:id` - Update FAQ
- `DELETE /api/faq/:id` - Delete FAQ

### Settings
- `GET /api/settings` - Get AI settings
- `POST /api/settings` - Update AI settings

### Usage
- `GET /api/usage` - Get usage statistics

All endpoints must return JSON in format:
```json
{
  "success": boolean,
  "data": any,
  "error": string | null
}
```

## Deployment

Self-hostable on any Node.js runtime (Vercel, Railway, DigitalOcean, etc.)

```bash
npm run build
npm start
```

## License

MIT
