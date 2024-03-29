import styled from "./slide.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";

const SlideDate = ({ list, year, moveX, onSlideItemClick }) => {

  const [count, setCount] = useState({move: 0, selected: 0});

  const handleDisabledPrev = () => {
    return count.move >= 0 ? 'disabled' : '';
  }

  const handleDisabledNext = () => {
    return count.move <= -16 ? 'disabled' : '';
  }

  const handleSelected = () => {
    return -count.selected;
  }

  const moveToDirect = (idx) => {
    setCount(prev => {
      return {
        ...prev,
        move: prev.move, selected: -idx
      }
    });
  }

  const moveToPrev = () => {
    if (count.move >= 0) return;
    setCount(prev => {
      return {
        ...prev,
        selected: prev.selected, move: prev.move + 1
      }
    });
  };

  const moveToNext = () => {
    if (count.move <= -16) return;
    setCount(prev => {
      return {
        ...prev,
        selected: prev.selected, move: prev.move - 1
      }
    });
  };

  const handleSlideItemClick = (event) => {
    const idx = event.currentTarget.getAttribute('data-date');

    moveToDirect(idx);

    onSlideItemClick(list[idx].id);
    console.log(list[idx], 'dl')
  }

  return (
    <div className={styled.wrap_slide}>
      <button
        type="button"
        color="disabled"
        className={styled.btn_prev}
        onClick={moveToPrev}
      >
        <ArrowBackIosIcon fontSize="small" sx={{ fontSize: 16 }} color={handleDisabledPrev()}>
          이전
        </ArrowBackIosIcon>
      </button>
      {year && <strong className={styled.txt_year}>{year}</strong>} {/* year이 아닌 list[count].id를 넣고 싶음 */}
      <div className={styled.inner_slide}>
        <ul
          className={styled.list_slide}
          style={{transform: `translateX(${count.move * moveX}px)`}}
        >
          {list.map((item, idx) => (
            <li
              key={item.id}
              className={`${styled.item_slide} ${idx === handleSelected() ? styled.on : ""}`}
            >
              <button type="button" data-date={idx} onClick={handleSlideItemClick}>
                <em className={styled.txt_num}>{item.num}</em>
                <span className={styled.tit_txt}>{item.txt}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button type="button" className={styled.btn_next} onClick={moveToNext}>
        <ArrowForwardIosIcon fontSize="small" sx={{ fontSize: 14 }} color={handleDisabledNext()}>
          다음
        </ArrowForwardIosIcon>
      </button>
    </div>
  );
};
export default SlideDate;
