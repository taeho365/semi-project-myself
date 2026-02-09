import "./SlideBanner.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SlideBanner({isLogin}) {
  
  const BASE = import.meta.env.BASE_URL;
  const banners = [
    {
      id: 0,
      image: `${BASE}images/vi03.jpg`,
      title: "Classic Design",
      desc: "Classic, Premium 고급스럽고 포멀한 디자인 청첩장",
      cta1: "상품목록 보기",
      cta2: "이벤트 보기",
      link1: "/classic",
      link2: "/event",
    },
    {
      id: 1,
      image: `${BASE}images/vi07.jpg`,
      title: "Modern Design",
      desc: "세련되고 현대적인 감성의 고급 청첩장 디자인",
      cta1: "상품목록 보기",
      cta2: "이벤트 보기",
      link1: "/modern",
      link2: "/event",
    },
    {
      id: 2,
      image: `${BASE}images/abc.jpg`,
      title: "Natural Design",
      desc: "자연의 싱그럽고 따뜻한 느낌을 살려주는 청첩장 디자인",
      cta1: "상품목록 보기",
      cta2: "이벤트 보기",
      link1: "/natural",
      link2: "/event",
    },
    {
      id: 3,
      image: `${BASE}images/vi01.jpg`,
      title: "Romantic Design",
      desc: "사랑스럽고 포근한 Romantic 디자인 청첩장",
      cta1: "상품목록 보기",
      cta2: "이벤트 보기",
      link1: "/romantic",
      link2: "/event",
    },
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const startAuto = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, 2000);
  };

  const stopAuto = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    if (isPaused) return;
    startAuto();
    
    return () => stopAuto();
    // app02 언마운트제어에서 배운 부분(클린업함수=>유즈이펙트가 리턴하는 함수)
  }, [isPaused]);

  const navigate = useNavigate();

  const onClickCTA = (link) => {
    navigate(link);
  };

  return (
    <section
      className="slideBanner"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`slide ${index === activeIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${banner.image})` }}
          aria-hidden={index !== activeIndex}
        >
          <div className="overlay" />
          <div className="content">
            <h2 className="title">{banner.title}</h2>
            <p className="desc">{banner.desc}</p>

            <div className="ctaWrap">
              <button
                className="ctaBtn primary"
                
                type="button"
                onClick={() => onClickCTA(banner.link1)}
              >
                {banner.cta1}
              </button>
              <button
                className="ctaBtn outline"
                onClick={() => onClickCTA(banner.link2)}
                type="button"
              >
                {banner.cta2}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* 인디케이터(점) */}
      <div className="dots">
        {banners.map((b, idx) => (
          <button
            key={b.id}
            className={`dot ${idx === activeIndex ? "on" : ""}`}
            onClick={(e) => {
              e.currentTarget.blur();
              setActiveIndex(idx);}}

            type="button"
          />
        ))}
      </div>
    </section>
  );
}
