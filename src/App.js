import React from 'react';

import _ from 'lodash';

import { AppContext, MenuContext } from './appContext';
import Screen from './components/Screen';
import Diners from './components/Diners';
import MenuModal from './components/MenuModal';
import diners from '../diners';
import menuData from '../menu-data';
import { runMenuRules } from './menuRules';
import './App.scss';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: _(diners).get('users'),
      modalId: false, // userID or false
      createSelectMealCallback: this._createOnSelectMeal
    };
  }

  _closeModal = () => {
    this.setState({ modalId: false });
  }

  _createOpenModalForUserId = id => {
    return () => { this.setState({ modalId: id }); }; // set modalId to userId
  }

  // create callback to change any property in user object with id
  _changeUserById = id => {
    return (key, value) => {
      this.setState(prevState => {
        const userIdx = _.findIndex(prevState.users, { id });
        if (userIdx >= 0 ) {
          const newUsers = _.cloneDeep(prevState.users);
          _.set(newUsers[userIdx], key, value);
          return { users: newUsers };
        }

        return null;
      });
    }
  }

  // create callback to add or remove meal from user's meal list
  // selected user is stored in modalId
  _createOnSelectMeal = meal => {
    return () => {
      this.setState(prevState => {
        const userIdx = _.findIndex(prevState.users, { id: prevState.modalId })
        const newUser = _.cloneDeep(prevState.users[userIdx]);
        const newMeals = [...newUser.meals];
        const mealIdx = _.findIndex(newMeals, { id: meal.id });
        if (mealIdx === -1) {
          newMeals.push(meal);
        }
        else
        {
          newMeals.splice(mealIdx, 1);
        }

        newUser.meals = newMeals;

        const otherUsers = [...prevState.users];
        otherUsers.splice(userIdx, 1);
        const menuAlerts = runMenuRules(newMeals, otherUsers);

        newUser.alerts = menuAlerts;

        return { users: this._updateUsers(userIdx, newUser) }
      });
    };
  }

  // change user at index in new users list to be shallow merged with state
  _updateUsers = (idx, user) => {
    const newUsers = _.cloneDeep(this.state.users);
    newUsers[idx] = user;
    return newUsers;
  }

  _onSubmit = () => {
    this.setState({ modalId: false });
  }

  render() {
    const { users, modalId } = this.state;

    const selectedUser = _.find(users, { id: modalId });
    return (
      <AppContext.Provider value={this.state}>
        <MenuContext.Provider value={{ menuData }}>
          <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossOrigin='anonymous'/>
          <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css' integrity='sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp' crossOrigin='anonymous'/>

          <Screen className='app__root'>
            <Diners 
              onChangeUserId={this._changeUserById} 
              createOpenModal={this._createOpenModalForUserId}
            />
            <MenuModal 
              show={!!modalId} 
              onHide={this._closeModal} 
              user={selectedUser}
              onSubmit={this._onSubmit}
            />
          </Screen>
        </MenuContext.Provider>
      </AppContext.Provider>
    );
  }
}
