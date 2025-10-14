import { Text, Button, Badge, Flex } from '@mantine/core';
import shopIcon from '../../assets/shop.svg';
import { useTypedSelector } from '../../hooks/redux';
import styles from './header.module.css';

type HeaderProps = {
    isOpenModal: boolean;
    setIsOpenModal: (isOpenModal: boolean) => void;
};

export const Header = ({ setIsOpenModal, isOpenModal }: HeaderProps) => {
    const cardItems = useTypedSelector(state => state.card.cardItems);
    const totalItems = cardItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 59,
                maxWidth: '100%',
                margin: '0 auto',
                paddingLeft: 20,
                paddingRight: 20,
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: '#FFFFFF',
            }}
        >
            <Flex
                data-testid="header-logo"
                align="center"
                pl={12}
                h={33}
                gap={8}
                style={{
                    backgroundColor: '#F7F7F7',
                    borderRadius: 31,
                }}
            >
                <Text size="xl" fw={600}>
                    Vegetable
                </Text>
                <Text
                    fw={500}
                    c="#FFFFFF"
                    style={{
                        backgroundColor: '#54B46A',
                        fontSize: 20,
                        paddingLeft: 12,
                        paddingRight: 12,
                        borderRadius: 20,
                        lineHeight: '100%',
                        height: 33,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    SHOP
                </Text>
            </Flex>

            <Button
                data-testid="toggle-modal-button"
                onClick={() => setIsOpenModal(!isOpenModal)}
                leftSection={
                    totalItems > 0 ? (
                        <Badge
                            className={styles.badge__hover}
                            color="white"
                            c="black"
                            size="xs"
                            w={27}
                            h={24}
                            style={{ borderRadius: '50%' }}
                        >
                            {totalItems}
                        </Badge>
                    ) : null
                }
                rightSection={<img src={shopIcon} alt="Card" width={16} height={16} />}
                variant="filled"
                color="fresh-green"
                radius="md"
                h={44}
                px="md"
                fw={600}
                styles={{
                    root: {
                        width: 144,
                        fontSize: 16,
                    },
                }}
            >
                Card
            </Button>
        </header>
    );
};
