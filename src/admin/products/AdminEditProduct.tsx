import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Card, Fieldset, Input, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Field } from "@/components/ui/field";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  image: string;
  quantity: number;
  value: number;
}

const AdminEditProduct = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve the id from the URL
  const [product, setProduct] = useState<Product>();

  if (!id) {
    return <Text>No product found</Text>;
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const db = getFirestore();
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap) {
          console.error(`No Product with ID ${id} found`);
        }
        setProduct(docSnap.data() as Product);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <>
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
                <Input name="name" />
              </Field>

              <Field label="Quantity">
                <NumberInputRoot defaultValue="10">
                  <NumberInputField />
                </NumberInputRoot>
              </Field>

              <Field label="Value">
                <NumberInputRoot defaultValue="10">
                  <NumberInputField />
                </NumberInputRoot>
              </Field>

              {/* <Field label="Country">
                <NativeSelectRoot>
                  <NativeSelectField
                    name="country"
                    items={[
                      "United Kingdom (UK)",
                      "Canada (CA)",
                      "United States (US)",
                    ]}
                  />
                </NativeSelectRoot>
              </Field> */}
            </Fieldset.Content>

            <Button type="submit" alignSelf="flex-start">
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
