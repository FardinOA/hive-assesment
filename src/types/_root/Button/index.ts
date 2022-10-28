export type ButtonProps = {
  label?: string;
  controller: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    arg: object
  ) => void;
  arg?: {};
  nameOfClass?: string;
  customStyle?: {};
};
