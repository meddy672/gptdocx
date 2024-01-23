require('dotenv').config();
const { 
    TRUE,
    JSON_V,
    OBJECT,
    SYSTEM,
    USER,
    MODEL,
    DEFAULT_MESSAGE,
    SYSTEM_FORMAT,  
} = require("./static/constants");
const OpenAI = require('openai');
const Mock = require('./Mock/Mock');

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
    if (process.env["MOCK_OPENAI_RESPONSE"] === TRUE) {
      return  Mock.request('word');
    }
    this.openai = new OpenAI({ apiKey: process.env["OPENAI_API_KEY"], ...config });
    this.response = null;
    this.responseFormat = responseFormat || JSON_V;
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
  _buildRequestBody({format, model, max_tokens}: RequestBodyParams){
    const message = this._prepareMessages(format);
    return { 
      model:  model || MODEL,
      messages: message, 
      max_tokens: max_tokens || undefined
    };
  }



  /**
   * 
   * @param {*} format 
   * @returns 
   */
  _prepareMessages(format: any){
    const systemFormat = this._getFormat(format);
    return [
      { role: SYSTEM, content: systemFormat},
      { role: USER, content: this.prompt }
    ];
  }



  /**
   * 
   * @returns 
   */
  async send() {
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
  _getResponse(){
    if (this.responseFormat === JSON_V) {
      return JSON.parse(this.response.choices[0].message.content);
    }
    return this.response.choices[0].message.content;
  }



  /**
   * 
   * @param {*} format 
   * @returns 
   */
  _getFormat(format: any) { 
    console.debug("format()");
    let systemFormat;
    if (format && typeof format === OBJECT) {
      const stringifiedFormat = JSON.stringify(format);
      systemFormat = SYSTEM_FORMAT + stringifiedFormat;
    } else {
      systemFormat = DEFAULT_MESSAGE;
    }
    return systemFormat;
  }
} // End of Class

export default ChatGPT;