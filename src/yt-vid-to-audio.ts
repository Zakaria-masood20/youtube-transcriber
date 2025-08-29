import { exec } from "child_process";
import path from "path";

const downloadYouTubeAudio = (videoUrl?: string) => {
  const url = videoUrl || process.argv[2];
  
  if (!url) {
    console.error("Please provide a YouTube URL as an argument");
    console.log("Usage: npm run download <youtube-url>");
    process.exit(1);
  }
  if (!url.trim()) {
    console.error("The YouTube video URL is empty or invalid.");
    return;
  }

  const outputDir = path.join(__dirname, "output");
  const outputTemplate = path.join(outputDir, "%(title)s.%(ext)s");
  
  const command = `yt-dlp --extract-audio --audio-format mp3 --output "${outputTemplate}" "${url}"`;

  // Execute the command
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`An error occurred: ${error.message}`);
    } else if (stderr) {
      console.error(`Error output: ${stderr}`);
    } else {
      console.log("Audio downloaded successfully!");
      console.log(stdout);
    }
  });
};

if (require.main === module) {
  downloadYouTubeAudio();
}

export { downloadYouTubeAudio };
