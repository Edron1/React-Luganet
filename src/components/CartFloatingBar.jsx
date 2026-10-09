import { useNavigate } from 'react-router-dom';
import { useGetCartQuery } from '../features/cart/cartApi';

export default function CartFloatingBar() {
  const navigate = useNavigate();
  const { data: cart = [] } = useGetCartQuery();

  if (cart.length === 0) return null;

  const totalItems = cart.reduce(
    (sum, item) => sum + Number(item.quantity ?? 0),
    0
  );
  const totalPrice = cart.reduce(
    (sum, item) =>
        sum + Number(item.quantity ?? 0) * Number(item.offer?.price ?? 0),
    0
  );

  return (
    <button
      type="button"
      onClick={() => navigate('/employee/cart')}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-20
                 flex items-center gap-3 px-5 py-3 rounded-2xl
                 bg-blue-600 hover:bg-blue-700 text-white font-medium
                 shadow-2xl transition
                 max-w-[calc(100%-2rem)]"
    >
      <span className="text-lg">🛒</span>
      <span>{totalItems} шт</span>
      <span className="opacity-70">•</span>
      <span>{totalPrice.toFixed(0)} ₽</span>
    </button>
  );
}