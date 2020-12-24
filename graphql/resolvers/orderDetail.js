const OrderDetail = require('../../models/orderDetail');
const { transformOrderDetail } = require('./merge');

module.exports = {
    orderDetailByOrder: async(_id, { req }) => {
        if (!req.isAuth)
            throw new Error('Unauthenticated');
        console.log("wow");
        let totalCount = await OrderDetail.find({orderId: _id})
            .and([{$or: q}])
            .skip(args.skip)
            .countDocuments();
        const orderDetails = await OrderDetail.find({orderId: _id})
            .and([{$or: q}])
            .skip(args.skip)
            .limit(args.limit);
        
        return {
            totalCount,
            orderDetails: orderDetails.map(orderDetail => {
                return transformOrderDetail(orderDetail)
            })
        }
    }
}