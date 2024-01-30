import {
    Table,
    TableCell,
    TableRow,
    Paragraph,
    TextRun,
    WidthType,
} from 'docx';

type DocxTableArgs = {
    headers: any[];
    data: any;
}
function DocxTable({headers, data}: DocxTableArgs) {
    let dataTypeIsObject = false;
    const tableHeaders = headers.map((text: string) => {
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
                text: capitalizeFirstLetter(text.toString()), // Clean make configurable
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
      const dataResults: any[] = []
        let result = [];
        for (let i = 0; i < tableData.length / headers.length; i++) {
            const rowData: any = {};
            for (let j = 0; j < headers.length; j++) {
                const dataIndex = i * headers.length + j;
                rowData[headers[j]] = tableData[dataIndex];
                result.push(rowData[headers[j]]);
            }
            dataResults.push(new TableRow({ children: [...result]}));
            result = [];
        }
        return new Table({
            rows: [
              new TableRow({
                tableHeader: true,
                children: [...tableHeaders],
              }),
              ...dataResults,
            ],
        });
    }

      function capitalizeFirstLetter(inputString: string) {        
          return inputString.charAt(0).toUpperCase() + inputString.slice(1);
      }
}
export default DocxTable;