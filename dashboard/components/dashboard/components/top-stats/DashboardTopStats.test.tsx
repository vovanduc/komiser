import { render, screen } from '@testing-library/react';
import GlobalAppContext from '../../../layout/context/GlobalAppContext';
import DashboardTopStats from './DashboardTopStats';

const initialContext = {
  displayBanner: false,
  dismissBanner: () => {},
  loading: false,
  data: undefined,
  error: false,
  hasNoAccounts: false,
  fetch: () => {}
};

describe('Dashboard Top Stats', () => {
  it('should render without crashing', () => {
    render(
      <GlobalAppContext.Provider
        value={{
          ...initialContext
        }}
      >
        <DashboardTopStats />
      </GlobalAppContext.Provider>
    );
  });

  it('should render the skeleton component when loading is true', () => {
    render(
      <GlobalAppContext.Provider
        value={{
          ...initialContext,
          loading: true
        }}
      >
        <DashboardTopStats />
      </GlobalAppContext.Provider>
    );
    const skeleton = screen.getByTestId('loading');
    expect(skeleton).toBeInTheDocument();
  });

  it('should render the error component when error is true', () => {
    render(
      <GlobalAppContext.Provider
        value={{
          ...initialContext,
          error: true
        }}
      >
        <DashboardTopStats />
      </GlobalAppContext.Provider>
    );
    const error = screen.getByTestId('error');
    expect(error).toBeInTheDocument();
  });

  it('should render the top stats cards component if error and loading are false', () => {
    render(
      <GlobalAppContext.Provider
        value={{
          ...initialContext,
          data: { resources: 25, regions: 17, costs: 5, accounts: 20 }
        }}
      >
        <DashboardTopStats />
      </GlobalAppContext.Provider>
    );
    const component = screen.getByTestId('data');
    expect(component).toBeInTheDocument();
  });
});
