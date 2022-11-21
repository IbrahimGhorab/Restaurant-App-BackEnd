import { Router } from "express";
import { Category } from "../entities/Category";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(404).send({ message: "category is required" });
    } else {
      let category = Category.create({
        name,
      });
      category.save();
      res.send(category);
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.get("/", async (req, res) => {
  try {
    let categories = await Category.find({ relations: { products: true } });
    let dataCategories = categories.map((category) => {
      return { ...category, totalItems: category.products.length };
    });
    res.send(dataCategories);
  } catch (error) {
    res.status(5000).send({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).send({ message: "Category Not Found" });
    }
    let category = await Category.findOne({
      where: { id: +id },
      relations: { products: true },
    });
    let dataCategory = { ...category, totalItems: category?.products.length };
    res.send(dataCategory);
  } catch (error) {
   res.status(500).send({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let deletedCategory = await Category.delete(+id);
    res.send(deletedCategory);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

export default router;
