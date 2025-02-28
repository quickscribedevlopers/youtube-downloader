const { exec } = require("child_process");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// API to get the best YouTube video download link
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

    res.json({ downloadUrl: stdout.trim() });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
