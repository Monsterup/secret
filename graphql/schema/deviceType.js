module.exports = {
    types: `
        type DeviceType{
            _id: ID!
            name: String!
            price: Int!
            sensorType: [SensorType!]
            creator: User!
            createdAt: String!
            updatedAt: String!
            deletedAt: String
        }
        
        type DeviceTypes{
            totalCount: Int!
            deviceTypes: [DeviceType!]
        }

        type CheckDeleteDeviceType{
            deleted: Boolean!
        }
    `
    ,
    queries: `
        deviceTypes(keyword: String, limit: Int, skip: Int): DeviceTypes
        deviceType(_id: ID!): DeviceType
        `
    ,
    mutations: `
        createDeviceType(deviceTypeInput: DeviceTypeInput): DeviceType
        updateDeviceType(_id: ID!, updateDeviceTypeInput: UpdateDeviceTypeInput): DeviceType
        deleteDeviceType(_id: ID!): CheckDeleteDeviceType
    `
    ,
    inputs: `
        input Sensor{
            _id: String!
        }

        input DeviceTypeInput{
            name: String!
            price: Int!
            sensorType: String!
        }
        input UpdateDeviceTypeInput{
            name: String
            price: Int!
            sensorType: String
        }
    `
};