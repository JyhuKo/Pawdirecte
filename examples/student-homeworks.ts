import { studentHomeworks } from "../src";

import { ExampleCredentialsError, credentials } from "./_credentials";
import { loginUsingCredentials } from "./_login-using-crendentials";

void (async function main() {
  if (!credentials.student_username || !credentials.student_password)
    throw new ExampleCredentialsError("student");

  const { session, account } = await loginUsingCredentials(
    credentials.student_username,
    credentials.student_password
  );
  const Date = prompt("Enter date in the format YYYY-MM-DD:");
  const assignmentsDate = Date ? Date : '2025-01-14';
  const assignments = await studentHomeworks(session, account, assignmentsDate);

  console.log(JSON.stringify(assignments.subjects));
})();
