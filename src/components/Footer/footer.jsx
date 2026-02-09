import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer" aria-label="footer">
      {/* footer 안쪽 컨텐츠 폭 제한 + 가운데 정렬 + 패딩 담당 박스임 */}
      <div className="footer-inner">
        
        <div className="footer-grid">
          
          
          <section className="f-col f-center" aria-label="customer service">
            
      
            <p className="f-text">평일 10:00 - 18:00 (점심 12:30 - 13:30)</p>

            
            <p className="f-text">주말/공휴일 휴무</p>
          </section>
        </div>

         

        
        <div className="f-divider" />

        
        <div className="footer-bottom">
          
          <div className="f-company">
            
            <p>

              <span className="k">고객센터</span> 1588-1111

              <span className="sep">|</span>
              
              <span className="k">상호</span> 주식회사 우리결혼했어요
              
              <span className="sep">|</span>
              
              <span className="k">대표</span> 송태호
              
              <span className="sep">|</span>
              
              <span className="k">사업자등록번호</span> 111-11-11111
            </p>

            
            <p>
              
              <span className="k">통신판매업</span> 제2026-경기성남-1111호
              
              <span className="sep">|</span>
              
              <span className="k">주소</span> 경기도 성남시 분당구 분당로 111, 1층
            </p>

            
            <p>
              
              <span className="k">개인정보관리책임자</span> 송태호
              
              <span className="sep">|</span>
              
              <span className="k">이메일</span> Taeho@wedding.com
            </p>
          </div>

          
          <p className="f-copy">© 2026 Taeho Wedding Co., Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
