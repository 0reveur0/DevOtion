import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Shared Gemini API client (server-side only)
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Log API requests for debugging
  app.use((req, res, next) => {
    console.log(`[API REQUEST] ${req.method} ${req.path}`);
    next();
  });

  // ---- GITHUB OAUTH ENDPOINTS ----

  // Endpoint to fetch the OAuth redirect URL
  app.get("/api/auth/github/url", (req, res) => {
    const clientId = process.env.GITHUB_CLIENT_ID;
    
    if (!clientId) {
      return res.status(400).json({
        error: "GITHUB_CLIENT_ID environment variable is not configured on the server. Please add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to Secrets.",
      });
    }

    const appUrl = process.env.APP_URL || "http://localhost:3000";
    const redirectUri = `${appUrl}/auth/callback`;
    
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: "repo read:user",
      response_type: "code",
    });

    res.json({ url: `https://github.com/login/oauth/authorize?${params.toString()}` });
  });

  // Callback route redirected to by GitHub.
  // Serves HTML page that postMessages the token to the parent page and closes popup.
  app.get(["/auth/callback", "/auth/callback/"], async (req, res) => {
    const { code } = req.query;

    if (!code) {
      return res.send(`
        <html>
          <body>
            <h3>Authentication failed</h3>
            <p>Authorization code was not provided by GitHub.</p>
            <script>setTimeout(() => window.close(), 3000);</script>
          </body>
        </html>
      `);
    }

    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return res.send(`
        <html>
          <body>
            <h3>Configuration Error</h3>
            <p>GitHub Client ID or Client Secret is not set on the server.</p>
            <script>setTimeout(() => window.close(), 5000);</script>
          </body>
        </html>
      `);
    }

    try {
      // Exchange code for token
      const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error(`Token exchange returned status ${tokenResponse.status}`);
      }

      const tokenData = await tokenResponse.json() as { access_token?: string; error?: string; error_description?: string };

      if (tokenData.error) {
        throw new Error(tokenData.error_description || tokenData.error);
      }

      const token = tokenData.access_token;
      if (!token) {
        throw new Error("No access token found in response from GitHub");
      }

      // Return small, safe script that posts token to the parent and self-closes
      res.send(`
        <html>
          <head>
            <title>Authentication Successful</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background-color: #0f172a; color: #f1f5f9; text-align: center; }
              .card { background: #1e293b; padding: 2rem; border-radius: 1rem; border: 1px solid #334155; max-width: 400px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.5); }
              .spinner { width: 40px; height: 40px; border: 3px solid #38bdf8; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 1rem auto; }
              @keyframes spin { to { transform: rotate(360deg); } }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="spinner"></div>
              <h2>Connected Successfully!</h2>
              <p>Syncing credentials with Dashboard, this window will close automatically...</p>
            </div>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: "GITHUB_OAUTH_SUCCESS", token: "${token}" }, "*");
                window.close();
              } else {
                window.location.href = "/";
              }
            </script>
          </body>
        </html>
      `);
    } catch (error: any) {
      console.error("OAuth error exchanging code:", error);
      res.send(`
        <html>
          <body>
            <h3>Authentication Failure</h3>
            <p>Error exchanging authenticating: ${error.message || "Unknown error"}</p>
            <script>setTimeout(() => window.close(), 6000);</script>
          </body>
        </html>
      `);
    }
  });


  // ---- GEMINI ENDPOINTS ----

  // 1. Analyze target repository elements for deployment profiling
  app.post("/api/gemini/analyze-repo", async (req, res) => {
    if (!ai) {
      return res.status(503).json({
        error: "Gemini API key is not configured. Register dynamic insights once configured.",
      });
    }

    const { repoFullName, filesList, readmeContent, language } = req.body;

    try {
      const prompt = `You are an expert cloud solutions architect. Provide a high-precision, technical deployment and health breakdown for the GitHub repository: "${repoFullName}".
      
Primary Language/Tech detected: ${language || "Unknown"}
Available Files List: ${JSON.stringify(filesList || [])}
README Preview (short):
${readmeContent ? readmeContent.substring(0, 800) : "No README content provided"}

Deliver your output as a clean, professionally formatted JSON object strictly matching this schema (do not wrap in markdown \`\`\`json blocks, just return raw JSON):
{
  "projectType": "e.g., React (Vite), Express Backend, Next.js, static site",
  "techStack": ["TypeScript", "Tailwind CSS", "Vite", "Node.js etc."],
  "deploymentComplexity": "Low" | "Medium" | "High",
  "recommendedBuildConfig": {
    "installCommand": "npm install",
    "buildCommand": "npm run build",
    "outputDirectory": "dist"
  },
  "potentialIssues": ["List of 2-3 potential structure warnings or build configuration details to verify (e.g., missing lock files, port hardcoding, etc.)"],
  "architectRecommendations": "A concise paragraph summarizing deployment best practices for this repository."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No text response from Gemini");
      }

      res.json(JSON.parse(responseText.trim()));
    } catch (error: any) {
      console.error("Error analyzing repo with Gemini:", error);
      res.status(500).json({ error: "Failed to compile repository insights via AI: " + error.message });
    }
  });

  // 2. AI Diagnostics of Deployment/Build Error log
  app.post("/api/gemini/diagnose-error", async (req, res) => {
    if (!ai) {
      return res.status(503).json({
        error: "Gemini API Key is missing. Add GEMINI_API_KEY to secrets to troubleshoot logs with Gemini.",
      });
    }

    const { logs, repoFullName, branch, config } = req.body;

    try {
      const prompt = `You are a DevOps and deployment automated assistant.
The custom branch deployment for "${repoFullName}" (branch: "${branch}") failed.
Analyze the following truncated build logs, isolate the exact issue, and provide practical resolution steps.

Build Configuration used:
${JSON.stringify(config || {})}

Build Terminally-Reported Logs:
${(logs || []).join("\n")}

Respond with a clean JSON object matching the following structural schema (returned as raw JSON, no code fences):
{
  "errorCode": "e.g., TSC_COMPILE_ERROR, DEPENDENCY_MISSING, PORT_BIND_CONFLICT",
  "summary": "Short 1-sentence plain explaining what broke.",
  "rootCauseAnalysis": "Deep technical details on what triggered this (pointing to specific build tools: typescript, esbuild, npm etc.).",
  "immediateSolution": "Markdown detailed snippet showing what file/configuration to edit or modify (e.g. package.json, vite.config.ts, TS options) to immediately resolve.",
  "severity": "Warning" | "Critical"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response content from Gemini API");
      }

      res.json(JSON.parse(responseText.trim()));
    } catch (error: any) {
      console.error("Error diagnosing build error with Gemini:", error);
      res.status(500).json({ error: "Failed to formulate log troubleshooting: " + error.message });
    }
  });

  // 3. Generate CI/CD workflow YAML
  app.post("/api/gemini/generate-workflow", async (req, res) => {
    if (!ai) {
      return res.status(503).json({
        error: "Gemini API Key is missing.",
      });
    }

    const { repoFullName, buildConfig, provider } = req.body;

    try {
      const prompt = `Analyze the repository "${repoFullName}" and write a comprehensive, secure, production-ready CI/CD automation YAML file for ${provider || "GitHub Actions"}.
      
Target Build Settings:
- Build command: ${buildConfig.buildCommand || "npm run build"}
- Install command: ${buildConfig.installCommand || "npm install"}
- Output directory: ${buildConfig.outputDirectory || "dist"}
- Node Version Required: ${buildConfig.nodeVersion || "20"}

Respond with a raw clean JSON object matching this schema (with no markdown wrappers):
{
  "fileName": ".github/workflows/deploy.yml",
  "yamlContent": "The complete, syntactically-valid Multi-Line CI/CD workflow YAML code with commentaries.",
  "workflowStepsExplanation": ["Explaining key blocks like checkout, node cache, compilation, and secret bindings."],
  "requiredSecrets": [
    {
      "key": "Name of secret, e.g. GITHUB_TOKEN, CLOUD_RUN_TOKEN",
      "description": "Short explanation of what value must be put here."
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No text response from Gemini");
      }

      res.json(JSON.parse(responseText.trim()));
    } catch (error: any) {
      console.error("Error generating workflow with Gemini:", error);
      res.status(500).json({ error: "Failed to generate workflow YAML: " + error.message });
    }
  });


  // ---- VITE / CLIENT ASSETS ROUTING ----

  // Serve static dist folder in production, or hook in Vite server in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SERVER] GitHub Deployment Dashboard running on dev-port http://localhost:${PORT}`);
  });
}

startServer();
