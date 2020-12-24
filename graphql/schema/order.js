module.exports = {
    types: `
        type Order{
            _id: ID!
            code: String!
            name: String!
            price: Int!
            address: String!
            courier: String!
            status: String!
            cost: String!
            resi: String
            transferImage: String
            transferName: String
            creator: User!
            createdAt: String!
            updatedAt: String!
            deletedAt: String
        }

        type OrderAll{
            _id: ID!
            code: String!
            name: String!
            price: Int!
            address: String!
            courier: String!
            status: String!
            cost: String!
            resi: String
            transferImage: String
            transferName: String
            creator: String!
            creatorId: String
        }

        type Orders{
            totalCount: Int!
            orders: [OrderAll!]
        }

        type OrderDetail{
            _id: ID!
            orderId: String!
            deviceTypeId: String!
            quantity: Int!
        }

        type OrderDetails{
            totalCount: Int!
            orderDetails: [OrderDetail!]
        }

        type CheckDeleteOrder{
            deleted: Boolean!
        }
    `
    ,
    queries: `
        orders(keyword: String, limit: Int, skip: Int): Orders
        adminOrders(keyword: String, limit: Int, skip: Int): Orders
        order(_id: ID!): Order
        orderDetail(_id: ID!): OrderDetails
        deniedOrder(_id: ID!): Order
        finishOrder(_id: ID!): Order
    `
    ,
    mutations: `
        createOrder(orderInput: OrderInput): Order
        updateOrder(_id: ID!, updateOrderInput: UpdateOrderInput): Order
        uploadPhoto(_id: ID!, uploadPhotoInput: UploadPhotoInput): Order
        deleteOrder(_id: ID!): CheckDeleteOrder
        resi(_id: ID!, resi: String!): Order
    `
    ,
    inputs: `
        input OrderInput{
            name: String!
            price: Int!
            address: String!
            courier: String!
            cost: String!
            status: String!
            device: String!
        }
        input UpdateOrderInput{
            name: String
            price: Int
            address: String
            courier: String
            status: String
            cost: String
            resi: String
            transferImage: String
            transferName: String
        }
        input UploadPhotoInput{
            transferImage: String
            transferName: String
        }
    `
};