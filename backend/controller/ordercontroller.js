import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import Stripe from 'stripe';
import razorpay from 'razorpay';
import { sendEmail } from '../utils/sendEmail.js';
import { generateInvoice } from '../utils/generateInvoice.js';
import logger from "../utils/logger.js";
const currency = "inr"
const deliverycharges = 10
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// const razorpayInstance=new razorpay({
//     key_id:process.env.RAZORPAY_KEY_ID,
//     key_secret:process.env.RAZORPAY_KEY_SECRET,
// })

// const placeOrder=async (req,res)=>{
//  try{
//         const {userId,items,amount,address}=req.body;

//         const orderData={
//             userId,
//             items,
//             address,
//             amount,
//             paymentMethod:"COD",
//             payment:false,
//             date:Date.now()
//         }

//         const newOrder= new orderModel(orderData);
//         await newOrder.save()

//         await userModel.findByIdAndUpdate(userId,{cartData:{}})

//         res.json({success:true,message:"Order Placed"})
//     }catch(error){
//         console.log(error);
//         res.json({success:false,message:error.message})
//     }
// }

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // 1️⃣ Quantity limit per order
    const orderQty = items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    if (orderQty > 2) {
      logger.warn("Order rejected: quantity limit", {
        userId,
        orderQty
      });

      return res.json({
        success: false,
        message: "You can order only 2 items at a time"
      });
    }

    // 2️⃣ Check existing active order
    const activeOrder = await orderModel.findOne({
      userId,
      status: ["Order Placed", "Packing", "Shipped", "Out for Delivary"]
    });

    if (activeOrder) {
      logger.warn("Order rejected: active order exists", {
        userId,
        activeOrderId: activeOrder._id
      });

      return res.json({
        success: false,
        message: "You already have an active order. Please wait for delivery."
      });
    }

    // Place new order
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      status: "Order Placed",
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    logger.info("Order placed", {
      orderId: newOrder._id,
      userId,
      paymentMethod: "COD",
      amount
    });



    // const user = await userModel.findById(userId);

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order Placed Successfully",
      orderId: newOrder._id
    });




    setImmediate(async () => {
      try {
        const user = await userModel.findById(userId);
        const invoicePDF = await generateInvoice(newOrder, user);

        await sendEmail({
          to: user.email,
          subject: "Order Confirmation & Invoice",
          html: `
        <h2>Thank you for your order!</h2>
        <p>Your order has been placed successfully.</p>
        <p><b>Order ID:</b> ${newOrder._id}</p>
      `,
          attachments: [
            {
              filename: `invoice-${newOrder._id}.pdf`,
              content: invoicePDF
            }
          ]
        });

        await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: "New Order Received",
          html: `<h2>New Order Received</h2>
            <p>Order id:${newOrder._id}</p>
            <p>User:${user.email}</p>
            <p>Amount:${newOrder.amount}</p>`
        })
        logger.info("Order email sent", {
          orderId: newOrder._id,
          userEmail: user.email
        });

      } catch (error) {
        logger.info("Order email sent", {
          orderId: newOrder._id,
          userEmail: user.email
        });
        console.log("Background Email Error", error);
      }
    });


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "STRIPE",
      payment: false,
      date: Date.now()
    }

    const newOrder = new orderModel(orderData);
    await newOrder.save()

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }))

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery_charges'
        },
        unit_amount: deliverycharges * 100
      },
      quantity: 1
    })

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',

    })
    res.json({ success: true, session_url: session.url })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, { payment: true })
      await userModel.findByIdAndUpdate(userId, { cartData: {} })
      logger.info("Stripe payment success", {
        orderId,
        userId
      });
      res.json({ success: true })
    } else {
      logger.warn("Stripe payment failed", {
        orderId,
        userId
      });
      await orderModel.findByIdAndDelete(orderId)
      res.json({ success: false, })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}


const placeOrderRazorpay = async (req, res) => {
  // try{
  //     const {userId,items,amount,address}=req.body;


  //     const orderData={
  //         userId,
  //         items,
  //         address,
  //         amount,
  //         paymentMethod:"RAZORPAY",
  //         payment:false,
  //         date:Date.now()
  //     }

  //     const newOrder= new orderModel(orderData);
  //     await newOrder.save()

  //     const options={
  //         amount:amount*100,
  //         currency:currency.toUpperCase(),
  //         receipt:newOrder._id.toString()
  //     }
  //     await razorpayInstance.orders.create(options,(error,order)=>{
  //         if(error){
  //             console.log(error);
  //             return res.json({success:false,message:error})
  //         }
  //         res.json({success:true,order})
  //     })

  // }catch(error){
  //     console.log(error);
  //     res.json({success:false,message:error.message})
  // }
}



const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    if (orderInfo, status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} })
      res.json({ success: true, message: "Payment Successful" })
    } else {
      res.json({ success: false, message: "Payment Failed" })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}


const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}


const userOrder = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId })
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: "Status Updated" })
    logger.info("Order status updated", {
      orderId,
      newStatus: status
    });
  } catch (error) {
    logger.error("Place order failed", {
      error: error.message,
      stack: error.stack
    });
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

export { allOrders, userOrder, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, verifyStripe, verifyRazorpay }