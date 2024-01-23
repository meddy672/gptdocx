import {
    Table,
    TableCell,
    TableRow,
    Paragraph,
    TextRun,
    WidthType,
} from 'docx';

type DocxTableArgs = {
    table_headers: any[];
    data: any;
}
function DocxTable({table_headers, data}: DocxTableArgs) {
    let dataTypeIsObject = false;
    const tableHeaders = table_headers.map((text: string) => {
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
                text: capitalizeFirstLetter(text), // Clean make configurable
                bold: true,
                size: 34,
              }),
            ],
          }),
        ],
      });
    });
    
    const tableData = data.map((element: any) => {
      if (typeof element !== "object") {
        return new TableCell({
          children: [new Paragraph(element.toString())],
        });
      } else {
        dataTypeIsObject = true;
        return new TableRow({
          children: Object.values(element).map((value: any) => {
            return new TableCell({
              children: [new Paragraph(value.toString())],
            });
          }),
        });
      }
    });
    
    if (dataTypeIsObject) {
        return new Table({
            rows: [
              new TableRow({
                tableHeader: true,
                children: [...tableHeaders],
              }),
              ...tableData,
            ],
        });
    } else {
        let result = [];
        for (let i = 0; i < tableData.length / table_headers.length; i++) {
            const rowData: any = {};
            for (let j = 0; j < table_headers.length; j++) {
                const dataIndex = i * table_headers.length + j;
                rowData[table_headers[j]] = tableData[dataIndex];
                result.push(rowData[table_headers[j]]);
            }
            data.push(new TableRow({ children: [...result]}));
            result = [];
        }
        return new Table({
            rows: [
              new TableRow({
                tableHeader: true,
                children: [...tableHeaders],
              }),
              ...data,
            ],
        });
    }

      function capitalizeFirstLetter(inputString: string) {
          if (typeof inputString !== 'string') {
            throw new Error('Input must be a string');
          }
        
          if (inputString.length === 0) {
            return inputString; // Return the original string if it's empty
          }
        
          return inputString.charAt(0).toUpperCase() + inputString.slice(1);
      }
}
export default DocxTable;