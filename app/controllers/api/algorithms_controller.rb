module Api
  class AlgorithmsController < ApplicationController

    protect_from_forgery with: :null_session

    def index 
      algorithms = AlgorithmFileReaderService.get_algorithms
      render json: algorithms
    end

    def show
      algorithm_params = AlgorithmFileReaderService.get_algorithm_params(params[:algorithm_name])
      render json: algorithm_params
    end
  end
end