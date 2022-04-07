import { ClubsController } from '../controllers';
import { ClubsService } from '../services';

const clubsControllerFactory = () => {
  const clubsService = new ClubsService();
  const clubsController = new ClubsController(clubsService);
  return clubsController;
};

export default clubsControllerFactory;
