FROM node:18-alpine

# Install dependencies for yt-dlp and ffmpeg
RUN apk add --no-cache python3 py3-pip ffmpeg

# Install yt-dlp
RUN pip3 install --no-cache-dir yt-dlp

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install npm dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Create output directory
RUN mkdir -p /app/output

# Set environment variables
ENV NODE_ENV=production
ENV OUTPUT_DIR=/app/output

# Expose volume for output
VOLUME ["/app/output"]

# Run the CLI
ENTRYPOINT ["node", "dist/cli.js"]
CMD ["--help"]