import { useState, useEffect } from 'react';
import './InvitationMaker.css';
import { useLocation } from "react-router-dom";

export default function InvitationMaker() {
  const location = useLocation();

  const productImage =
    location.state?.product?.image;
  
  const [formData, setFormData] = useState({
    date: '2026-02-02',
    time: '10:30',
    venue: '',
    groomName: '',
    groomFather: '',
    groomMother: '',
    brideName: '',
    brideFather: '',
    brideMother: '',
    message: `저희 두 사람이 사랑으로
하나되는 자리에
소중한 분들을 모시고자 합니다.
    
오셔서 축복해 주시면
큰 기쁨으로 간직하겠습니다.`,
    theme: 'classic'
  });

  // 저장된 데이터 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('weddingInvitation');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleThemeSelect = (theme) => {
    setFormData(prev => ({
      ...prev,
      theme
    }));
  };

  const handleReset = () => {
    if (window.confirm('입력한 내용을 모두 초기화하시겠습니까?')) {
      setFormData({
        date: '2026-02-02',
        time: '10:30',
        venue: '',
        groomName: '',
        groomFather: '',
        groomMother: '',
        brideName: '',
        brideFather: '',
        brideMother: '',
        message: `저희 두 사람이 사랑으로
하나되는 자리에
소중한 분들을 모시고자 합니다.

오셔서 축복해 주시면
큰 기쁨으로 간직하겠습니다.`,
        theme: 'classic'
      });
    }
  };

  const handleSave = () => {
    localStorage.setItem('weddingInvitation', JSON.stringify(formData));
    alert('청첩장이 저장되었습니다! 🎉');
  };

  // 날짜 포맷팅
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const dayName = days[date.getDay()];
    return { formatted: `${year} / ${month} / ${day}`, dayName };
  };

  // 시간 포맷팅
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const period = hour < 12 ? '오전' : '오후';
    const displayHour = hour % 12 || 12;
    return `${period} ${displayHour}시 ${minutes}분`;
  };

  const { formatted: formattedDate, dayName } = formatDate(formData.date);
  const formattedTime = formatTime(formData.time);

  const themes = [
    { id: 'classic', name: '화이트' },
    { id: 'modern', name: '핑크' },
    { id: 'elegant', name: '블루' },
    { id: 'minimal', name: '베이지' }
  ];

  return (
    <>
      
      <div className="invitation-maker">
        <div className="container">
          {/* 편집 섹션 */}
          <div className="editor-section">
            <section className="form-section">
              <h2 className="section-title">기본 정보</h2>
              
              <div className="form-group">
                <label className="form-label">날짜</label>
                <input
                  type="date"
                  name="date"
                  className="form-input"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">시간</label>
                <input
                  type="time"
                  name="time"
                  className="form-input"
                  value={formData.time}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">장소</label>
                <input
                  type="text"
                  name="venue"
                  className="form-input"
                  placeholder="장소"
                  value={formData.venue}
                  onChange={handleInputChange}
                />
              </div>
            </section>

            <section className="form-section">
              <h2 className="section-title">신랑 정보</h2>
              
              <div className="name-row">
                <div className="form-group">
                  <label className="form-label">아버지</label>
                  <input
                    type="text"
                    name="groomFather"
                    className="form-input"
                    placeholder="성함"
                    value={formData.groomFather}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">어머니</label>
                  <input
                    type="text"
                    name="groomMother"
                    className="form-input"
                    placeholder="성함"
                    value={formData.groomMother}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">신랑</label>
                <input
                  type="text"
                  name="groomName"
                  className="form-input"
                  placeholder="신랑 성함"
                  value={formData.groomName}
                  onChange={handleInputChange}
                />
              </div>
            </section>

            <section className="form-section">
              <h2 className="section-title">신부 정보</h2>
              
              <div className="name-row">
                <div className="form-group">
                  <label className="form-label">아버지</label>
                  <input
                    type="text"
                    name="brideFather"
                    className="form-input"
                    placeholder="성함"
                    value={formData.brideFather}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">어머니</label>
                  <input
                    type="text"
                    name="brideMother"
                    className="form-input"
                    placeholder="성함"
                    value={formData.brideMother}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">신부</label>
                <input
                  type="text"
                  name="brideName"
                  className="form-input"
                  placeholder="신부 성함"
                  value={formData.brideName}
                  onChange={handleInputChange}
                />
              </div>
            </section>

            <section className="form-section">
              <h2 className="section-title">초대 메시지</h2>
              
              <div className="form-group">
                <label className="form-label">메시지</label>
                <textarea
                  name="message"
                  className="form-input form-textarea"
                  placeholder="초청 메시지를 입력하세요"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>
            </section>

            <section className="form-section">
              <h2 className="section-title">테마 선택</h2>
              
              <div className="template-grid">
                {themes.map(theme => (
                  <div
                    key={theme.id}
                    className={`template-item ${formData.theme === theme.id ? 'active' : ''}`}
                    onClick={() => handleThemeSelect(theme.id)}
                  >
                    <div className="template-name">{theme.name}</div>
                  </div>
                ))}
              </div>
            </section>

            <div className="action-buttons">
              <button className="btn btn-secondary" onClick={handleReset}>
                초기화
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                저장하기
              </button>
            </div>
          </div>

          {/* 미리보기 섹션 */}
          <div className="preview-section">
            <h2 className="section-title">미리보기</h2>
              <div
                className="phone-frame"
                style={{
                  backgroundImage: `url(${productImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
              <div className={`invitation-preview theme-${formData.theme}`}>
                <div className="preview-date">{formattedDate}</div>
                <div className="preview-day">{dayName}</div>
                
                <div className="preview-divider"></div>
                
                <div className="preview-invitation">INVITATION</div>
                <div className="preview-title">소중한 분들을 초대합니다</div>
                
                <div className="preview-message">{formData.message}</div>
                
                <div className="preview-divider"></div>
                <div className="preview-center">
                  <div className="preview-names">
                    <div className="preview-name">{formData.groomFather || '아버지'} </div>
                    <div className='dot'> ● </div>
                    <div className="preview-name">{formData.groomMother || '어머니'} </div>
                    <div className="spacebar">의 장남 </div>
                    <div className="preview-name">{formData.groomName || '신랑 성함'}</div>
                  </div>
                  
                  <div className="preview-names">
                    <div className="preview-name">{formData.brideFather || '아버지'} </div>
                    <div className='dot'> ● </div>
                    <div className="preview-name">{formData.brideMother || '어머니'} </div>
                    <div className="spacebar">의 장녀 </div>
                    <div className="preview-name">{formData.brideName || '신부 성함'}</div>
                  </div>  
                </div>
                <div className="preview-divider"></div>
                
                <div className="preview-details">
                  <div className="preview-time">{formattedTime}</div>
                  <div className="preview-venue">{formData.venue || '장소를 입력해주세요'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}