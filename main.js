const cloudinary = require('cloudinary');

const restore = require('./restore');
const cloudinaryConfig = require('./config');

cloudinary.config(cloudinaryConfig);

const image = 'fl2dldphdzdjhnr98gv4';

async function main() {
    try {
        const restorationResult = await restore(image);
        console.log(`image ${image}$: ${restorationResult.message}`)
        console.log(restorationResult)
    } catch (error) {
        console.log(`failed to restore ${image}`, error)
        console.log(error)
    }

}

main()