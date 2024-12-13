import RNFS from 'react-native-fs';

export const saveImage = async (imagePath, image) => {
    try {
        await RNFS.writeFile(imagePath, image, 'base64');
    }
    catch (error) {
        console.log("Error: " + error);
    }
}

export const deleteImage = async (imagePath) => {
    try {
        await RNFS.unlink(imagePath);
    }
    catch (error) {
        console.log("Error: " + error);
    }
}