require('dotenv').config();
import {
  Paragraph,
  TextRun,
  ExternalHyperlink,
} from "docx";
import { writeFile } from "fs/promises";
import { join } from "path";
import Table from "./Table";
import Image from "./Image";
import  WordDocument  from "./Document";
import ChatGPT from "./ChatGPT";
import Mock from './Mock/Mock';
import Static from "./static/constants";

type GPTDocxsArgs = {
    service: string | Service;
    prompt: string;
    saveSchema?: boolean;
    documentConfig?: any;
}

type RequestFormat = {
  pages: []
}

type Service = {
    name: string;
    requestFormat: RequestFormat,
    styles: {}
}

type TableArgs = {
    table_headers: any[],
    data: any[]
}

/**
 * @description
 *
 * @param {*} service  A **string** which is a name of a service or a **Service** object.
 * @param {String} prompt that is sent to OpenAI to build the document context. Required
 * @param {Boolean} saveSchema used to save a json file of the request and response objects. Optional.
 * @param {Object} documentConfig used to apply additional configuration word document. Optional.
 */
class GPTDocx {
    /**The request format for each page. Sent to OpenAI with ```this.prompt``` for context.*/
    private requestFormat: RequestFormat | undefined;

    /**The response received from ```ChatGPT Object```*/
    private response: any;

    /** Contains the service object. Initializes ```this.requestFormat``` and ```this.styles```. See parse format.*/
    private service: Service;

    /**The name of the service used in the request. ```this.name = this.service.name```*/
    private name: string | undefined;

    /**The styles for each format in ```this.requestFormat.pages``` */
    private styles: any = {};

    /**A container to hold the context for each page```this.response.pages.forEach((page))```.*/
    private children: any[] = [];

    /**A container for each page ```this.response.pages```.*/
    private pages: any[] = [];

    /**A toogle flag to save the schema.*/
    private saveSchema: boolean;

    /**Used to handle array cases.```this._handleArrayCases(key)```*/
    private tempKey = "";

    /**The prompt sent to OpenAI for context. ```await new ChatGPT({prompt: this.prompt})```*/
    private prompt: string;

  constructor({ service, prompt, saveSchema, documentConfig }: GPTDocxsArgs) {
    this.saveSchema = saveSchema || false;  
    this.prompt = this._isValidPrompt(prompt);
    this.service = this._parseService(service)
    this._prepareService();
    return this;
  }




  /**
   * @description
   * Determines and returns the service to be used.
   * 
   * @private
   * @param {String} service of a service to be used in the request
   */
  _parseService(service: string | Service): Service {
    if (typeof service === Static.string) {
      return this._getService(service.toString());
    } else {
      return service as Service;
    }
  }




  /**
   * @description
   * Imports the service object to be used in the request. 
   * See ```this.service```.
   * 
   * @param {String} service name of the service to use in the request
   * @private
   * @returns {Object} an object with requestFormnat and styles.
   */
  _getService(service: string): Service {
    console.log("Selected Service: ", service);
     // Consider exporting all available services as an object
    let requestedService
    if (process.env["NODE_ENV"] === "development") {
      requestedService = require(
        join(__dirname, Static.DOCX_DIR, service, Static.INDEX_TS)
      );
    } else {
      requestedService = require(
        join(__dirname, Static.DOCX_DIR, service, Static.INDEX_JS)
      );
    }
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
      this.name = this.service.name;
      this.requestFormat = this.service.requestFormat;
      this.styles = this.service.styles; // should we apply a defualt style if styles is not defined
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
  _isValidService(): Boolean{
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
  async createFile(): Promise<string> {
    if (process.env["MOCK_OPENAI_RESPONSE"] === Static.true) {
      this.response =  Mock.request('word').send();
      return this._buildPages();
    }
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
  _isValidPrompt(prompt: string): string {
      console.debug("_isValidPrompt()", prompt);
      const validPrompt = typeof prompt === Static.string && prompt.trim() !== "";
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
  async _buildPages(): Promise<string> {
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
      case Static.links:
        this._caseLinks(value);
        break;
      case Static.table:
        this._caseTable(value);
        break;
      case Static.image:
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
      case Static.array:
        this._handleArrayCase(key, value);
        break;
      case Static.object:
        this._parse(value);
        break;
      case Static.string:
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
  _getValueType(value: any): any {
    return Array.isArray(value) ? Static.array : typeof value;
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
  _getValidKey(key: string): string {
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
                  style: Static.HYPERLINK,
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
   * @description Adds a new table to the document with table headers
   * and data
   * @param {object} table_headers - The header for each column
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
  _isMapped(key: string): Boolean {
    return [Static.links, Static.table, Static.image].includes(key);
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
  async _create(): Promise<string> {
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
      const schema = join(__dirname, Static.DOCX_DIR, this.name!, Static.SCHEMA_JSON);
      await writeFile(schema, JSON.stringify(ChatGPTDocx));
    } catch (error) {
      console.log(error);
    }
  }
} // End of Class


export default GPTDocx;
