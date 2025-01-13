import { studentTimetable } from "../src";

import { ExampleCredentialsError, credentials } from "./_credentials";
import { loginUsingCredentials } from "./_login-using-crendentials";

void (async function main() {
  if (!credentials.student_username || !credentials.student_password)
    throw new ExampleCredentialsError("student");

  const { session, account } = await loginUsingCredentials(
    credentials.student_username,
    credentials.student_password
  );
  const StartDate = prompt("Enter date in the format YYYY-MM-DD:");
  const CheckStartDate = StartDate ? new Date(StartDate) : new Date('2025-01-14');

  const timetable = await studentTimetable(session, account, CheckStartDate);

  timetable.forEach((item) => {
    console.log("---");
    console.log(item.id);
  });
})();
