require('dotenv').config();
const {
LINKS,
TABLE,
IMAGE,
STRING,
ARRAY,
OBJECT,
INDEX_JS,
DOCX_DIR,
SCHEMA_JSON,
HYPERLINK
} = require('./static/constants');
const {
  Paragraph,
  TextRun,
  ExternalHyperlink,
} = require("docx");
import { writeFile } from "fs/promises";
import { join } from "path";
import Table from "./Table";
import Image from "./Image";
import  WordDocument  from "./Document";
import ChatGPT from "./ChatGPT";

type GPTDocxsArgs = {
    name: string;
    prompt: string;
    customFormat: Service;
    saveSchema: boolean;
    documentConfig: any;
}

type Service = {
    name: string;
    requestFormat: {
        pages: []
    },
    styles: {}
}

type TableArgs = {
    table_headers: any[],
    data: any[]
}

/**
 * @description
 *
 * @param {String} name  a name of a prebuilt service that can be used to build the requestFormat and apply styles. Optional
 * @param {String} prompt that is sent to OpenAI to build the document context. Required
 * @param {Object} customFormat  used to build the requestFormat and styles if no service name is provided. Optional.
 * @param {Boolean} saveSchema used to save a json file of the request and response objects. Optional.
 * @param {Object} documentConfig used to apply additional configuration word document. Optional.
 */
class GPTDocx {
    private requestFormat: {} | null | undefined;
    private response: any | null;
    private service: Service | null;
    private name: string | null | undefined;
    private styles: any | null | undefined;
    private children: any[];
    private pages: any[];
    private saveSchema: boolean;
    private tempKey: string;
    private prompt: string;
  constructor({ name, prompt, customFormat, saveSchema, documentConfig }: GPTDocxsArgs) {

    /**The request format for each page. Sent to OpenAI with ```this.prompt``` for context.*/
    this.requestFormat = null;

    /**The response received from ```ChatGPT Object```*/
    this.response = null;

    /** Contains the service object. Initializes ```this.requestFormat``` and ```this.styles```. See parse format.*/
    this.service = null;

    /**The name of the service used in the request. ```this.name = this.service.name```*/
    this.name = null;

    /**The styles for each format in ```this.requestFormat.pages``` */
    this.styles = {};

    /**A container to hold the context for each page```this.response.pages.forEach((page))```.*/
    this.children = [];

    /**A container for each page ```this.response.pages```.*/
    this.pages = [];

    /**A toogle flag to save the schema.*/
    this.saveSchema = saveSchema || false;

    /**Used to handle array cases.```this._handleArrayCases(key)```*/
    this.tempKey = "";

    /**The prompt sent to OpenAI for context. ```await new ChatGPT({prompt: this.prompt})```*/
    this.prompt = this._isValidPrompt(prompt);

    this._parseService(name, customFormat);

    return this;
  }




  /**
   * @description
   * Determines and prepares the service.
   * 
   * @private
   * @param {String} name of a service to be used in the request
   * @param {Object} customFormat an object with a requestFormat and optional styles to be used in the request.
   */
  _parseService(name: string, customFormat: Service) {
    if (name) {
      this.service = this._getService(name);
    } else {
      this.service = customFormat;
    }
    this._prepareService();
  }




  /**
   * @description
   * Imports the service object to be used in the request. 
   * See ```this.service```.
   * 
   * @param {String} name of the service to use in the request
   * @private
   * @returns {Object} an object with requestFormnat and styles.
   */
  _getService(name: string) {
    console.log("Selected Service: ", name);
     // Consider exporting all available services as an object
    const requestedService = require(
      join(__dirname, DOCX_DIR, name, INDEX_JS)
    );
    console.log("Requested Service: ", requestedService);
    return requestedService;
  }




  /**
   * @description
   * Validates the service and initializes properties: 
   * ```this.name```, ```this.requestFormat``` and ```this.styles```. 
   * Throws error if ```this.service``` is invalid.
   * 
   * @private
   */
  _prepareService(){
    if (this._isValidService()) {
      this.name = this.service?.name;
      this.requestFormat = this.service?.requestFormat;
      this.styles = this.service?.styles; // should we apply a defualt style if styles is not defined
    } else{
      throw new Error(`Service is not valid. ${"PARSE_SERVICE_REQUEST_ERROR"}`);
    }
  }




  /**
   * @description
   * Checks to see if ```this.service``` meets a valid service.
   * 
   * @private
   * @returns {Boolean} True if service is valid. False if service is invalid.
   */
  _isValidService(){
    return this.service && this.service.name && this.service.requestFormat?.pages ? true : false;
  }




  /**
   * @description
   * Sends request to OpenAI for a context. Uses ```this.response```
   * to build each page.
   * 
   * @async
   * @returns {Promise<string>} Filename of the document.
   */
  async createFile() {
    this.response = await new ChatGPT({
      prompt: this.prompt,
      format: this.requestFormat,
      responseFormat: "json", // default
    }).send();
    console.log("Building Pages...");
    return this._buildPages();
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
  _isValidPrompt(prompt: string) {
      console.debug("_isValidPrompt()", prompt);
      const validPrompt = typeof prompt === STRING && prompt.trim() !== "";
      if (!validPrompt) throw new Error("Invalid Prompt!");
  
      return prompt;
  }




  /**
   * @description
   * Builds each page from ```this.response``` and 
   * creates a new docuemnt.
   * 
   * @async
   * @private
   * @returns {Promise<string>} Filename of the document that was created.
   */
  async _buildPages() {
    this.response.pages.forEach( (page: object) => {
      this._parse(page);
      this.pages.push(this.children);
      this.children = []; // fix this to use map
    });
    console.log("Creating Document...")
    return this._create(); // async
  }




  /**
   * @description
   * Gets the page ```value``` and maps it to its use case.
   * 
   * @private
   * @param {Object} page 
   */
  _parse(page: any) {
    for (const key in page) {
      if (page.hasOwnProperty(key)) {
        const value:any = page[key] as string;
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
   * Uses ```key``` and maps the ```value``` to it's
   * correct wrapper.
   * 
   * @private
   * @param {String} key 
   * @param {*} value 
   */
  _switchByMappedKey(key: string, value: any) {
    switch (key) {
      case LINKS:
        this._caseLinks(value);
        break;
      case TABLE:
        this._caseTable(value);
        break;
      case IMAGE:
        this._caseImage(value);
        break;
      default:
        throw new Error(`Cannot Parse Key: ${key} Error Code: PARSE_KEY_ERROR`);
    }
  }




  /**
   * @description
   * Gets the type from the ```value``` and maps it to 
   * the correct use case.
   * 
   * @private
   * @param {String} key 
   * @param {String | Object} value 
   */
  _switchByType(key: string, value: any) {
    const type = this._getValueType(value);
    switch (type) {
      case ARRAY:
        this._handleArrayCase(key, value);
        break;
      case OBJECT:
        this._parse(value);
        break;
      case STRING:
        this._caseText(key, value);
        break;
      default:
        throw new Error("Cannot Parse Type. Error Code: PARSE_VALUE_TYPE");
    }
  }




  /**
   * @description
   * Determines the type from ```value``` and returns it.
   * 
   * @private
   * @param {*} value 
   * @returns {String} the primitive type of the value.
   */
  _getValueType(value: any) {
    return Array.isArray(value) ? ARRAY : typeof value;
  }




  /**
   * @description
   * Used when a value's types is broken down to a string. 
   * Takes  ```_key, text``` and builds a ```new Paragraph```.
   * Styles the paragraph with ```this.styles```. 
   * 
   * @private
   * @param {String} _key 
   * @param {String} text 
   */
  _caseText(_key: string, text: string) {
    const key = this._getValidKey(_key);
    this.children.push(
      new Paragraph({
        ...this.styles[key]?.paragraph,
        children: [
          new TextRun({
            ...this.styles[key]?.text,
            text,
          }),
        ],
      })
    );
  }


  

  /**
   * @description
   * Sets the correct ```key``` to be used 
   * by ```this.styles```.
   * 
   * @private
   * @param {String} key 
   * @returns {String} The valid key.
   */
  _getValidKey(key: string) {
    return this.styles[key] ? key : this.tempKey;
  }




  /**
   * @description
   * Handle use case when a key is ```links```. 
   * Takes the ```links``` and applies the correct 
   * wrapper class. Adds each ```link``` to the page's 
   * container```this.children```.
   * 
   * @private
   * @param {Array} links 
   */
  _caseLinks(links: []) {
    links.forEach(({ text, link }) => {
      this.children.push(
        new Paragraph({
          children: [
            new ExternalHyperlink({
              link,
              children: [
                new TextRun({
                  text,
                  style: HYPERLINK,
                }),
              ],
            }),
          ],
        })
      );
    });
  }




  /**
   * @description
   * Adds a new Image to the document.
   * 
   * @param {Buffer} content - ImageBuffer i.e 
   * .jpg, .png, .svg, .gif, .bmp, data:image/png
   */
  _caseImage(content: any) {
    this.children.push(
      new Image({
        content,
        ...this.styles.image
      })
    );
  }




  /**
   * @description
   * Adds a new table to the document with table headers
   * and data
   * 
   * @param {Array<string>} table_headers - The header for each column
   * @param {Array<string>} data - The data to be add to the table
   */
  _caseTable({table_headers, data}: TableArgs) {
    this.children.push(
      Table({
        table_headers,
        data
      })
    )
  }



  /**
   * @description
   * Checks to see if the ```key``` is a mapped key.
   * 
   * @private
   * @param {String} key 
   * @returns {Boolean} True if the key is a mappedKey otherwise false.
   */
  _isMapped(key: string) {
    return [LINKS, TABLE, IMAGE].includes(key);
  }



  /**
   * @description
   * Stores the ```key``` of the array that will 
   * be parsed and saves it as a temp key.
   * 
   * @private
   * @param {String} key 
   * @param {Array} value 
   */
  _handleArrayCase(key: string, value: []) {
    if (this.styles[key]) {
      this.tempKey = key;
    }
    this._parse(value);
  }



  /**
   * @description
   * Creates a new word document with the pages and page components.
   * Checks ```this.saveSchema``` to determine if a schema is to be saved.
   * Returns the name of the new file.
   * 
   * @private
   * @async
   * @returns {Promise<string>} filename that is created by the Document Object
   */
  async _create() {
    const wordDocument = new WordDocument({
      name: this.response.pages[0].title,
      pages: this.pages,
    });
    const filename = await wordDocument.saveFile();
    if (this.saveSchema) {
      await this._createSchema(filename);
    }
    return filename;
  }

  

  /**
   * @description
   * Creates a ChatGPTDocx.json file.
   * 
   * @async
   * @private
   * @param {String} filename the name of the document that was created.
   */
  async _createSchema(filename: string) {
    console.log("Filename: ", filename);
    try {
      const ChatGPTDocx = {
        requestFormat: this.requestFormat,
        styles: this.styles,
        response: this.response,
        prompt: this.prompt,
        filename,
      };
      const schema = join(__dirname, DOCX_DIR, this.name!, SCHEMA_JSON);
      await writeFile(schema, JSON.stringify(ChatGPTDocx));
    } catch (error) {
      console.log(error);
    }
  }
} // End of Class


module.exports = GPTDocx;
