require('dotenv').config();
import OpenAI from 'openai';
import Static from "./static/constants";

type ChatGPTArgs = {
    prompt: string;
    format: any;
    responseFormat: string;
    model?: string;
    max_tokens?: number;
    config?: any;
}

type RequestBodyParams = {
    format: any;
    model: string | undefined;
    max_tokens: number | undefined;
}

class ChatGPT {
    private openai: any;
    private response: any;
    private responseFormat = "";
    private prompt = "";
    private requestBody: any;

  constructor({prompt, format, responseFormat, model, max_tokens, config}: ChatGPTArgs) {
    this.openai = new OpenAI({ apiKey: process.env["OPENAI_API_KEY"], ...config });
    this.response = null;
    this.responseFormat = responseFormat || Static.json;
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
  _buildRequestBody({format, model, max_tokens}: RequestBodyParams): any {
    const message = this._prepareMessages(format);
    return { 
      model:  model || Static.MODEL,
      messages: message, 
      max_tokens: max_tokens || undefined
    };
  }



  /**
   * 
   * @param {*} format 
   * @returns 
   */
  _prepareMessages(format: any): any[] {
    const systemFormat = this._getFormat(format);
    return [
      { role: Static.SYSTEM, content: systemFormat},
      { role: Static.USER, content: this.prompt }
    ];
  }



  /**
   * 
   * @returns 
   */
  async send(): Promise<string> {
    try {
      console.log("Sending resquest...");
      this.response = await this.openai.chat.completions.create(this.requestBody);
      console.log("Loading Response...");
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
  _getResponse(): string {
    if (this.responseFormat === Static.json) {
      return JSON.parse(this.response.choices[0].message.content);
    }
    return this.response.choices[0].message.content;
  }



  /**
   * 
   * @param {object} format 
   * @returns {String} requestFormat as a string appended to the system format
   */
  _getFormat(format: any): string { 
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