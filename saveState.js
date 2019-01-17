const path = require('path');
const fs = require('fs');

module.exports = (state) => {
    const serializedState = JSON.stringify(state, null, 2);
    fs.writeFileSync(
        path.resolve('./state.json'),
        serializedState,
    )
}