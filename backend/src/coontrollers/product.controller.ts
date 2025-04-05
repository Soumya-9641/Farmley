import { Request, Response } from "express";
import Product from "../models/Product.model";



// Create a new product
export const createProduct = async (req: Request, res: Response) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
      res.status(500).json({ error: "Failed to create product" });
    }
  };
  

  // Get all products
export const getAllProducts = async (_req: Request, res: Response) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  };

  // Get single product by ID
export const getProductById = async (req: Request, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  };

  // Update a product by ID
export const updateProduct = async (req: Request, res: Response) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  };

  
  
// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  };

  export const bulkCreateProducts = async (req: Request, res: Response) => {
    try {
      if (!Array.isArray(req.body)) {
        return res.status(400).json({ error: "Request body should be an array of products" });
      }
  
      const products = await Product.insertMany(req.body);
      res.status(201).json({ message: `${products.length} products created successfully`, products });
    } catch (error) {
      res.status(500).json({ error: "Failed to create products", details: error });
    }
  }

  
export const getProductsByCategoryName = async (req: Request, res: Response) => {
    const { categoryName } = req.params;
  
    try {
      const products = await Product.find({ category: categoryName });
  
      if (products.length === 0) {
        return res.status(404).json({
          success: false,
          message: `No products found in category "${categoryName}"`
        });
      }
  
      return res.status(200).json({
        success: true,
        category: categoryName,
        total: products.length,
        products
      });
    } catch (error) {
      console.error('Error fetching category products:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch products',
        error
      });
    }
  };

  // export const getGroupedProducts = async (req: Request, res: Response) => {
  //   try {
  //     const categories = await Product.distinct('category');
  
  //     const groupedData = await Promise.all(
  //       categories.map(async (category) => {
  //         const products = await Product.find({ category }).limit(4);
  //         return { category, products };
  //       })
  //     );
  
  //     return res.status(200).json({
  //       success: true,
  //       data: groupedData
  //     });
  //   } catch (error) {
  //       console.log(error)
  //    // console.log('Error fetching grouped products:', error);
  //     return res.status(500).json({
  //       success: false,
  //       message: 'Failed to fetch grouped products',
  //       error
  //     });
  //   }
  // };


  // export const getGroupedProducts = async (req: Request, res: Response) => {
  //   try {
  //     const allProducts = await Product.find();
  
  //     const grouped: Record<string, any[]> = {};
  
  //     allProducts.forEach((product) => {
  //       const category = product.category;
  
  //       if (!grouped[category]) {
  //         grouped[category] = [];
  //       }
  
  //       if (grouped[category].length < 4) {
  //         grouped[category].push(product);
  //       }
  //     });
  
  //     const result = Object.entries(grouped).map(([category, products]) => ({
  //       category,
  //       products,
  //     }));
  
  //     return res.status(200).json({
  //       success: true,
  //       data: result,
  //     });
  //   } catch (error) {
  //     console.error('Error fetching grouped products:', error);
  //     return res.status(500).json({
  //       success: false,
  //       message: 'Failed to fetch grouped products',
        
  //     });
  //   }
  // };


  export const getGroupedProducts = async (req: Request, res: Response) => {
    try {
      const categories = await Product.distinct('category');
  
      const data = await Promise.all(
        categories.map(async (category) => {
          const products = await Product.find({ category }).limit(4);
          return { category, products };
        })
      );
  
      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error('Error fetching grouped products:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch grouped products'
       
      });
    }
  };


  
export const getProductSuggestions = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const baseProduct = await Product.findById(id);

    if (!baseProduct) return res.status(404).json({ message: "Product not found" });

    const priceRangeMin = baseProduct.price.offerPrice - 20;
    const priceRangeMax = baseProduct.price.offerPrice + 20;

    const suggestions = await Product.find({
      _id: { $ne: id }, // exclude current product
      $or: [
        {
          category: baseProduct.category,
          "price.offerPrice": { $gte: priceRangeMin, $lte: priceRangeMax },
        },
        {
          brand: baseProduct.brand,
        },
      ],
    }).limit(5); // limit if you want

    res.json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ message: "Server Error" });
  }
};