import RatingItem from "../Components/RatingItem";
import SeatItem from "../Components/SeatItem";
import styled from './StepTwo.module.css';

const BoxSeatInfo = () => {
  return <div className={styled.box_result}>
    <div className={styled.item_movie}>
      <RatingItem rating={1} ratingDesc={'전체관람가'}/>
      <span className={styled.txt_tit}>
      [응원상영] (DAY 1) 극장판 아이돌리쉬 세븐; LIVE 4bit BEYOND THE PERiOD
      </span>
      <span className={styled.txt_cate}>2D(자막)</span>
    </div>
    <div className={styled.item_info}>
      <div className={styled.inner_info}>
        코엑스 <br />
        컴포트 3관 <br />
        2024.02.01 (목) <br />
        <span className={styled.txt_time}>09:50 ~ 11:56</span>
      </div>
      <div className={styled.thumb_img}></div>
    </div>
    <div className={styled.item_seat}>
      <ul className={styled.info_seat}>
        <li>
          <SeatItem seatType={'selected'} seatDesc={'선택한 좌석'}/> 선택
        </li>
        <li>
          <SeatItem seatType={'occupied'} seatDesc={'예매완료'}/> 예매완료
        </li>
        <li>
          <SeatItem seatType={'impossible'} seatDesc={'선택불가'}/> 선택불가
        </li>
        <li>
          <SeatItem seatType={'common'} seatDesc={'일반'}/> 일반
        </li>
        <li>
          <SeatItem seatType={'challenged'} seatDesc={'장애인석'}/> 장애인석
        </li>
      </ul>
      <div className={styled.info_select}>
        <em>선택좌석</em>
        <ul>
          <li className={styled.seat_selected} title="선택한 좌석">E18</li>
          <li className={styled.seat_empty} title="선택할 수 있는 좌석">-</li>
          <li title="구매가능 좌석">-</li>
          <li title="구매가능 좌석">-</li>
          <li title="구매가능 좌석">-</li>
          <li title="구매가능 좌석">-</li>
          <li title="구매가능 좌석">-</li>
          <li title="구매가능 좌석">-</li>
        </ul>
      </div>
    </div>
    <div className={styled.item_pay}>
      <em className={styled.cate_pay}>성인2</em>
      <div className={styled.txt_pay}>
        <em>최종결제금액</em>
        <strong className={styled.num_pay}><em>24,000</em>원</strong>
      </div>
    </div>
    <div className={styled.item_btns}>
      <button type="button" className={styled.btn_prev}>이전</button>
      <button type="button" className={styled.btn_next}>다음</button>
    </div>
  </div>;
}
export default BoxSeatInfo;