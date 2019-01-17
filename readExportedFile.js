const path = require('path');

const read = require('./readXlsx');
const { excel_file_in_the_root_folder: fileName} = require('./config');


const sheetName = 'variants';
const filePath = path.resolve(`./${fileName}`);

function reducer(prev, current) {
    const list = current.split(';')
    return prev.concat(list);
}


module.exports = async function() {
    console.log('...parsing xlsx file');
    const content = await read(filePath, sheetName);
    console.log('xlsx file parsed');

    const variantImageStrings = content
        .map(entry => entry['Images']);

    console.log(`got ${variantImageStrings.length} product variants`);

    const variantImages = variantImageStrings
        .reduce(reducer, []);
    
    console.log(`got ${variantImages.length} product variant images`);

    return variantImages
        .map(imageUrl => {
            const array = imageUrl.split('/');
            return array[array.length - 1];
        })
        .map(imageName => imageName.split('.')[0])
}