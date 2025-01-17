import { useEffect, useState } from "react";
import { db } from "@/firebase";
import ProductCard from "@/components/ProductCard";
import { collection, query, getDocs, DocumentData } from "firebase/firestore";
import { Stack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminViewProduct = () => {
  const [products, setProducts] = useState<DocumentData>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"));
        const querySnapshot = await getDocs(q);
        const productsData: DocumentData = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Stack>
        {products.map((product: DocumentData) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            quantity={product.quantity}
            value={product.value}
            image={product.image}
          />
        ))}
        <Button onClick={() => navigate('/admin/product/add')}>Add New Product</Button>
      </Stack>
    </div>
  );
};

export default AdminViewProduct;
