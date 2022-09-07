export default interface TextInputConfig {
  attributes: {
    label?: string;
    placeholder?: string;
    required?: boolean;
    type?: "email" | "text" | "number" | "password" | "url" | "date" | "tel";
    value?: string;
    readonly?: boolean;
  };
  events: { [key: string]: Function };
}
