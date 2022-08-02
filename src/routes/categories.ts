import { Router } from "express";
import { Category } from "../entities/Category";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      await res.status(404).send({ message: "category is required" });
    } else {
      let category = await Category.create({
        name,
      });
      category.save();
      await res.send(category);
    }
  } catch (error) {
    await res.status(500).send({ message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    let categories = await Category.find({ relations: { products: true } });
    let dataCategories = categories.map((category) => {
      return { ...category, totalItems: category.products.length };
    });
    await res.send(dataCategories);
  } catch (error) {
    await res.status(5000).send({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      await res.status(404).send({ message: "Category Not Found" });
    }
    let category = await Category.findOne({
      where: { id: +id },
      relations: { products: true },
    });
    let dataCategory = { ...category, totalItems: category?.products.length };
    await res.send(dataCategory);
  } catch (error) {
    await res.status(500).send({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let deletedCategory = await Category.delete(+id);
    await res.send(deletedCategory);
  } catch (error) {
    await res.status(500).send({ massege: error });
  }
});

export default router;
