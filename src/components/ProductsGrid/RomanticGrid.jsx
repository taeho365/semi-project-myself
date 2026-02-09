import React, { useMemo } from "react";
import "./ProductsGrid.css";
import { useNavigate } from "react-router-dom";

const QTY_OPTIONS = [50, 100, 200, 450, 700, 1000];

const formatKRW = (value) =>
  new Intl.NumberFormat("ko-KR").format(value) + "원";

const PRODUCTS = [
  { id: 1, name: "Never Ending Love", image: "/images/wil1.jpg", basePrice: 92000, badge: "Premium", badgeType: "premium" },
  { id: 2, name: "Summer", image: "/images/wil2.jpg", basePrice: 70000 },
  { id: 3, name: "Married", image: "/images/wil3.jpg", basePrice: 60000, badge: "Select", badgeType: "select" },
  { id: 4, name: "BloSSome", image: "/images/wil4.jpg", basePrice: 59000 },
  { id: 5, name: "Our Love", image: "/images/wil5.jpg", basePrice: 65000 },
  { id: 6, name: "Miracle", image: "/images/wil6.jpg", basePrice: 52500, badge: "Best", badgeType: "best" },
  { id: 7, name: "Save The Date", image: "/images/wil7.jpg", basePrice: 57500 },
  { id: 8, name: "BLANC", image: "/images/wil8.jpg", basePrice: 45000 },
  { id: 9, name: "Eternal shine", image: "/images/wil9.jpg", basePrice: 85000 },
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

export default function ProductGrid() {
  return (
    <section className="pg-container">
      <div className="pg-titleBar">
        <h2 className="pg-title">Romantic 청첩장</h2>
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