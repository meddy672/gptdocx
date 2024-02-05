# GPTDocx
### Create word documents with ChatGPT.
![docxImage](./assets//gptdocxImage.png)

# gptdocx

`gptdocx` is an npm module designed to simplify the process of creating Word documents using the ChatGPT language model from OpenAI. With this module, you can easily generate dynamic and content-rich Word documents programmatically.

## Description

Generating Word documents has never been easier. `gptdocx` leverages the power of ChatGPT to provide a seamless interface for creating documents with natural language inputs. Whether you need to draft reports, letters, or any textual content, this module streamlines the process, making it accessible through Node.js and TypeScript.

## Requirements

Before using `gptdocx`, ensure that you have the following prerequisites:

- **Node.js:** Make sure Node.js is installed on your system. You can download it [here](https://nodejs.org/).

- **OpenAI API Key:** Obtain an API key from OpenAI by creating an account and navigating to the OpenAI developer portal. Make sure there is a sufficient balance in your account to cover API usage.

- **.env File:** Create a `.env` file at the root of your project and add your OpenAI API key using the following format:

  ```plaintext
  OPENAI_API_KEY=your_api_key_here
  ```

- **Files Directory:** Create a `files` directory at the root of your current working directory. This directory will be used to store the generated Word documents.

## Usage

1. Install the `gptdocx` module:

   ```bash
   npm install gptdocx
   ```

2. Import the module in your Node.js project:

   ```javascript
   const gptdocx = require('gptdocx');
   // or
   import gptdocx from 'gptdocx';
   ```

3. Use the `GPTDocx` object to generate Word documents:

   ```javascript
   const { GPTDocx, BASIC } = gptdocx;

   const filePath = await new GPTDocx({
      format: BASIC, 
      prompt: "Write  Paper on coffee.",
    }).createFile();
   ```

4. Run your Node.js script:

   ```bash
   node your_script.js
   ```

Running the code above will create a new word document in the files with context from ChatGPT on the subject coffee.

## GPTDocx Object
The GPTDocx object uses [Docx](https://docx.js.org/#/) and [DocxTemplater](https://docxtemplater.com/) to build .docx files. If you configure `format` as an object, GPTDocx will use **Docx** to build the word document. This approach requires a little more overhead, but adds greater flexibility as you supply the format and style of the document yourself. However, if you use an exported format, GPTDocx will use **Docxtemplater** to build the document. Docxtemplater requires templates to map data to the word document. The formats exported from the gptdocx module tells the GPTDocx object what format and template to use in the request.

#### Example 1: Docxtemplater Approach
```javascript
const gptdocx = require('gptdocx');

const { GPTDocx, SIMPLE } = gptdocx;

const filePath = await new GPTDocx({
    format: SIMPLE,
    prompt: "Write a paragraph.",
}).createFile();
```

In the example above, GPTDocx creates a word document using the SIMPLE format which corresponds to a template that GPTDocx can locate and use to build the document. No styling is needed as the is already predesigned with fonts, headings, etc.

#### Example 2: Docx Approach 
```javascript
  const filePath = await new GPTDocx({
    format: {
      sys: {
        format: "json",
        name: "demoFormat",
        values: {
          content: [
            {
              title: "",
              body: "",
            },
          ],
        },
      },
      styles: { // optional
        title: {
          paragraph: {
            heading: "Heading4",
            spacing: {
              before: 100,
              after: 10,
            },
          },
          text: {
            color: "#000000",
            bold: true,
          },
        },
        body: {
          paragraph: {
            spacing: {
              before: 100,
              after: 100,
            },
          },
          text: {
            color: "#333333",
          },
        },
      },
    },
    prompt: "Write a paper about Whales.",
  }).createFile();
```

In the example above, GPTDocx will send the prompt to ChatGPT with the property values for context. The styles object maps the **Docx Styles** to the properties in the **values** object. Nearly everything in **Docx** can be placed into a class Paragraph which can include a class TextRun, therefore, GPTDocx uses properties **paragraph and text** within styles and maps the styles to the respective classes. If you do not add the styles object, you will recieve a document with context that is relative to the prompt. [More Examples](./examples/examples.ts).

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/meddy672/gptdocx/issues) on the GitHub repository. If you'd like to contribute directly, feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.