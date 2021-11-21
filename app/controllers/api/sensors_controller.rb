module Api
  class SensorsController < ApplicationController

    protect_from_forgery with: :null_session

    def index
      sensors = Sensor.all
      render json: sensors
    end

    def show
      sensor = Sensor.find_by(id: params[:id])
      render json: sensor
    end

    def create
      sensor = Sensor.new(sensor_params)

      if sensor.save 
        render json: sensor
      else
        render json: { error: sensor.error.messages }, status: 422
      end
    end

    def update
      sensor = Sensor.find_by(id: params[:id])

      if sensor.update(sensor_params)
        render json: sensor
      else
        render json: { error: sensor.error.messages }, status: 422
      end
    end

    def destroy
      sensor = Sensor.find_by(id: params[:id])

      if sensor.destroy 
        head :no_content
      else
        render json: { error: sensor.error.messages }, status: 422
      end
    end

    private 

    def sensor_params
      params.require(:sensor).permit(:latitude, :longitude, :location, :ip_address, :information)
    end
  end
end