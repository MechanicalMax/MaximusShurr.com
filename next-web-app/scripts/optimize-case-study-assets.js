#!/usr/bin/env node

/**
 * Case Study Asset Optimizer
 *
 * - Recursively scans public/work/**
 * - Images → WebP
 * - Videos → WebM
 * - Outputs stay in the SAME directory as the source
 * - Strips ALL legacy extensions from filenames
 * - Skips already-optimized assets
 */

const { execFileSync } = require("child_process");
const { readdirSync, statSync, existsSync } = require("fs");
const { join, extname, basename, dirname } = require("path");

/* ================================
   Configuration
================================ */

const ROOT_DIR = join(process.cwd(), "public", "work");

const MAX_WIDTH = 1920;
const IMAGE_QUALITY = 85;
const VIDEO_CRF = 28;

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".heic"
]);

const VIDEO_EXTENSIONS = new Set([
  ".mov",
  ".mp4"
]);

/* ================================
   Helpers
================================ */

/**
 * Recursively strip all known source extensions
 * Handles cases like:
 *   "Photo.JPG"
 *   "Photo.JPG.png"
 *   "Photo.png.JPG"
 */
function stripSourceExtensions(filename) {
  let name = filename;
  let prev;

  do {
    prev = name;
    name = name.replace(/\.(jpg|jpeg|png|heic|mov|mp4)$/i, "");
  } while (name !== prev);

  return name;
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      walk(fullPath);
    } else if (stats.isFile()) {
      processFile(fullPath);
    }
  }
}

/* ================================
   Core Logic
================================ */

function processFile(file) {
  const ext = extname(file).toLowerCase();

  // Skip already-optimized outputs
  if (ext === ".webp" || ext === ".webm") return;

  const dir = dirname(file);
  const rawName = basename(file);
  const cleanName = stripSourceExtensions(rawName);

  // Images → WebP
  if (IMAGE_EXTENSIONS.has(ext)) {
    const output = join(dir, `${cleanName}.webp`);
    if (existsSync(output)) return;

    console.log(`🖼  ${file} → ${output}`);

    execFileSync(
      "ffmpeg",
      [
        "-y",
        "-i", file,
        "-vf", `scale='min(${MAX_WIDTH},iw)':-2`,
        "-quality", IMAGE_QUALITY.toString(),
        output
      ],
      { stdio: "inherit" }
    );
  }

  // Videos → WebM
  if (VIDEO_EXTENSIONS.has(ext)) {
    const output = join(dir, `${cleanName}.webm`);
    if (existsSync(output)) return;

    console.log(`🎬 ${file} → ${output}`);

    execFileSync(
      "ffmpeg",
      [
        "-y",
        "-i", file,
        "-vf", `scale='min(${MAX_WIDTH},iw)':-2`,
        "-c:v", "libvpx-vp9",
        "-crf", VIDEO_CRF.toString(),
        "-b:v", "0",
        "-an",
        output
      ],
      { stdio: "inherit" }
    );
  }
}

/* ================================
   Run
================================ */

console.log("🔍 Optimizing case study assets...");
walk(ROOT_DIR);
console.log("✅ Asset optimization complete.");