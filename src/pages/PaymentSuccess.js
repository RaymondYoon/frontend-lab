import React, { useEffect, useRef, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const isRequestSent = useRef(false); // 중복 요청 방지

    // API 요청 로직을 useCallback으로 감싸기 (ESLint 경고 해결)
    const handlePaymentApproval = useCallback(() => {
        if (isRequestSent.current) return; // 이미 요청이 보냈다면 실행하지 않음
        isRequestSent.current = true; // 첫 번째 실행 이후 true로 변경

        const pgToken = searchParams.get("pg_token");
        const postId = searchParams.get("postId");
        const tid = localStorage.getItem("tid");
        const token = localStorage.getItem("token");

        console.log("=== 결제 승인 요청 ===");
        console.log("URL:", window.location.href);
        console.log("pg_token:", pgToken);
        console.log("postId:", postId);
        console.log("tid:", tid);
        console.log("보내는 Authorization Token:", token);

        if (!pgToken || !postId || !tid) {
            alert("결제 정보가 올바르지 않습니다.");
            navigate("/");
            return;
        }

        axios
            .post(
                `http://localhost:8080/payment/success`,
                { pg_token: pgToken, postId: postId, tid: tid },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(() => {
                alert("결제가 완료되었습니다!");
                console.log("보낸 데이터:", { pgToken, postId, tid });
                localStorage.removeItem("tid");
                navigate(`/post/${postId}`);
            })
            .catch((error) => {
                console.error("결제 승인 실패:", error.response ? error.response.data : error);
                alert("결제 승인에 실패했습니다.");
                navigate("/");
            });
    }, [searchParams, navigate]); // 의존성 배열 추가 (ESLint 경고 방지)

    useEffect(() => {
        handlePaymentApproval();
    }, [handlePaymentApproval]); // useEffect에서 useCallback 사용

    return <div>결제 승인 중...</div>;
};

export default PaymentSuccess;
