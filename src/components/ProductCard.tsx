import { Stack, Text, Card, Button, HStack, Image } from "@chakra-ui/react";

interface ProductCardProps {
  id: string;
  name: string;
  value: number;
  quantity: number;
  image: string;
}

const ProductCard = ({ name, value, quantity, image }: ProductCardProps) => {
  return (
    <Card.Root overflow="hidden">
      <Image src={image} height={400} width={400}/>
      <Card.Body gap="2">
        <Card.Title>{name}</Card.Title>
        <HStack>
          <Stack>
            <Text>Quantity: {quantity}</Text>
            <Text>Value: {value}</Text>
          </Stack>
        </HStack>
      </Card.Body>
      <Card.Footer gap="2">
        <Button variant="ghost">Edit</Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default ProductCard;
