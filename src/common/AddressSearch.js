import React, { useEffect } from 'react';

const loadDaumPostcode = () => {
    const script = document.createElement('script');
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.head.appendChild(script);
};

// 주소 검색 컴포넌트
const AddressSearch = ({ onAddressSelect }) => {
    useEffect(() => {
        loadDaumPostcode();
    }, []);

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                onAddressSelect(data.address);
            }
        }).open();
    };

    return (
        <button type="button" className="btn btn-primary" onClick={handleAddressSearch}>
            주소 검색
        </button>
    );
};

export default AddressSearch;
