import { useLetterState } from "../../utils/use-letter-state";

export const Letter: React.FC<{ rowIdx: number; letterIdx: number }> = (
  props
) => {
  const { value, letterState } = useLetterState(props.rowIdx, props.letterIdx);

  return <span className={`letter letter--${letterState}`}>{value}</span>;
};
