import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { Modal, Text, Stack, Button, Flex } from '@mantine/core';
import plus from '../../assets/plus.svg';
import minus from '../../assets/minus.svg';
import empty from '../../assets/cart_empty.png';
import { updateQuantity } from '../../reducers/CardSlice';

type ModalCardProps = {
    isOpenModal: boolean;
    onClose: () => void;
};

export const CardModal = ({ isOpenModal, onClose }: ModalCardProps) => {
    const dispatch = useTypedDispatch();
    const cardItems = useTypedSelector(state => state.cart.cardItems);

    const totalAmount = cardItems.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
    }, 0);

    return (
        <Modal
            data-testid="card-modal"
            opened={isOpenModal}
            onClose={onClose}
            radius={16}
            withCloseButton={false}
            styles={{
                content: {
                    position: 'fixed',
                    top: '72px',
                    right: '20px',
                },
            }}
        >
            {cardItems.length === 0 ? (
                <Stack align="center" gap={24} p="xl" style={{ minWidth: '301px' }}>
                    <img
                        data-testid="empty-card-img"
                        src={empty}
                        alt="Empty cart"
                        width={117}
                        height={106}
                    />
                    <Text
                        data-testid="empty-card-message"
                        w={150}
                        fw={400}
                        c={'#868E96'}
                        size="sm"
                        style={{ textAlign: 'center' }}
                    >
                        Your card is empty!
                    </Text>
                </Stack>
            ) : (
                <Stack gap={0} p="md">
                    {cardItems.map(({ product, quantity }) => (
                        <Flex
                            data-testid={`card-item-${product.id}`}
                            key={product.id}
                            align="center"
                            gap="md"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                width={64}
                                height={64}
                                style={{ borderRadius: 8 }}
                            />

                            <Flex style={{ borderBottom: '1px solid #DEE2E6' }} pb={18}>
                                <Stack w={200} h={64} gap={4} flex={1}>
                                    <Flex gap={12} align="center">
                                        <Text size="lg" fw={600}>
                                            {product.name.split(' ')[0]}
                                        </Text>
                                        <Text
                                            size="sm"
                                            c="#868E96"
                                            fw={600}
                                            style={{ fontFamily: 'Open Sans, sans-serif' }}
                                        >
                                            1 kg
                                        </Text>
                                    </Flex>

                                    <Text
                                        data-testid={`card-item-price-${product.id}`}
                                        size="xl"
                                        fw={600}
                                    >
                                        ${product.price}
                                    </Text>
                                </Stack>

                                <Flex gap={0} align="end">
                                    <Button
                                        data-testid={`card-item-decrement-${product.id}`}
                                        onClick={() => dispatch(updateQuantity({ productId: product.id, quantity: quantity - 1 }))}
                                        w={30}
                                        h={30}
                                        p={8}
                                        color="gray.3"
                                        style={{ borderRadius: 8 }}
                                    >
                                        <img src={minus} alt="minus" width={12} height={12} />
                                    </Button>

                                    <Text
                                        data-testid={`card-item-quantity-${product.id}`}
                                        ta="center"
                                        w={30}
                                        size="sm"
                                        fw={400}
                                    >
                                        {quantity}
                                    </Text>

                                    <Button
                                        data-testid={`card-item-increment-${product.id}`}
                                        onClick={() => dispatch(updateQuantity({ productId: product.id, quantity: quantity + 1 }))}
                                        w={30}
                                        h={30}
                                        p={8}
                                        color="gray.3"
                                        style={{ borderRadius: 8 }}
                                    >
                                        <img src={plus} alt="plus" width={12} height={12} />
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    ))}

                    <Flex
                        justify="space-between"
                        align="center"
                        pt={18}
                        mt={-1}
                        style={{ borderTop: '1px solid #DEE2E6' }}
                    >
                        <Text size="sm" fw={600}>
                            Total
                        </Text>
                        <Text data-testid="card-modal-total" size="sm" fw={600}>
                            ${totalAmount.toFixed(2)}
                        </Text>
                    </Flex>
                </Stack>
            )}
        </Modal>
    );
};
