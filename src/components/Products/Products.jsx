import "./Products.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const bestPickSlides = [
  {
    id: 1,
    src: "/images/p1.jpg",
    alt: "BEST Pick 1",
    title: "Memory",
    desc: "내추럴한 용지위에 깔끔한 서체로 예식정보만을 담은 담백한 무드의 청첩장",
    href: "",
  },
  {
    id: 2,
    src: "/images/p2.jpg",
    alt: "BEST Pick 2",
    title: "Sunlight",
    desc: "감각적인 영문 타이포 그래피와 컬러 색지 봉투로 완성도를 높인 웨딩 카드",
    href: "",
  },
  {
    id: 3,
    src: "/images/p3.jpg",
    alt: "BEST Pick 3",
    title: "Summer",
    desc: "투명한 아크릴로 제작하여 더욱 특별한 프리미엄 청첩장",
    href: "",
  },
  {
    id: 4,
    src: "/images/p4.jpg",
    alt: "BEST Pick 4",
    title: "The Mood",
    desc: "심플한 디자인에 실링 왁스 스티커가 고급스러움을 더해주는 청첩장",
    href: "",
  },
  {
    id: 5,
    src: "/images/p5.jpg",
    alt: "BEST Pick 5",
    title: "sunset",
    desc: "빛에 따라 고급스럽게 반짝이는 티아라가 돋보이는 청첩장",
    href: "",
  }
];

const INTERVAL_MS = 3000;
const SLIDE_WIDTH = 260;
const SLIDE_GAP = 24;
const STEP = SLIDE_WIDTH + SLIDE_GAP;

export default function Products() {
  const navigate = useNavigate();

  const handleMakeClick = (e, slide) => {
  e.preventDefault();
  e.stopPropagation();

  const token = localStorage.getItem("token");

  const payload = {
    productId: slide.id,
    image: slide.src,
    title: slide.title,
  };

  if (!token) {
    navigate("/login", {
      state: {
        redirectTo: "/invitation/maker",
        product: payload,
      },
    });
  } else {
    navigate("/invitation/maker", {
      state: {
        product: payload,
      },
    });
  }
};


  const slides = bestPickSlides;
  const total = slides.length;
  const extendedSlides = useMemo(() => [...slides, ...slides], [slides]);

  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
      setTick((prev) => prev + 1);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const handleTransitionEnd = () => {
    if (index >= total) {
      setEnableTransition(false);
      setIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setEnableTransition(true));
      });
    }
  };

  const handleProductClick = (e, href) => {
    if (!href) {
      e.preventDefault();
    }
  };

  const active = index % total;
  const prevActive = (active - 1 + total) % total;

  const isInitial = tick === 0 && index === 0;
  const isWrap = active === 0 && index !== 0;
  const shouldAnimate = !isInitial && !isWrap;

  const thumbW = 100 / total;
  const maxLeft = 100 - thumbW;

  const fromLeft = shouldAnimate
    ? Math.min((prevActive / total) * 100, maxLeft)
    : Math.min((active / total) * 100, maxLeft);

  const toLeft = Math.min((active / total) * 100, maxLeft);

    return (
    <section className="BestPick">
      <div className="BestPick-left">
        <div className="BestPick-title">
          BEST
          <br />
          Pick
        </div>
        <div className="BestPick-vLine" />
        <div className="BestPick-desc">
          많은 이야기와 추억, 기쁨과 설레임
          <br />
          그리고 감사한 마음 아름다운 
          <br />
          그 날을 위해 두 분의 이야기를 담습니다
        </div>
      </div>

      <div className="BestPick-right">
        <div className="carousel-viewport">
          <div
            className={`carousel-track ${enableTransition ? "is-anim" : "no-anim"}`}
            style={{ transform: `translateX(${-index * STEP}px)` }}
            onTransitionEnd={handleTransitionEnd}>
            {extendedSlides.map((s, i) => (
              <div className="carousel-slide" key={`${s.id}-${i}`}>
                <a
                  className="carousel-card"
                  href={s.href}
                  onClick={(e) => handleProductClick(e, s.href)}
                  aria-label={`${s.title} 구입 페이지 이동`}>
                  <img 
                    src={s.src} 
                    alt={s.alt} 
                    draggable="false" 
                    onClick={(e) => handleMakeClick(e, s)}
                  />
                  <div className="product-overlay">
                    <div className="product-title">{s.title}</div>
                    <div className="product-desc">{s.desc}</div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

      <div className="carousel-gauge">
          <div
            key={`thumb-${tick}`} 
            className="carousel-gauge-thumb"
            style={{
              "--fromLeft": `${fromLeft}%`,
              "--toLeft": `${toLeft}%`,
              "--thumbW": `${thumbW}%`,
              "--dur": shouldAnimate ? `${INTERVAL_MS}ms` : "0ms",
            }}
          />
        </div>
      </div>
    </section>
  );
}