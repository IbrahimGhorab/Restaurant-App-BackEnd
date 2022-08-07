import { Router } from "express";
import { Order } from "../entities/Order";
import { OrderLine } from "../entities/OrderLine";

const router = Router();

/**Create Order and save to date base*/
router.post("/", async (req, res) => {
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
  try {
    let order = Order.create({
      firstName,
      lastName,
      mobile,
      address,
      city,
    });
    await order.save();

    // let orderDetails;
    console.log(orderDetails);
    for (let i = 0; i < orderDetails.length; i++) {
      let orderLine = OrderLine.create({
        quantity: orderDetails[i].quantity,
        product: orderDetails[i].product.id,
        order,
      });
      await orderLine.save();
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
    const orders = await Order.find({ relations: { orderLines: true } });
    res.send(orders);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.findOne({
      where: { id: +id },
      relations: { orderLines: true },
    });
    res.send(orders);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

export default router;
