const cloudinary = require('cloudinary');

const restore = require('./restore');
const config = require('./config');

cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
});

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

main();