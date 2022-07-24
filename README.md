# E-Store Project TypeScript

Single page Web Application built using TypeScript. It's a store with sequel database using Sequelize ORM, React front with Redux for state management, designed using SCSS. The products can be filtered by genre, there's an admin view where admin / store owner can upload more products to the store, checkout using Stripe with credit card validator, using Redis for cachinc for high response rates, etc.

## Features:
1. OAuth 2.0 passwordless authentication using Passport.js, sign in with Google.
2. Sequel database managed with Sequelize ORMs and PostgreSQL
3. Admin panel where you can dynmaically upload items with respected prices.
4. Checkout using stripe
5. 2 states managed by Redux
5. Session stored automatically to a sequel database and loaded upon request
6. Sales are kept in a database record
7. Caching using Redis

## Setup
1. Run the following command at the terminal
touch .env && npm i && cd src/client && npm i
2. In your .env file, you should have the following data:

GOOGLE_CLIENT=(Your Google Client ID goes here)

GOOGLE_SECRET=(Your Google Secret hash goes here)

SECRET=(random long string)

STRIPE_KEY=(Your Stripe test / production key)

URL=(your SERVER URL)

CLIENT_URL=(Your CLIENT URL)

REDIS_PORT=(Your Redis port, usually 6379)

## Libraries & Frameworks:
1. TypeScript (back & front)
2. Node.js & Express
3. PostgreSQL
4. Sequelize
5. React.js
6. Redux (React-Redux && Redux-Toolkit)
7. SCSS
8. Passport.js
9. Swagger UI
10. Stripe API
11. Express Session
12. Redis
13. Axios