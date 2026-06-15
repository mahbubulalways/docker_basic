import fs from "fs";
import path from "path";

export const listLogFiles = (logType: string): string[] => {
  const logDir = path.join(process.cwd(), "logs", "wiston", logType);

  try {
    const data = fs.readdirSync(logDir).filter((file) => file.endsWith(".log"));
    return data;
  } catch (error) {
    console.log(`Failed to list ${logType} logs `, error);

    return [];
  }
};
