import { memo } from 'react';
import { Grid } from '@mantine/core';
import type { Product } from '../../types/Product';
import { ProductCard } from '../ProductCurd';

type ProductListProp = {
    products: Array<Product>;
};

export const Main = memo(({ products }: ProductListProp) => {
    return (
        <main data-testid="main-content" style={{ padding: '16px' }}>
            <Grid
                data-testid="products-grid"
                gutter="24"
                style={{ maxWidth: '1280px', margin: '0 auto' }}
            >
                {products.map(product => (
                    <Grid.Col
                        key={product.id}
                        span={{
                            base: 12,
                            xs: 6,
                            sm: 6,
                            md: 4,
                            lg: 3,
                        }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <ProductCard product={product} />
                    </Grid.Col>
                ))}
            </Grid>
        </main>
    );
});
