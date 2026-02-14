import { getBase64 } from "../customField/ImageField";

const ConvertImage = async (image) => {
  try {
    if(!image?.length > 0){
      throw new Error ('image length is less than 0')
    }
    const base64 = await getBase64(image[0]?.originFileObj);

    const convertedImage = {
      base64: base64,
      rawFile: {
        path: image[0]?.name
      }
    };

    return convertedImage;
  } catch (error) {
    console.error("Error converting image:", error);
    return null;
  }
}

export default ConvertImage;