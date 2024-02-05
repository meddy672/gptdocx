import "dotenv/config";
import { Paragraph, TextRun, ExternalHyperlink } from "docx";
import { join } from "path";
import ChatGPT from "./ChatGPT";
import DocxTemplater from "./DocxTemplater";
import WordDocument from "./Document";
import DocxTable from "./Table";
import DocxImage from "./Image";
import Static from "./static/constants";

import {
  GPTDocxsArgs,
  Format,
  Response,
  GPTDocxArgsOptions,
  DocxTableArgs, // eslint-disable-next-line import/no-unresolved
} from "@models";

/**
 * @description
 * Class GPTDocx creates word documents with OpenAI by **prompt** and returns the file path.
 * ```javascript
 * const filePath = await new GPTDocx({
    format: BASIC,
    prompt: "Write  Paper on coffee.",
   }).createFile();
  console.log(filePath);
 * 
 * ```
 * @async
 * @param {*} format **Required**  A static constant which is the name of a service or a **Format**.
 * @param {String} prompt **Required** message sent to OpenAI to build the document context.
 * @param {Object} options **Optional** used to apply additional configuration word document.
 */
class GPTDocx {
  /**
   * An object that provides **ChatGPT** with context of the document and how the document will be built.
   */
  private requestFormat: Format;

  /**
   * The response received from **ChatGPT Object**.
   */
  private response: Response | undefined;

  /**
   * The name of the service used in the request.
   */
  private name = "";

  /**
   * The prompt sent to OpenAI for context.
   */
  private prompt = "";

  /**
   * The key of the OpenAI API Key. Defaults to OPENAI_API_KEY.
   */
  private apiKeyEnv: string;

  /**
   * Container for document components. Docx usage only.
   */
  private children: any[] = [];

  /**
   * A configuration object for the docuemnt. Docx usage only.
   */
  private options: GPTDocxArgsOptions | null;

  /**
   * A string that represents the service that will build the document. Either **templater** or **docx**.
   */
  private service = "";

  /**
   * A placeholder key for an array. Handle the array of strings issue.
   */
  private tempKey: string = "";

  /**
   * An object used to add styles to each key. Docx usgae only.
   */
  private styles: any = {};

  /**
   *
   * @param format **Required** a format that represents the structure of the docuemnt.
   * @param prompt **Required** a string that represents the request message to send to OpenAI.
   * @param options **Optional** an object used to enable additonal features to the for GPTDocx.
   * @returns GPTDocx instance
   */
  constructor({ format, prompt, options }: GPTDocxsArgs) {
    this.apiKeyEnv = options?.apiKeyEnv || "";
    this.prompt = this._isValidPrompt(prompt);
    this.options = options || null;
    this.requestFormat = this._parseFormat(format);
    return this;
  }

  /**
   * @description
   * Checks if the prompt is a valid prompt. If not throws
   * Invalid Prompt Error.
   *
   * @private
   * @param {String} prompt Required constructor parameter
   * @returns {String} prompt
   */
  private _isValidPrompt(prompt: string): string {
    const validPrompt = typeof prompt === Static.string && prompt.trim() !== "";
    if (!validPrompt) throw new Error("Error: INVALID_PROMPT");

    return prompt;
  }

  /**
   * @description
   * Determines and returns the format and determines the service: Templater or Docx.
   * If the format is a object the Docx is used, else it uses the Templater.
   *
   * @private
   * @param {String} format to be used in the request
   */
  private _parseFormat(format: string | Format): Format {
    let requestedFormat: Format;
    if (typeof format === Static.string) {
      requestedFormat = this._getFormat(format.toString());
      this.service = Static.templater;
    } else {
      requestedFormat = format as Format;
      this.service = Static.docx;
    }
    return this._prepareFormat(requestedFormat);
  }

  /**
   * @description
   * Imports the format to be used in the request. **Templater Only**
   *
   *
   * @param {String} format name of the service to use in the request
   * @private
   * @returns {Object} an object with requestFormat and optional styles.
   */
  private _getFormat(format: string): Format {
    let requestedService: any;
    try {
      if (
        process.env["NODE_ENV"] === "development" ||
        process.env["NODE_ENV"] === "test"
      ) {
        requestedService = require(
          join(__dirname, Static.FORMATS_DIR, format, Static.INDEX_TS),
        );
      } else {
        requestedService = require(
          join(__dirname, Static.FORMATS_DIR, format, Static.INDEX_JS),
        );
      }
    } catch (error) {
      console.error(`Unable to find format: ${format}`);
    }

    return requestedService?.format;
  }

  /**
   * @description
   * Validates the format and retuns the format.
   *
   * Throws error if format is invalid.
   *
   * @private
   */
  private _prepareFormat(requestedFormat: Format): Format {
    if (this._isValid(requestedFormat)) {
      this.name = requestedFormat.sys.name;
      this.styles = requestedFormat.styles ? requestedFormat.styles : {};
      return requestedFormat;
    } else {
      throw new Error("Service is not valid. PARSE_SERVICE_REQUEST_ERROR");
    }
  }

  /**
   * @description
   * Checks to see if **format** has required properties.
   *
   * @private
   * @returns {Boolean} True if service is valid. False if service is invalid.
   */
  private _isValid(format: Format): boolean {
    return format && format.sys.name && format.sys.values && format.sys.format
      ? true
      : false;
  }

  /**
   * @description
   * Builds each page from ```this.response``` and
   * calls docx to create the document. **Docx Only**.
   *
   * @async
   * @private
   * @returns {Promise<string>} Filename of the document that was created.
   */
  async _buildPages(): Promise<string> {
    this._parse(this.response);
    console.log("Creating Document...");
    return this._useDocx(); // async
  }

  /**
   * @description
   * Parses ```this.response``` and builds the document components. **Docx Only**.
   *
   * @private
   * @param {Object} page the response value from ```this.response```.
   */
  private _parse(page: any) {
    for (const key in page) {
      if (Object.hasOwn(page, key)) {
        const value: any = page[key];
        if (this._isMapped(key)) {
          this._switchByMappedKey(key, value);
        } else {
          this._switchByType(key, value);
        }
      }
    }
  }

  /**
   * @description
   * Uses **key** and maps the **value** to it's
   * correct wrapper.
   *
   * @private
   * @param {String} key from the **response**.
   * @param {*} value from the **response**.
   */
  private _switchByMappedKey(key: string, value: any) {
    switch (key) {
      case Static.links:
        this._caseLinks(value);
        break;
      case Static.table:
        this._caseTable(value);
        break;
      case Static.image:
        this._caseImage(value);
        break;
    }
  }

  /**
   * @description
   * Gets the type from the **value** and maps it to
   * the correct use case.
   *
   * @private
   * @param {String} key from the **response**.
   * @param {*} value from the **response**.
   */
  private _switchByType(key: string, value: any) {
    const type = this._getValueType(value);
    switch (type) {
      case Static.array:
        this._handleArrayCase(key, value);
        break;
      case Static.object:
        this._parse(value);
        break;
      case Static.string:
      case Static.number:
        this._caseText(key, value);
        break;
    }
  }

  /**
   * @description
   * Determines the type from **value** and returns it.
   *
   * @private
   * @param {*} value **object | array | string | number**
   * @returns {String} the primitive type of the value.
   */
  private _getValueType(value: any): any {
    if (value === undefined || value === null) {
      throw new Error("Cannot Parse Type. Error Code: PARSE_VALUE_TYPE");
    }
    return Array.isArray(value) ? Static.array : typeof value;
  }

  /**
   * @description
   * Used when a value's types is broken down to a string.
   * Takes  **_key, text** and builds a **new Paragraph**.
   * Styles the paragraph with ```this.styles```.
   *
   * @private
   * @param {String} _key from the **response**.
   * @param {String} text from the **response**.
   */
  private _caseText(_key: string, text: string) {
    const key = this._getValidKey(_key);
    this.children.push(
      new Paragraph({
        ...this.styles[key]?.paragraph,
        children: [
          new TextRun({
            ...this.styles[key]?.text,
            text: text.toString(),
          }),
        ],
      }),
    );
  }

  /**
   * @description
   * Sets the correct **key** to be used
   * by ```this.styles```.
   *
   * @private
   * @param {String} key from the **response**.
   * @returns {String} The valid key.
   */
  private _getValidKey(key: string): string {
    return this.styles[key] ? key : this.tempKey;
  }

  /**
   * @description
   * Stores the **key** of the array that will
   * be parsed and saves it as a temp key.
   *
   * @private
   * @param {String} key from the **response**.
   * @param {Array} value from the **response**.
   */
  private _handleArrayCase(key: string, value: any) {
    if (this.styles[key]) {
      this.tempKey = key;
    }
    this._parse(value);
  }

  /**
   * @description
   * Handle use case when a in a format key is **links** .
   * Takes the **links** and applies the correct
   * wrapper class. Adds each link to the page's
   * container```this.children```. **Docx Only**.
   *
   * @private
   * @param {Array} links A format property with key **links**.
   */
  private _caseLinks(links: any[]) {
    links.forEach(({ text, link }) => {
      this.children.push(
        new Paragraph({
          children: [
            new ExternalHyperlink({
              link,
              children: [
                new TextRun({
                  text,
                  style: Static.HYPERLINK,
                }),
              ],
            }),
          ],
        }),
      );
    });
  }

  /**
   * @description
   * Adds a new Image to the document.
   *
   * @param {Buffer} data - ImageBuffer i.e
   * .jpg, .png, .svg, .gif, .bmp, data:image/png
   */
  private _caseImage(data: any) {
    this.children.push(
      new DocxImage({
        data,
        styles: this.styles.image,
      }),
    );
  }

  /**
   * @description Adds a new table to the document with table headers
   * and data.
   * @param {object} config - The headers and data for the table.
   */
  private _caseTable({ headers, data }: DocxTableArgs) {
    this.children.push(
      new DocxTable({
        headers,
        data,
      }),
    );
  }

  /**
   * @description
   * Checks to see if the **key** is a mapped key.
   *
   * @private
   * @param {String} key from the **response**.
   * @returns {Boolean} True if the key is a mappedKey otherwise false.
   */
  private _isMapped(key: string): boolean {
    return [Static.links, Static.table, Static.image].includes(key);
  }

  /**
   * @description
   * Sends request to OpenAI for a context. Uses ```this.response```
   * to build the document.
   *
   * @async
   * @returns {Promise<string>} Filename of the document.
   */
  async createFile(): Promise<string> {
    this.response = await new ChatGPT({
      prompt: this.prompt,
      format: this.requestFormat,
      apiKeyEnv: this.apiKeyEnv,
    }).send();
    console.debug("Building Pages...");
    if (this.service === Static.templater) {
      return this._useTemplater();
    } else {
      return this._buildPages();
    }
  }

  /**
   * @description
   * Create a new document with the **Templater engine**.
   * @returns file path of the new document.
   */
  private _useTemplater() {
    return new DocxTemplater({
      docName: this.name,
      service: this.name,
      response: this.response,
      useAngularParser: this.options?.useAngularParser,
    }).create();
  }

  /**
   * @description
   * Creates a new docuemnt with the **Docx** engine.
   *
   * @returns file path of the docuemnt.
   */
  private async _useDocx() {
    const wordDocument = new WordDocument({
      docName: this.name,
      pages: this.children,
      options: this.options?.documentConfig,
    });
    const filename = await wordDocument.saveFile();

    return filename;
  }
} // End of Class

export default GPTDocx;
