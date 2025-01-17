import { useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { Card, Fieldset, Input, Stack } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
import { Field } from "@/components/ui/field";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
// import { toaster, Toaster } from "@/components/ui/toaster";

interface Product {
  id: string;
  name: string;
  image: string;
  quantity: number;
  value: number;
}

const AdminNewProduct = () => {
  //   const { id } = useParams<{ id: string }>(); // Retrieve the id from the URL
//   const [product, setProduct] = useState<Product | null>(null);
  const [formValues, setFormValues] = useState<Partial<Product>>({});

  const navigate = useNavigate();

  const handleInputChange = (field: keyof Product, value: string | number) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    // if (!id) return;
    try {
      const db = getFirestore();
      await addDoc(collection(db, "products"), {
        name: formValues.name,
        quantity: formValues.quantity,
        value: formValues.value,
        image: 'https://media.nedigital.sg/fairprice/90196727_XL1_20241204165400_ff1c41027fc0a42035a9328d621c2244.jpg'
      });
      navigate("/admin/product");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <Card.Root>
        <Fieldset.Root size="lg" maxW="md" padding={6}>
          <Stack>
            <Fieldset.Legend>Add Product Details</Fieldset.Legend>
            <Fieldset.HelperText>
              Please provide new product details below.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field label="Name">
              <Input
                name="name"
                value={formValues.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
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
                    handleInputChange("value", parseFloat(e.target.value) || 0)
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
    </>
  );
};

export default AdminNewProduct;
