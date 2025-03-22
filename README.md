# TypeGraphQL + Mongoose Sample

A simple project integrating **TypeGraphQL** with **Mongoose**.

## 🚀 Setup Instructions

1. Install dependencies:
   ```sh
   npm install
   ```

2. Start MongoDB (if not running):
   ```sh
   mongod
   ```

3. Run the GraphQL API:
   ```sh
   npm start
   ```

4. Open GraphQL Playground:
   ```sh
   http://localhost:4000
   ```

### Example Queries

✅ **Fetch all users:**
```graphql
query {
  users {
    _id
    name
    email
  }
}
```

✅ **Create a new user:**
```graphql
mutation {
  createUser(name: "John Doe", email: "john@example.com", password: "secret") {
    _id
    name
    email
  }
}
```

Enjoy! 🚀


permissions is static
create_user
  


create a class to inherit the common services - create readone, update like that

RBAC:
<!-- - permission list static -->
<!-- - create roles with added permissions -->
<!-- - assign roles to user -->
<!-- - make authchecker works -->






