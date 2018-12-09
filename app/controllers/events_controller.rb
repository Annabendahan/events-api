class EventsController < ApiController
  before_action :require_login, except: [:index, :show]

  def index
    events= Event.all
    render json: { events: events}
  end


  def show
    event = Event.find(params[:id])
    render json: { event: event  }
  end


  def create
    event = Event.new(event_params)
    event.user = current_user
    if event.save
      render json: {
        message: 'ok',
        event: event
      }
    else
      render json: {
        message: ' couldnt create event :('
      }
    end
  end

  private

  def event_params
    params.require(:event).permit(:title, :description, :address)
  end
end
