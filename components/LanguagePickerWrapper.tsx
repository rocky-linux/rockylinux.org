import { getAvailableLanguages } from "@/lib/i18n/getAvailableLanguages";
import LanguagePicker from "./LanguagePicker";

export default async function LanguagePickerWrapper() {
  const availableLanguages = await getAvailableLanguages();

  return <LanguagePicker availableLanguages={availableLanguages} />;
}
