const cloudinary = require('cloudinary');

const restore = require('./restore');
const readExportedFile = require('./readExportedFile');
const saveState = require('./saveState');
const readState = require('./readState');
const config = require('./config');

cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
});

let currentIndex = config.start_from_index_in_list || 0;

async function main() {
    try {
        let list = await readExportedFile();
        const task = list.length;
        
        list = list.map(
            (imageId, index) => ({
                index,
                imageId,
                status: 'queued',
                response: {}
            })
        )

        while(currentIndex < task ) {
            const entry = list[currentIndex];

            if(!entry.imageId) {
                console.log(`image ${entry.imageId} skipped`)

                list[currentIndex].status = 'skipped';

                currentIndex++;
            }

            try {
                const restorationResult = await restore(entry.imageId);
                
                list[currentIndex].response = restorationResult;
                list[currentIndex].status = 'success';

                saveJobState(
                    currentIndex,
                    list
                )


                currentIndex++;
                
                console.log(`image ${entry.imageId} processed: ${restorationResult}`)
            } catch (error) {

                list[currentIndex].response = error;
                list[currentIndex].status = 'failure';

                saveJobState(
                    currentIndex,
                    list
                )

                console.log(`image ${list[currentIndex].imageId} failed`)
            }

            await sleep(50);
        }

    } catch (error) {
        console.log(`failed to load image list`, error)
    }
}

main();

function saveJobState(currentIndex, list) {
    const previousState = readState();
    const newList = [ ...previousState.list ];
    newList[currentIndex] = list[currentIndex];

    saveState({
        currentIndex,
        list: newList,
    })
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time))
}