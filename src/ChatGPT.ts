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
 * @async
 * Class ChatGPT
 */
class ChatGPT {
    private openai: OpenAI;
    private prompt = "";
    private requestBody: ChatCompletionCreateParams;

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
   * 
   * @param {*} param0 
   * @returns 
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
   * 
   * @param {Format} format 
   * @returns 
   */
  private _prepareMessages(format: Format): Message[] {
    const systemFormat = this._getFormat(format);
    return [
      { role: Static.SYSTEM as Role, content: systemFormat },
      { role: Static.USER as Role, content: this.prompt },
    ];
  }



  /**
   * 
   * @returns 
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
   * 
   * @param {object} format 
   * @returns {String} requestFormat as a string appended to the system format
   */
  private _getFormat(format: Format): string {
    console.debug("format()");
    return JSON.stringify(format);;
  }
} // End of Class

export default ChatGPT;

