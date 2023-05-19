import { ButtonVariant } from "../constants/ButtonVariant";

export type ButtonVariantType =
  (typeof ButtonVariant)[keyof typeof ButtonVariant];
