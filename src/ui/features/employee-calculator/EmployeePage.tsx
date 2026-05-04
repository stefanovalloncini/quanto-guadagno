import { FormattedMessage } from "react-intl";
import { Stack } from "@/ui/design-system";

export function EmployeePage() {
  return (
    <main id="main" className="qg-page">
      <Stack gap="lg">
        <h1>
          <FormattedMessage id="page.employee.placeholder.title" />
        </h1>
        <p>
          <FormattedMessage id="page.employee.placeholder.body" />
        </p>
      </Stack>
    </main>
  );
}
