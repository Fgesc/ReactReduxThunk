import { setupServer } from 'msw/node';
import { handlers } from './handlers';
import type { SetupServer } from 'msw/node';

export const server: SetupServer = setupServer(...handlers);
