import { MatchsController } from '../controllers';
import { MatchsService } from '../services';

const matchsControllerFactory = () => {
  const matchsService = new MatchsService();
  const matchsController = new MatchsController(matchsService);
  return matchsController;
};

export default matchsControllerFactory;
