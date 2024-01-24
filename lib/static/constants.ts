const Static = {
  links : "links",
  table : "table",
  image : "image",
  INDEX_JS : "index.js",
  INDEX_TS: "index.ts",
  array : "array",
  object : "object",
  string : "string",
  service: "service",
  HYPERLINK : "Hyperlink",
  DOCX_DIR : "docx",
  SCHEMA_JSON : "schema.json",
  "true":  "true",
  json : "json",
  SYSTEM : "system",
  USER : "user",
  MODEL : "gpt-3.5-turbo-1106",
  DEFAULT_MESSAGE : "You are a helpful assistant.",
  SYSTEM_FORMAT: 'Return the message content as a json object so that it can be parsed using the JSON.parse static method. The json object needs to be in the in the following format: ',
  APPEND_TO_STRING:{
      pptx: '. For the slides array, create only one object with the type "TitleSlide". For the slides array, create as many "NewSlides" objects as possible. The content for the new slides must contain at least three objects. For each new subject found from the query, in the slides array create a "SectionHead" object.',
      csv: ". Return only the csv data and title for a csv file in the message content. Include a title and headers for the csv data. The message content must not contain any additional characters which may prevent the csv data from being saved into a database."
  },
}
export default Static;