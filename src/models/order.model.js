const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // reference to the Product model
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity cannot be less than 1']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // reference to the User model
        required: true
    },
    OrderItems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderItems'
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Addresses', // reference to the Address model for shipping address
        required: true
    },

    paymentDetails: {

        paymentMethod: {
            type: String,
            enum: ['Credit Card', 'PayPal', 'Stripe', 'Cash on Delivery'], // list of supported payment methods
            required: true
        },
        transectionId: {
            type: String,
        },
        paymentId: {
            type: String,
        },
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
            default: 'Pending'
        },

    },

    totalAmount: {
        type: Number,
        required: true
    },

    totalDiscountedPrice: {
        type: Number,
        required: true,
    },

    orderStatus: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'],
        default: 'Processing'
    },
    trackingNumber: {
        type: String,
        default: null
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
}, { timestamps: true });

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
