const path = require('path');
const fs = require('fs');

module.exports = () => {
    const content = fs.readFileSync(
        path.resolve('./state.json'),
        {
            encoding: 'utf8',
        },
    )
    return JSON.parse(content);
}