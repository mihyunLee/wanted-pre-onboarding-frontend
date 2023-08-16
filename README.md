# 원티드 프리온보딩 인턴십 8월 사전과제

원티드 프리온보딩 인턴십 선발 사전과제로 진행한 프로젝트입니다.

> 지원자: 이미현

## 테스트 계정
```
email: mihyun@test.com
pw: 123123123
```

<br />

# 🚀 Getting Started

## 배포 링크

https://mihyun-pre-onboarding.netlify.app/signup

## 설치

```
$ git clone https://github.com/mihyunLee/wanted-pre-onboarding-frontend.git
$ npm install
```

## 실행

```
$ npm start
```

<br />

# 🤝 Commit Convention

| 태그          | 설명                                                           |
| ------------- | -------------------------------------------------------------- |
| `✨ feat:`     | 새로운 기능 추가                                               |
| `🐛 fix:`      | 버그 해결                                                      |
| `💄 design:`   | CSS 등 사용자 UI 디자인 변경                                   |
| `🎨 style:`    | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우          |
| `♻️ refactor:` | 프로덕션 코드 리팩토링                                         |
| `💬 comment:`  | 필요한 주석 추가 및 변경                                       |
| `📝 docs:`     | 문서를 수정한 경우                                             |
| `⚙️ chore:`    | 빌드 테스크 업데이트, 패키지 매니저 설정(프로덕션 코드 변경 X) |
| `🔃 rename:`   | 파일 혹은 폴더명을 수정하거나 옮기는 작업                      |
| `🚚 remove:`   | 파일을 삭제하는 작업만 수행한 경우                             |
| `🎉 Init Commit`   | 초기 커밋을 진행한 경우                            |

<br />

# ✅ Feature

- [x] 이메일, 비밀번호 유효성 검사의 중복 로직을 ustom hooks를 사용하여 구현하였습니다.
- [x] axios interceptor를 사용하여 api 호출시 필요한 content-type, token과 같은 헤더값을 한번에 처리하였습니다.
- [x] styled-components를 사용하여 디자인의 재사용성을 높였습니다.
- [x] 공통 컴포넌트를 제작하여 유지보수 및 재사용성을 고려하였습니다.


