import { Router } from "express";
import { Order } from "../entities/Order";
import { OrderLine } from "../entities/OrderLine";
import { Product } from "../entities/Product";

const router = Router();

/**Create Order and save to date base*/
router.post("/", async (req, res) => {
  
  try {
    const { firstName, lastName, mobile, address, city, orderDetails } = req.body;
  
  if (
    !firstName ||
    !lastName ||
    !mobile ||
    !address ||
    !city ||
    !orderDetails
  ) {
    return res.status(404).send({ message: "data Must be Not Null" });
  }
    let order = Order.create({
      firstName,
      lastName,
      mobile,
      address,
      city,
    });
    await order.save();

    // let orderDetails;
    
    for (let i = 0; i < orderDetails.length; i++) {
      let product = await Product.findOne({
        where: { id: orderDetails[i].id },
      });
      if (product) {
        let orderLine = OrderLine.create({
          quantity: orderDetails[i].quantity,
          product,
          order,
        });
        await orderLine.save();
        
      }
      // res.status(200).json(orderLine);
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({
      relations: { orderLines: { product: true } },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.findOne({
      where: { id: +id },
      relations: { orderLines: { product: true } },
    });
    res.send(orders);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

// update order
router.patch("/:id", async (req, res) => {
  try {
    let id = +req.params.id;
    if (!id) {
      return res.status(404).send({ message: "order not Found" });
    }
    let updatedOrder = await Order.update(id, {
      isCompleted: true,
      // updatedAt: Date.now(),
    });

    res.send(updatedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "server Down" });
  }
});

// router.put("/:id", async (req, res) => {
//   try {
//     let {id} = req.params;
//     let order = await Order.findOne({ where: { id:+id } });
//     if (!order) {
//       return res.status(404).send({ message: "order not Found" });
//     }
//     let updatedOrder:any = { ...order, isCompleted: true };
//     await updatedOrder.save();
//     res.send(updatedOrder);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ message: "server Down" });
//   }
// });

export default router;
