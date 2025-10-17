require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

if (!GITHUB_USERNAME) {
  console.warn(
    "[WARN] GITHUB_USERNAME is not set in .env. Set it to your GitHub handle."
  );
}

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static assets
app.use("/public", express.static(path.join(__dirname, "public")));

// Fetch GitHub repos server-side
async function fetchRepos(username) {
  if (!username) return [];
  const url = `https://api.github.com/users/${encodeURIComponent(
    username
  )}/repos?per_page=100&sort=updated`;
  const headers = { "User-Agent": "modern-portfolio-app" };

  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.error("[GitHub API] Error:", res.status, res.statusText);
    return [];
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

app.get("/", async (req, res) => {
  try {
    const repos = await fetchRepos(GITHUB_USERNAME);

    const repoCards = repos.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description || "No description provided.",
      stars: r.stargazers_count || 0,
      language: r.language || "—",
      html_url: r.html_url,
      homepage: r.homepage,
      topics: r.topics || [],
      updated_at: r.updated_at,
    }));

    res.render("index", {
      meta: {
        title: "My Portfolio",
        description: "Projects, skills, and how to reach me.",
      },
      profile: {
        name: "Zac Myburgh",
        role: "Software Engineer",
        location: "Centurion, Gauteng, South Africa",
        bio: "I am Zac Myburgh, an Information Technology student passionate about software enginering and innovation. I enjoy building creative and efficient digital solutions using technologies like Node.js, Express, Java, C#, and Python. With a focus on clean code and user-centered design, I strive to keep learning and developing systems that make technology smarter and more accessible.",
        photo: "/public/images/me.jpg",
        email: "zac.myburgh@gmail.com",
        mobile: "082 652 6565",
        socials: {
          github: `https://github.com/${GITHUB_USERNAME || ""}`,
          linkedin: "https://www.linkedin.com/in/zac-myburgh-399629366",
        },
      },
      repos: repoCards,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An unexpected error occurred.");
  }
});

app.listen(PORT, () => {
  console.log(`\n▶ Portfolio running on http://localhost:${PORT}\n`);
});
