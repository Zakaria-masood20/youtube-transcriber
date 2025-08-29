import { exec } from "child_process";
import path from "path";
import fs from "fs/promises";
import * as dotenv from "dotenv";
import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
  ResultReason,
  CancellationDetails,
} from "microsoft-cognitiveservices-speech-sdk";

dotenv.config();

const azureSubscriptionKey = process.env.AZURE_SPEECH_KEY || "";
const azureRegion = process.env.AZURE_SPEECH_REGION || "westeurope";

if (!azureSubscriptionKey) {
  console.error("Azure Speech Key is not configured. Please set AZURE_SPEECH_KEY in your .env file");
  process.exit(1);
}

// Function to transcribe audio using Azure Speech Services
const transcribeAudio = async (audioFilePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const speechConfig = SpeechConfig.fromSubscription(
      azureSubscriptionKey,
      azureRegion
    );
    const audioFileBuffer = require("fs").readFileSync(audioFilePath);
    const audioConfig = AudioConfig.fromWavFileInput(audioFileBuffer);
    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    console.log("Transcribing audio...");
    recognizer.recognizeOnceAsync(
      (result) => {
        if (result.reason === ResultReason.NoMatch) {
          reject(new Error("No speech could be recognized."));
        } else if (result.reason === ResultReason.Canceled) {
          const cancellationDetails = CancellationDetails.fromResult(result);
          reject(
            new Error(
              `Recognition canceled: ${cancellationDetails.reason} - ${cancellationDetails.errorDetails}`
            )
          );
        } else {
          resolve(result.text);
        }
      },
      (error) => {
        reject(new Error(`Error during recognition: ${error}`));
      }
    );
  });
};

// Function to save combined transcript to a file
const saveCombinedTranscript = async (transcript: string, outputDir: string) => {
  const transcriptPath = path.join(outputDir, "combined_transcript.txt");
  await fs.writeFile(transcriptPath, transcript, "utf-8");
  console.log(`Combined transcript saved to ${transcriptPath}`);
};

// Main function to process YouTube URLs
const processYouTubeUrls = async () => {
  const videoUrls = process.argv.slice(2); // Read URLs from command-line arguments
  if (videoUrls.length === 0) {
    console.error("No YouTube URLs provided. Please pass URLs as command-line arguments.");
    return;
  }

  // Create a directory for all outputs
  const outputDir = path.join(__dirname, "output", new Date().getTime().toString());
  await fs.mkdir(outputDir, { recursive: true });

  let combinedTranscript = "";

  for (const videoUrl of videoUrls) {
    console.log(`Processing URL: ${videoUrl}`);
    try {
      // Set the output directory for this video
      const videoOutputDir = path.join(outputDir, new Date().getTime().toString());
      await fs.mkdir(videoOutputDir, { recursive: true });

      const outputTemplate = path.join(videoOutputDir, "%(title)s.%(ext)s");

      // yt-dlp command to download audio with additional options
      const cleanUrl = videoUrl.replace(/\\/g, ''); // Remove any backslashes
      const command = `yt-dlp --extract-audio --audio-format mp3 --no-check-certificate --output "${outputTemplate}" "${cleanUrl}"`;

      await new Promise<void>((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            reject(new Error(`Error downloading audio: ${error.message}`));
            return;
          }

          if (stderr) console.error(`Error output: ${stderr}`);
          console.log("Audio downloaded successfully!");
          console.log(stdout);
          resolve();
        });
      });

      // Find the downloaded file
      const files = await fs.readdir(videoOutputDir);
      const audioFile = files.find((file) => file.endsWith(".mp3"));
      if (!audioFile) {
        throw new Error("No audio file found after download.");
      }

      const audioFilePath = path.join(videoOutputDir, audioFile);

      // Convert MP3 to WAV using ffmpeg
      const wavFilePath = path.join(videoOutputDir, "audio.wav");
      await new Promise<void>((resolve, reject) => {
        exec(`ffmpeg -i "${audioFilePath}" "${wavFilePath}"`, (err) => {
          if (err) {
            reject(new Error(`Error converting MP3 to WAV: ${err.message}`));
            return;
          }
          resolve();
        });
      });

      // Transcribe the converted audio (WAV format)
      const transcript = await transcribeAudio(wavFilePath);
      combinedTranscript += `Transcript for ${videoUrl}:\n${transcript}\n\n`;

      console.log(`Finished processing URL: ${videoUrl}`);
    } catch (err) {
      console.error(`Error processing URL ${videoUrl}: ${(err as Error).message}`);
    }
  }

  // Save the combined transcript
  await saveCombinedTranscript(combinedTranscript, outputDir);

  console.log("All URLs processed.");
};

// Run the function if this script is executed directly
if (require.main === module) {
  processYouTubeUrls();
}