import 'dotenv/config'
import { join } from "path";
import ChatGPT from "./ChatGPT";
import DocxTemplater from './DocxTemplater';
import Static from "./static/constants";

import {
  GPTDocxsArgs,
  RequestFormat,
  Format,
  Response, // eslint-disable-next-line import/no-unresolved
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

    /** Contains the service object. Initializes ```this.requestFormat``` and ```this.styles```. See parse format.*/
    private service: Format;

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



  /**
   * 
   * @param format a string that represents how the document is created.
   * @param prompt a string that represents the request message to send to OPenAI
   * @param apiKeyEnv a string that be used as the API Key ENV i.e process.env[apiKeyEnv]
   * @returns GPTDocx
   */  
  constructor({ format, prompt, apiKeyEnv }: GPTDocxsArgs) {
    this.apiKeyEnv = apiKeyEnv || "";
    this.prompt = this._isValidPrompt(prompt);
    this.service = this._parseService(format)
    this._prepareService();
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
  private _parseService(service: string | Format): Format {
      return this._getFormat(service.toString());
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
  private _prepareService(): void {
    if (this._isValidService()) {
      this.name = this.service.name;
      this.requestFormat = this.service.requestFormat;
    } else{
      throw new Error("Service is not valid. PARSE_SERVICE_REQUEST_ERROR");
    }
  }

  /**
   * @description
   * Checks to see if ```this.service``` meets a valid service.
   * 
   * @private
   * @returns {Boolean} True if service is valid. False if service is invalid.
   */
  private _isValidService(): boolean{
    return this.service && this.service.name && this.service.requestFormat ? true : false;
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
          this.children.push("response from mapper")
          this._parse(page)
      }
    }
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
      response: this.response
    }).create();
  }

} // End of Class


export default GPTDocx;
