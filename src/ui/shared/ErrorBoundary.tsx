import { Component, type ReactNode } from "react";
import { FormattedMessage } from "react-intl";

interface State {
  readonly error: Error | null;
}

interface Props {
  readonly children: ReactNode;
}

export class ErrorBoundary extends Component<Props, State> {
  override state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  override render() {
    if (this.state.error) {
      return (
        <div role="alert" className="qg-error">
          <h1>
            <FormattedMessage id="error.boundary.title" defaultMessage="Qualcosa è andato storto" />
          </h1>
          <p>
            <FormattedMessage
              id="error.boundary.body"
              defaultMessage="Ricarica la pagina per riprovare."
            />
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
