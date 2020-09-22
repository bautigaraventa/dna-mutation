var mongoose = require('mongoose');

const dnaStatSchema = new mongoose.Schema({
    dna: [{ type: String, required: true }],
    hasMutation: { type: Boolean },
});

mongoose.model('DnaStat', dnaStatSchema);