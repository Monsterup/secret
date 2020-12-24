const mongoose = require('mongoose');
const mongoseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const deviceTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    sensorType : [
        {
            type: Schema.Types.ObjectId,
            ref: 'SensorType'
        }
    ],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps:true});

deviceTypeSchema.plugin(mongoseDelete, {deletedAt: true, overrideMethods: 'all'});

module.exports = mongoose.model('DeviceType', deviceTypeSchema);

