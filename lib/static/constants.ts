module.exports = {
    SYSTEM_FORMAT: 'Return the message content as a json object so that it can be parsed using the JSON.parse static method. The json object needs to be in the in the following format: ',
    APPEND_TO_STRING:{
        pptx: '. For the slides array, create only one object with the type "TitleSlide". For the slides array, create as many "NewSlides" objects as possible. The content for the new slides must contain at least three objects. For each new subject found from the query, in the slides array create a "SectionHead" object.',
        csv: ". Return only the csv data and title for a csv file in the message content. Include a title and headers for the csv data. The message content must not contain any additional characters which may prevent the csv data from being saved into a database."
    },
    LINKS: 'links',
    TABLE: 'table',
    IMAGE: 'image',
    INDEX_JS: 'index.js',
    ARRAY: 'array',
    OBJECT: 'object',
    STRING: 'string',
    HYPERLINK: 'Hyperlink',
    DOCX_DIR: 'docx',
    SCHEMA_JSON: 'schema.json',
    TRUE: 'true',
    JSON: 'json',
    SYSTEM: 'system',
    USER: 'user',
    MODEL: 'gpt-4',
    DEFAULT_MESSAGE: 'You are a helpful assistant'
}