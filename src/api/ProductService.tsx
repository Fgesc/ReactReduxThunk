import ky from 'ky';
import type { Product } from '../types/Product';

export default class ProductService {
    static async getAll() {
        const data = await ky
            .get<
                Product[]
            >('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')
            .json();
        return data;
    }
}
