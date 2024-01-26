export type ChatGPTArgs = {
  prompt: string;
  format: any;
  model?: string;
  max_tokens?: number;
  apiKeyEnv?: string;
  config?: any;
};

export type RequestBodyParams = {
  format: any;
  model: string | undefined;
  max_tokens: number | undefined;
};

export type WordDocumentArgs = {
  name: string;
  pages: any[];
  options?: {
    pageHeader: {};
    pageFooter: {};
  };
};

export type GPTDocxsArgs = {
  format: string | Format;
  prompt: string;
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
  data: any;
};

export type DocxImageArgs = {
  data: Buffer;
  styles: any;
};
