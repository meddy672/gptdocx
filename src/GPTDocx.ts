import 'dotenv/config'
import { join } from "path";
import ChatGPT from "./ChatGPT";
import DocxTemplater from './DocxTemplater';
import Static from "./static/constants";

import {
  GPTDocxsArgs,
  RequestFormat,
  Service,
  Format,
  Response,
  GPTDocxArgsOptions, // eslint-disable-next-line import/no-unresolved
} from "@models";


/**
 * @description
 * @async
 * @param {*} format  A **string** which is a name of a service or a **Service** object.
 * @param {String} prompt that is sent to OpenAI to build the document context. Required
 * @param {Boolean} saveSchema used to save a json file of the request and response objects. Optional.
 * @param {Object} documentConfig used to apply additional configuration word document. Optional.
 */
class GPTDocx {
    /**The request format for each page. Sent to OpenAI with ```this.prompt``` for context.*/
    private requestFormat: RequestFormat | undefined;

    /**The response received from ```ChatGPT Object```*/
    private response: Response | undefined;

    /**The name of the service used in the request. ```this.name = this.service.name```*/
    private name = "";

    /**The prompt sent to OpenAI for context. ```await new ChatGPT({prompt: this.prompt})```*/
    private prompt = "";

    /**  */
    private apiKeyEnv: string;

    /** */
    private pages: any[] = [];

    /** */
    private children: any[] = [];

    private options: GPTDocxArgsOptions | undefined;



  /**
   * 
   * @param format a string that represents how the document is created.
   * @param prompt a string that represents the request message to send to OPenAI
   * @param apiKeyEnv a string that be used as the API Key ENV i.e process.env[apiKeyEnv]
   * @returns GPTDocx
   */  
  constructor({ format, prompt, options }: GPTDocxsArgs) {
    this.apiKeyEnv = options?.apiKeyEnv || "";
    this.prompt = this._isValidPrompt(prompt);
    this.options = options;
    this._parseService(format);
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
      console.debug("_isValidPrompt()", prompt);
      const validPrompt = typeof prompt === Static.string && prompt.trim() !== "";
      if (!validPrompt) throw new Error("Error: INVALID_PROMPT");
  
      return prompt;
  }

  /**
   * @description
   * Determines and returns the service to be used.
   * 
   * @private
   * @param {String} service of a service to be used in the request
   */
  private _parseService(service: string | Format): void {
    let requestedService: Service;
    if (typeof service === Static.string) {
      requestedService = this._getFormat(service.toString());
    } else {
      requestedService = service as Service;
    }
    this._prepareService(requestedService);
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
  private _getFormat(service: string): Format {
    let requestedService: any;
    try {
      if (process.env["NODE_ENV"] === "development" || process.env["NODE_ENV"] === "test") {
        requestedService = require(
          join(__dirname, Static.FORMATS_DIR, service, Static.INDEX_TS)
        );
      } else {
        requestedService = require(
          join(__dirname, Static.FORMATS_DIR, service, Static.INDEX_JS)
        );
      }  
    } catch(error){
      console.error(`Unable to find service: ${service}`)
    }
    
    return requestedService?.format;
  }

  /**
   * @description
   * Validates the service and initializes properties: 
   * ```this.name```, ```this.requestFormat``` and ```this.styles```. 
   * Throws error if ```this.service``` is invalid.
   * 
   * @private
   */
  private _prepareService(requestedService: Service): void {
    if (this._isValid(requestedService)) {
      this.name = requestedService.name;
      this.requestFormat = requestedService.requestFormat;
    } else{
      throw new Error("Service is not valid. PARSE_SERVICE_REQUEST_ERROR");
    }
  }

  /**
   * @description
   * Checks to see if ```service``` has required properties.
   * 
   * @private
   * @returns {Boolean} True if service is valid. False if service is invalid.
   */
  private _isValid(service: Service): boolean{
    return service && service.name && service.requestFormat ? true : false;
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
  private async _buildPages(): Promise<string> { // called when response from chatgpt
    this.response?.pages.forEach( (page: object) => {
      this._parse(page);
      this.pages.push(this.children);
      this.children = []; // fix this to use map
    });
    console.log("Creating Document...")
    return this._create(); // async
  }

  private async _create() {
    return "filename";
  } 

  /**
   * @description
   * Gets the page ```value``` and maps it to its use case.
   * 
   * @private
   * @param {Object} page 
   */
  private _parse(page: any) {
    for (const key in page) {
      if (Object.hasOwn(page, key)) {
        const value:any = page[key] as string;
          // call the responseMapper Object
          this.children.push("response from mapper");
          this._parse(page)
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
   * @param {*} value 
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
  private _getValueType(value: any): any {
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
  private _caseText(_key: string, text: string) {
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
  private _getValidKey(key: string): string {
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
  private _caseLinks(links: []) {
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
  private _caseImage(content: any) {
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
  private _caseTable({headers, data}: TableArgs) {
    this.children.push(
      Table({
        headers,
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
  private _isMapped(key: string): Boolean {
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
  private _handleArrayCase(key: string, value: []) {
    if (this.styles[key]) {
      this.tempKey = key;
    }
    this._parse(value);
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
    this.response = await new ChatGPT({
      prompt: this.prompt,
      format: this.requestFormat,
      apiKeyEnv: this.apiKeyEnv
    }).send();
    console.debug("Building Pages...");
    return new DocxTemplater({
      docName: this.response.title || this.name,
      service: this.name,
      response: this.response,
      useAngularParser
    }).create();
  }

} // End of Class


export default GPTDocx;
