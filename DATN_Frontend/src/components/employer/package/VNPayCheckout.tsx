import { message } from "antd";
import React, { useEffect } from "react";
import { formatCurrency } from "../../../utils/hooks/FormatCurrrency";
import {useUpdateOrderStatusMutation} from '../../../service/employer/order';
import { useNavigate } from "react-router-dom";
import { useCreateServiceMutation} from '../../../service/employer/service';
const responseCodeList:any = {
  "00": "Giao dịch thành công",
  "07": "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường)",
  "09": "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.",
  "10": "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần",
  "11": "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.",
  "12": "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.",
  "13": "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.",
  "24": "Giao dịch không thành công do: Khách hàng hủy giao dịch",
  "51": "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.",
  "65": "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.",
  "75": "	Ngân hàng thanh toán đang bảo trì.",
  "79": "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch",
  "99": "Lỗi không xác định",
};

const VNPayCheckout = (): any => {
    const navigate = useNavigate();
    const [createService] = useCreateServiceMutation()
    const [updateOrderStatus] = useUpdateOrderStatusMutation()
    const queryParams = new URLSearchParams(window.location.search);
    const vnp_OrderInfo:string = queryParams.get("vnp_OrderInfo") || '';
    const responseCode = queryParams.get("vnp_ResponseCode") || "99" ; 
    const transactionNo = queryParams.get("vnp_TransactionNo")
    const vnp_Amount = Number(queryParams.get('vnp_Amount'));
  useEffect(() =>{

  if(responseCode) {
    if(responseCode == "00"){
        try {
        const getData = async () => {
          const {data}:any = await updateOrderStatus(vnp_OrderInfo)
          const service:any = {
              userId :data.user_id,
              packageDay : data.package_id.package_day,
              serviceId : data.package_id?._id,
              transactionNo,
              currentService : data.order_name            
          }
          await createService(service);
          message.success(responseCodeList[responseCode])
          setTimeout(()=>{
            window.close()
            localStorage.setItem(
              "checkout",
              responseCodeList[responseCode]
            );
          },1000)
        }
        getData();
    
        } catch (error:any) {
          message.error(error);
        }
        
    }
    else {
      message.error("Giao dịch không thành công,");
    }
  }
  },[])
  return <>
    <div>{vnp_OrderInfo}</div>
    <div>Số tiền : {formatCurrency(vnp_Amount/100)}</div>
    <div>Mã giao dịch : {transactionNo}</div>
    <div>Trạng thái :{responseCodeList[responseCode]}</div>
  </>;
};
export default VNPayCheckout;
