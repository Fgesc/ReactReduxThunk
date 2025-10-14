import { useState } from 'react';
import { useTypedDispatch } from '../../hooks/redux';
import { Card, Image, Text, Group, Button, Flex } from '@mantine/core';
import plus from '../../assets/plus.svg';
import minus from '../../assets/minus.svg';
import shopIconGreen from '../../assets/shopGreen.svg';
import loader from '../../assets/loader.svg';
import type { Product } from '../../types/Product';
import { addToCard } from '../../reducers/CardSlice';

type ProductCardProps = {
    product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
    const dispatch = useTypedDispatch();
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = () => {
        dispatch(addToCard({ product, quantity }));
    };

    const cardTestId = `product-card-${product.id}`;
    const decrementButtonTestId = `decrement-button-${product.id}`;
    const quantityTextTestId = `quantity-text-${product.id}`;
    const incrementButtonTestId = `increment-button-${product.id}`;
    const addToCardButtonTestId = `add-to-card-button-${product.id}`;
    const productImage = `product-card-image-${product.id}`;

    return (
        <Card
            data-testid={cardTestId}
            radius={24}
            withBorder
            w={302}
            h={414}
            p={16}
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Card.Section p={16}>
                <Flex
                    align="center"
                    justify="center"
                    h={276}
                    bg={'#F3F5FA'}
                    style={{ borderRadius: 8 }}
                >
                    {product.image ? (
                        <Image
                            data-testid={productImage}
                            src={product.image}
                            alt={product.name}
                            height={276}
                            fit="cover"
                        />
                    ) : (
                        <Image src={loader} alt="loader" width={22} height={19} fit="contain" />
                    )}
                </Flex>
            </Card.Section>

            <Group w={270} gap={15} justify="space-between">
                <Flex wrap="nowrap" align="center" gap={12} h={28}>
                    <Text size="lg" fw={600}>
                        {product.name.split(' ')[0]}
                    </Text>
                    <Text
                        size="sm"
                        fw={600}
                        c={'#868E96'}
                        style={{ fontFamily: 'Open Sans, sans-serif' }}
                    >
                        1 kg
                    </Text>
                </Flex>

                <Group gap={0} wrap="nowrap">
                    <Button
                        data-testid={decrementButtonTestId}
                        onClick={decrement}
                        disabled={quantity <= 1}
                        w={30}
                        h={30}
                        p={8}
                        color="gray.3"
                        style={{
                            borderRadius: 8,
                            opacity: quantity == 1 ? 0.5 : 1,
                        }}
                    >
                        <img
                            src={minus}
                            alt="minus"
                            width={12}
                            height={12}
                            style={{ opacity: quantity == 1 ? 0.5 : 1 }}
                        />
                    </Button>
                    <Text data-testid={quantityTextTestId} ta="center" w={30} fw={400} size="sm">
                        {quantity}
                    </Text>
                    <Button
                        data-testid={incrementButtonTestId}
                        onClick={increment}
                        disabled={quantity == 10}
                        w={30}
                        h={30}
                        p={8}
                        color="gray.3"
                        style={{
                            borderRadius: 8,
                            opacity: quantity == 10 ? 0.5 : 1,
                        }}
                    >
                        <img
                            src={plus}
                            alt="plus"
                            width={12}
                            height={12}
                            style={{ opacity: quantity == 10 ? 0.5 : 1 }}
                        />
                    </Button>
                </Group>
            </Group>

            <Group mt="auto" justify="space-between" align="center">
                <Text size="lg" fw={600}>
                    ${product.price}
                </Text>
                <Button
                    data-testid={addToCardButtonTestId}
                    onClick={handleAddToCart}
                    color="fresh-green.1"
                    c={'#3B944E'}
                    w={204}
                    h={44}
                    fz={16}
                    rightSection={<img src={shopIconGreen} alt="Card" width={16} height={16} />}
                    style={{ borderRadius: 8 }}
                    fw={600}
                >
                    Add to card
                </Button>
            </Group>
        </Card>
    );
};
