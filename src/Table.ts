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

class DocxTable {
  /** headers */
  private headers: any[];

  /** data */
  private data: any[];

  /** dataTypeIsObject */
  private dataTypeIsObject: boolean = false;

  constructor({headers, data}: DocxTableArgs) {
    this.headers = this._getHeaders(headers);
    this.data = this._getData(data);
    return this._getTable(this.headers, this.data);
  }

  /**
   * 
   * @param headers 
   * @returns 
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
   * 
   * @param data 
   * @returns 
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
   * 
   * @param headers 
   * @param data 
   * @returns 
   */
  private _getTable(headers: any, data: any): any {
    if (this.dataTypeIsObject) {
      return this._Table(headers, data)
    } else {
      const parsedData = this._dataTypeIsArrayOfStrings(headers, data);
      return this._Table(headers, parsedData);
    }
  }

  /**
   * 
   * @param headers 
   * @param data 
   * @returns 
   */
  private _dataTypeIsArrayOfStrings(headers: any, data: any) {
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
   * 
   * @param headers 
   * @param data 
   * @returns 
   */
  private _Table(headers: any, data: any) {
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
   * 
   * @param inputString 
   * @returns 
   */
  private capitalizeFirstLetter(inputString: string) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }
}

export default DocxTable;
