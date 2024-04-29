// File controller script

const File = require('../models/File.js');

// upload a file
const uploadFile = async (req, res) => {
    if (!req.files || !req.files.sampleFile) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { sampleFile } = req.files;
    console.log(sampleFile); // log the file

    // create a new file
    try {
        const newFile = new File(sampleFile);
        const doc = await newFile.save();

        // return a 201
        return res.status(201).json({ message: 'File uploaded successfully', fileId: doc._id });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occurred uploading the file' });
    }
};

// get a file
const retrieveFile = async (req, res) => {
    if (!req.query.id) {
        return res.status(400).json({ error: 'No file id provided' });
    }

    let doc;

    try {
        doc = await File.findOne({ _id: req.query.id }).exec();
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occurred retrieving the file' });
    }

    if (!doc) {
        return res.status(404).json({ error: 'File not found' });
    }

    // return the file
    res.set({
        'Content-Type': doc.mimetype,
        'Content-Length': doc.size,
        'Content-Disposition': `filename=${doc.name}`,
    });

    return res.send(doc.data);
};

module.exports = {
    uploadFile,
    retrieveFile,
};