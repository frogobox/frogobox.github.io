import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const DATA_PATH = path.join(process.cwd(), "data", "site.json");

function getCurrentBranch(): string {
  try {
    return execSync("git branch --show-current", { encoding: "utf-8" }).trim();
  } catch {
    return "unknown";
  }
}

function isDevMode(): boolean {
  const branch = getCurrentBranch();
  const devBranches = ["dev", "development", "develop"];
  const isDev = process.env.NODE_ENV === "development";
  const isDevBranch = devBranches.includes(branch.toLowerCase());
  return isDev || isDevBranch;
}

function gitCommitAndPush(message: string): { success: boolean; error?: string } {
  try {
    const cwd = process.cwd();
    execSync("git add data/site.json", { cwd, encoding: "utf-8" });
    execSync(`git commit -m "${message}"`, { cwd, encoding: "utf-8" });
    execSync("git push origin master", { cwd, encoding: "utf-8" });
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

export async function GET() {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    const data = JSON.parse(raw);
    const branch = getCurrentBranch();
    const devMode = isDevMode();
    return NextResponse.json({ data, branch, devMode });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { data, commitMessage } = body;

    if (!data) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    // Write file
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + "\n", "utf-8");

    const devMode = isDevMode();
    let gitResult = null;

    // Only commit & push on production (master branch, not dev mode)
    if (!devMode) {
      const msg = commitMessage || `chore: update site.json via CMS [${new Date().toISOString()}]`;
      gitResult = gitCommitAndPush(msg);
    }

    return NextResponse.json({
      success: true,
      devMode,
      branch: getCurrentBranch(),
      gitResult,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
