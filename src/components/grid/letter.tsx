type TLetterState = "current" | "valid" | "misplace" | "invalid";

export const Letter: React.FC<{ value: string; letterState?: TLetterState }> = (
  props
) => {
  const { value, letterState } = props;

  return (
    <span className={`letter ${letterState ? `letter--${letterState}` : ""}`}>
      {value}
    </span>
  );
};
