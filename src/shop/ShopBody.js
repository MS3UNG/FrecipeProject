// src/shop/ShopBody.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShopCategories from '../components/shop/ShopCategories';
import ShoppingItem from '../components/shop/ShoppingItem';
import SearchBar from '../components/SearchBar';
import ShopAd from '../components/shop/ShopAd';

export default function ShopBody({ addToCart }) {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [categoryCode, setCategoryCode] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const size = 20;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.post('/productList', null, {
                    params: {
                        page: page,
                        size: size,
                        categoryCode: categoryCode,
                        searchTerm: searchTerm, // 검색어 추가
                    },
                });

                setProducts(res.data);
                setTotalCount(res.data[0].totalCount);
            } catch (error) {
                console.error('상품가져오기 에러: ', error);
            }
        };

        fetchProducts();
    }, [page, categoryCode, searchTerm]); // searchTerm을 의존성 배열에 추가

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleCategoryClick = (code) => {
        setCategoryCode(code);
        setPage(1); // 새로운 카테고리를 선택할 때 페이지를 1로 초기화
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setPage(1); // 검색 시 페이지를 1로 초기화
    };

    const totalPages = Math.ceil(totalCount / size);
    const groupSize = 5;
    const currentGroup = Math.ceil(page / groupSize);
    const groupStart = (currentGroup - 1) * groupSize + 1;
    const groupEnd = Math.min(currentGroup * groupSize, totalPages);

    return (
        <div className="container-fluid fruite py-5">
            <div className="container py-5">
                <h1 className="mb-4">Fresh fruits shop</h1>
                <div className="row g-4">
                    <div className="col-lg-12">
                        <div className="row g-4">
                            <div className="col-xl-3">
                                <div className="input-group w-100 mx-auto d-flex">
                                    <SearchBar onSearch={handleSearch} /> {/* 검색 기능 추가 */}
                                </div>
                            </div>
                            <div className="col-6" />
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <ShopCategories onCategoryClick={handleCategoryClick} />
                    </div>
                    <div className="col-lg-9">
                        <div className="row g-4">
                            {products.length > 0 ? (
                                products.map((item) => (
                                    <ShoppingItem key={item.productId} item={item} addToCart={() => addToCart(item)} />
                                ))
                            ) : (
                                <div className="col-12">
                                    <p>No products found.</p>
                                </div>
                            )}
                        </div>
                        <div className="col-12" style={{ marginTop: "15px" }}>
                            <nav aria-label="Page navigation">
                                <ul className="pagination justify-content-center" style={{ display: "inline" }}>
                                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`} style={{ float: "left" }}>
                                        <button className="page-link" onClick={() => handlePageChange(page - 1)}
                                                aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </button>
                                    </li>
                                    {Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => groupStart + i).map((p) => (
                                        <li key={p} className={`page-item ${p === page ? 'active' : ''}`} style={{ float: "left" }}>
                                            <button className="page-link" onClick={() => handlePageChange(p)}>
                                                {p}
                                            </button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(page + 1)}
                                                aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
