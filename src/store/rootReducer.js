import { combineReducers } from 'redux';
import taskReducer from './tasks/taskReducer';
import userReducer from './user/userReducer';
import collaboratorsReducer from './collaborators/collaboratorsReducer';

const rootReducer = combineReducers({
    task: taskReducer,
    user: userReducer,
    collaborators: collaboratorsReducer
});

export default rootReducer;
