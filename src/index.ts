//import { Users } from './services/users';
//import { Logger } from './services/logger';
import { createIoCContainer } from './ioc';
import type { User, ApiConfig } from './types';

const ioc = createIoCContainer();

const renderUsers = async (/*config: ApiConfig*/) => {
  const usersService = ioc.resolve('users'); //new Users(config);
  const users = await usersService.getUsers();

  const listNode = document.getElementById('users-list');

  users.forEach((user: User) => {
    const listItemNode = document.createElement('li');

    listItemNode.innerHTML = user.name;
    listNode.appendChild(listItemNode);
  });
};

const app = () => {
  const config = (window as any).__CONFIG__;
  delete (window as any).__CONFIG__;

  ioc.register('apiConfig', config.api)
  renderUsers(/*config.api*/);
};

window.onload = (event: Event) => {
  const logger = ioc.resolve('logger'); //new Logger();

  logger.info('Page is loaded.');

  app();
};
