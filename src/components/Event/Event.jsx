import "./event.css";

export default function Event() {
    return (
        <section className="event-page">
            <div className="event-card">
                <img
                    src="./public/images/event.jpg"
                    className="event-image"
                />

                <div className="event-content">
                    <h1 className="event-title">
                        🎉 2월 한정 이벤트
                    </h1>
                    <p className="event-desc">
                        지금 가입하면 카드 제작 30% 할인 쿠폰을 드려요!
                    </p>
                    <button
                        className="event-button"
                        onClick={() => alert("참여 완료!")}>
                        이벤트 참여하기
                    </button>
                </div>
            </div>
        </section>
    );
}