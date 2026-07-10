# 홍천 모터수리·펌프수리 - 파워펌프 양평서비스센터

홍천 지역 모터수리, 펌프수리, 윌로펌프, 지하수펌프, 심정수중모터, 압력탱크 출장 수리 전문 웹사이트입니다.

## 로컬 미리보기

아무 정적 서버를 사용하면 됩니다.

```bash
# Python 3
python3 -m http.server 8000

# Node.js (npx)
npx serve .
```

브라우저에서 `http://localhost:8000` 으로 접속하세요.

## Netlify 배포 방법

### 방법 1: 드래그 & 드롭
1. [Netlify](https://app.netlify.com) 로그인
2. Sites 페이지에서 프로젝트 폴더를 드래그 & 드롭

### 방법 2: Git 연결
1. 이 프로젝트를 GitHub 저장소에 푸시
2. Netlify에서 "Import an existing project" 선택
3. GitHub 저장소 연결
4. Build command: 비워두기 (정적 사이트)
5. Publish directory: `.` (루트)
6. Deploy

### 방법 3: Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

## 배포 후 변경 필요 사항

- [ ] `/images/` 폴더에 실제 작업 사진 추가 (work-1.jpg, work-2.jpg, work-3.jpg)
- [x] `/images/og-image.svg` Open Graph 이미지 추가 (1200x630px)
- [ ] 도메인 연결 후 `index.html`의 canonical URL, og:url, og:image URL 변경
- [ ] `sitemap.xml`의 URL 변경
- [ ] `robots.txt`의 Sitemap URL 변경
- [ ] 네이버 서치어드바이저 메타 태그 추가
- [ ] 구글 서치 콘솔 등록
- [ ] 영업시간 확인 후 JSON-LD의 openingHoursSpecification 수정
- [ ] 사업자등록번호 등 필요한 법적 정보 추가
