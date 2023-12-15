import queryString from 'query-string';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

import { AppActions } from '../../actions/app.actions';
import { SearchActions } from '../../actions/search.actions';
import { SearchState } from '../../reducers/search.reducer';
import { AppState } from '../../store/app.store';


import './search-results.scss';

type ISearchResultsProps = RouteComponentProps<{}> &
  SearchActions &
  SearchState &
  AppActions;

interface ISearchResultsState {
  canSearch: boolean;
}

class SearchResults extends React.Component<
  ISearchResultsProps,
  ISearchResultsState
> {
  state: ISearchResultsState = {
    canSearch: true,
  };

  private query!: string;

  componentDidMount(): void {
    if (this.props.preloaded) {
      this.props.clearPreloadedState();

      return;
    }

    const { query = '' } = queryString.parse(this.props.location.search);

    this.query = query as string;

    this.doSearch();
  }

  UNSAFE_componentWillReceiveProps(nextProps: ISearchResultsProps): void {
    const { query = '' } = queryString.parse(nextProps.location.search);
    console.log(query);

    if (query !== this.query) {
      this.query = query as string;

      this.doSearch();
    }
  }

  render(): JSX.Element {
    console.log(this.query, 'this.query',this.props.location.search);


    return (
      <div className="bi-search-results">
        {!this.props.location.search ? (
          <div className="bi-search-results__body">
            <FormattedMessage id="components.search-results.wrong-query" />
          </div>
        ) : (
          this.renderBody()
        )}
      </div>
    );
  }

  private renderBody(): JSX.Element | null {
    if (!this.props.location.search) {
      return null
    }
    const query = this.props.location.search?.split('=')[1]

    if (query?.length === 32) {
      return <Redirect to={`/transactions/${query}`} />;
    } else if (query?.length === 42) {
      return <Redirect to={`/addresses/${query}`} />;
    } else {
      return <Redirect to={`/transactions/${query}`} />;
    }
  }

  private doSearch(): void {
    if (this.query.length < 5) {
      this.setState({ canSearch: false });

      return;
    }

    this.setState({ canSearch: true });

    this.props.search(this.query as string);
  }
}

function mapStateToProps(state: AppState): SearchState {
  return state.search;
}

function mapDispatchToProps(dispatch: any): any {
  return bindActionCreators({ ...SearchActions, ...AppActions }, dispatch);
}

const SearchResultsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);

export default SearchResultsComponent;
