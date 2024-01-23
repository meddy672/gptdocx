import GPTDocx from './lib/GPTDocx';

async function main() {
    const filename = await new GPTDocx({
      service: "coverLetter",
      prompt: "Write a cover letter for Matthew Eddy who is an excellent software engineer. His skills are Fullstack JavaScript development, Python, and AWS Webservices. Make the canindate seem polite, professional, but an expert in his field.", // required
    }).createFile()
    console.log('Filename: ',filename)
    return filename;
  }
  main()