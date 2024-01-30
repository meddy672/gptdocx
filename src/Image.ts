import { Paragraph, ImageRun, TextWrappingType, TextWrappingSide } from "docx";

type DocxImageArgs = {
  data: Buffer;
  styles: any;
};
class DocxImage {
  constructor({ data, styles }: DocxImageArgs) {
    return new Paragraph({
      children: [
        new ImageRun({
          data,
          ...styles.image,
          transformation: {
            width: styles.image?.width || 200,
            height: styles.image?.height || 200,
            flip: {
              vertical: styles.image?.flip || undefined,
            },
          },
          floating: {
            horizontalPosition: {
              offset: styles.image?.horizontal?.offset || 6000000,
            },
            verticalPosition: {
              offset: styles.image?.vertical?.offset || 750000,
            },
            wrap: {
              type: TextWrappingType.SQUARE,
              side: TextWrappingSide.BOTH_SIDES,
            },
          }
        })
      ]
    });
  }
}

export default DocxImage;
