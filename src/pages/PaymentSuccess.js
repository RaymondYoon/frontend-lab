import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      const pgToken = searchParams.get("pg_token");
      const postId = searchParams.get("postId");
      const tid = localStorage.getItem("tid"); // 저장한 tid 가져오기
      const token = localStorage.getItem("token");

      console.log("=== 📝 결제 승인 요청 ===");
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
          {
            pg_token: pgToken,
            postId: postId,
            tid: tid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          alert("결제가 완료되었습니다!");
          console.log("보낸 데이터:", { pgToken, postId, tid });
          localStorage.removeItem("tid"); // ✅ 결제 완료 후 tid 삭제
          navigate(`/post/${postId}`);
        })
        .catch((error) => {
          console.error("❌ 결제 승인 실패:", error.response ? error.response.data : error);
          alert("결제 승인에 실패했습니다.");
          navigate("/");
        });
    }, [searchParams, navigate]);

    return <div>결제 승인 중...</div>;
};

export default PaymentSuccess;
