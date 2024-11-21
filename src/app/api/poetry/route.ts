import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { mood } = await request.json();
    console.log("Mood:", mood);

    return new Promise((resolve, reject) => {
      // Spawn a Python process for the generate_poem.py script
      const pythonProcess = spawn("python", ["scripts/main.py"]);

      let output = "";
      let error = "";

      // Pass the mood to the Python script
      pythonProcess.stdin.write(JSON.stringify({ mood }));
      pythonProcess.stdin.end();

      // Capture the Python script's stdout
      pythonProcess.stdout.on("data", (data) => {
        output += data.toString();
        console.log(data.toString());
      });

      // Capture the Python script's stderr
      pythonProcess.stderr.on("data", (data) => {
        error += data.toString();
      });

      // Handle when the Python process exits
      pythonProcess.on("close", (code) => {
        if (code === 0) {
          try {
            const result = JSON.parse(output); // Parse JSON from Python script
            resolve(NextResponse.json(result)); // Return the parsed result
          } catch (parseError) {
            console.error("JSON Parsing Error:", parseError);
            reject(
              NextResponse.json(
                { error: "Failed to parse JSON output from Python script." },
                { status: 500 }
              )
            );
          }
        } else {
          console.error("Python Script Error:", error);
          reject(
            NextResponse.json(
              {
                error: `Python script failed with code ${code}: ${error}`,
              },
              { status: 500 }
            )
          );
        }
      });
    });
  } catch (error: unknown) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unknown error occurred while calling the Python script.",
      },
      { status: 500 }
    );
  }
}
