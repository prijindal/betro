import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from "fs";
import path from "path";

const NYC_DIRECTORY = ".nyc_output";

if (existsSync(NYC_DIRECTORY)) {
  // Remove the .nyc_output directory
  rmSync(NYC_DIRECTORY, { recursive: true });
}

// Create the .nyc_output directory if it doesn't exist
mkdirSync(NYC_DIRECTORY, { recursive: true });

for (const dir of ["services", "libraries", "packages"]) {
  for (const subdir of readdirSync(`./${dir}`)) {
    const fullPath = path.join(__dirname, dir, subdir, NYC_DIRECTORY);
    if (existsSync(fullPath)) {
      for (const file of readdirSync(fullPath)) {
        if (file.endsWith(".json")) {
          const filePath = path.join(fullPath, file);
          copyFileSync(
            filePath,
            path.join(NYC_DIRECTORY, `${dir}-${subdir}-${file}`)
          );
        }
      }
    }
  }
}
