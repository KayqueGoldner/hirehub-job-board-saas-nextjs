# HireHub Job Board SaaS

**A modern job board SaaS application built with Next.js that connects companies and job seekers. The platform allows companies to post jobs and job seekers to find and apply for positions.**

![Application Screenshot](/hirehub-job-board-saas.png "HireHub Job Board")

## 🚀 Features

- **User Types**: Separate flows for companies and job seekers
- **Job Listings**: Companies can post and manage job listings
- **Job Search**: Job seekers can browse and search for jobs
- **Job Saving**: Job seekers can save jobs for later
- **User Profiles**: Detailed profiles for companies and job seekers
- **Payment Integration**: Stripe integration for paid job listings
- **Authentication**: Secure user authentication with NextAuth
- **Responsive Design**: Works seamlessly on all device sizes

## 🛠️ Technologies Used

- **Frontend**:
  - [Next.js 15](https://nextjs.org/) - A React framework with App Router
  - [React 19](https://react.dev/) - JavaScript library for building user interfaces
  - [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
  - [Shadcn UI](https://ui.shadcn.com/) - Accessible and customizable UI components

- **Backend**:
  - [Next.js API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) - Serverless functions
  - [Prisma](https://www.prisma.io/) - ORM for database access
  - [PostgreSQL](https://www.postgresql.org/) - Relational database
  - [Auth.js](https://authjs.dev/) - Authentication for Next.js

- **Payment Processing**:
  - [Stripe](https://stripe.com/) - Payment processing

- **Cloud Services**:
  - [Inngest](https://www.inngest.com/) - Background job processing
  - [Arcjet](https://arcjet.com/) - Request rate limiting
  - [UploadThing](https://uploadthing.com/) - File uploads

## 📦 Key Dependencies

- [Prisma](https://www.prisma.io/) - Database ORM
- [Auth.js](https://authjs.dev/) - Authentication
- [React Hook Form](https://www.react-hook-form.com/) - Form validation
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [TipTap](https://tiptap.dev/) - Rich text editor
- [Stripe](https://stripe.com/) - Payment processing
- [Resend](https://resend.com/) - Email delivery

## 💻 Setup

Follow these steps to set up and run the application locally:

### 1. Clone the Repository

```bash
git clone https://github.com/KayqueGoldner/hirehub-job-board-saas-nextjs.git
cd hirehub-job-board-saas-nextjs
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Configure Environment Variables

Create a `.env` file based on the `.env.example` template with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/hirehub"

# NextAuth
AUTH_SECRET="your-auth-secret"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"

# UploadThing
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Resend (Email)
RESEND_API_KEY="your-resend-api-key"

# Inngest
INNGEST_EVENT_KEY="your-inngest-event-key"
INNGEST_SIGNING_KEY="your-inngest-signing-key"

# Arcjet
ARCJET_SITE_KEY="your-arcjet-site-key"
ARCJET_SECRET_KEY="your-arcjet-secret-key"
```

### 4. Set Up the Database

```bash
npx prisma generate
npx prisma db push
# Optional: Seed the database with initial data
npx prisma db seed
```

### 5. Run the Application

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 6. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📝 Project Structure

- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable UI components
- `/lib` - Utility functions and shared code
- `/prisma` - Database schema and seed data
- `/public` - Static assets

## 🔐 Authentication

The application uses NextAuth.js for authentication with the following providers:
- Email/Password
- OAuth providers (configurable)

## 🧪 Development

### Commands

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
