import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/products/productsApi';
import ProductCard from '../../components/ProductCard';

export default function Catalog() {
  const navigate = useNavigate();
  const { data: products = [], isLoading, isError, error, refetch } =
    useGetProductsQuery();

  const handleOpen = (product) => {
    navigate(`/employee/product/${product.id}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-4">Каталог</h1>

      {isLoading && (
        <div className="text-slate-400 text-center py-8">Загрузка...</div>
      )}

      {isError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300
                        rounded-2xl px-4 py-3">
          <p className="mb-2">
            Ошибка загрузки: {error?.status ?? 'неизвестно'}
          </p>
          <button onClick={refetch} className="text-sm underline">
            Повторить
          </button>
        </div>
      )}

      {!isLoading && !isError && products.length === 0 && (
        <div className="text-slate-400 text-center py-8">Товаров нет</div>
      )}

      {products.length > 0 && (
        <div className="space-y-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={handleOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
}