import * as RNFS from 'expo-file-system';

export const saveImage = async (sourcePath) => {
    try {
        // random filename

        const decodedUri = decodeURI(sourcePath);

        const fileName = Date.now() + ".jpg";
        const destPath = `${RNFS.documentDirectory}/${fileName}`;

        await RNFS.copyAsync({
            from: sourcePath,
            to: destPath
        });
        console.log("Image saved to " + destPath);
        return destPath;
    }
    catch (error) {
        console.log("Error: " + error);
        throw error;
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