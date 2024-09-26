import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShopCategories({ onCategoryClick }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.post("/getCategories");

                setCategories(res.data);
                setLoading(false); // 데이터가 성공적으로 로드되었을 때 로딩 상태를 false로 설정
            } catch (error) {
                console.error("배너가져오기 에러: ", error);
                setLoading(false); // 에러 발생 시에도 로딩 상태를 false로 설정
            }
        };

        getCategories();
    }, []);

    // 중복 제거된 부모 카테고리를 추출
    const uniqueParentCategories = categories.reduce((acc, category) => {
        if (!acc.some(item => item.parentCategoryName === category.parentCategoryName)) {
            acc.push(category);
        }
        return acc;
    }, []);

    if (loading) {
        return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
    }

    return (
        <div className="col-lg-12">
            <div className="mb-3">
                <h4>Categories</h4>
                <ul className="list-unstyled fruite-categorie">
                    {uniqueParentCategories.map((category, index) => (
                        <li key={category.parentCategoryCode}>
                            <div className="d-flex justify-content-between fruite-name">
                                <a href="#" onClick={() => onCategoryClick(category.parentCategoryCode)}>
                                    <i className="fas fa-apple-alt me-2"></i>
                                    {category.parentCategoryName}
                                </a>
                                <span>({category.parentProductCount})</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
