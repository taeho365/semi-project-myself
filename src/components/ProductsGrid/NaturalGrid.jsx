import React, { useMemo } from "react";
import "./productsGrid.css";
import { useNavigate } from "react-router-dom";

const QTY_OPTIONS = [50, 100, 200, 450, 700, 1000];

const formatKRW = (value) =>
  new Intl.NumberFormat("ko-KR").format(value) + "원";

const PRODUCTS = [
  { id: 1, name: "Our Wedding Day", image: "/images/Natural1.jpg", basePrice: 92000, badge: "Premium", badgeType: "premium" },
  { id: 2, name: "Grace, Lake, Couple", image: "/images/Natural2.jpg", basePrice: 70000, badge: "Best", badgeType: "best" },
  { id: 3, name: "Couple on the Hill", image: "/images/Natural3.jpg", basePrice: 60000, badge: "Steady", badgeType: "steady" },
  { id: 4, name: "Evening Sky Kiss", image: "/images/Natural4.jpg", basePrice: 59000 },
  { id: 5, name: "Film and Couple", image: "/images/Natural5.jpg", basePrice: 65000 },
  { id: 6, name: "Sea and Couple", image: "/images/Natural6.jpg", basePrice: 52500 },
  { id: 7, name: "A Porch in Grace", image: "/images/Natural7.jpg", basePrice: 57500 },
  { id: 8, name: "Couple Dance in Green", image: "/images/Natural8.jpg", basePrice: 45000 },
  { id: 9, name: "Couple Dance Flower", image: "/images/Natural9.jpg", basePrice: 85000 },
];

function ProductCard({ product, isFirst }) {
  const [qty, setQty] = React.useState(50);
  const navigate = useNavigate();

  const price = useMemo(() => {
    const raw = product.basePrice * (qty / 50);
    return Math.round(raw / 100) * 100;
  }, [product.basePrice, qty]);

  const goMakeInvitation = () => {
    navigate("/invitation/maker", {
      state: {
        product: {
          id: product.id,
          image: product.image,
          name: product.name,
          basePrice: product.basePrice,
        },
      },
    });
  };

  return (
    <div className="pg-card">
      <div className="pg-imageWrap">
        <div className="pg-mediaBox">
          {product.badge && (
            <div className={
                product.badgeType
                  ? `pg-premiumBadge pg-badge--${product.badgeType}`
                  : "pg-premiumBadge"
              }
            >
              {product.badge}
            </div>
          )}
          <img
            className="pg-image"
            src={product.image}
            alt={product.name}
            onClick={goMakeInvitation}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="pg-nameOverlay">{product.name}</div>
      </div>

      <div className="pg-meta">
        <div className="pg-priceRow">
          <div className="pg-price">{formatKRW(price)}</div>
            <div className="pg-rightControls">
            <select
              className="pg-qtySelect"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {QTY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.toLocaleString("ko-KR")}장
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NaturalGrid() {
  return (
    <section className="pg-container">
      <div className="pg-titleBar">
        <h2 className="pg-title">NATURAL 청첩장</h2>
        <p className="pg-subTitle">총 {PRODUCTS.length}개</p>
      </div>
      <div className="pg-grid">
        {PRODUCTS.map((p, idx) => (
          <ProductCard key={p.id} product={p} isFirst={idx === 0} />
        ))}
      </div>
    </section>
  );
}