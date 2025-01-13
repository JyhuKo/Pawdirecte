import { studentHomepageTimeline, studentTimeline } from "../src";

import { ExampleCredentialsError, credentials } from "./_credentials";
import { loginUsingCredentials } from "./_login-using-crendentials";

void (async function main() {
  if (!credentials.student_username || !credentials.student_password)
    throw new ExampleCredentialsError("student");

  const { session, account } = await loginUsingCredentials(
    credentials.student_username,
    credentials.student_password
  );
  const timeline = await studentTimeline(session, account);
  const homepageTimeline = await studentHomepageTimeline(session, account);

  console.log("--- TIMELINE");

  if (timeline.length > 0) {
    timeline.forEach((item) => {
      console.log("---");

      console.log(
        item.title || "(no title)",
        `(${item.elementKind} @ ${item.elementID})`
      );
      console.log("Publish date:", item.date.toLocaleString());
      console.log("Description:", item.description || "(no description)");

      console.log("Content:\n");
      console.log(item.content || "(no content)");
    });
  }
  else {
    console.log("No timeline items found.");
  }

  console.log("--- HOMEPAGE TIMELINE");

  if (homepageTimeline.length > 0) {
    homepageTimeline.forEach((item) => {
      console.log("---");

      console.log("Written By:", item.authorName);
      console.log("Author ID:", item.authorId);
      console.log("Author First Name:", item.authorFirstName);
      console.log("Author Title:", item.authorTitle);
      console.log("Creation Date:", item.creationDate.toLocaleString());
      console.log("Start Date:", item.startDate.toLocaleString());
      console.log("End Date:", item.endDate.toLocaleString());
      console.log("Target:", item.target);
      console.log("Target Schools:", item.targetSchools);
      console.log("Color Name:", item.colorName);

      console.log("Content: ");
      if (item.content.includes('data:image/jpeg;base64')) {
        console.log('Contient une image en base64');
      } else {
        console.log(item.content || '(no content)');
      }
    });
  }
  else {
    console.log("No homepage timeline items found.");
  }
})();
