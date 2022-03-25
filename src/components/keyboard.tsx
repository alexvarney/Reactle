type IKeyboardCustomItem = {
  key: string;
  display: string;
};

type IKeybaordItem = string | IKeyboardCustomItem;

type TOnClick = (key: string) => void;

const KeyboardConfig: IKeybaordItem[][] = [
  Array.from("qwertyuiop"),
  Array.from("asdfghjkl"),
  [
    { key: "Enter", display: "Enter" },
    ...Array.from("zxcvbnm"),
    { key: "Backspace", display: "⌫" },
  ],
];

export const Keyboard: React.FC<{ onClick?: TOnClick }> = (props) => {
  return (
    <div className="keyboard-container">
      {KeyboardConfig.map((row, idx) => (
        <KeyboardRow key={idx} letters={row} onClick={props.onClick} />
      ))}
    </div>
  );
};

const KeyboardRow: React.FC<{
  letters: IKeybaordItem[];
  onClick?: TOnClick;
}> = (props) => {
  return (
    <div className="keyboard-row">
      {props.letters.map((letter) => (
        <KeyboardButton value={letter} onClick={props.onClick} />
      ))}
    </div>
  );
};

const KeyboardButton: React.FC<{
  value: IKeybaordItem;
  onClick?: TOnClick;
}> = (props) => {
  if (typeof props.value === "string") {
    return (
      <button
        onClick={() => props.onClick?.(props.value as string)}
        className="keyboard-button"
      >
        {props.value}
      </button>
    );
  }

  return (
    <button
      aria-label={props.value.key}
      onClick={() => props.onClick?.((props.value as IKeyboardCustomItem).key)}
      className="keyboard-button keyboard-button--long"
    >
      {props.value.display}
    </button>
  );
};