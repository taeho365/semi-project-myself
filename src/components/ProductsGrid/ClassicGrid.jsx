import React, { useMemo } from "react";
import "./ProductsGrid.css";
import { useNavigate } from "react-router-dom";

const QTY_OPTIONS = [50, 100, 200, 450, 700, 1000];

const formatKRW = (value) =>
  new Intl.NumberFormat("ko-KR").format(value) + "원";

const PRODUCTS = [
  { id: 1, name: "우리의 순간", image: "/images/wedding.jpg", basePrice: 54000, badge: "Best", badgeType: "best" },
  { id: 2, name: "Of love", image: "/images/wedding2.jpg", basePrice: 42000, badge: "New", badgeType: "new" },
  { id: 3, name: "리틀 트윙클", image: "/images/wedding3.jpg", basePrice: 61000 },
  { id: 4, name: "The Honeymoon", image: "/images/wedding4.jpg", basePrice: 39000 },
  { id: 5, name: "For Love", image: "/images/wedding5.jpg", basePrice: 45000 },
  { id: 6, name: "로즈가든", image: "/images/wedding6.jpg", basePrice: 52500 },
  { id: 7, name: "스노우 엔젤", image: "/images/wedding7.jpg", basePrice: 27500 },
  { id: 8, name: "Flora & Mood", image: "/images/wedding8.jpg", basePrice: 35000, badge: "Select", badgeType: "select" },
  { id: 9, name: "Gentle Invite", image: "/images/wedding9.jpg", basePrice: 55000 },
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

export default function ClassicGrid() {
  return (
    <section className="pg-container">
      <div className="pg-titleBar">
        <h2 className="pg-title">Classic 청첩장</h2>
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