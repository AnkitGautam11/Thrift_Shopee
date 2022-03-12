const mongoose = require('mongoose');

const connection = ( ) => {
    main().catch(err => console.log(err));

    async function main() {
        await mongoose.connect(process.env.DB_URI)
        .then(data =>{
            console.log(`MongoDB connnected with server : ${data.connection.host}`);
        })
    }
}

module.exports = connection