const cloudinary = require('cloudinary');

const wrapperRestore = (images) => new Promise((resolve, reject) => {
    cloudinary.v2.api.restore(
        images,
        (error, result) => {
            if(error) return reject(error)
            resolve(result);
        }
    );
})
module.exports = wrapperRestore;