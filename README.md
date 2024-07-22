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
/cart: 로그인한 사용자만 접근 가능한 장바구니 페이지<br/>
/order : 장바구니에서 주문하기로 결정한 상품들의 정보를 보여주고 상품을 결제하는 페이지<br/>
/order/result : 주문후 유의사항과 직전에 주문한 상품들의 정보를 보여주는 페이지<br/>
/order/recipt : 본인의 주문내역 페이지<br/>
/order/:paymentId : 이전에 주문한 상품들의 정보를 보여주는 주문상세보기 페이지<br/>
/order/handle : 어드민만 접근 가능한 모든 유저의 주문을 간략하게 볼 수 있는 주문처리 페이지<br/>
/order/handle/:paymentId : 고객이 주문한 상품들과 배송정보를 보여주고 이를 참고하여 특정 주문을 다음단계로 처리하는 페이지<br/>

#### 로그인

파이어베이스 로그인 API를 사용한 구글 로그인 기능.<br/>
어드민이면 헤더에 제품등록으로 접근할 수 있는 연필버튼이 나옴.<br/>
어드민이면 헤더에 주문처리로 접근할 수 있는 화물차버튼이 나옴.<br/>
로그인 했다면 헤더에 주문내역으로 접근할 수 있는 체크리스트버튼이 나옴.<br/>
로그인 했다면 헤더에 장바구니로 접근할 수 있는 장바구니버튼이 나옴.<br/>
로그인 상태는 Context를 사용하여 프로젝트 전범위에서 활용 가능<br/><br/>

#### 제품 등록

어드민 사용자는 [이미지, 제품명, 카테고리, 가격, 설명, 옵션]란을 채우면 제품 등록 가능.<br/>
이미지는 Cloudinary에 저장되고, 나머지와 어드민 정보는 Firebase Realtime Database에 저장됨.<br/><br/>

#### 장바구니

로그인한 사용자는 제품을 장바구니에 담을 수 있음.<br/>
장바구니에 제품을 담으면 헤더의 카트에 제품의 개수가 업데이트 됨.<br/>
장바구니 페이지에서 수량을 더하거나 뺄 수 있음.<br/>
주문하기로 정한 제품을 체크하면 해당 제품만 주문할 수 있음.<br/>
장바구니에 선택한 제품이 없으면 주문이 불가능.<br/>
위 기능을 사용할 때 React Query Mutation을 통해 페이지와 DB가 실시간으로 업데이트 됨.<br/><br/>

#### 주문하기

로그인한 사용자는 장바구니에서 체크했던 제품을 주문할 수 있음.<br/>
단 배송을 위한 양식을 채워야만 주문 할 수 있음.<br/>
주문한 제품들과 가격정보를 확인할 수 있음.<br/><br/>

#### 주문확인하기

결제가 완료되면 주문결과 페이지로 이동함.<br/>
배송유의 사항과 함께 결제한 제품들과 가격정보를 확인할 수 있음.<br/>
헤더에서 본인의 주문내역 접근 가능함.<br/>
주문내역이 있다면 헤더의 주문내역 개수가 업데이트됨<br/><br/>

#### 결제하기

로그인한 사용자는 주문할 제품을 결제할 수 있음.<br/>
결제API는 포트원의 토스페이먼츠를 사용했음.<br/><br/>

#### 주문처리 하기

어드민 사용자는 일반사용자와 어드민사용자의 모든 주문을 처리할 수 있음.<br/>
처리 순서는 (결제완료 - 주문확인 - 배송중 - 배송완료)임.<br/>
주문건을 누르면 주문상세 페이지로 이동함.<br/>
주문상세 페이지에서 버튼을 통해 주문을 다음단계로 처리할 수 있음.<br/><br/>

## 기능

### 일반사용자 로그인

![사용자로그인](https://github.com/user-attachments/assets/c0330485-e0e9-4600-b149-bc8c4013c389)

### 어드민 로그인

![어드민로그인](https://github.com/user-attachments/assets/2697c91f-d1d3-48de-8176-adfbb6930616)

### 모든제품 '/products'

![모든제품](https://github.com/user-attachments/assets/027e62cc-4bd9-4221-a281-848e7fb34552)

### 장바구니 추가

![장바구니추가](https://github.com/user-attachments/assets/dcc4cf1a-038e-4cfb-b70b-23dc68502802)

### 주문하기

#### 장바구니에서 주문페이지로

![장바구니에서 주문으로](https://github.com/user-attachments/assets/4e7dc398-3a65-4558-9936-61b280573d1f)

#### 주문페이지에서 배송정보 작성

![주문에서 결제창](https://github.com/user-attachments/assets/32bf7b3b-d1aa-4295-9a53-2521e653b66d)

#### 결제완료 후 주문결과페이지로

![결제완료후 주문결과창](https://github.com/user-attachments/assets/523e4cec-affa-4e39-8fd1-4ed374256594)

### 주문확인

#### 주문내역

![주문결과창에서 주문내역으로](https://github.com/user-attachments/assets/86915970-c8dd-4ce8-921a-cef1fd2328c0)

#### 주문상세내역

![주문내역상세](https://github.com/user-attachments/assets/3e842344-2340-465b-92d4-68974a27c14d)

### 어드민 주문처리

![주문처리](https://github.com/user-attachments/assets/6cee8139-85fa-43fa-8020-5b42aa8fd829)

### 어드민 제품등록

![제품추가창 제품추가](https://github.com/user-attachments/assets/d5282d88-e28b-4e5c-8f9c-11267c7a7192)

### 반응형

![반응형](https://github.com/user-attachments/assets/c300e8be-d6d0-4434-8f2d-44849b7304d3)
