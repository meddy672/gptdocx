import { join, parse } from "path";
import { RequestFormat } from "@models";
import { readdirSync, mkdirSync, statSync, readFileSync, writeFileSync } from "fs";
import Static from "./static/constants";

/**
 * @description
 * Adds templates to be used by the DocxTemplater engine
 *
 * @param {string} name the template name
 * @param {string} filePath path to the template
 */
function addTemplate(
  fileName: string,
  filePath: string,
  requestFormat: RequestFormat
) {
  validateRequest(fileName, filePath, requestFormat);
  const { name, ext } = parse(filePath);
  try {
    const context = readFileSync(filePath);
    writeFileSync(join(__dirname, "docx", name + ext), context);
    const formatPath = join(__dirname, 'formats', name)
    mkdirSync(formatPath)
    writeFileSync(join(formatPath, Static.INDEX_JS), context);
  } catch (error: any) {
    console.error(`Error: Unable to add template: ${name}`, error);
  }
}

function validateRequest(
  fileName: string,
  filePath: string,
  requestFormat: RequestFormat
) {
  const { name, ext } = parse(filePath);
  const docxFiles = readdirSync("./docx");
  const requestFormatKeys = Object.keys(requestFormat);
  if (!fileName || fileName.trim() === "") {
    throw new Error("Filename is invalid. Filename cannot be empty.");
  }
  if (!name || ext === ".docx") {
    throw new Error("Error: ADD_TEMPLATE_ERROR");
  }
  if (docxFiles.includes(name)) {
    throw new Error(`Filename: ${name} already exsist`);
  }
  if (typeof requestFormat !== "object") {
    throw new Error("Invalid requestFormat. requestFormat must be an object.");
  }

  if (!requestFormatKeys.length) {
    throw new Error("Invalid requestFormat. No keys found for the object.");
  }
}
