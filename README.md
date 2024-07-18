# BASSER 악기 쇼핑몰

## Tech Stack

<div style='flex'>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/Firebase-DD2C00?style=flat&logo=Firebase&logoColor=white"/>
  <img src="https://img.shields.io/badge/ReactRouter-CA4245?style=flat&logo=ReactRouter&logoColor=white"/>
  <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat&logo=ReactQuery&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCss-56347Cstyle=flat&logo=TailwindCss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=Netlify&logoColor=white"/>
</div>

## 기능 설명

#### 라우팅

아래의 페이지는 React Router Outlet를 이용해서 헤더 밑에 나오게 만듬<br/>
/ : 홈 메인 배너와 제품들을 보여주는 페이지<br/>
/products : 모든 제품들을 보여주는 페이지<br/>
/products/:id : 제품 상세 페이지<br/>
/products/add : 어드민만 접근가능한 제품 등록 페이지<br/>
/cart: 로그인한 사용자만 접근 가능한 장바구니 페이지<br/><br/>

#### 로그인

파이어베이스 로그인 API를 사용한 구글 로그인 기능.<br/>
어드민이면 헤더에 제품등록 으로 접근 할 수 있는 연필버튼이 나옴.<br/>
로그인 했다면 헤더에 장바구니로 접근 할 수 있는 장바구니버튼이 나옴.
Context를 사용하여 프로젝트 전범위에서 활용 가능<br/><br/>

#### 제품 등록

어드민 사용자는 [이미지, 제품명, 카테고리, 가격, 설명, 옵션]란을 채우면 제품 등록 가능.<br/>
이미지는 Cloudinary에 저장되고, 나머지와 어드민 정보는 Firebase Realtime Database에 저장됨.<br/><br/>

#### 장바구니

로그인한 사용자는 제품을 장바구니에 담을 수 있음.<br/>
장바구니에 제품을 담으면 헤더의 장바구니에 제품의 개수가 업데이트 됨.<br/>
장바구니 페이지에서 수량을 더하거나 뺄 수 있음.<br/>
위 기능을 사용할 때 React Query Mutation을 통해 페이지와 DB가 실시간으로 업데이트 됨.<br/><br/>

## 기능

### 로그인

![로그인](https://github.com/user-attachments/assets/854ee259-5023-424b-8ce0-3a96e5c75594)

### 모든제품 '/products'

![모든제품](https://github.com/user-attachments/assets/bce8e14e-432b-4ace-aba9-38dd2e4e01cf)

### 어드민 제품등록 '/products/add'

![어드민제품등록](https://github.com/user-attachments/assets/d178cd23-0251-445b-b156-3c43d54d990c)

### 일반사용자 제품등록 제한

![일반사용자 제품등록](https://github.com/user-attachments/assets/a9859cd8-f9d6-4ca4-856a-6f96076ecbb6)

### 장바구니 추가

![장바구니추가](https://github.com/user-attachments/assets/62e451fe-8f30-4dd4-8bd7-59d43fc7ced2)
