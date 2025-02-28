const { exec } = require("child_process");

export default function handler(req, res) {
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
}
