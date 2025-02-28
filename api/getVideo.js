const { exec } = require("child_process");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // ✅ Enable CORS for all requests

const PORT = process.env.PORT || 3000;

app.get("/getVideo", (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).json({ error: "Missing video URL" });
  }

  const command = `yt-dlp -f "best[ext=mp4]" -g ${videoUrl}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: "Failed to fetch download link" });
    }

    res.setHeader("Access-Control-Allow-Origin", "*");  // ✅ Fix CORS issue
    res.json({ downloadUrl: stdout.trim() });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
