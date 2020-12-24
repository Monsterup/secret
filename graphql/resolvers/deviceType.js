const DeviceType = require('../../models/deviceType');
const User = require('../../models/user');
const {transformDeviceType} = require('./merge');

module.exports = {
    deviceTypes: async (args, { req }) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        const creator = await User.findOne({_id: req.userId});               
        try {
            const q = [
                {name: {$regex: '.*' + args.keyword + '.*', $options: '-i'}},
            ];
            let totalCount = await DeviceType.find()
                .and([{$or: q}])
                .skip(args.skip)
                .countDocuments();
            const deviceTypes = await DeviceType.find()
                .and([{$or: q}])
                .skip(args.skip)
                .limit(args.limit);

            return {
                totalCount,
                deviceTypes: deviceTypes.map(deviceType => {
                    return transformDeviceType(deviceType)
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    deviceType: async (_id, { req }) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        try {
            const deviceTypes = await DeviceType.findOne({_id});
            if(!deviceTypes)
                throw new Error('Device Type not found');
            return transformDeviceType(deviceTypes)
        } catch (error) {
            console.log(error);
        }
    },
    createDeviceType: async (args, { req }) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        console.log(args.deviceTypeInput);
        let deviceType = new DeviceType({
            name: args.deviceTypeInput.name,
            price: args.deviceTypeInput.price,
            creator: req.userId
        });
        let createdDeviceType;
        try {
            for(let i=0; i<args.deviceTypeInput.sensorType.split(",").length; i++) {
                deviceType.sensorType.push({_id: args.deviceTypeInput.sensorType.split(",")[i]})
            }
            const res = await deviceType.save();
            createdDeviceType = transformDeviceType(res);
            const creator = await User.findById(req.userId);
            if (!creator)
                throw new Error('user not found');
            creator.createdDeviceType.push(deviceType);
            await creator.save();
            return createdDeviceType;
        } catch (error) {
            throw error;
        }
    },
    updateDeviceType: async (args, { req }) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let updatedDeviceType;
        try {
            const deviceType = await DeviceType.findOneAndUpdate({_id : args._id}, {
                name: args.updateDeviceTypeInput.name,
                price: args.updateDeviceTypeInput.price
            });
            deviceType.sensorType = [];
            console.log(deviceType);
            for(let i=0; i<args.updateDeviceTypeInput.sensorType.split(",").length; i++) {
                deviceType.sensorType.push({_id: args.updateDeviceTypeInput.sensorType.split(",")[i]})
                // console.log(i);
            }
            await deviceType.save();
            updatedDeviceType = transformDeviceType(deviceType);
            return updatedDeviceType;
        } catch (error) {
            throw error;
        }
    },
    deleteDeviceType: async (args, { req }) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        let deleted;
        try {
            const res = await DeviceType.findOne(args);
            console.log(res);
            await res.delete();
            deleted = {deleted : true};
            return deleted;
        } catch (error) {
            throw error;
        }
    }
};