# Book Manager (Fetch API + MockAPI CRUD)

## Deployment

GitHub: https://github.com/2026-2-OSS/assign09-c01-22100072

Vercel: https://2026assign09.vercel.app

MockAPI Endpoint: https://6ae7384a56b2ee1e5440352e.mockapi.io/books

## Service

주제: 도서 관리

Field: id, title, author, price, year, genre

GET 목록 조회 / POST 등록 / PATCH 수정 / DELETE 삭제

Validation: 제목·저자 필수, 가격 0 이상, 출판연도 1900~2026

검색: 제목이 일치하는 도서 표시

## Key Learning

1. fetch()는 Promise를 반환하고, 404 같은 HTTP 오류는 response.ok로 직접 확인해야 한다는 것을 배움.
2. async/await와 then/catch로 비동기 요청의 성공과 실패를 나눠 처리할 수 있다는 것을 배움.
3. REST API는 같은 주소에 Method(GET/POST/PATCH/DELETE)를 바꿔 CRUD를 구분한다는 것을 배움.

## AI / Search Usage

도구: Claude

사용 목적: 문법 질문

AI가 작성한 것: HTML head부분, 문법적으로 틀린 부분들
도움받은 문법:

`HTTP ${response.status}`를 써야 할 때 문법이 기억나지 않아 도움받음.

`method: "POST"`, `headers: { "Content-Type": "application/json" }`, `body: JSON.stringify(book)`에서 콤마를 사용해야 한다는 것을 몰라 도움받음.

`${API_URL}/${id}`라는 주소 문법이 어려워 도움받음.

본인 추정 AI 코드 기여율: 30%

## Problem & Solution / Reflection

문법적인 부분들이 많이 기억이 안남