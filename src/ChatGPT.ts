import 'dotenv/config'
import OpenAI from 'openai';
import Static from "./static/constants";

import {
  ChatGPTArgs,
  RequestBodyParams,
  ChatCompletionCreateParams,
  Message,
  Role,
  Format,
  ChatCompletionResponse, // eslint-disable-next-line import/no-unresolved
} from "@models";


/**
 * @description
 * Class ChatGPT uses the format and prompt to build the document context.
 * [See OpenAI](https://platform.openai.com/docs/overview).
 * ```javascript
 *  const response = await new ChatGPT({
      prompt: "Write a paragraph.",
      format: SIMPLE,
    }).send();
 * ```
 * @async
 * Class ChatGPT
 */
class ChatGPT {
    /**
     * The openai object to handle request.
    */
    private openai: OpenAI;
    /**
     * The prompt to sent to OpenAI
    */
    private prompt = "";
    /**
     * The request body sent to OpenAI
    */
    private requestBody: ChatCompletionCreateParams;

    /**
     * 
     * @param prompt **Required** a string that represents the prompt.
     * @param format **Required** sent to OpenAI to provide context to the prompt.
     * @param apiKeyEnv: **Optional** a string used to represent the **apikey** used in the request. Defaults to OPENAI_API_KEY.
     * @param config **Optional** an object to apply additonal settings to openai. 
     * @returns 
     */
  constructor({prompt, format, apiKeyEnv,  config}: ChatGPTArgs) {
    const apiKey = process.env[apiKeyEnv] || process.env["OPENAI_API_KEY"];
    this.openai = new OpenAI({ apiKey, ...config });
    this.prompt = prompt;
    this.requestBody = this._buildRequestBody({
      format,
    });
    return this;
  }


  
  /**
   * @description
   * Takes format and builds the openai request body for the request.
   * 
   * @param {Format} format - format used for context. 
   * @returns ChatCompletionCreateParams
   */
  private _buildRequestBody({format}: RequestBodyParams): ChatCompletionCreateParams {
    const message = this._prepareMessages(format);
    return { 
      model: Static.MODEL,
      messages: message, 
      response_format: { "type": "json_object" }
    };
  }



  /**
   * @description
   * Takes format and prepares it to be used by the system.
   * 
   * @param {Format} format 
   * @returns OpenAI Message
   */
  private _prepareMessages(format: Format): Message[] {
    const systemFormat = this._getFormat(format);
    return [
      { role: Static.SYSTEM as Role, content: systemFormat },
      { role: Static.USER as Role, content: this.prompt },
    ];
  }



  /**
   * @description
   * Sends the OpenAI message for context. Gets the response
   * and returns it as a json object.
   * 
   * @returns {Response} response
   */
  async send(): Promise<Response> {
    try {
      console.debug("Sending resquest...");
      const response: ChatCompletionResponse  = await this.openai.chat.completions.create(this.requestBody);
      const content = response.choices[0].message.content as string;
      return JSON.parse(content);
    } catch (err) {
      console.error("Unable to complete Open A.I request: ", err);
      throw new Error("Error: OPENAI_REQUEST_ERROR");
    }
  }


  /**
   * @description
   * Seriealizes the format to be used by the system.
   * 
   * @param {object} format 
   * @returns {String} format as a string
   */
  private _getFormat(format: Format): string {
    return JSON.stringify(format);;
  }
} // End of Class

export default ChatGPT;

