module Api
  class ExperimentsController < ApplicationController

    protect_from_forgery with: :null_session

    def create
      algorithm_json = params[:algorithm]
      experiment_json = params[:experiment]
      AlgorithmParamsFileWriterService.write_params_file(algorithm_json)
      ScriptRunningService.run_script(experiment_json)
      MqttClientPublisherService.publish_experiment(experiment_json)
      head :no_content
    end
  end
end