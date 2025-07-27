import { useTranslations } from "next-intl";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const ExportCompliance = () => {
  const t = useTranslations("download");

  return (
    <div className="mt-6">
      <h1 className="text-lg font-bold font-display tracking-tight sm:text-xl">
        {t("exportCompliance.title")}
      </h1>
      <p className="mt-2 text-sm">{t("exportCompliance.text1")}</p>
      <p className="mt-1 text-sm">{t("exportCompliance.text2")}</p>
      <p className="mt-1 text-sm">{t("exportCompliance.narrative")}</p>
      <Table className="mt-12">
        <TableBody>
          <TableRow>
            <TableCell className="font-bold">
              {t("exportCompliance.product_title")}
            </TableCell>
            <TableCell>{t("exportCompliance.product_text")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">
              {t("exportCompliance.eccn_title")}
            </TableCell>
            <TableCell>{t("exportCompliance.eccn_text")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">
              {t("exportCompliance.exception_title")}
            </TableCell>
            <TableCell>{t("exportCompliance.exception_text")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">
              {t("exportCompliance.ccats_title")}
            </TableCell>
            <TableCell>{t("exportCompliance.ccats_text")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">
              {t("exportCompliance.ern_title")}
            </TableCell>
            <TableCell>{t("exportCompliance.ern_text")}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ExportCompliance;
