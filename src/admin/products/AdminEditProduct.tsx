import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { Card, Fieldset, Input, Stack, Text } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { Field } from "@/components/ui/field";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { Button } from "@/components/ui/button";
// import { toaster, Toaster } from "@/components/ui/toaster";

interface Product {
  id: string;
  name: string;
  image: string;
  quantity: number;
  value: number;
}

const AdminEditProduct = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve the id from the URL
  const [product, setProduct] = useState<Product | null>(null);
  const [formValues, setFormValues] = useState<Partial<Product>>({});

  const navigate = useNavigate();

  if (!id) {
    return <Text>No product found</Text>;
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const db = getFirestore();
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as Product;
          setProduct(data);
          setFormValues(data); // Initialize form values with fetched product data
        } else {
          console.error(`No Product with ID ${id} found`);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (field: keyof Product, value: string | number) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!id) return;
    try {
      const db = getFirestore();
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, formValues);
      // toaster.create({
      //   title: "Update successful",
      //   description: `Edit of ${formValues.name} successful`
      // })
      navigate('/admin/product')
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      {/* <Toaster /> */}
      {product ? (
        <Card.Root>
          <Fieldset.Root size="lg" maxW="md" padding={6}>
            <Stack>
              <Fieldset.Legend>Edit Product Details</Fieldset.Legend>
              <Fieldset.HelperText>
                Please provide updated product details below.
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <Field label="Name">
                <Input
                  name="name"
                  value={formValues.name || ""}
                  onChange={(e) =>
                    handleInputChange("name", e.target.value)
                  }
                />
              </Field>

              <Field label="Quantity">
                <NumberInputRoot>
                  <NumberInputField
                    value={formValues.quantity || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "quantity",
                        parseInt(e.target.value, 10) || 0
                      )
                    }
                  />
                </NumberInputRoot>
              </Field>

              <Field label="Value">
                <NumberInputRoot>
                  <NumberInputField
                    value={formValues.value || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "value",
                        parseFloat(e.target.value) || 0
                      )
                    }
                  />
                </NumberInputRoot>
              </Field>
            </Fieldset.Content>

            <Button onClick={handleSubmit} alignSelf="flex-start">
              Submit
            </Button>
          </Fieldset.Root>
        </Card.Root>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};

export default AdminEditProduct;
