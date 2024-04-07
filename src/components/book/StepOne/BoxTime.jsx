import styledCommon from "../../../pages/Book/book.module.css";
import styled from "./StepOne.module.css";
import SlideTime from "../SlideItem/SlideTime";

import TheatersIcon from "@mui/icons-material/Theaters";
import { useFetchUserQuery } from "../../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { setBook, setPage } from "../../../store/slice/book";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchSeatsLeftQuery } from "../../../hooks/useSeatsLeft";

const BoxTime = () => {
  const [hour, setHour] = useState(new Date().getHours());
  const hourCondition = new Date().getMinutes() < 55 ? hour : hour + 1;

  const dispatch = useDispatch();
  const { date, movie, theater } = useSelector((state) => state.book.stepOne);
  const { data } = useFetchUserQuery();
  const { data: seatsLeftdata } = useFetchSeatsLeftQuery({
    movieId: movie.id,
    theaterId: theater.id,
    date,
    hour,
    activate: !!(movie.id && theater.id),
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [screenList, setScreenList] = useState([]);

  const [seatLeftList, setSeatLeftList] = useState(seatsLeftdata || [0,0,0,0,0,0,0,0,0,0]);

  const onChangeHour = (hour) => {
    setHour(hour);
  };

  const handleHourClick = (event) => {
    const screen = event.currentTarget.getAttribute("data-screen");
    const timeStart = event.currentTarget.getAttribute("data-timestart");
    const timeEnd = event.currentTarget.getAttribute("data-timeend");

    dispatch(
      setBook({
        step: "stepOne",
        type: "runningTime",
        data: {
          timeStart,
          timeEnd,
        },
      })
    );

    dispatch(
      setBook({
        step: "stepOne",
        type: "screen",
        data: screen,
      })
    );

    if (data) {
      dispatch(setPage(2));
    }

    navigate("/login", { state: pathname });
  };

  useEffect(() => {
    seatsLeftdata && setSeatLeftList(seatsLeftdata);

    const nowMinutes = new Date().getMinutes();
    let minutesList = ['10','15','20','25','30','35','40','45','50','55'],
      sliceStartIdx = 0,
      formatDate = new Date(`${date} ${nowMinutes >= 55 ? hour + 1 :hour}:00:00`);

    if (new Date() > formatDate && nowMinutes >= 10) {
      sliceStartIdx = Math.round(nowMinutes / 10) + Math.floor(nowMinutes / 10) - 1;

      minutesList = (minutesList.length > 10 - sliceStartIdx) && minutesList.slice(sliceStartIdx);

    } else {
      minutesList = ['10','15','20','25','30','35','40','45','50','55']
    }

    seatsLeftdata && setSeatLeftList(seatsLeftdata.slice(sliceStartIdx));
    setScreenList(minutesList);

  }, [seatsLeftdata]);

  return (
    <div className={styled.box_time}>
      <h3 className={styledCommon.tit_box}>
        시간<span className={styledCommon.screen_out}>선택</span>
      </h3>
      <SlideTime moveX={35} hour={hourCondition} date={date} onChangeHour={onChangeHour} />
      {!(movie.txt && theater.txt) ? (
        <div className={styled.area_empty}>
          <TheatersIcon fontSize="large" color="disabled" />
          <p>
            영화와 극장을 선택하시면
            <br />
            상영시간표를 비교하여 볼 수 있습니다.
          </p>
        </div>
      ) : (
        <ul className={`${styled.list_movies} ${styledCommon.scroll}`}>
          { screenList.map((ele, idx) => {
            return (
              <li key={"hour" + idx}>
                <button
                  type="button"
                  data-screen={ele.screen}
                  data-timestart={`${hourCondition}:${ele}`}
                  data-timeend={`${hourCondition + 2}:${ele}`}
                  onClick={handleHourClick}
                >
                  <div className={styled.item_time}>
                    <span className={styled.emph_time}>
                      {hourCondition} : {ele}
                    </span>
                    <div className={styled.txt_time}>
                      ~ {hourCondition + 2} : {ele}
                    </div>
                  </div>
                  <div className={styled.item_tit}>
                    <strong className={styled.txt_tit}>{movie.txt}</strong>
                    <span className={styled.txt_desc}>2D (자막)</span>
                  </div>
                  <div className={styled.item_info}>
                    <span className={styled.txt_theater}>
                      {theater.txt}
                      <br /> {`컴포트${idx + 1}관`}
                    </span>
                    <span className={styled.wrap_seat}>
                      <span className={styled.num_left}>
                      {seatLeftList ? 440 - seatLeftList[idx]: 440}
                      </span>
                      /<span className={styled.num_total}>440</span>
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default BoxTime;
