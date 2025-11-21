export type PopupType = "Success" | "Error" | "Info";

export type Popup = {
  id: number;
  type: PopupType;
  message: string;
}