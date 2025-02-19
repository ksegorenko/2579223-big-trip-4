import { render } from "../render";
import CreatingFormView from "../view/create-form-view";
import EditingFormView from "../view/editing-form-view";
import FiltersView from "../view/filters-view";
import NewEventButtonView from "../view/new-event-button-view";
import SortingView from "../view/sorting-view";
import TripInfoView from "../view/trip-info-view";
import WaypointView from "../view/waypoint-view";

export default class BoardPresenter {
  constructor({
    boardContainer,
    destinationModel,
    offersModel,
    waypointsModel,
  }) {
    this.boardContainer = boardContainer;
    this.destinationModel = destinationModel;
    this.offersModel = offersModel;
    this.waypointsModel = waypointsModel;
  }

  init() {
    const headerElement = this.boardContainer.querySelector(".trip-main");
    const tripEvents = this.boardContainer.querySelector(".trip-events");

    render(new TripInfoView(), headerElement);
    render(new FiltersView(), headerElement);
    render(new NewEventButtonView(), headerElement);
    render(new SortingView(), tripEvents);

    tripEvents.innerHTML += `<ul class="trip-events__list"></ul>`;
    const tripEventsList = tripEvents.querySelector(".trip-events__list");

    const firstWaypoint = this.waypointsModel.get()[0];
    if (firstWaypoint) {
      const firstDestination = this.destinationModel.getById(
        firstWaypoint.destination
      );
      const firstOffers = this.offersModel.getByType(firstWaypoint.type);
      render(
        new EditingFormView(firstWaypoint, firstDestination, firstOffers),
        tripEventsList
      );
    }

    render(new CreatingFormView(), tripEventsList);

    this.waypointsModel.get().forEach((waypoint) => {
      render(
        new WaypointView(
          waypoint,
          this.destinationModel.getById(waypoint.destination),
          this.offersModel.getByType(waypoint.type)
        ),
        tripEventsList
      );
    });
  }
}
