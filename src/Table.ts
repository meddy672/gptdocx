import {
  Table,
  TableCell,
  TableRow,
  Paragraph,
  TextRun,
  WidthType,
} from "docx";
// eslint-disable-next-line import/no-unresolved
import { DocxTableArgs } from "@models";

/**
 * Class **DocxTable** creates a new table for the Docx engine.
 * ```javascript
 * const table = new DocxTable({
        headers: ["name", "price", "id"], 
        data: [
          {name: "iPhone 15", price: "$299.99", id: "123456789"},
          {name: "iPhone 14", price: "$259.99", id: "123456789"}, 
          {name: "iPhone 13", price: "$199.99", id: "123456789"}
        ]           
    })
 * 
 * ```
 */
class DocxTable {
  /**
   * The headers for the table.
   */
  private headers: any[];

  /**
   * The data for the table.
   */
  private data: any[];

  /**
   * flag to determine data type
   */
  private dataTypeIsObject: boolean = false;

  /**
   * @description
   * Initialize the table object
   *
   * @param config table headers and data.
   * @returns Table
   */
  constructor({ headers, data }: DocxTableArgs) {
    this.headers = this._getHeaders(headers);
    this.data = this._getData(data);
    return this._getTable(this.headers, this.data);
  }

  /**
   * @description
   * Takes the headers from the ChatGPT object and builds the table headers.
   *
   * @param headers table headers received in the response from the ChatGPT object
   *
   * @returns table headers
   */
  private _getHeaders(headers: string[]): any[] {
    return headers.map((text: string) => {
      return new TableCell({
        width: {
          size: 4535,
          type: WidthType.DXA,
        },
        children: [
          new Paragraph({
            heading: "Heading2",
            children: [
              new TextRun({
                text: this.capitalizeFirstLetter(text.toString()),
                bold: true,
                size: 34,
              }),
            ],
          }),
        ],
      });
    });
  }

  /**
   * @description
   * Takes the data received from the ChatGPT object and formats the
   * data for the table.
   *
   * @param data received from the CHatGPT object.
   * @returns table data.
   */
  private _getData(data: any[]): any {
    return data.map((element: any) => {
      if (typeof element !== "object") {
        return new TableCell({
          children: [new Paragraph(element.toString())],
        });
      } else {
        this.dataTypeIsObject = true;
        return new TableRow({
          children: Object.values(element).map((value: any) => {
            return new TableCell({
              children: [new Paragraph(value.toString())],
            });
          }),
        });
      }
    });
  }

  /**
   * @description
   * Adds the headers and data to the table and returns a table.
   *
   * @param headers response headers.
   * @param data response data.
   * @returns table
   */
  private _getTable(headers: any[], data: any[]): any {
    if (this.dataTypeIsObject) {
      return this._Table(headers, data);
    } else {
      const parsedData = this._dataTypeIsArrayOfStrings(headers, data);
      return this._Table(headers, parsedData);
    }
  }

  /**
   * @description
   * Determines how the data should be formatted in the table.
   *
   * @param headers response headers.
   * @param data response data.
   * @returns table data.
   */
  private _dataTypeIsArrayOfStrings(headers: any[], data: any[]) {
    const dataResults: any[] = [];
    let result = [];
    for (let i = 0; i < data.length / headers.length; i++) {
      const rowData: any = {};
      for (let j = 0; j < headers.length; j++) {
        const dataIndex = i * headers.length + j;
        rowData[headers[j]] = data[dataIndex];
        result.push(rowData[headers[j]]);
      }
      dataResults.push(new TableRow({ children: [...result] }));
      result = [];
    }
    return dataResults;
  }

  /**
   * @description
   * Returns a table to be used as document component.
   * **Docx Only**.
   *
   * @param headers response headers.
   * @param data response data.
   * @returns table
   */
  private _Table(headers: any[], data: any[]) {
    return new Table({
      rows: [
        new TableRow({
          tableHeader: true,
          children: [...headers],
        }),
        ...data,
      ],
    });
  }

  /**
   * @description
   * Capitalize the first character of each header.
   *
   * @param inputString
   * @returns string
   */
  private capitalizeFirstLetter(inputString: string) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }
}

export default DocxTable;
