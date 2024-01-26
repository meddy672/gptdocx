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
 */
class ChatGPT {
    private openai: OpenAI;
    private prompt = "";
    private requestBody: ChatCompletionCreateParams;

  constructor({prompt, format, model, config}: ChatGPTArgs) {
    this.openai = new OpenAI({ apiKey: process.env["OPENAI_API_KEY"], ...config });
    this.prompt = prompt;
    this.requestBody = this._buildRequestBody({
      format,
      model,
    });
    return this;
  }


  
  /**
   * 
   * @param {*} param0 
   * @returns 
   */
  private _buildRequestBody({format, model}: RequestBodyParams): ChatCompletionCreateParams {
    const message = this._prepareMessages(format);
    return { 
      model:  model || Static.MODEL,
      messages: message, 
      response_format: { "type": "json_object" }
    };
  }



  /**
   * 
   * @param {*} format 
   * @returns 
   */
  private _prepareMessages(format: Format): Message[] {
    const systemFormat = this._getFormat(format);
    return [
      { role: Static.SYSTEM as Role, content: systemFormat},
      { role: Static.USER as Role, content: this.prompt+'. Use json as the response format.' },
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
    let systemFormat;
    if (format && typeof format === Static.object) {
      const stringifiedFormat = JSON.stringify(format);
      systemFormat = Static.SYSTEM_FORMAT + stringifiedFormat;
    } else {
      systemFormat = Static.DEFAULT_MESSAGE;
    }
    return systemFormat;
  }
} // End of Class

export default ChatGPT;