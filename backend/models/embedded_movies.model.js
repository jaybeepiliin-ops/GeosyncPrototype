const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EMSchema = new Schema({
    
    "plot": { type: String, required: true },
    "poster": { type: String, required: true },
    "title": { type: String, required: true },
    "fullplot": { type: String, required: true },
    "rated": { type: String, required: true },
    "lastupdated": { type: String, required: true },
    "type": { type: String, required: true },
    "fullplot": { type: String, required: true },

    "tomatoes": {
        viewer: {
            ratings: { type: String, required: true },
            numReviews: { type: String, required: true },
            meter: { type: String, required: true },
        },

        fresh: { type: Number, required: true },

        critic: {
            ratings: { type: String, required: true },
            numReviews: { type: String, required: true },
            meter: { type: String, required: true },
        },

        rotten: { type: Number, required: true },
        lastupdated: { type: Number, required: true }
    },

    "imdb": { 
        ratings: { type: Number, required: true },
        vote: { type: Number, required: true },
        id: { type: Number, required: true },

    },


    "awards": { 
        wins: { type: Number, required: true },
        nominations: { type: Number, required: true },
        text: { type: String, required: true },
    },

    "genre": [{ type: Schema.Types.Mixed, required: true }],
    "cast": [{ type: Schema.Types.Mixed, required: true }],
    "directors": [{ type: Schema.Types.Mixed, required: true }],
    "language": [{ type: Schema.Types.Mixed, required: true }],
    "countries": [{ type: Schema.Types.Mixed, required: true }],

    "runtime": { type: Number, required: true },
    "year": { type: Date, required: true },
    "release": { type: Number, required: true },
    "num_mflix_comments": { type: Number, required: true },

    "plot_embedding": { type: Binary, required: true },
    "plot`_embedding_voyage_3_large": { type: Binary, required: true },
});

const EM = mongoose.model("embedded_movie", EMSchema);
module.exports = EM;