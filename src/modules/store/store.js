/* @flow */

import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import addQueryProviders from './addQueryProviders';
import cacheQueryProvider from './cacheQueryProvider';
import rootReducer from '../../ui/reducers/rootReducer';
import rootSaga from '../../ui/sagas/rootSaga';
import type { EnhancedStore } from './storeTypeDefinitions';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [ sagaMiddleware ];

const store: any = createStore(rootReducer, compose(
	applyMiddleware(...middlewares),
	addQueryProviders(cacheQueryProvider),
));

sagaMiddleware.run(rootSaga);

export default (store: EnhancedStore);
