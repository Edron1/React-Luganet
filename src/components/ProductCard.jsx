export default function ProductCard({ product, onOpen }) {
  const { name, kind, unit, offer } = product;

  const quantity = Number(offer?.quantity ?? 0);
  const price = offer?.price != null ? Number(offer.price) : null;

  return (
    <button
      type="button"
      onClick={() => onOpen?.(product)}
      className="w-full text-left bg-white/5 border border-white/10
                 rounded-2xl p-4 transition hover:bg-white/[0.07]
                 active:bg-white/[0.09]"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-white font-medium leading-snug flex-1">
          {name}
        </h3>
        <span className="text-xs px-2 py-0.5 rounded-md bg-white/10
                         text-slate-300 shrink-0">
          {kind}
        </span>
      </div>

      <div className="flex items-end justify-between gap-3">
        <div>
          {price != null && price > 0 ? (
            <div className="text-white font-semibold text-lg">
              {price} ₽
            </div>
          ) : (
            <div className="text-slate-500 text-sm">цена не указана</div>
          )}
        </div>

        <div className="text-right text-xs">
          {unit && <div className="text-slate-400 mb-1">{unit}</div>}
          {quantity > 0 ? (
            <div className="text-emerald-400">{quantity} в наличии</div>
          ) : (
            <div className="text-slate-500">нет в наличии</div>
          )}
        </div>
      </div>
    </button>
  );
}