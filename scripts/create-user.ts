import "dotenv/config";
import { createAuth } from "../src/lib/auth";

const [email, password, name] = process.argv.slice(2);

if (!email || !password) {
  console.error("Usage: npm run auth:create-user -- <email> <password> [name]");
  process.exit(1);
}

async function main() {
  const auth = createAuth({ allowSignup: true });

  const displayName = name || email.split("@")[0] || "User";

  try {
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: displayName,
      },
    });

    const createdEmail = "user" in result && result.user?.email ? result.user.email : email;
    console.log(`User created: ${createdEmail}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Failed to create user: ${message}`);
    process.exit(1);
  }
}

main();
