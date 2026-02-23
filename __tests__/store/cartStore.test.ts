import { act } from 'react-test-renderer';
import { useCartStore } from '@/src/store/cartStore';
import { Product } from '@/src/types';

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  description: 'Test Description',
  price: 100,
  image: 'test-image.jpg',
};

describe('CartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('adds item to cart', () => {
    const { addItem, items } = useCartStore.getState();
    
    act(() => {
      addItem(mockProduct);
    });

    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].quantity).toBe(1);
    expect(useCartStore.getState().total).toBe(100);
  });

  it('increments quantity if item exists', () => {
    const { addItem } = useCartStore.getState();
    
    act(() => {
      addItem(mockProduct);
      addItem(mockProduct);
    });

    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0].quantity).toBe(2);
    expect(useCartStore.getState().total).toBe(200);
  });

  it('removes item from cart', () => {
    const { addItem, removeItem } = useCartStore.getState();
    
    act(() => {
      addItem(mockProduct);
      removeItem(mockProduct.id);
    });

    expect(useCartStore.getState().items).toHaveLength(0);
    expect(useCartStore.getState().total).toBe(0);
  });
});
