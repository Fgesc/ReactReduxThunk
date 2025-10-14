import { useState, useEffect } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { Header } from '../Header';
import { Main } from '../Main';
import { CardModal } from '../CardModal';
import { CustomLoader } from '../../ui/Loader';
import { fetchProducts } from '../../reducers/ProductsSlice';

function App() {
    const dispatch = useTypedDispatch();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const { productsList, loading, error } = useTypedSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts());

        const interval = setInterval(() => {
            dispatch(fetchProducts());
            console.log('вызвалась с интервалом 10 секунд');
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, [dispatch]);

    return (
        <>
            <Header setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal} />
            {error && (
                <h1 data-testid="app-error-message">Произошла ошибка: {error}</h1>
            )}
            <Main products={productsList} />
            {loading && <CustomLoader />}
            <CardModal isOpenModal={isOpenModal} onClose={() => setIsOpenModal(false)} />
        </>
    );
}

export default App;
