const { spawn } = require("node:child_process");
const path = require("node:path");

const npmCommand = "npm";
const rootDir = path.resolve(__dirname, "..");

const processes = [
  {
    name: "frontend",
    color: "\x1b[36m",
    args: ["--prefix", "Frontend", "run", "dev"],
  },
  {
    name: "backend",
    color: "\x1b[32m",
    args: ["--prefix", "Backend", "run", "dev"],
  },
];

const reset = "\x1b[0m";
const children = [];
let shuttingDown = false;

function prefixOutput(name, color, chunk, stream) {
  const lines = chunk.toString().split(/\r?\n/);
  lines.forEach((line, index) => {
    if (!line && index === lines.length - 1) return;
    stream.write(`${color}[${name}]${reset} ${line}\n`);
  });
}

function stopAll(signal = "SIGTERM") {
  if (shuttingDown) return;
  shuttingDown = true;

  children.forEach((child) => {
    if (!child.killed) child.kill(signal);
  });
}

processes.forEach(({ name, color, args }) => {
  const child = spawn(npmCommand, args, {
    cwd: rootDir,
    env: process.env,
    shell: process.platform === "win32",
    stdio: ["ignore", "pipe", "pipe"],
  });

  children.push(child);

  child.stdout.on("data", (chunk) => prefixOutput(name, color, chunk, process.stdout));
  child.stderr.on("data", (chunk) => prefixOutput(name, color, chunk, process.stderr));

  child.on("exit", (code, signal) => {
    if (shuttingDown) return;
    console.log(`${color}[${name}]${reset} exited with ${signal || `code ${code}`}`);
    stopAll();
    process.exitCode = code || 1;
  });
});

process.on("SIGINT", () => stopAll("SIGINT"));
process.on("SIGTERM", () => stopAll("SIGTERM"));
