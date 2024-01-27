export type ChatGPTArgs = {
  prompt: string;
  format: any;
  model?: string;
  max_tokens?: number;
  apiKeyEnv: string;
  config?: any;
};

export type RequestBodyParams = {
  format: Format;
};

export type WordDocumentArgs = {
  name: string;
  pages: any[];
  options?: DocOptions;
};

export type DocOptions = {
  pageHeader?: {};
  pageFooter?: {};
};

export type GPTDocxsArgs = {
  format: string | Format;
  prompt: string;
  apiKeyEnv?: string | undefined; 
  saveSchema?: boolean;
  documentConfig?: any;
};

export type RequestFormat = {
  pages: any[];
};

export type Format = {
  name: string;
  requestFormat: RequestFormat;
  styles?: {};
};

export type DocxTableArgs = {
  headers: any[];
  data: any[];
};

export type DocxImageArgs = {
  data: Buffer;
  styles: any;
};

export type ChatCompletionCreateParams = {
  model: string;
  messages: Message[];
  response_format?: {
    type: "json_object" | "text" | undefined;
  };
}

export type Role = "system" | "user" | "assistant";

export type ChatCompletionMessageParam = {
  role: 'system' | 'user' | 'assistant';
  content: string;
  // Add any additional properties expected by OpenAI for a single message
}

export type Message = ChatCompletionMessageParam;

export type Choice  = {
  message: {
    role: 'system' | 'user' | 'assistant';
    content: string | null; // Allow for nullable content
  }
}

export type ChatCompletionResponse  = {
  id: string;
  object: string;
  created: number;
  model: string;
  usage?: CompletionUsage;
  choices: Choice[];
}

export type CompletionUsage  = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export type Response = {
  [key: string]: any;
}

export type Styles = {
  [key: string]: any;
}




