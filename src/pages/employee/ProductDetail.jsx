import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../features/products/productsApi';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, isError, error, refetch } =
    useGetProductByIdQuery(id, { skip: !id });

  const handleBack = () => navigate(-1);

  return (
    <div>
      {/* Шапка */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={handleBack}
          className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10
                     flex items-center justify-center text-slate-300
                     transition"
          aria-label="Назад"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold text-white">Товар</h1>
      </div>

      {isLoading && (
        <div className="text-slate-400 text-center py-8">Загрузка...</div>
      )}

      {isError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-300
                        rounded-2xl px-4 py-3">
          <p className="mb-2">
            Ошибка: {error?.status ?? 'неизвестно'}
          </p>
          <button onClick={refetch} className="text-sm underline">
            Повторить
          </button>
        </div>
      )}

      {product && (
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h2 className="text-white text-lg font-semibold leading-snug flex-1">
                {product.name}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-md bg-white/10
                               text-slate-300 shrink-0">
                {product.kind}
              </span>
            </div>

            {product.description && (
              <p className="text-slate-400 text-sm mt-2">
                {product.description}
              </p>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <h3 className="text-slate-400 text-sm mb-3">Информация</h3>

            <Row label="Код" value={product.code} />
            {product.article && (
              <Row label="Артикул" value={product.article} />
            )}
            {product.unit?.name && (
              <Row label="Единица" value={product.unit.name} />
            )}
            {product.tax_rate?.name && (
              <Row
                label={product.tax_rate.name}
                value={`${product.tax_rate.rate}%`}
              />
            )}
          </div>

          {product.offers?.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 className="text-slate-400 text-sm mb-3">
                {product.offers.length > 1
                  ? 'Варианты'
                  : 'Предложение'}
              </h3>

              <div className="space-y-3">
                {product.offers.map((offer) => (
                  <OfferRow key={offer.id} offer={offer} />
                ))}
              </div>
            </div>
          )}

          <button
            disabled
            className="w-full py-3 rounded-xl bg-blue-600 text-white
                       font-medium opacity-50 cursor-not-allowed"
            title="Скоро"
          >
            Добавить в корзину
          </button>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="text-white text-right">{value}</span>
    </div>
  );
}

function OfferRow({ offer }) {
  const price = offer.price != null ? Number(offer.price) : null;
  const quantity = Number(offer.quantity ?? 0);

  return (
    <div className="flex items-center justify-between gap-3
                    bg-white/[0.03] rounded-xl px-3 py-2.5">
      <div className="text-sm text-slate-300">
        {offer.package ?? 'Основное предложение'}
      </div>
      <div className="text-right">
        <div className="text-white font-semibold">
          {price != null && price > 0 ? `${price} ₽` : '—'}
        </div>
        <div className={`text-xs ${
          quantity > 0 ? 'text-emerald-400' : 'text-slate-500'
        }`}>
          {quantity > 0 ? `${quantity} в наличии` : 'нет в наличии'}
        </div>
      </div>
    </div>
  );
}