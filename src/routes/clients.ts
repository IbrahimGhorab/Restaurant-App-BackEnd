import { Router } from "express";
import { Client } from "../entities/Client";
import { Order } from "../entities/Order";

const router = Router();

router.post("/", async (req, res) => {
  const { firstName, lastName, address, city, mobile } = req.body;
  try {
    if (!firstName || !lastName || !address || !city || !mobile) {
      await res.status(404).send({ message: "data must be not null" });
    } else {
      let client = Client.create({
        firstName,
        lastName,
        address,
        city,
        mobile,
      });
      client.save();
      await res.send(client);
    }
  } catch (error) {
    await res.status(500).send({ message: "not found" });
    // console.log({ Message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    let clients = await Client.find({ relations: { orders: true } });
    let allClient = clients.map((client) => {
      return { ...client, totalOrders: Order.length };
    });
    await res.send(allClient);
  } catch (error) {
    await res.send({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = +req.params.id;
  if (!id) {
    await res.status(404).send({ message: "client not found" });
  }
  let client = await Client.findOne({
    where: { id },
    relations: { orders: true },
  });
  let newClient = { ...client, totalOrder: client?.orders.length };
  await res.send(newClient);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    await res.status(404).send({ message: "client not found" });
  }
  try {
    let deletedClient = Client.delete(+id);
    await res.send(deletedClient);
  } catch (error) {
    await res.send({ message: error });
  }
});

export default router;
