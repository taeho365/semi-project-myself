import React, { useMemo } from "react";
import "./ProductsGrid.css";
import { useNavigate } from "react-router-dom";

const QTY_OPTIONS = [50, 100, 200, 450, 700, 1000];

const formatKRW = (value) =>
  new Intl.NumberFormat("ko-KR").format(value) + "원";

const PRODUCTS = [
  { id: 1, name: "Love is", image: "/images/wd.jpg", basePrice: 42000, badge: "Premium", badgeType: "premium" },
  { id: 2, name: "봄날", image: "/images/wd2.jpg", basePrice: 39000 },
  { id: 3, name: "티아라", image: "/images/wd3.jpg", basePrice: 48000, badge: "New", badgeType: "new" },
  { id: 4, name: "Delight Pink", image: "/images/wd4.jpg", basePrice: 27000, badge: "Steady", badgeType: "steady" },
  { id: 5, name: "The Wedding", image: "/images/wd5.jpg", basePrice: 42000 },
  { id: 6, name: "사랑빛", image: "/images/wd6.jpg", basePrice: 32500 },
  { id: 7, name: "BLANC II", image: "/images/wd7.jpg", basePrice: 45500 },
  { id: 8, name: "A NEW DAY", image: "/images/wd8.jpg", basePrice: 29000 },
  { id: 9, name: "샤이닝", image: "/images/wd9.jpg", basePrice: 47000 },
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

export default function ModernGrid() {
  return (
    <section className="pg-container">
      <div className="pg-titleBar">
        <h2 className="pg-title">Modern 청첩장</h2>
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