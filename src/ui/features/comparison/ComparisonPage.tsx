import { FormattedMessage } from "react-intl";
import { Button, Stack } from "@/ui/design-system";
import { AddScenarioForm } from "./AddScenarioForm.tsx";
import { ScenariosTable } from "./ScenariosTable.tsx";
import { useScenarios } from "./useScenarios.ts";
import { buildScenariosCsv, downloadCsv } from "./csv.ts";

export function ComparisonPage() {
  const scenarios = useScenarios();

  const handleExport = () => {
    const csv = buildScenariosCsv(scenarios.rows);
    downloadCsv("quanto-guadagno-scenari.csv", csv);
  };

  return (
    <main id="main" className="qg-page">
      <Stack gap="xl">
        <header className="qg-page__header">
          <p className="qg-page__eyebrow">
            <FormattedMessage id="comparison.page.eyebrow" />
          </p>
          <h1 className="qg-page__title">
            <FormattedMessage id="comparison.page.title" />
          </h1>
          <p className="qg-page__subtitle">
            <FormattedMessage id="comparison.page.subtitle" />
          </p>
        </header>

        <div className="qg-page__layout">
          <AddScenarioForm onAdd={scenarios.add} />
          <section className="qg-results" aria-labelledby="qg-comparison-results-title">
            <div className="qg-comparison-actions">
              <h2 id="qg-comparison-results-title" className="qg-results__title">
                <FormattedMessage id="comparison.list.title" />
              </h2>
              <div className="qg-comparison-actions__buttons">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleExport}
                  disabled={scenarios.rows.length === 0}
                >
                  <FormattedMessage id="comparison.action.export" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={scenarios.clear}
                  disabled={scenarios.rows.length === 0}
                >
                  <FormattedMessage id="comparison.action.clear" />
                </Button>
              </div>
            </div>
            <ScenariosTable rows={scenarios.rows} onRemove={scenarios.remove} />
          </section>
        </div>
      </Stack>
    </main>
  );
}
