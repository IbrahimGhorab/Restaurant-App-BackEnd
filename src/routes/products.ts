import { Router } from "express";
import { Product } from "../entities/Product";

const router = Router();

/**Create New Product and save to DataBase*/
router.post("/", async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;
    if (!name || !description || !price || !categoryId) {
      res.status(404).send({ message: "Data Must Not Null" });
    } else {
      let product = Product.create({
        name,
        description,
        price,
        category: categoryId,
      });
      product.save();
      res.send(product);
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

/**get all Product */
router.get("/", async (req, res) => {
  try {
    let products = await Product.find({
      relations: { orderLines: true, category: true },
    });
    let dataProducts = products.map((product) => {
      return {
        ...product,
        TotalOrder: product.orderLines.length,
        category: product.category.name,
      };
    });
    res.send(dataProducts);
  } catch (error) {
    res.status(500).send({ massege: error });
  }
});

/**get Product By Id */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).send({ message: "Product is Not Found" });
    } else {
      let product = await Product.findOne({ where: { id: +id } });
      res.send(product);
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});
/**update Product */
// router.patch("/:id", async (req, res) => {
//   try {
//     let { id } = req.params;
//     let updatedProduct = Product.findOne({ where: { id: +id } });
//   } catch (error) {}
// });

/**Delete Product */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      await res.status(404).send({ message: "Product is Not Found" });
    } else {
      let deletedProduct = await Product.delete(+id);
      await res.send(deletedProduct);
    }
  } catch (error) {
    await res.status(500).send({ message: error });
  }
});

export default router;
