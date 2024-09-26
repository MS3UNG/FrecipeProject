import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import AddressSearch from "../common/AddressSearch";

export default function PaymentByOrder() {
  const location = useLocation();
  const { cartItems, total } = location.state;

  const [tisOpen, setTisOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [conversion, setConversion] = useState(false);
  const [correction, setCorrection] = useState(false);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [originalNickname, setOriginalNickname] = useState('');
  const [address, setAddress] = useState('');
  const [originalAddress, setOriginalAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [originalDetailAddress, setOriginalDetailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [memberNo, setMemberNo] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState('');

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    setId(token.id);
    setName(token.name);
    setNickname(token.nickName);
    setOriginalNickname(token.nickName);
    setAddress(token.address);
    setOriginalAddress(token.address);
    setDetailAddress(token.detailAddress);
    setOriginalDetailAddress(token.detailAddress);
    setPhone(token.phone);
    setMemberNo(token.no);
  }, []);


  const [selectedBank, setSelectedBank] = useState('KB국민은행');
  const [accountNumber, setAccountNumber] = useState('123-456-78901234');

  const bankAccountNumbers = {
    'KB국민은행': '123-456-78901234',
    '신한은행': '234-567-89012345',
    '우리은행': '345-678-90123456',
    '하나은행': '456-789-01234567',
    '카카오뱅크': '567-890-12345678',
  };

  const handleBankSelect = (event) => {
    const bank = event.target.value;
    setSelectedBank(bank);
    setAccountNumber(bankAccountNumbers[bank]);
  };



  useEffect(() => {
    const calculateDeliveryDate = () => {
      const today = new Date();
      const delivery = new Date(today);
      delivery.setDate(today.getDate() + 3);
      const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
      return delivery.toLocaleDateString('ko-KR', options);
    };

    setDeliveryDate(calculateDeliveryDate());
  }, []);

  const correctionClick = () => {
    setCorrection(true);
    if (!correction) {
      setCorrection(true);
    } else {
      setCorrection(false);
    }
  };

  const openModal = () => {
    if (!allCheck || !ageCheck || !useCheck || !marketingCheck) {
      alert('약관을 모두 동의해주세요');
    } else {
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAddressSelect = (newAddress) => {
    setAddress(newAddress);
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
      width: '600px',
      height: '280px',
      margin: 'auto',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      padding: '20px',
    },
  };

  const handlePaymentSelection = (event) => {
    setSelectedPayment(event.target.value);
  };

  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setAgeCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
    } else {
      setAllCheck(false);
      setAgeCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
    }
  };

  const ageBtnEvent = () => {
    if (ageCheck === false) {
      setAgeCheck(true);
    } else {
      setAgeCheck(false);
    }
  };

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  const marketingBtnEvent = () => {
    if (marketingCheck === false) {
      setMarketingCheck(true);
    } else {
      setMarketingCheck(false);
    }
  };

  useEffect(() => {
    if (ageCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, useCheck, marketingCheck]);

  const handleOrderClick = () => {
    if (selectedPayment) {
      setTisOpen(true);
    } else {
      alert('결제 수단을 선택해주세요.');
    }
  };

  return (
      <>
        {conversion ? (
            <div>
              <h1 className="mt-5" style={{ textAlign: 'center' }}>
                주문이 완료 되었습니다.
              </h1>
              <div className="m-5">
                <div className="table-responsive">
                  <table className="table" style={{ textAlign: 'center' }}>
                    <thead>
                    <tr>
                      <th>제품</th>
                      <th>이름</th>
                      <th>가격</th>
                      <th>수량</th>
                      <th>총 금액</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems.map((item) => (
                        <tr key={item.productId}>
                          <th scope="row">
                            <div className="d-flex justify-content-center align-items-center mt-2">
                              <img
                                  src={item.imageURLs}
                                  className="img-fluid rounded-circle"
                                  style={{ width: '90px', height: '90px' }}
                                  alt=""
                              />
                            </div>
                          </th>
                          <td className="py-5">{item.productName}</td>
                          <td className="py-5">{item.productPrice}원</td>
                          <td className="py-5">{item.quantity}</td>
                          <td className="py-5">{item.productPrice * item.quantity}원</td>
                        </tr>
                    ))}
                    <tr>
                      <th scope="row"></th>
                      <td className="py-5"></td>
                      <td className="py-5"></td>
                      <td className="py-5">
                        <p className="mb-0 text-dark py-3">총 결제 금액</p>
                      </td>
                      <td className="py-5">
                        <div className="py-3 border-bottom border-top">
                          <p className="mb-0 text-dark">{total}원</p>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        ) : (
            <div className="container-fluid py-5">
              <div className="container py-5">
                <h1 className="mb-4">배송지</h1>
                <form action="#">
                  <div className="row g-5">
                    <div className="col-md-12 col-lg-6 col-xl-7">
                      <div className="row">
                        <div className="col-md-12 col-lg-6">
                          <div className="form-item w-100">
                            {correction ? (
                                <>
                                  <div className="form-container my-2">
                                    <div className="form-group">
                                      <div className="mx-3">이름:</div>
                                    </div>
                                    <div className="form-group post">
                                      <label style={{ width: '100%' }} htmlFor="nameInput">
                                        <input
                                            type="text"
                                            className="form-control border border-dark-subtle"
                                            placeholder="이름"
                                            id="nameInput"
                                            maxLength="30"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                      </label>
                                    </div>
                                  </div>
                                  <div className="form-container my-2">
                                    <div className="form-group">
                                      <div className="mx-3">번호:</div>
                                    </div>
                                    <div className="form-group post">
                                      <label style={{ width: '100%' }} htmlFor="phoneInput">
                                        <input
                                            type="text"
                                            className="form-control border border-dark-subtle"
                                            placeholder="전화번호"
                                            id="phoneInput"
                                            maxLength="30"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                      </label>
                                    </div>
                                  </div>
                                  <div className="form-container my-2">
                                    <div className="form-group">
                                      <div className="mx-3">주소:</div>
                                    </div>
                                    <div className="form-group post">
                                      <label style={{ width: '100%' }} htmlFor="addressInput">
                                        <input
                                            type="text"
                                            className="form-control border border-dark-subtle"
                                            placeholder="주소"
                                            id="addressInput"
                                            maxLength="30"
                                            readOnly
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                      </label>
                                    </div>
                                    <AddressSearch onAddressSelect={handleAddressSelect} />
                                  </div>
                                  <div className="form-container my-2">
                                    <div className="form-group">
                                      <div className="mx-3">상세 주소:</div>
                                    </div>
                                    <div className="form-group post">
                                      <label style={{ width: '100%' }} htmlFor="detailAddressInput">
                                        <input
                                            type="text"
                                            className="form-control border border-dark-subtle"
                                            placeholder="상세 주소"
                                            id="detailAddressInput"
                                            maxLength="30"
                                            value={detailAddress}
                                            onChange={(e) => setDetailAddress(e.target.value)}
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </>
                            ) : (
                                <>
                                  <h5>{name}({nickname})</h5>
                                  <div className="mb-1">{phone}</div>
                                  <div>{address} {detailAddress}</div>
                                </>
                            )}
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-6">
                          <div className="text-end">
                            <button
                                className="btn border border-secondary rounded-pill px-3 text-primary"
                                id="cancelBtn"
                                type="button"
                                style={{ border: '1px solid black' }}
                                onClick={correctionClick}
                            >
                              수정
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="form-item">
                        <div className="form-label my-3">
                          <h5>도착일</h5>
                          <div>{deliveryDate}까지 도착 예정</div>
                        </div>
                      </div>
                      <hr />
                      <div className="form-item">
                        <h1 className="my-4">결제</h1>
                        <div className="form-label my-3">
                          <div className="col-lg-12">
                            <div className="mb-3">
                              <h5>결제 수단 선택</h5>
                              <div className="mx-3 mt-1">
                                {/* 각 결제 수단 라디오 버튼 */}
                                <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                                  <input
                                      type="radio"
                                      className="me-2"
                                      id="naverPay"
                                      name="paymentMethod"
                                      value="naverPay"
                                      onChange={handlePaymentSelection}
                                  />
                                  <label htmlFor="naverPay">
                                    <img
                                        className="mx-1"
                                        src={`${process.env.PUBLIC_URL}/img/badge_npay.png`}
                                        alt="네이버페이로 구매하기"
                                        style={{ width: '15%' }}
                                    />
                                    네이버페이
                                  </label>
                                </div>
                                <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                                  <input
                                      type="radio"
                                      className="me-2"
                                      id="kakaoPay"
                                      name="paymentMethod"
                                      value="kakaoPay"
                                      onChange={handlePaymentSelection}
                                  />
                                  <label htmlFor="kakaoPay">
                                    <img
                                        className="mx-1"
                                        src={`${process.env.PUBLIC_URL}/img/combination_with_BG.png`}
                                        alt="카카오페이로 구매하기"
                                        style={{ width: '8.5%' }}
                                    />
                                    카카오페이
                                  </label>
                                </div>
                                <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                                  <input
                                      type="radio"
                                      className="me-2"
                                      id="bankTransfer"
                                      name="paymentMethod"
                                      value="bankTransfer"
                                      onChange={handlePaymentSelection}
                                  />
                                  <label htmlFor="bankTransfer">계좌이체</label>
                                </div>
                                <div className="mb-2" style={{ display: 'flex', alignItems: 'center' }}>
                                  <input
                                      type="radio"
                                      className="me-2"
                                      id="creditCard"
                                      name="paymentMethod"
                                      value="creditCard"
                                      onChange={handlePaymentSelection}
                                  />
                                  <label htmlFor="creditCard">신용카드</label>
                                </div>
                              </div>
                              {tisOpen ? (
                                  <>
                                    <hr />
                                    <div className="form-item">
                                      <h5 className="mb-3">주문 완료</h5>
                                      <div className="mx-3">
                                        <div className="mb-2">
                                          <input
                                              type="checkbox"
                                              id="termsAgreement_all"
                                              checked={allCheck}
                                              onChange={allBtnEvent}
                                          />
                                          <label htmlFor="termsAgreement_all" className="ms-2">
                                            모두 동의
                                          </label>
                                        </div>
                                        <div className="mb-2">
                                          <input
                                              type="checkbox"
                                              id="termsAgreement_purchase"
                                              checked={ageCheck}
                                              onChange={ageBtnEvent}
                                          />
                                          <label htmlFor="termsAgreement_purchase" className="ms-2">
                                            (필수) 구매 약관에 동의합니다.
                                          </label>
                                        </div>
                                        <div className="mb-2">
                                          <input
                                              type="checkbox"
                                              id="termsAgreement_privacy"
                                              checked={useCheck}
                                              onChange={useBtnEvent}
                                          />
                                          <label htmlFor="termsAgreement_privacy" className="ms-2">
                                            (필수) 개인 정보 수집 및 이용에 동의합니다.
                                          </label>
                                        </div>
                                        <div className="mb-2">
                                          <input
                                              type="checkbox"
                                              id="termsAgreement_thirdParty"
                                              checked={marketingCheck}
                                              onChange={marketingBtnEvent}
                                          />
                                          <label htmlFor="termsAgreement_thirdParty" className="ms-2">
                                            (필수) 개인 정보의 제 3자 제공 및 국외 이전에 동의합니다.
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 col-lg-6 col-xl-5">
                      <div className="table-responsive">
                        <table className="table" style={{ textAlign: 'center' }}>
                          <thead>
                          <tr>
                            <th>제품</th>
                            <th>이름</th>
                            <th>가격</th>
                            <th>수량</th>
                            <th>총 금액</th>
                          </tr>
                          </thead>
                          <tbody>
                          {cartItems.map((item) => (
                              <tr key={item.productId}>
                                <th scope="row">
                                  <div className="d-flex align-items-center mt-2">
                                    <img
                                        src={item.imageURLs}
                                        className="img-fluid rounded-circle"
                                        style={{ width: '90px', height: '90px' }}
                                        alt=""
                                    />
                                  </div>
                                </th>
                                <td className="py-5">{item.productName}</td>
                                <td className="py-5">{item.productPrice}원</td>
                                <td className="py-5">{item.quantity}</td>
                                <td className="py-5">{item.productPrice * item.quantity}원</td>
                              </tr>
                          ))}
                          <tr>
                            <th scope="row"></th>
                            <td className="py-5"></td>
                            <td className="py-5"></td>
                            <td className="py-5">
                              <p className="mb-0 text-dark py-3">총 결제 금액</p>
                            </td>
                            <td className="py-5">
                              <div className="py-3 border-bottom border-top">
                                <p className="mb-0 text-dark">{total}원</p>
                              </div>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                        <button
                            type="button"
                            className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                            onClick={tisOpen ? openModal : handleOrderClick}
                        >
                          주문하기
                        </button>
                      </div>
                      <Modal
                          isOpen={isOpen}
                          onRequestClose={closeModal}
                          style={{
                            overlay: {
                              backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            },
                            content: {
                              width: '500px',
                              height: '600px',
                              margin: 'auto',
                              borderRadius: '10px',
                              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
                              padding: '20px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                            },
                          }}
                      >
                        <button
                            type="button"
                            className="btn-close position-absolute top-0 end-0 m-2"
                            aria-label="Close"
                            onClick={closeModal}
                        ></button>
                        <h2 className="text-center mt-4">결제 정보 입력</h2>
                        <div className="modal-body mt-3">
                          <div className="mb-4">
                            <label htmlFor="bankSelect" className="form-label">은행 선택</label>
                            <select className="form-select" id="bankSelect" value={selectedBank} onChange={handleBankSelect}>
                              <option value="KB국민은행">KB국민은행</option>
                              <option value="신한은행">신한은행</option>
                              <option value="우리은행">우리은행</option>
                              <option value="하나은행">하나은행</option>
                              <option value="카카오뱅크">카카오뱅크</option>
                            </select>
                          </div>
                          <div className="mb-4">
                            <label htmlFor="accountNumber" className="form-label">계좌번호</label>
                            <input
                                type="text"
                                className="form-control"
                                id="accountNumber"
                                value={accountNumber}
                                readOnly
                            />
                          </div>
                          <div className="mb-4">
                            <label htmlFor="amount" className="form-label">금액</label>
                            <input
                                type="text"
                                className="form-control"
                                id="amount"
                                value={`${total.toLocaleString()} 원`}
                                readOnly
                            />
                          </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                          <button
                              type="button"
                              className="btn btn-outline-secondary rounded-pill"
                              onClick={closeModal}
                          >
                            취소
                          </button>
                          <button
                              type="button"
                              className="btn btn-primary rounded-pill"
                              onClick={() => {
                                closeModal();
                                setConversion(true);
                              }}
                          >
                            주문하기
                          </button>
                        </div>
                      </Modal>

                    </div>
                  </div>
                </form>
              </div>
            </div>
        )}
      </>
  );
}
