import App from './App';
import Loader from './components/loader';
import TableListing from './components/table-listing';
import SearchInput from './components/search-input';
import Header from './components/header';
import {Provider} from 'react-redux';
import { render , fireEvent, waitFor} from '@testing-library/react';
import {shallow,mount} from 'enzyme';
import reducer from './reducers';
import fetchMock from "fetch-mock";
import * as actions from './actions';
import * as types from './actions/action-types';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const dummyData = [
      {
          "word": "aal",
          "nagari": "\u0906\u0932",
          "description": "a weed",
          "category": "plant"
      },
      {
          "word": "abayu",
          "nagari": "\u0906\u092c\u092f\u0941",
          "description": "the mustard plant",
          "category": "plant"
      }];
const dummyDataErr = [{"status":"404","statusText": "Server Error"}];

describe('actions', () => {
    test('should create an action for loader component', () => {
        const showLoader = true;
        const expectedAction = {
            type: showLoader? types.SHOW_LOADER : types.HIDE_LOADER,
            payload: true
        }
        expect(actions.loaderInit(showLoader)).toEqual(expectedAction);
    });
    test('should create an action for Table listing component', () => {
        const GET_DATA_LIST = {
            type: actions.GET_DATA_LIST,
            payload: dummyData
        }
        const ERROR_APPLICATION = {
            type: actions.ERROR_APPLICATION,
            payload: dummyDataErr
        }
        expect(GET_DATA_LIST).toEqual(GET_DATA_LIST)
        expect(ERROR_APPLICATION).toEqual(ERROR_APPLICATION)
    });
    test('should create an action for Search component', () => {
        const SEARCH_DATA = {
            type: actions.SEARCH_DATA,
            payload: dummyData
        }
        const ERROR_APPLICATION = {
            type: actions.ERROR_APPLICATION,
            payload: dummyDataErr
        }
        expect(SEARCH_DATA).toEqual(SEARCH_DATA)
        expect(ERROR_APPLICATION).toEqual(ERROR_APPLICATION)
    });

})

describe('reducers', () => {
    test('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            {
                dataListStore : {},
                loadingStore: false
            }
    )
  })
  test('should handle HIDE_LOADER', () => {
      const showLoader = false;
      const loadingTmp = showLoader? types.SHOW_LOADER : types.HIDE_LOADER;
      expect(
          reducer({ dataListStore : {}, loadingStore:false}, {
              dataListStore : {},
              loadingStore: loadingTmp === types.HIDE_LOADER ? true: false
          })
      ).toEqual(
          {
              dataListStore : {},
              loadingStore: showLoader
          }
      )
  })
  test('should handle SHOW_LOADER', () => {
      const showLoader = true;
      const loadingTmp = showLoader ? types.SHOW_LOADER : types.HIDE_LOADER;
      expect(
          reducer({ dataListStore : {}, loadingStore:true}, {
              dataListStore : {},
              loadingStore: loadingTmp === types.SHOW_LOADER ? true: false
          })
      ).toEqual(
          {
              dataListStore : {},
              loadingStore: showLoader
          }
      )
  })
  test('should handle GET_DATA_LIST', () => {
      expect(
          reducer({ dataListStore : dummyData, loadingStore:false}, {
              dataListStore : {},
              loadingStore: true
          })
      ).toEqual(
          {
              dataListStore : dummyData,
              loadingStore: false
          }
      )
  })
  test('should handle ERROR_APPLICATION', () => {
      expect(
          reducer({ dataListStore : dummyDataErr, loadingStore:false}, {
              dataListStore : {},
              loadingStore: true
          })
      ).toEqual(
          {
              dataListStore : dummyDataErr,
              loadingStore: false
          }
      )
  })
  test('should handle SEARCH_DATA', () => {
      expect(
          reducer({ dataListStore : dummyData, loadingStore:false}, {
              dataListStore : {},
              loadingStore: true
          })
      ).toEqual(
          {
              dataListStore : dummyData,
              loadingStore: false
          }
      )
  })
});

describe('App component Testing', () => {
    let store: any;
    beforeEach(() => {
        store = mockStore({});
    });

    test('should render correctly', () => {
        const component = shallow(
        <Provider store={store}>
            <App />
        </Provider>
        );
        expect(component.find(App)).toHaveLength(1);
    });
});
describe('Header component Testing', () => {
    let store: any;
    beforeEach(() => {
        store = mockStore({});
    });
    test('should render correctly', () => {
        const component = shallow(
            <Provider store={store}>
                <Header />
            </Provider>
        );
        expect(component.find(Header)).toHaveLength(1);
    });
});
describe("Loader component Testing", () => {
    test('should render correctly', () => {
       var component = shallow(<Loader />);
       expect(component.find(".loading-box")).toHaveLength(1);
    });
});

describe("Table Listing component Testing", () => {
    let store: any;
    beforeEach(() => {
        store = mockStore({});
    });
    test('should render correctly', () => {
       const component = mount(<Provider store={store}><TableListing tableDataProp={dummyData}/></Provider>);
       expect(component.find(".tbl-box")).toHaveLength(1);
    });
    test('should render props correctly', () => {
       const getByTestId = render(<Provider store={store}><TableListing tableDataProp={dummyData}/></Provider>);
       expect(getByTestId).toMatchSnapshot();
    });

    test('should render Service unavailable', async () => {
        fetchMock.mock('https://sheetlabs.com/ACME/getDomain1/', {
            status: 500
        });
        const errorData =[{"status":500,"statusText": "Error"}];
        const {getByText} = render(<Provider store={store}><TableListing tableDataProp={errorData}/></Provider>);
        const errorMessage = await waitFor(() => getByText(errorData[0].status));
        expect(errorMessage).toBeInTheDocument();
    });
    test('should render Fetch data successfully', async () => {
        fetchMock.mock('https://sheetlabs.com/ACME/getDomain/', {
            status: 200,
            body: dummyData
        });
        const {getByText} = render(<Provider store={store}><TableListing tableDataProp={dummyData}/></Provider>);

        const data = await waitFor(() => getByText(dummyData[0].word));
        expect(data).toBeInTheDocument();
    });
});
describe('Search component Testing', () => {
    let store: any;
    beforeEach(() => {
        store = mockStore({});
    });
    test('should render correctly', () => {
        const component = mount(
        <Provider store={store}>
            <SearchInput />
        </Provider>
        );
        expect(component.find(SearchInput)).toHaveLength(1);
    });
    test('Click of Search button', () => {
          const handler = jest.fn(e => e.preventDefault())
          const {getByText} = render(
            <div className="search-box">
                <button data-testid="search-data" type="button" className="btn-primary" onClick={handler}>Search</button>
            </div>
          )
          fireEvent.click(getByText(/Search/i))
          expect(handler).toHaveBeenCalledTimes(1)
    })
    test('Fetch data successfully rendering', async () => {
        let search = 'al';
        const url = "https://sheetlabs.com/ACME/getDomain?domain="+search+"*";
        fetchMock.mock(url, {
            status: 200,
            body: dummyData
        });
        const {getByText} = render(<Provider store={store}><TableListing tableDataProp={dummyData}/></Provider>);
        const data = await waitFor(() => getByText(dummyData[0].word));
        expect(data).toBeInTheDocument();
    });
});
