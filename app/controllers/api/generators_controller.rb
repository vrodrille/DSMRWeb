module Api
  class GeneratorsController < ApplicationController

    protect_from_forgery with: :null_session

    def index 
      generators = GeneratorFileReaderService.get_generators
      render json: generators
    end

    def show
      generators_params = GeneratorFileReaderService.get_generators_params(params[:generator_name])
      render json: generators_params
    end
  end
end