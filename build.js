// Copies index.html into dist/ and fills in the Web3Forms keys from
// Vercel's environment variables, so the keys never live in the repo.
const fs = require("fs");

const club = process.env.W3F_CLUB_KEY;
const growth = process.env.W3F_GROWTH_KEY || "";

if (!club) {
  console.error("Missing W3F_CLUB_KEY. Add it in Vercel: Settings > Environment Variables, then redeploy.");
  process.exit(1);
}

let html = fs.readFileSync("index.html", "utf8");
for (const placeholder of ["CLUB KEYS", "GROWTH LEAD KEYS"]) {
  if (!html.includes(placeholder)) {
    console.error(`Could not find ${placeholder} in index.html. Put the placeholder back where the key goes.`);
    process.exit(1);
  }
}
html = html.replace("CLUB KEYS", club).replace("GROWTH LEAD KEYS", growth);

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/index.html", html);
console.log("Built dist/index.html" + (growth ? " with both keys." : " with the club key only."));
