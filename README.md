# MatchaCado

<div align="center">
  <img src="public/logo.png" alt="MatchaCado Logo" width="180" />
</div>

MatchaCado is a full-stack creator support platform built with Next.js, allowing fans to directly fund their favorite creators by "buying them a matcha and avocado." It provides a seamless experience for creators to set up a public page, connect their payment details, and start receiving support.

## Key Features

- **Social Authentication:** Easy and secure sign-up and login for creators using Google and GitHub via NextAuth.js.
- **Creator Dashboard:** A private, user-specific dashboard where creators can manage their profile information, update their username, and configure payment settings.
- **Public Profile Pages:** Every creator gets a unique and shareable public page (e.g., `matchacado.com/your-username`) where supporters can make donations.
- **Secure Payment Integration:** Securely processes donations using Razorpay, allowing creators to link their own accounts to receive funds directly.
- **Dynamic Supporter List:** Successfully verified payments are displayed on the creator's public page, showcasing their community of supporters.
- **Full-Stack React:** Built entirely with Next.js, leveraging both client components for interactivity and server components/actions for robust backend logic.

## Tech Stack & Architecture

- **Framework:** Next.js (App Router)
- **Authentication:** NextAuth.js
- **Database:** MongoDB with Mongoose
- **Payment Gateway:** Razorpay
- **Styling:** Tailwind CSS
- **Deployment:** Vercel, Netlify, or any Node.js compatible platform.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v18 or later)
- A package manager (npm, yarn, or pnpm)
- Access to a MongoDB database (e.g., a free Atlas cluster)
- A Razorpay account to get API keys
- Google and GitHub OAuth credentials

### Local Installation

**Clone the repository:**

```bash
git clone https://github.com/iasjad/matchacado.git
cd matchacado
```

**Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

**Set up environment variables:**

Create a file named `.env.local` in the root of the project and add the following variables:

```env
# MongoDB Connection String
MONGODB_URI="your_mongodb_connection_string"

# NextAuth.js credentials
# Generate a secret: openssl rand -base64 32
NEXTAUTH_SECRET="your_nextauth_secret"

# Google OAuth Credentials
GOOGLE_ID="your_google_client_id"
GOOGLE_SECRET="your_google_client_secret"

# GitHub OAuth Credentials
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"

# The base URL of your deployed app (for production) or localhost (for development)
# Important for NextAuth and Razorpay callbacks
NEXT_PUBLIC_HOST_URL="http://localhost:3000"
```

**Run the development server:**

```bash
npm run dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Project Structure

Here is the updated structure based on your actual project:

```
/
├── app/
│   ├── [username]/
│   │   └── page.js
│   ├── about/
│   │   └── page.js
│   ├── actions/
│   │   └── useractions.js
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.js
│   │   └── razorpay/
│   │       └── route.js
│   ├── dashboard/
│   │   └── page.js
│   ├── db/
│   │   └── connectDB.js
│   ├── login/
│   │   └── page.js
│   ├── models/
│   │   ├── Payment.js
│   │   └── User.js
│   ├── layout.js
│   └── page.js
├── components/

```

## Contributing

Contributions are welcome! If you'd like to improve MatchaCado, please follow these steps:

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes.
4. Commit your changes:

```bash
git commit -m 'Add some amazing feature'
```

5. Push to the branch:

```bash
git push origin feature/your-feature-name
```

6. Open a Pull Request.
