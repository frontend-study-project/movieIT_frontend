import styled from './components.module.css';
const SelectItem = ({
  id,
  label
}) => {
  return <div className={styled.box_count}>
    <label htmlFor={id}>{label}</label>
    <button type="button" className={styled.btn_minus}>-</button>
    <input type="number" className={styled.num_count} value={0} id={id} min={0} max={8} readOnly />
    <button type="button" className={styled.btn_plus}>+</button>
  </div>
}
export default SelectItem;