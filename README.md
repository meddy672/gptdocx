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

3. Use the `gptdocx` functions to generate Word documents:

   ```javascript
   const { GPTDocx, BASIC } = gptdocx;

   const filePath = await new GPTDocx({
      format: BASIC, // format
      prompt: "Write  Paper on coffee.",
    }).createFile();
   ```

4. Run your Node.js script:

   ```bash
   node your_script.js
   ```

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/your-username/gptdocx/issues) on the GitHub repository. If you'd like to contribute directly, feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.