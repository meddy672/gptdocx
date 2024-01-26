require('dotenv').config();
import OpenAI from 'openai';
import Static from "./static/constants";
import { ChatGPTArgs, RequestBodyParams } from '@types';

/**
 * @async
 */
class ChatGPT {
    private openai: any;
    private response: any;
    private prompt = "";
    private requestBody: any;

  constructor({prompt, format, model, max_tokens, config}: ChatGPTArgs) {
    this.openai = new OpenAI({ apiKey: process.env["OPENAI_API_KEY"], ...config });
    this.response = null;
    this.prompt = prompt;
    this.requestBody = this._buildRequestBody({
      format,
      model,
      max_tokens
    });
    return this;
  }


  
  /**
   * 
   * @param {*} param0 
   * @returns 
   */
  private _buildRequestBody({format, model, max_tokens}: RequestBodyParams): any {
    const message = this._prepareMessages(format);
    return { 
      model:  model || Static.MODEL,
      messages: message, 
      max_tokens: max_tokens || undefined,
      response_format: { "type": "json_object" }
    };
  }



  /**
   * 
   * @param {*} format 
   * @returns 
   */
  private _prepareMessages(format: any): any[] {
    const systemFormat = this._getFormat(format);
    return [
      { role: Static.SYSTEM, content: systemFormat},
      { role: Static.USER, content: this.prompt+'. Use json as the response format.' },
    ];
  }



  /**
   * 
   * @returns 
   */
  async send(): Promise<any> {
    try {
      console.log("Sending resquest...");
      const content: any = await this.openai.chat.completions.create(this.requestBody);
      this.response = content.choices[0].message.content;
      console.log(this.response)
      return this._getResponse();
    } catch (err) {
      console.error("Unable to complete Open A.I request: ", err);
      throw new Error("Error: OPENAI_REQUEST_ERROR");
    }
  }



  /**
   * 
   * @returns 
   */
  private _getResponse(): any {
    return JSON.parse(this.response);
  }



  /**
   * 
   * @param {object} format 
   * @returns {String} requestFormat as a string appended to the system format
   */
  private _getFormat(format: any): string { // typeof service
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